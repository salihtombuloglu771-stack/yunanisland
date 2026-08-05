'use client'

import { PageHero } from '@/components/PageHero'
import { useLanguage } from '@/lib/i18n/LanguageProvider'

interface HeroCopy {
  badge: string
  title: string
  subtitle: string
}

interface PageHeroI18nProps {
  image: string
  tr: HeroCopy
  en: HeroCopy
  el: HeroCopy
}

// Wraps PageHero for server components that fetch data server-side (so the
// page itself can't be 'use client') but still need a locale-aware hero.
export function PageHeroI18n({ image, tr, en, el }: PageHeroI18nProps) {
  const { locale } = useLanguage()
  const copy = locale === 'en' ? en : locale === 'el' ? el : tr

  return <PageHero image={image} badge={copy.badge} title={copy.title} subtitle={copy.subtitle} />
}
