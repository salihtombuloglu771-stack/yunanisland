'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

interface IslandOption { id: string; name: string }

interface EventFormValues {
  title: string
  slug: string
  description: string
  category: string
  start_date: string
  end_date: string
  location: string
  island_id: string
  is_published: boolean
}

const EMPTY: EventFormValues = {
  title: '',
  slug: '',
  description: '',
  category: 'festival',
  start_date: '',
  end_date: '',
  location: '',
  island_id: '',
  is_published: false,
}

export function EventForm({ islands, initial }: { islands: IslandOption[]; initial?: Partial<EventFormValues> & { id: string } }) {
  const router = useRouter()
  const [values, setValues] = useState<EventFormValues>({ ...EMPTY, ...initial })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const set = <K extends keyof EventFormValues>(key: K, value: EventFormValues[K]) =>
    setValues((v) => ({ ...v, [key]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    const supabase = createClient()
    const payload = {
      title: values.title,
      slug: values.slug,
      description: values.description || null,
      category: values.category,
      start_date: values.start_date,
      end_date: values.end_date || null,
      location: values.location || null,
      island_id: values.island_id || null,
      is_published: values.is_published,
    }

    const result = initial?.id
      ? await supabase.from('events').update(payload).eq('id', initial.id)
      : await supabase.from('events').insert(payload)

    if (result.error) {
      setError(result.error.message)
      setSaving(false)
      return
    }

    router.push('/admin/events')
    router.refresh()
  }

  const handleDelete = async () => {
    if (!initial?.id) return
    if (!confirm(`"${values.title}" etkinliğini silmek istediğine emin misin?`)) return
    const supabase = createClient()
    await supabase.from('events').delete().eq('id', initial.id)
    router.push('/admin/events')
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
        <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Açıklama</label>
        <textarea rows={3} value={values.description} onChange={(e) => set('description', e.target.value)}
          className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-2.5 px-4 text-sm outline-none focus:border-sky-500" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Kategori</label>
          <select value={values.category} onChange={(e) => set('category', e.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-2.5 px-4 text-sm outline-none focus:border-sky-500">
            <option value="festival">Festival</option>
            <option value="concert">Konser</option>
            <option value="sports">Spor</option>
            <option value="food">Gastronomi</option>
            <option value="religious">Dini</option>
            <option value="seasonal">Mevsimlik</option>
            <option value="other">Diğer</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Ada (opsiyonel)</label>
          <select value={values.island_id} onChange={(e) => set('island_id', e.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-2.5 px-4 text-sm outline-none focus:border-sky-500">
            <option value="">Tüm Yunanistan / Genel</option>
            {islands.map((i) => <option key={i.id} value={i.id}>{i.name}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Başlangıç Tarihi</label>
          <input type="date" required value={values.start_date} onChange={(e) => set('start_date', e.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-2.5 px-4 text-sm outline-none focus:border-sky-500" />
        </div>
        <div>
          <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Bitiş Tarihi</label>
          <input type="date" value={values.end_date} onChange={(e) => set('end_date', e.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-2.5 px-4 text-sm outline-none focus:border-sky-500" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Konum</label>
        <input value={values.location} onChange={(e) => set('location', e.target.value)}
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
            Etkinliği Sil
          </button>
        )}
      </div>
    </form>
  )
}
