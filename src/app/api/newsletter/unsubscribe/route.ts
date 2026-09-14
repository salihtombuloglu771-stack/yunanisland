import { NextRequest, NextResponse } from 'next/server'
import { createClient as createAdminClient } from '@supabase/supabase-js'

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get('email')
  if (!email) return NextResponse.json({ error: 'E-posta gerekli.' }, { status: 400 })

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
