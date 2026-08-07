'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { PageHero } from '@/components/PageHero'
import { SiteFooter } from '@/components/SiteFooter'
import { AttractionCard, type Attraction, ATTRACTION_CATEGORIES, CATEGORY_LABELS } from '@/components/AttractionCard'
import { useLanguage } from '@/lib/i18n/LanguageProvider'

type AttractionRow = Attraction & {
  islands: { name: string; slug: string } | { name: string; slug: string }[]
}

export function AttractionsIndexClient({ attractions, initialQuery }: { attractions: AttractionRow[]; initialQuery: string }) {
  const { locale } = useLanguage()
  const [query, setQuery] = useState(initialQuery)
  const [categoryFilter, setCategoryFilter] = useState<Attraction['category'] | 'all'>('all')
  const [sort, setSort] = useState<'rating' | 'name'>('rating')

  const t = {
    title: locale === 'en' ? 'All Places to Visit' : locale === 'el' ? 'Όλα τα Αξιοθέατα' : 'Tüm Gezilecek Yerler',
    subtitle: locale === 'en' ? 'Browse every attraction across all Greek islands in one place.' : locale === 'el' ? 'Περιηγηθείτε σε όλα τα αξιοθέατα των ελληνικών νησιών σε ένα μέρος.' : 'Yunan Adaları\'ndaki tüm gezilecek yerleri tek yerden keşfedin.',
    searchPlaceholder: locale === 'en' ? 'Search place name...' : locale === 'el' ? 'Αναζήτηση αξιοθέατου...' : 'Yer adı ara...',
    sortRating: locale === 'en' ? 'Highest rated' : locale === 'el' ? 'Καλύτερη βαθμολογία' : 'En yüksek puan',
    sortName: locale === 'en' ? 'Name (A-Z)' : locale === 'el' ? 'Όνομα (Α-Ω)' : 'İsim (A-Z)',
    all: locale === 'en' ? 'All' : locale === 'el' ? 'Όλα' : 'Tümü',
    noResults: locale === 'en' ? 'No places match your filters.' : locale === 'el' ? 'Κανένα αξιοθέατο δεν ταιριάζει με τα φίλτρα σας.' : 'Filtrelerine uygun yer bulunamadı.',
    resultCount: (n: number) => locale === 'en' ? `${n} places` : locale === 'el' ? `${n} αξιοθέατα` : `${n} yer`,
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLocaleLowerCase('tr')
    return attractions
      .filter((a) => {
        if (q && !a.name.toLocaleLowerCase('tr').includes(q)) return false
        if (categoryFilter !== 'all' && a.category !== categoryFilter) return false
        return true
      })
      .sort((a, b) => sort === 'name' ? a.name.localeCompare(b.name) : (b.avgRating ?? 0) - (a.avgRating ?? 0))
  }, [attractions, query, categoryFilter, sort])

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 transition-colors duration-300">
      <Header />
      <PageHero image="/rodos.jpg" badge="📍" title={t.title} subtitle={t.subtitle} />

      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="bg-white dark:bg-neutral-900 p-5 rounded-2xl border border-slate-100 dark:border-neutral-900 shadow-sm mb-6 space-y-4">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-2.5 px-4 text-sm outline-none focus:border-sky-500"
          />
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={() => setCategoryFilter('all')}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium border transition-all ${categoryFilter === 'all' ? 'bg-sky-50 dark:bg-sky-950/30 text-sky-600 border-sky-300' : 'bg-slate-50 dark:bg-neutral-950 border-slate-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400'}`}>
              {t.all}
            </button>
            {ATTRACTION_CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => setCategoryFilter(cat)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium border transition-all ${categoryFilter === cat ? 'bg-sky-50 dark:bg-sky-950/30 text-sky-600 border-sky-300' : 'bg-slate-50 dark:bg-neutral-950 border-slate-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400'}`}>
                {CATEGORY_LABELS[locale][cat]}
              </button>
            ))}
            <select value={sort} onChange={(e) => setSort(e.target.value as 'rating' | 'name')}
              className="ml-auto rounded-lg border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-1.5 px-3 text-xs outline-none focus:border-sky-500">
              <option value="rating">{t.sortRating}</option>
              <option value="name">{t.sortName}</option>
            </select>
          </div>
        </div>

        <p className="text-xs text-neutral-400 mb-4">{t.resultCount(filtered.length)}</p>

        {filtered.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((attraction) => {
              const island = Array.isArray(attraction.islands) ? attraction.islands[0] : attraction.islands
              return (
                <div key={attraction.id}>
                  {island && (
                    <Link href={`/islands/${island.slug}`} className="inline-block mb-1.5 text-[10px] font-semibold text-sky-600 dark:text-sky-400 hover:underline">
                      📍 {island.name}
                    </Link>
                  )}
                  <AttractionCard attraction={attraction} />
                </div>
              )
            })}
          </div>
        ) : (
          <div className="py-16 text-center bg-white dark:bg-neutral-900 border border-slate-100 dark:border-neutral-900 rounded-2xl">
            <span className="text-4xl">📍</span>
            <p className="mt-3 text-sm text-neutral-500">{t.noResults}</p>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  )
}
