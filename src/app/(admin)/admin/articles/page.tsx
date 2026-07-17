import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export default async function AdminArticlesPage() {
  const supabase = await createClient()
  const { data: articles } = await supabase.from('articles').select('id, title, is_published, categories(name)').order('title')

  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Blog Yazıları</h1>
          <p className="mt-1 text-sm text-neutral-500">{articles?.length ?? 0} yazı</p>
        </div>
        <Link href="/admin/articles/new" className="rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-sky-500 transition-colors">
          + Yeni Yazı
        </Link>
      </div>

      <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-slate-100 dark:border-neutral-900 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 dark:bg-neutral-950 text-left text-xs uppercase tracking-wider text-neutral-400">
            <tr>
              <th className="px-5 py-3">Başlık</th>
              <th className="px-5 py-3">Kategori</th>
              <th className="px-5 py-3">Durum</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {(articles ?? []).map((a) => {
              const category = Array.isArray(a.categories) ? a.categories[0] : a.categories
              return (
                <tr key={a.id} className="border-t border-slate-100 dark:border-neutral-800">
                  <td className="px-5 py-3 font-medium text-neutral-800 dark:text-neutral-200">{a.title}</td>
                  <td className="px-5 py-3 text-neutral-500">{category?.name}</td>
                  <td className="px-5 py-3">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${a.is_published ? 'bg-emerald-500/10 text-emerald-600' : 'bg-neutral-500/10 text-neutral-500'}`}>
                      {a.is_published ? 'Yayında' : 'Taslak'}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <Link href={`/admin/articles/${a.id}`} className="text-sky-600 hover:underline font-semibold">Düzenle</Link>
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
