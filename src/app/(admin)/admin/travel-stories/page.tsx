import { createClient as createAdminClient } from '@supabase/supabase-js'
import { AdminDeleteButton } from '@/components/admin/AdminDeleteButton'
import { StoryPublishToggle } from '@/components/admin/StoryPublishToggle'

export default async function AdminTravelStoriesPage() {
  // users.email artık ayrı, RLS'li bir tabloda (bkz. migration 044) — bu
  // sayfa zaten proxy.ts'de admin-only, service role ile devam.
  const supabase = createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )
  const { data: stories } = await supabase
    .from('travel_stories')
    .select('id, title, content, is_published, created_at, users(id, full_name), islands(name)')
    .order('created_at', { ascending: false })
    .limit(200)

  const userIds = [
    ...new Set(
      (stories ?? [])
        .map((s) => (s.users as unknown as { id?: string } | null)?.id)
        .filter((id): id is string => Boolean(id))
    ),
  ]
  const { data: emailRows } = userIds.length
    ? await supabase.from('user_emails').select('user_id, email').in('user_id', userIds)
    : { data: [] }
  const emailByUserId = Object.fromEntries((emailRows ?? []).map((e) => [e.user_id, e.email]))

  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Gezi Hikayeleri</h1>
      <p className="mt-1 text-sm text-neutral-500">{stories?.length ?? 0} hikaye (son 200)</p>

      <div className="mt-8 space-y-3">
        {(stories ?? []).map((s) => {
          const user = s.users as unknown as { id?: string; full_name?: string } | null
          const email = user?.id ? emailByUserId[user.id] : undefined
          const island = s.islands as unknown as { name?: string } | null
          return (
            <div key={s.id} className="bg-white dark:bg-neutral-900 rounded-2xl border border-slate-100 dark:border-neutral-900 shadow-sm p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <a href={`/gezi-hikayeleri/${s.id}`} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-neutral-900 dark:text-white hover:underline">
                    {s.title} ↗
                  </a>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    {user?.full_name ?? '—'} ({email}) {island?.name ? `· ${island.name}` : ''} · {new Date(s.created_at).toLocaleDateString('tr-TR')}
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
