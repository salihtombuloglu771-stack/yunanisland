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
import { TryPrice } from '@/components/TryPrice'
import { useLanguage } from '@/lib/i18n/LanguageProvider'

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://yunanisland.vercel.app'

const PRICE_LABELS = {
  tr: { budget: '💰 Bütçe Dostu', mid: '💳 Orta Segment', expensive: '💎 Lüks / Gurme' },
  en: { budget: '💰 Budget Friendly', mid: '💳 Mid-Range', expensive: '💎 Luxury / Gourmet' },
  el: { budget: '💰 Οικονομική', mid: '💳 Μεσαία Κατηγορία', expensive: '💎 Πολυτελής / Γκουρμέ' },
}

interface RestaurantDetailClientProps {
  restaurant: {
    id: string; name: string; slug: string; cuisine: string | null
    cuisine_en?: string | null; cuisine_el?: string | null
    price_level: string; opening_hours: string | null; average_cost: number | null
    phone: string | null; website: string | null; cover_image_url: string | null
    sea_view: boolean; outdoor_seating: boolean; family_friendly: boolean
    vegan: boolean; vegetarian: boolean; gluten_free: boolean
    updated_at?: string | null
  }
  island: { name: string; slug: string } | null
}

export function RestaurantDetailClient({ restaurant, island }: RestaurantDetailClientProps) {
  const { locale } = useLanguage()
  const cuisine = locale === 'en' ? (restaurant.cuisine_en || restaurant.cuisine)
    : locale === 'el' ? (restaurant.cuisine_el || restaurant.cuisine)
    : restaurant.cuisine

  const t = {
    home: locale === 'en' ? 'Home' : locale === 'el' ? 'Αρχική' : 'Ana Sayfa',
    openingHours: locale === 'en' ? '🕒 Opening Hours' : locale === 'el' ? '🕒 Ώρες Λειτουργίας' : '🕒 Çalışma Saatleri',
    avgPerPerson: locale === 'en' ? 'Avg. per Person' : locale === 'el' ? 'Μ.Ο. ανά Άτομο' : 'Ort. Kişi Başı',
    seaView: locale === 'en' ? '🌊 Sea View' : locale === 'el' ? '🌊 Θέα στη Θάλασσα' : '🌊 Deniz Manzarası',
    outdoorSeating: locale === 'en' ? '🪑 Outdoor Seating' : locale === 'el' ? '🪑 Εξωτερικός Χώρος' : '🪑 Açık Hava Alanı',
    familyFriendly: locale === 'en' ? '👨‍👩‍👧 Family Friendly' : locale === 'el' ? '👨‍👩‍👧 Φιλική για Οικογένειες' : '👨‍👩‍👧 Aile Dostu',
    vegan: locale === 'en' ? '🌱 Vegan' : locale === 'el' ? '🌱 Vegan' : '🌱 Vegan',
    vegetarian: locale === 'en' ? '🥗 Vegetarian' : locale === 'el' ? '🥗 Χορτοφαγική' : '🥗 Vejetaryen',
    glutenFree: locale === 'en' ? '🌾 Gluten-Free' : locale === 'el' ? '🌾 Χωρίς Γλουτένη' : '🌾 Glütensiz',
    website: locale === 'en' ? '🌐 Website' : locale === 'el' ? '🌐 Ιστότοπος' : '🌐 Website',
  }

  useEffect(() => {
    addRecentlyViewed({ type: 'restaurant', id: restaurant.id, name: restaurant.name, slug: restaurant.slug })
  }, [restaurant.id, restaurant.name, restaurant.slug])

  const facts: { label: string; show: boolean }[] = [
    { label: t.seaView, show: restaurant.sea_view },
    { label: t.outdoorSeating, show: restaurant.outdoor_seating },
    { label: t.familyFriendly, show: restaurant.family_friendly },
    { label: t.vegan, show: restaurant.vegan },
    { label: t.vegetarian, show: restaurant.vegetarian },
    { label: t.glutenFree, show: restaurant.gluten_free },
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
            { label: restaurant.name },
          ]}
        />
      </div>

      <section className="relative h-[300px] w-full overflow-hidden bg-slate-900">
        {restaurant.cover_image_url ? (
          <>
            <Image src={restaurant.cover_image_url} alt={restaurant.name} fill priority className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-amber-600 via-orange-800 to-rose-900" />
        )}
        <div className="absolute top-20 right-6 flex flex-col items-end gap-2">
          <FavoriteButton entityType="restaurant" entityId={restaurant.id} />
          <ShareButtons url={`${SITE_URL}/restaurants/${restaurant.slug}`} title={restaurant.name} />
          <LiveViewers />
        </div>
        <div className="absolute bottom-0 left-0 right-0 max-w-4xl mx-auto px-6 pb-8 text-white">
          {island && (
            <Link href={`/islands/${island.slug}`} className="text-xs text-sky-300 hover:underline">
              ← {island.name}
            </Link>
          )}
          <h1 className="mt-2 text-3xl md:text-5xl font-extrabold tracking-tight">{restaurant.name}</h1>
          <div className="mt-3 flex flex-wrap gap-2">
            {cuisine && <span className="text-xs bg-white/10 backdrop-blur-md px-3 py-1 rounded-full font-medium">{cuisine}</span>}
            <span className="text-xs bg-white/10 backdrop-blur-md px-3 py-1 rounded-full font-medium">
              {PRICE_LABELS[locale][restaurant.price_level as keyof typeof PRICE_LABELS['tr']]}
            </span>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-4xl px-6 py-12">
        <div className="grid grid-cols-2 gap-4 text-sm mb-6">
          {restaurant.opening_hours && (
            <div className="bg-white dark:bg-neutral-900 rounded-xl p-4 border border-slate-100 dark:border-neutral-900">
              <p className="text-xs text-neutral-400">{t.openingHours}</p>
              <p className="font-semibold text-neutral-800 dark:text-neutral-200">{restaurant.opening_hours}</p>
            </div>
          )}
          {restaurant.average_cost && (
            <div className="bg-white dark:bg-neutral-900 rounded-xl p-4 border border-slate-100 dark:border-neutral-900">
              <p className="text-xs text-neutral-400">{t.avgPerPerson}</p>
              <p className="font-semibold text-neutral-800 dark:text-neutral-200">{restaurant.average_cost} €<TryPrice eur={restaurant.average_cost} /></p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {facts.filter(f => f.show).map(f => (
            <span key={f.label} className="text-center text-xs font-medium bg-white dark:bg-neutral-900 border border-slate-100 dark:border-neutral-900 rounded-xl py-2.5 px-3 text-neutral-700 dark:text-neutral-300">
              {f.label}
            </span>
          ))}
        </div>

        <div className="mt-6 flex gap-4 text-sm">
          {restaurant.phone && <a href={`tel:${restaurant.phone}`} className="text-sky-600 hover:underline">📞 {restaurant.phone}</a>}
          {restaurant.website && <a href={restaurant.website} target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline">{t.website}</a>}
        </div>

        <ReviewSection entityType="restaurant" entityId={restaurant.id} />
        <TripNoteBox entityType="restaurant" entityId={restaurant.id} />
        <div className="mt-6 flex items-center justify-between gap-4">
          <LastUpdated date={restaurant.updated_at} />
          <ReportIssue entityType="restaurant" entityId={restaurant.id} />
        </div>
      </main>
    </div>
  )
}
