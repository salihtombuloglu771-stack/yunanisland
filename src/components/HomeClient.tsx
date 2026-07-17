'use client'

import { useState } from 'react'
import { IslandCard, type Island } from '@/components/IslandCard'
import { useLanguage } from '@/lib/i18n/LanguageProvider'

export function HomeClient({ islands }: { islands: Island[] }) {
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBudget, setSelectedBudget] = useState<string>('all')

  const filteredIslands = islands.filter((island) => {
    const matchesSearch = island.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (island.description && island.description.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesBudget = selectedBudget === 'all' || island.budget_level === selectedBudget

    return matchesSearch && matchesBudget
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
            placeholder="Ada veya özellik ara (örn. gün batımı, batık)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-sky-500 focus:bg-white dark:focus:bg-neutral-900 transition-all text-neutral-800 dark:text-white"
          />
        </div>

        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {[
            { id: 'all', label: '🏝️ Tüm Adalar' },
            { id: 'budget', label: '💰 Bütçe Dostu' },
            { id: 'mid', label: '💳 Orta Segment' },
            { id: 'luxury', label: '💎 Lüks' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedBudget(tab.id)}
              className={`whitespace-nowrap rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                selectedBudget === tab.id
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-500/10'
                  : 'bg-slate-50 dark:bg-neutral-950 text-neutral-600 dark:text-neutral-400 border border-slate-200 dark:border-neutral-850 hover:bg-slate-100 dark:hover:bg-neutral-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

      </div>

      {/* Adalar Listesi */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
            {t('home.destinations')}
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            {filteredIslands.length} ada listeleniyor
          </p>
        </div>

        {filteredIslands.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredIslands.map((island) => (
              <IslandCard key={island.id} island={island} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center bg-white dark:bg-neutral-900 border border-dashed border-slate-200 dark:border-neutral-850 rounded-2xl">
            <span className="text-4xl mb-4">🔍</span>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">Ada Bulunamadı</h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1 max-w-xs">
              Arama kriterlerinize uygun ada bulunamadı. Lütfen farklı kelimelerle deneyin veya filtreyi sıfırlayın.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedBudget('all'); }}
              className="mt-4 rounded-xl bg-slate-100 dark:bg-neutral-800 px-4 py-2 text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-slate-200 dark:hover:bg-neutral-750 transition-colors"
            >
              Filtreleri Temizle
            </button>
          </div>
        )}
      </div>
    </>
  )
}
