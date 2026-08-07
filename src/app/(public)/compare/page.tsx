import { Header } from '@/components/Header'
import { SiteFooter } from '@/components/SiteFooter'
import { PageHeroI18n } from '@/components/PageHeroI18n'
import { CompareClient } from '@/components/CompareClient'
import { createClient } from '@/lib/supabase/server'

export default async function ComparePage() {
  const supabase = await createClient()
  const { data: islands } = await supabase.from('islands').select('id, name, slug').eq('is_published', true).order('name')

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 transition-colors duration-300">
      <Header />

      <PageHeroI18n
        image="/zakynthos.jpg"
        tr={{
          badge: 'Ada Karşılaştırma',
          title: 'Hangi Ada Size Göre?',
          subtitle: 'İki adayı yan yana karşılaştır: bütçe seviyesi, plaj/restoran/otel sayısı ve gezgin puanları.',
        }}
        en={{
          badge: 'Island Comparison',
          title: 'Which Island Suits You?',
          subtitle: 'Compare two islands side by side: budget level, beach/restaurant/hotel count and traveler ratings.',
        }}
        el={{
          badge: 'Σύγκριση Νησιών',
          title: 'Ποιο Νησί Σας Ταιριάζει;',
          subtitle: 'Συγκρίνετε δύο νησιά δίπλα-δίπλα: επίπεδο προϋπολογισμού, αριθμό παραλιών/εστιατορίων/ξενοδοχείων και βαθμολογίες ταξιδιωτών.',
        }}
      />

      <main className="mx-auto max-w-5xl px-6 py-12">
        <CompareClient options={islands ?? []} />
      </main>
      <SiteFooter />
    </div>
  )
}
