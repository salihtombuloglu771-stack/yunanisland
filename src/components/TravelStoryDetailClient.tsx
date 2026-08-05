'use client'

import Link from 'next/link'
import { Header } from '@/components/Header'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { MarkdownContent } from '@/components/MarkdownContent'
import { ShareButtons } from '@/components/ShareButtons'
import { SiteFooter } from '@/components/SiteFooter'
import { useLanguage } from '@/lib/i18n/LanguageProvider'

interface TravelStory {
  id: string
  title: string
  content: string
  cover_image_url: string | null
  created_at: string
  users: { full_name: string | null } | { full_name: string | null }[] | null
  islands: { name: string; slug: string } | { name: string; slug: string }[] | null
}

export function TravelStoryDetailClient({ story, id, siteUrl }: { story: TravelStory | null; id: string; siteUrl: string }) {
  const { locale } = useLanguage()

  const t = {
    home: locale === 'en' ? 'Home' : locale === 'el' ? 'Αρχική' : 'Ana Sayfa',
    stories: locale === 'en' ? 'Travel Stories' : locale === 'el' ? 'Ταξιδιωτικές Ιστορίες' : 'Gezi Hikayeleri',
    anonymousTraveler: locale === 'en' ? 'A traveler' : locale === 'el' ? 'Ένας ταξιδιώτης' : 'Bir gezgin',
    notFound: locale === 'en' ? 'Story Not Found' : locale === 'el' ? 'Η Ιστορία Δεν Βρέθηκε' : 'Hikaye Bulunamadı',
    backToStories: locale === 'en' ? 'Back to Travel Stories' : locale === 'el' ? 'Επιστροφή στις Ταξιδιωτικές Ιστορίες' : 'Gezi Hikayelerine Dön',
  }

  const author = story && (Array.isArray(story.users) ? story.users[0] : story.users)
  const island = story && (Array.isArray(story.islands) ? story.islands[0] : story.islands)

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 transition-colors duration-300">
      <Header />

      <main className="mx-auto max-w-3xl px-6 py-16">
        {story ? (
          <>
            <Breadcrumbs
              baseUrl={siteUrl}
              items={[
                { label: t.home, href: '/' },
                { label: t.stories, href: '/gezi-hikayeleri' },
                { label: story.title },
              ]}
            />

            {story.cover_image_url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={story.cover_image_url} alt={story.title} className="w-full h-64 object-cover rounded-2xl mt-6 mb-6" />
            )}

            <article className="prose max-w-none dark:prose-invert">
              <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">{story.title}</h1>
              <div className="flex items-center justify-between not-prose mb-6">
                <p className="text-xs text-neutral-400">
                  {author?.full_name || t.anonymousTraveler} · {new Date(story.created_at).toLocaleDateString('tr-TR')}
                  {island && (
                    <>
                      {' · '}
                      <Link href={`/islands/${island.slug}`} className="text-sky-600 hover:underline">🏝️ {island.name}</Link>
                    </>
                  )}
                </p>
                <ShareButtons url={`${siteUrl}/gezi-hikayeleri/${id}`} title={story.title} />
              </div>
              <MarkdownContent
                content={story.content}
                className="text-neutral-700 dark:text-neutral-300 leading-relaxed"
              />
            </article>
          </>
        ) : (
          <div className="text-center py-16">
            <span className="text-5xl">✍️❌</span>
            <h1 className="mt-4 text-2xl font-bold text-neutral-900 dark:text-white">{t.notFound}</h1>
            <Link href="/gezi-hikayeleri" className="mt-6 inline-block rounded-xl bg-sky-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-sky-500 transition-colors">
              {t.backToStories}
            </Link>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  )
}
