import { createClient } from '@/lib/supabase/server'
import { MediaStatusSelect } from '@/components/admin/MediaStatusSelect'

const ENTITY_TABLES: Record<string, { table: string; path: string }> = {
  island: { table: 'islands', path: 'islands' },
  beach: { table: 'beaches', path: 'beaches' },
  restaurant: { table: 'restaurants', path: 'restaurants' },
  hotel: { table: 'hotels', path: 'hotels' },
  attraction: { table: 'attractions', path: 'attractions' },
}

export default async function MediaReviewPage() {
  const supabase = await createClient()
  const { data: items } = await supabase
    .from('media')
    .select('id, url, media_type, status, entity_type, entity_id, created_at')
    .neq('status', 'approved')
    .order('created_at', { ascending: false })

  const idsByType: Record<string, string[]> = {}
  for (const item of items ?? []) {
    idsByType[item.entity_type] = idsByType[item.entity_type] ?? []
    idsByType[item.entity_type].push(item.entity_id)
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
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Fotoğraf Onayı</h1>
      <p className="mt-1 text-sm text-neutral-500">{items?.length ?? 0} bekleyen/reddedilen katkı</p>

      <div className="mt-8 grid sm:grid-cols-2 gap-4">
        {(items ?? []).map((item) => {
          const entity = nameMaps[item.entity_type]?.[item.entity_id]
          const conf = ENTITY_TABLES[item.entity_type]
          return (
            <div key={item.id} className="bg-white dark:bg-neutral-900 rounded-2xl border border-slate-100 dark:border-neutral-900 shadow-sm overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element -- kullanıcı URL'i herhangi bir dış domain olabilir */}
              <img src={item.url} alt="" className="aspect-video w-full object-cover bg-slate-100 dark:bg-neutral-800" />
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-bold text-neutral-900 dark:text-white">
                      {entity && conf ? (
                        <a href={`/${conf.path}/${entity.slug}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                          {entity.name} ↗
                        </a>
                      ) : (
                        'Bilinmeyen içerik'
                      )}
                    </p>
                    <p className="text-xs text-neutral-500">{new Date(item.created_at).toLocaleDateString('tr-TR')}</p>
                  </div>
                  <MediaStatusSelect id={item.id} status={item.status} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {(!items || items.length === 0) && (
        <p className="mt-8 text-sm text-neutral-500">Bekleyen fotoğraf katkısı yok.</p>
      )}
    </main>
  )
}
