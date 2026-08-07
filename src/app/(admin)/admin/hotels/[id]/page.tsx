import { notFound } from 'next/navigation'
import { HotelForm } from '@/components/admin/HotelForm'
import { createClient } from '@/lib/supabase/server'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function EditHotelPage({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()

  const [{ data: hotel }, { data: islands }] = await Promise.all([
    supabase.from('hotels').select('*').eq('id', id).maybeSingle(),
    supabase.from('islands').select('id, name').order('name'),
  ])

  if (!hotel) notFound()

  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-8">{hotel.name} Düzenle</h1>
      <HotelForm
        islands={islands ?? []}
        initial={{
          id: hotel.id,
          island_id: hotel.island_id,
          name: hotel.name,
          slug: hotel.slug,
          category: hotel.category,
          description: hotel.description ?? '',
          price_range: hotel.price_range ?? '',
          affiliate_link: hotel.affiliate_link ?? '',
          latitude: hotel.latitude?.toString() ?? '',
          longitude: hotel.longitude?.toString() ?? '',
          cover_image_url: hotel.cover_image_url ?? '',
          star_rating: hotel.star_rating?.toString() ?? '',
          has_wifi: hotel.has_wifi ?? false,
          has_pool: hotel.has_pool ?? false,
          has_breakfast: hotel.has_breakfast ?? false,
          beachfront: hotel.beachfront ?? false,
        }}
      />
    </main>
  )
}
