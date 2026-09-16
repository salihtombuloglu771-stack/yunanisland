import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

const URL_LOCALES = ['en', 'el'] as const

// URL'de /en veya /el ön eki varsa (ör. /en/islands/mykonos) bunu asıl route'a
// (/islands/mykonos) çeviriyoruz — böylece dosya yapısı/statik sayfa üretimi
// hiç değişmiyor, sadece istek şu anki route'a rewrite ediliyor. Çözülen dil
// downstream Server Component'lerin headers() ile okuyabilmesi için
// `x-locale` request header'ında taşınıyor (bkz. hreflang/URL-tabanlı i18n).
function stripLocalePrefix(pathname: string): { pathname: string; locale: (typeof URL_LOCALES)[number] | null } {
  for (const locale of URL_LOCALES) {
    if (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)) {
      return { pathname: pathname.slice(locale.length + 1) || '/', locale }
    }
  }
  return { pathname, locale: null }
}

export async function proxy(request: NextRequest) {
  const { pathname, locale } = stripLocalePrefix(request.nextUrl.pathname)

  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  if (pathname.startsWith('/admin')) {
    if (!user) {
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      url.searchParams.set('next', pathname)
      return NextResponse.redirect(url)
    }

    // Hesapta 2FA açıksa ama bu oturum henüz ikinci faktörü doğrulamadıysa
    // (aal1'de kaldıysa) admin paneline girişi engelle — aksi halde "2FA aktif"
    // sadece görünüşte kalır, şifre tek başına yine yeterli olurdu.
    const { data: aal } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel()
    if (aal && aal.nextLevel === 'aal2' && aal.nextLevel !== aal.currentLevel) {
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      url.searchParams.set('next', pathname)
      return NextResponse.redirect(url)
    }

    const { data: profile } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile?.role !== 'admin') {
      const url = request.nextUrl.clone()
      url.pathname = '/'
      return NextResponse.redirect(url)
    }
  }

  if (pathname.startsWith('/account') && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('next', pathname)
    return NextResponse.redirect(url)
  }

  if (!locale) {
    return supabaseResponse
  }

  const rewriteUrl = request.nextUrl.clone()
  rewriteUrl.pathname = pathname

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-locale', locale)

  const rewriteResponse = NextResponse.rewrite(rewriteUrl, { request: { headers: requestHeaders } })
  supabaseResponse.cookies.getAll().forEach((cookie) => rewriteResponse.cookies.set(cookie))
  return rewriteResponse
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
