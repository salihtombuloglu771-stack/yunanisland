import { Header } from '@/components/Header'
import { PageHeroI18n } from '@/components/PageHeroI18n'
import { TripPlannerClient } from '@/components/TripPlannerClient'
import { createClient } from '@/lib/supabase/server'

export default async function TripPlannerPage() {
  const supabase = await createClient()
  const { data: islands } = await supabase.from('islands').select('id, name, slug').eq('is_published', true).order('name')

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 transition-colors duration-300">
      <Header />

      <PageHeroI18n
        image="/zakynthos.jpg"
        tr={{
          badge: '🤖 Yapay Zeka Destekli',
          title: 'AI Gezi Planlayıcı',
          subtitle: 'Tercihlerine göre gerçek adalar, plajlar, restoranlar ve otellerden oluşan kişiye özel bir gezi planı oluştur.',
        }}
        en={{
          badge: '🤖 AI Powered',
          title: 'AI Trip Planner',
          subtitle: 'Create a personalized trip plan built from real islands, beaches, restaurants and hotels based on your preferences.',
        }}
        el={{
          badge: '🤖 Με Τεχνητή Νοημοσύνη',
          title: 'Σχεδιαστής Ταξιδιού AI',
          subtitle: 'Δημιουργήστε ένα εξατομικευμένο πρόγραμμα ταξιδιού από πραγματικά νησιά, παραλίες, εστιατόρια και ξενοδοχεία με βάση τις προτιμήσεις σας.',
        }}
      />

      <main className="mx-auto max-w-5xl px-6 py-12">
        <TripPlannerClient islands={islands ?? []} />
      </main>
    </div>
  )
}
