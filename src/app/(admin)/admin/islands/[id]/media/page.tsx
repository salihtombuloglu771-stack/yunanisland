import { notFound } from 'next/navigation'
import { MediaManager } from '@/components/admin/MediaManager'
import { createClient } from '@/lib/supabase/server'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function IslandMediaPage({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()

  const [{ data: island }, { data: media }] = await Promise.all([
    supabase.from('islands').select('id, name').eq('id', id).maybeSingle(),
    supabase.from('media').select('id, url, media_type').eq('entity_type', 'island').eq('entity_id', id),
  ])

  if (!island) notFound()

  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-8">{island.name} — Galeri Yönetimi</h1>
      <MediaManager islandId={island.id} initialItems={media ?? []} />
    </main>
  )
}
