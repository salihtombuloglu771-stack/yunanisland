'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/Header'
import { FavoriteButton } from '@/components/FavoriteButton'
import { ReviewSection } from '@/components/ReviewSection'
import { TripNoteBox } from '@/components/TripNoteBox'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import type { Attraction } from '@/components/AttractionCard'

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://yunanisland.vercel.app'

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

interface AttractionDetailClientProps {
  attraction: {
    id: string; name: string; slug: string; category: Attraction['category']
    description: string | null; opening_hours: string | null; ticket_price: string | null
    cover_image_url: string | null
  }
  island: { name: string; slug: string } | null
}

export function AttractionDetailClient({ attraction, island }: AttractionDetailClientProps) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 transition-colors duration-300">
      <Header />

      <div className="mx-auto max-w-4xl px-6 pt-4">
        <Breadcrumbs
          baseUrl={SITE_URL}
          items={[
            { label: 'Ana Sayfa', href: '/' },
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
        <div className="absolute top-20 right-6">
          <FavoriteButton entityType="attraction" entityId={attraction.id} />
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
              {CATEGORY_LABELS[attraction.category]}
            </span>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-4xl px-6 py-12">
        <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">{attraction.description}</p>

        {(attraction.opening_hours || attraction.ticket_price) && (
          <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
            {attraction.opening_hours && (
              <div className="bg-white dark:bg-neutral-900 rounded-xl p-4 border border-slate-100 dark:border-neutral-900">
                <p className="text-xs text-neutral-400">🕒 Ziyaret Saatleri</p>
                <p className="font-semibold text-neutral-800 dark:text-neutral-200">{attraction.opening_hours}</p>
              </div>
            )}
            {attraction.ticket_price && (
              <div className="bg-white dark:bg-neutral-900 rounded-xl p-4 border border-slate-100 dark:border-neutral-900">
                <p className="text-xs text-neutral-400">🎟️ Giriş Ücreti</p>
                <p className="font-semibold text-neutral-800 dark:text-neutral-200">{attraction.ticket_price}</p>
              </div>
            )}
          </div>
        )}

        <ReviewSection entityType="attraction" entityId={attraction.id} />
        <TripNoteBox entityType="attraction" entityId={attraction.id} />
      </main>
    </div>
  )
}
