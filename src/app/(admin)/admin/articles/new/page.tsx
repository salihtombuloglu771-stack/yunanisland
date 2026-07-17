import { ArticleForm } from '@/components/admin/ArticleForm'
import { createClient } from '@/lib/supabase/server'

export default async function NewArticlePage() {
  const supabase = await createClient()
  const { data: categories } = await supabase.from('categories').select('id, name').order('name')

  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-8">Yeni Blog Yazısı</h1>
      <ArticleForm categories={categories ?? []} />
    </main>
  )
}
