'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Beach } from '@/lib/mockData'
import { FavoriteButton } from '@/components/FavoriteButton'
import { RatingBadge } from '@/components/RatingBadge'
import { FuelBadge } from '@/components/FuelBadge'
import { TryPrice } from '@/components/TryPrice'
import { useLanguage } from '@/lib/i18n/LanguageProvider'

interface BeachCardProps {
  beach: Beach & { avgRating?: number | null; reviewCount?: number; description_en?: string | null; description_el?: string | null }
  islandLat?: number | null
  islandLng?: number | null
  carId?: string
}

const BEACH_TYPE_LABELS = {
  tr: { sand: '🏖️ Kumluk', pebble: '🪨 Çakıllık', mixed: '⛱️ Karışık Plaj' },
  en: { sand: '🏖️ Sandy', pebble: '🪨 Pebbly', mixed: '⛱️ Mixed Beach' },
  el: { sand: '🏖️ Αμμώδης', pebble: '🪨 Βοτσαλωτή', mixed: '⛱️ Μικτή Παραλία' },
}

export function BeachCard({ beach, islandLat, islandLng, carId }: BeachCardProps) {
  const { locale } = useLanguage()
  const description = locale === 'en' ? (beach.description_en || beach.description)
    : locale === 'el' ? (beach.description_el || beach.description)
    : beach.description

  const t = {
    noImage: locale === 'en' ? 'No Image' : locale === 'el' ? 'Χωρίς Εικόνα' : 'Resim Yok',
    sunset: locale === 'en' ? 'Sunset' : locale === 'el' ? 'Ηλιοβασίλεμα' : 'Gün Batımı',
    blueFlag: locale === 'en' ? '💙 Blue Flag' : locale === 'el' ? '💙 Γαλάζια Σημαία' : '💙 Mavi Bayrak',
    noDescription: locale === 'en' ? 'No description added for this beach yet.' : locale === 'el' ? 'Δεν έχει προστεθεί ακόμη περιγραφή για αυτή την παραλία.' : 'Bu plaj hakkında henüz bir açıklama eklenmedi.',
    amenities: locale === 'en' ? 'Amenities & Features' : locale === 'el' ? 'Παροχές & Χαρακτηριστικά' : 'Tesisler & Özellikler',
    parking: locale === 'en' ? '🚗 Parking' : locale === 'el' ? '🚗 Πάρκινγκ' : '🚗 Otopark',
    showers: locale === 'en' ? '🚿 Showers' : locale === 'el' ? '🚿 Ντουζ' : '🚿 Duş',
    toilets: locale === 'en' ? '🚽 Toilets' : locale === 'el' ? '🚽 Τουαλέτες' : '🚽 Tuvalet',
    beachBar: locale === 'en' ? '🍹 Beach Bar' : locale === 'el' ? '🍹 Beach Bar' : '🍹 Plaj Bar',
    lifeguard: locale === 'en' ? '🛟 Lifeguard' : locale === 'el' ? '🛟 Ναυαγοσώστης' : '🛟 Cankurtaran',
    familyFriendly: locale === 'en' ? '👨‍👩‍👧 Family Friendly' : locale === 'el' ? '👨‍👩‍👧 Φιλική για Οικογένειες' : '👨‍👩‍👧 Aile Dostu',
    petFriendly: locale === 'en' ? '🐾 Pet Friendly' : locale === 'el' ? '🐾 Φιλική για Κατοικίδια' : '🐾 Evcil Hayvan',
    sunbed: locale === 'en' ? '💵 Sunbed' : locale === 'el' ? '💵 Ξαπλώστρα' : '💵 Şezlong',
    freeOrNone: locale === 'en' ? 'Free/None' : locale === 'el' ? 'Δωρεάν/Καμία' : 'Ücretsiz/Yok',
    viewDetails: locale === 'en' ? 'View Details & Leave a Review' : locale === 'el' ? 'Δείτε Λεπτομέρειες & Αφήστε Κριτική' : 'Detayları Gör & Yorum Yap',
  }

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
            <span className="mt-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">{t.noImage}</span>
          </div>
        )}

        {/* Sunset / Yıldız Rating */}
        {beach.sunset_rating && (
          <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-amber-400 flex items-center gap-1 shadow-md">
            🌅 {t.sunset}: {beach.sunset_rating}/5
          </div>
        )}

        {/* Blue Flag */}
        {beach.blue_flag && (
          <div className="absolute top-3 left-3 bg-blue-600/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-white flex items-center gap-1 shadow-md">
            {t.blueFlag}
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
          <span className="text-xs bg-slate-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 px-2 py-1 rounded-md font-medium">
            {BEACH_TYPE_LABELS[locale][beach.beach_type as keyof typeof BEACH_TYPE_LABELS['tr']] || beach.beach_type}
          </span>
        </div>

        <RatingBadge avgRating={beach.avgRating} reviewCount={beach.reviewCount} />

        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
          {description || t.noDescription}
        </p>

        {carId && (
          <div className="mt-3">
            <FuelBadge originLat={islandLat ?? null} originLng={islandLng ?? null} destLat={beach.latitude} destLng={beach.longitude} carId={carId} />
          </div>
        )}

        {/* Detaylar ve Tesisler */}
        <div className="mt-4 border-t border-neutral-100 dark:border-neutral-800 pt-4">
          <p className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-2">{t.amenities}</p>
          <div className="flex flex-wrap gap-1.5">
            {beach.has_parking && (
              <span className="inline-flex items-center text-xs bg-slate-50 dark:bg-neutral-950 text-neutral-700 dark:text-neutral-300 border border-slate-200 dark:border-neutral-800 rounded-lg px-2 py-0.5">
                {t.parking}
              </span>
            )}
            {beach.has_showers && (
              <span className="inline-flex items-center text-xs bg-slate-50 dark:bg-neutral-950 text-neutral-700 dark:text-neutral-300 border border-slate-200 dark:border-neutral-800 rounded-lg px-2 py-0.5">
                {t.showers}
              </span>
            )}
            {beach.has_toilets && (
              <span className="inline-flex items-center text-xs bg-slate-50 dark:bg-neutral-950 text-neutral-700 dark:text-neutral-300 border border-slate-200 dark:border-neutral-800 rounded-lg px-2 py-0.5">
                {t.toilets}
              </span>
            )}
            {beach.has_beach_bar && (
              <span className="inline-flex items-center text-xs bg-slate-50 dark:bg-neutral-950 text-neutral-700 dark:text-neutral-300 border border-slate-200 dark:border-neutral-800 rounded-lg px-2 py-0.5">
                {t.beachBar}
              </span>
            )}
            {beach.has_lifeguard && (
              <span className="inline-flex items-center text-xs bg-slate-50 dark:bg-neutral-950 text-neutral-700 dark:text-neutral-300 border border-slate-200 dark:border-neutral-800 rounded-lg px-2 py-0.5">
                {t.lifeguard}
              </span>
            )}
            {beach.family_friendly && (
              <span className="inline-flex items-center text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-lg px-2 py-0.5 font-medium">
                {t.familyFriendly}
              </span>
            )}
            {beach.pet_friendly && (
              <span className="inline-flex items-center text-xs bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-lg px-2 py-0.5 font-medium">
                {t.petFriendly}
              </span>
            )}
          </div>
        </div>

        {/* Fiyatlar & Ulaşım Bilgisi */}
        <div className="mt-4 flex items-center justify-between border-t border-neutral-100 dark:border-neutral-800 pt-3 text-xs text-neutral-500 dark:text-neutral-400">
          <span>
            {beach.sunbed_price ? (
              <span className="font-semibold text-neutral-700 dark:text-neutral-300">
                {t.sunbed}: {beach.sunbed_price} €<TryPrice eur={beach.sunbed_price} />
              </span>
            ) : (
              `${t.sunbed}: ${t.freeOrNone}`
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
          {t.viewDetails}
        </Link>

      </div>

    </div>
  )
}
