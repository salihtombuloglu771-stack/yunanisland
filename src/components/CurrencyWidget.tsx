'use client'

import { useEffect, useState } from 'react'
import { getConsent, onConsentChange } from '@/lib/cookieConsent'
import { useLanguage } from '@/lib/i18n/LanguageProvider'

interface Rates {
  date: string
  rates: Record<string, number>
}

const TARGET_CODES = ['EUR', 'TRY', 'USD', 'GBP'] as const

export function CurrencyWidget() {
  const { locale } = useLanguage()

  const TARGET_LABELS: Record<(typeof TARGET_CODES)[number], string> = {
    EUR: locale === 'en' ? '🇪🇺 Euro' : locale === 'el' ? '🇪🇺 Ευρώ' : '🇪🇺 Euro',
    TRY: locale === 'en' ? '🇹🇷 Turkish Lira' : locale === 'el' ? '🇹🇷 Τουρκική Λίρα' : '🇹🇷 Türk Lirası',
    USD: locale === 'en' ? '🇺🇸 US Dollar' : locale === 'el' ? '🇺🇸 Δολάριο ΗΠΑ' : '🇺🇸 Amerikan Doları',
    GBP: locale === 'en' ? '🇬🇧 British Pound' : locale === 'el' ? '🇬🇧 Βρετανική Λίρα' : '🇬🇧 İngiliz Sterlini',
  }

  const TARGETS = TARGET_CODES.map((code) => ({ code, label: TARGET_LABELS[code], flag: TARGET_LABELS[code].split(' ')[0] }))

  const t = {
    rate: locale === 'en' ? 'Exchange Rate' : locale === 'el' ? 'Ισοτιμία' : 'Döviz Kuru',
    error: locale === 'en' ? 'Could not fetch exchange rate data.' : locale === 'el' ? 'Δεν ήταν δυνατή η ανάκτηση των στοιχείων ισοτιμίας.' : 'Döviz kuru verisi alınamadı.',
    perEuro: locale === 'en' ? 'per 1 €' : locale === 'el' ? 'ανά 1 €' : '1 € karşılığı',
  }

  const [data, setData] = useState<Rates | null>(null)
  const [error, setError] = useState(false)
  const [open, setOpen] = useState(false)
  const [bannerVisible, setBannerVisible] = useState(false)

  useEffect(() => {
    setBannerVisible(getConsent() === null)
    return onConsentChange(() => setBannerVisible(false))
  }, [])

  useEffect(() => {
    let isMounted = true
    fetch('https://api.frankfurter.dev/v1/latest?from=EUR&to=TRY,USD,GBP')
      .then((res) => res.json())
      .then((json) => {
        // the base currency (EUR) isn't included in `rates` by the API, add it explicitly
        if (isMounted) setData({ ...json, rates: { EUR: 1, ...json.rates } })
      })
      .catch(() => {
        if (isMounted) setError(true)
      })
    return () => { isMounted = false }
  }, [])

  return (
    <div className={`fixed right-4 z-40 w-44 bg-white dark:bg-neutral-900 rounded-xl border border-slate-200 dark:border-neutral-800 shadow-lg overflow-hidden transition-[bottom] duration-200 ${bannerVisible ? 'bottom-20 sm:bottom-16' : 'bottom-4'}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-2 px-3 py-2 text-xs font-bold text-neutral-700 dark:text-neutral-300 hover:bg-slate-50 dark:hover:bg-neutral-800 transition-colors"
      >
        <span className="flex items-center gap-1.5">
          💱 {data && !error ? `1€ = ${data.rates.TRY?.toFixed(2)} ₺` : t.rate}
        </span>
        <span className="text-[10px] flex-shrink-0">{open ? '▾' : '▴'}</span>
      </button>

      {open && (
        <div className="px-3 pb-3 pt-1 border-t border-slate-100 dark:border-neutral-800">
          {error ? (
            <p className="text-[11px] text-red-500 pt-2">{t.error}</p>
          ) : !data ? (
            <div className="grid grid-cols-2 gap-1.5 pt-2 animate-pulse">
              {TARGETS.map((t) => (
                <div key={t.code} className="h-10 bg-slate-100 dark:bg-neutral-800 rounded-lg" />
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-1.5 pt-2">
                {TARGETS.map((t) => (
                  <div key={t.code} className="bg-slate-50 dark:bg-neutral-950 rounded-lg p-1.5 text-center">
                    <p className="text-xs">{t.flag}</p>
                    <p className="text-[11px] font-bold text-neutral-800 dark:text-neutral-200">
                      {data.rates[t.code]?.toFixed(2)}
                    </p>
                    <p className="text-[9px] text-neutral-400">{t.code}</p>
                  </div>
                ))}
              </div>
              <p className="text-[9px] text-neutral-400 mt-1.5 text-center">{t.perEuro}{data.date ? ` · ${data.date}` : ''}</p>
            </>
          )}
        </div>
      )}
    </div>
  )
}
