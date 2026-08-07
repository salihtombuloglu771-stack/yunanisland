import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { AdminDuplicateButton } from '@/components/admin/AdminDuplicateButton'

export default async function AdminBeachesPage() {
  const supabase = await createClient()
  const { data: beaches } = await supabase.from('beaches').select('id, name, beach_type, blue_flag, islands(name)').order('name')

  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Plajlar</h1>
          <p className="mt-1 text-sm text-neutral-500">{beaches?.length ?? 0} plaj</p>
        </div>
        <Link href="/admin/beaches/new" className="rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-sky-500 transition-colors">
          + Yeni Plaj
        </Link>
      </div>

      <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-slate-100 dark:border-neutral-900 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 dark:bg-neutral-950 text-left text-xs uppercase tracking-wider text-neutral-400">
            <tr>
              <th className="px-5 py-3">Ad</th>
              <th className="px-5 py-3">Ada</th>
              <th className="px-5 py-3">Tip</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {(beaches ?? []).map((beach) => {
              const island = Array.isArray(beach.islands) ? beach.islands[0] : beach.islands
              return (
                <tr key={beach.id} className="border-t border-slate-100 dark:border-neutral-800">
                  <td className="px-5 py-3 font-medium text-neutral-800 dark:text-neutral-200">
                    {beach.name} {beach.blue_flag && '💙'}
                  </td>
                  <td className="px-5 py-3 text-neutral-500">{island?.name}</td>
                  <td className="px-5 py-3 text-neutral-500">{beach.beach_type}</td>
                  <td className="px-5 py-3 text-right space-x-3">
                    <AdminDuplicateButton table="beaches" id={beach.id} routeBase="/admin/beaches" />
                    <Link href={`/admin/beaches/${beach.id}`} className="text-sky-600 hover:underline font-semibold">Düzenle</Link>
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
