import { createClient } from '@/lib/supabase/server'
import { getRatingsMap } from '@/lib/ratings'
import { BeachesIndexClient } from '@/components/BeachesIndexClient'

export const metadata = {
  title: 'Yunan Adaları\'ndaki Tüm Plajlar | Yunanisland',
  description: 'Yunan Adaları\'ndaki tüm plajları tek yerden keşfedin — tipe, aile dostu, mavi bayrak gibi özelliklere göre filtreleyin.',
}

export default async function BeachesIndexPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams
  const supabase = await createClient()

  const { data: beaches } = await supabase
    .from('beaches')
    .select('*, islands!inner(name, slug, is_published)')
    .eq('islands.is_published', true)
    .order('name')

  const ratings = await getRatingsMap(supabase, 'beach', (beaches ?? []).map((b) => b.id))

  const { data: trending } = await supabase.rpc('get_trending_entities', { p_path_prefix: 'beaches', days_back: 30, limit_count: 3 })
  const trendingSlugs = new Set((trending ?? []).map((t: { slug: string }) => t.slug))

  const beachesWithRatings = (beaches ?? []).map((b) => ({ ...b, ...ratings[b.id], isTrending: trendingSlugs.has(b.slug) }))

  return <BeachesIndexClient beaches={beachesWithRatings} initialQuery={q ?? ''} />
}
