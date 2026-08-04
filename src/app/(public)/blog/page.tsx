import { Header } from '@/components/Header'
import { PageHero } from '@/components/PageHero'
import { AdBanner } from '@/components/AdBanner'
import { BlogList } from '@/components/BlogList'
import { createClient } from '@/lib/supabase/server'

export default async function BlogPage() {
  const supabase = await createClient()
  const { data: articles } = await supabase
    .from('articles')
    .select('id, title, slug, content, published_at, categories(name, slug)')
    .eq('is_published', true)
    .order('published_at', { ascending: false })

  const normalizedArticles = (articles ?? []).map((a) => ({
    id: a.id,
    slug: a.slug,
    title: a.title,
    content: a.content,
    published_at: a.published_at,
    category: Array.isArray(a.categories) ? a.categories[0] ?? null : a.categories,
  }))

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 transition-colors duration-300">
      <Header />

      <PageHero
        image="/santorini.jpg"
        badge="Gezi Blogu"
        title="Yunan Adaları Gezi Rehberleri"
        subtitle="Bütçe ipuçlarından ada karşılaştırmalarına, en iyi plaj listelerinden pratik gezi tavsiyelerine kadar her şey."
      />

      <main className="mx-auto max-w-4xl px-6 py-12">
        <div className="flex justify-end mb-4">
          <a
            href="/feed.xml"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-600 hover:text-orange-500 dark:text-orange-400 dark:hover:text-orange-300 transition-colors"
          >
            📡 RSS ile takip et
          </a>
        </div>
        <AdBanner placement="blog" />
        <BlogList articles={normalizedArticles} />
      </main>

      <footer className="border-t border-slate-100 dark:border-neutral-900 bg-white dark:bg-neutral-950 py-8 mt-24">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">&copy; 2026 Yunanisland. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  )
}
