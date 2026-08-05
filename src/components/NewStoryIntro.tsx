'use client'

import { useLanguage } from '@/lib/i18n/LanguageProvider'

export function NewStoryIntro() {
  const { locale } = useLanguage()

  const t = {
    title: locale === 'en' ? '✍️ Share Your Travel Story' : locale === 'el' ? '✍️ Μοιράσου την Ταξιδιωτική σου Ιστορία' : '✍️ Gezi Hikayeni Paylaş',
    subtitle: locale === 'en'
      ? 'Share your experience with other travelers — once published, it will appear on the public "Travel Stories" page.'
      : locale === 'el'
        ? 'Μοιράσου την εμπειρία σου με άλλους ταξιδιώτες — μόλις δημοσιευτεί, θα εμφανιστεί στη δημόσια σελίδα "Ταξιδιωτικές Ιστορίες".'
        : 'Deneyimini diğer gezginlerle paylaş — yayınlandığında herkese açık "Gezi Hikayeleri" sayfasında görünür.',
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">{t.title}</h1>
      <p className="mt-2 text-sm text-neutral-500">{t.subtitle}</p>
    </>
  )
}
