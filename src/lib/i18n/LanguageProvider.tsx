'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { dictionary, type Locale, type TranslationKey } from './dictionary'

interface LanguageContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: TranslationKey) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

const COOKIE_NAME = 'yunanisland-locale'

function readCookieLocale(): Locale {
  if (typeof document === 'undefined') return 'tr'
  const match = document.cookie.match(new RegExp(`${COOKIE_NAME}=(tr|en)`))
  return (match?.[1] as Locale) ?? 'tr'
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('tr')

  useEffect(() => {
    setLocaleState(readCookieLocale())
  }, [])

  const setLocale = (next: Locale) => {
    setLocaleState(next)
    document.cookie = `${COOKIE_NAME}=${next}; path=/; max-age=31536000`
  }

  const t = (key: TranslationKey) => dictionary[locale][key] ?? dictionary.tr[key]

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
