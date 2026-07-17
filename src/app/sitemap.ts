import type { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://yunanisland.vercel.app'
  const supabase = await createClient()

  const [{ data: islands }, { data: articles }] = await Promise.all([
    supabase.from('islands').select('slug').eq('is_published', true),
    supabase.from('articles').select('slug').eq('is_published', true),
  ])

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/ferry-guide`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/blog`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/budget-calculator`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/map`, changeFrequency: 'monthly', priority: 0.6 },
  ]

  const islandRoutes: MetadataRoute.Sitemap = (islands ?? []).map((i) => ({
    url: `${baseUrl}/islands/${i.slug}`,
    changeFrequency: 'weekly',
    priority: 0.9,
  }))

  const articleRoutes: MetadataRoute.Sitemap = (articles ?? []).map((a) => ({
    url: `${baseUrl}/blog/${a.slug}`,
    changeFrequency: 'monthly',
    priority: 0.5,
  }))

  return [...staticRoutes, ...islandRoutes, ...articleRoutes]
}
