import type { SupabaseClient } from '@supabase/supabase-js'

export interface RatingInfo {
  avgRating: number | null
  reviewCount: number
}

export async function getRatingsMap(
  supabase: SupabaseClient,
  entityType: 'island' | 'beach' | 'restaurant' | 'hotel' | 'attraction',
  entityIds: string[]
): Promise<Record<string, RatingInfo>> {
  if (entityIds.length === 0) return {}

  const { data } = await supabase
    .from('reviews')
    .select('entity_id, rating')
    .eq('entity_type', entityType)
    .in('entity_id', entityIds)

  const map: Record<string, RatingInfo> = {}
  for (const id of entityIds) map[id] = { avgRating: null, reviewCount: 0 }

  for (const row of data ?? []) {
    const entry = map[row.entity_id] ?? { avgRating: null, reviewCount: 0 }
    const total = (entry.avgRating ?? 0) * entry.reviewCount + row.rating
    entry.reviewCount += 1
    entry.avgRating = total / entry.reviewCount
    map[row.entity_id] = entry
  }

  return map
}
