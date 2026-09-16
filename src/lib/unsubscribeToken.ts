import { createHmac, timingSafeEqual } from 'crypto'

// Abonelikten çıkma linkinin sahtesinin üretilememesi için CRON_SECRET ile
// imzalanıyor — aksi halde ?email=başkasının-adresi ile herkes başkasını
// abonelikten çıkarabilirdi.
function sign(email: string): string {
  return createHmac('sha256', process.env.CRON_SECRET!).update(email.toLowerCase()).digest('hex')
}

export function generateUnsubscribeToken(email: string): string {
  return sign(email)
}

export function verifyUnsubscribeToken(email: string, token: string): boolean {
  const expected = sign(email)
  const expectedBuf = Buffer.from(expected)
  const tokenBuf = Buffer.from(token)
  if (expectedBuf.length !== tokenBuf.length) return false
  return timingSafeEqual(expectedBuf, tokenBuf)
}
