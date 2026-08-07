'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Header } from '@/components/Header'
import { PageHero } from '@/components/PageHero'
import { SiteFooter } from '@/components/SiteFooter'
import { createClient } from '@/lib/supabase/client'
import { FerryRoute } from '@/lib/mockData'
import { useLanguage } from '@/lib/i18n/LanguageProvider'

const PORTS = ['Bodrum', 'Kos', 'Atina (Pire)', 'Santorini', 'Rhodes', 'Patras', 'Igoumenitsa', 'Killini', 'Girit', 'Korfu', 'Kefalonya']

// Feribot bileti satan tek bir doğrulanmış siteye (Ferryhopper/DirectFerries vb.)
// derin bağlantı vermiyoruz çünkü rota URL'leri tahmin edilemez formatta
// (bazıları kırık çıktı) — flight-guide'daki Google Flights deseniyle aynı
// mantık: Google'ın kendi canlı arama sonucuna yönlendiriyoruz, hiçbir slug
// tahmin etmiyoruz, her zaman çalışır.
function buildFerrySearchUrl(from: string, to: string, locale: 'tr' | 'en' | 'el') {
  const q = locale === 'en'
    ? `ferry tickets from ${from} to ${to}`
    : locale === 'el'
    ? `εισιτήρια πλοίου από ${from} προς ${to}`
    : `${from} ${to} feribot bilet`
  return `https://www.google.com/search?q=${encodeURIComponent(q)}`
}

