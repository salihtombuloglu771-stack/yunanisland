import { Header } from '@/components/Header'
import { PageHero } from '@/components/PageHero'
import { CompareClient } from '@/components/CompareClient'
import { createClient } from '@/lib/supabase/server'

export default async function ComparePage() {
  const supabase = await createClient()
  const { data: islands } = await supabase.from('islands').select('id, name, slug').eq('is_published', true).order('name')

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 transition-colors duration-300">
      <Header />

      <PageHero
        image="/zakynthos.jpg"
        badge="Ada Karşılaştırma"
        title="Hangi Ada Size Göre?"
        subtitle="İki adayı yan yana karşılaştır: bütçe seviyesi, plaj/restoran/otel sayısı ve gezgin puanları."
      />

      <main className="mx-auto max-w-5xl px-6 py-12">
        <CompareClient options={islands ?? []} />
      </main>
    </div>
  )
}
