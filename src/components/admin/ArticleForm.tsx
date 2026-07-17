'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

interface CategoryOption { id: string; name: string }

interface ArticleFormValues {
  title: string
  slug: string
  content: string
  category_id: string
  is_published: boolean
}

const EMPTY: ArticleFormValues = {
  title: '',
  slug: '',
  content: '',
  category_id: '',
  is_published: false,
}

export function ArticleForm({ categories, initial }: { categories: CategoryOption[]; initial?: Partial<ArticleFormValues> & { id: string } }) {
  const router = useRouter()
  const [values, setValues] = useState<ArticleFormValues>({ ...EMPTY, category_id: categories[0]?.id ?? '', ...initial })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const set = <K extends keyof ArticleFormValues>(key: K, value: ArticleFormValues[K]) =>
    setValues((v) => ({ ...v, [key]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    const payload = {
      title: values.title,
      slug: values.slug,
      content: values.content || null,
      category_id: values.category_id || null,
      is_published: values.is_published,
      published_at: values.is_published ? new Date().toISOString() : null,
      ...(initial?.id ? {} : { author_id: user?.id ?? null }),
    }

    const result = initial?.id
      ? await supabase.from('articles').update(payload).eq('id', initial.id)
      : await supabase.from('articles').insert(payload)

    if (result.error) {
      setError(result.error.message)
      setSaving(false)
      return
    }

    router.push('/admin/articles')
    router.refresh()
  }

  const handleDelete = async () => {
    if (!initial?.id) return
    if (!confirm(`"${values.title}" yazısını silmek istediğine emin misin?`)) return
    const supabase = createClient()
    await supabase.from('articles').delete().eq('id', initial.id)
    router.push('/admin/articles')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-slate-100 dark:border-neutral-900 shadow-sm">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Başlık</label>
          <input required value={values.title} onChange={(e) => set('title', e.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-2.5 px-4 text-sm outline-none focus:border-sky-500" />
        </div>
        <div>
          <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Slug</label>
          <input required value={values.slug} onChange={(e) => set('slug', e.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-2.5 px-4 text-sm outline-none focus:border-sky-500" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Kategori</label>
        <select value={values.category_id} onChange={(e) => set('category_id', e.target.value)}
          className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-2.5 px-4 text-sm outline-none focus:border-sky-500">
          {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>

      <div>
        <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">İçerik</label>
        <textarea rows={8} value={values.content} onChange={(e) => set('content', e.target.value)}
          className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-2.5 px-4 text-sm outline-none focus:border-sky-500" />
      </div>

      <label className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 cursor-pointer">
        <input type="checkbox" checked={values.is_published} onChange={(e) => set('is_published', e.target.checked)}
          className="rounded border-slate-300 text-sky-600 focus:ring-sky-500 h-4 w-4" />
        Yayınla
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex items-center justify-between pt-2">
        <button type="submit" disabled={saving}
          className="rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-sky-500 transition-colors disabled:opacity-50">
          {saving ? 'Kaydediliyor...' : 'Kaydet'}
        </button>
        {initial?.id && (
          <button type="button" onClick={handleDelete} className="text-sm font-semibold text-red-600 hover:underline">
            Yazıyı Sil
          </button>
        )}
      </div>
    </form>
  )
}
