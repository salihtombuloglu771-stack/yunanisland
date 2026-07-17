import { Header } from '@/components/Header'
import { PageHero } from '@/components/PageHero'
import { TripPlannerClient } from '@/components/TripPlannerClient'
import { createClient } from '@/lib/supabase/server'

export default async function TripPlannerPage() {
  const supabase = await createClient()
  const { data: islands } = await supabase.from('islands').select('id, name, slug').eq('is_published', true).order('name')

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 transition-colors duration-300">
      <Header />

      <PageHero
        image="/zakynthos.jpg"
        badge="🤖 Yapay Zeka Destekli"
        title="AI Gezi Planlayıcı"
        subtitle="Tercihlerine göre gerçek adalar, plajlar, restoranlar ve otellerden oluşan kişiye özel bir gezi planı oluştur."
      />

      <main className="mx-auto max-w-5xl px-6 py-12">
        <TripPlannerClient islands={islands ?? []} />
      </main>
    </div>
  )
}
