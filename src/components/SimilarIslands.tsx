'use client'

import { IslandCard, type Island } from '@/components/IslandCard'
import { useLanguage } from '@/lib/i18n/LanguageProvider'

export function SimilarIslands({ islands }: { islands: Island[] }) {
  const { locale } = useLanguage()

  if (islands.length === 0) return null

  return (
    <div className="mt-16">
      <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-6">
        {locale === 'en' ? '🏝️ You Might Also Like' : locale === 'el' ? '🏝️ Μπορεί επίσης να σας ενδιαφέρουν' : '🏝️ Bunlar da İlginizi Çekebilir'}
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {islands.map((island) => (
          <IslandCard key={island.id} island={island} />
        ))}
      </div>
    </div>
  )
}
