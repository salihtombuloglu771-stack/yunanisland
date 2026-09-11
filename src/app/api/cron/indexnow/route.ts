import { NextRequest, NextResponse } from 'next/server'
import { submitToIndexNow } from '@/lib/indexnow'

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://yunanisland.vercel.app'

// Vercel Cron'un çağırdığı günlük IndexNow bildirimi — sitemap.xml'deki tüm
// URL'leri Bing/IndexNow'a gönderir, yeni/güncellenen içeriğin hızlı
// keşfedilmesi için (bkz. Bing Webmaster Tools "IndexNow kurulumu" önerisi).
export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const sitemapRes = await fetch(`${SITE_URL}/sitemap.xml`)
  const sitemapXml = await sitemapRes.text()
  const urls = [...sitemapXml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1])

  await submitToIndexNow(urls)

  return NextResponse.json({ success: true, count: urls.length })
}
