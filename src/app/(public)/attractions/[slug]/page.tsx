import Link from 'next/link'
import type { Metadata } from 'next'
import { Header } from '@/components/Header'
import { JsonLd } from '@/components/JsonLd'
import { AttractionDetailClient } from '@/components/AttractionDetailClient'
import { createClient } from '@/lib/supabase/server'

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://yunanisland.vercel.app'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data: attraction } = await supabase.from('attractions').select('name, description').eq('slug', slug).maybeSingle()
  if (!attraction) return { title: 'Yer Bulunamadı — Yunanisland' }
  return { title: `${attraction.name} — Yunanisland`, description: attraction.description ?? undefined }
}

export default async function AttractionDetailPage({ params }: PageProps) {
  const { slug } = await params
  const supabase = await createClient()
  const { data: attraction } = await supabase.from('attractions').select('*, islands(name, slug)').eq('slug', slug).maybeSingle()

  if (!attraction) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-neutral-950">
        <Header />
        <div className="flex flex-col items-center justify-center p-6 py-24 text-center">
          <span className="text-6xl mb-4">📍❌</span>
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">Yer Bulunamadı</h1>
          <Link href="/" className="mt-6 rounded-xl bg-sky-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-sky-500 transition-colors">Ana Sayfaya Dön</Link>
        </div>
      </div>
    )
  }

  const island = Array.isArray(attraction.islands) ? attraction.islands[0] : attraction.islands

  const { data: reviews } = await supabase.from('reviews').select('rating').eq('entity_type', 'attraction').eq('entity_id', attraction.id)
  const reviewCount = reviews?.length ?? 0
  const avgRating = reviewCount > 0 ? reviews!.reduce((s, r) => s + r.rating, 0) / reviewCount : null

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: attraction.name,
    description: attraction.description ?? undefined,
    url: `${SITE_URL}/attractions/${attraction.slug}`,
    ...(attraction.latitude && attraction.longitude
      ? { geo: { '@type': 'GeoCoordinates', latitude: attraction.latitude, longitude: attraction.longitude } }
      : {}),
    ...(avgRating
      ? { aggregateRating: { '@type': 'AggregateRating', ratingValue: avgRating.toFixed(1), reviewCount } }
      : {}),
  }

  return (
    <>
      <JsonLd data={jsonLd} />
      <AttractionDetailClient attraction={attraction} island={island} />
    </>
  )
}
