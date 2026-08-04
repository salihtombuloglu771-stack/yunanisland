import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Header } from '@/components/Header'
import { MfaEnrollment } from '@/components/MfaEnrollment'
import { createClient } from '@/lib/supabase/server'

const BADGES = [
  { id: 'first-step', icon: '🐣', label: 'İlk Adım', desc: 'İlk favorini ekle', check: (s: Stats) => s.favoritesCount >= 1 },
  { id: 'explorer', icon: '🧭', label: 'Kaşif', desc: '5+ favori ekle', check: (s: Stats) => s.favoritesCount >= 5 },
  { id: 'reviewer', icon: '⭐', label: 'Değerlendirici', desc: 'İlk yorumunu yaz', check: (s: Stats) => s.reviewsCount >= 1 },
  { id: 'planner', icon: '📝', label: 'Planlayıcı', desc: 'İlk seyahat notunu ekle', check: (s: Stats) => s.notesCount >= 1 },
  { id: 'storyteller', icon: '✍️', label: 'Anlatıcı', desc: 'İlk gezi hikayeni paylaş', check: (s: Stats) => s.storiesCount >= 1 },
  { id: 'traveler', icon: '🌍', label: 'Gezgin', desc: '3+ farklı adayla etkileşime geç', check: (s: Stats) => s.islandsTouched >= 3 },
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

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 transition-colors duration-300">
      <Header />

      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Hesabım</h1>
        <p className="mt-2 text-sm text-neutral-500">
          {profile?.full_name || user.email} olarak giriş yaptın.
        </p>

        <section className="mt-10">
          <h2 className="text-lg font-bold text-neutral-900 dark:text-white mb-4">🔐 Güvenlik</h2>
          <MfaEnrollment />
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-bold text-neutral-900 dark:text-white mb-4">🏅 Rozetler</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {BADGES.map((badge) => {
              const unlocked = badge.check(stats)
              return (
                <div
                  key={badge.id}
                  className={`p-4 rounded-xl border text-center transition-all ${
                    unlocked
                      ? 'bg-white dark:bg-neutral-900 border-amber-300/60 dark:border-amber-500/30 shadow-sm'
                      : 'bg-slate-100/60 dark:bg-neutral-900/40 border-slate-200 dark:border-neutral-800 opacity-50'
                  }`}
                >
                  <div className="text-2xl">{unlocked ? badge.icon : '🔒'}</div>
                  <p className="mt-1 text-xs font-bold text-neutral-800 dark:text-neutral-200">{badge.label}</p>
                  <p className="mt-0.5 text-[11px] text-neutral-500">{badge.desc}</p>
                </div>
              )
            })}
          </div>
        </section>

        <section className="mt-10 flex items-center justify-between">
          <h2 className="text-lg font-bold text-neutral-900 dark:text-white">✍️ Gezi Hikayelerim</h2>
          <Link href="/gezi-hikayeleri/yeni" className="text-xs font-semibold text-sky-600 hover:underline">+ Yeni Hikaye</Link>
        </section>
        <p className="mt-2 text-sm text-neutral-500">
          {stats.storiesCount > 0 ? `${stats.storiesCount} hikaye paylaştın.` : 'Henüz hikaye paylaşmadın.'}{' '}
          <Link href="/gezi-hikayeleri" className="text-sky-600 hover:underline">Tüm hikayeleri gör</Link>
        </p>

        <section className="mt-10">
          <h2 className="text-lg font-bold text-neutral-900 dark:text-white mb-4">📝 Seyahat Notlarım</h2>
          {tripNotes && tripNotes.length > 0 ? (
            <div className="space-y-3">
              {tripNotes.map((n) => {
                const entity = entityMap.get(n.entity_id)
                return (
                  <Link
                    key={n.id}
                    href={entity?.href ?? '#'}
                    className="block bg-white dark:bg-neutral-900 p-4 rounded-xl border border-slate-100 dark:border-neutral-900 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-neutral-800 dark:text-neutral-200 text-sm">
                        {entity?.icon ?? '📍'} {entity?.name ?? 'Bilinmeyen yer'}
                      </span>
                      {n.visited_at && (
                        <span className="text-xs text-neutral-400">{new Date(n.visited_at).toLocaleDateString('tr-TR')}</span>
                      )}
                    </div>
                    {n.note && <p className="mt-1.5 text-xs text-neutral-500 line-clamp-2">{n.note}</p>}
                  </Link>
                )
              })}
            </div>
          ) : (
            <p className="text-sm text-neutral-500">Henüz seyahat notu eklemedin. Bir ada/plaj/restoran/otel sayfasında &quot;Kişisel Seyahat Notu&quot; kutusundan ekleyebilirsin.</p>
          )}
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-bold text-neutral-900 dark:text-white mb-4">❤️ Favori Adalar</h2>
          {islands && islands.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {islands.map((i) => (
                <Link key={i.id} href={`/islands/${i.slug}`} className="bg-white dark:bg-neutral-900 p-4 rounded-xl border border-slate-100 dark:border-neutral-900 hover:shadow-md transition-all font-semibold text-neutral-800 dark:text-neutral-200">
                  🏝️ {i.name}
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-sm text-neutral-500">Henüz favori ada eklemedin.</p>
          )}
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-bold text-neutral-900 dark:text-white mb-4">🏖️ Favori Plajlar</h2>
          {beaches && beaches.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {beaches.map((b) => {
                const island = Array.isArray(b.islands) ? b.islands[0] : b.islands
                return (
                  <Link key={b.id} href={`/islands/${island?.slug}`} className="bg-white dark:bg-neutral-900 p-4 rounded-xl border border-slate-100 dark:border-neutral-900 hover:shadow-md transition-all font-semibold text-neutral-800 dark:text-neutral-200">
                    🏖️ {b.name}
                  </Link>
                )
              })}
            </div>
          ) : (
            <p className="text-sm text-neutral-500">Henüz favori plaj eklemedin.</p>
          )}
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-bold text-neutral-900 dark:text-white mb-4">🍽️ Favori Restoranlar</h2>
          {restaurants && restaurants.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {restaurants.map((r) => {
                const island = Array.isArray(r.islands) ? r.islands[0] : r.islands
                return (
                  <Link key={r.id} href={`/islands/${island?.slug}`} className="bg-white dark:bg-neutral-900 p-4 rounded-xl border border-slate-100 dark:border-neutral-900 hover:shadow-md transition-all font-semibold text-neutral-800 dark:text-neutral-200">
                    🍽️ {r.name}
                  </Link>
                )
              })}
            </div>
          ) : (
            <p className="text-sm text-neutral-500">Henüz favori restoran eklemedin.</p>
          )}
        </section>
      </main>
    </div>
  )
}
