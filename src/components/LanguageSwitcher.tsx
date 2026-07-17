'use client'

import { useState } from 'react'
import { useLanguage } from '@/lib/i18n/LanguageProvider'
import type { Locale } from '@/lib/i18n/dictionary'

const OPTIONS: { code: Locale; flag: string; label: string }[] = [
  { code: 'tr', flag: '🇹🇷', label: 'TR' },
  { code: 'en', flag: '🇬🇧', label: 'EN' },
  { code: 'el', flag: '🇬🇷', label: 'EL' },
]

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage()
  const [open, setOpen] = useState(false)
  const current = OPTIONS.find((o) => o.code === locale) ?? OPTIONS[0]

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        className="text-xs font-bold text-neutral-500 dark:text-neutral-400 hover:text-sky-600 dark:hover:text-sky-400 border border-slate-200 dark:border-neutral-800 rounded-lg px-2 py-1 transition-colors"
      >
        {current.flag} {current.label}
      </button>
      {open && (
        <div className="absolute right-0 mt-1 w-24 bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-lg shadow-lg overflow-hidden z-50">
          {OPTIONS.map((o) => (
            <button
              key={o.code}
              onClick={() => { setLocale(o.code); setOpen(false) }}
              className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-left transition-colors ${
                o.code === locale
                  ? 'bg-sky-50 dark:bg-sky-950/30 text-sky-600 dark:text-sky-400'
                  : 'text-neutral-600 dark:text-neutral-400 hover:bg-slate-50 dark:hover:bg-neutral-800'
              }`}
            >
              {o.flag} {o.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
