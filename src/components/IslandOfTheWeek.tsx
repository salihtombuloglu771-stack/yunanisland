'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/lib/i18n/LanguageProvider'
import type { Island } from '@/components/IslandCard'

const BADGE: Record<'tr' | 'en' | 'el', string> = {
  tr: '🌟 Haftanın Adası',
  en: '🌟 Island of the Week',
  el: '🌟 Νησί της Εβδομάδας',
}

const CTA: Record<'tr' | 'en' | 'el', string> = {
  tr: 'Keşfet',
  en: 'Explore',
  el: 'Εξερευνήστε',
}

export function IslandOfTheWeek({ island }: { island: Island }) {
  const { locale } = useLanguage()
  const description = locale === 'en' ? (island.description_en || island.description)
    : locale === 'el' ? (island.description_el || island.description)
    : island.description

  return (
    <Link
      href={`/islands/${island.slug}`}
      className="group relative mb-8 block overflow-hidden rounded-3xl shadow-lg"
    >
      <div className="relative aspect-[21/9] sm:aspect-[3/1] w-full">
        {island.cover_image_url && (
          <Image
            src={island.cover_image_url}
            alt={island.name}
            fill
            sizes="100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      </div>
      <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10">
        <span className="mb-2 inline-block w-fit rounded-full bg-white/15 backdrop-blur-md px-3 py-1 text-xs font-bold text-white">
          {BADGE[locale]}
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white drop-shadow-md">{island.name}</h2>
        {description && (
          <p className="mt-2 max-w-2xl text-sm sm:text-base text-white/90 drop-shadow-md line-clamp-2">
            {description}
          </p>
        )}
        <span className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-neutral-900 shadow-md transition-colors group-hover:bg-sky-50">
          {CTA[locale]} →
        </span>
      </div>
    </Link>
  )
}
