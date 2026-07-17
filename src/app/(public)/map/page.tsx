import { Header } from '@/components/Header'
import { MapPageClient } from '@/components/MapPageClient'
import { createClient } from '@/lib/supabase/server'
import type { MapPoint } from '@/components/IslandMap'

export default async function MapPage() {
  const supabase = await createClient()

  const [{ data: islands }, { data: beaches }, { data: restaurants }] = await Promise.all([
    supabase.from('islands').select('id, name, slug, latitude, longitude').eq('is_published', true),
    supabase.from('beaches').select('id, name, slug, latitude, longitude, islands(slug)'),
    supabase.from('restaurants').select('id, name, slug, latitude, longitude, islands(slug)'),
  ])

  const points: MapPoint[] = [
    ...(islands ?? [])
      .filter((i) => i.latitude && i.longitude)
      .map((i) => ({ id: i.id, type: 'island' as const, name: i.name, slug: i.slug, latitude: i.latitude!, longitude: i.longitude! })),
    ...(beaches ?? [])
      .filter((b) => b.latitude && b.longitude)
      .map((b) => {
        const island = Array.isArray(b.islands) ? b.islands[0] : b.islands
        return { id: b.id, type: 'beach' as const, name: b.name, slug: b.slug, islandSlug: island?.slug, latitude: b.latitude!, longitude: b.longitude! }
      }),
    ...(restaurants ?? [])
      .filter((r) => r.latitude && r.longitude)
      .map((r) => {
        const island = Array.isArray(r.islands) ? r.islands[0] : r.islands
        return { id: r.id, type: 'restaurant' as const, name: r.name, slug: r.slug, islandSlug: island?.slug, latitude: r.latitude!, longitude: r.longitude! }
      }),
  ]

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 transition-colors duration-300">
      <Header />

      <main className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">Etkileşimli Harita</h1>
        <p className="text-sm text-neutral-500 mb-6">
          Tüm adalar, plajlar ve restoranlar tek haritada. Bir işarete tıklayarak detaylara ulaşabilirsin.
        </p>
        <MapPageClient points={points} />
      </main>
    </div>
  )
}
