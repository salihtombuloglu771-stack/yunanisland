import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { Header } from '@/components/Header'
import { FavoriteButton } from '@/components/FavoriteButton'
import { ReviewSection } from '@/components/ReviewSection'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { JsonLd } from '@/components/JsonLd'
import { createClient } from '@/lib/supabase/server'

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://yunanisland.vercel.app'

interface PageProps {
  params: Promise<{ slug: string }>
}

const BEACH_TYPE_LABELS: Record<string, string> = { sand: '🏖️ Kumluk', pebble: '🪨 Çakıllık', mixed: '⛱️ Karışık' }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data: beach } = await supabase.from('beaches').select('name, description').eq('slug', slug).maybeSingle()
  if (!beach) return { title: 'Plaj Bulunamadı — Yunanisland' }
  return { title: `${beach.name} — Yunanisland`, description: beach.description ?? undefined }
}

export default async function BeachDetailPage({ params }: PageProps) {
  const { slug } = await params
  const supabase = await createClient()
  const { data: beach } = await supabase.from('beaches').select('*, islands(name, slug)').eq('slug', slug).maybeSingle()

  if (!beach) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-neutral-950">
        <Header />
        <div className="flex flex-col items-center justify-center p-6 py-24 text-center">
          <span className="text-6xl mb-4">🏖️❌</span>
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">Plaj Bulunamadı</h1>
          <Link href="/" className="mt-6 rounded-xl bg-sky-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-sky-500 transition-colors">Ana Sayfaya Dön</Link>
        </div>
      </div>
    )
  }

  const island = Array.isArray(beach.islands) ? beach.islands[0] : beach.islands

  const { data: reviews } = await supabase.from('reviews').select('rating').eq('entity_type', 'beach').eq('entity_id', beach.id)
  const reviewCount = reviews?.length ?? 0
  const avgRating = reviewCount > 0 ? reviews!.reduce((s, r) => s + r.rating, 0) / reviewCount : null

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: beach.name,
    description: beach.description ?? undefined,
    url: `${SITE_URL}/beaches/${beach.slug}`,
    ...(beach.latitude && beach.longitude
      ? { geo: { '@type': 'GeoCoordinates', latitude: beach.latitude, longitude: beach.longitude } }
      : {}),
    ...(avgRating
      ? { aggregateRating: { '@type': 'AggregateRating', ratingValue: avgRating.toFixed(1), reviewCount } }
      : {}),
  }

  const facts: { label: string; show: boolean }[] = [
    { label: '🚗 Otopark', show: beach.has_parking },
    { label: '🚿 Duş', show: beach.has_showers },
    { label: '🚽 Tuvalet', show: beach.has_toilets },
    { label: '🍹 Plaj Bar', show: beach.has_beach_bar },
    { label: '🛟 Cankurtaran', show: beach.has_lifeguard },
    { label: '👨‍👩‍👧 Aile Dostu', show: beach.family_friendly },
    { label: '🐾 Evcil Hayvan Dostu', show: beach.pet_friendly },
  ]

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 transition-colors duration-300">
      <JsonLd data={jsonLd} />
      <Header />

      <div className="mx-auto max-w-4xl px-6 pt-4">
        <Breadcrumbs
          baseUrl={SITE_URL}
          items={[
            { label: 'Ana Sayfa', href: '/' },
            ...(island ? [{ label: island.name, href: `/islands/${island.slug}` }] : []),
            { label: beach.name },
          ]}
        />
      </div>

      <section className="relative h-[300px] w-full overflow-hidden bg-slate-900">
        {beach.cover_image_url ? (
          <>
            <Image src={beach.cover_image_url} alt={beach.name} fill priority className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-sky-600 via-sky-800 to-indigo-900" />
        )}
        <div className="absolute top-20 right-6">
          <FavoriteButton entityType="beach" entityId={beach.id} />
        </div>
        <div className="absolute bottom-0 left-0 right-0 max-w-4xl mx-auto px-6 pb-8 text-white">
          {island && (
            <Link href={`/islands/${island.slug}`} className="text-xs text-sky-300 hover:underline">
              ← {island.name}
            </Link>
          )}
          <h1 className="mt-2 text-3xl md:text-5xl font-extrabold tracking-tight">{beach.name}</h1>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="text-xs bg-white/10 backdrop-blur-md px-3 py-1 rounded-full font-medium">
              {BEACH_TYPE_LABELS[beach.beach_type] ?? beach.beach_type}
            </span>
            {beach.blue_flag && <span className="text-xs bg-blue-600/90 px-3 py-1 rounded-full font-medium">💙 Mavi Bayrak</span>}
            {beach.sunset_rating && <span className="text-xs bg-white/10 backdrop-blur-md px-3 py-1 rounded-full font-medium">🌅 Gün Batımı {beach.sunset_rating}/5</span>}
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-4xl px-6 py-12">
        <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">{beach.description}</p>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {facts.filter(f => f.show).map(f => (
            <span key={f.label} className="text-center text-xs font-medium bg-white dark:bg-neutral-900 border border-slate-100 dark:border-neutral-900 rounded-xl py-2.5 px-3 text-neutral-700 dark:text-neutral-300">
              {f.label}
            </span>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
          <div className="bg-white dark:bg-neutral-900 rounded-xl p-4 border border-slate-100 dark:border-neutral-900">
            <p className="text-xs text-neutral-400">Şezlong</p>
            <p className="font-semibold text-neutral-800 dark:text-neutral-200">{beach.sunbed_price ? `${beach.sunbed_price} €` : 'Ücretsiz/Yok'}</p>
          </div>
          <div className="bg-white dark:bg-neutral-900 rounded-xl p-4 border border-slate-100 dark:border-neutral-900">
            <p className="text-xs text-neutral-400">Şemsiye</p>
            <p className="font-semibold text-neutral-800 dark:text-neutral-200">{beach.umbrella_price ? `${beach.umbrella_price} €` : 'Ücretsiz/Yok'}</p>
          </div>
        </div>

        {beach.accessibility && (
          <p className="mt-6 text-sm text-neutral-500">♿ {beach.accessibility}</p>
        )}

        <ReviewSection entityType="beach" entityId={beach.id} />
      </main>
    </div>
  )
}
