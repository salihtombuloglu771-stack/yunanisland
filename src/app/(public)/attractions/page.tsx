import { createClient } from '@/lib/supabase/server'
import { getRatingsMap } from '@/lib/ratings'
import { AttractionsIndexClient } from '@/components/AttractionsIndexClient'

export const metadata = {
  title: 'Yunan Adaları\'ndaki Tüm Gezilecek Yerler | Yunanisland',
  description: 'Yunan Adaları\'ndaki antik kalıntılar, manzara noktaları, müzeler ve daha fazlasını tek yerden keşfedin.',
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
  const attractionsWithRatings = (attractions ?? []).map((a) => ({ ...a, ...ratings[a.id] }))

  return <AttractionsIndexClient attractions={attractionsWithRatings} initialQuery={q ?? ''} />
}
