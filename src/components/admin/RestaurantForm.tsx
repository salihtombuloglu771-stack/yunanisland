'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

interface IslandOption { id: string; name: string }

interface RestaurantFormValues {
  island_id: string
  name: string
  slug: string
  cuisine: string
  price_level: 'budget' | 'mid' | 'expensive'
  average_cost: string
  opening_hours: string
  phone: string
  website: string
  vegetarian: boolean
  vegan: boolean
  gluten_free: boolean
  sea_view: boolean
  outdoor_seating: boolean
  family_friendly: boolean
  latitude: string
  longitude: string
  cover_image_url: string
}

const EMPTY: RestaurantFormValues = {
  island_id: '',
  name: '',
  slug: '',
  cuisine: '',
  price_level: 'mid',
  average_cost: '',
  opening_hours: '',
  phone: '',
  website: '',
  vegetarian: false,
  vegan: false,
  gluten_free: false,
  sea_view: false,
  outdoor_seating: false,
  family_friendly: true,
  latitude: '',
  longitude: '',
  cover_image_url: '',
}

export function RestaurantForm({ islands, initial }: { islands: IslandOption[]; initial?: Partial<RestaurantFormValues> & { id: string } }) {
  const router = useRouter()
  const [values, setValues] = useState<RestaurantFormValues>({ ...EMPTY, island_id: islands[0]?.id ?? '', ...initial })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const set = <K extends keyof RestaurantFormValues>(key: K, value: RestaurantFormValues[K]) =>
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
      cuisine: values.cuisine || null,
      price_level: values.price_level,
      average_cost: values.average_cost ? Number(values.average_cost) : null,
      opening_hours: values.opening_hours || null,
      phone: values.phone || null,
      website: values.website || null,
      vegetarian: values.vegetarian,
      vegan: values.vegan,
      gluten_free: values.gluten_free,
      sea_view: values.sea_view,
      outdoor_seating: values.outdoor_seating,
      family_friendly: values.family_friendly,
      latitude: values.latitude ? Number(values.latitude) : null,
      longitude: values.longitude ? Number(values.longitude) : null,
      cover_image_url: values.cover_image_url || null,
    }

    const result = initial?.id
      ? await supabase.from('restaurants').update(payload).eq('id', initial.id)
      : await supabase.from('restaurants').insert(payload)

    if (result.error) {
      setError(result.error.message)
      setSaving(false)
      return
    }

    router.push('/admin/restaurants')
    router.refresh()
  }

  const handleDelete = async () => {
    if (!initial?.id) return
    if (!confirm(`"${values.name}" restoranını silmek istediğine emin misin?`)) return
    const supabase = createClient()
    await supabase.from('restaurants').delete().eq('id', initial.id)
    router.push('/admin/restaurants')
    router.refresh()
  }

  const checkboxes: { key: keyof RestaurantFormValues; label: string }[] = [
    { key: 'vegetarian', label: 'Vejetaryen' },
    { key: 'vegan', label: 'Vegan' },
    { key: 'gluten_free', label: 'Glütensiz' },
    { key: 'sea_view', label: 'Deniz Manzarası' },
    { key: 'outdoor_seating', label: 'Açık Hava Alanı' },
    { key: 'family_friendly', label: 'Aile Dostu' },
  ]

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

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Mutfak</label>
          <input value={values.cuisine} onChange={(e) => set('cuisine', e.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-2.5 px-4 text-sm outline-none focus:border-sky-500" />
        </div>
        <div>
          <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Fiyat Seviyesi</label>
          <select value={values.price_level} onChange={(e) => set('price_level', e.target.value as RestaurantFormValues['price_level'])}
            className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-2.5 px-4 text-sm outline-none focus:border-sky-500">
            <option value="budget">Bütçe Dostu</option>
            <option value="mid">Orta Segment</option>
            <option value="expensive">Lüks / Gurme</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Ortalama Fiyat (€)</label>
          <input type="number" value={values.average_cost} onChange={(e) => set('average_cost', e.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-2.5 px-4 text-sm outline-none focus:border-sky-500" />
        </div>
        <div>
          <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Çalışma Saatleri</label>
          <input value={values.opening_hours} onChange={(e) => set('opening_hours', e.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-2.5 px-4 text-sm outline-none focus:border-sky-500" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Telefon</label>
          <input value={values.phone} onChange={(e) => set('phone', e.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-2.5 px-4 text-sm outline-none focus:border-sky-500" />
        </div>
        <div>
          <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Website</label>
          <input value={values.website} onChange={(e) => set('website', e.target.value)}
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

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 border-t border-slate-100 dark:border-neutral-800 pt-4">
        {checkboxes.map(({ key, label }) => (
          <label key={key} className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 cursor-pointer">
            <input type="checkbox" checked={values[key] as boolean} onChange={(e) => set(key, e.target.checked as RestaurantFormValues[typeof key])}
              className="rounded border-slate-300 text-sky-600 focus:ring-sky-500 h-4 w-4" />
            {label}
          </label>
        ))}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex items-center justify-between pt-2">
        <button type="submit" disabled={saving}
          className="rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-sky-500 transition-colors disabled:opacity-50">
          {saving ? 'Kaydediliyor...' : 'Kaydet'}
        </button>
        {initial?.id && (
          <button type="button" onClick={handleDelete} className="text-sm font-semibold text-red-600 hover:underline">
            Restoranı Sil
          </button>
        )}
      </div>
    </form>
  )
}
