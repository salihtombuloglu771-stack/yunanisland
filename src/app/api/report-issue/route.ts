import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { checkRateLimit } from '@/lib/rateLimit'

type EntityType = 'island' | 'beach' | 'restaurant' | 'hotel' | 'attraction'

export async function POST(request: Request) {
  const body = await request.json()
  const { entityType, entityId, message, email, website } = body as {
    entityType: EntityType
    entityId: string
    message: string
    email?: string
    website?: string
  }

  // Honeypot: gizli alan, botlar doldurur gerçek kullanıcılar görmez.
  if (website) {
    return NextResponse.json({ success: true })
  }

  if (!entityType || !entityId || !message?.trim()) {
    return NextResponse.json({ error: 'Eksik veya geçersiz alan.' }, { status: 400 })
  }

  const supabase = await createClient()

  const allowed = await checkRateLimit(supabase, request, 'report-issue', 5, 3600)
  if (!allowed) {
    return NextResponse.json({ error: 'Çok fazla istek gönderildi, lütfen bir süre sonra tekrar dene.' }, { status: 429 })
  }

  const { error: insertError } = await supabase.from('content_reports').insert({
    entity_type: entityType,
    entity_id: entityId,
    message: message.trim(),
    reporter_email: email?.trim() || null,
  })

  if (insertError) {
    return NextResponse.json({ error: 'Bildirim gönderilemedi.' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
