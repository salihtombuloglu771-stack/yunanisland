import { redirect } from 'next/navigation'
import { AccountClient, type BadgeState, type NoteItem, type FavoriteItem } from '@/components/AccountClient'
import { createClient } from '@/lib/supabase/server'

const BADGE_DEFS = [
  { id: 'first-step', icon: '🐣', check: (s: Stats) => s.favoritesCount >= 1 },
  { id: 'explorer', icon: '🧭', check: (s: Stats) => s.favoritesCount >= 5 },
  { id: 'reviewer', icon: '⭐', check: (s: Stats) => s.reviewsCount >= 1 },
  { id: 'planner', icon: '📝', check: (s: Stats) => s.notesCount >= 1 },
  { id: 'storyteller', icon: '✍️', check: (s: Stats) => s.storiesCount >= 1 },
  { id: 'traveler', icon: '🌍', check: (s: Stats) => s.islandsTouched >= 3 },
] as const

interface Stats {
  favoritesCount: number
  reviewsCount: number
  notesCount: number
  storiesCount: number
  islandsTouched: number
}

export default async function AccountPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login?next=/account')
  }

  const { data: profile } = await supabase.from('users').select('full_name, email').eq('id', user.id).single()
  const { data: favorites } = await supabase
    .from('favorites')
    .select('entity_type, entity_id')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  const { data: tripNotes } = await supabase
    .from('trip_notes')
    .select('id, entity_type, entity_id, note, visited_at')
    .eq('user_id', user.id)
    .order('updated_at', { ascending: false })

  const [{ count: reviewsCount }, { count: storiesCount }] = await Promise.all([
    supabase.from('reviews').select('id', { count: 'exact', head: true }).eq('user_id', user.id),
    supabase.from('travel_stories').select('id', { count: 'exact', head: true }).eq('user_id', user.id),
  ])

  const islandIds = (favorites ?? []).filter(f => f.entity_type === 'island').map(f => f.entity_id)
  const beachIds = (favorites ?? []).filter(f => f.entity_type === 'beach').map(f => f.entity_id)
  const restaurantIds = (favorites ?? []).filter(f => f.entity_type === 'restaurant').map(f => f.entity_id)

  const noteIdsByType = {
    island: (tripNotes ?? []).filter(n => n.entity_type === 'island').map(n => n.entity_id),
    beach: (tripNotes ?? []).filter(n => n.entity_type === 'beach').map(n => n.entity_id),
    restaurant: (tripNotes ?? []).filter(n => n.entity_type === 'restaurant').map(n => n.entity_id),
    hotel: (tripNotes ?? []).filter(n => n.entity_type === 'hotel').map(n => n.entity_id),
    attraction: (tripNotes ?? []).filter(n => n.entity_type === 'attraction').map(n => n.entity_id),
  }
  const [{ data: islands }, { data: beaches }, { data: restaurants }] = await Promise.all([
    islandIds.length ? supabase.from('islands').select('id, name, slug').in('id', islandIds) : Promise.resolve({ data: [] }),
    beachIds.length ? supabase.from('beaches').select('id, name, slug, islands(slug)').in('id', beachIds) : Promise.resolve({ data: [] }),
    restaurantIds.length ? supabase.from('restaurants').select('id, name, slug, islands(slug)').in('id', restaurantIds) : Promise.resolve({ data: [] }),
  ])

  const [{ data: noteIslands }, { data: noteBeaches }, { data: noteRestaurants }, { data: noteHotels }, { data: noteAttractions }] = await Promise.all([
    noteIdsByType.island.length ? supabase.from('islands').select('id, name, slug').in('id', noteIdsByType.island) : Promise.resolve({ data: [] }),
    noteIdsByType.beach.length ? supabase.from('beaches').select('id, name, slug').in('id', noteIdsByType.beach) : Promise.resolve({ data: [] }),
    noteIdsByType.restaurant.length ? supabase.from('restaurants').select('id, name, slug').in('id', noteIdsByType.restaurant) : Promise.resolve({ data: [] }),
    noteIdsByType.hotel.length ? supabase.from('hotels').select('id, name, slug').in('id', noteIdsByType.hotel) : Promise.resolve({ data: [] }),
    noteIdsByType.attraction.length ? supabase.from('attractions').select('id, name, slug').in('id', noteIdsByType.attraction) : Promise.resolve({ data: [] }),
  ])

  type NoteEntity = { id: string; name: string; href: string; icon: string }
  const entityMap = new Map<string, NoteEntity>()
  for (const i of islands ?? []) entityMap.set(i.id, { id: i.id, name: i.name, href: `/islands/${i.slug}`, icon: '🏝️' })
  for (const i of noteIslands ?? []) entityMap.set(i.id, { id: i.id, name: i.name, href: `/islands/${i.slug}`, icon: '🏝️' })
  for (const b of noteBeaches ?? []) {
    entityMap.set(b.id, { id: b.id, name: b.name, href: `/beaches/${b.slug}`, icon: '🏖️' })
  }
  for (const r of noteRestaurants ?? []) entityMap.set(r.id, { id: r.id, name: r.name, href: `/restaurants/${r.slug}`, icon: '🍽️' })
  for (const h of noteHotels ?? []) entityMap.set(h.id, { id: h.id, name: h.name, href: `/hotels/${h.slug}`, icon: '🏨' })
  for (const a of noteAttractions ?? []) entityMap.set(a.id, { id: a.id, name: a.name, href: `/attractions/${a.slug}`, icon: '📍' })

  const stats: Stats = {
    favoritesCount: (favorites ?? []).length,
    reviewsCount: reviewsCount ?? 0,
    notesCount: (tripNotes ?? []).length,
    storiesCount: storiesCount ?? 0,
    islandsTouched: new Set([...islandIds, ...noteIdsByType.island]).size,
  }

  const badges: BadgeState[] = BADGE_DEFS.map((badge) => ({
    id: badge.id,
    icon: badge.icon,
    unlocked: badge.check(stats),
  }))

  const notes: NoteItem[] = (tripNotes ?? []).map((n) => {
    const entity = entityMap.get(n.entity_id)
    return {
      id: n.id,
      note: n.note,
      visitedAt: n.visited_at,
      entityName: entity?.name ?? null,
      entityHref: entity?.href ?? '#',
      entityIcon: entity?.icon ?? '📍',
    }
  })

  const islandFavorites: FavoriteItem[] = (islands ?? []).map((i) => ({ id: i.id, name: i.name, href: `/islands/${i.slug}` }))
  const beachFavorites: FavoriteItem[] = (beaches ?? []).map((b) => {
    const island = Array.isArray(b.islands) ? b.islands[0] : b.islands
    return { id: b.id, name: b.name, href: `/islands/${island?.slug ?? ''}` }
  })
  const restaurantFavorites: FavoriteItem[] = (restaurants ?? []).map((r) => {
    const island = Array.isArray(r.islands) ? r.islands[0] : r.islands
    return { id: r.id, name: r.name, href: `/islands/${island?.slug ?? ''}` }
  })

  return (
    <AccountClient
      displayName={profile?.full_name || user.email || ''}
      badges={badges}
      storiesCount={stats.storiesCount}
      notes={notes}
      islandFavorites={islandFavorites}
      beachFavorites={beachFavorites}
      restaurantFavorites={restaurantFavorites}
    />
  )
}
