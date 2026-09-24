'use client'

import Link from '@/components/LocaleLink'
import { useLanguage } from '@/lib/i18n/LanguageProvider'

const COPY: Record<'tr' | 'en' | 'el', { title: string; subtitle: string; cta: string }> = {
  tr: { title: 'Sana hangi Yunan adası uygun?', subtitle: '5 soruluk testi çöz, adanı bul, arkadaşlarınla paylaş.', cta: 'Teste Başla →' },
  en: { title: 'Which Greek island are you?', subtitle: 'Take the 5-question quiz, find your island, share it with friends.', cta: 'Start the Quiz →' },
  el: { title: 'Ποιο ελληνικό νησί σας ταιριάζει;', subtitle: 'Κάντε το κουίζ 5 ερωτήσεων και μοιραστείτε το νησί σας.', cta: 'Ξεκινήστε →' },
}

export function IslandQuizCta() {
  const { locale } = useLanguage()
  const c = COPY[locale]

  return (
    <Link
      href="/hangi-ada"
      className="group mb-8 flex flex-col gap-4 rounded-3xl bg-gradient-to-r from-sky-600 to-indigo-600 p-6 text-white shadow-lg sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex items-center gap-4">
        <span className="text-4xl">🧭</span>
        <div>
          <p className="text-xl font-bold">{c.title}</p>
          <p className="text-sm text-sky-100">{c.subtitle}</p>
        </div>
      </div>
      <span className="self-start rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-sky-700 shadow transition-transform group-hover:scale-105 sm:self-auto">
        {c.cta}
      </span>
    </Link>
  )
}
