'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getConsent, setConsent } from '@/lib/cookieConsent'

export function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (getConsent() === null) setVisible(true)
  }, [])

  if (!visible) return null

  const handle = (value: 'accepted' | 'rejected') => {
    setConsent(value)
    setVisible(false)
  }

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 bg-white dark:bg-neutral-900 border-t border-slate-200 dark:border-neutral-800 shadow-lg">
      <div className="mx-auto max-w-5xl px-4 py-4 flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
        <p className="text-xs text-neutral-600 dark:text-neutral-400 flex-1">
          🍪 Bu site, deneyiminizi geliştirmek ve site kullanımını analiz etmek için çerezler kullanır.{' '}
          <Link href="/gizlilik-politikasi" className="text-sky-600 hover:underline">Gizlilik Politikası</Link>&apos;nı inceleyebilirsiniz.
        </p>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            type="button"
            onClick={() => handle('rejected')}
            className="rounded-xl border border-slate-200 dark:border-neutral-700 px-4 py-2 text-xs font-semibold text-neutral-600 dark:text-neutral-300 hover:bg-slate-50 dark:hover:bg-neutral-800 transition-colors"
          >
            Reddet
          </button>
          <button
            type="button"
            onClick={() => handle('accepted')}
            className="rounded-xl bg-sky-600 px-4 py-2 text-xs font-semibold text-white shadow-md hover:bg-sky-500 transition-colors"
          >
            Kabul Et
          </button>
        </div>
      </div>
    </div>
  )
}
