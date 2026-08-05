'use client'

import { useLanguage } from '@/lib/i18n/LanguageProvider'

interface EventItem {
  id: string
  title: string
  slug: string
  description: string | null
  category: string
  start_date: string
  end_date: string | null
  location: string | null
  islands: { name: string; slug: string }[] | { name: string; slug: string } | null
}

const CATEGORY_LABELS: Record<string, { tr: string; en: string; el: string }> = {
  festival: { tr: '🎉 Festival', en: '🎉 Festival', el: '🎉 Φεστιβάλ' },
  concert: { tr: '🎵 Konser', en: '🎵 Concert', el: '🎵 Συναυλία' },
  sports: { tr: '⚽ Spor', en: '⚽ Sports', el: '⚽ Αθλητισμός' },
  food: { tr: '🍽️ Gastronomi', en: '🍽️ Gastronomy', el: '🍽️ Γαστρονομία' },
  religious: { tr: '🕊️ Dini', en: '🕊️ Religious', el: '🕊️ Θρησκευτικό' },
  seasonal: { tr: '📅 Mevsimlik', en: '📅 Seasonal', el: '📅 Εποχιακό' },
  other: { tr: '✨ Diğer', en: '✨ Other', el: '✨ Άλλο' },
}

export function EventsList({ events }: { events: EventItem[] }) {
  const { locale } = useLanguage()

  const t = {
    noEvents: locale === 'en' ? 'No upcoming events found.' : locale === 'el' ? 'Δεν βρέθηκαν επερχόμενες εκδηλώσεις.' : 'Yaklaşan etkinlik bulunmuyor.',
    greece: locale === 'en' ? 'Greece' : locale === 'el' ? 'Ελλάδα' : 'Yunanistan',
  }

  const localeTag = locale === 'en' ? 'en-US' : locale === 'el' ? 'el-GR' : 'tr-TR'

  if (!events || events.length === 0) {
    return (
      <div className="py-16 text-center bg-white dark:bg-neutral-900 border border-dashed border-slate-200 dark:border-neutral-800 rounded-2xl">
        <span className="text-4xl">📅</span>
        <p className="mt-4 text-sm text-neutral-500">{t.noEvents}</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {events.map((event) => {
        const island = Array.isArray(event.islands) ? event.islands[0] : event.islands
        const start = new Date(event.start_date)
        const categoryLabel = CATEGORY_LABELS[event.category]?.[locale] ?? event.category
        return (
          <div key={event.id} className="flex gap-4 bg-white dark:bg-neutral-900 p-5 rounded-2xl border border-slate-100 dark:border-neutral-900 shadow-sm">
            <div className="flex-shrink-0 w-16 text-center bg-sky-50 dark:bg-sky-950/30 rounded-xl py-2">
              <p className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase">{start.toLocaleDateString(localeTag, { month: 'short' })}</p>
              <p className="text-xl font-extrabold text-sky-700 dark:text-sky-300">{start.getDate()}</p>
            </div>
            <div>
              <span className="text-xs font-semibold text-neutral-500">{categoryLabel}</span>
              <h2 className="text-lg font-bold text-neutral-900 dark:text-white mt-1">{event.title}</h2>
              {event.description && <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">{event.description}</p>}
              <p className="mt-2 text-xs text-neutral-400">
                📍 {event.location ?? island?.name ?? t.greece}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
