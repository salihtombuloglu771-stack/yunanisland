import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export default async function AdminFerryRoutesPage() {
  const supabase = await createClient()
  const { data: routes } = await supabase.from('ferry_routes').select('id, from_port, to_port, duration_minutes, price_min, price_max').order('from_port')

  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Feribot Rotaları</h1>
          <p className="mt-1 text-sm text-neutral-500">{routes?.length ?? 0} rota</p>
        </div>
        <Link href="/admin/ferry-routes/new" className="rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-sky-500 transition-colors">
          + Yeni Rota
        </Link>
      </div>

      <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-slate-100 dark:border-neutral-900 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 dark:bg-neutral-950 text-left text-xs uppercase tracking-wider text-neutral-400">
            <tr>
              <th className="px-5 py-3">Rota</th>
              <th className="px-5 py-3">Süre</th>
              <th className="px-5 py-3">Fiyat</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {(routes ?? []).map((r) => (
              <tr key={r.id} className="border-t border-slate-100 dark:border-neutral-850">
                <td className="px-5 py-3 font-medium text-neutral-800 dark:text-neutral-200">{r.from_port} → {r.to_port}</td>
                <td className="px-5 py-3 text-neutral-500">{r.duration_minutes} dk</td>
                <td className="px-5 py-3 text-neutral-500">{r.price_min}-{r.price_max} €</td>
                <td className="px-5 py-3 text-right">
                  <Link href={`/admin/ferry-routes/${r.id}`} className="text-sky-600 hover:underline font-semibold">Düzenle</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}
