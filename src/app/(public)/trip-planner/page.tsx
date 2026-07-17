import { Header } from '@/components/Header'
import { TripPlannerClient } from '@/components/TripPlannerClient'
import { createClient } from '@/lib/supabase/server'

export default async function TripPlannerPage() {
  const supabase = await createClient()
  const { data: islands } = await supabase.from('islands').select('id, name, slug').eq('is_published', true).order('name')

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 transition-colors duration-300">
      <Header />

      <section className="relative overflow-hidden bg-slate-900 py-16 text-white dark:bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,165,233,0.15),rgba(255,255,255,0))]" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <span className="inline-flex items-center rounded-full bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-400 ring-1 ring-inset ring-sky-500/20">
            🤖 Yapay Zeka Destekli
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl bg-gradient-to-r from-sky-400 to-teal-300 bg-clip-text text-transparent">
            AI Gezi Planlayıcı
          </h1>
          <p className="mt-4 text-sm text-slate-300 max-w-xl mx-auto">
            Tercihlerine göre gerçek adalar, plajlar, restoranlar ve otellerden oluşan kişiye özel bir gezi planı oluştur.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-5xl px-6 py-12">
        <TripPlannerClient islands={islands ?? []} />
      </main>
    </div>
  )
}
