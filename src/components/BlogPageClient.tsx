'use client'

import { Header } from '@/components/Header'
import { PageHero } from '@/components/PageHero'
import { BlogList } from '@/components/BlogList'
import { SiteFooter } from '@/components/SiteFooter'
import { useLanguage } from '@/lib/i18n/LanguageProvider'

interface Article {
  id: string
  slug: string
  title: string
  content: string | null
  published_at: string | null
  category: { name: string; slug: string } | null
}

export function BlogPageClient({ articles, adBanner }: { articles: Article[]; adBanner: React.ReactNode }) {
  const { locale } = useLanguage()

  const t = {
    badge: locale === 'en' ? 'Travel Blog' : locale === 'el' ? 'Ταξιδιωτικό Blog' : 'Gezi Blogu',
    title: locale === 'en' ? 'Greek Islands Travel Guides' : locale === 'el' ? 'Ταξιδιωτικοί Οδηγοί Ελληνικών Νησιών' : 'Yunan Adaları Gezi Rehberleri',
    subtitle: locale === 'en'
      ? 'From budget tips to island comparisons, best beach lists to practical travel advice — everything you need.'
      : locale === 'el'
        ? 'Από συμβουλές προϋπολογισμού μέχρι συγκρίσεις νησιών, από λίστες καλύτερων παραλιών μέχρι πρακτικές ταξιδιωτικές συμβουλές — όλα όσα χρειάζεσαι.'
        : 'Bütçe ipuçlarından ada karşılaştırmalarına, en iyi plaj listelerinden pratik gezi tavsiyelerine kadar her şey.',
    rss: locale === 'en' ? '📡 Follow via RSS' : locale === 'el' ? '📡 Ακολούθησε μέσω RSS' : '📡 RSS ile takip et',
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 transition-colors duration-300">
      <Header />

      <PageHero
        image="/santorini.jpg"
        badge={t.badge}
        title={t.title}
        subtitle={t.subtitle}
      />

      <main className="mx-auto max-w-4xl px-6 py-12">
        <div className="flex justify-end mb-4">
          <a
            href="/feed.xml"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-600 hover:text-orange-500 dark:text-orange-400 dark:hover:text-orange-300 transition-colors"
          >
            {t.rss}
          </a>
        </div>
        {adBanner}
        <BlogList articles={articles} />
      </main>

      <SiteFooter />
    </div>
  )
}
