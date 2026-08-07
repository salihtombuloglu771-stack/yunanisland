'use client'

import { useState } from 'react'
import { Header } from '@/components/Header'
import { PageHero } from '@/components/PageHero'
import { SiteFooter } from '@/components/SiteFooter'
import { useLanguage } from '@/lib/i18n/LanguageProvider'

const ORIGIN_AIRPORTS = [
  { code: 'IST', label: 'İstanbul (IST)' },
  { code: 'SAW', label: 'İstanbul Sabiha Gökçen (SAW)' },
  { code: 'ADB', label: 'İzmir (ADB)' },
  { code: 'BJV', label: 'Bodrum-Milas (BJV)' },
  { code: 'AYT', label: 'Antalya (AYT)' },
  { code: 'ESB', label: 'Ankara (ESB)' },
  { code: 'ATH', label: 'Atina (ATH)' },
]

const DEST_AIRPORTS = [
  { code: 'JTR', label: 'Santorini (JTR)' },
  { code: 'JMK', label: 'Mykonos (JMK)' },
  { code: 'RHO', label: 'Rodos (RHO)' },
  { code: 'KGS', label: 'Kos (KGS)' },
  { code: 'ZTH', label: 'Zakynthos (ZTH)' },
  { code: 'JNX', label: 'Naxos (JNX) — genelde Atina aktarmalı' },
  { code: 'PAS', label: 'Paros (PAS) — genelde Atina aktarmalı' },
  { code: 'MLO', label: 'Milos (MLO) — genelde Atina aktarmalı' },
  { code: 'ATH', label: 'Atina (ATH)' },
]

function todayIso() {
  return new Date().toISOString().slice(0, 10)
}

function buildGoogleFlightsUrl(origin: string, dest: string, departDate: string, returnDate: string) {
  let q = `Flights from ${origin} to ${dest} on ${departDate}`
  if (returnDate) q += ` through ${returnDate}`
  return `https://www.google.com/travel/flights?q=${encodeURIComponent(q)}`
}

