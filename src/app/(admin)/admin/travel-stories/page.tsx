import { createClient } from '@/lib/supabase/server'
import { AdminDeleteButton } from '@/components/admin/AdminDeleteButton'
import { StoryPublishToggle } from '@/components/admin/StoryPublishToggle'

export default async function AdminTravelStoriesPage() {
  const supabase = await createClient()
  const { data: stories } = await supabase
    .from('travel_stories')
    .select('id, title, content, is_published, created_at, users(full_name, email), islands(name)')
    .order('created_at', { ascending: false })
    .limit(200)

  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Gezi Hikayeleri</h1>
      <p className="mt-1 text-sm text-neutral-500">{stories?.length ?? 0} hikaye (son 200)</p>

      <div className="mt-8 space-y-3">
        {(stories ?? []).map((s) => {
          const user = s.users as unknown as { full_name?: string; email?: string } | null
          const island = s.islands as unknown as { name?: string } | null
          return (
            <div key={s.id} className="bg-white dark:bg-neutral-900 rounded-2xl border border-slate-100 dark:border-neutral-900 shadow-sm p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <a href={`/gezi-hikayeleri/${s.id}`} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-neutral-900 dark:text-white hover:underline">
                    {s.title} ↗
                  </a>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    {user?.full_name ?? '—'} ({user?.email}) {island?.name ? `· ${island.name}` : ''} · {new Date(s.created_at).toLocaleDateString('tr-TR')}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <StoryPublishToggle id={s.id} isPublished={s.is_published} />
                  <AdminDeleteButton table="travel_stories" id={s.id} confirmMessage="Bu gezi hikayesini silmek istiyor musunuz?" />
                </div>
              </div>
              <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300 line-clamp-2">{s.content}</p>
            </div>
          )
        })}
      </div>

      {(!stories || stories.length === 0) && (
        <p className="mt-8 text-sm text-neutral-500">Henüz gezi hikayesi yok.</p>
      )}
    </main>
  )
}
