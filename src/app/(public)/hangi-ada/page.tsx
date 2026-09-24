import type { Metadata } from 'next'
import { Header } from '@/components/Header'
import { SiteFooter } from '@/components/SiteFooter'
import { PageHeroI18n } from '@/components/PageHeroI18n'
import { IslandQuizClient, type QuizIslandData } from '@/components/IslandQuizClient'
import { createClient } from '@/lib/supabase/server'
import { getUrlLocale, buildHreflangAlternates } from '@/lib/i18n/urlLocale'

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://yunanisland.vercel.app'

const COPY = {
  tr: { title: 'Sana Hangi Yunan Adası Uygun? | Yunanisland', description: '5 kısa soruyu cevapla, tarzına en uygun Yunan adasını bul ve sonucunu arkadaşlarınla paylaş.' },
  en: { title: 'Which Greek Island Are You? | Yunanisland', description: 'Answer 5 quick questions, find the Greek island that matches your style and share your result with friends.' },
  el: { title: 'Ποιο Ελληνικό Νησί Σας Ταιριάζει; | Yunanisland', description: 'Απαντήστε σε 5 σύντομες ερωτήσεις και βρείτε το ελληνικό νησί που σας ταιριάζει.' },
}

async function getSharedIsland(slug: string | undefined) {
  if (!slug) return null
  const supabase = await createClient()
  const { data } = await supabase.from('islands').select('name, slug, cover_image_url').eq('slug', slug).eq('is_published', true).maybeSingle()
  return data
}

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ sonuc?: string }> }): Promise<Metadata> {
  const { sonuc } = await searchParams
  const locale = await getUrlLocale()
  const copy = COPY[locale]
  const shared = await getSharedIsland(sonuc)

  // Paylaşılan sonuç linkinde (?sonuc=slug) önizleme o adanın adını ve
  // görselini gösteriyor — link WhatsApp/X'te açılınca "bana X çıktı" görünsün.
  const title = shared
    ? locale === 'en' ? `My Greek island is ${shared.name}! Which one are you?`
      : locale === 'el' ? `Το νησί μου είναι η ${shared.name}! Εσείς;`
      : `Bana ${shared.name} çıktı! Sana hangi Yunan adası uygun?`
    : copy.title

  return {
    title,
    description: copy.description,
    alternates: buildHreflangAlternates('/hangi-ada', SITE_URL, locale),
    openGraph: {
      title,
      description: copy.description,
      url: `${SITE_URL}/hangi-ada${shared ? `?sonuc=${shared.slug}` : ''}`,
      ...(shared?.cover_image_url ? { images: [{ url: shared.cover_image_url }] } : {}),
    },
  }
}

export default async function IslandQuizPage({ searchParams }: { searchParams: Promise<{ sonuc?: string }> }) {
  const { sonuc } = await searchParams
  const supabase = await createClient()
  const { data: islands } = await supabase
    .from('islands')
    .select('id, name, slug, description, description_en, description_el, budget_level, moods, cover_image_url')
    .eq('is_published', true)
    .order('name')

  const list = (islands ?? []) as QuizIslandData[]
  const sharedResult = sonuc ? list.find((i) => i.slug === sonuc) ?? null : null

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 transition-colors duration-300">
      <Header />

      <PageHeroI18n
        image="/santorini.jpg"
        tr={{ badge: 'Ada Testi', title: 'Sana Hangi Yunan Adası Uygun?', subtitle: '5 kısa soru, 1 dakika. Tarzına en uygun adayı bul, sonucunu arkadaşlarınla paylaş.' }}
        en={{ badge: 'Island Quiz', title: 'Which Greek Island Are You?', subtitle: '5 quick questions, 1 minute. Find the island that fits your style and share it with friends.' }}
        el={{ badge: 'Κουίζ Νησιών', title: 'Ποιο Ελληνικό Νησί Σας Ταιριάζει;', subtitle: '5 σύντομες ερωτήσεις, 1 λεπτό. Βρείτε το νησί σας και μοιραστείτε το.' }}
      />

      <main className="mx-auto max-w-3xl px-6 py-12">
        <IslandQuizClient islands={list} siteUrl={SITE_URL} sharedResult={sharedResult} />
      </main>
      <SiteFooter />
    </div>
  )
}
