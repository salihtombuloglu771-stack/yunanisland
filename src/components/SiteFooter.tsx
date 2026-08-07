'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/i18n/LanguageProvider'
import { NewsletterSignup } from '@/components/NewsletterSignup'

export function SiteFooter() {
  const { t } = useLanguage()

  return (
    <footer className="border-t border-slate-100 dark:border-neutral-900 bg-white dark:bg-neutral-950 py-8 mt-24">
      <div className="mx-auto max-w-7xl px-6 text-center space-y-5">
        <div className="flex justify-center">
          <NewsletterSignup />
        </div>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          &copy; 2026 Yunanisland. {t('footer.rights')}
        </p>
        <p className="text-xs text-neutral-400 dark:text-neutral-500 max-w-2xl mx-auto">
          {t('footer.license')}
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link href="/hakkimizda" className="inline-block text-xs text-neutral-400 hover:text-sky-600 dark:hover:text-sky-400 hover:underline">
            Hakkımızda
          </Link>
          <Link href="/gizlilik-politikasi" className="inline-block text-xs text-neutral-400 hover:text-sky-600 dark:hover:text-sky-400 hover:underline">
            Gizlilik Politikası
          </Link>
          <Link href="/reklam-ver" className="inline-block text-xs text-neutral-400 hover:text-sky-600 dark:hover:text-sky-400 hover:underline">
            Reklam Ver
          </Link>
          <Link href="/iletisim" className="inline-block text-xs text-neutral-400 hover:text-sky-600 dark:hover:text-sky-400 hover:underline">
            İletişim
          </Link>
        </div>
      </div>
    </footer>
  )
}
