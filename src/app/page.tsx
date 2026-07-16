'use client'

import { useState } from 'react'
import Link from 'next/link'
import { IslandCard } from '@/components/IslandCard'
import { MOCK_ISLANDS } from '@/lib/mockData'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBudget, setSelectedBudget] = useState<string>('all')

  const filteredIslands = MOCK_ISLANDS.filter((island) => {
    const matchesSearch = island.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (island.description && island.description.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesBudget = selectedBudget === 'all' || island.budget_level === selectedBudget

    return matchesSearch && matchesBudget
  })

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 transition-colors duration-300">
      
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-100 dark:border-neutral-900 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-sky-600 dark:text-sky-400">
            <span>🏝️</span>
            <span>Yunanisland</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/ferry-guide" className="text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
              Feribot Rehberi
            </Link>
            <Link href="/blog" className="text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
              Gezi Blogu
            </Link>
            <Link href="/admin/dashboard" className="text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
              Admin Paneli
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 hover:text-sky-600 transition-colors">
              Giriş Yap
            </Link>
            <Link href="/register" className="rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-sky-500 transition-all hover:shadow-sky-500/10">
              Kayıt Ol
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 py-24 text-white dark:bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,165,233,0.15),rgba(255,255,255,0))]" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <span className="inline-flex items-center rounded-full bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-400 ring-1 ring-inset ring-sky-500/20">
            Yunanistan Adaları Rehberi
          </span>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-6xl bg-gradient-to-r from-sky-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
            Ege&apos;nin Masalsı Dünyasını Keşfedin
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-300 max-w-2xl mx-auto">
            Yunan Adaları&apos;nın saklı koyları, eşsiz plajları, en özel restoranları ve feribot rotalarıyla dolu en kapsamlı gezi planlayıcınız.
          </p>
        </div>
      </section>

      {/* Main Content & Interactive Area */}
      <main className="mx-auto max-w-7xl px-6 py-12">
        
        {/* Filtre ve Arama Alanı */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-slate-100 dark:border-neutral-900 shadow-sm mb-12">
          
          {/* Arama Inputu */}
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

          {/* Bütçe Filtreleri */}
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
              Popüler Destinasyonlar
            </h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {filteredIslands.length} ada listeleniyor
            </p>
          </div>

          {filteredIslands.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-100 dark:border-neutral-900 bg-white dark:bg-neutral-950 py-8 mt-24">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            &copy; 2026 Yunanisland. Tüm hakları saklıdır.
          </p>
        </div>
      </footer>

    </div>
  )
}

