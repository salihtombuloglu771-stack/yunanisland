'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Header } from '@/components/Header'
import { createClient } from '@/lib/supabase/client'
import { FerryRoute } from '@/lib/mockData'

const PORTS = ['Bodrum', 'Kos', 'Atina (Pire)', 'Santorini', 'Rhodes']

function FerrySearchForm() {
  const searchParams = useSearchParams()
  const toParam = searchParams.get('to')
  const initialToPort = toParam && PORTS.includes(toParam) ? toParam : 'Kos'

  // Initialize from search query parameters (e.g., ?to=Kos) with a logical starting point
  const [fromPort, setFromPort] = useState(() => {
    if (initialToPort === 'Bodrum') return 'Kos'
    if (initialToPort === 'Kos') return 'Bodrum'
    if (initialToPort === 'Santorini' || initialToPort === 'Rhodes') return 'Kos'
    return 'Bodrum'
  })
  const [toPort, setToPort] = useState(initialToPort)
  const [routes, setRoutes] = useState<FerryRoute[]>([])
  const [hasSearched, setHasSearched] = useState(false)
  const [selectedRouteForTicket, setSelectedRouteForTicket] = useState<FerryRoute | null>(null)
  const [searching, setSearching] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setSearching(true)
    const supabase = createClient()
    const { data } = await supabase
      .from('ferry_routes')
      .select('*')
      .ilike('from_port', fromPort)
      .ilike('to_port', toPort)
    setRoutes((data as FerryRoute[]) ?? [])
    setHasSearched(true)
    setSelectedRouteForTicket(null)
    setSearching(false)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      {/* Sol Panel: Arama Formu */}
      <div className="lg:col-span-1 bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-slate-100 dark:border-neutral-900 shadow-sm h-fit">
        <h2 className="text-lg font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
          🚢 Rota Seçimi
        </h2>
        <form onSubmit={handleSearch} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-2">
              Nereden (Kalkış)
            </label>
            <select
              value={fromPort}
              onChange={(e) => setFromPort(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-neutral-850 bg-slate-50 dark:bg-neutral-950 py-3 px-4 text-sm text-neutral-850 dark:text-white outline-none focus:border-sky-500 focus:bg-white dark:focus:bg-neutral-900 transition-all cursor-pointer"
            >
              {PORTS.map(port => (
                <option key={port} value={port}>{port}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-2">
              Nereye (Varış)
            </label>
            <select
              value={toPort}
              onChange={(e) => setToPort(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-neutral-850 bg-slate-50 dark:bg-neutral-950 py-3 px-4 text-sm text-neutral-850 dark:text-white outline-none focus:border-sky-500 focus:bg-white dark:focus:bg-neutral-900 transition-all cursor-pointer"
            >
              {PORTS.map(port => (
                <option key={port} value={port} disabled={port === fromPort}>{port}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={searching}
            className="w-full mt-2 rounded-xl bg-sky-600 hover:bg-sky-500 py-3 text-sm font-semibold text-white shadow-md transition-colors disabled:opacity-50"
          >
            {searching ? 'Aranıyor...' : 'Seferleri Ara 🔍'}
          </button>
        </form>
      </div>

      {/* Sağ Panel: Sefer Sonuçları */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* Bilet Simülasyon Popup */}
        {selectedRouteForTicket && (
          <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 p-5 rounded-2xl animate-fade-in relative">
            <button 
              onClick={() => setSelectedRouteForTicket(null)}
              className="absolute top-3 right-3 text-emerald-800 dark:text-emerald-400 hover:scale-110 transition-transform font-bold text-sm"
            >
              ✕
            </button>
            <h3 className="font-bold text-base flex items-center gap-2">
              🎉 Rezervasyon Başarılı! (Simülasyon)
            </h3>
            <p className="mt-2 text-xs leading-relaxed">
              <strong>{selectedRouteForTicket.from_port} → {selectedRouteForTicket.to_port}</strong> feribotu için bilet alım işlemi başarıyla simüle edilmiştir. 
              <br />
              Canlı sistemde bu alan ziyaretçileri bilet satış ortağı acentelere (FerriesinGreece, Ferryhopper vb.) yönlendirecektir.
            </p>
          </div>
        )}

        {hasSearched ? (
          <div>
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
              Arama Sonuçları ({fromPort} ➔ {toPort})
            </h3>

            {routes.length > 0 ? (
              <div className="space-y-4">
                {routes.map(route => (
                  <div key={route.id} className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-slate-100 dark:border-neutral-900 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:shadow-md">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-neutral-855 dark:text-white">
                          {route.from_port} ➔ {route.to_port}
                        </span>
                      </div>
                      
                      <div className="mt-2 flex flex-wrap gap-2 text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                        <span>🕒 Yolculuk Süresi: <strong>{route.duration_minutes >= 60 ? `${Math.floor(route.duration_minutes / 60)} sa ${route.duration_minutes % 60} dk` : `${route.duration_minutes} dk`}</strong></span>
                        <span>•</span>
                        <span>💵 Bilet: <strong>{route.price_min} - {route.price_max} €</strong></span>
                      </div>

                      <div className="mt-4">
                        <p className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">İşleten Firmalar</p>
                        <div className="flex flex-wrap gap-1.5 mt-1.5">
                          {route.companies.map(company => (
                            <span key={company} className="bg-sky-500/10 text-sky-600 dark:text-sky-400 rounded-lg px-2.5 py-0.5 text-xs font-semibold">
                              🚢 {company}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center border-t md:border-t-0 border-slate-100 dark:border-neutral-850 pt-4 md:pt-0 gap-2">
                      <div className="text-left md:text-right">
                        <p className="text-xs text-neutral-400 dark:text-neutral-500">Kişi Başı Başlayan</p>
                        <p className="text-2xl font-extrabold text-sky-600 dark:text-sky-400">{route.price_min} €</p>
                      </div>
                      <button
                        onClick={() => setSelectedRouteForTicket(route)}
                        className="rounded-xl bg-sky-600 hover:bg-sky-500 px-5 py-2.5 text-xs font-semibold text-white shadow-md transition-colors"
                      >
                        Bilet Al 🎫
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-16 text-center bg-white dark:bg-neutral-900 border border-slate-100 dark:border-neutral-900 rounded-2xl">
                <span className="text-4xl">⚓❌</span>
                <h4 className="text-lg font-bold text-neutral-900 dark:text-white mt-4">Direkt Sefer Bulunmamadı</h4>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 max-w-sm mx-auto leading-relaxed">
                  Seçtiğiniz limanlar arasında direkt sefer bulunmamaktadır. Aktarmalı seferleri araştırmayı deneyebilir veya kalkış limanını değiştirebilirsiniz.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="py-16 text-center bg-white dark:bg-neutral-900 border border-slate-100 dark:border-neutral-900 rounded-2xl">
            <span className="text-5xl">⚓</span>
            <h4 className="text-lg font-bold text-neutral-900 dark:text-white mt-4">Sefer Arama Hazır</h4>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 max-w-xs mx-auto">
              Nereden kalkıp nereye gitmek istediğinizi soldaki panelden seçerek sefer saatlerini ve fiyatlarını anında sorgulayabilirsiniz.
            </p>
          </div>
        )}

      </div>

    </div>
  )
}

export default function FerryGuidePage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 transition-colors duration-300">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 py-16 text-white dark:bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,165,233,0.15),rgba(255,255,255,0))]" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <span className="inline-flex items-center rounded-full bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-400 ring-1 ring-inset ring-sky-500/20">
            Ada Ulaşım Portalı
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl bg-gradient-to-r from-sky-400 to-teal-350 bg-clip-text text-transparent">
            Feribot Seferleri Arama Rehberi
          </h1>
          <p className="mt-4 text-sm text-slate-350 max-w-xl mx-auto">
            Türkiye - Yunanistan adaları arası ve Kiklad/Oniki adalar içi tüm feribot hatları, bilet fiyatları ve süreleri.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-6 py-12">
        <Suspense fallback={<div className="text-center py-12 text-sm text-neutral-500">Arama motoru yükleniyor...</div>}>
          <FerrySearchForm />
        </Suspense>
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
