import { notFound } from 'next/navigation'
import { AttractionForm } from '@/components/admin/AttractionForm'
import { createClient } from '@/lib/supabase/server'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function EditAttractionPage({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()

  const [{ data: attraction }, { data: islands }] = await Promise.all([
    supabase.from('attractions').select('*').eq('id', id).maybeSingle(),
    supabase.from('islands').select('id, name').order('name'),
  ])

  if (!attraction) notFound()

  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-8">{attraction.name} Düzenle</h1>
      <AttractionForm
        islands={islands ?? []}
        initial={{
          id: attraction.id,
          island_id: attraction.island_id,
          name: attraction.name,
          slug: attraction.slug,
          category: attraction.category,
          description: attraction.description ?? '',
          opening_hours: attraction.opening_hours ?? '',
          ticket_price: attraction.ticket_price ?? '',
          latitude: attraction.latitude?.toString() ?? '',
          longitude: attraction.longitude?.toString() ?? '',
          cover_image_url: attraction.cover_image_url ?? '',
        }}
      />
    </main>
  )
}
