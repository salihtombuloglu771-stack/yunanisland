'use client'

import { useLanguage } from '@/lib/i18n/LanguageProvider'

export function LastUpdated({ date }: { date: string | null | undefined }) {
  const { locale } = useLanguage()
  if (!date) return null

  const label = locale === 'en' ? 'Last updated' : locale === 'el' ? 'Τελευταία ενημέρωση' : 'Son güncelleme'
  const formatted = new Date(date).toLocaleDateString(locale === 'en' ? 'en-US' : locale === 'el' ? 'el-GR' : 'tr-TR')

  return (
    <p className="text-xs text-neutral-400 dark:text-neutral-500">
      🕓 {label}: {formatted}
    </p>
  )
}
