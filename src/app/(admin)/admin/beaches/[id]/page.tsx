import { notFound } from 'next/navigation'
import { BeachForm } from '@/components/admin/BeachForm'
import { createClient } from '@/lib/supabase/server'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function EditBeachPage({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()

  const [{ data: beach }, { data: islands }] = await Promise.all([
    supabase.from('beaches').select('*').eq('id', id).maybeSingle(),
    supabase.from('islands').select('id, name').order('name'),
  ])

  if (!beach) notFound()

  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-8">{beach.name} Düzenle</h1>
      <BeachForm
        islands={islands ?? []}
        initial={{
          id: beach.id,
          island_id: beach.island_id,
          name: beach.name,
          slug: beach.slug,
          description: beach.description ?? '',
          beach_type: beach.beach_type,
          water_depth: beach.water_depth ?? '',
          crowd_level: beach.crowd_level,
          family_friendly: beach.family_friendly,
          pet_friendly: beach.pet_friendly,
          blue_flag: beach.blue_flag,
          sunbed_price: beach.sunbed_price?.toString() ?? '',
          umbrella_price: beach.umbrella_price?.toString() ?? '',
          has_parking: beach.has_parking,
          has_showers: beach.has_showers,
          has_toilets: beach.has_toilets,
          has_beach_bar: beach.has_beach_bar,
          has_lifeguard: beach.has_lifeguard,
          accessibility: beach.accessibility ?? '',
          sunset_rating: beach.sunset_rating?.toString() ?? '',
          latitude: beach.latitude?.toString() ?? '',
          longitude: beach.longitude?.toString() ?? '',
          cover_image_url: beach.cover_image_url ?? '',
        }}
      />
    </main>
  )
}
