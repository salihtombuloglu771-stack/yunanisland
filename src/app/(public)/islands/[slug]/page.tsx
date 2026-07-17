import Link from 'next/link'
import type { Metadata } from 'next'
import { Header } from '@/components/Header'
import { IslandDetailClient } from '@/components/IslandDetailClient'
import { createClient } from '@/lib/supabase/server'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data: island } = await supabase.from('islands').select('name, description, cover_image_url').eq('slug', slug).maybeSingle()

  if (!island) return { title: 'Ada Bulunamadı — Yunanisland' }

  return {
    title: `${island.name} — Yunanisland`,
    description: island.description ?? `${island.name} adası hakkında gezi rehberi.`,
    openGraph: {
      title: `${island.name} — Yunanisland`,
      description: island.description ?? undefined,
      images: island.cover_image_url ? [island.cover_image_url] : undefined,
    },
  }
}

export default async function IslandPage({ params }: PageProps) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: island } = await supabase
    .from('islands')
    .select('*')
    .eq('slug', slug)
    .maybeSingle()

  if (!island) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-neutral-950">
        <Header />
        <div className="flex flex-col items-center justify-center p-6 py-24 text-center">
          <span className="text-6xl mb-4">🏝️❌</span>
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">Ada Bulunamadı</h1>
          <p className="mt-2 text-neutral-500 max-w-sm">
            Aradığınız &quot;{slug}&quot; adası sistemimizde mevcut değil veya henüz yayınlanmamış.
          </p>
          <Link href="/" className="mt-6 rounded-xl bg-sky-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-sky-500 transition-colors">
            Geri Dön
          </Link>
        </div>
      </div>
    )
  }

  const [{ data: allBeaches }, { data: allRestaurants }, { data: allHotels }, { data: media }] = await Promise.all([
    supabase.from('beaches').select('*').eq('island_id', island.id),
    supabase.from('restaurants').select('*').eq('island_id', island.id),
    supabase.from('hotels').select('*').eq('island_id', island.id),
    supabase.from('media').select('id, url, media_type').eq('entity_type', 'island').eq('entity_id', island.id),
  ])

  return (
    <IslandDetailClient
      island={island}
      allBeaches={allBeaches ?? []}
      allRestaurants={allRestaurants ?? []}
      allHotels={allHotels ?? []}
      media={media ?? []}
    />
  )
}
