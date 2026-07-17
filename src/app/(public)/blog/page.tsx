import Link from 'next/link'
import { Header } from '@/components/Header'
import { createClient } from '@/lib/supabase/server'

export default async function BlogPage() {
  const supabase = await createClient()
  const { data: articles } = await supabase
    .from('articles')
    .select('id, title, slug, content, published_at, categories(name, slug)')
    .eq('is_published', true)
    .order('published_at', { ascending: false })

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 transition-colors duration-300">
      <Header />

      <section className="relative overflow-hidden bg-slate-900 py-16 text-white dark:bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,165,233,0.15),rgba(255,255,255,0))]" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <span className="inline-flex items-center rounded-full bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-400 ring-1 ring-inset ring-sky-500/20">
            Gezi Blogu
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl bg-gradient-to-r from-sky-400 to-teal-300 bg-clip-text text-transparent">
            Yunan Adaları Gezi Rehberleri
          </h1>
          <p className="mt-4 text-sm text-slate-300 max-w-xl mx-auto">
            Bütçe ipuçlarından ada karşılaştırmalarına, en iyi plaj listelerinden pratik gezi tavsiyelerine kadar her şey.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-4xl px-6 py-12">
        {articles && articles.length > 0 ? (
          <div className="space-y-6">
            {articles.map((article) => {
              const category = Array.isArray(article.categories) ? article.categories[0] : article.categories
              return (
                <Link
                  key={article.id}
                  href={`/blog/${article.slug}`}
                  className="block bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-slate-100 dark:border-neutral-900 shadow-sm hover:-translate-y-0.5 hover:shadow-lg transition-all"
                >
                  {category && (
                    <span className="inline-flex items-center rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 px-2.5 py-0.5 text-xs font-semibold mb-3">
                      {category.name}
                    </span>
                  )}
                  <h2 className="text-xl font-bold text-neutral-900 dark:text-white">{article.title}</h2>
                  <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
                    {article.content}
                  </p>
                  {article.published_at && (
                    <p className="mt-3 text-xs text-neutral-400">
                      {new Date(article.published_at).toLocaleDateString('tr-TR')}
                    </p>
                  )}
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="py-16 text-center bg-white dark:bg-neutral-900 border border-dashed border-slate-200 dark:border-neutral-850 rounded-2xl">
            <span className="text-4xl">📝</span>
            <p className="mt-4 text-sm text-neutral-500">Henüz yayınlanmış bir yazı yok.</p>
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
