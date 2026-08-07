import { createClient } from '@/lib/supabase/server'
import { getRatingsMap } from '@/lib/ratings'
import { HotelsIndexClient } from '@/components/HotelsIndexClient'

export const metadata = {
  title: 'Yunan Adaları\'ndaki Tüm Oteller | Yunanisland',
  description: 'Yunan Adaları\'ndaki tüm otelleri tek yerden keşfedin — yıldıza, kategoriye, wifi/havuz gibi özelliklere göre filtreleyin.',
}

export default async function HotelsIndexPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams
  const supabase = await createClient()

  const { data: hotels } = await supabase
    .from('hotels')
    .select('*, islands!inner(name, slug, is_published)')
    .eq('islands.is_published', true)
    .order('name')

  const ratings = await getRatingsMap(supabase, 'hotel', (hotels ?? []).map((h) => h.id))
  const hotelsWithRatings = (hotels ?? []).map((h) => ({ ...h, ...ratings[h.id] }))

  return <HotelsIndexClient hotels={hotelsWithRatings} initialQuery={q ?? ''} />
}
