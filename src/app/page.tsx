import { Header } from '@/components/Header'
import { HomeHero } from '@/components/HomeHero'
import { HomeClient } from '@/components/HomeClient'
import { AdBanner } from '@/components/AdBanner'
import { CurrencyWidget } from '@/components/CurrencyWidget'
import { RecentlyViewedBar } from '@/components/RecentlyViewedBar'
import { NearbyIslands } from '@/components/NearbyIslands'
import { TrustStats } from '@/components/TrustStats'
import { SiteFooter } from '@/components/SiteFooter'
import { createClient } from '@/lib/supabase/server'
import { getRatingsMap } from '@/lib/ratings'

export default async function Home() {
  const supabase = await createClient()
  const { data: islands } = await supabase
    .from('islands')
    .select('id, name, slug, description, description_en, budget_level, moods, population, best_time_to_visit, best_time_to_visit_en, cover_image_url, latitude, longitude')
    .eq('is_published', true)
    .order('name')

  const ratings = await getRatingsMap(supabase, 'island', (islands ?? []).map((i) => i.id))

  const [{ count: beachCount }, { count: restaurantCount }, { count: attractionCount }] = await Promise.all([
    supabase.from('beaches').select('id', { count: 'exact', head: true }),
    supabase.from('restaurants').select('id', { count: 'exact', head: true }),
    supabase.from('attractions').select('id', { count: 'exact', head: true }),
  ])

  const { data: trending } = await supabase.rpc('get_trending_islands', { days_back: 30, limit_count: 3 })
  const trendingSlugs = new Set((trending ?? []).map((t: { slug: string }) => t.slug))

  const islandsWithRatings = (islands ?? []).map((i) => ({
    ...i,
    ...ratings[i.id],
    isTrending: trendingSlugs.has(i.slug),
  }))

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 transition-colors duration-300">
      <Header />
      <HomeHero />

      <main className="mx-auto max-w-7xl px-6 py-12">
        <AdBanner placement="homepage" />
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
      </main>

      <SiteFooter />
    </div>
  )
}
