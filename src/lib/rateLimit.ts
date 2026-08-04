import type { SupabaseClient } from '@supabase/supabase-js'

export function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) return forwardedFor.split(',')[0].trim()
  return request.headers.get('x-real-ip') || 'unknown'
}

/**
 * IP+endpoint bazlı sabit-pencere rate limit kontrolü (bkz. migration 027).
 * Postgres tarafında atomik olarak sayılıyor, dış bir servise ihtiyaç yok.
 */
export async function checkRateLimit(
  supabase: SupabaseClient,
  request: Request,
  scope: string,
  limit: number,
  windowSeconds: number,
): Promise<boolean> {
  const ip = getClientIp(request)
  const { data, error } = await supabase.rpc('check_rate_limit', {
    p_key: `${scope}:${ip}`,
    p_limit: limit,
    p_window_seconds: windowSeconds,
  })

  // RPC başarısız olursa (beklenmedik bir durum) isteği engellemek yerine
  // geçirmeyi tercih ediyoruz — asıl amaç kötüye kullanımı yavaşlatmak,
  // altyapı sorununda gerçek kullanıcıları kilitlemek değil.
  if (error) return true

  return data === true
}
