'use client'

import { Suspense, useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Header } from '@/components/Header'
import { SiteFooter } from '@/components/SiteFooter'
import { createClient } from '@/lib/supabase/client'
import { useLanguage } from '@/lib/i18n/LanguageProvider'

interface Result {
  type: 'island' | 'beach' | 'restaurant' | 'hotel' | 'attraction'
  id: string
  name: string
  slug: string
  islandSlug?: string
  description: string | null
}

const TYPE_LABELS: Record<'tr' | 'en' | 'el', Record<Result['type'], string>> = {
  tr: { island: '🏝️ Ada', beach: '🏖️ Plaj', restaurant: '🍽️ Restoran', hotel: '🏨 Otel', attraction: '📍 Gezilecek Yer' },
  en: { island: '🏝️ Island', beach: '🏖️ Beach', restaurant: '🍽️ Restaurant', hotel: '🏨 Hotel', attraction: '📍 Attraction' },
  el: { island: '🏝️ Νησί', beach: '🏖️ Παραλία', restaurant: '🍽️ Εστιατόριο', hotel: '🏨 Ξενοδοχείο', attraction: '📍 Αξιοθέατο' },
}

function SearchForm() {
  const searchParams = useSearchParams()
  const { locale } = useLanguage()

  const t = {
    title: locale === 'en' ? 'Search Yunanisland' : locale === 'el' ? 'Αναζήτηση στο Yunanisland' : 'Yunanisland\'da Ara',
    subtitle: locale === 'en' ? 'Search across islands, beaches, restaurants, hotels and attractions.' : locale === 'el' ? 'Αναζητήστε νησιά, παραλίες, εστιατόρια, ξενοδοχεία και αξιοθέατα.' : 'Adalar, plajlar, restoranlar, oteller ve gezilecek yerler arasında arama yap.',
    placeholder: locale === 'en' ? 'e.g. Santorini, beach, sea view...' : locale === 'el' ? 'π.χ. Σαντορίνη, παραλία, θέα στη θάλασσα...' : 'Örn. Santorini, kumsal, deniz manzaralı...',
    searching: locale === 'en' ? '...' : locale === 'el' ? '...' : '...',
    search: locale === 'en' ? 'Search' : locale === 'el' ? 'Αναζήτηση' : 'Ara',
  }

  const noResultsText = (q: string) =>
    locale === 'en' ? `No results found for "${q}".`
      : locale === 'el' ? `Δεν βρέθηκαν αποτελέσματα για "${q}".`
      : `"${q}" için sonuç bulunamadı.`
  const [query, setQuery] = useState(searchParams.get('q') ?? '')
  const [results, setResults] = useState<Result[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  const runSearch = async (term: string, logSearch = false) => {
    if (!term.trim()) {
      setResults([])
      setSearched(false)
      return
    }
    setLoading(true)
    setSearched(true)

    const supabase = createClient()
    const ilikeTerm = `%${term.trim()}%`

    const [islandsRes, beachesRes, restaurantsRes, hotelsRes, attractionsRes] = await Promise.all([
      supabase.from('islands').select('id, name, slug, description, description_en, description_el').ilike('name', ilikeTerm).limit(10),
      supabase.from('beaches').select('id, name, slug, description, description_en, description_el, islands(slug)').ilike('name', ilikeTerm).limit(10),
      supabase.from('restaurants').select('id, name, slug, cuisine, cuisine_en, cuisine_el, islands(slug)').ilike('name', ilikeTerm).limit(10),
      supabase.from('hotels').select('id, name, slug, description, islands(slug)').ilike('name', ilikeTerm).limit(10),
      supabase.from('attractions').select('id, name, slug, description, description_en, description_el, islands(slug)').ilike('name', ilikeTerm).limit(10),
    ])

    const localized = (tr: string | null, en: string | null | undefined, el: string | null | undefined) =>
      locale === 'en' ? (en || tr) : locale === 'el' ? (el || tr) : tr

    const combined: Result[] = [
      ...(islandsRes.data ?? []).map((i) => ({ type: 'island' as const, id: i.id, name: i.name, slug: i.slug, description: localized(i.description, i.description_en, i.description_el) })),
      ...(beachesRes.data ?? []).map((b) => {
        const island = Array.isArray(b.islands) ? b.islands[0] : b.islands
        return { type: 'beach' as const, id: b.id, name: b.name, slug: b.slug, islandSlug: island?.slug, description: localized(b.description, b.description_en, b.description_el) }
      }),
      ...(restaurantsRes.data ?? []).map((r) => {
        const island = Array.isArray(r.islands) ? r.islands[0] : r.islands
        return { type: 'restaurant' as const, id: r.id, name: r.name, slug: r.slug, islandSlug: island?.slug, description: localized(r.cuisine, r.cuisine_en, r.cuisine_el) }
      }),
      ...(hotelsRes.data ?? []).map((h) => {
        const island = Array.isArray(h.islands) ? h.islands[0] : h.islands
        return { type: 'hotel' as const, id: h.id, name: h.name, slug: h.slug, islandSlug: island?.slug, description: h.description }
      }),
      ...(attractionsRes.data ?? []).map((a) => {
        const island = Array.isArray(a.islands) ? a.islands[0] : a.islands
        return { type: 'attraction' as const, id: a.id, name: a.name, slug: a.slug, islandSlug: island?.slug, description: localized(a.description, a.description_en, a.description_el) }
      }),
    ]

    setResults(combined)
    setLoading(false)

    if (logSearch) {
      supabase.from('search_logs').insert({ query: term.trim(), results_count: combined.length }).then(() => {})
    }
  }

  useEffect(() => {
    const initialQ = searchParams.get('q')
    if (initialQ) runSearch(initialQ, true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // live search: re-run automatically as the user types, after a short pause
  useEffect(() => {
    const handle = setTimeout(() => {
      if (query.trim()) runSearch(query)
    }, 350)
    return () => clearTimeout(handle)
  }, [query])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    runSearch(query, true)
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 transition-colors duration-300">
      <Header />

      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">{t.title}</h1>
        <p className="mt-2 text-sm text-neutral-500">{t.subtitle}</p>

        <form onSubmit={handleSubmit} className="mt-6 relative">
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.placeholder}
            className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 py-3 px-4 text-sm outline-none focus:border-sky-500 transition-all"
          />
          <button
            type="submit"
            disabled={loading}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-sky-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-sky-500 transition-colors disabled:opacity-50"
          >
            {loading ? t.searching : t.search}
          </button>
        </form>

        <div className="mt-8 space-y-3">
          {results.map((r) => {
            const hrefByType: Record<Result['type'], string> = {
              island: `/islands/${r.slug}`,
              beach: `/beaches/${r.slug}`,
              restaurant: `/restaurants/${r.slug}`,
              hotel: `/hotels/${r.slug}`,
              attraction: `/attractions/${r.slug}`,
            }
            return (
            <Link
              key={`${r.type}-${r.id}`}
              href={hrefByType[r.type]}
              className="block bg-white dark:bg-neutral-900 p-4 rounded-xl border border-slate-100 dark:border-neutral-900 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-sky-600 dark:text-sky-400">{TYPE_LABELS[locale][r.type]}</span>
                <span className="font-semibold text-neutral-900 dark:text-white">{r.name}</span>
              </div>
              {r.description && (
                <p className="mt-1 text-sm text-neutral-500 line-clamp-1">{r.description}</p>
              )}
            </Link>
            )
          })}

          {searched && !loading && results.length === 0 && (
            <div className="text-center py-12 bg-white dark:bg-neutral-900 border border-dashed border-slate-200 dark:border-neutral-800 rounded-2xl">
              <span className="text-3xl">🔍</span>
              <p className="mt-3 text-sm text-neutral-500">{noResultsText(query)}</p>
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={null}>
      <SearchForm />
    </Suspense>
  )
}
