import { Header } from '@/components/Header'
import { PageHero } from '@/components/PageHero'
import { createClient } from '@/lib/supabase/server'

const CATEGORY_LABELS: Record<string, string> = {
  festival: '🎉 Festival',
  concert: '🎵 Konser',
  sports: '⚽ Spor',
  food: '🍽️ Gastronomi',
  religious: '🕊️ Dini',
  seasonal: '📅 Mevsimlik',
  other: '✨ Diğer',
}

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

      <PageHero
        image="/mykonos.jpg"
        badge="Etkinlik Takvimi"
        title="Yaklaşan Etkinlikler"
        subtitle="Festivaller, dini bayramlar ve mevsimlik kutlamalar — seyahatini bu tarihlere göre planla."
      />

      <main className="mx-auto max-w-3xl px-6 py-12">
        {events && events.length > 0 ? (
          <div className="space-y-4">
            {events.map((event) => {
              const island = Array.isArray(event.islands) ? event.islands[0] : event.islands
              const start = new Date(event.start_date)
              return (
                <div key={event.id} className="flex gap-4 bg-white dark:bg-neutral-900 p-5 rounded-2xl border border-slate-100 dark:border-neutral-900 shadow-sm">
                  <div className="flex-shrink-0 w-16 text-center bg-sky-50 dark:bg-sky-950/30 rounded-xl py-2">
                    <p className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase">{start.toLocaleDateString('tr-TR', { month: 'short' })}</p>
                    <p className="text-xl font-extrabold text-sky-700 dark:text-sky-300">{start.getDate()}</p>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-neutral-500">{CATEGORY_LABELS[event.category] ?? event.category}</span>
                    <h2 className="text-lg font-bold text-neutral-900 dark:text-white mt-1">{event.title}</h2>
                    {event.description && <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">{event.description}</p>}
                    <p className="mt-2 text-xs text-neutral-400">
                      📍 {event.location ?? island?.name ?? 'Yunanistan'}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="py-16 text-center bg-white dark:bg-neutral-900 border border-dashed border-slate-200 dark:border-neutral-850 rounded-2xl">
            <span className="text-4xl">📅</span>
            <p className="mt-4 text-sm text-neutral-500">Yaklaşan etkinlik bulunmuyor.</p>
          </div>
        )}
      </main>
    </div>
  )
}
