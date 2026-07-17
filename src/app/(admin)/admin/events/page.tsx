import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export default async function AdminEventsPage() {
  const supabase = await createClient()
  const { data: events } = await supabase.from('events').select('id, title, start_date, category, is_published').order('start_date', { ascending: false })

  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Etkinlikler</h1>
          <p className="mt-1 text-sm text-neutral-500">{events?.length ?? 0} etkinlik</p>
        </div>
        <Link href="/admin/events/new" className="rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-sky-500 transition-colors">
          + Yeni Etkinlik
        </Link>
      </div>

      <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-slate-100 dark:border-neutral-900 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 dark:bg-neutral-950 text-left text-xs uppercase tracking-wider text-neutral-400">
            <tr>
              <th className="px-5 py-3">Başlık</th>
              <th className="px-5 py-3">Tarih</th>
              <th className="px-5 py-3">Kategori</th>
              <th className="px-5 py-3">Durum</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {(events ?? []).map((e) => (
              <tr key={e.id} className="border-t border-slate-100 dark:border-neutral-800">
                <td className="px-5 py-3 font-medium text-neutral-800 dark:text-neutral-200">{e.title}</td>
                <td className="px-5 py-3 text-neutral-500">{new Date(e.start_date).toLocaleDateString('tr-TR')}</td>
                <td className="px-5 py-3 text-neutral-500">{e.category}</td>
                <td className="px-5 py-3">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${e.is_published ? 'bg-emerald-500/10 text-emerald-600' : 'bg-neutral-500/10 text-neutral-500'}`}>
                    {e.is_published ? 'Yayında' : 'Taslak'}
                  </span>
                </td>
                <td className="px-5 py-3 text-right">
                  <Link href={`/admin/events/${e.id}`} className="text-sky-600 hover:underline font-semibold">Düzenle</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}
