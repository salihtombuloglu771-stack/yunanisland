import Link from 'next/link'
import { notFound } from 'next/navigation'
import { IslandForm } from '@/components/admin/IslandForm'
import { createClient } from '@/lib/supabase/server'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function EditIslandPage({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()
  const { data: island } = await supabase.from('islands').select('*').eq('id', id).maybeSingle()

  if (!island) notFound()

  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">{island.name} Düzenle</h1>
        <div className="flex items-center gap-4">
          <Link href={`/islands/${island.slug}`} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-emerald-600 hover:underline">
            👁️ Önizle ↗
          </Link>
          <Link href={`/admin/islands/${island.id}/media`} className="text-sm font-semibold text-sky-600 hover:underline">
            📸 Galeriyi Yönet
          </Link>
        </div>
      </div>
      <IslandForm
        initial={{
          id: island.id,
          name: island.name,
          slug: island.slug,
          description: island.description ?? '',
          history: island.history ?? '',
          population: island.population?.toString() ?? '',
          latitude: island.latitude?.toString() ?? '',
          longitude: island.longitude?.toString() ?? '',
          best_time_to_visit: island.best_time_to_visit ?? '',
          budget_level: island.budget_level,
          cover_image_url: island.cover_image_url ?? '',
          is_published: island.is_published,
        }}
      />
    </main>
  )
}
