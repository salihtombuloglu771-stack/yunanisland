export function ensureMinLength(text: string | null | undefined, filler: string, min = 120): string {
  const base = (text ?? '').trim()
  if (base.length >= min) return base
  if (!base) return filler
  return `${base} ${filler}`
}

// Adds a Turkish category suffix to a title unless the name already conveys
// the category itself (e.g. "Alea Restaurant", "Super Paradise Beach") —
// avoids redundant titles like "Alea Restaurant Restoranı".
export function titleWithSuffix(name: string, suffix: string, skipPattern: RegExp): string {
  return skipPattern.test(name) ? name : `${name} ${suffix}`
}

export const BEACH_TYPE_TR: Record<string, string> = {
  sand: 'kumsal',
  pebble: 'çakıllı',
  mixed: 'karışık (kum-çakıl)',
}

export const RESTAURANT_PRICE_TR: Record<string, string> = {
  budget: 'uygun fiyatlı',
  mid: 'orta segment',
  expensive: 'lüks/pahalı',
}

export const HOTEL_CATEGORY_TR: Record<string, string> = {
  budget: 'ekonomik',
  'mid-range': 'orta',
  luxury: 'lüks',
}

export const ATTRACTION_CATEGORY_TR: Record<string, string> = {
  archaeological: 'arkeolojik alan',
  nature: 'doğa noktası',
  landmark: 'simge yapı',
  castle: 'kale',
  museum: 'müze',
  church: 'kilise',
  viewpoint: 'manzara noktası',
  village: 'köy',
}
