import { HotelForm } from '@/components/admin/HotelForm'
import { createClient } from '@/lib/supabase/server'

export default async function NewHotelPage() {
  const supabase = await createClient()
  const { data: islands } = await supabase.from('islands').select('id, name').order('name')

  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-8">Yeni Otel Ekle</h1>
      <HotelForm islands={islands ?? []} />
    </main>
  )
}
