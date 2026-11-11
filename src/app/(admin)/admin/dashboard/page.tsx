import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  const [islands, beaches, restaurants, attractions, users, reviews, adInquiries, contactMessages, pendingMedia, newsletterSubscribers, contentReports, travelStories] = await Promise.all([
    supabase.from('islands').select('id', { count: 'exact', head: true }),
    supabase.from('beaches').select('id', { count: 'exact', head: true }),
    supabase.from('restaurants').select('id', { count: 'exact', head: true }),
    supabase.from('attractions').select('id', { count: 'exact', head: true }),
    supabase.from('users').select('id', { count: 'exact', head: true }),
    supabase.from('reviews').select('id', { count: 'exact', head: true }),
    supabase.from('ad_inquiries').select('id', { count: 'exact', head: true }).eq('status', 'new'),
    supabase.from('contact_messages').select('id', { count: 'exact', head: true }).eq('status', 'new'),
    supabase.from('media').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('newsletter_subscribers').select('id', { count: 'exact', head: true }),
    supabase.from('content_reports').select('id', { count: 'exact', head: true }).eq('status', 'new'),
    supabase.from('travel_stories').select('id', { count: 'exact', head: true }),
  ])

  type Stat = { label: string; count: number; href: string; emoji: string; color: string; alert?: boolean }

  const content: Stat[] = [
    { label: 'Adalar', count: islands.count ?? 0, href: '/admin/islands', emoji: '🏝️', color: 'bg-sky-600' },
    { label: 'Plajlar', count: beaches.count ?? 0, href: '/admin/beaches', emoji: '🏖️', color: 'bg-cyan-600' },
    { label: 'Restoranlar', count: restaurants.count ?? 0, href: '/admin/restaurants', emoji: '🍽️', color: 'bg-teal-600' },
    { label: 'Gezilecek Yerler', count: attractions.count ?? 0, href: '/admin/attractions', emoji: '📍', color: 'bg-blue-600' },
    { label: 'Kullanıcılar', count: users.count ?? 0, href: '/admin/users', emoji: '👤', color: 'bg-indigo-600' },
    { label: 'Yorumlar', count: reviews.count ?? 0, href: '/admin/reviews', emoji: '⭐', color: 'bg-violet-600' },
    { label: 'Gezi Hikayeleri', count: travelStories.count ?? 0, href: '/admin/travel-stories', emoji: '📖', color: 'bg-sky-700' },
    { label: 'Bülten Aboneleri', count: newsletterSubscribers.count ?? 0, href: '/admin/newsletter', emoji: '📧', color: 'bg-emerald-600' },
  ]

  const alerts: Stat[] = [
    { label: 'Yeni Reklam Talebi', count: adInquiries.count ?? 0, href: '/admin/ad-inquiries', emoji: '📬', color: 'bg-amber-500', alert: true },
    { label: 'Yeni İletişim Mesajı', count: contactMessages.count ?? 0, href: '/admin/contact-messages', emoji: '✉️', color: 'bg-orange-500', alert: true },
    { label: 'Bekleyen Fotoğraf', count: pendingMedia.count ?? 0, href: '/admin/media-review', emoji: '🖼️', color: 'bg-rose-500', alert: true },
    { label: 'Yeni Hata Bildirimi', count: contentReports.count ?? 0, href: '/admin/content-reports', emoji: '⚠️', color: 'bg-red-600', alert: true },
  ]

  function SmallBox({ s }: { s: Stat }) {
    return (
      <Link
        href={s.href}
        className={`relative overflow-hidden rounded-xl ${s.color} text-white shadow-sm transition hover:brightness-110`}
      >
        {s.alert && s.count > 0 && (
          <span className="absolute right-2 top-2 z-10 flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/70" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white" />
          </span>
        )}
        <span className="pointer-events-none absolute -right-3 -top-4 text-7xl opacity-20 select-none">{s.emoji}</span>
        <div className="relative p-4">
          <p className="text-3xl font-extrabold leading-none">{s.count}</p>
          <p className="mt-1.5 text-sm font-medium text-white/90">{s.label}</p>
        </div>
        <div className="flex items-center justify-center gap-1 bg-black/15 py-1.5 text-xs font-medium text-white/90">
          Detay <span aria-hidden>»</span>
        </div>
      </Link>
    )
  }

  const totalAlerts = (adInquiries.count ?? 0) + (contactMessages.count ?? 0) + (pendingMedia.count ?? 0) + (contentReports.count ?? 0)

  return (
    <div className="mx-auto max-w-7xl p-4 sm:p-6">
      {/* Başlık */}
      <div className="mb-6 flex flex-wrap items-end justify-between gap-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Panel</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Yunanisland içerik yönetimi — genel bakış</p>
        </div>
        <span className="text-xs text-slate-400">Panel &nbsp;›&nbsp; Genel Bakış</span>
      </div>

      {/* Bekleyen işler */}
      <div className="mb-3 flex items-center gap-2">
        <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">Bekleyen İşler</h2>
        {totalAlerts > 0 && (
          <span className="rounded-full bg-rose-500/10 px-2 py-0.5 text-xs font-semibold text-rose-600">
            {totalAlerts} bekliyor
          </span>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {alerts.map((s) => (
          <SmallBox key={s.label} s={s} />
        ))}
      </div>

      {/* İçerik istatistikleri */}
      <h2 className="mb-3 mt-8 text-sm font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">İçerik</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {content.map((s) => (
          <SmallBox key={s.label} s={s} />
        ))}
      </div>

      {/* Hızlı erişim kartı */}
      <div className="mt-8 rounded-xl border border-slate-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
        <div className="border-b border-slate-200 px-5 py-3 dark:border-neutral-800">
          <h2 className="text-sm font-bold text-slate-700 dark:text-slate-200">Hızlı Erişim</h2>
        </div>
        <div className="flex flex-wrap gap-2 p-4">
          <Link href="/admin/islands/new" className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-500">+ Yeni Ada</Link>
          <Link href="/admin/beaches/new" className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-slate-200 dark:hover:bg-neutral-700">+ Yeni Plaj</Link>
          <Link href="/admin/restaurants/new" className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-slate-200 dark:hover:bg-neutral-700">+ Yeni Restoran</Link>
          <Link href="/admin/hotels/new" className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-slate-200 dark:hover:bg-neutral-700">+ Yeni Otel</Link>
          <Link href="/admin/articles/new" className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-slate-200 dark:hover:bg-neutral-700">+ Yeni Blog Yazısı</Link>
          <Link href="/admin/events/new" className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-slate-200 dark:hover:bg-neutral-700">+ Yeni Etkinlik</Link>
        </div>
      </div>
    </div>
  )
}
