'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/Header'
import { addRecentlyViewed } from '@/lib/useRecentlyViewed'
import { FavoriteButton } from '@/components/FavoriteButton'
import { ShareButtons } from '@/components/ShareButtons'
import { LiveViewers } from '@/components/LiveViewers'
import { ReviewSection } from '@/components/ReviewSection'
import { TripNoteBox } from '@/components/TripNoteBox'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Gallery, type MediaItem } from '@/components/Gallery'
import { PhotoContribution } from '@/components/PhotoContribution'
import { useLanguage } from '@/lib/i18n/LanguageProvider'
import type { Attraction } from '@/components/AttractionCard'

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://yunanisland.vercel.app'

const CATEGORY_LABELS: Record<'tr' | 'en' | 'el', Record<Attraction['category'], string>> = {
  tr: {
    archaeological: '🏛️ Antik Kalıntı', viewpoint: '🌅 Manzara Noktası', museum: '🖼️ Müze',
    church: '⛪ Kilise', nature: '🌿 Doğa', village: '🏘️ Köy', castle: '🏰 Kale', landmark: '📍 Simge Yapı',
  },
  en: {
    archaeological: '🏛️ Archaeological Site', viewpoint: '🌅 Viewpoint', museum: '🖼️ Museum',
    church: '⛪ Church', nature: '🌿 Nature', village: '🏘️ Village', castle: '🏰 Castle', landmark: '📍 Landmark',
  },
  el: {
    archaeological: '🏛️ Αρχαιολογικός Χώρος', viewpoint: '🌅 Σημείο Θέασης', museum: '🖼️ Μουσείο',
    church: '⛪ Εκκλησία', nature: '🌿 Φύση', village: '🏘️ Χωριό', castle: '🏰 Κάστρο', landmark: '📍 Ορόσημο',
  },
}

interface AttractionDetailClientProps {
  attraction: {
    id: string; name: string; slug: string; category: Attraction['category']
    description: string | null; description_en?: string | null; description_el?: string | null
    opening_hours: string | null; ticket_price: string | null
    cover_image_url: string | null
  }
  island: { name: string; slug: string } | null
  media: MediaItem[]
}

export function AttractionDetailClient({ attraction, island, media }: AttractionDetailClientProps) {
  const { locale } = useLanguage()
  const description = locale === 'en' ? (attraction.description_en || attraction.description)
    : locale === 'el' ? (attraction.description_el || attraction.description)
    : attraction.description

  const t = {
    home: locale === 'en' ? 'Home' : locale === 'el' ? 'Αρχική' : 'Ana Sayfa',
    hours: locale === 'en' ? '🕒 Opening Hours' : locale === 'el' ? '🕒 Ώρες Λειτουργίας' : '🕒 Ziyaret Saatleri',
    ticket: locale === 'en' ? '🎟️ Ticket Price' : locale === 'el' ? '🎟️ Τιμή Εισιτηρίου' : '🎟️ Giriş Ücreti',
    gallery: locale === 'en' ? '📸 Photos from Visitors' : locale === 'el' ? '📸 Φωτογραφίες Επισκεπτών' : '📸 Ziyaretçi Fotoğrafları',
  }

  useEffect(() => {
    addRecentlyViewed({ type: 'attraction', id: attraction.id, name: attraction.name, slug: attraction.slug })
  }, [attraction.id, attraction.name, attraction.slug])

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 transition-colors duration-300">
      <Header />

      <div className="mx-auto max-w-4xl px-6 pt-4">
        <Breadcrumbs
          baseUrl={SITE_URL}
          items={[
            { label: t.home, href: '/' },
            ...(island ? [{ label: island.name, href: `/islands/${island.slug}` }] : []),
            { label: attraction.name },
          ]}
        />
      </div>

      <section className="relative h-[300px] w-full overflow-hidden bg-slate-900">
        {attraction.cover_image_url ? (
          <>
            <Image src={attraction.cover_image_url} alt={attraction.name} fill priority className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-sky-600 via-sky-800 to-indigo-900" />
        )}
        <div className="absolute top-20 right-6 flex flex-col items-end gap-2">
          <FavoriteButton entityType="attraction" entityId={attraction.id} />
          <ShareButtons url={`${SITE_URL}/attractions/${attraction.slug}`} title={attraction.name} />
          <LiveViewers />
        </div>
        <div className="absolute bottom-0 left-0 right-0 max-w-4xl mx-auto px-6 pb-8 text-white">
          {island && (
            <Link href={`/islands/${island.slug}`} className="text-xs text-sky-300 hover:underline">
              ← {island.name}
            </Link>
          )}
          <h1 className="mt-2 text-3xl md:text-5xl font-extrabold tracking-tight">{attraction.name}</h1>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="text-xs bg-white/10 backdrop-blur-md px-3 py-1 rounded-full font-medium">
              {CATEGORY_LABELS[locale][attraction.category]}
            </span>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-4xl px-6 py-12">
        <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">{description}</p>

        {(attraction.opening_hours || attraction.ticket_price) && (
          <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
            {attraction.opening_hours && (
              <div className="bg-white dark:bg-neutral-900 rounded-xl p-4 border border-slate-100 dark:border-neutral-900">
                <p className="text-xs text-neutral-400">{t.hours}</p>
                <p className="font-semibold text-neutral-800 dark:text-neutral-200">{attraction.opening_hours}</p>
              </div>
            )}
            {attraction.ticket_price && (
              <div className="bg-white dark:bg-neutral-900 rounded-xl p-4 border border-slate-100 dark:border-neutral-900">
                <p className="text-xs text-neutral-400">{t.ticket}</p>
                <p className="font-semibold text-neutral-800 dark:text-neutral-200">{attraction.ticket_price}</p>
              </div>
            )}
          </div>
        )}

        <div className="mt-10">
          <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-4">{t.gallery}</h3>
          <Gallery items={media} />
          <PhotoContribution entityType="attraction" entityId={attraction.id} />
        </div>

        <ReviewSection entityType="attraction" entityId={attraction.id} />
        <TripNoteBox entityType="attraction" entityId={attraction.id} />
      </main>
    </div>
  )
}
