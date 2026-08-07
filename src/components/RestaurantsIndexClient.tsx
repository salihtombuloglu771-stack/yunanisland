'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { PageHero } from '@/components/PageHero'
import { SiteFooter } from '@/components/SiteFooter'
import { RestaurantCard } from '@/components/RestaurantCard'
import { useLanguage } from '@/lib/i18n/LanguageProvider'
import type { Restaurant } from '@/lib/mockData'

type RestaurantRow = Restaurant & {
  avgRating?: number | null
  reviewCount?: number
  cuisine_en?: string | null
  cuisine_el?: string | null
  islands: { name: string; slug: string } | { name: string; slug: string }[]
}

const PRICE_ORDER: Record<string, number> = { budget: 0, mid: 1, expensive: 2 }

export function RestaurantsIndexClient({ restaurants, initialQuery }: { restaurants: RestaurantRow[]; initialQuery: string }) {
  const { locale } = useLanguage()
  const [query, setQuery] = useState(initialQuery)
  const [priceFilter, setPriceFilter] = useState<'all' | 'budget' | 'mid' | 'expensive'>('all')
  const [seaViewOnly, setSeaViewOnly] = useState(false)
  const [veganOnly, setVeganOnly] = useState(false)
  const [sort, setSort] = useState<'rating' | 'name' | 'price'>('rating')

  const t = {
    title: locale === 'en' ? 'All Restaurants' : locale === 'el' ? 'Όλα τα Εστιατόρια' : 'Tüm Restoranlar',
    subtitle: locale === 'en' ? 'Browse every restaurant across all Greek islands in one place.' : locale === 'el' ? 'Περιηγηθείτε σε όλα τα εστιατόρια των ελληνικών νησιών σε ένα μέρος.' : 'Yunan Adaları\'ndaki tüm restoranları tek yerden keşfedin.',
    searchPlaceholder: locale === 'en' ? 'Search restaurant name...' : locale === 'el' ? 'Αναζήτηση εστιατορίου...' : 'Restoran adı ara...',
    sortRating: locale === 'en' ? 'Highest rated' : locale === 'el' ? 'Καλύτερη βαθμολογία' : 'En yüksek puan',
    sortName: locale === 'en' ? 'Name (A-Z)' : locale === 'el' ? 'Όνομα (Α-Ω)' : 'İsim (A-Z)',
    sortPrice: locale === 'en' ? 'Price (low to high)' : locale === 'el' ? 'Τιμή (φθηνό-ακριβό)' : 'Fiyat (ucuzdan pahalıya)',
    noResults: locale === 'en' ? 'No restaurants match your filters.' : locale === 'el' ? 'Κανένα εστιατόριο δεν ταιριάζει με τα φίλτρα σας.' : 'Filtrelerine uygun restoran bulunamadı.',
    resultCount: (n: number) => locale === 'en' ? `${n} restaurants` : locale === 'el' ? `${n} εστιατόρια` : `${n} restoran`,
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLocaleLowerCase('tr')
    return restaurants
      .filter((r) => {
        if (q && !r.name.toLocaleLowerCase('tr').includes(q)) return false
        if (priceFilter !== 'all' && r.price_level !== priceFilter) return false
        if (seaViewOnly && !r.sea_view) return false
        if (veganOnly && !r.vegan) return false
        return true
      })
      .sort((a, b) => {
        if (sort === 'name') return a.name.localeCompare(b.name)
        if (sort === 'price') return PRICE_ORDER[a.price_level] - PRICE_ORDER[b.price_level]
        return (b.avgRating ?? 0) - (a.avgRating ?? 0)
      })
  }, [restaurants, query, priceFilter, seaViewOnly, veganOnly, sort])

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 transition-colors duration-300">
      <Header />
      <PageHero image="/santorini.jpg" badge="🍽️" title={t.title} subtitle={t.subtitle} />

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
              { id: 'all' as const, label: locale === 'en' ? 'All Prices' : locale === 'el' ? 'Όλες οι Τιμές' : 'Tüm Fiyatlar' },
              { id: 'budget' as const, label: '💰 Budget' },
              { id: 'mid' as const, label: '💳 Mid-Range' },
              { id: 'expensive' as const, label: '💎 Fine Dining' },
            ].map((price) => (
              <button key={price.id} onClick={() => setPriceFilter(price.id)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium border transition-all ${priceFilter === price.id ? 'bg-sky-50 dark:bg-sky-950/30 text-sky-600 border-sky-300' : 'bg-slate-50 dark:bg-neutral-950 border-slate-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400'}`}>
                {price.label}
              </button>
            ))}
            <label className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400 cursor-pointer ml-2">
              <input type="checkbox" checked={seaViewOnly} onChange={(e) => setSeaViewOnly(e.target.checked)} className="rounded border-slate-300 text-sky-600 focus:ring-sky-500 h-4 w-4" />
              🌊 {locale === 'en' ? 'Sea View' : locale === 'el' ? 'Θέα στη Θάλασσα' : 'Deniz Manzaralı'}
            </label>
            <label className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400 cursor-pointer">
              <input type="checkbox" checked={veganOnly} onChange={(e) => setVeganOnly(e.target.checked)} className="rounded border-slate-300 text-sky-600 focus:ring-sky-500 h-4 w-4" />
              🌱 {locale === 'en' ? 'Vegan' : locale === 'el' ? 'Vegan' : 'Vegan'}
            </label>
            <select value={sort} onChange={(e) => setSort(e.target.value as 'rating' | 'name' | 'price')}
              className="ml-auto rounded-lg border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-1.5 px-3 text-xs outline-none focus:border-sky-500">
              <option value="rating">{t.sortRating}</option>
              <option value="name">{t.sortName}</option>
              <option value="price">{t.sortPrice}</option>
            </select>
          </div>
        </div>

        <p className="text-xs text-neutral-400 mb-4">{t.resultCount(filtered.length)}</p>

        {filtered.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((restaurant) => {
              const island = Array.isArray(restaurant.islands) ? restaurant.islands[0] : restaurant.islands
              return (
                <div key={restaurant.id}>
                  {island && (
                    <Link href={`/islands/${island.slug}`} className="inline-block mb-1.5 text-[10px] font-semibold text-sky-600 dark:text-sky-400 hover:underline">
                      📍 {island.name}
                    </Link>
                  )}
                  <RestaurantCard restaurant={restaurant} />
                </div>
              )
            })}
          </div>
        ) : (
          <div className="py-16 text-center bg-white dark:bg-neutral-900 border border-slate-100 dark:border-neutral-900 rounded-2xl">
            <span className="text-4xl">🍽️</span>
            <p className="mt-3 text-sm text-neutral-500">{t.noResults}</p>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  )
}
