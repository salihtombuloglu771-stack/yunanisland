import { createClient } from '@/lib/supabase/server'
import { AdminDeleteButton } from '@/components/admin/AdminDeleteButton'

const ENTITY_TABLES: Record<string, { table: string; path: string }> = {
  island: { table: 'islands', path: 'islands' },
  beach: { table: 'beaches', path: 'beaches' },
  restaurant: { table: 'restaurants', path: 'restaurants' },
  hotel: { table: 'hotels', path: 'hotels' },
  attraction: { table: 'attractions', path: 'attractions' },
}

export default async function AdminReviewsPage() {
  const supabase = await createClient()
  const { data: reviews } = await supabase
    .from('reviews')
    .select('id, rating, comment, image_url, entity_type, entity_id, created_at, users(full_name, email)')
    .order('created_at', { ascending: false })
    .limit(200)

  const idsByType: Record<string, string[]> = {}
  for (const r of reviews ?? []) {
    idsByType[r.entity_type] = idsByType[r.entity_type] ?? []
    idsByType[r.entity_type].push(r.entity_id)
  }

  const nameMaps: Record<string, Record<string, { name: string; slug: string }>> = {}
  await Promise.all(
    Object.entries(idsByType).map(async ([type, ids]) => {
      const conf = ENTITY_TABLES[type]
      if (!conf) return
      const { data } = await supabase.from(conf.table).select('id, name, slug').in('id', ids)
      nameMaps[type] = Object.fromEntries((data ?? []).map((d) => [d.id, { name: d.name, slug: d.slug }]))
    })
  )

  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Yorumlar</h1>
      <p className="mt-1 text-sm text-neutral-500">{reviews?.length ?? 0} yorum (son 200)</p>

      <div className="mt-8 space-y-3">
        {(reviews ?? []).map((r) => {
          const user = r.users as unknown as { full_name?: string; email?: string } | null
          const entity = nameMaps[r.entity_type]?.[r.entity_id]
          const conf = ENTITY_TABLES[r.entity_type]
          return (
            <div key={r.id} className="bg-white dark:bg-neutral-900 rounded-2xl border border-slate-100 dark:border-neutral-900 shadow-sm p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-bold text-neutral-900 dark:text-white">{user?.full_name ?? '—'}</span>
                    <span className="text-xs text-neutral-400">{user?.email}</span>
                  </div>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    {entity && conf ? (
                      <a href={`/${conf.path}/${entity.slug}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {entity.name} ↗
                      </a>
                    ) : (
                      'Bilinmeyen içerik'
                    )}
                    {' · '}{new Date(r.created_at).toLocaleDateString('tr-TR')}
                  </p>
                </div>
                <AdminDeleteButton table="reviews" id={r.id} confirmMessage="Bu yorumu silmek istiyor musunuz?" />
              </div>
              <div className="mt-2 text-amber-500 text-sm">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</div>
              {r.comment && <p className="mt-1.5 text-sm text-neutral-700 dark:text-neutral-300">{r.comment}</p>}
              {r.image_url && (
                // eslint-disable-next-line @next/next/no-img-element -- kullanıcı URL'i herhangi bir dış domain olabilir
                <img src={r.image_url} alt="" className="mt-2 max-h-48 rounded-xl object-cover" />
              )}
            </div>
          )
        })}
      </div>

      {(!reviews || reviews.length === 0) && (
        <p className="mt-8 text-sm text-neutral-500">Henüz yorum yok.</p>
      )}
    </main>
  )
}
