'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { PageHero } from '@/components/PageHero'
import { SiteFooter } from '@/components/SiteFooter'
import { HotelCard, type Hotel } from '@/components/HotelCard'
import { useLanguage } from '@/lib/i18n/LanguageProvider'

type HotelRow = Hotel & {
  islands: { name: string; slug: string } | { name: string; slug: string }[]
}

const CATEGORY_ORDER: Record<string, number> = { budget: 0, 'mid-range': 1, luxury: 2 }

export function HotelsIndexClient({ hotels, initialQuery }: { hotels: HotelRow[]; initialQuery: string }) {
  const { locale } = useLanguage()
  const [query, setQuery] = useState(initialQuery)
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'budget' | 'mid-range' | 'luxury'>('all')
  const [minStar, setMinStar] = useState(0)
  const [sort, setSort] = useState<'rating' | 'name' | 'category'>('rating')

  const t = {
    title: locale === 'en' ? 'All Hotels' : locale === 'el' ? 'Όλα τα Ξενοδοχεία' : 'Tüm Oteller',
    subtitle: locale === 'en' ? 'Browse every hotel across all Greek islands in one place.' : locale === 'el' ? 'Περιηγηθείτε σε όλα τα ξενοδοχεία των ελληνικών νησιών σε ένα μέρος.' : 'Yunan Adaları\'ndaki tüm otelleri tek yerden keşfedin.',
    searchPlaceholder: locale === 'en' ? 'Search hotel name...' : locale === 'el' ? 'Αναζήτηση ξενοδοχείου...' : 'Otel adı ara...',
    sortRating: locale === 'en' ? 'Highest rated' : locale === 'el' ? 'Καλύτερη βαθμολογία' : 'En yüksek puan',
    sortName: locale === 'en' ? 'Name (A-Z)' : locale === 'el' ? 'Όνομα (Α-Ω)' : 'İsim (A-Z)',
    sortCategory: locale === 'en' ? 'Price (low to high)' : locale === 'el' ? 'Τιμή (φθηνό-ακριβό)' : 'Fiyat (ucuzdan pahalıya)',
    noResults: locale === 'en' ? 'No hotels match your filters.' : locale === 'el' ? 'Κανένα ξενοδοχείο δεν ταιριάζει με τα φίλτρα σας.' : 'Filtrelerine uygun otel bulunamadı.',
    resultCount: (n: number) => locale === 'en' ? `${n} hotels` : locale === 'el' ? `${n} ξενοδοχεία` : `${n} otel`,
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLocaleLowerCase('tr')
    return hotels
      .filter((h) => {
        if (q && !h.name.toLocaleLowerCase('tr').includes(q)) return false
        if (categoryFilter !== 'all' && h.category !== categoryFilter) return false
        if (minStar > 0 && (!h.star_rating || h.star_rating < minStar)) return false
        return true
      })
      .sort((a, b) => {
        if (sort === 'name') return a.name.localeCompare(b.name)
        if (sort === 'category') return CATEGORY_ORDER[a.category] - CATEGORY_ORDER[b.category]
        return (b.avgRating ?? 0) - (a.avgRating ?? 0)
      })
  }, [hotels, query, categoryFilter, minStar, sort])

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 transition-colors duration-300">
      <Header />
      <PageHero image="/kos.jpg" badge="🏨" title={t.title} subtitle={t.subtitle} />

      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="bg-white dark:bg-neutral-900 p-5 rounded-2xl border border-slate-100 dark:border-neutral-900 shadow-sm mb-6 space-y-4">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-2.5 px-4 text-sm outline-none focus:border-sky-500"
          />
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all' as const, label: locale === 'en' ? 'All Categories' : locale === 'el' ? 'Όλες οι Κατηγορίες' : 'Tüm Kategoriler' },
              { id: 'budget' as const, label: '💰 Budget' },
              { id: 'mid-range' as const, label: '💳 Mid-Range' },
              { id: 'luxury' as const, label: '💎 Luxury' },
            ].map((cat) => (
              <button key={cat.id} onClick={() => setCategoryFilter(cat.id)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium border transition-all ${categoryFilter === cat.id ? 'bg-sky-50 dark:bg-sky-950/30 text-sky-600 border-sky-300' : 'bg-slate-50 dark:bg-neutral-950 border-slate-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400'}`}>
                {cat.label}
              </button>
            ))}
            {[0, 3, 4, 5].map((stars) => (
              <button key={stars} onClick={() => setMinStar(stars)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium border transition-all ${minStar === stars ? 'bg-sky-50 dark:bg-sky-950/30 text-sky-600 border-sky-300' : 'bg-slate-50 dark:bg-neutral-950 border-slate-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400'}`}>
                {stars === 0 ? (locale === 'en' ? 'Any Stars' : locale === 'el' ? 'Όλα τα Αστέρια' : 'Tüm Yıldızlar') : `${stars}+ ★`}
              </button>
            ))}
            <select value={sort} onChange={(e) => setSort(e.target.value as 'rating' | 'name' | 'category')}
              className="ml-auto rounded-lg border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-1.5 px-3 text-xs outline-none focus:border-sky-500">
              <option value="rating">{t.sortRating}</option>
              <option value="name">{t.sortName}</option>
              <option value="category">{t.sortCategory}</option>
            </select>
          </div>
        </div>

        <p className="text-xs text-neutral-400 mb-4">{t.resultCount(filtered.length)}</p>

        {filtered.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((hotel) => {
              const island = Array.isArray(hotel.islands) ? hotel.islands[0] : hotel.islands
              return (
                <div key={hotel.id}>
                  {island && (
                    <Link href={`/islands/${island.slug}`} className="inline-block mb-1.5 text-[10px] font-semibold text-sky-600 dark:text-sky-400 hover:underline">
                      📍 {island.name}
                    </Link>
                  )}
                  <HotelCard hotel={hotel} />
                </div>
              )
            })}
          </div>
        ) : (
          <div className="py-16 text-center bg-white dark:bg-neutral-900 border border-slate-100 dark:border-neutral-900 rounded-2xl">
            <span className="text-4xl">🏨</span>
            <p className="mt-3 text-sm text-neutral-500">{t.noResults}</p>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  )
}
