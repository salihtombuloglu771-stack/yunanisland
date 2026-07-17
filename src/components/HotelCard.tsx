import Image from 'next/image'
import { FavoriteButton } from '@/components/FavoriteButton'

export interface Hotel {
  id: string
  name: string
  slug: string
  category: 'budget' | 'mid-range' | 'luxury'
  description: string | null
  price_range: string | null
  affiliate_link: string | null
  cover_image_url: string | null
}

const CATEGORY_LABELS = {
  budget: { label: '💰 Bütçe Dostu', color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' },
  'mid-range': { label: '💳 Orta Segment', color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400' },
  luxury: { label: '💎 Lüks', color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400' },
}

export function HotelCard({ hotel }: { hotel: Hotel }) {
  const category = CATEGORY_LABELS[hotel.category]

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

        <h3 className="mt-3 text-lg font-bold text-neutral-900 dark:text-white">{hotel.name}</h3>

        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
          {hotel.description || 'Bu otel hakkında henüz bir açıklama eklenmedi.'}
        </p>

        {hotel.affiliate_link && (
          <a
            href={hotel.affiliate_link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 block text-center rounded-xl bg-sky-600 hover:bg-sky-500 py-2.5 text-xs font-semibold text-white transition-colors"
          >
            Fiyatları Gör ↗
          </a>
        )}
      </div>
    </div>
  )
}
