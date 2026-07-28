import Link from 'next/link'
import { Header } from '@/components/Header'
import { PageHero } from '@/components/PageHero'
import { createClient } from '@/lib/supabase/server'

export default async function TravelStoriesPage() {
  const supabase = await createClient()
  const { data: stories } = await supabase
    .from('travel_stories')
    .select('id, title, content, cover_image_url, created_at, users(full_name), islands(name, slug)')
    .eq('is_published', true)
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 transition-colors duration-300">
      <Header />

      <PageHero
        image="/mykonos.jpg"
        badge="Topluluk"
        title="Gezi Hikayeleri"
        subtitle="Yunan Adaları'nı gerçekten gezmiş gezginlerin kendi kaleminden anlattığı deneyimler."
      />

      <main className="mx-auto max-w-4xl px-6 py-12">
        <div className="flex justify-end mb-8">
          <Link href="/gezi-hikayeleri/yeni" className="rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-sky-500 transition-colors">
            + Hikayeni Paylaş
          </Link>
        </div>

        {stories && stories.length > 0 ? (
          <div className="space-y-5">
            {stories.map((story) => {
              const author = Array.isArray(story.users) ? story.users[0] : story.users
              const island = Array.isArray(story.islands) ? story.islands[0] : story.islands
              const preview = story.content.slice(0, 220)
              return (
                <Link
                  key={story.id}
                  href={`/gezi-hikayeleri/${story.id}`}
                  className="block bg-white dark:bg-neutral-900 rounded-2xl border border-slate-100 dark:border-neutral-900 shadow-sm hover:shadow-md transition-all overflow-hidden"
                >
                  {story.cover_image_url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={story.cover_image_url} alt={story.title} className="w-full h-48 object-cover" />
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs text-neutral-400 mb-2">
                      <span>{author?.full_name || 'Bir gezgin'}</span>
                      <span>·</span>
                      <span>{new Date(story.created_at).toLocaleDateString('tr-TR')}</span>
                      {island && (
                        <>
                          <span>·</span>
                          <span>🏝️ {island.name}</span>
                        </>
                      )}
                    </div>
                    <h2 className="text-lg font-bold text-neutral-900 dark:text-white">{story.title}</h2>
                    <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                      {preview}{story.content.length > 220 ? '…' : ''}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <span className="text-5xl">✍️</span>
            <h2 className="mt-4 text-xl font-bold text-neutral-900 dark:text-white">Henüz hikaye paylaşılmamış</h2>
            <p className="mt-2 text-sm text-neutral-500">İlk gezi hikayesini sen paylaş!</p>
          </div>
        )}
      </main>

      <footer className="border-t border-slate-100 dark:border-neutral-900 bg-white dark:bg-neutral-950 py-8 mt-24">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">&copy; 2026 Yunanisland. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  )
}
