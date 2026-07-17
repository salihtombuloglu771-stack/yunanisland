'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FavoriteButton } from '@/components/FavoriteButton'
import { useLanguage } from '@/lib/i18n/LanguageProvider'

export interface Island {
  id: string
  name: string
  slug: string
  description: string | null
  description_en?: string | null
  budget_level: 'budget' | 'mid' | 'luxury'
  population: number | null
  best_time_to_visit: string | null
  best_time_to_visit_en?: string | null
  cover_image_url: string | null
}

interface IslandCardProps {
  island: Island
}

const BUDGET_LABELS = {
  budget: { label: 'Bütçe Dostu', color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' },
  mid: { label: 'Orta Segment', color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400' },
  luxury: { label: 'Lüks', color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400' },
}

export function IslandCard({ island }: IslandCardProps) {
  const { locale } = useLanguage()
  const budget = BUDGET_LABELS[island.budget_level]
  const description = locale === 'en' ? (island.description_en || island.description) : island.description
  const bestTime = locale === 'en' ? (island.best_time_to_visit_en || island.best_time_to_visit) : island.best_time_to_visit

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      
      {/* Resim Alanı */}
      <div className="relative aspect-video w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
        {island.cover_image_url ? (
          <Image
            src={island.cover_image_url}
            alt={island.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority={false}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-neutral-400 text-3xl">
            🏝️
          </div>
        )}
        {/* Karartma Katmanı */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="absolute top-3 right-3">
          <FavoriteButton entityType="island" entityId={island.id} />
        </div>
      </div>

      {/* İçerik Alanı */}
      <div className="p-5">
        <div className="flex items-center justify-between gap-2">
          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${budget.color}`}>
            {budget.label}
          </span>
          {bestTime && (
            <span className="text-xs text-neutral-500 dark:text-neutral-400">
              📅 {bestTime}
            </span>
          )}
        </div>

        <h3 className="mt-3 text-xl font-semibold text-neutral-900 dark:text-white">
          {island.name}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm text-neutral-600 dark:text-neutral-300">
          {description || (locale === 'en' ? 'No description added yet.' : 'Bu ada hakkında henüz bir açıklama eklenmedi.')}
        </p>

        {/* Alt Bilgi ve Link */}
        <div className="mt-5 flex items-center justify-between border-t border-neutral-100 dark:border-neutral-800 pt-4">
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            {island.population ? `👥 ${locale === 'en' ? 'Population' : 'Nüfus'}: ${island.population.toLocaleString(locale === 'en' ? 'en-US' : 'tr-TR')}` : ''}
          </span>
          <Link
            href={`/islands/${island.slug}`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-sky-600 hover:text-sky-500 dark:text-sky-400 dark:hover:text-sky-300 transition-colors"
          >
            {locale === 'en' ? 'View Details' : 'Detayları Gör'}
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
