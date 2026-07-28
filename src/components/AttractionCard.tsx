'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FavoriteButton } from '@/components/FavoriteButton'
import { RatingBadge } from '@/components/RatingBadge'

export interface Attraction {
  id: string
  name: string
  slug: string
  category: 'archaeological' | 'viewpoint' | 'museum' | 'church' | 'nature' | 'village' | 'castle' | 'landmark'
  description: string | null
  opening_hours: string | null
  ticket_price: string | null
  cover_image_url: string | null
  avgRating?: number | null
  reviewCount?: number
}

const CATEGORY_LABELS: Record<Attraction['category'], string> = {
  archaeological: '🏛️ Antik Kalıntı',
  viewpoint: '🌅 Manzara Noktası',
  museum: '🖼️ Müze',
  church: '⛪ Kilise',
  nature: '🌿 Doğa',
  village: '🏘️ Köy',
  castle: '🏰 Kale',
  landmark: '📍 Simge Yapı',
}

export function AttractionCard({ attraction }: { attraction: Attraction }) {
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
            <span className="text-4xl">{CATEGORY_LABELS[attraction.category].split(' ')[0]}</span>
          </div>
        )}
        <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-white shadow-md">
          {CATEGORY_LABELS[attraction.category]}
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
          {attraction.description || 'Bu yer hakkında henüz bir açıklama eklenmedi.'}
        </p>

        <div className="mt-4 flex items-center justify-between border-t border-neutral-100 dark:border-neutral-800 pt-3 text-xs text-neutral-500 dark:text-neutral-400">
          {attraction.ticket_price && <span>🎟️ {attraction.ticket_price}</span>}
          {attraction.opening_hours && <span className="truncate max-w-[140px]" title={attraction.opening_hours}>🕒 {attraction.opening_hours}</span>}
        </div>

        <Link
          href={`/attractions/${attraction.slug}`}
          className="mt-4 block text-center rounded-xl border border-sky-600/20 hover:border-sky-600/40 text-sky-600 dark:text-sky-400 py-2 text-xs font-semibold transition-colors"
        >
          Detayları Gör & Yorum Yap
        </Link>
      </div>
    </div>
  )
}
