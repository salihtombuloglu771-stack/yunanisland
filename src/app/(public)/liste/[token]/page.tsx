import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { Header } from '@/components/Header'
import { SiteFooter } from '@/components/SiteFooter'
import { createClient } from '@/lib/supabase/server'

interface PageProps {
  params: Promise<{ token: string }>
}

export function generateMetadata(): Metadata {
  return {
    title: 'Paylaşılan Gezi Listesi — Yunanisland',
    robots: { index: false, follow: false },
  }
}

const TYPE_CONFIG = {
  island: { table: 'islands', icon: '🏝️', hrefPrefix: '/islands' },
  beach: { table: 'beaches', icon: '🏖️', hrefPrefix: '/beaches' },
  restaurant: { table: 'restaurants', icon: '🍽️', hrefPrefix: '/restaurants' },
  hotel: { table: 'hotels', icon: '🏨', hrefPrefix: '/hotels' },
  attraction: { table: 'attractions', icon: '📍', hrefPrefix: '/attractions' },
} as const

type EntityType = keyof typeof TYPE_CONFIG

interface SharedFavorite {
  entity_type: EntityType
  entity_id: string
  owner_name: string | null
}

export default async function SharedListPage({ params }: PageProps) {
  const { token } = await params
  const supabase = await createClient()

  const { data } = await supabase.rpc('get_shared_favorites', { p_token: token })
  const favorites = (data ?? []) as SharedFavorite[]

  if (favorites.length === 0) {
    notFound()
  }

  const ownerName = favorites[0]?.owner_name ?? null

  const idsByType: Partial<Record<EntityType, string[]>> = {}
  for (const f of favorites) {
    idsByType[f.entity_type] = [...(idsByType[f.entity_type] ?? []), f.entity_id]
  }

  const entries = await Promise.all(
    (Object.keys(TYPE_CONFIG) as EntityType[]).map(async (type) => {
      const ids = idsByType[type] ?? []
      if (ids.length === 0) return []
      const { table } = TYPE_CONFIG[type]
      const { data: rows } = await supabase.from(table).select('id, name, slug, cover_image_url').in('id', ids)
      return (rows ?? []).map((item) => ({ ...item, type }))
    })
  )

  const items = entries.flat()

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950">
      <Header />
      <main className="mx-auto max-w-5xl px-6 py-16">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
          {ownerName ? `${ownerName}'in Yunanistan Listesi` : 'Bir Gezginin Yunanistan Listesi'}
        </h1>
        <p className="mt-2 text-sm text-neutral-500">{items.length} favori yer</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const config = TYPE_CONFIG[item.type]
            return (
              <Link
                key={`${item.type}-${item.id}`}
                href={`${config.hrefPrefix}/${item.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-neutral-100 dark:border-neutral-900 bg-white dark:bg-neutral-900 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-neutral-800">
                  {item.cover_image_url ? (
                    <Image
                      src={item.cover_image_url}
                      alt={item.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-4xl">{config.icon}</div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-neutral-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                    {config.icon} {item.name}
                  </h3>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <Link href="/" className="text-sm font-semibold text-sky-600 hover:underline">
            Sen de kendi Yunanistan listeni oluştur →
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
