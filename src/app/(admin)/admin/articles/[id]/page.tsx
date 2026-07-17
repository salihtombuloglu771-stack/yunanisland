import { notFound } from 'next/navigation'
import { ArticleForm } from '@/components/admin/ArticleForm'
import { createClient } from '@/lib/supabase/server'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function EditArticlePage({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()

  const [{ data: article }, { data: categories }] = await Promise.all([
    supabase.from('articles').select('*').eq('id', id).maybeSingle(),
    supabase.from('categories').select('id, name').order('name'),
  ])

  if (!article) notFound()

  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-8">{article.title} Düzenle</h1>
      <ArticleForm
        categories={categories ?? []}
        initial={{
          id: article.id,
          title: article.title,
          slug: article.slug,
          content: article.content ?? '',
          category_id: article.category_id ?? '',
          is_published: article.is_published,
        }}
      />
    </main>
  )
}
