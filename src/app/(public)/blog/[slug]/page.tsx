import Link from 'next/link'
import type { Metadata } from 'next'
import { Header } from '@/components/Header'
import { SiteFooter } from '@/components/SiteFooter'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { JsonLd } from '@/components/JsonLd'
import { ShareButtons } from '@/components/ShareButtons'
import { createClient } from '@/lib/supabase/server'
import { stripMarkdown } from '@/lib/markdown'
import { MarkdownContent } from '@/components/MarkdownContent'

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://yunanisland.vercel.app'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data: article } = await supabase.from('articles').select('title, content').eq('slug', slug).maybeSingle()

  if (!article) return { title: 'Yazı Bulunamadı — Yunanisland' }

  return {
    title: `${article.title} — Yunanisland Blog`,
    description: article.content ? stripMarkdown(article.content).slice(0, 160) : undefined,
  }
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params
  const supabase = await createClient()

  // is_published filtresi burada değil RLS'e bırakıldı ("Public can view
  // published articles": is_published or is_admin()) — böylece admin,
  // yayınlamadan önce kendi hesabıyla önizleme yapabiliyor.
  const { data: article } = await supabase
    .from('articles')
    .select('id, title, content, published_at, author_name, categories(name)')
    .eq('slug', slug)
    .maybeSingle()

  const category = article && (Array.isArray(article.categories) ? article.categories[0] : article.categories)

  const jsonLd = article ? {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    articleSection: category?.name ?? undefined,
    datePublished: article.published_at ?? undefined,
    url: `${SITE_URL}/blog/${slug}`,
    publisher: { '@type': 'Organization', name: 'Yunanisland' },
  } : null

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 transition-colors duration-300">
      {jsonLd && <JsonLd data={jsonLd} />}
      <Header />

      <main className="mx-auto max-w-3xl px-6 py-16">
        {article ? (
          <>
          <Breadcrumbs
            baseUrl={SITE_URL}
            items={[
              { label: 'Ana Sayfa', href: '/' },
              { label: 'Blog', href: '/blog' },
              { label: article.title },
            ]}
          />
          <article className="prose max-w-none dark:prose-invert">
            {category && (
              <span className="inline-flex items-center rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 px-2.5 py-0.5 text-xs font-semibold mb-4 not-prose">
                {category.name}
              </span>
            )}
            <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">{article.title}</h1>
            <div className="flex items-center justify-between not-prose mb-6">
              <p className="text-xs text-neutral-400">
                {article.author_name && <span className="font-semibold text-neutral-600 dark:text-neutral-300">{article.author_name}</span>}
                {article.author_name && article.published_at && ' · '}
                {article.published_at && new Date(article.published_at).toLocaleDateString('tr-TR')}
              </p>
              <ShareButtons url={`${SITE_URL}/blog/${slug}`} title={article.title} />
            </div>
            {article.content && (
              <MarkdownContent
                content={article.content}
                className="text-neutral-700 dark:text-neutral-300 leading-relaxed"
              />
            )}
          </article>
          </>
        ) : (
          <div className="text-center py-16">
            <span className="text-5xl">📝❌</span>
            <h1 className="mt-4 text-2xl font-bold text-neutral-900 dark:text-white">Yazı Bulunamadı</h1>
            <Link href="/blog" className="mt-6 inline-block rounded-xl bg-sky-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-sky-500 transition-colors">
              Bloga Dön
            </Link>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  )
}
