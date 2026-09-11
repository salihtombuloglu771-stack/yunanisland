import { createClient } from '@/lib/supabase/server'
import { getRatingsMap } from '@/lib/ratings'
import { RestaurantsIndexClient } from '@/components/RestaurantsIndexClient'

export const metadata = {
  title: 'Yunan Adaları\'ndaki Tüm Restoranlar | Yunanisland',
  description: 'Yunan Adaları\'ndaki tüm restoranları tek yerden keşfedin — fiyat seviyesine, deniz manzarasına, vegan seçeneklere göre filtreleyin.',
  alternates: { canonical: '/restaurants' },
}

export default async function RestaurantsIndexPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams
  const supabase = await createClient()

  const { data: restaurants } = await supabase
    .from('restaurants')
    .select('*, islands!inner(name, slug, is_published)')
    .eq('islands.is_published', true)
    .order('name')

  const ratings = await getRatingsMap(supabase, 'restaurant', (restaurants ?? []).map((r) => r.id))

  const { data: trending } = await supabase.rpc('get_trending_entities', { p_path_prefix: 'restaurants', days_back: 30, limit_count: 3 })
  const trendingSlugs = new Set((trending ?? []).map((t: { slug: string }) => t.slug))

  const restaurantsWithRatings = (restaurants ?? []).map((r) => ({ ...r, ...ratings[r.id], isTrending: trendingSlugs.has(r.slug) }))

  return <RestaurantsIndexClient restaurants={restaurantsWithRatings} initialQuery={q ?? ''} />
}
