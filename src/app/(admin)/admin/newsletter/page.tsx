import { createClient } from '@/lib/supabase/server'

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

      <div className="mt-8 bg-white dark:bg-neutral-900 rounded-2xl border border-slate-100 dark:border-neutral-900 shadow-sm divide-y divide-slate-100 dark:divide-neutral-800">
        {(subscribers ?? []).map((s) => (
          <div key={s.id} className="flex items-center justify-between px-5 py-3">
            <span className="text-sm text-neutral-800 dark:text-neutral-200">{s.email}</span>
            <span className="text-xs text-neutral-400">{new Date(s.created_at).toLocaleDateString('tr-TR')}</span>
          </div>
        ))}

        {(!subscribers || subscribers.length === 0) && (
          <p className="px-5 py-8 text-center text-sm text-neutral-500">Henüz abone yok.</p>
        )}
      </div>
    </main>
  )
}
