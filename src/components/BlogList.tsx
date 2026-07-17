'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'

interface Article {
  id: string
  slug: string
  title: string
  content: string | null
  published_at: string | null
  category: { name: string; slug: string } | null
}

export function BlogList({ articles }: { articles: Article[] }) {
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const categories = useMemo(() => {
    const seen = new Map<string, string>()
    articles.forEach((a) => { if (a.category) seen.set(a.category.slug, a.category.name) })
    return Array.from(seen.entries()).map(([slug, name]) => ({ slug, name }))
  }, [articles])

  const filtered = activeCategory === 'all'
    ? articles
    : articles.filter((a) => a.category?.slug === activeCategory)

  if (articles.length === 0) {
    return (
      <div className="py-16 text-center bg-white dark:bg-neutral-900 border border-dashed border-slate-200 dark:border-neutral-850 rounded-2xl">
        <span className="text-4xl">📝</span>
        <p className="mt-4 text-sm text-neutral-500">Henüz yayınlanmış bir yazı yok.</p>
      </div>
    )
  }

  return (
    <>
      {categories.length > 1 && (
        <div className="flex gap-2 flex-wrap mb-8">
          <button
            onClick={() => setActiveCategory('all')}
            className={`whitespace-nowrap rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
              activeCategory === 'all'
                ? 'bg-sky-600 text-white shadow-md shadow-sky-500/10'
                : 'bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border border-slate-200 dark:border-neutral-850 hover:bg-slate-100 dark:hover:bg-neutral-850'
            }`}
          >
            Tümü
          </button>
          {categories.map((c) => (
            <button
              key={c.slug}
              onClick={() => setActiveCategory(c.slug)}
              className={`whitespace-nowrap rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                activeCategory === c.slug
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-500/10'
                  : 'bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border border-slate-200 dark:border-neutral-850 hover:bg-slate-100 dark:hover:bg-neutral-850'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      )}

      {filtered.length > 0 ? (
        <div className="space-y-6">
          {filtered.map((article) => (
            <Link
              key={article.id}
              href={`/blog/${article.slug}`}
              className="block bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-slate-100 dark:border-neutral-900 shadow-sm hover:-translate-y-0.5 hover:shadow-lg transition-all"
            >
              {article.category && (
                <span className="inline-flex items-center rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 px-2.5 py-0.5 text-xs font-semibold mb-3">
                  {article.category.name}
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
          ))}
        </div>
      ) : (
        <div className="py-16 text-center bg-white dark:bg-neutral-900 border border-dashed border-slate-200 dark:border-neutral-850 rounded-2xl">
          <span className="text-4xl">📝</span>
          <p className="mt-4 text-sm text-neutral-500">Bu kategoride henüz yazı yok.</p>
        </div>
      )}
    </>
  )
}
