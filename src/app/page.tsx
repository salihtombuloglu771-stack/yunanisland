import { Header } from '@/components/Header'
import { HomeHero } from '@/components/HomeHero'
import { HomeClient } from '@/components/HomeClient'
import { AdBanner } from '@/components/AdBanner'
import { CurrencyWidget } from '@/components/CurrencyWidget'
import { RecentlyViewedBar } from '@/components/RecentlyViewedBar'
import { SiteFooter } from '@/components/SiteFooter'
import { createClient } from '@/lib/supabase/server'
import { getRatingsMap } from '@/lib/ratings'

export default async function Home() {
  const supabase = await createClient()
  const { data: islands } = await supabase
    .from('islands')
    .select('id, name, slug, description, description_en, budget_level, population, best_time_to_visit, best_time_to_visit_en, cover_image_url')
    .eq('is_published', true)
    .order('name')

  const ratings = await getRatingsMap(supabase, 'island', (islands ?? []).map((i) => i.id))
  const islandsWithRatings = (islands ?? []).map((i) => ({ ...i, ...ratings[i.id] }))

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 transition-colors duration-300">
      <Header />
      <HomeHero />

      <main className="mx-auto max-w-7xl px-6 py-12">
        <AdBanner placement="homepage" />
        <RecentlyViewedBar />
        <CurrencyWidget />
        <HomeClient islands={islandsWithRatings} />
      </main>

      <SiteFooter />
    </div>
  )
}
