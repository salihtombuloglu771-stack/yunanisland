import { GeziHikayeleriListClient } from '@/components/GeziHikayeleriListClient'
import { createClient } from '@/lib/supabase/server'

export default async function TravelStoriesPage() {
  const supabase = await createClient()
  const { data: stories } = await supabase
    .from('travel_stories')
    .select('id, title, content, cover_image_url, created_at, users(full_name), islands(name, slug)')
    .eq('is_published', true)
    .order('created_at', { ascending: false })

  return <GeziHikayeleriListClient stories={stories ?? []} />
}
