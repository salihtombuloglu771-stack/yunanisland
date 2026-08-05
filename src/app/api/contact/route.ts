import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { checkRateLimit } from '@/lib/rateLimit'

const NOTIFY_EMAIL = 'salihtombuloglu771@gmail.com'

export async function POST(request: Request) {
  const body = await request.json()
  const { name, email, subject, message, website } = body as {
    name: string
    email: string
    subject?: string
    message: string
    website?: string
  }

  // Honeypot: gizli alan, botlar doldurur gerçek kullanıcılar görmez —
  // doluysa spam sayıp veritabanına hiç yazmadan sessizce "başarılı" dönüyoruz.
  if (website) {
    return NextResponse.json({ success: true })
  }

  if (!name?.trim() || !email?.includes('@') || !message?.trim()) {
    return NextResponse.json({ error: 'Eksik veya geçersiz alan.' }, { status: 400 })
  }

  const supabase = await createClient()

  const allowed = await checkRateLimit(supabase, request, 'contact', 5, 3600)
  if (!allowed) {
    return NextResponse.json({ error: 'Çok fazla istek gönderildi, lütfen bir süre sonra tekrar dene.' }, { status: 429 })
  }
  const { error: insertError } = await supabase.from('contact_messages').insert({
    name: name.trim(),
    email: email.trim(),
    subject: subject?.trim() || null,
    message: message.trim(),
  })

  if (insertError) {
    return NextResponse.json({ error: 'Mesaj gönderilemedi.' }, { status: 500 })
  }

  if (process.env.RESEND_API_KEY) {
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Yunanisland <info@yunanisland.com>',
          to: [NOTIFY_EMAIL],
          subject: `Yeni İletişim Mesajı — ${subject || name}`,
          text: [
            `Ad: ${name}`,
            `E-posta: ${email}`,
            subject ? `Konu: ${subject}` : null,
            `Mesaj: ${message}`,
          ].filter(Boolean).join('\n'),
        }),
      })
    } catch {
      // E-posta gönderimi başarısız olsa bile mesaj zaten veritabanına kaydedildi.
    }
  }

  return NextResponse.json({ success: true })
}
