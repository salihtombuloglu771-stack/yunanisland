import { createClient } from '@/lib/supabase/server'
import { stripMarkdown } from '@/lib/markdown'

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://yunanisland.vercel.app'

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET() {
  const supabase = await createClient()
  const { data: articles } = await supabase
    .from('articles')
    .select('title, slug, content, published_at, categories(name)')
    .eq('is_published', true)
    .order('published_at', { ascending: false })
    .limit(50)

  const items = (articles ?? []).map((a) => {
    const category = Array.isArray(a.categories) ? a.categories[0] : a.categories
    const description = a.content ? stripMarkdown(a.content).slice(0, 300) : ''
    const pubDate = a.published_at ? new Date(a.published_at).toUTCString() : new Date().toUTCString()
    const url = `${SITE_URL}/blog/${a.slug}`

    return `
    <item>
      <title>${escapeXml(a.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      ${category?.name ? `<category>${escapeXml(category.name)}</category>` : ''}
      <description>${escapeXml(description)}</description>
    </item>`
  }).join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Yunanisland Gezi Blogu</title>
    <link>${SITE_URL}/blog</link>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <description>Yunan Adaları hakkında gezi rehberleri, ipuçları ve gezi hikayeleri.</description>
    <language>tr</language>${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
