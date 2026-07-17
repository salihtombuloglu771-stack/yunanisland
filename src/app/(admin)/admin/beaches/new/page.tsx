import { BeachForm } from '@/components/admin/BeachForm'
import { createClient } from '@/lib/supabase/server'

export default async function NewBeachPage() {
  const supabase = await createClient()
  const { data: islands } = await supabase.from('islands').select('id, name').order('name')

  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-8">Yeni Plaj Ekle</h1>
      <BeachForm islands={islands ?? []} />
    </main>
  )
}
