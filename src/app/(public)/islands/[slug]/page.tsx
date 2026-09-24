import Link from '@/components/LocaleLink'
import type { Metadata } from 'next'
import { Header } from '@/components/Header'
import { AdBanner } from '@/components/AdBanner'
import { IslandDetailClient } from '@/components/IslandDetailClient'
import { JsonLd } from '@/components/JsonLd'
import { createClient } from '@/lib/supabase/server'
import { getRatingsMap } from '@/lib/ratings'
import { ensureMinLength } from '@/lib/seo'
import { getUrlLocale, buildHreflangAlternates } from '@/lib/i18n/urlLocale'

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://yunanisland.vercel.app'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const locale = await getUrlLocale()
  const supabase = await createClient()
  const { data: island } = await supabase.from('islands').select('name, description, description_en, description_el, cover_image_url').eq('slug', slug).maybeSingle()

  if (!island) return { title: 'Ada Bulunamadı — Yunanisland' }

  const titleByLocale = {
    tr: `${island.name} Adası Gezi Rehberi — Plajlar, Oteller, Restoranlar | Yunanisland`,
    en: `${island.name} Island Travel Guide — Beaches, Hotels, Restaurants | Yunanisland`,
    el: `Ταξιδιωτικός Οδηγός ${island.name} — Παραλίες, Ξενοδοχεία, Εστιατόρια | Yunanisland`,
  }
  const fillerByLocale = {
    tr: `${island.name} adası hakkında plajlar, oteller, restoranlar, gezilecek yerler ve pratik seyahat bilgileri için Yunanisland'ı ziyaret edin.`,
    en: `Visit Yunanisland for beaches, hotels, restaurants, attractions and practical travel information about ${island.name} island.`,
    el: `Επισκεφθείτε το Yunanisland για παραλίες, ξενοδοχεία, εστιατόρια, αξιοθέατα και πρακτικές πληροφορίες για το νησί ${island.name}.`,
  }
  const rawDescription = locale === 'en' ? (island.description_en || island.description)
    : locale === 'el' ? (island.description_el || island.description)
    : island.description

  const title = titleByLocale[locale]
  const description = ensureMinLength(rawDescription, fillerByLocale[locale])

  return {
    title,
    description,
    alternates: buildHreflangAlternates(`/islands/${slug}`, SITE_URL, locale),
    openGraph: {
      title,
      description,
      images: island.cover_image_url ? [island.cover_image_url] : undefined,
    },
  }
}

export default async function IslandPage({ params }: PageProps) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: island } = await supabase
    .from('islands')
    .select('*')
    .eq('slug', slug)
    .maybeSingle()

  if (!island) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-neutral-950">
        <Header />
        <div className="flex flex-col items-center justify-center p-6 py-24 text-center">
          <span className="text-6xl mb-4">🏝️❌</span>
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">Ada Bulunamadı</h1>
          <p className="mt-2 text-neutral-500 max-w-sm">
            Aradığınız &quot;{slug}&quot; adası sistemimizde mevcut değil veya henüz yayınlanmamış.
          </p>
          <Link href="/" className="mt-6 rounded-xl bg-sky-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-sky-500 transition-colors">
            Geri Dön
          </Link>
        </div>
      </div>
    )
  }

  const [{ data: allBeaches }, { data: allRestaurants }, { data: allHotels }, { data: allAttractions }, { data: media }, { data: reviews }, { data: affiliateLinks }, { data: similarIslands }] = await Promise.all([
    supabase.from('beaches').select('*').eq('island_id', island.id),
    supabase.from('restaurants').select('*').eq('island_id', island.id),
    supabase.from('hotels').select('*').eq('island_id', island.id),
    supabase.from('attractions').select('*').eq('island_id', island.id),
    supabase.from('media').select('id, url, media_type').eq('entity_type', 'island').eq('entity_id', island.id).eq('status', 'approved'),
    supabase.from('reviews').select('rating').eq('entity_type', 'island').eq('entity_id', island.id),
    supabase.from('affiliate_links').select('id, provider, url').eq('entity_type', 'island').eq('entity_id', island.id),
    supabase
      .from('islands')
      .select('id, name, slug, description, budget_level, population, best_time_to_visit, cover_image_url')
      .eq('is_published', true)
      .eq('budget_level', island.budget_level)
      .neq('id', island.id)
      .limit(3),
  ])

  const reviewCount = reviews?.length ?? 0
  const avgRating = reviewCount > 0 ? reviews!.reduce((s, r) => s + r.rating, 0) / reviewCount : null

  const [beachRatings, restaurantRatings, hotelRatings, attractionRatings] = await Promise.all([
    getRatingsMap(supabase, 'beach', (allBeaches ?? []).map((b) => b.id)),
    getRatingsMap(supabase, 'restaurant', (allRestaurants ?? []).map((r) => r.id)),
    getRatingsMap(supabase, 'hotel', (allHotels ?? []).map((h) => h.id)),
    getRatingsMap(supabase, 'attraction', (allAttractions ?? []).map((a) => a.id)),
  ])

  const beachesWithRatings = (allBeaches ?? []).map((b) => ({ ...b, ...beachRatings[b.id] }))
  const restaurantsWithRatings = (allRestaurants ?? []).map((r) => ({ ...r, ...restaurantRatings[r.id] }))
  const hotelsWithRatings = (allHotels ?? []).map((h) => ({ ...h, ...hotelRatings[h.id] }))
  const attractionsWithRatings = (allAttractions ?? []).map((a) => ({ ...a, ...attractionRatings[a.id] }))

  const similarIslandRatings = await getRatingsMap(supabase, 'island', (similarIslands ?? []).map((i) => i.id))
  const similarIslandsWithRatings = (similarIslands ?? []).map((i) => ({ ...i, ...similarIslandRatings[i.id] }))

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: island.name,
    description: island.description ?? undefined,
    image: island.cover_image_url ? `${SITE_URL}${island.cover_image_url}` : undefined,
    url: `${SITE_URL}/islands/${island.slug}`,
    ...(island.latitude && island.longitude
      ? { geo: { '@type': 'GeoCoordinates', latitude: island.latitude, longitude: island.longitude } }
      : {}),
    ...(avgRating
      ? { aggregateRating: { '@type': 'AggregateRating', ratingValue: avgRating.toFixed(1), reviewCount } }
      : {}),
  }

  return (
    <>
      <JsonLd data={jsonLd} />
      <IslandDetailClient
        island={island}
        allBeaches={beachesWithRatings}
        allRestaurants={restaurantsWithRatings}
        allHotels={hotelsWithRatings}
        allAttractions={attractionsWithRatings}
        media={media ?? []}
        similarIslands={similarIslandsWithRatings}
        affiliateLinks={affiliateLinks ?? []}
        adBanner={<AdBanner placement="detail" />}
      />
    </>
  )
}
