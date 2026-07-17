import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { Header } from '@/components/Header'
import { FavoriteButton } from '@/components/FavoriteButton'
import { ReviewSection } from '@/components/ReviewSection'
import { createClient } from '@/lib/supabase/server'

interface PageProps {
  params: Promise<{ slug: string }>
}

const PRICE_LABELS: Record<string, string> = { budget: '💰 Bütçe Dostu', mid: '💳 Orta Segment', expensive: '💎 Lüks / Gurme' }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data: restaurant } = await supabase.from('restaurants').select('name, cuisine').eq('slug', slug).maybeSingle()
  if (!restaurant) return { title: 'Restoran Bulunamadı — Yunanisland' }
  return { title: `${restaurant.name} — Yunanisland`, description: restaurant.cuisine ?? undefined }
}

export default async function RestaurantDetailPage({ params }: PageProps) {
  const { slug } = await params
  const supabase = await createClient()
  const { data: restaurant } = await supabase.from('restaurants').select('*, islands(name, slug)').eq('slug', slug).maybeSingle()

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-neutral-950">
        <Header />
        <div className="flex flex-col items-center justify-center p-6 py-24 text-center">
          <span className="text-6xl mb-4">🍽️❌</span>
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">Restoran Bulunamadı</h1>
          <Link href="/" className="mt-6 rounded-xl bg-sky-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-sky-500 transition-colors">Ana Sayfaya Dön</Link>
        </div>
      </div>
    )
  }

  const island = Array.isArray(restaurant.islands) ? restaurant.islands[0] : restaurant.islands

  const facts: { label: string; show: boolean }[] = [
    { label: '🌊 Deniz Manzarası', show: restaurant.sea_view },
    { label: '🪑 Açık Hava Alanı', show: restaurant.outdoor_seating },
    { label: '👨‍👩‍👧 Aile Dostu', show: restaurant.family_friendly },
    { label: '🌱 Vegan', show: restaurant.vegan },
    { label: '🥗 Vejetaryen', show: restaurant.vegetarian },
    { label: '🌾 Glütensiz', show: restaurant.gluten_free },
  ]

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 transition-colors duration-300">
      <Header />

      <section className="relative h-[300px] w-full overflow-hidden bg-slate-900">
        {restaurant.cover_image_url ? (
          <>
            <Image src={restaurant.cover_image_url} alt={restaurant.name} fill priority className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-amber-600 via-orange-800 to-rose-900" />
        )}
        <div className="absolute top-20 right-6">
          <FavoriteButton entityType="restaurant" entityId={restaurant.id} />
        </div>
        <div className="absolute bottom-0 left-0 right-0 max-w-4xl mx-auto px-6 pb-8 text-white">
          {island && (
            <Link href={`/islands/${island.slug}`} className="text-xs text-sky-300 hover:underline">
              ← {island.name}
            </Link>
          )}
          <h1 className="mt-2 text-3xl md:text-5xl font-extrabold tracking-tight">{restaurant.name}</h1>
          <div className="mt-3 flex flex-wrap gap-2">
            {restaurant.cuisine && <span className="text-xs bg-white/10 backdrop-blur-md px-3 py-1 rounded-full font-medium">{restaurant.cuisine}</span>}
            <span className="text-xs bg-white/10 backdrop-blur-md px-3 py-1 rounded-full font-medium">{PRICE_LABELS[restaurant.price_level]}</span>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-4xl px-6 py-12">
        <div className="grid grid-cols-2 gap-4 text-sm mb-6">
          {restaurant.opening_hours && (
            <div className="bg-white dark:bg-neutral-900 rounded-xl p-4 border border-slate-100 dark:border-neutral-900">
              <p className="text-xs text-neutral-400">🕒 Çalışma Saatleri</p>
              <p className="font-semibold text-neutral-800 dark:text-neutral-200">{restaurant.opening_hours}</p>
            </div>
          )}
          {restaurant.average_cost && (
            <div className="bg-white dark:bg-neutral-900 rounded-xl p-4 border border-slate-100 dark:border-neutral-900">
              <p className="text-xs text-neutral-400">Ort. Kişi Başı</p>
              <p className="font-semibold text-neutral-800 dark:text-neutral-200">{restaurant.average_cost} €</p>
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
          {restaurant.website && <a href={restaurant.website} target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline">🌐 Website</a>}
        </div>

        <ReviewSection entityType="restaurant" entityId={restaurant.id} />
      </main>
    </div>
  )
}
