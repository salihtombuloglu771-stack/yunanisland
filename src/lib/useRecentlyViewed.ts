export interface RecentItem {
  type: 'island' | 'beach' | 'restaurant' | 'hotel' | 'attraction'
  id: string
  name: string
  slug: string
}

const STORAGE_KEY = 'yunanisland-recently-viewed'
const MAX_ITEMS = 8

const TYPE_HREF: Record<RecentItem['type'], (slug: string) => string> = {
  island: (slug) => `/islands/${slug}`,
  beach: (slug) => `/beaches/${slug}`,
  restaurant: (slug) => `/restaurants/${slug}`,
  hotel: (slug) => `/hotels/${slug}`,
  attraction: (slug) => `/attractions/${slug}`,
}

export const RECENT_TYPE_EMOJI: Record<RecentItem['type'], string> = {
  island: '🏝️',
  beach: '🏖️',
  restaurant: '🍽️',
  hotel: '🏨',
  attraction: '📍',
}

export function recentItemHref(item: RecentItem): string {
  return TYPE_HREF[item.type](item.slug)
}

export function getRecentlyViewed(): RecentItem[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function addRecentlyViewed(item: RecentItem) {
  if (typeof window === 'undefined') return
  try {
    const current = getRecentlyViewed().filter((i) => !(i.type === item.type && i.id === item.id))
    const next = [item, ...current].slice(0, MAX_ITEMS)
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {
    /* localStorage unavailable, ignore */
  }
}
