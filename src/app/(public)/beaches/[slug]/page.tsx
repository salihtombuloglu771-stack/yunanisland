import Link from 'next/link'
import type { Metadata } from 'next'
import { Header } from '@/components/Header'
import { JsonLd } from '@/components/JsonLd'
import { BeachDetailClient } from '@/components/BeachDetailClient'
import { createClient } from '@/lib/supabase/server'

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://yunanisland.vercel.app'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data: beach } = await supabase.from('beaches').select('name, description, cover_image_url').eq('slug', slug).maybeSingle()
  if (!beach) return { title: 'Plaj Bulunamadı — Yunanisland' }
  return {
    title: `${beach.name} — Yunanisland`,
    description: beach.description ?? undefined,
    openGraph: {
      title: `${beach.name} — Yunanisland`,
      description: beach.description ?? undefined,
      images: beach.cover_image_url ? [beach.cover_image_url] : undefined,
    },
  }
}

export default async function BeachDetailPage({ params }: PageProps) {
  const { slug } = await params
  const supabase = await createClient()
  const { data: beach } = await supabase.from('beaches').select('*, islands(name, slug)').eq('slug', slug).maybeSingle()

  if (!beach) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-neutral-950">
        <Header />
        <div className="flex flex-col items-center justify-center p-6 py-24 text-center">
          <span className="text-6xl mb-4">🏖️❌</span>
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">Plaj Bulunamadı</h1>
          <Link href="/" className="mt-6 rounded-xl bg-sky-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-sky-500 transition-colors">Ana Sayfaya Dön</Link>
        </div>
      </div>
    )
  }

  const island = Array.isArray(beach.islands) ? beach.islands[0] : beach.islands

  const { data: reviews } = await supabase.from('reviews').select('rating').eq('entity_type', 'beach').eq('entity_id', beach.id)
  const reviewCount = reviews?.length ?? 0
  const avgRating = reviewCount > 0 ? reviews!.reduce((s, r) => s + r.rating, 0) / reviewCount : null

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: beach.name,
    description: beach.description ?? undefined,
    url: `${SITE_URL}/beaches/${beach.slug}`,
    ...(beach.latitude && beach.longitude
      ? { geo: { '@type': 'GeoCoordinates', latitude: beach.latitude, longitude: beach.longitude } }
      : {}),
    ...(avgRating
      ? { aggregateRating: { '@type': 'AggregateRating', ratingValue: avgRating.toFixed(1), reviewCount } }
      : {}),
  }

  return (
    <>
      <JsonLd data={jsonLd} />
      <BeachDetailClient beach={beach} island={island} />
    </>
  )
}
