'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/Header'
import { addRecentlyViewed } from '@/lib/useRecentlyViewed'
import { FavoriteButton } from '@/components/FavoriteButton'
import { ShareButtons } from '@/components/ShareButtons'
import { ReviewSection } from '@/components/ReviewSection'
import { TripNoteBox } from '@/components/TripNoteBox'
import { TryPrice } from '@/components/TryPrice'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { useLanguage } from '@/lib/i18n/LanguageProvider'

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://yunanisland.vercel.app'

const BEACH_TYPE_LABELS = {
  tr: { sand: '🏖️ Kumluk', pebble: '🪨 Çakıllık', mixed: '⛱️ Karışık' },
  en: { sand: '🏖️ Sandy', pebble: '🪨 Pebbly', mixed: '⛱️ Mixed' },
  el: { sand: '🏖️ Αμμώδης', pebble: '🪨 Βοτσαλωτή', mixed: '⛱️ Μικτή' },
}

interface BeachDetailClientProps {
  beach: {
    id: string; name: string; slug: string; description: string | null
    description_en?: string | null; description_el?: string | null
    beach_type: string; blue_flag: boolean; sunset_rating: number | null
    cover_image_url: string | null; has_parking: boolean; has_showers: boolean
    has_toilets: boolean; has_beach_bar: boolean; has_lifeguard: boolean
    family_friendly: boolean; pet_friendly: boolean; sunbed_price: number | null
    umbrella_price: number | null; accessibility: string | null
  }
  island: { name: string; slug: string } | null
}

