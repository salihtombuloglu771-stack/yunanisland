import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const NOTIFY_EMAIL = 'salihtombuloglu771@gmail.com'

export async function POST(request: Request) {
  const body = await request.json()
  const { companyName, contactName, email, phone, placementInterest, budgetRange, message, website } = body as {
    companyName: string
    contactName: string
    email: string
    phone?: string
    placementInterest?: string
    budgetRange?: string
    message?: string
    website?: string
  }

  // Honeypot: gizli alan, botlar doldurur gerçek kullanıcılar görmez —
  // doluysa spam sayıp veritabanına hiç yazmadan sessizce "başarılı" dönüyoruz.
  if (website) {
    return NextResponse.json({ success: true })
  }

  if (!companyName?.trim() || !contactName?.trim() || !email?.includes('@')) {
    return NextResponse.json({ error: 'Eksik veya geçersiz alan.' }, { status: 400 })
  }

  const supabase = await createClient()
  const { error: insertError } = await supabase.from('ad_inquiries').insert({
    company_name: companyName.trim(),
    contact_name: contactName.trim(),
    email: email.trim(),
    phone: phone?.trim() || null,
    placement_interest: placementInterest || null,
    budget_range: budgetRange?.trim() || null,
    message: message?.trim() || null,
  })

  if (insertError) {
    return NextResponse.json({ error: 'Kayıt oluşturulamadı.' }, { status: 500 })
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
          from: 'Yunanisland <onboarding@resend.dev>',
          to: [NOTIFY_EMAIL],
          subject: `Yeni Reklam Talebi — ${companyName}`,
          text: [
            `Firma: ${companyName}`,
            `Yetkili: ${contactName}`,
            `E-posta: ${email}`,
            phone ? `Telefon: ${phone}` : null,
            placementInterest ? `İlgilendiği Alan: ${placementInterest}` : null,
            budgetRange ? `Bütçe: ${budgetRange}` : null,
            message ? `Mesaj: ${message}` : null,
          ].filter(Boolean).join('\n'),
        }),
      })
    } catch {
      // E-posta gönderimi başarısız olsa bile talep zaten veritabanına kaydedildi, admin panelinden görülebilir.
    }
  }

  return NextResponse.json({ success: true })
}
