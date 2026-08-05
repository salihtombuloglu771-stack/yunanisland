'use client'

import { useState } from 'react'
import { IslandCard, type Island } from '@/components/IslandCard'
import { useLanguage } from '@/lib/i18n/LanguageProvider'

export function HomeClient({ islands }: { islands: Island[] }) {
  const { locale, t } = useLanguage()

  const MOODS = [
    { id: 'honeymoon', label: locale === 'en' ? '❤️ Honeymoon' : locale === 'el' ? '❤️ Μήνας του Μέλιτος' : '❤️ Balayı' },
    { id: 'family', label: locale === 'en' ? '👨‍👩‍👧 Family' : locale === 'el' ? '👨‍👩‍👧 Οικογένεια' : '👨‍👩‍👧 Aile' },
    { id: 'nightlife', label: locale === 'en' ? '🎉 Nightlife' : locale === 'el' ? '🎉 Νυχτερινή Ζωή' : '🎉 Gece Hayatı' },
    { id: 'nature', label: locale === 'en' ? '🌿 Nature' : locale === 'el' ? '🌿 Φύση' : '🌿 Doğa' },
    { id: 'history', label: locale === 'en' ? '🏛️ History' : locale === 'el' ? '🏛️ Ιστορία' : '🏛️ Tarih' },
  ]

  const budgetTabs = [
    { id: 'all', label: locale === 'en' ? '🏝️ All Islands' : locale === 'el' ? '🏝️ Όλα τα Νησιά' : '🏝️ Tüm Adalar' },
    { id: 'budget', label: locale === 'en' ? '💰 Budget Friendly' : locale === 'el' ? '💰 Οικονομικά' : '💰 Bütçe Dostu' },
    { id: 'mid', label: locale === 'en' ? '💳 Mid-Range' : locale === 'el' ? '💳 Μεσαία Κατηγορία' : '💳 Orta Segment' },
    { id: 'luxury', label: locale === 'en' ? '💎 Luxury' : locale === 'el' ? '💎 Πολυτέλεια' : '💎 Lüks' },
  ]

  const tt = {
    searchPlaceholder: locale === 'en' ? 'Search islands or features (e.g. sunset, shipwreck)...' : locale === 'el' ? 'Αναζήτηση νησιών ή χαρακτηριστικών (π.χ. ηλιοβασίλεμα, ναυάγιο)...' : 'Ada veya özellik ara (örn. gün batımı, batık)...',
    byMood: locale === 'en' ? 'By Mood:' : locale === 'el' ? 'Κατά Διάθεση:' : 'Ruh Haline Göre:',
    listedCount: (n: number) => locale === 'en' ? `${n} islands listed` : locale === 'el' ? `${n} νησιά καταχωρημένα` : `${n} ada listeleniyor`,
    notFoundTitle: locale === 'en' ? 'No Island Found' : locale === 'el' ? 'Δεν Βρέθηκε Νησί' : 'Ada Bulunamadı',
    notFoundDesc: locale === 'en' ? 'No island matches your search criteria. Please try different keywords or clear the filters.' : locale === 'el' ? 'Κανένα νησί δεν ταιριάζει με τα κριτήρια αναζήτησής σας. Δοκιμάστε διαφορετικές λέξεις-κλειδιά ή καθαρίστε τα φίλτρα.' : 'Arama kriterlerinize uygun ada bulunamadı. Lütfen farklı kelimelerle deneyin veya filtreyi sıfırlayın.',
    clearFilters: locale === 'en' ? 'Clear Filters' : locale === 'el' ? 'Καθαρισμός Φίλτρων' : 'Filtreleri Temizle',
  }

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBudget, setSelectedBudget] = useState<string>('all')
  const [selectedMood, setSelectedMood] = useState<string | null>(null)

  const filteredIslands = islands.filter((island) => {
    const matchesSearch = island.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (island.description && island.description.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesBudget = selectedBudget === 'all' || island.budget_level === selectedBudget
    const matchesMood = !selectedMood || (island.moods ?? []).includes(selectedMood)

    return matchesSearch && matchesBudget && matchesMood
  })

  return (
    <>
      {/* Filtre ve Arama Alanı */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-slate-100 dark:border-neutral-900 shadow-sm mb-12">

        <div className="relative w-full md:max-w-md">
          <span className="absolute inset-y-0 left-3 flex items-center text-neutral-400">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            placeholder={tt.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-sky-500 focus:bg-white dark:focus:bg-neutral-900 transition-all text-neutral-800 dark:text-white"
          />
        </div>

        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {budgetTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedBudget(tab.id)}
              className={`whitespace-nowrap rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                selectedBudget === tab.id
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-500/10'
                  : 'bg-slate-50 dark:bg-neutral-950 text-neutral-600 dark:text-neutral-400 border border-slate-200 dark:border-neutral-800 hover:bg-slate-100 dark:hover:bg-neutral-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

      </div>

      {/* Ruh Haline Göre Hızlı Filtre */}
      <div className="flex flex-wrap items-center gap-2 mb-10">
        <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mr-1">
          {tt.byMood}
        </span>
        {MOODS.map((mood) => (
          <button
            key={mood.id}
            onClick={() => setSelectedMood((prev) => (prev === mood.id ? null : mood.id))}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold border transition-all ${
              selectedMood === mood.id
                ? 'bg-rose-500 border-rose-500 text-white shadow-md shadow-rose-500/20'
                : 'bg-white dark:bg-neutral-900 border-slate-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:border-rose-300 dark:hover:border-rose-800'
            }`}
          >
            {mood.label}
          </button>
        ))}
      </div>

      {/* Adalar Listesi */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
            {t('home.destinations')}
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            {tt.listedCount(filteredIslands.length)}
          </p>
        </div>

        {filteredIslands.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredIslands.map((island) => (
              <IslandCard key={island.id} island={island} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center bg-white dark:bg-neutral-900 border border-dashed border-slate-200 dark:border-neutral-800 rounded-2xl">
            <span className="text-4xl mb-4">🔍</span>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">{tt.notFoundTitle}</h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1 max-w-xs">
              {tt.notFoundDesc}
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedBudget('all'); setSelectedMood(null); }}
              className="mt-4 rounded-xl bg-slate-100 dark:bg-neutral-800 px-4 py-2 text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-slate-200 dark:hover:bg-neutral-700 transition-colors"
            >
              {tt.clearFilters}
            </button>
          </div>
        )}
      </div>
    </>
  )
}
