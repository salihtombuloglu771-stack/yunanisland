import { notFound } from 'next/navigation'
import { FerryRouteForm } from '@/components/admin/FerryRouteForm'
import { createClient } from '@/lib/supabase/server'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function EditFerryRoutePage({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()
  const { data: route } = await supabase.from('ferry_routes').select('*').eq('id', id).maybeSingle()

  if (!route) notFound()

  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-8">{route.from_port} → {route.to_port} Düzenle</h1>
      <FerryRouteForm
        initial={{
          id: route.id,
          from_port: route.from_port,
          to_port: route.to_port,
          companies: (route.companies ?? []).join(', '),
          duration_minutes: route.duration_minutes?.toString() ?? '',
          price_min: route.price_min?.toString() ?? '',
          price_max: route.price_max?.toString() ?? '',
        }}
      />
    </main>
  )
}
