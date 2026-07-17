import { Header } from '@/components/Header'
import { HomeHero } from '@/components/HomeHero'
import { HomeClient } from '@/components/HomeClient'
import { AdBanner } from '@/components/AdBanner'
import { CurrencyWidget } from '@/components/CurrencyWidget'
import { SiteFooter } from '@/components/SiteFooter'
import { createClient } from '@/lib/supabase/server'

export default async function Home() {
  const supabase = await createClient()
  const { data: islands } = await supabase
    .from('islands')
    .select('id, name, slug, description, description_en, budget_level, population, best_time_to_visit, best_time_to_visit_en, cover_image_url')
    .eq('is_published', true)
    .order('name')

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 transition-colors duration-300">
      <Header />
      <HomeHero />

      <main className="mx-auto max-w-7xl px-6 py-12">
        <AdBanner placement="homepage" />
        <CurrencyWidget />
        <HomeClient islands={islands ?? []} />
      </main>

      <SiteFooter />
    </div>
  )
}
