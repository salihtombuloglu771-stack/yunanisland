'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FavoriteButton } from '@/components/FavoriteButton'
import { RatingBadge } from '@/components/RatingBadge'
import { FuelBadge } from '@/components/FuelBadge'
import { useLanguage } from '@/lib/i18n/LanguageProvider'

export interface Hotel {
  id: string
  name: string
  slug: string
  category: 'budget' | 'mid-range' | 'luxury'
  description: string | null
  description_en?: string | null
  description_el?: string | null
  price_range: string | null
  affiliate_link: string | null
  cover_image_url: string | null
  latitude?: number | null
  longitude?: number | null
  avgRating?: number | null
  reviewCount?: number
  updated_at?: string
}

const CATEGORY_LABELS = {
  tr: {
    budget: { label: '💰 Bütçe Dostu', color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' },
    'mid-range': { label: '💳 Orta Segment', color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400' },
    luxury: { label: '💎 Lüks', color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400' },
  },
  en: {
    budget: { label: '💰 Budget Friendly', color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' },
    'mid-range': { label: '💳 Mid-Range', color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400' },
    luxury: { label: '💎 Luxury', color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400' },
  },
  el: {
    budget: { label: '💰 Οικονομικό', color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' },
    'mid-range': { label: '💳 Μεσαία Κατηγορία', color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400' },
    luxury: { label: '💎 Πολυτελές', color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400' },
  },
}

interface HotelCardProps {
  hotel: Hotel
  islandLat?: number | null
  islandLng?: number | null
  carId?: string
}

export function HotelCard({ hotel, islandLat, islandLng, carId }: HotelCardProps) {
  const { locale } = useLanguage()
  const category = CATEGORY_LABELS[locale][hotel.category]
  const description = locale === 'en' ? (hotel.description_en || hotel.description)
    : locale === 'el' ? (hotel.description_el || hotel.description)
    : hotel.description

  const t = {
    noDescription: locale === 'en' ? 'No description added for this hotel yet.' : locale === 'el' ? 'Δεν έχει προστεθεί ακόμη περιγραφή για αυτό το ξενοδοχείο.' : 'Bu otel hakkında henüz bir açıklama eklenmedi.',
    seePrices: locale === 'en' ? 'See Prices ↗' : locale === 'el' ? 'Δείτε Τιμές ↗' : 'Fiyatları Gör ↗',
    viewDetails: locale === 'en' ? 'View Details & Leave a Review' : locale === 'el' ? 'Δείτε Λεπτομέρειες & Αφήστε Κριτική' : 'Detayları Gör & Yorum Yap',
  }

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-neutral-100 dark:border-neutral-900 bg-white dark:bg-neutral-900 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-neutral-800">
        {hotel.cover_image_url ? (
          <Image
            src={hotel.cover_image_url}
            alt={hotel.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-neutral-400 text-3xl">
            🏨
          </div>
        )}
        <div className="absolute bottom-3 right-3">
          <FavoriteButton entityType="hotel" entityId={hotel.id} />
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between gap-2">
          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${category.color}`}>
            {category.label}
          </span>
          {hotel.price_range && (
            <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-400">{hotel.price_range}</span>
          )}
        </div>

        <div className="mt-3 flex items-center justify-between gap-2">
          <h3 className="text-lg font-bold text-neutral-900 dark:text-white">{hotel.name}</h3>
          <RatingBadge avgRating={hotel.avgRating} reviewCount={hotel.reviewCount} />
        </div>

        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
          {description || t.noDescription}
        </p>

        {carId && (
          <div className="mt-3">
            <FuelBadge originLat={islandLat ?? null} originLng={islandLng ?? null} destLat={hotel.latitude ?? null} destLng={hotel.longitude ?? null} carId={carId} />
          </div>
        )}

        {hotel.affiliate_link && (
          <a
            href={hotel.affiliate_link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 block text-center rounded-xl bg-sky-600 hover:bg-sky-500 py-2.5 text-xs font-semibold text-white transition-colors"
          >
            {t.seePrices}
          </a>
        )}

        <Link
          href={`/hotels/${hotel.slug}`}
          className="mt-2 block text-center rounded-xl border border-sky-600/20 hover:border-sky-600/40 text-sky-600 dark:text-sky-400 py-2 text-xs font-semibold transition-colors"
        >
          {t.viewDetails}
        </Link>
      </div>
    </div>
  )
}
