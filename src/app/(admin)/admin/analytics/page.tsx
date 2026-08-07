import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

function friendlyPath(path: string, islandNames: Map<string, string>): string {
  const islandMatch = path.match(/^\/islands\/([^/]+)/)
  if (islandMatch) {
    const name = islandNames.get(islandMatch[1])
    return name ? `🏝️ Ada: ${name}` : path
  }
  const staticLabels: Record<string, string> = {
    '/': '🏠 Ana Sayfa',
    '/search': '🔍 Arama',
    '/map': '🗺️ Harita',
    '/compare': '⚖️ Karşılaştırma',
    '/blog': '📝 Blog',
    '/budget-calculator': '💰 Bütçe Hesaplayıcı',
    '/trip-tools': '🧳 Seyahat Araçları',
    '/events': '📅 Etkinlikler',
    '/ferry-guide': '🚢 Feribot Rehberi',
  }
  return staticLabels[path] ?? path
}

export default async function AdminAnalyticsPage() {
  const supabase = await createClient()
  const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()

  const [
    { data: topPathsRaw },
    { data: topQueriesRaw },
    { data: islands },
    { count: totalViews },
    { count: totalSearches },
  ] = await Promise.all([
    supabase.rpc('get_page_view_stats', { p_since: since, p_limit: 15 }),
    supabase.rpc('get_search_query_stats', { p_since: since, p_limit: 15 }),
    supabase.from('islands').select('slug, name'),
    supabase.from('page_views').select('*', { count: 'exact', head: true }).gte('created_at', since),
    supabase.from('search_logs').select('*', { count: 'exact', head: true }).gte('created_at', since),
  ])

  const islandNames = new Map((islands ?? []).map((i) => [i.slug, i.name]))

  const pathStats = (topPathsRaw ?? []) as { path: string; view_count: number }[]
  const queryStats = (topQueriesRaw ?? []) as { query: string; search_count: number; total_results: number }[]

  const topPaths = pathStats.map((p) => [p.path, Number(p.view_count)] as const)
  const topQueries = queryStats.map((q) => [q.query, { count: Number(q.search_count), totalResults: Number(q.total_results) }] as const)

  const maxPathCount = topPaths[0]?.[1] ?? 1
  const maxQueryCount = topQueries[0]?.[1].count ?? 1
  const zeroResultQueries = topQueries.filter(([, v]) => v.totalResults === 0)

  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <div className="flex items-center gap-3">
        <Link href="/admin/dashboard" className="text-sm text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300">← Panel</Link>
      </div>
      <h1 className="mt-2 text-2xl font-bold text-neutral-900 dark:text-white">Analitik</h1>
      <p className="mt-2 text-sm text-neutral-500">Son 30 gün — sayfa ziyaretleri ve arama sorguları.</p>

      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-neutral-900 p-4 rounded-2xl border border-slate-100 dark:border-neutral-900 shadow-sm">
          <p className="text-2xl font-extrabold text-neutral-900 dark:text-white">{totalViews ?? 0}</p>
          <p className="text-xs text-neutral-500">Sayfa Görüntüleme</p>
        </div>
        <div className="bg-white dark:bg-neutral-900 p-4 rounded-2xl border border-slate-100 dark:border-neutral-900 shadow-sm">
          <p className="text-2xl font-extrabold text-neutral-900 dark:text-white">{totalSearches ?? 0}</p>
          <p className="text-xs text-neutral-500">Arama Sorgusu</p>
        </div>
        <div className="bg-white dark:bg-neutral-900 p-4 rounded-2xl border border-slate-100 dark:border-neutral-900 shadow-sm">
          <p className="text-2xl font-extrabold text-neutral-900 dark:text-white">{zeroResultQueries.length}</p>
          <p className="text-xs text-neutral-500">Sonuçsuz Arama Türü</p>
        </div>
      </div>

      <div className="mt-10 grid md:grid-cols-2 gap-8">
        <section>
          <h2 className="text-lg font-bold text-neutral-900 dark:text-white mb-4">En Çok Ziyaret Edilen Sayfalar</h2>
          {topPaths.length === 0 ? (
            <p className="text-sm text-neutral-500">Henüz veri yok.</p>
          ) : (
            <div className="space-y-2">
              {topPaths.map(([path, count]) => (
                <div key={path} className="bg-white dark:bg-neutral-900 p-3 rounded-xl border border-slate-100 dark:border-neutral-900">
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <span className="font-medium text-neutral-800 dark:text-neutral-200 truncate">{friendlyPath(path, islandNames)}</span>
                    <span className="font-bold text-neutral-900 dark:text-white flex-shrink-0 ml-2">{count}</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                    <div className="h-full bg-sky-500 rounded-full" style={{ width: `${(count / maxPathCount) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="text-lg font-bold text-neutral-900 dark:text-white mb-4">En Çok Aranan Kelimeler</h2>
          {topQueries.length === 0 ? (
            <p className="text-sm text-neutral-500">Henüz veri yok.</p>
          ) : (
            <div className="space-y-2">
              {topQueries.map(([query, { count, totalResults }]) => (
                <div key={query} className="bg-white dark:bg-neutral-900 p-3 rounded-xl border border-slate-100 dark:border-neutral-900">
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <span className="font-medium text-neutral-800 dark:text-neutral-200 truncate">
                      &quot;{query}&quot;
                      {totalResults === 0 && <span className="ml-2 text-[10px] font-semibold text-red-600">SONUÇSUZ</span>}
                    </span>
                    <span className="font-bold text-neutral-900 dark:text-white flex-shrink-0 ml-2">{count}</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(count / maxQueryCount) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
