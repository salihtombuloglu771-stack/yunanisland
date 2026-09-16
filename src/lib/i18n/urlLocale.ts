import { headers } from 'next/headers'
import type { Locale } from './dictionary'

// proxy.ts, /en veya /el ön ekini asıl route'a rewrite ederken çözülen dili
// x-locale request header'ında taşıyor — Server Component'ler (zaten
// per-request dinamik render edilen sayfalar) bunu buradan okuyup içeriği
// URL'e göre doğru dilde SUNUCU TARAFINDA render edebiliyor. Bu sayede arama
// motorları /en/... ve /el/... adreslerini istemci tarafı "flip" beklemeden
// doğru dilde görür.
export async function getUrlLocale(): Promise<Locale> {
  const h = await headers()
  const value = h.get('x-locale')
  return value === 'en' || value === 'el' ? value : 'tr'
}

export function localizedPath(path: string, locale: Locale): string {
  const clean = path === '/' ? '' : path
  return locale === 'tr' ? path : `/${locale}${clean}`
}

export function buildHreflangAlternates(path: string, baseUrl: string, currentLocale: Locale) {
  const clean = path === '/' ? '' : path
  const urls: Record<Locale, string> = {
    tr: `${baseUrl}${clean}`,
    en: `${baseUrl}/en${clean}`,
    el: `${baseUrl}/el${clean}`,
  }
  return {
    canonical: urls[currentLocale],
    languages: { ...urls, 'x-default': urls.tr },
  }
}
