import { stripMarkdown } from '@/lib/markdown'

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://yunanisland.vercel.app'

const BASE_HASHTAGS = ['#YunanAdalari', '#Yunanistan', '#GreekIslands', '#GeziRehberi']

function toHashtag(name: string): string {
  const trMap: Record<string, string> = { ç: 'c', ğ: 'g', ı: 'i', ö: 'o', ş: 's', ü: 'u', İ: 'I' }
  const ascii = name.replace(/[çğıöşüİ]/g, (c) => trMap[c] ?? c)
  return '#' + ascii.replace(/[^a-zA-Z0-9]/g, '')
}

export function generateArticleCaption(article: {
  title: string
  slug: string
  content: string | null
  categoryName?: string | null
}): { instagram: string; twitter: string } {
  const url = `${SITE_URL}/blog/${article.slug}`
  const excerpt = article.content ? stripMarkdown(article.content).slice(0, 150).trim() : ''
  const hashtags = [...BASE_HASHTAGS]
  if (article.categoryName) hashtags.push(toHashtag(article.categoryName))

  const instagram = [
    `🏝️ ${article.title}`,
    excerpt ? `${excerpt}...` : '',
    '👉 Linki profildeki bio\'dan bulabilirsin!',
    hashtags.join(' '),
  ]
    .filter(Boolean)
    .join('\n\n')

  const twitterHashtags = hashtags.slice(0, 3).join(' ')
  const twitterFixedParts = `🏝️ ${article.title}\n\n\n\n${url}\n\n${twitterHashtags}`
  const remaining = 280 - twitterFixedParts.length
  const twitterExcerpt = remaining > 20 ? `${excerpt.slice(0, remaining - 3)}...` : ''
  const twitter = `🏝️ ${article.title}\n\n${twitterExcerpt}\n\n${url}\n\n${twitterHashtags}`

  return { instagram, twitter }
}
