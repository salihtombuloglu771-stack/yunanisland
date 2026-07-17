import { notFound } from 'next/navigation'
import { EventForm } from '@/components/admin/EventForm'
import { createClient } from '@/lib/supabase/server'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function EditEventPage({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()

  const [{ data: event }, { data: islands }] = await Promise.all([
    supabase.from('events').select('*').eq('id', id).maybeSingle(),
    supabase.from('islands').select('id, name').order('name'),
  ])

  if (!event) notFound()

  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-8">{event.title} Düzenle</h1>
      <EventForm
        islands={islands ?? []}
        initial={{
          id: event.id,
          title: event.title,
          slug: event.slug,
          description: event.description ?? '',
          category: event.category ?? 'other',
          start_date: event.start_date,
          end_date: event.end_date ?? '',
          location: event.location ?? '',
          island_id: event.island_id ?? '',
          is_published: event.is_published,
        }}
      />
    </main>
  )
}
