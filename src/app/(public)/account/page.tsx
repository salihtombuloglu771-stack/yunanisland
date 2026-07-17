import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Header } from '@/components/Header'
import { createClient } from '@/lib/supabase/server'

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

  const islandIds = (favorites ?? []).filter(f => f.entity_type === 'island').map(f => f.entity_id)
  const beachIds = (favorites ?? []).filter(f => f.entity_type === 'beach').map(f => f.entity_id)
  const restaurantIds = (favorites ?? []).filter(f => f.entity_type === 'restaurant').map(f => f.entity_id)

  const [{ data: islands }, { data: beaches }, { data: restaurants }] = await Promise.all([
    islandIds.length ? supabase.from('islands').select('id, name, slug').in('id', islandIds) : Promise.resolve({ data: [] }),
    beachIds.length ? supabase.from('beaches').select('id, name, slug, islands(slug)').in('id', beachIds) : Promise.resolve({ data: [] }),
    restaurantIds.length ? supabase.from('restaurants').select('id, name, slug, islands(slug)').in('id', restaurantIds) : Promise.resolve({ data: [] }),
  ])

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 transition-colors duration-300">
      <Header />

      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Hesabım</h1>
        <p className="mt-2 text-sm text-neutral-500">
          {profile?.full_name || user.email} olarak giriş yaptın.
        </p>

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
