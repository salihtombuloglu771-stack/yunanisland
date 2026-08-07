'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

interface AdFormValues {
  title: string
  image_url: string
  link_url: string
  placement: string
  is_active: boolean
  starts_at: string
  ends_at: string
  priority: number
}

const EMPTY: AdFormValues = {
  title: '',
  image_url: '',
  link_url: '',
  placement: 'homepage',
  is_active: true,
  starts_at: '',
  ends_at: '',
  priority: 0,
}

export function AdvertisementForm({ initial }: { initial?: Partial<AdFormValues> & { id: string } }) {
  const router = useRouter()
  const [values, setValues] = useState<AdFormValues>({ ...EMPTY, ...initial })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const set = <K extends keyof AdFormValues>(key: K, value: AdFormValues[K]) =>
    setValues((v) => ({ ...v, [key]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    const supabase = createClient()
    const payload = {
      title: values.title,
      image_url: values.image_url || null,
      link_url: values.link_url || null,
      placement: values.placement || null,
      is_active: values.is_active,
      starts_at: values.starts_at || null,
      ends_at: values.ends_at || null,
      priority: values.priority,
    }

    const result = initial?.id
      ? await supabase.from('advertisements').update(payload).eq('id', initial.id)
      : await supabase.from('advertisements').insert(payload)

    if (result.error) {
      setError(result.error.message)
      setSaving(false)
      return
    }

    router.push('/admin/advertisements')
    router.refresh()
  }

  const handleDelete = async () => {
    if (!initial?.id) return
    if (!confirm(`"${values.title}" reklamını silmek istediğine emin misin?`)) return
    const supabase = createClient()
    await supabase.from('advertisements').delete().eq('id', initial.id)
    router.push('/admin/advertisements')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-slate-100 dark:border-neutral-900 shadow-sm">
      <div>
        <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Başlık</label>
        <input required value={values.title} onChange={(e) => set('title', e.target.value)}
          className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-2.5 px-4 text-sm outline-none focus:border-sky-500" />
      </div>

      <div>
        <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Görsel URL</label>
        <input value={values.image_url} onChange={(e) => set('image_url', e.target.value)}
          className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-2.5 px-4 text-sm outline-none focus:border-sky-500" />
      </div>

      <div>
        <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Bağlantı URL</label>
        <input value={values.link_url} onChange={(e) => set('link_url', e.target.value)}
          className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-2.5 px-4 text-sm outline-none focus:border-sky-500" />
      </div>

      <div>
        <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Yerleşim</label>
        <select value={values.placement} onChange={(e) => set('placement', e.target.value)}
          className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-2.5 px-4 text-sm outline-none focus:border-sky-500">
          <option value="homepage">Ana Sayfa</option>
          <option value="blog">Blog</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Öncelik</label>
        <input type="number" value={values.priority} onChange={(e) => set('priority', Number(e.target.value))}
          className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-2.5 px-4 text-sm outline-none focus:border-sky-500" />
        <p className="mt-1 text-xs text-neutral-400">Aynı yerleşimde birden fazla aktif reklam varsa, en yüksek öncelikli olan gösterilir.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Başlangıç Tarihi</label>
          <input type="date" value={values.starts_at} onChange={(e) => set('starts_at', e.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-2.5 px-4 text-sm outline-none focus:border-sky-500" />
        </div>
        <div>
          <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Bitiş Tarihi</label>
          <input type="date" value={values.ends_at} onChange={(e) => set('ends_at', e.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-2.5 px-4 text-sm outline-none focus:border-sky-500" />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 cursor-pointer">
        <input type="checkbox" checked={values.is_active} onChange={(e) => set('is_active', e.target.checked)}
          className="rounded border-slate-300 text-sky-600 focus:ring-sky-500 h-4 w-4" />
        Aktif
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex items-center justify-between pt-2">
        <button type="submit" disabled={saving}
          className="rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-sky-500 transition-colors disabled:opacity-50">
          {saving ? 'Kaydediliyor...' : 'Kaydet'}
        </button>
        {initial?.id && (
          <button type="button" onClick={handleDelete} className="text-sm font-semibold text-red-600 hover:underline">
            Reklamı Sil
          </button>
        )}
      </div>
    </form>
  )
}
