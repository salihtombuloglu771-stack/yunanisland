import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { checkRateLimit } from '@/lib/rateLimit'

const NOTIFY_EMAIL = 'salihtombuloglu771@gmail.com'

export async function POST(request: Request) {
  const body = await request.json()
  const { email, website } = body as { email: string; website?: string }

  // Honeypot: gizli alan, botlar doldurur gerçek kullanıcılar görmez.
  if (website) {
    return NextResponse.json({ success: true })
  }

  if (!email?.trim().includes('@')) {
    return NextResponse.json({ error: 'Geçersiz e-posta adresi.' }, { status: 400 })
  }

  const supabase = await createClient()

  const allowed = await checkRateLimit(supabase, request, 'newsletter', 5, 3600)
  if (!allowed) {
    return NextResponse.json({ error: 'Çok fazla istek gönderildi, lütfen bir süre sonra tekrar dene.' }, { status: 429 })
  }

  const { error: insertError } = await supabase.from('newsletter_subscribers').insert({
    email: email.trim().toLowerCase(),
  })

  if (insertError) {
    if (insertError.code === '23505') {
      return NextResponse.json({ success: true, alreadySubscribed: true })
    }
    return NextResponse.json({ error: 'Kayıt oluşturulamadı.' }, { status: 500 })
  }

  if (process.env.RESEND_API_KEY) {
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Yunanisland <bildirim@yunanisland.com>',
          to: [NOTIFY_EMAIL],
          subject: 'Yeni Bülten Aboneliği',
          text: `Yeni bülten abonesi: ${email.trim()}`,
        }),
      })
    } catch {
      // E-posta bildirimi başarısız olsa bile abonelik zaten kaydedildi.
    }
  }

  return NextResponse.json({ success: true })
}
