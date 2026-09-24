import type { Locale } from './dictionary'

// Client-safe (next/headers kullanmayan) URL-locale yardımcıları. urlLocale.ts
// sunucu tarafı için; bunlar Link/router.push href'lerini mevcut URL diline
// göre ön eklemek için.

export function urlLocaleFromPathname(pathname: string | null): Locale | null {
  if (!pathname) return null
  if (pathname === '/en' || pathname.startsWith('/en/')) return 'en'
  if (pathname === '/el' || pathname.startsWith('/el/')) return 'el'
  return null
}

// Çevrilmemiş ya da dil ön ekiyle anlamsız olan bölümler (admin, auth, API)
// her zaman ön eksiz kalıyor.
const UNPREFIXED = /^\/(admin|api|login|register|auth|reset-password|forgot-password)(\/|\?|#|$)/

export function withUrlLocale(href: string, locale: Locale | null): string {
  if (!locale || locale === 'tr') return href
  if (!href.startsWith('/') || href.startsWith('//')) return href
  if (href === `/${locale}` || href.startsWith(`/${locale}/`) || /^\/(en|el)(\/|\?|#|$)/.test(href)) return href
  if (UNPREFIXED.test(href)) return href
  return href === '/' ? `/${locale}` : `/${locale}${href}`
}
