'use client'

import { useEffect, useState } from 'react'

interface Rates {
  date: string
  rates: Record<string, number>
}

const TARGETS = [
  { code: 'TRY', label: '🇹🇷 Türk Lirası', flag: '🇹🇷' },
  { code: 'USD', label: '🇺🇸 Amerikan Doları', flag: '🇺🇸' },
  { code: 'GBP', label: '🇬🇧 İngiliz Sterlini', flag: '🇬🇧' },
]

export function CurrencyWidget() {
  const [data, setData] = useState<Rates | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    let isMounted = true
    fetch('https://api.frankfurter.dev/v1/latest?from=EUR&to=TRY,USD,GBP')
      .then((res) => res.json())
      .then((json) => {
        if (isMounted) setData(json)
      })
      .catch(() => {
        if (isMounted) setError(true)
      })
    return () => { isMounted = false }
  }, [])

  return (
    <div className="bg-white dark:bg-neutral-900 p-5 rounded-2xl border border-slate-100 dark:border-neutral-900 shadow-sm mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-neutral-700 dark:text-neutral-300 flex items-center gap-2">
          💱 Döviz Kuru <span className="text-xs font-normal text-neutral-400">(1 Euro)</span>
        </h3>
        {data?.date && <span className="text-[10px] text-neutral-400">{data.date}</span>}
      </div>

      {error ? (
        <p className="text-xs text-red-500">Döviz kuru verisi alınamadı.</p>
      ) : !data ? (
        <div className="flex gap-3 animate-pulse">
          {TARGETS.map((t) => (
            <div key={t.code} className="h-14 flex-1 bg-slate-100 dark:bg-neutral-800 rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3">
          {TARGETS.map((t) => (
            <div key={t.code} className="bg-slate-50 dark:bg-neutral-950 rounded-xl p-3 text-center">
              <p className="text-lg">{t.flag}</p>
              <p className="text-sm font-bold text-neutral-800 dark:text-neutral-200 mt-1">
                {data.rates[t.code]?.toFixed(2)}
              </p>
              <p className="text-[10px] text-neutral-400">{t.code}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
