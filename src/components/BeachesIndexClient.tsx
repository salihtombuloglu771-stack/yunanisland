'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { PageHero } from '@/components/PageHero'
import { SiteFooter } from '@/components/SiteFooter'
import { BeachCard } from '@/components/BeachCard'
import { useLanguage } from '@/lib/i18n/LanguageProvider'
import type { Beach } from '@/lib/mockData'

type BeachRow = Beach & {
  avgRating?: number | null
  reviewCount?: number
  islands: { name: string; slug: string } | { name: string; slug: string }[]
}

export function BeachesIndexClient({ beaches, initialQuery }: { beaches: BeachRow[]; initialQuery: string }) {
  const { locale } = useLanguage()
  const [query, setQuery] = useState(initialQuery)
  const [typeFilter, setTypeFilter] = useState<'all' | 'sand' | 'pebble' | 'mixed'>('all')
  const [familyOnly, setFamilyOnly] = useState(false)
  const [blueFlagOnly, setBlueFlagOnly] = useState(false)
  const [sort, setSort] = useState<'rating' | 'name'>('rating')

  const t = {
    title: locale === 'en' ? 'All Beaches' : locale === 'el' ? 'Όλες οι Παραλίες' : 'Tüm Plajlar',
    subtitle: locale === 'en' ? 'Browse every beach across all Greek islands in one place.' : locale === 'el' ? 'Περιηγηθείτε σε όλες τις παραλίες των ελληνικών νησιών σε ένα μέρος.' : 'Yunan Adaları\'ndaki tüm plajları tek yerden keşfedin.',
    searchPlaceholder: locale === 'en' ? 'Search beach name...' : locale === 'el' ? 'Αναζήτηση παραλίας...' : 'Plaj adı ara...',
    sortRating: locale === 'en' ? 'Highest rated' : locale === 'el' ? 'Καλύτερη βαθμολογία' : 'En yüksek puan',
    sortName: locale === 'en' ? 'Name (A-Z)' : locale === 'el' ? 'Όνομα (Α-Ω)' : 'İsim (A-Z)',
    noResults: locale === 'en' ? 'No beaches match your filters.' : locale === 'el' ? 'Καμία παραλία δεν ταιριάζει με τα φίλτρα σας.' : 'Filtrelerine uygun plaj bulunamadı.',
    resultCount: (n: number) => locale === 'en' ? `${n} beaches` : locale === 'el' ? `${n} παραλίες` : `${n} plaj`,
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLocaleLowerCase('tr')
    return beaches
      .filter((b) => {
        if (q && !b.name.toLocaleLowerCase('tr').includes(q)) return false
        if (typeFilter !== 'all' && b.beach_type !== typeFilter) return false
        if (familyOnly && !b.family_friendly) return false
        if (blueFlagOnly && !b.blue_flag) return false
        return true
      })
      .sort((a, b) => sort === 'name' ? a.name.localeCompare(b.name) : (b.avgRating ?? 0) - (a.avgRating ?? 0))
  }, [beaches, query, typeFilter, familyOnly, blueFlagOnly, sort])

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 transition-colors duration-300">
      <Header />
      <PageHero image="/mykonos.jpg" badge="🏖️" title={t.title} subtitle={t.subtitle} />

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
              { id: 'all' as const, label: locale === 'en' ? 'All Types' : locale === 'el' ? 'Όλοι οι Τύποι' : 'Tüm Tipler' },
              { id: 'sand' as const, label: '🏖️ Sand' },
              { id: 'pebble' as const, label: '🪨 Pebble' },
              { id: 'mixed' as const, label: '⛱️ Mixed' },
            ].map((type) => (
              <button key={type.id} onClick={() => setTypeFilter(type.id)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium border transition-all ${typeFilter === type.id ? 'bg-sky-50 dark:bg-sky-950/30 text-sky-600 border-sky-300' : 'bg-slate-50 dark:bg-neutral-950 border-slate-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400'}`}>
                {type.label}
              </button>
            ))}
            <label className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400 cursor-pointer ml-2">
              <input type="checkbox" checked={familyOnly} onChange={(e) => setFamilyOnly(e.target.checked)} className="rounded border-slate-300 text-sky-600 focus:ring-sky-500 h-4 w-4" />
              👨‍👩‍👧 {locale === 'en' ? 'Family Friendly' : locale === 'el' ? 'Φιλικό για Οικογένειες' : 'Aile Dostu'}
            </label>
            <label className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400 cursor-pointer">
              <input type="checkbox" checked={blueFlagOnly} onChange={(e) => setBlueFlagOnly(e.target.checked)} className="rounded border-slate-300 text-sky-600 focus:ring-sky-500 h-4 w-4" />
              💙 {locale === 'en' ? 'Blue Flag' : locale === 'el' ? 'Γαλάζια Σημαία' : 'Mavi Bayrak'}
            </label>
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
            {filtered.map((beach) => {
              const island = Array.isArray(beach.islands) ? beach.islands[0] : beach.islands
              return (
                <div key={beach.id}>
                  {island && (
                    <Link href={`/islands/${island.slug}`} className="inline-block mb-1.5 text-[10px] font-semibold text-sky-600 dark:text-sky-400 hover:underline">
                      📍 {island.name}
                    </Link>
                  )}
                  <BeachCard beach={beach} />
                </div>
              )
            })}
          </div>
        ) : (
          <div className="py-16 text-center bg-white dark:bg-neutral-900 border border-slate-100 dark:border-neutral-900 rounded-2xl">
            <span className="text-4xl">🏖️</span>
            <p className="mt-3 text-sm text-neutral-500">{t.noResults}</p>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  )
}
