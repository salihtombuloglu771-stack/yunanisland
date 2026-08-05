import type { Metadata } from 'next'
import { TravelStoryDetailClient } from '@/components/TravelStoryDetailClient'
import { createClient } from '@/lib/supabase/server'

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://yunanisland.vercel.app'

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const supabase = await createClient()
  const { data: story } = await supabase.from('travel_stories').select('title, content').eq('id', id).maybeSingle()

  if (!story) return { title: 'Hikaye Bulunamadı — Yunanisland' }

  return {
    title: `${story.title} — Gezi Hikayeleri — Yunanisland`,
    description: story.content.slice(0, 160),
  }
}

export default async function TravelStoryPage({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data: story } = await supabase
    .from('travel_stories')
    .select('id, title, content, cover_image_url, created_at, users(full_name), islands(name, slug)')
    .eq('id', id)
    .eq('is_published', true)
    .maybeSingle()

  return <TravelStoryDetailClient story={story} id={id} siteUrl={SITE_URL} />
}
