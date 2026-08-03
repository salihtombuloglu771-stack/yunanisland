'use client'

import { useEffect, useState } from 'react'

interface Rates {
  date: string
  rates: Record<string, number>
}

const TARGETS = [
  { code: 'EUR', label: '🇪🇺 Euro', flag: '🇪🇺' },
  { code: 'TRY', label: '🇹🇷 Türk Lirası', flag: '🇹🇷' },
  { code: 'USD', label: '🇺🇸 Amerikan Doları', flag: '🇺🇸' },
  { code: 'GBP', label: '🇬🇧 İngiliz Sterlini', flag: '🇬🇧' },
]

export function CurrencyWidget() {
  const [data, setData] = useState<Rates | null>(null)
  const [error, setError] = useState(false)
  const [open, setOpen] = useState(false)

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
    <div className="fixed bottom-4 right-4 z-40 w-44 bg-white dark:bg-neutral-900 rounded-xl border border-slate-200 dark:border-neutral-800 shadow-lg overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-2 px-3 py-2 text-xs font-bold text-neutral-700 dark:text-neutral-300 hover:bg-slate-50 dark:hover:bg-neutral-800 transition-colors"
      >
        <span className="flex items-center gap-1.5">
          💱 {data && !error ? `1€ = ${data.rates.TRY?.toFixed(2)} ₺` : 'Döviz Kuru'}
        </span>
        <span className="text-[10px] flex-shrink-0">{open ? '▾' : '▴'}</span>
      </button>

      {open && (
        <div className="px-3 pb-3 pt-1 border-t border-slate-100 dark:border-neutral-800">
          {error ? (
            <p className="text-[11px] text-red-500 pt-2">Döviz kuru verisi alınamadı.</p>
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
              <p className="text-[9px] text-neutral-400 mt-1.5 text-center">1 € karşılığı{data.date ? ` · ${data.date}` : ''}</p>
            </>
          )}
        </div>
      )}
    </div>
  )
}
