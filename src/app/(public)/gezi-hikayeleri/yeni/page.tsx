import { Header } from '@/components/Header'
import { SiteFooter } from '@/components/SiteFooter'
import { createClient } from '@/lib/supabase/server'
import { StoryForm } from '@/components/StoryForm'
import { NewStoryIntro } from '@/components/NewStoryIntro'

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
        <NewStoryIntro />

        <StoryForm islands={islands ?? []} />
      </main>
      <SiteFooter />
    </div>
  )
}
