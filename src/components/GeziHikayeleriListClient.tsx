'use client'

import Link from 'next/link'
import { Header } from '@/components/Header'
import { PageHero } from '@/components/PageHero'
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

export function GeziHikayeleriListClient({ stories }: { stories: TravelStory[] }) {
  const { locale } = useLanguage()

  const t = {
    badge: locale === 'en' ? 'Community' : locale === 'el' ? 'Κοινότητα' : 'Topluluk',
    title: locale === 'en' ? 'Travel Stories' : locale === 'el' ? 'Ταξιδιωτικές Ιστορίες' : 'Gezi Hikayeleri',
    subtitle: locale === 'en'
      ? 'Experiences told in their own words by travelers who have truly explored the Greek Islands.'
      : locale === 'el'
        ? 'Εμπειρίες που αφηγούνται με τα δικά τους λόγια ταξιδιώτες που έχουν πραγματικά εξερευνήσει τα Ελληνικά Νησιά.'
        : 'Yunan Adaları\'nı gerçekten gezmiş gezginlerin kendi kaleminden anlattığı deneyimler.',
    share: locale === 'en' ? '+ Share Your Story' : locale === 'el' ? '+ Μοιράσου την Ιστορία σου' : '+ Hikayeni Paylaş',
    anonymousTraveler: locale === 'en' ? 'A traveler' : locale === 'el' ? 'Ένας ταξιδιώτης' : 'Bir gezgin',
    empty: locale === 'en' ? 'No stories shared yet' : locale === 'el' ? 'Δεν έχει μοιραστεί ακόμη καμία ιστορία' : 'Henüz hikaye paylaşılmamış',
    emptySubtitle: locale === 'en'
      ? 'Be the first to share a travel story!'
      : locale === 'el'
        ? 'Μοιράσου την πρώτη ταξιδιωτική ιστορία!'
        : 'İlk gezi hikayesini sen paylaş!',
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 transition-colors duration-300">
      <Header />

      <PageHero
        image="/mykonos.jpg"
        badge={t.badge}
        title={t.title}
        subtitle={t.subtitle}
      />

      <main className="mx-auto max-w-4xl px-6 py-12">
        <div className="flex justify-end mb-8">
          <Link href="/gezi-hikayeleri/yeni" className="rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-sky-500 transition-colors">
            {t.share}
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
                      <span>{author?.full_name || t.anonymousTraveler}</span>
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
            <h2 className="mt-4 text-xl font-bold text-neutral-900 dark:text-white">{t.empty}</h2>
            <p className="mt-2 text-sm text-neutral-500">{t.emptySubtitle}</p>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  )
}
