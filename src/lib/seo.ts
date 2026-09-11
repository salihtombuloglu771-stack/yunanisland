export function ensureMinLength(text: string | null | undefined, filler: string, min = 120): string {
  const base = (text ?? '').trim()
  if (base.length >= min) return base
  if (!base) return filler
  return `${base} ${filler}`
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
  'mid-range': 'orta segment',
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
