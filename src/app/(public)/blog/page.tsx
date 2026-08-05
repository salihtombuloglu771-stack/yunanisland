import { BlogPageClient } from '@/components/BlogPageClient'
import { AdBanner } from '@/components/AdBanner'
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

  return <BlogPageClient articles={normalizedArticles} adBanner={<AdBanner placement="blog" />} />
}
