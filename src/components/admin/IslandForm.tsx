'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

interface IslandFormValues {
  id?: string
  name: string
  slug: string
  description: string
  history: string
  population: string
  latitude: string
  longitude: string
  best_time_to_visit: string
  budget_level: 'budget' | 'mid' | 'luxury'
  cover_image_url: string
  is_published: boolean
}

const EMPTY: IslandFormValues = {
  name: '',
  slug: '',
  description: '',
  history: '',
  population: '',
  latitude: '',
  longitude: '',
  best_time_to_visit: '',
  budget_level: 'mid',
  cover_image_url: '',
  is_published: false,
}

export function IslandForm({ initial }: { initial?: Partial<IslandFormValues> & { id: string } }) {
  const router = useRouter()
  const [values, setValues] = useState<IslandFormValues>({ ...EMPTY, ...initial })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const set = <K extends keyof IslandFormValues>(key: K, value: IslandFormValues[K]) =>
    setValues((v) => ({ ...v, [key]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    const supabase = createClient()
    const payload = {
      name: values.name,
      slug: values.slug,
      description: values.description || null,
      history: values.history || null,
      population: values.population ? Number(values.population) : null,
      latitude: values.latitude ? Number(values.latitude) : null,
      longitude: values.longitude ? Number(values.longitude) : null,
      best_time_to_visit: values.best_time_to_visit || null,
      budget_level: values.budget_level,
      cover_image_url: values.cover_image_url || null,
      is_published: values.is_published,
    }

    const result = initial?.id
      ? await supabase.from('islands').update(payload).eq('id', initial.id)
      : await supabase.from('islands').insert(payload)

    if (result.error) {
      setError(result.error.message)
      setSaving(false)
      return
    }

    router.push('/admin/islands')
    router.refresh()
  }

  const handleDelete = async () => {
    if (!initial?.id) return
    if (!confirm(`"${values.name}" adasını silmek istediğine emin misin?`)) return

    const supabase = createClient()
    await supabase.from('islands').delete().eq('id', initial.id)
    router.push('/admin/islands')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-slate-100 dark:border-neutral-900 shadow-sm">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Ad</label>
          <input required value={values.name} onChange={(e) => set('name', e.target.value)}
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

      <div>
        <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Tarihçe</label>
        <textarea rows={3} value={values.history} onChange={(e) => set('history', e.target.value)}
          className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-2.5 px-4 text-sm outline-none focus:border-sky-500" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Nüfus</label>
          <input type="number" value={values.population} onChange={(e) => set('population', e.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-2.5 px-4 text-sm outline-none focus:border-sky-500" />
        </div>
        <div>
          <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Enlem</label>
          <input type="number" step="any" value={values.latitude} onChange={(e) => set('latitude', e.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-2.5 px-4 text-sm outline-none focus:border-sky-500" />
        </div>
        <div>
          <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Boylam</label>
          <input type="number" step="any" value={values.longitude} onChange={(e) => set('longitude', e.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-2.5 px-4 text-sm outline-none focus:border-sky-500" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">En İyi Ziyaret Zamanı</label>
          <input value={values.best_time_to_visit} onChange={(e) => set('best_time_to_visit', e.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-2.5 px-4 text-sm outline-none focus:border-sky-500" />
        </div>
        <div>
          <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Bütçe Seviyesi</label>
          <select value={values.budget_level} onChange={(e) => set('budget_level', e.target.value as IslandFormValues['budget_level'])}
            className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-2.5 px-4 text-sm outline-none focus:border-sky-500">
            <option value="budget">Bütçe Dostu</option>
            <option value="mid">Orta Segment</option>
            <option value="luxury">Lüks</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Kapak Görseli URL</label>
        <input value={values.cover_image_url} onChange={(e) => set('cover_image_url', e.target.value)}
          className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-2.5 px-4 text-sm outline-none focus:border-sky-500" />
      </div>

      <label className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 cursor-pointer">
        <input type="checkbox" checked={values.is_published} onChange={(e) => set('is_published', e.target.checked)}
          className="rounded border-slate-300 text-sky-600 focus:ring-sky-500 h-4 w-4" />
        Yayında (herkese görünür)
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex items-center justify-between pt-2">
        <button type="submit" disabled={saving}
          className="rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-sky-500 transition-colors disabled:opacity-50">
          {saving ? 'Kaydediliyor...' : 'Kaydet'}
        </button>
        {initial?.id && (
          <button type="button" onClick={handleDelete}
            className="text-sm font-semibold text-red-600 hover:underline">
            Adayı Sil
          </button>
        )}
      </div>
    </form>
  )
}
