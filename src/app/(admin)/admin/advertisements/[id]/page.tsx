import { notFound } from 'next/navigation'
import { AdvertisementForm } from '@/components/admin/AdvertisementForm'
import { createClient } from '@/lib/supabase/server'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function EditAdvertisementPage({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()
  const { data: ad } = await supabase.from('advertisements').select('*').eq('id', id).maybeSingle()

  if (!ad) notFound()

  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-8">{ad.title} Düzenle</h1>
      <AdvertisementForm
        initial={{
          id: ad.id,
          title: ad.title,
          image_url: ad.image_url ?? '',
          link_url: ad.link_url ?? '',
          placement: ad.placement ?? 'homepage',
          is_active: ad.is_active,
          starts_at: ad.starts_at ? ad.starts_at.slice(0, 10) : '',
          ends_at: ad.ends_at ? ad.ends_at.slice(0, 10) : '',
        }}
      />
    </main>
  )
}
