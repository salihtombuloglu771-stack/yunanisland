import { createClient } from '@/lib/supabase/server'
import { NewsletterList } from '@/components/admin/NewsletterList'

export default async function NewsletterPage() {
  const supabase = await createClient()
  const { data: subscribers } = await supabase
    .from('newsletter_subscribers')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Bülten Aboneleri</h1>
      <p className="mt-1 text-sm text-neutral-500">{subscribers?.length ?? 0} abone</p>

      <NewsletterList subscribers={subscribers ?? []} />
    </main>
  )
}
