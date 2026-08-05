'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { useLanguage } from '@/lib/i18n/LanguageProvider'

interface IslandOption { id: string; name: string; slug: string }

interface IslandDetail {
  id: string
  name: string
  slug: string
  description: string | null
  description_en?: string | null
  description_el?: string | null
  population: number | null
  best_time_to_visit: string | null
  budget_level: 'budget' | 'mid' | 'luxury'
  cover_image_url: string | null
  beachCount: number
  restaurantCount: number
  hotelCount: number
  avgRating: number | null
  reviewCount: number
}

const BUDGET_LABELS = {
  tr: { budget: '💰 Bütçe Dostu', mid: '💳 Orta Segment', luxury: '💎 Lüks' },
  en: { budget: '💰 Budget Friendly', mid: '💳 Mid-Range', luxury: '💎 Luxury' },
  el: { budget: '💰 Οικονομικό', mid: '💳 Μεσαία Κατηγορία', luxury: '💎 Πολυτελές' },
}

async function loadIslandDetail(slug: string): Promise<IslandDetail | null> {
  const supabase = createClient()
  const { data: island } = await supabase.from('islands').select('*').eq('slug', slug).maybeSingle()
  if (!island) return null

  const [{ count: beachCount }, { count: restaurantCount }, { count: hotelCount }, { data: reviews }] = await Promise.all([
    supabase.from('beaches').select('id', { count: 'exact', head: true }).eq('island_id', island.id),
    supabase.from('restaurants').select('id', { count: 'exact', head: true }).eq('island_id', island.id),
    supabase.from('hotels').select('id', { count: 'exact', head: true }).eq('island_id', island.id),
    supabase.from('reviews').select('rating').eq('entity_type', 'island').eq('entity_id', island.id),
  ])

  const avgRating = reviews && reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : null

  return {
    ...island,
    beachCount: beachCount ?? 0,
    restaurantCount: restaurantCount ?? 0,
    hotelCount: hotelCount ?? 0,
    avgRating,
    reviewCount: reviews?.length ?? 0,
  }
}

