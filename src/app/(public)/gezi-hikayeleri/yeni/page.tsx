import { Header } from '@/components/Header'
import { createClient } from '@/lib/supabase/server'
import { StoryForm } from '@/components/StoryForm'

export default async function NewTravelStoryPage() {
  const supabase = await createClient()
  const { data: islands } = await supabase
    .from('islands')
    .select('id, name')
    .eq('is_published', true)
    .order('name', { ascending: true })

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 transition-colors duration-300">
      <Header />

      <main className="mx-auto max-w-2xl px-6 py-16">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">✍️ Gezi Hikayeni Paylaş</h1>
        <p className="mt-2 text-sm text-neutral-500">
          Deneyimini diğer gezginlerle paylaş — yayınlandığında herkese açık &quot;Gezi Hikayeleri&quot; sayfasında görünür.
        </p>

        <StoryForm islands={islands ?? []} />
      </main>
    </div>
  )
}
