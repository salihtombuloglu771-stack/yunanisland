import { Header } from '@/components/Header'
import { PageHeroI18n } from '@/components/PageHeroI18n'
import { EventsList } from '@/components/EventsList'
import { createClient } from '@/lib/supabase/server'

export default async function EventsPage() {
  const supabase = await createClient()
  const today = new Date().toISOString().slice(0, 10)

  const { data: events } = await supabase
    .from('events')
    .select('id, title, slug, description, category, start_date, end_date, location, islands(name, slug)')
    .eq('is_published', true)
    .gte('start_date', today)
    .order('start_date')

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 transition-colors duration-300">
      <Header />

      <PageHeroI18n
        image="/kos.jpg"
        tr={{
          badge: 'Etkinlik Takvimi',
          title: 'Yaklaşan Etkinlikler',
          subtitle: 'Festivaller, dini bayramlar ve mevsimlik kutlamalar — seyahatini bu tarihlere göre planla.',
        }}
        en={{
          badge: 'Event Calendar',
          title: 'Upcoming Events',
          subtitle: 'Festivals, religious holidays and seasonal celebrations — plan your trip around these dates.',
        }}
        el={{
          badge: 'Ημερολόγιο Εκδηλώσεων',
          title: 'Επερχόμενες Εκδηλώσεις',
          subtitle: 'Φεστιβάλ, θρησκευτικές γιορτές και εποχιακοί εορτασμοί — προγραμματίστε το ταξίδι σας με βάση αυτές τις ημερομηνίες.',
        }}
      />

      <main className="mx-auto max-w-3xl px-6 py-12">
        <EventsList events={events ?? []} />
      </main>
    </div>
  )
}
