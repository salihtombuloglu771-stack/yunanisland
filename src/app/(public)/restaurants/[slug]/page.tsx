import Link from 'next/link'
import type { Metadata } from 'next'
import { Header } from '@/components/Header'
import { JsonLd } from '@/components/JsonLd'
import { RestaurantDetailClient } from '@/components/RestaurantDetailClient'
import { createClient } from '@/lib/supabase/server'

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://yunanisland.vercel.app'

interface PageProps {
  params: Promise<{ slug: string }>
}

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

  const { data: reviews } = await supabase.from('reviews').select('rating').eq('entity_type', 'restaurant').eq('entity_id', restaurant.id)
  const reviewCount = reviews?.length ?? 0
  const avgRating = reviewCount > 0 ? reviews!.reduce((s, r) => s + r.rating, 0) / reviewCount : null

  const priceRangeMap: Record<string, string> = { budget: '€', mid: '€€', expensive: '€€€' }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: restaurant.name,
    servesCuisine: restaurant.cuisine ?? undefined,
    priceRange: priceRangeMap[restaurant.price_level],
    telephone: restaurant.phone ?? undefined,
    url: `${SITE_URL}/restaurants/${restaurant.slug}`,
    ...(restaurant.latitude && restaurant.longitude
      ? { geo: { '@type': 'GeoCoordinates', latitude: restaurant.latitude, longitude: restaurant.longitude } }
      : {}),
    ...(avgRating
      ? { aggregateRating: { '@type': 'AggregateRating', ratingValue: avgRating.toFixed(1), reviewCount } }
      : {}),
  }

  return (
    <>
      <JsonLd data={jsonLd} />
      <RestaurantDetailClient restaurant={restaurant} island={island} />
    </>
  )
}
