import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export default async function AdminAttractionsPage() {
  const supabase = await createClient()
  const { data: attractions } = await supabase.from('attractions').select('id, name, category, islands(name)').order('name')

  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Gezilecek Yerler</h1>
          <p className="mt-1 text-sm text-neutral-500">{attractions?.length ?? 0} yer</p>
        </div>
        <Link href="/admin/attractions/new" className="rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-sky-500 transition-colors">
          + Yeni Yer
        </Link>
      </div>

      <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-slate-100 dark:border-neutral-900 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 dark:bg-neutral-950 text-left text-xs uppercase tracking-wider text-neutral-400">
            <tr>
              <th className="px-5 py-3">Ad</th>
              <th className="px-5 py-3">Ada</th>
              <th className="px-5 py-3">Kategori</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {(attractions ?? []).map((attraction) => {
              const island = Array.isArray(attraction.islands) ? attraction.islands[0] : attraction.islands
              return (
                <tr key={attraction.id} className="border-t border-slate-100 dark:border-neutral-800">
                  <td className="px-5 py-3 font-medium text-neutral-800 dark:text-neutral-200">{attraction.name}</td>
                  <td className="px-5 py-3 text-neutral-500">{island?.name}</td>
                  <td className="px-5 py-3 text-neutral-500">{attraction.category}</td>
                  <td className="px-5 py-3 text-right">
                    <Link href={`/admin/attractions/${attraction.id}`} className="text-sky-600 hover:underline font-semibold">Düzenle</Link>
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
