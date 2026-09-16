'use client'

import type { Locale } from '@/lib/i18n/dictionary'

export interface AffiliateLinkItem {
  id: string
  provider: string
  url: string
}

const PROVIDER_META: Record<string, { icon: string; label: Record<Locale, string> }> = {
  car_rental: {
    icon: '🚗',
    label: { tr: 'Araç Kirala', en: 'Rent a Car', el: 'Νοικιάστε Αυτοκίνητο' },
  },
  transfer: {
    icon: '🚕',
    label: { tr: 'Transfer Ayarla', en: 'Book a Transfer', el: 'Κλείστε Μεταφορά' },
  },
}

const CARD_TITLE: Record<Locale, string> = {
  tr: 'Araç Kiralama & Transfer',
  en: 'Car Rental & Transfers',
  el: 'Ενοικίαση Αυτοκινήτου & Μεταφορές',
}

export function AffiliateLinksCard({ items, locale }: { items: AffiliateLinkItem[]; locale: Locale }) {
  const relevant = items.filter((item) => item.provider in PROVIDER_META)
  if (relevant.length === 0) return null

  return (
    <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-slate-100 dark:border-neutral-900 shadow-sm">
      <h3 className="text-sm font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-3">
        {CARD_TITLE[locale]}
      </h3>
      <div className="space-y-2">
        {relevant.map((item) => {
          const meta = PROVIDER_META[item.provider]
          return (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="flex items-center justify-center gap-2 rounded-xl bg-sky-600 hover:bg-sky-500 py-2.5 text-xs font-bold text-white transition-colors"
            >
              <span>{meta.icon}</span>
              {meta.label[locale]}
              <span>↗</span>
            </a>
          )
        })}
      </div>
    </div>
  )
}
