import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { AdminDuplicateButton } from '@/components/admin/AdminDuplicateButton'

export default async function AdminHotelsPage() {
  const supabase = await createClient()
  const { data: hotels } = await supabase.from('hotels').select('id, name, category, price_range, islands(name)').order('name')

  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Oteller</h1>
          <p className="mt-1 text-sm text-neutral-500">{hotels?.length ?? 0} otel</p>
        </div>
        <Link href="/admin/hotels/new" className="rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-sky-500 transition-colors">
          + Yeni Otel
        </Link>
      </div>

      <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-slate-100 dark:border-neutral-900 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 dark:bg-neutral-950 text-left text-xs uppercase tracking-wider text-neutral-400">
            <tr>
              <th className="px-5 py-3">Ad</th>
              <th className="px-5 py-3">Ada</th>
              <th className="px-5 py-3">Kategori</th>
              <th className="px-5 py-3">Fiyat</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {(hotels ?? []).map((h) => {
              const island = Array.isArray(h.islands) ? h.islands[0] : h.islands
              return (
                <tr key={h.id} className="border-t border-slate-100 dark:border-neutral-800">
                  <td className="px-5 py-3 font-medium text-neutral-800 dark:text-neutral-200">{h.name}</td>
                  <td className="px-5 py-3 text-neutral-500">{island?.name}</td>
                  <td className="px-5 py-3 text-neutral-500">{h.category}</td>
                  <td className="px-5 py-3 text-neutral-500">{h.price_range}</td>
                  <td className="px-5 py-3 text-right space-x-3">
                    <AdminDuplicateButton table="hotels" id={h.id} routeBase="/admin/hotels" />
                    <Link href={`/admin/hotels/${h.id}`} className="text-sky-600 hover:underline font-semibold">Düzenle</Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </main>
  )
}
