import { NextRequest, NextResponse } from 'next/server'
import { createClient as createAdminClient } from '@supabase/supabase-js'
import { verifyUnsubscribeToken } from '@/lib/unsubscribeToken'

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get('email')
  const token = req.nextUrl.searchParams.get('token')
  if (!email || !token) return NextResponse.json({ error: 'E-posta ve token gerekli.' }, { status: 400 })

  // Token doğrulanmadan çıkış yapılırsa, e-posta adresini bilen herhangi biri
  // başkasını abonelikten çıkarabilir — imza mailde gönderilen token'la eşleşmeli.
  if (!verifyUnsubscribeToken(email, token)) {
    return NextResponse.json({ error: 'Geçersiz veya süresi dolmuş bağlantı.' }, { status: 403 })
  }

  const admin = createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )
  await admin.from('newsletter_subscribers').delete().eq('email', email.toLowerCase())

  return new NextResponse(
    '<html><body style="font-family:sans-serif;text-align:center;padding:60px"><h2>Abonelikten çıkıldı</h2><p>Artık Yunanisland bültenini almayacaksınız.</p></body></html>',
    { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
  )
}
