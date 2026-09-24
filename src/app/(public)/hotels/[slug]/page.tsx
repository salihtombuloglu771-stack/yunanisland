import Link from '@/components/LocaleLink'
import type { Metadata } from 'next'
import { Header } from '@/components/Header'
import { JsonLd } from '@/components/JsonLd'
import { AdBanner } from '@/components/AdBanner'
import { HotelDetailClient } from '@/components/HotelDetailClient'
import { createClient } from '@/lib/supabase/server'
import { ensureMinLength, titleWithSuffix, HOTEL_CATEGORY_TR } from '@/lib/seo'
import { getUrlLocale, buildHreflangAlternates } from '@/lib/i18n/urlLocale'

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://yunanisland.vercel.app'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const locale = await getUrlLocale()
  const supabase = await createClient()
  const { data: hotel } = await supabase
    .from('hotels')
    .select('name, description, description_en, description_el, category, star_rating, cover_image_url, islands(name)')
    .eq('slug', slug)
    .maybeSingle()
  if (!hotel) return { title: 'Otel Bulunamadı — Yunanisland' }

  const islandRel = hotel.islands as unknown as { name: string } | { name: string }[] | null
  const islandName = Array.isArray(islandRel) ? islandRel[0]?.name : islandRel?.name
  const displayName = titleWithSuffix(hotel.name, 'Oteli', /otel|hotel|suites?/i)
  const categoryLabel = HOTEL_CATEGORY_TR[hotel.category] ?? hotel.category

  const titleByLocale = {
    tr: islandName ? `${displayName} — ${islandName} Adası | Yunanisland` : `${displayName} — Yunanisland`,
    en: islandName ? `${hotel.name} Hotel — ${islandName} Island | Yunanisland` : `${hotel.name} Hotel | Yunanisland`,
    el: islandName ? `Ξενοδοχείο ${hotel.name} — Νησί ${islandName} | Yunanisland` : `Ξενοδοχείο ${hotel.name} | Yunanisland`,
  }
  const fillerByLocale = {
    tr: `${islandName ? `${islandName} adasındaki ` : ''}${hotel.name}, ${categoryLabel} segmentte${hotel.star_rating ? ` ${hotel.star_rating} yıldızlı` : ''} bir otel. Fiyatlar, olanaklar ve gezgin yorumları için Yunanisland'ı ziyaret edin.`,
    en: `Visit Yunanisland for prices, amenities and traveler reviews of ${hotel.name}${islandName ? ` on ${islandName} island` : ''}.`,
    el: `Επισκεφθείτε το Yunanisland για τιμές, ανέσεις και κριτικές ταξιδιωτών για το ${hotel.name}${islandName ? ` στο νησί ${islandName}` : ''}.`,
  }
  const rawDescription = locale === 'en' ? (hotel.description_en || hotel.description)
    : locale === 'el' ? (hotel.description_el || hotel.description)
    : hotel.description

  const title = titleByLocale[locale]
  const description = ensureMinLength(rawDescription, fillerByLocale[locale])

  return {
    title,
    description,
    alternates: buildHreflangAlternates(`/hotels/${slug}`, SITE_URL, locale),
    openGraph: {
      title,
      description,
      images: hotel.cover_image_url ? [hotel.cover_image_url] : undefined,
    },
  }
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
    <>
      <JsonLd data={jsonLd} />
      <HotelDetailClient hotel={hotel} island={island} adBanner={<AdBanner placement="detail" />} />
    </>
  )
}