export default function FlightGuidePage() {
  const { locale } = useLanguage()
  const [origin, setOrigin] = useState('IST')
  const [dest, setDest] = useState('JTR')
  const [roundTrip, setRoundTrip] = useState(true)
  const [departDate, setDepartDate] = useState(todayIso())
  const [returnDate, setReturnDate] = useState(todayIso())

  const t = {
    badge: locale === 'en' ? 'Flight Search' : locale === 'el' ? 'Αναζήτηση Πτήσεων' : 'Uçak Bileti Arama',
    title: locale === 'en' ? 'Compare Real Flight Prices' : locale === 'el' ? 'Σύγκριση Πραγματικών Τιμών Πτήσεων' : 'Gerçek Uçak Bileti Fiyatlarını Karşılaştır',
    subtitle: locale === 'en'
      ? 'We don\'t sell tickets — pick your route and dates, we take you straight to Google Flights\' live results.'
      : locale === 'el'
      ? 'Δεν πουλάμε εισιτήρια — επιλέξτε διαδρομή και ημερομηνίες, σας πάμε απευθείας στα ζωντανά αποτελέσματα του Google Flights.'
      : 'Bilet satmıyoruz — güzergah ve tarihini seç, seni doğrudan Google Flights\'ın canlı sonuçlarına götürelim.',
    from: locale === 'en' ? 'From' : locale === 'el' ? 'Από' : 'Nereden',
    to: locale === 'en' ? 'To' : locale === 'el' ? 'Προς' : 'Nereye',
    roundTrip: locale === 'en' ? 'Round trip' : locale === 'el' ? 'Με επιστροφή' : 'Gidiş-dönüş',
    oneWay: locale === 'en' ? 'One way' : locale === 'el' ? 'Απλή μετάβαση' : 'Tek yön',
    departDate: locale === 'en' ? 'Departure date' : locale === 'el' ? 'Ημερομηνία αναχώρησης' : 'Gidiş Tarihi',
    returnDate: locale === 'en' ? 'Return date' : locale === 'el' ? 'Ημερομηνία επιστροφής' : 'Dönüş Tarihi',
    search: locale === 'en' ? 'Search on Google Flights ↗' : locale === 'el' ? 'Αναζήτηση στο Google Flights ↗' : 'Google Flights\'ta Ara ↗',
    disclaimer: locale === 'en'
      ? 'Prices shown on Google Flights are real and update live — Yunanisland has no ticketing system of its own.'
      : locale === 'el'
      ? 'Οι τιμές στο Google Flights είναι πραγματικές και ενημερώνονται ζωντανά — το Yunanisland δεν διαθέτει δικό του σύστημα έκδοσης εισιτηρίων.'
      : 'Google Flights\'ta gördüğün fiyatlar gerçek ve canlı güncelleniyor — Yunanisland\'ın kendi bilet satış sistemi yok.',
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const url = buildGoogleFlightsUrl(origin, dest, departDate, roundTrip ? returnDate : '')
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 transition-colors duration-300">
      <Header />

      <PageHero image="/santorini.jpg" badge={t.badge} title={t.title} subtitle={t.subtitle} />

      <main className="mx-auto max-w-2xl px-6 py-12">
        <form onSubmit={handleSearch} className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-slate-100 dark:border-neutral-900 shadow-sm space-y-5">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setRoundTrip(true)}
              className={`flex-1 rounded-xl py-2 text-xs font-semibold transition-all ${roundTrip ? 'bg-sky-600 text-white shadow-md' : 'bg-slate-50 dark:bg-neutral-950 text-neutral-600 dark:text-neutral-400 border border-slate-200 dark:border-neutral-800'}`}
            >
              {t.roundTrip}
            </button>
            <button
              type="button"
              onClick={() => setRoundTrip(false)}
              className={`flex-1 rounded-xl py-2 text-xs font-semibold transition-all ${!roundTrip ? 'bg-sky-600 text-white shadow-md' : 'bg-slate-50 dark:bg-neutral-950 text-neutral-600 dark:text-neutral-400 border border-slate-200 dark:border-neutral-800'}`}
            >
              {t.oneWay}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-2">{t.from}</label>
              <select
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-3 px-3 text-sm text-neutral-800 dark:text-white outline-none focus:border-sky-500 transition-all cursor-pointer"
              >
                {ORIGIN_AIRPORTS.map((a) => (
                  <option key={a.code} value={a.code}>{a.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-2">{t.to}</label>
              <select
                value={dest}
                onChange={(e) => setDest(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-3 px-3 text-sm text-neutral-800 dark:text-white outline-none focus:border-sky-500 transition-all cursor-pointer"
              >
                {DEST_AIRPORTS.map((a) => (
                  <option key={a.code} value={a.code}>{a.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className={`grid gap-4 ${roundTrip ? 'grid-cols-2' : 'grid-cols-1'}`}>
            <div>
              <label className="block text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-2">{t.departDate}</label>
              <input
                type="date"
                value={departDate}
                min={todayIso()}
                onChange={(e) => setDepartDate(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-3 px-3 text-sm text-neutral-800 dark:text-white outline-none focus:border-sky-500 transition-all"
              />
            </div>
            {roundTrip && (
              <div>
                <label className="block text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-2">{t.returnDate}</label>
                <input
                  type="date"
                  value={returnDate}
                  min={departDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-3 px-3 text-sm text-neutral-800 dark:text-white outline-none focus:border-sky-500 transition-all"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-sky-600 hover:bg-sky-500 py-3 text-sm font-semibold text-white shadow-md transition-colors"
          >
            ✈️ {t.search}
          </button>

          <p className="text-xs text-neutral-400 text-center">{t.disclaimer}</p>
        </form>
      </main>

      <SiteFooter />
    </div>
  )
}
