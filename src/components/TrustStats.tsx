'use client'

import { useLanguage } from '@/lib/i18n/LanguageProvider'

interface TrustStatsProps {
  islandCount: number
  beachCount: number
  restaurantCount: number
  attractionCount: number
}

export function TrustStats({ islandCount, beachCount, restaurantCount, attractionCount }: TrustStatsProps) {
  const { locale } = useLanguage()

  const labels = {
    islands: locale === 'en' ? 'Islands' : locale === 'el' ? 'Νησιά' : 'Ada',
    beaches: locale === 'en' ? 'Beaches' : locale === 'el' ? 'Παραλίες' : 'Plaj',
    restaurants: locale === 'en' ? 'Restaurants' : locale === 'el' ? 'Εστιατόρια' : 'Restoran',
    attractions: locale === 'en' ? 'Attractions' : locale === 'el' ? 'Αξιοθέατα' : 'Gezilecek Yer',
  }

  const stats = [
    { count: islandCount, label: labels.islands, emoji: '🏝️' },
    { count: beachCount, label: labels.beaches, emoji: '🏖️' },
    { count: restaurantCount, label: labels.restaurants, emoji: '🍽️' },
    { count: attractionCount, label: labels.attractions, emoji: '📍' },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
      {stats.map((s) => (
        <div key={s.label} className="bg-white dark:bg-neutral-900 rounded-2xl border border-slate-100 dark:border-neutral-900 shadow-sm p-4 text-center">
          <span className="text-xl">{s.emoji}</span>
          <p className="mt-1 text-2xl font-extrabold text-neutral-900 dark:text-white">{s.count}+</p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">{s.label}</p>
        </div>
      ))}
    </div>
  )
}
