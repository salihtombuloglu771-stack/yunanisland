import Link from 'next/link'
import type { Metadata } from 'next'
import { Header } from '@/components/Header'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { MarkdownContent } from '@/components/MarkdownContent'
import { createClient } from '@/lib/supabase/server'

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://yunanisland.vercel.app'

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const supabase = await createClient()
  const { data: story } = await supabase.from('travel_stories').select('title, content').eq('id', id).maybeSingle()

  if (!story) return { title: 'Hikaye Bulunamadı — Yunanisland' }

  return {
    title: `${story.title} — Gezi Hikayeleri — Yunanisland`,
    description: story.content.slice(0, 160),
  }
}

export default async function TravelStoryPage({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data: story } = await supabase
    .from('travel_stories')
    .select('id, title, content, cover_image_url, created_at, users(full_name), islands(name, slug)')
    .eq('id', id)
    .eq('is_published', true)
    .maybeSingle()

  const author = story && (Array.isArray(story.users) ? story.users[0] : story.users)
  const island = story && (Array.isArray(story.islands) ? story.islands[0] : story.islands)

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 transition-colors duration-300">
      <Header />

      <main className="mx-auto max-w-3xl px-6 py-16">
        {story ? (
          <>
            <Breadcrumbs
              baseUrl={SITE_URL}
              items={[
                { label: 'Ana Sayfa', href: '/' },
                { label: 'Gezi Hikayeleri', href: '/gezi-hikayeleri' },
                { label: story.title },
              ]}
            />

            {story.cover_image_url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={story.cover_image_url} alt={story.title} className="w-full h-64 object-cover rounded-2xl mt-6 mb-6" />
            )}

            <article className="prose max-w-none dark:prose-invert">
              <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">{story.title}</h1>
              <p className="text-xs text-neutral-400 not-prose mb-6">
                {author?.full_name || 'Bir gezgin'} · {new Date(story.created_at).toLocaleDateString('tr-TR')}
                {island && (
                  <>
                    {' · '}
                    <Link href={`/islands/${island.slug}`} className="text-sky-600 hover:underline">🏝️ {island.name}</Link>
                  </>
                )}
              </p>
              <MarkdownContent
                content={story.content}
                className="text-neutral-700 dark:text-neutral-300 leading-relaxed"
              />
            </article>
          </>
        ) : (
          <div className="text-center py-16">
            <span className="text-5xl">✍️❌</span>
            <h1 className="mt-4 text-2xl font-bold text-neutral-900 dark:text-white">Hikaye Bulunamadı</h1>
            <Link href="/gezi-hikayeleri" className="mt-6 inline-block rounded-xl bg-sky-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-sky-500 transition-colors">
              Gezi Hikayelerine Dön
            </Link>
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
