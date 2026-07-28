'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

interface IslandOption { id: string; name: string }

type Category = 'archaeological' | 'viewpoint' | 'museum' | 'church' | 'nature' | 'village' | 'castle' | 'landmark'

interface AttractionFormValues {
  island_id: string
  name: string
  slug: string
  category: Category
  description: string
  opening_hours: string
  ticket_price: string
  latitude: string
  longitude: string
  cover_image_url: string
}

const EMPTY: AttractionFormValues = {
  island_id: '',
  name: '',
  slug: '',
  category: 'landmark',
  description: '',
  opening_hours: '',
  ticket_price: '',
  latitude: '',
  longitude: '',
  cover_image_url: '',
}

const CATEGORY_OPTIONS: { value: Category; label: string }[] = [
  { value: 'archaeological', label: '🏛️ Antik Kalıntı' },
  { value: 'viewpoint', label: '🌅 Manzara Noktası' },
  { value: 'museum', label: '🖼️ Müze' },
  { value: 'church', label: '⛪ Kilise' },
  { value: 'nature', label: '🌿 Doğa' },
  { value: 'village', label: '🏘️ Köy' },
  { value: 'castle', label: '🏰 Kale' },
  { value: 'landmark', label: '📍 Simge Yapı' },
]

export function AttractionForm({ islands, initial }: { islands: IslandOption[]; initial?: Partial<AttractionFormValues> & { id: string } }) {
  const router = useRouter()
  const [values, setValues] = useState<AttractionFormValues>({ ...EMPTY, island_id: islands[0]?.id ?? '', ...initial })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const set = <K extends keyof AttractionFormValues>(key: K, value: AttractionFormValues[K]) =>
    setValues((v) => ({ ...v, [key]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    const supabase = createClient()
    const payload = {
      island_id: values.island_id,
      name: values.name,
      slug: values.slug,
      category: values.category,
      description: values.description || null,
      opening_hours: values.opening_hours || null,
      ticket_price: values.ticket_price || null,
      latitude: values.latitude ? Number(values.latitude) : null,
      longitude: values.longitude ? Number(values.longitude) : null,
      cover_image_url: values.cover_image_url || null,
    }

    const result = initial?.id
      ? await supabase.from('attractions').update(payload).eq('id', initial.id)
      : await supabase.from('attractions').insert(payload)

    if (result.error) {
      setError(result.error.message)
      setSaving(false)
      return
    }

    router.push('/admin/attractions')
    router.refresh()
  }

  const handleDelete = async () => {
    if (!initial?.id) return
    if (!confirm(`"${values.name}" yerini silmek istediğine emin misin?`)) return
    const supabase = createClient()
    await supabase.from('attractions').delete().eq('id', initial.id)
    router.push('/admin/attractions')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-slate-100 dark:border-neutral-900 shadow-sm">
      <div>
        <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Ada</label>
        <select value={values.island_id} onChange={(e) => set('island_id', e.target.value)}
          className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-2.5 px-4 text-sm outline-none focus:border-sky-500">
          {islands.map((i) => <option key={i.id} value={i.id}>{i.name}</option>)}
        </select>
      </div>

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
        <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Kategori</label>
        <select value={values.category} onChange={(e) => set('category', e.target.value as Category)}
          className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-2.5 px-4 text-sm outline-none focus:border-sky-500">
          {CATEGORY_OPTIONS.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
        </select>
      </div>

      <div>
        <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Açıklama</label>
        <textarea rows={3} value={values.description} onChange={(e) => set('description', e.target.value)}
          className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-2.5 px-4 text-sm outline-none focus:border-sky-500" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Ziyaret Saatleri</label>
          <input value={values.opening_hours} onChange={(e) => set('opening_hours', e.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-2.5 px-4 text-sm outline-none focus:border-sky-500" />
        </div>
        <div>
          <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Giriş Ücreti</label>
          <input value={values.ticket_price} onChange={(e) => set('ticket_price', e.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-2.5 px-4 text-sm outline-none focus:border-sky-500" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
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

      <div>
        <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Kapak Görseli URL</label>
        <input value={values.cover_image_url} onChange={(e) => set('cover_image_url', e.target.value)}
          className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-2.5 px-4 text-sm outline-none focus:border-sky-500" />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex items-center justify-between pt-2">
        <button type="submit" disabled={saving}
          className="rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-sky-500 transition-colors disabled:opacity-50">
          {saving ? 'Kaydediliyor...' : 'Kaydet'}
        </button>
        {initial?.id && (
          <button type="button" onClick={handleDelete} className="text-sm font-semibold text-red-600 hover:underline">
            Yeri Sil
          </button>
        )}
      </div>
    </form>
  )
}
