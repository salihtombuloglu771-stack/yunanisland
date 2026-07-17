import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { Header } from '@/components/Header'
import { FavoriteButton } from '@/components/FavoriteButton'
import { ReviewSection } from '@/components/ReviewSection'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { JsonLd } from '@/components/JsonLd'
import { createClient } from '@/lib/supabase/server'

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://yunanisland.vercel.app'

interface PageProps {
  params: Promise<{ slug: string }>
}

const CATEGORY_LABELS: Record<string, string> = { budget: '💰 Bütçe Dostu', 'mid-range': '💳 Orta Segment', luxury: '💎 Lüks' }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data: hotel } = await supabase.from('hotels').select('name, description').eq('slug', slug).maybeSingle()
  if (!hotel) return { title: 'Otel Bulunamadı — Yunanisland' }
  return { title: `${hotel.name} — Yunanisland`, description: hotel.description ?? undefined }
}

export default async function HotelDetailPage({ params }: PageProps) {
  const { slug } = await params
  const supabase = await createClient()
  const { data: hotel } = await supabase.from('hotels').select('*, islands(name, slug)').eq('slug', slug).maybeSingle()

  if (!hotel) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-neutral-950">
        <Header />
        <div className="flex flex-col items-center justify-center p-6 py-24 text-center">
          <span className="text-6xl mb-4">🏨❌</span>
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">Otel Bulunamadı</h1>
          <Link href="/" className="mt-6 rounded-xl bg-sky-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-sky-500 transition-colors">Ana Sayfaya Dön</Link>
        </div>
      </div>
    )
  }

  const island = Array.isArray(hotel.islands) ? hotel.islands[0] : hotel.islands

  const { data: reviews } = await supabase.from('reviews').select('rating').eq('entity_type', 'hotel').eq('entity_id', hotel.id)
  const reviewCount = reviews?.length ?? 0
  const avgRating = reviewCount > 0 ? reviews!.reduce((s, r) => s + r.rating, 0) / reviewCount : null

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: hotel.name,
    description: hotel.description ?? undefined,
    url: `${SITE_URL}/hotels/${hotel.slug}`,
    ...(hotel.latitude && hotel.longitude
      ? { geo: { '@type': 'GeoCoordinates', latitude: hotel.latitude, longitude: hotel.longitude } }
      : {}),
    ...(avgRating
      ? { aggregateRating: { '@type': 'AggregateRating', ratingValue: avgRating.toFixed(1), reviewCount } }
      : {}),
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 transition-colors duration-300">
      <JsonLd data={jsonLd} />
      <Header />

      <div className="mx-auto max-w-4xl px-6 pt-4">
        <Breadcrumbs
          baseUrl={SITE_URL}
          items={[
            { label: 'Ana Sayfa', href: '/' },
            ...(island ? [{ label: island.name, href: `/islands/${island.slug}` }] : []),
            { label: hotel.name },
          ]}
        />
      </div>

      <section className="relative h-[300px] w-full overflow-hidden bg-slate-900">
        {hotel.cover_image_url ? (
          <>
            <Image src={hotel.cover_image_url} alt={hotel.name} fill priority className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-purple-800 to-indigo-950" />
        )}
        <div className="absolute top-20 right-6">
          <FavoriteButton entityType="hotel" entityId={hotel.id} />
        </div>
        <div className="absolute bottom-0 left-0 right-0 max-w-4xl mx-auto px-6 pb-8 text-white">
          {island && (
            <Link href={`/islands/${island.slug}`} className="text-xs text-sky-300 hover:underline">
              ← {island.name}
            </Link>
          )}
          <h1 className="mt-2 text-3xl md:text-5xl font-extrabold tracking-tight">{hotel.name}</h1>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="text-xs bg-white/10 backdrop-blur-md px-3 py-1 rounded-full font-medium">{CATEGORY_LABELS[hotel.category]}</span>
            {hotel.price_range && <span className="text-xs bg-white/10 backdrop-blur-md px-3 py-1 rounded-full font-medium">{hotel.price_range}</span>}
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-4xl px-6 py-12">
        <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">{hotel.description}</p>

        {hotel.affiliate_link && (
          <a
            href={hotel.affiliate_link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block rounded-xl bg-sky-600 hover:bg-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-md transition-colors"
          >
            Fiyatları Gör ↗
          </a>
        )}

        <ReviewSection entityType="hotel" entityId={hotel.id} />
      </main>
    </div>
  )
}