function FerrySearchForm() {
  const searchParams = useSearchParams()
  const { locale } = useLanguage()

  const t = {
    routeSelection: locale === 'en' ? '🚢 Route Selection' : locale === 'el' ? '🚢 Επιλογή Διαδρομής' : '🚢 Rota Seçimi',
    from: locale === 'en' ? 'From (Departure)' : locale === 'el' ? 'Από (Αναχώρηση)' : 'Nereden (Kalkış)',
    to: locale === 'en' ? 'To (Arrival)' : locale === 'el' ? 'Προς (Άφιξη)' : 'Nereye (Varış)',
    searching: locale === 'en' ? 'Searching...' : locale === 'el' ? 'Αναζήτηση...' : 'Aranıyor...',
    search: locale === 'en' ? 'Search Ferries 🔍' : locale === 'el' ? 'Αναζήτηση Δρομολογίων 🔍' : 'Seferleri Ara 🔍',
    ticketDisclaimer: locale === 'en'
      ? 'We don\'t sell tickets — we take you straight to live search results from real ferry ticket sellers.'
      : locale === 'el'
      ? 'Δεν πουλάμε εισιτήρια — σας πάμε απευθείας σε ζωντανά αποτελέσματα αναζήτησης από πραγματικούς πωλητές εισιτηρίων πλοίου.'
      : 'Bilet satmıyoruz — seni doğrudan gerçek feribot bileti satan sitelerin canlı arama sonuçlarına götürüyoruz.',
    searchResults: (from: string, to: string) =>
      locale === 'en' ? `Search Results (${from} ➔ ${to})` : locale === 'el' ? `Αποτελέσματα Αναζήτησης (${from} ➔ ${to})` : `Arama Sonuçları (${from} ➔ ${to})`,
    tripDuration: locale === 'en' ? 'Trip Duration:' : locale === 'el' ? 'Διάρκεια Ταξιδιού:' : 'Yolculuk Süresi:',
    ticket: locale === 'en' ? 'Ticket:' : locale === 'el' ? 'Εισιτήριο:' : 'Bilet:',
    operatingCompanies: locale === 'en' ? 'Operating Companies' : locale === 'el' ? 'Εταιρείες Λειτουργίας' : 'İşleten Firmalar',
    startingFrom: locale === 'en' ? 'Starting Per Person' : locale === 'el' ? 'Τιμή Ανά Άτομο Από' : 'Kişi Başı Başlayan',
    buyTicket: locale === 'en' ? 'Search Tickets ↗' : locale === 'el' ? 'Αναζήτηση Εισιτηρίων ↗' : 'Bilet Ara ↗',
    noDirectTitle: locale === 'en' ? 'No Direct Route Found' : locale === 'el' ? 'Δεν Βρέθηκε Απευθείας Δρομολόγιο' : 'Direkt Sefer Bulunmamadı',
    noDirectDesc: locale === 'en'
      ? 'There is no direct route between the ports you selected. You can try researching connecting routes or change the departure port.'
      : locale === 'el'
      ? 'Δεν υπάρχει απευθείας δρομολόγιο μεταξύ των λιμανιών που επιλέξατε. Μπορείτε να αναζητήσετε δρομολόγια με ανταπόκριση ή να αλλάξετε το λιμάνι αναχώρησης.'
      : 'Seçtiğiniz limanlar arasında direkt sefer bulunmamaktadır. Aktarmalı seferleri araştırmayı deneyebilir veya kalkış limanını değiştirebilirsiniz.',
    readyTitle: locale === 'en' ? 'Ready to Search Ferries' : locale === 'el' ? 'Έτοιμο για Αναζήτηση Δρομολογίων' : 'Sefer Arama Hazır',
    readyDesc: locale === 'en'
      ? 'Select where you want to depart from and go to in the panel on the left to instantly check ferry times and prices.'
      : locale === 'el'
      ? 'Επιλέξτε από πού θέλετε να αναχωρήσετε και πού θέλετε να πάτε στο αριστερό πάνελ για να δείτε άμεσα τις ώρες και τις τιμές των δρομολογίων.'
      : 'Nereden kalkıp nereye gitmek istediğinizi soldaki panelden seçerek sefer saatlerini ve fiyatlarını anında sorgulayabilirsiniz.',
    duration: (minutes: number) => {
      if (minutes >= 60) {
        const h = Math.floor(minutes / 60)
        const m = minutes % 60
        return locale === 'en' ? `${h}h ${m}m` : locale === 'el' ? `${h}ω ${m}λ` : `${h} sa ${m} dk`
      }
      return locale === 'en' ? `${minutes}m` : locale === 'el' ? `${minutes}λ` : `${minutes} dk`
    },
  }
  const toParam = searchParams.get('to')
  const initialToPort = toParam && PORTS.includes(toParam) ? toParam : 'Kos'

  // Initialize from search query parameters (e.g., ?to=Kos) with a logical starting point
  const [fromPort, setFromPort] = useState(() => {
    if (initialToPort === 'Bodrum') return 'Kos'
    if (initialToPort === 'Kos') return 'Bodrum'
    if (initialToPort === 'Santorini' || initialToPort === 'Rhodes') return 'Kos'
    if (initialToPort === 'Girit') return 'Atina (Pire)'
    if (initialToPort === 'Korfu') return 'Igoumenitsa'
    if (initialToPort === 'Kefalonya') return 'Patras'
    return 'Bodrum'
  })
  const [toPort, setToPort] = useState(initialToPort)
  const [routes, setRoutes] = useState<FerryRoute[]>([])
  const [hasSearched, setHasSearched] = useState(false)
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
    setSearching(false)
  }

  const handleBuyTicket = (route: FerryRoute) => {
    window.open(buildFerrySearchUrl(route.from_port, route.to_port, locale), '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      {/* Sol Panel: Arama Formu */}
      <div className="lg:col-span-1 bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-slate-100 dark:border-neutral-900 shadow-sm h-fit">
        <h2 className="text-lg font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
          {t.routeSelection}
        </h2>
        <form onSubmit={handleSearch} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-2">
              {t.from}
            </label>
            <select
              value={fromPort}
              onChange={(e) => setFromPort(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-3 px-4 text-sm text-neutral-800 dark:text-white outline-none focus:border-sky-500 focus:bg-white dark:focus:bg-neutral-900 transition-all cursor-pointer"
            >
              {PORTS.map(port => (
                <option key={port} value={port}>{port}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-2">
              {t.to}
            </label>
            <select
              value={toPort}
              onChange={(e) => setToPort(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-3 px-4 text-sm text-neutral-800 dark:text-white outline-none focus:border-sky-500 focus:bg-white dark:focus:bg-neutral-900 transition-all cursor-pointer"
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
            {searching ? t.searching : t.search}
          </button>
        </form>
      </div>

      {/* Sağ Panel: Sefer Sonuçları */}
      <div className="lg:col-span-2 space-y-6">

        {hasSearched ? (
          <div>
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
              {t.searchResults(fromPort, toPort)}
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
                        <span>🕒 {t.tripDuration} <strong>{t.duration(route.duration_minutes)}</strong></span>
                        <span>•</span>
                        <span>💵 {t.ticket} <strong>{route.price_min} - {route.price_max} €</strong></span>
                      </div>

                      <div className="mt-4">
                        <p className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">{t.operatingCompanies}</p>
                        <div className="flex flex-wrap gap-1.5 mt-1.5">
                          {route.companies.map(company => (
                            <span key={company} className="bg-sky-500/10 text-sky-600 dark:text-sky-400 rounded-lg px-2.5 py-0.5 text-xs font-semibold">
                              🚢 {company}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center border-t md:border-t-0 border-slate-100 dark:border-neutral-800 pt-4 md:pt-0 gap-2">
                      <div className="text-left md:text-right">
                        <p className="text-xs text-neutral-400 dark:text-neutral-500">{t.startingFrom}</p>
                        <p className="text-2xl font-extrabold text-sky-600 dark:text-sky-400">{route.price_min} €</p>
                      </div>
                      <button
                        onClick={() => handleBuyTicket(route)}
                        className="rounded-xl bg-sky-600 hover:bg-sky-500 px-5 py-2.5 text-xs font-semibold text-white shadow-md transition-colors"
                      >
                        {t.buyTicket}
                      </button>
                    </div>
                  </div>
                ))}
                <p className="text-xs text-neutral-400 text-center">{t.ticketDisclaimer}</p>
              </div>
            ) : (
              <div className="py-16 text-center bg-white dark:bg-neutral-900 border border-slate-100 dark:border-neutral-900 rounded-2xl">
                <span className="text-4xl">⚓❌</span>
                <h4 className="text-lg font-bold text-neutral-900 dark:text-white mt-4">{t.noDirectTitle}</h4>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 max-w-sm mx-auto leading-relaxed">
                  {t.noDirectDesc}
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="py-16 text-center bg-white dark:bg-neutral-900 border border-slate-100 dark:border-neutral-900 rounded-2xl">
            <span className="text-5xl">⚓</span>
            <h4 className="text-lg font-bold text-neutral-900 dark:text-white mt-4">{t.readyTitle}</h4>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 max-w-xs mx-auto">
              {t.readyDesc}
            </p>
          </div>
        )}

      </div>

    </div>
  )
}

export default function FerryGuidePage() {
  const { locale } = useLanguage()

  const hero = {
    badge: locale === 'en' ? 'Island Transport Portal' : locale === 'el' ? 'Πύλη Μεταφορών Νησιών' : 'Ada Ulaşım Portalı',
    title: locale === 'en' ? 'Ferry Route Search Guide' : locale === 'el' ? 'Οδηγός Αναζήτησης Δρομολογίων Φέριμποτ' : 'Feribot Seferleri Arama Rehberi',
    subtitle: locale === 'en'
      ? 'All ferry lines between Turkey and the Greek islands, and within the Cyclades/Dodecanese, along with ticket prices and durations.'
      : locale === 'el'
      ? 'Όλες οι γραμμές φέριμποτ μεταξύ Τουρκίας και ελληνικών νησιών, καθώς και εντός Κυκλάδων/Δωδεκανήσων, με τιμές εισιτηρίων και διάρκειες.'
      : 'Türkiye - Yunanistan adaları arası ve Kiklad/Oniki adalar içi tüm feribot hatları, bilet fiyatları ve süreleri.',
    loading: locale === 'en' ? 'Loading search engine...' : locale === 'el' ? 'Φόρτωση μηχανής αναζήτησης...' : 'Arama motoru yükleniyor...',
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 transition-colors duration-300">
      <Header />

      <PageHero
        image="/kos.jpg"
        badge={hero.badge}
        title={hero.title}
        subtitle={hero.subtitle}
      />

      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-6 py-12">
        <Suspense fallback={<div className="text-center py-12 text-sm text-neutral-500">{hero.loading}</div>}>
          <FerrySearchForm />
        </Suspense>
      </main>

      <SiteFooter />
    </div>
  )
}
