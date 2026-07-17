'use client'

import Image from 'next/image'
import { useLanguage } from '@/lib/i18n/LanguageProvider'

export function HomeHero() {
  const { t } = useLanguage()

  return (
    <section className="relative overflow-hidden bg-slate-900 py-24 text-white dark:bg-black">
      <Image
        src="/mykonos.jpg"
        alt=""
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/45 to-slate-950/90" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,165,233,0.15),rgba(255,255,255,0))]" />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <span className="inline-flex items-center rounded-full bg-sky-500/20 px-3 py-1 text-xs font-medium text-sky-300 ring-1 ring-inset ring-sky-400/30 backdrop-blur-sm [text-shadow:0_1px_3px_rgba(0,0,0,0.8)]">
          {t('home.badge')}
        </span>
        <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-6xl bg-gradient-to-r from-sky-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
          {t('home.title')}
        </h1>
        <p className="mt-6 text-lg leading-8 text-white max-w-2xl mx-auto [text-shadow:0_1px_4px_rgba(0,0,0,0.9)]">
          {t('home.subtitle')}
        </p>
      </div>
    </section>
  )
}
