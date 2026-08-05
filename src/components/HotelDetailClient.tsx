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
import { ReportIssue } from '@/components/ReportIssue'
import { LastUpdated } from '@/components/LastUpdated'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { useLanguage } from '@/lib/i18n/LanguageProvider'

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://yunanisland.vercel.app'

const CATEGORY_LABELS = {
  tr: { budget: '💰 Bütçe Dostu', 'mid-range': '💳 Orta Segment', luxury: '💎 Lüks' },
  en: { budget: '💰 Budget Friendly', 'mid-range': '💳 Mid-Range', luxury: '💎 Luxury' },
  el: { budget: '💰 Οικονομικό', 'mid-range': '💳 Μεσαία Κατηγορία', luxury: '💎 Πολυτελές' },
}

interface HotelDetailClientProps {
  hotel: {
    id: string; name: string; slug: string; description: string | null
    description_en?: string | null; description_el?: string | null
    category: string; price_range: string | null; affiliate_link: string | null
    cover_image_url: string | null
    updated_at?: string | null
  }
  island: { name: string; slug: string } | null
}

export function HotelDetailClient({ hotel, island }: HotelDetailClientProps) {
  const { locale } = useLanguage()
  const description = locale === 'en' ? (hotel.description_en || hotel.description)
    : locale === 'el' ? (hotel.description_el || hotel.description)
    : hotel.description

  const t = {
    home: locale === 'en' ? 'Home' : locale === 'el' ? 'Αρχική' : 'Ana Sayfa',
    seePrices: locale === 'en' ? 'See Prices ↗' : locale === 'el' ? 'Δείτε Τιμές ↗' : 'Fiyatları Gör ↗',
  }

  useEffect(() => {
    addRecentlyViewed({ type: 'hotel', id: hotel.id, name: hotel.name, slug: hotel.slug })
  }, [hotel.id, hotel.name, hotel.slug])

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 transition-colors duration-300">
      <Header />

      <div className="mx-auto max-w-4xl px-6 pt-4">
        <Breadcrumbs
          baseUrl={SITE_URL}
          items={[
            { label: t.home, href: '/' },
            ...(island ? [{ label: island.name, href: `/islands/${island.slug}` }] : []),
            { label: hotel.name },
          ]}
        />
      </div>

      <section className="relative h-[300px] w-full overflow-hidden bg-slate-900">
        {hotel.cover_image_url ? (
          <>
            <Image src={hotel.cover_image_url} alt={hotel.name} fill priority className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-purple-800 to-indigo-950" />
        )}
        <div className="absolute top-20 right-6 flex flex-col items-end gap-2">
          <FavoriteButton entityType="hotel" entityId={hotel.id} />
          <ShareButtons url={`${SITE_URL}/hotels/${hotel.slug}`} title={hotel.name} />
          <LiveViewers />
        </div>
        <div className="absolute bottom-0 left-0 right-0 max-w-4xl mx-auto px-6 pb-8 text-white">
          {island && (
            <Link href={`/islands/${island.slug}`} className="text-xs text-sky-300 hover:underline">
              ← {island.name}
            </Link>
          )}
          <h1 className="mt-2 text-3xl md:text-5xl font-extrabold tracking-tight">{hotel.name}</h1>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="text-xs bg-white/10 backdrop-blur-md px-3 py-1 rounded-full font-medium">
              {CATEGORY_LABELS[locale][hotel.category as keyof typeof CATEGORY_LABELS['tr']]}
            </span>
            {hotel.price_range && <span className="text-xs bg-white/10 backdrop-blur-md px-3 py-1 rounded-full font-medium">{hotel.price_range}</span>}
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-4xl px-6 py-12">
        <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">{description}</p>

        {hotel.affiliate_link && (
          <a
            href={hotel.affiliate_link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block rounded-xl bg-sky-600 hover:bg-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-md transition-colors"
          >
            {t.seePrices}
          </a>
        )}

        <ReviewSection entityType="hotel" entityId={hotel.id} />
        <TripNoteBox entityType="hotel" entityId={hotel.id} />
        <div className="mt-6 flex items-center justify-between gap-4">
          <LastUpdated date={hotel.updated_at} />
          <ReportIssue entityType="hotel" entityId={hotel.id} />
        </div>
      </main>
    </div>
  )
}
