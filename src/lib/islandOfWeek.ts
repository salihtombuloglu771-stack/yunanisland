// Haftalık deterministik seçim: yeni bir tablo/kolon gerektirmeden, ISO hafta
// numarasına göre trend olan adalar arasından (yoksa tüm yayınlanmış adalar
// arasından) her hafta aynı sonucu üreten sabit bir "Haftanın Adası" seçer —
// bu sayede tüm ziyaretçiler aynı haftada aynı adayı görür, sunucu tarafında
// hesaplanır, ekstra state gerekmez.
export function getIsoWeekNumber(date: Date = new Date()): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7))
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7)
}

export function pickIslandOfWeek<T extends { slug: string }>(islands: T[], trendingSlugs: string[]): T | null {
  if (islands.length === 0) return null
  const trendingPool = islands.filter((i) => trendingSlugs.includes(i.slug))
  const pool = trendingPool.length > 0 ? trendingPool : islands
  const week = getIsoWeekNumber()
  return pool[week % pool.length]
}
