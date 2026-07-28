'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/i18n/LanguageProvider'

export function SiteFooter() {
  const { t } = useLanguage()

  return (
    <footer className="border-t border-slate-100 dark:border-neutral-900 bg-white dark:bg-neutral-950 py-8 mt-24">
      <div className="mx-auto max-w-7xl px-6 text-center space-y-2">
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          &copy; 2026 Yunanisland. {t('footer.rights')}
        </p>
        <Link href="/gizlilik-politikasi" className="inline-block text-xs text-neutral-400 hover:text-sky-600 dark:hover:text-sky-400 hover:underline">
          Gizlilik Politikası
        </Link>
      </div>
    </footer>
  )
}
