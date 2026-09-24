import Link from '@/components/LocaleLink'
import type { Metadata } from 'next'
import { Header } from '@/components/Header'
import { JsonLd } from '@/components/JsonLd'
import { AdBanner } from '@/components/AdBanner'
import { BeachDetailClient } from '@/components/BeachDetailClient'
import { createClient } from '@/lib/supabase/server'
import { ensureMinLength, titleWithSuffix, BEACH_TYPE_TR } from '@/lib/seo'
import { getUrlLocale, buildHreflangAlternates } from '@/lib/i18n/urlLocale'

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://yunanisland.vercel.app'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const locale = await getUrlLocale()
  const supabase = await createClient()
  const { data: beach } = await supabase
    .from('beaches')
    .select('name, description, description_en, description_el, beach_type, blue_flag, cover_image_url, islands(name)')
    .eq('slug', slug)
    .maybeSingle()
  if (!beach) return { title: 'Plaj Bulunamadı — Yunanisland' }

  const islandRel = beach.islands as unknown as { name: string } | { name: string }[] | null
  const islandName = Array.isArray(islandRel) ? islandRel[0]?.name : islandRel?.name
  const displayName = titleWithSuffix(beach.name, 'Plajı', /plaj|beach/i)
  const typeLabel = BEACH_TYPE_TR[beach.beach_type] ?? beach.beach_type

  const titleByLocale = {
    tr: islandName ? `${displayName} — ${islandName} Adası | Yunanisland` : `${displayName} — Yunanisland`,
    en: islandName ? `${beach.name} Beach — ${islandName} Island | Yunanisland` : `${beach.name} Beach | Yunanisland`,
    el: islandName ? `Παραλία ${beach.name} — Νησί ${islandName} | Yunanisland` : `Παραλία ${beach.name} | Yunanisland`,
  }
  const fillerByLocale = {
    tr: `${islandName ? `${islandName} adasındaki ` : ''}${beach.name}, ${typeLabel} yapısıyla${beach.blue_flag ? ' Mavi Bayrak ödüllü' : ''} bir plaj. Ulaşım, olanaklar ve gezgin yorumları için Yunanisland'ı ziyaret edin.`,
    en: `Visit Yunanisland for directions, amenities and traveler reviews of ${beach.name} beach${islandName ? ` on ${islandName} island` : ''}.`,
    el: `Επισκεφθείτε το Yunanisland για οδηγίες, ανέσεις και κριτικές ταξιδιωτών για την παραλία ${beach.name}${islandName ? ` στο νησί ${islandName}` : ''}.`,
  }
  const rawDescription = locale === 'en' ? (beach.description_en || beach.description)
    : locale === 'el' ? (beach.description_el || beach.description)
    : beach.description

  const title = titleByLocale[locale]
  const description = ensureMinLength(rawDescription, fillerByLocale[locale])

  return {
    title,
    description,
    alternates: buildHreflangAlternates(`/beaches/${slug}`, SITE_URL, locale),
    openGraph: {
      title,
      description,
      images: beach.cover_image_url ? [beach.cover_image_url] : undefined,
    },
  }
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

  const [{ data: reviews }, { data: media }] = await Promise.all([
    supabase.from('reviews').select('rating').eq('entity_type', 'beach').eq('entity_id', beach.id),
    supabase.from('media').select('id, url, media_type').eq('entity_type', 'beach').eq('entity_id', beach.id).eq('status', 'approved'),
  ])
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

  return (
    <>
      <JsonLd data={jsonLd} />
      <BeachDetailClient beach={beach} island={island} media={media ?? []} adBanner={<AdBanner placement="detail" />} />
    </>
  )
}
