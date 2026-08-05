'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FavoriteButton } from '@/components/FavoriteButton'
import { RatingBadge } from '@/components/RatingBadge'
import { useLanguage } from '@/lib/i18n/LanguageProvider'

export interface Attraction {
  id: string
  name: string
  slug: string
  category: 'archaeological' | 'viewpoint' | 'museum' | 'church' | 'nature' | 'village' | 'castle' | 'landmark'
  description: string | null
  description_en?: string | null
  description_el?: string | null
  opening_hours: string | null
  ticket_price: string | null
  cover_image_url: string | null
  avgRating?: number | null
  reviewCount?: number
  updated_at?: string
}

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

export function AttractionCard({ attraction }: { attraction: Attraction }) {
  const { locale } = useLanguage()
  const description = locale === 'en' ? (attraction.description_en || attraction.description)
    : locale === 'el' ? (attraction.description_el || attraction.description)
    : attraction.description

  const t = {
    noDescription: locale === 'en' ? 'No description added for this place yet.' : locale === 'el' ? 'Δεν έχει προστεθεί ακόμη περιγραφή για αυτό το μέρος.' : 'Bu yer hakkında henüz bir açıklama eklenmedi.',
    viewDetails: locale === 'en' ? 'View Details & Leave a Review' : locale === 'el' ? 'Δείτε Λεπτομέρειες & Αφήστε Κριτική' : 'Detayları Gör & Yorum Yap',
  }

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-neutral-100 dark:border-neutral-900 bg-white dark:bg-neutral-900 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-neutral-800">
        {attraction.cover_image_url ? (
          <Image
            src={attraction.cover_image_url}
            alt={attraction.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center text-neutral-400">
            <span className="text-4xl">{CATEGORY_LABELS[locale][attraction.category].split(' ')[0]}</span>
          </div>
        )}
        <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-white shadow-md">
          {CATEGORY_LABELS[locale][attraction.category]}
        </div>
        <div className="absolute bottom-3 right-3">
          <FavoriteButton entityType="attraction" entityId={attraction.id} />
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-neutral-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
          {attraction.name}
        </h3>
        <RatingBadge avgRating={attraction.avgRating} reviewCount={attraction.reviewCount} />
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
          {description || t.noDescription}
        </p>

        <div className="mt-4 flex items-center justify-between border-t border-neutral-100 dark:border-neutral-800 pt-3 text-xs text-neutral-500 dark:text-neutral-400">
          {attraction.ticket_price && <span>🎟️ {attraction.ticket_price}</span>}
          {attraction.opening_hours && <span className="truncate max-w-[140px]" title={attraction.opening_hours}>🕒 {attraction.opening_hours}</span>}
        </div>

        <Link
          href={`/attractions/${attraction.slug}`}
          className="mt-4 block text-center rounded-xl border border-sky-600/20 hover:border-sky-600/40 text-sky-600 dark:text-sky-400 py-2 text-xs font-semibold transition-colors"
        >
          {t.viewDetails}
        </Link>
      </div>
    </div>
  )
}
