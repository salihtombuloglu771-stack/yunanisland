'use client'

import Link from 'next/link'
import { Restaurant } from '@/lib/mockData'
import { FavoriteButton } from '@/components/FavoriteButton'
import { RatingBadge } from '@/components/RatingBadge'
import { TryPrice } from '@/components/TryPrice'
import { useLanguage } from '@/lib/i18n/LanguageProvider'

interface RestaurantCardProps {
  restaurant: Restaurant & { avgRating?: number | null; reviewCount?: number; cuisine_en?: string | null; cuisine_el?: string | null }
}

const PRICE_LEVEL_LABELS = {
  tr: {
    budget: { label: '💰 Bütçe Dostu', color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' },
    mid: { label: '💳 Orta Segment', color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400' },
    expensive: { label: '💎 Lüks / Gurme', color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400' },
  },
  en: {
    budget: { label: '💰 Budget Friendly', color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' },
    mid: { label: '💳 Mid-Range', color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400' },
    expensive: { label: '💎 Luxury / Gourmet', color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400' },
  },
  el: {
    budget: { label: '💰 Οικονομική', color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' },
    mid: { label: '💳 Μεσαία Κατηγορία', color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400' },
    expensive: { label: '💎 Πολυτελής / Γκουρμέ', color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400' },
  },
}

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const { locale } = useLanguage()
  const price = PRICE_LEVEL_LABELS[locale][restaurant.price_level]
  const cuisine = locale === 'en' ? (restaurant.cuisine_en || restaurant.cuisine)
    : locale === 'el' ? (restaurant.cuisine_el || restaurant.cuisine)
    : restaurant.cuisine

  const t = {
    restaurant: locale === 'en' ? 'Restaurant' : locale === 'el' ? 'Εστιατόριο' : 'Restoran',
    seaView: locale === 'en' ? '🌊 Sea View' : locale === 'el' ? '🌊 Θέα στη Θάλασσα' : '🌊 Deniz Manzarası',
    outdoorSeating: locale === 'en' ? '🪑 Outdoor Seating' : locale === 'el' ? '🪑 Εξωτερικός Χώρος' : '🪑 Açık Hava Alanı',
    familyFriendly: locale === 'en' ? '👨‍👩‍👧 Family Friendly' : locale === 'el' ? '👨‍👩‍👧 Φιλική για Οικογένειες' : '👨‍👩‍👧 Aile Dostu',
    vegan: locale === 'en' ? '🌱 Vegan' : locale === 'el' ? '🌱 Vegan' : '🌱 Vegan',
    vegetarian: locale === 'en' ? '🥗 Vegetarian' : locale === 'el' ? '🥗 Χορτοφαγική' : '🥗 Vejetaryen',
    glutenFree: locale === 'en' ? '🌾 Gluten-Free' : locale === 'el' ? '🌾 Χωρίς Γλουτένη' : '🌾 Glütensiz',
    avgPerPerson: locale === 'en' ? 'Avg. per Person' : locale === 'el' ? 'Μ.Ο. ανά Άτομο' : 'Ort. Kişi Başı',
    avgPriceNotSpecified: locale === 'en' ? 'Average Price: Not specified' : locale === 'el' ? 'Μέση Τιμή: Δεν έχει οριστεί' : 'Ortalama Fiyat: Belirtilmedi',
    viewDetails: locale === 'en' ? 'View Details & Leave a Review' : locale === 'el' ? 'Δείτε Λεπτομέρειες & Αφήστε Κριτική' : 'Detayları Gör & Yorum Yap',
  }

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-neutral-100 dark:border-neutral-900 bg-white dark:bg-neutral-900 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

      <div className="p-6">

        {/* Başlık ve Fiyat Seviyesi */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400">
              {cuisine || t.restaurant}
            </span>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white mt-1 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
              {restaurant.name}
            </h3>
            <div className="mt-1"><RatingBadge avgRating={restaurant.avgRating} reviewCount={restaurant.reviewCount} /></div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-semibold ${price.color}`}>
              {price.label}
            </span>
            <FavoriteButton entityType="restaurant" entityId={restaurant.id} className="text-base leading-none" />
          </div>
        </div>

        {/* Çalışma Saatleri */}
        {restaurant.opening_hours && (
          <p className="mt-3 text-xs text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5">
            <span>🕒</span> {restaurant.opening_hours}
          </p>
        )}

        {/* Özellikler / Tesisler */}
        <div className="mt-4 border-t border-neutral-100 dark:border-neutral-800 pt-4">
          <div className="flex flex-wrap gap-1.5">
            {restaurant.sea_view && (
              <span className="inline-flex items-center text-xs bg-sky-50 dark:bg-neutral-950 text-sky-700 dark:text-sky-400 border border-sky-100 dark:border-sky-950 rounded-lg px-2 py-0.5 font-medium">
                {t.seaView}
              </span>
            )}
            {restaurant.outdoor_seating && (
              <span className="inline-flex items-center text-xs bg-slate-50 dark:bg-neutral-950 text-neutral-700 dark:text-neutral-300 border border-slate-200 dark:border-neutral-800 rounded-lg px-2 py-0.5">
                {t.outdoorSeating}
              </span>
            )}
            {restaurant.family_friendly && (
              <span className="inline-flex items-center text-xs bg-slate-50 dark:bg-neutral-950 text-neutral-700 dark:text-neutral-300 border border-slate-200 dark:border-neutral-800 rounded-lg px-2 py-0.5">
                {t.familyFriendly}
              </span>
            )}
          </div>
        </div>

        {/* Beslenme Seçenekleri */}
        {(restaurant.vegetarian || restaurant.vegan || restaurant.gluten_free) && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {restaurant.vegan && (
              <span className="inline-flex items-center text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-md px-1.5 py-0.5 font-bold uppercase tracking-wider">
                {t.vegan}
              </span>
            )}
            {restaurant.vegetarian && !restaurant.vegan && (
              <span className="inline-flex items-center text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-md px-1.5 py-0.5 font-bold uppercase tracking-wider">
                {t.vegetarian}
              </span>
            )}
            {restaurant.gluten_free && (
              <span className="inline-flex items-center text-[10px] bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-md px-1.5 py-0.5 font-bold uppercase tracking-wider">
                {t.glutenFree}
              </span>
            )}
          </div>
        )}

        {/* İletişim ve Ortalama Fiyat */}
        <div className="mt-5 flex items-center justify-between border-t border-neutral-100 dark:border-neutral-800 pt-4 text-xs text-neutral-500 dark:text-neutral-400">
          <span>
            {restaurant.average_cost ? (
              <span>{t.avgPerPerson}: <strong className="text-neutral-800 dark:text-neutral-200">{restaurant.average_cost} €</strong><TryPrice eur={restaurant.average_cost} /></span>
            ) : (
              t.avgPriceNotSpecified
            )}
          </span>
          {restaurant.phone && (
            <a
              href={`tel:${restaurant.phone}`}
              className="text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1"
            >
              📞 {restaurant.phone}
            </a>
          )}
        </div>

        <Link
          href={`/restaurants/${restaurant.slug}`}
          className="mt-4 block text-center rounded-xl border border-sky-600/20 hover:border-sky-600/40 text-sky-600 dark:text-sky-400 py-2 text-xs font-semibold transition-colors"
        >
          {t.viewDetails}
        </Link>

      </div>

    </div>
  )
}
