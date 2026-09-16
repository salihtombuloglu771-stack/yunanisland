import { NextRequest, NextResponse } from 'next/server'
import { createClient as createAdminClient } from '@supabase/supabase-js'
import { generateUnsubscribeToken } from '@/lib/unsubscribeToken'

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://yunanisland.vercel.app'

// Vercel Cron'un haftalık çağırdığı bülten otomasyonu — son 7 günde
// yayınlanan yeni blog yazılarını, kayıtlı abonelere e-posta ile
// duyurur. Yeni yazı yoksa hiç mail göndermez (spam olmasın diye).
export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const admin = createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )

  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()

  const { data: newArticles } = await admin
    .from('articles')
    .select('title, slug, published_at')
    .eq('is_published', true)
    .gte('published_at', oneWeekAgo)
    .order('published_at', { ascending: false })

  if (!newArticles || newArticles.length === 0) {
    return NextResponse.json({ success: true, sent: false, reason: 'no new content' })
  }

  const { data: subscribers } = await admin.from('newsletter_subscribers').select('email')
  const emails = (subscribers ?? []).map((s) => s.email)
  if (emails.length === 0) {
    return NextResponse.json({ success: true, sent: false, reason: 'no subscribers' })
  }

  const itemsHtml = newArticles
    .map((a) => `<li><a href="${SITE_URL}/blog/${a.slug}">${a.title}</a></li>`)
    .join('')

  let sentCount = 0
  for (const email of emails) {
    const unsubscribeUrl = `${SITE_URL}/api/newsletter/unsubscribe?email=${encodeURIComponent(email)}&token=${generateUnsubscribeToken(email)}`
    const html = `
      <h2>Yunanisland'da Bu Hafta Yeni</h2>
      <p>Yunan Adaları hakkında yeni yazılarımızı kaçırma:</p>
      <ul>${itemsHtml}</ul>
      <p><a href="${SITE_URL}/blog">Tüm yazıları gör →</a></p>
      <p style="margin-top:24px;font-size:11px;color:#888">
        Bu e-postaları almak istemiyorsan <a href="${unsubscribeUrl}">abonelikten çık</a>.
      </p>
    `

    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Yunanisland <info@yunanisland.com>',
          to: email,
          subject: `Yunanisland'da Bu Hafta: ${newArticles.length} Yeni Yazı`,
          html,
        }),
      })
      if (res.ok) sentCount += 1
    } catch {
      // Tek bir abonenin gönderimi başarısız olsa bile diğerlerine devam et.
    }
  }

  return NextResponse.json({ success: true, sent: true, articlesCount: newArticles.length, subscribersNotified: sentCount, totalSubscribers: emails.length })
}
