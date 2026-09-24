'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ComponentProps } from 'react'
import { urlLocaleFromPathname, withUrlLocale } from '@/lib/i18n/localeHref'

// next/link'in birebir yerine geçen sarmalayıcı: kullanıcı /en/... veya
// /el/... URL'indeyken iç linkleri aynı dil ön ekiyle üretir, böylece EN/EL
// bir sayfadan tıklanan link TR versiyona düşmez. TR URL'lerinde hiçbir şey
// değişmez.
export default function LocaleLink({ href, ...props }: ComponentProps<typeof Link>) {
  const locale = urlLocaleFromPathname(usePathname())
  const localized = typeof href === 'string' ? withUrlLocale(href, locale) : href
  return <Link href={localized} {...props} />
}

export function useLocalizedHref() {
  const locale = urlLocaleFromPathname(usePathname())
  return (href: string) => withUrlLocale(href, locale)
}