function IslandColumn({ island, onChange, options, otherSlug }: { island: IslandDetail | null; onChange: (slug: string) => void; options: IslandOption[]; otherSlug: string }) {
  const { locale } = useLanguage()
  const description = island ? (locale === 'en' ? (island.description_en || island.description)
    : locale === 'el' ? (island.description_el || island.description)
    : island.description) : null

  const t = {
    choose: locale === 'en' ? 'Choose an island...' : locale === 'el' ? 'Επιλέξτε νησί...' : 'Bir ada seç...',
    budgetLevel: locale === 'en' ? 'Budget Level' : locale === 'el' ? 'Επίπεδο Προϋπολογισμού' : 'Bütçe Seviyesi',
    bestTime: locale === 'en' ? 'Best Time' : locale === 'el' ? 'Καλύτερη Εποχή' : 'En İyi Zaman',
    population: locale === 'en' ? 'Population' : locale === 'el' ? 'Πληθυσμός' : 'Nüfus',
    beachCount: locale === 'en' ? '🏖️ Beach Count' : locale === 'el' ? '🏖️ Αριθμός Παραλιών' : '🏖️ Plaj Sayısı',
    restaurantCount: locale === 'en' ? '🍽️ Restaurant Count' : locale === 'el' ? '🍽️ Αριθμός Εστιατορίων' : '🍽️ Restoran Sayısı',
    hotelCount: locale === 'en' ? '🏨 Hotel Count' : locale === 'el' ? '🏨 Αριθμός Ξενοδοχείων' : '🏨 Otel Sayısı',
    avgRating: locale === 'en' ? '⭐ Average Rating' : locale === 'el' ? '⭐ Μέση Βαθμολογία' : '⭐ Ortalama Puan',
    noReviews: locale === 'en' ? 'No reviews yet' : locale === 'el' ? 'Δεν υπάρχουν ακόμη κριτικές' : 'Henüz yorum yok',
    viewDetails: locale === 'en' ? 'View Details →' : locale === 'el' ? 'Δείτε Λεπτομέρειες →' : 'Detayları Gör →',
    pickToCompare: locale === 'en' ? 'Pick an island to compare.' : locale === 'el' ? 'Επιλέξτε ένα νησί για σύγκριση.' : 'Karşılaştırmak için bir ada seç.',
  }

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-slate-100 dark:border-neutral-900 shadow-sm overflow-hidden">
      <select
        value={island?.slug ?? ''}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border-b border-slate-100 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-3 px-4 text-sm font-semibold outline-none"
      >
        <option value="" disabled>{t.choose}</option>
        {options.map((o) => (
          <option key={o.id} value={o.slug} disabled={o.slug === otherSlug}>{o.name}</option>
        ))}
      </select>

      {island ? (
        <div className="p-6">
          <h3 className="text-xl font-bold text-neutral-900 dark:text-white">{island.name}</h3>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 line-clamp-3">{description}</p>

          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between border-t border-slate-100 dark:border-neutral-800 pt-3">
              <dt className="text-neutral-500">{t.budgetLevel}</dt>
              <dd className="font-semibold text-neutral-800 dark:text-neutral-200">{BUDGET_LABELS[locale][island.budget_level]}</dd>
            </div>
            <div className="flex justify-between border-t border-slate-100 dark:border-neutral-800 pt-3">
              <dt className="text-neutral-500">{t.bestTime}</dt>
              <dd className="font-semibold text-neutral-800 dark:text-neutral-200">{island.best_time_to_visit ?? '—'}</dd>
            </div>
            <div className="flex justify-between border-t border-slate-100 dark:border-neutral-800 pt-3">
              <dt className="text-neutral-500">{t.population}</dt>
              <dd className="font-semibold text-neutral-800 dark:text-neutral-200">{island.population?.toLocaleString(locale === 'en' ? 'en-US' : locale === 'el' ? 'el-GR' : 'tr-TR') ?? '—'}</dd>
            </div>
            <div className="flex justify-between border-t border-slate-100 dark:border-neutral-800 pt-3">
              <dt className="text-neutral-500">{t.beachCount}</dt>
              <dd className="font-semibold text-neutral-800 dark:text-neutral-200">{island.beachCount}</dd>
            </div>
            <div className="flex justify-between border-t border-slate-100 dark:border-neutral-800 pt-3">
              <dt className="text-neutral-500">{t.restaurantCount}</dt>
              <dd className="font-semibold text-neutral-800 dark:text-neutral-200">{island.restaurantCount}</dd>
            </div>
            <div className="flex justify-between border-t border-slate-100 dark:border-neutral-800 pt-3">
              <dt className="text-neutral-500">{t.hotelCount}</dt>
              <dd className="font-semibold text-neutral-800 dark:text-neutral-200">{island.hotelCount}</dd>
            </div>
            <div className="flex justify-between border-t border-slate-100 dark:border-neutral-800 pt-3">
              <dt className="text-neutral-500">{t.avgRating}</dt>
              <dd className="font-semibold text-amber-500">{island.avgRating ? `${island.avgRating.toFixed(1)} (${island.reviewCount})` : t.noReviews}</dd>
            </div>
          </dl>

          <Link href={`/islands/${island.slug}`} className="mt-5 block text-center rounded-xl bg-sky-600 hover:bg-sky-500 py-2.5 text-xs font-semibold text-white transition-colors">
            {t.viewDetails}
          </Link>
        </div>
      ) : (
        <div className="p-10 text-center text-sm text-neutral-400">{t.pickToCompare}</div>
      )}
    </div>
  )
}

export function CompareClient({ options }: { options: IslandOption[] }) {
  const [leftSlug, setLeftSlug] = useState(options[0]?.slug ?? '')
  const [rightSlug, setRightSlug] = useState(options[1]?.slug ?? '')
  const [left, setLeft] = useState<IslandDetail | null>(null)
  const [right, setRight] = useState<IslandDetail | null>(null)

  useEffect(() => {
    if (leftSlug) loadIslandDetail(leftSlug).then(setLeft)
  }, [leftSlug])

  useEffect(() => {
    if (rightSlug) loadIslandDetail(rightSlug).then(setRight)
  }, [rightSlug])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <IslandColumn island={left} onChange={setLeftSlug} options={options} otherSlug={rightSlug} />
      <IslandColumn island={right} onChange={setRightSlug} options={options} otherSlug={leftSlug} />
    </div>
  )
}
