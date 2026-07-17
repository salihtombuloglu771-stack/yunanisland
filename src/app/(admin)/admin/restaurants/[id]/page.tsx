import { notFound } from 'next/navigation'
import { RestaurantForm } from '@/components/admin/RestaurantForm'
import { createClient } from '@/lib/supabase/server'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function EditRestaurantPage({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()

  const [{ data: restaurant }, { data: islands }] = await Promise.all([
    supabase.from('restaurants').select('*').eq('id', id).maybeSingle(),
    supabase.from('islands').select('id, name').order('name'),
  ])

  if (!restaurant) notFound()

  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-8">{restaurant.name} Düzenle</h1>
      <RestaurantForm
        islands={islands ?? []}
        initial={{
          id: restaurant.id,
          island_id: restaurant.island_id,
          name: restaurant.name,
          slug: restaurant.slug,
          cuisine: restaurant.cuisine ?? '',
          price_level: restaurant.price_level,
          average_cost: restaurant.average_cost?.toString() ?? '',
          opening_hours: restaurant.opening_hours ?? '',
          phone: restaurant.phone ?? '',
          website: restaurant.website ?? '',
          vegetarian: restaurant.vegetarian,
          vegan: restaurant.vegan,
          gluten_free: restaurant.gluten_free,
          sea_view: restaurant.sea_view,
          outdoor_seating: restaurant.outdoor_seating,
          family_friendly: restaurant.family_friendly,
          latitude: restaurant.latitude?.toString() ?? '',
          longitude: restaurant.longitude?.toString() ?? '',
          cover_image_url: restaurant.cover_image_url ?? '',
        }}
      />
    </main>
  )
}
