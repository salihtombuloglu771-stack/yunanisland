import { createClient } from '@/lib/supabase/server'
import { ContentReportStatusSelect } from '@/components/admin/ContentReportStatusSelect'

const ENTITY_TABLES: Record<string, { table: string; path: string }> = {
  island: { table: 'islands', path: 'islands' },
  beach: { table: 'beaches', path: 'beaches' },
  restaurant: { table: 'restaurants', path: 'restaurants' },
  hotel: { table: 'hotels', path: 'hotels' },
  attraction: { table: 'attractions', path: 'attractions' },
}

export default async function ContentReportsPage() {
  const supabase = await createClient()
  const { data: reports } = await supabase
    .from('content_reports')
    .select('*')
    .order('created_at', { ascending: false })

  const idsByType: Record<string, string[]> = {}
  for (const report of reports ?? []) {
    idsByType[report.entity_type] = idsByType[report.entity_type] ?? []
    idsByType[report.entity_type].push(report.entity_id)
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
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">İçerik Hata Bildirimleri</h1>
      <p className="mt-1 text-sm text-neutral-500">{reports?.length ?? 0} bildirim</p>

      <div className="mt-8 space-y-4">
        {(reports ?? []).map((report) => {
          const entity = nameMaps[report.entity_type]?.[report.entity_id]
          const conf = ENTITY_TABLES[report.entity_type]
          return (
            <div key={report.id} className="bg-white dark:bg-neutral-900 rounded-2xl border border-slate-100 dark:border-neutral-900 shadow-sm p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-bold text-neutral-900 dark:text-white">
                    {entity && conf ? (
                      <a href={`/${conf.path}/${entity.slug}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {entity.name} ↗
                      </a>
                    ) : (
                      'Bilinmeyen içerik'
                    )}
                  </p>
                  {report.reporter_email && (
                    <p className="text-sm text-neutral-500">
                      <a href={`mailto:${report.reporter_email}`} className="text-sky-600 hover:underline">{report.reporter_email}</a>
                    </p>
                  )}
                </div>
                <ContentReportStatusSelect id={report.id} status={report.status} />
              </div>
              <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">{report.message}</p>
              <p className="mt-3 text-xs text-neutral-400">{new Date(report.created_at).toLocaleDateString('tr-TR')}</p>
            </div>
          )
        })}

        {(!reports || reports.length === 0) && (
          <p className="text-sm text-neutral-500">Henüz hata bildirimi yok.</p>
        )}
      </div>
    </main>
  )
}
