import { createClient } from '@/lib/supabase/server'
import { getRatingsMap } from '@/lib/ratings'
import { AttractionsIndexClient } from '@/components/AttractionsIndexClient'

export const metadata = {
  title: 'Yunan Adaları\'ndaki Tüm Gezilecek Yerler | Yunanisland',
  description: 'Yunan Adaları\'ndaki antik kalıntılar, manzara noktaları, müzeler ve daha fazlasını tek yerden keşfedin.',
  alternates: { canonical: '/attractions' },
}

export default async function AttractionsIndexPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams
  const supabase = await createClient()

  const { data: attractions } = await supabase
    .from('attractions')
    .select('*, islands!inner(name, slug, is_published)')
    .eq('islands.is_published', true)
    .order('name')

  const ratings = await getRatingsMap(supabase, 'attraction', (attractions ?? []).map((a) => a.id))

  const { data: trending } = await supabase.rpc('get_trending_entities', { p_path_prefix: 'attractions', days_back: 30, limit_count: 3 })
  const trendingSlugs = new Set((trending ?? []).map((t: { slug: string }) => t.slug))

  const attractionsWithRatings = (attractions ?? []).map((a) => ({ ...a, ...ratings[a.id], isTrending: trendingSlugs.has(a.slug) }))

  return <AttractionsIndexClient attractions={attractionsWithRatings} initialQuery={q ?? ''} />
}
