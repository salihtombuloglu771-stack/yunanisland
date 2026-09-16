import type { Metadata } from 'next'
import { Header } from '@/components/Header'
import { HomeHero } from '@/components/HomeHero'
import { HomeClient } from '@/components/HomeClient'
import { AdBanner } from '@/components/AdBanner'
import { CurrencyWidget } from '@/components/CurrencyWidget'
import { RecentlyViewedBar } from '@/components/RecentlyViewedBar'
import { NearbyIslands } from '@/components/NearbyIslands'
import { TrustStats } from '@/components/TrustStats'
import { HomeSeoContent } from '@/components/HomeSeoContent'
import { IslandOfTheWeek } from '@/components/IslandOfTheWeek'
import { SiteFooter } from '@/components/SiteFooter'
import { createClient } from '@/lib/supabase/server'
import { getRatingsMap } from '@/lib/ratings'
import { pickIslandOfWeek } from '@/lib/islandOfWeek'
import { getUrlLocale, buildHreflangAlternates } from '@/lib/i18n/urlLocale'

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://yunanisland.vercel.app'

const HOME_COPY = {
  tr: {
    title: 'Yunan Adaları Rehberi: Plajlar, Oteller, Gezilecek Yerler | Yunanisland',
    description: 'Yunan Adaları için en kapsamlı gezi rehberi: plajlar, restoranlar, oteller, gezilecek yerler, feribot rotaları, bütçe hesaplayıcı ve gerçek gezgin yorumları. Bütçenize ve tarzınıza uygun Yunan adasını bulun.',
  },
  en: {
    title: 'Greek Islands Guide: Beaches, Hotels, Attractions | Yunanisland',
    description: 'The most complete Greek Islands travel guide: beaches, restaurants, hotels, attractions, ferry routes, a budget calculator and real traveler reviews. Find the Greek island that fits your budget and style.',
  },
  el: {
    title: 'Οδηγός Ελληνικών Νησιών: Παραλίες, Ξενοδοχεία, Αξιοθέατα | Yunanisland',
    description: 'Ο πληρέστερος ταξιδιωτικός οδηγός για τα Ελληνικά Νησιά: παραλίες, εστιατόρια, ξενοδοχεία, αξιοθέατα, δρομολόγια φέρι, υπολογιστής προϋπολογισμού και πραγματικές κριτικές ταξιδιωτών.',
  },
} as const

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getUrlLocale()
  const copy = HOME_COPY[locale]
  const alternates = buildHreflangAlternates('/', SITE_URL, locale)

  return {
    title: copy.title,
    description: copy.description,
    alternates,
    openGraph: {
      title: copy.title,
      description: copy.description,
      images: ['/santorini.jpg'],
    },
  }
}

export default async function Home() {
  const supabase = await createClient()

  // Birbirine bağımlı olmayan sorgular paralel çalıştırılıyor — önceden
  // hepsi sırayla await ediliyordu, bu da her biri ayrı bir round-trip
  // olduğu için sayfa oluşturma süresini gereksiz uzatıyordu (Lighthouse
  // denetiminde bulundu).
  const [
    { data: islands },
    { count: beachCount },
    { count: restaurantCount },
    { count: attractionCount },
    { data: trending },
  ] = await Promise.all([
    supabase
      .from('islands')
      .select('id, name, slug, description, description_en, budget_level, moods, population, best_time_to_visit, best_time_to_visit_en, cover_image_url, latitude, longitude')
      .eq('is_published', true)
      .order('name'),
    supabase.from('beaches').select('id', { count: 'exact', head: true }),
    supabase.from('restaurants').select('id', { count: 'exact', head: true }),
    supabase.from('attractions').select('id', { count: 'exact', head: true }),
    supabase.rpc('get_trending_islands', { days_back: 30, limit_count: 3 }),
  ])

  // Puanlar ada id'lerine bağımlı olduğu için yukarıdaki paralel gruba
  // dahil edilemiyor, ondan sonra ayrı çalışıyor.
  const ratings = await getRatingsMap(supabase, 'island', (islands ?? []).map((i) => i.id))
  const trendingSlugs = new Set((trending ?? []).map((t: { slug: string }) => t.slug))

  const islandsWithRatings = (islands ?? []).map((i) => ({
    ...i,
    ...ratings[i.id],
    isTrending: trendingSlugs.has(i.slug),
  }))

  const islandOfWeek = pickIslandOfWeek(islandsWithRatings, [...trendingSlugs] as string[])

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 transition-colors duration-300">
      <Header />
      <HomeHero />

      <main className="mx-auto max-w-7xl px-6 py-12">
        <AdBanner placement="homepage" />
        {islandOfWeek && <IslandOfTheWeek island={islandOfWeek} />}
        <TrustStats
          islandCount={islandsWithRatings.length}
          beachCount={beachCount ?? 0}
          restaurantCount={restaurantCount ?? 0}
          attractionCount={attractionCount ?? 0}
        />
        <RecentlyViewedBar />
        <NearbyIslands islands={islandsWithRatings} />
        <CurrencyWidget />
        <HomeClient islands={islandsWithRatings} />
        <HomeSeoContent islands={islandsWithRatings} />
      </main>

      <SiteFooter />
    </div>
  )
}
