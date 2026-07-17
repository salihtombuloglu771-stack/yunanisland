import Image from 'next/image'
import Link from 'next/link'
import { Beach } from '@/lib/mockData'
import { FavoriteButton } from '@/components/FavoriteButton'
import { RatingBadge } from '@/components/RatingBadge'

interface BeachCardProps {
  beach: Beach & { avgRating?: number | null; reviewCount?: number }
}

const BEACH_TYPE_LABELS = {
  sand: '🏖️ Kumluk',
  pebble: '🪨 Çakıllık',
  mixed: '⛱️ Karışık Plaj',
}

export function BeachCard({ beach }: BeachCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-neutral-100 dark:border-neutral-900 bg-white dark:bg-neutral-900 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      
      {/* Resim veya Fallback */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-neutral-800">
        {beach.cover_image_url ? (
          <Image
            src={beach.cover_image_url}
            alt={beach.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center text-neutral-400">
            <span className="text-4xl">🏖️</span>
            <span className="mt-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">Resim Yok</span>
          </div>
        )}

        {/* Sunset / Yıldız Rating */}
        {beach.sunset_rating && (
          <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-amber-400 flex items-center gap-1 shadow-md">
            🌅 Gün Batımı: {beach.sunset_rating}/5
          </div>
        )}

        {/* Blue Flag */}
        {beach.blue_flag && (
          <div className="absolute top-3 left-3 bg-blue-600/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-white flex items-center gap-1 shadow-md">
            💙 Mavi Bayrak
          </div>
        )}

        <div className="absolute bottom-3 right-3">
          <FavoriteButton entityType="beach" entityId={beach.id} />
        </div>
      </div>

      {/* İçerik */}
      <div className="p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-neutral-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
            {beach.name}
          </h3>
          <span className="text-xs bg-slate-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-350 px-2 py-1 rounded-md font-medium">
            {BEACH_TYPE_LABELS[beach.beach_type] || beach.beach_type}
          </span>
        </div>

        <RatingBadge avgRating={beach.avgRating} reviewCount={beach.reviewCount} />

        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-450 line-clamp-2">
          {beach.description || 'Bu plaj hakkında henüz bir açıklama eklenmedi.'}
        </p>

        {/* Detaylar ve Tesisler */}
        <div className="mt-4 border-t border-neutral-100 dark:border-neutral-850 pt-4">
          <p className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-2">Tesisler & Özellikler</p>
          <div className="flex flex-wrap gap-1.5">
            {beach.has_parking && (
              <span className="inline-flex items-center text-xs bg-slate-50 dark:bg-neutral-950 text-neutral-700 dark:text-neutral-300 border border-slate-150 dark:border-neutral-800 rounded-lg px-2 py-0.5">
                🚗 Otopark
              </span>
            )}
            {beach.has_showers && (
              <span className="inline-flex items-center text-xs bg-slate-50 dark:bg-neutral-950 text-neutral-700 dark:text-neutral-300 border border-slate-150 dark:border-neutral-800 rounded-lg px-2 py-0.5">
                🚿 Duş
              </span>
            )}
            {beach.has_toilets && (
              <span className="inline-flex items-center text-xs bg-slate-50 dark:bg-neutral-950 text-neutral-700 dark:text-neutral-300 border border-slate-150 dark:border-neutral-800 rounded-lg px-2 py-0.5">
                🚽 Tuvalet
              </span>
            )}
            {beach.has_beach_bar && (
              <span className="inline-flex items-center text-xs bg-slate-50 dark:bg-neutral-950 text-neutral-700 dark:text-neutral-300 border border-slate-150 dark:border-neutral-800 rounded-lg px-2 py-0.5">
                🍹 Plaj Bar
              </span>
            )}
            {beach.has_lifeguard && (
              <span className="inline-flex items-center text-xs bg-slate-50 dark:bg-neutral-950 text-neutral-700 dark:text-neutral-300 border border-slate-150 dark:border-neutral-800 rounded-lg px-2 py-0.5">
                🛟 Cankurtaran
              </span>
            )}
            {beach.family_friendly && (
              <span className="inline-flex items-center text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-450 rounded-lg px-2 py-0.5 font-medium">
                👨‍👩‍👧 Aile Dostu
              </span>
            )}
            {beach.pet_friendly && (
              <span className="inline-flex items-center text-xs bg-indigo-500/10 text-indigo-600 dark:text-indigo-450 rounded-lg px-2 py-0.5 font-medium">
                🐾 Evcil Hayvan
              </span>
            )}
          </div>
        </div>

        {/* Fiyatlar & Ulaşım Bilgisi */}
        <div className="mt-4 flex items-center justify-between border-t border-neutral-100 dark:border-neutral-850 pt-3 text-xs text-neutral-500 dark:text-neutral-400">
          <span>
            {beach.sunbed_price ? (
              <span className="font-semibold text-neutral-700 dark:text-neutral-300">
                💵 Şezlong: {beach.sunbed_price} €
              </span>
            ) : (
              '💵 Şezlong: Ücretsiz/Yok'
            )}
          </span>
          {beach.accessibility && (
            <span className="max-w-[150px] truncate" title={beach.accessibility}>
              ♿ {beach.accessibility}
            </span>
          )}
        </div>

        <Link
          href={`/beaches/${beach.slug}`}
          className="mt-4 block text-center rounded-xl border border-sky-600/20 hover:border-sky-600/40 text-sky-600 dark:text-sky-400 py-2 text-xs font-semibold transition-colors"
        >
          Detayları Gör & Yorum Yap
        </Link>

      </div>

    </div>
  )
}