export function BeachDetailClient({ beach, island }: BeachDetailClientProps) {
  const { locale } = useLanguage()
  const description = locale === 'en' ? (beach.description_en || beach.description)
    : locale === 'el' ? (beach.description_el || beach.description)
    : beach.description

  const t = {
    home: locale === 'en' ? 'Home' : locale === 'el' ? 'Αρχική' : 'Ana Sayfa',
    blueFlag: locale === 'en' ? '💙 Blue Flag' : locale === 'el' ? '💙 Γαλάζια Σημαία' : '💙 Mavi Bayrak',
    sunset: locale === 'en' ? '🌅 Sunset' : locale === 'el' ? '🌅 Ηλιοβασίλεμα' : '🌅 Gün Batımı',
    parking: locale === 'en' ? '🚗 Parking' : locale === 'el' ? '🚗 Πάρκινγκ' : '🚗 Otopark',
    showers: locale === 'en' ? '🚿 Showers' : locale === 'el' ? '🚿 Ντουζ' : '🚿 Duş',
    toilets: locale === 'en' ? '🚽 Toilets' : locale === 'el' ? '🚽 Τουαλέτες' : '🚽 Tuvalet',
    beachBar: locale === 'en' ? '🍹 Beach Bar' : locale === 'el' ? '🍹 Beach Bar' : '🍹 Plaj Bar',
    lifeguard: locale === 'en' ? '🛟 Lifeguard' : locale === 'el' ? '🛟 Ναυαγοσώστης' : '🛟 Cankurtaran',
    familyFriendly: locale === 'en' ? '👨‍👩‍👧 Family Friendly' : locale === 'el' ? '👨‍👩‍👧 Φιλική για Οικογένειες' : '👨‍👩‍👧 Aile Dostu',
    petFriendly: locale === 'en' ? '🐾 Pet Friendly' : locale === 'el' ? '🐾 Φιλική για Κατοικίδια' : '🐾 Evcil Hayvan Dostu',
    sunbed: locale === 'en' ? 'Sunbed' : locale === 'el' ? 'Ξαπλώστρα' : 'Şezlong',
    umbrella: locale === 'en' ? 'Umbrella' : locale === 'el' ? 'Ομπρέλα' : 'Şemsiye',
    freeOrNone: locale === 'en' ? 'Free/None' : locale === 'el' ? 'Δωρεάν/Καμία' : 'Ücretsiz/Yok',
  }

  useEffect(() => {
    addRecentlyViewed({ type: 'beach', id: beach.id, name: beach.name, slug: beach.slug })
  }, [beach.id, beach.name, beach.slug])

  const facts: { label: string; show: boolean }[] = [
    { label: t.parking, show: beach.has_parking },
    { label: t.showers, show: beach.has_showers },
    { label: t.toilets, show: beach.has_toilets },
    { label: t.beachBar, show: beach.has_beach_bar },
    { label: t.lifeguard, show: beach.has_lifeguard },
    { label: t.familyFriendly, show: beach.family_friendly },
    { label: t.petFriendly, show: beach.pet_friendly },
  ]

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 transition-colors duration-300">
      <Header />

      <div className="mx-auto max-w-4xl px-6 pt-4">
        <Breadcrumbs
          baseUrl={SITE_URL}
          items={[
            { label: t.home, href: '/' },
            ...(island ? [{ label: island.name, href: `/islands/${island.slug}` }] : []),
            { label: beach.name },
          ]}
        />
      </div>

      <section className="relative h-[300px] w-full overflow-hidden bg-slate-900">
        {beach.cover_image_url ? (
          <>
            <Image src={beach.cover_image_url} alt={beach.name} fill priority className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-sky-600 via-sky-800 to-indigo-900" />
        )}
        <div className="absolute top-20 right-6 flex flex-col items-end gap-2">
          <FavoriteButton entityType="beach" entityId={beach.id} />
          <ShareButtons url={`${SITE_URL}/beaches/${beach.slug}`} title={beach.name} />
        </div>
        <div className="absolute bottom-0 left-0 right-0 max-w-4xl mx-auto px-6 pb-8 text-white">
          {island && (
            <Link href={`/islands/${island.slug}`} className="text-xs text-sky-300 hover:underline">
              ← {island.name}
            </Link>
          )}
          <h1 className="mt-2 text-3xl md:text-5xl font-extrabold tracking-tight">{beach.name}</h1>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="text-xs bg-white/10 backdrop-blur-md px-3 py-1 rounded-full font-medium">
              {BEACH_TYPE_LABELS[locale][beach.beach_type as keyof typeof BEACH_TYPE_LABELS['tr']] ?? beach.beach_type}
            </span>
            {beach.blue_flag && <span className="text-xs bg-blue-600/90 px-3 py-1 rounded-full font-medium">{t.blueFlag}</span>}
            {beach.sunset_rating && <span className="text-xs bg-white/10 backdrop-blur-md px-3 py-1 rounded-full font-medium">{t.sunset} {beach.sunset_rating}/5</span>}
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-4xl px-6 py-12">
        <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">{description}</p>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {facts.filter(f => f.show).map(f => (
            <span key={f.label} className="text-center text-xs font-medium bg-white dark:bg-neutral-900 border border-slate-100 dark:border-neutral-900 rounded-xl py-2.5 px-3 text-neutral-700 dark:text-neutral-300">
              {f.label}
            </span>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
          <div className="bg-white dark:bg-neutral-900 rounded-xl p-4 border border-slate-100 dark:border-neutral-900">
            <p className="text-xs text-neutral-400">{t.sunbed}</p>
            <p className="font-semibold text-neutral-800 dark:text-neutral-200">
              {beach.sunbed_price ? <>{beach.sunbed_price} €<TryPrice eur={beach.sunbed_price} /></> : t.freeOrNone}
            </p>
          </div>
          <div className="bg-white dark:bg-neutral-900 rounded-xl p-4 border border-slate-100 dark:border-neutral-900">
            <p className="text-xs text-neutral-400">{t.umbrella}</p>
            <p className="font-semibold text-neutral-800 dark:text-neutral-200">
              {beach.umbrella_price ? <>{beach.umbrella_price} €<TryPrice eur={beach.umbrella_price} /></> : t.freeOrNone}
            </p>
          </div>
        </div>

        {beach.accessibility && (
          <p className="mt-6 text-sm text-neutral-500">♿ {beach.accessibility}</p>
        )}

        <ReviewSection entityType="beach" entityId={beach.id} />
        <TripNoteBox entityType="beach" entityId={beach.id} />
      </main>
    </div>
  )
}
