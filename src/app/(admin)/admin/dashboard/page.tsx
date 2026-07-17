import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  const [islands, beaches, restaurants, users, reviews] = await Promise.all([
    supabase.from('islands').select('id', { count: 'exact', head: true }),
    supabase.from('beaches').select('id', { count: 'exact', head: true }),
    supabase.from('restaurants').select('id', { count: 'exact', head: true }),
    supabase.from('users').select('id', { count: 'exact', head: true }),
    supabase.from('reviews').select('id', { count: 'exact', head: true }),
  ])

  const stats = [
    { label: 'Adalar', count: islands.count ?? 0, href: '/admin/islands', emoji: '🏝️' },
    { label: 'Plajlar', count: beaches.count ?? 0, href: '/map', emoji: '🏖️' },
    { label: 'Restoranlar', count: restaurants.count ?? 0, href: '/map', emoji: '🍽️' },
    { label: 'Kullanıcılar', count: users.count ?? 0, href: '#', emoji: '👤' },
    { label: 'Yorumlar', count: reviews.count ?? 0, href: '#', emoji: '⭐' },
  ]

  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Admin Paneli</h1>
      <p className="mt-2 text-sm text-neutral-500">Yunanisland içerik yönetimi.</p>

      <div className="mt-8 grid grid-cols-2 sm:grid-cols-5 gap-4">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="bg-white dark:bg-neutral-900 p-4 rounded-2xl border border-slate-100 dark:border-neutral-900 shadow-sm hover:shadow-md transition-all">
            <span className="text-2xl">{s.emoji}</span>
            <p className="mt-2 text-2xl font-extrabold text-neutral-900 dark:text-white">{s.count}</p>
            <p className="text-xs text-neutral-500">{s.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-bold text-neutral-900 dark:text-white mb-4">Yönetim</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/islands" className="rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-sky-500 transition-colors">
            🏝️ Adaları Yönet
          </Link>
        </div>
      </div>
    </main>
  )
}
