'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

interface IslandOption { id: string; name: string }

interface BeachFormValues {
  island_id: string
  name: string
  slug: string
  description: string
  beach_type: 'sand' | 'pebble' | 'mixed'
  water_depth: string
  crowd_level: 'low' | 'medium' | 'high'
  family_friendly: boolean
  pet_friendly: boolean
  blue_flag: boolean
  sunbed_price: string
  umbrella_price: string
  has_parking: boolean
  has_showers: boolean
  has_toilets: boolean
  has_beach_bar: boolean
  has_lifeguard: boolean
  accessibility: string
  sunset_rating: string
  latitude: string
  longitude: string
  cover_image_url: string
}

const EMPTY: BeachFormValues = {
  island_id: '',
  name: '',
  slug: '',
  description: '',
  beach_type: 'sand',
  water_depth: 'medium',
  crowd_level: 'medium',
  family_friendly: true,
  pet_friendly: false,
  blue_flag: false,
  sunbed_price: '',
  umbrella_price: '',
  has_parking: false,
  has_showers: false,
  has_toilets: false,
  has_beach_bar: false,
  has_lifeguard: false,
  accessibility: '',
  sunset_rating: '',
  latitude: '',
  longitude: '',
  cover_image_url: '',
}

export function BeachForm({ islands, initial }: { islands: IslandOption[]; initial?: Partial<BeachFormValues> & { id: string } }) {
  const router = useRouter()
  const [values, setValues] = useState<BeachFormValues>({ ...EMPTY, island_id: islands[0]?.id ?? '', ...initial })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const set = <K extends keyof BeachFormValues>(key: K, value: BeachFormValues[K]) =>
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
      description: values.description || null,
      beach_type: values.beach_type,
      water_depth: values.water_depth || null,
      crowd_level: values.crowd_level,
      family_friendly: values.family_friendly,
      pet_friendly: values.pet_friendly,
      blue_flag: values.blue_flag,
      sunbed_price: values.sunbed_price ? Number(values.sunbed_price) : null,
      umbrella_price: values.umbrella_price ? Number(values.umbrella_price) : null,
      has_parking: values.has_parking,
      has_showers: values.has_showers,
      has_toilets: values.has_toilets,
      has_beach_bar: values.has_beach_bar,
      has_lifeguard: values.has_lifeguard,
      accessibility: values.accessibility || null,
      sunset_rating: values.sunset_rating ? Number(values.sunset_rating) : null,
      latitude: values.latitude ? Number(values.latitude) : null,
      longitude: values.longitude ? Number(values.longitude) : null,
      cover_image_url: values.cover_image_url || null,
    }

    const result = initial?.id
      ? await supabase.from('beaches').update(payload).eq('id', initial.id)
      : await supabase.from('beaches').insert(payload)

    if (result.error) {
      setError(result.error.message)
      setSaving(false)
      return
    }

    router.push('/admin/beaches')
    router.refresh()
  }

  const handleDelete = async () => {
    if (!initial?.id) return
    if (!confirm(`"${values.name}" plajını silmek istediğine emin misin?`)) return
    const supabase = createClient()
    await supabase.from('beaches').delete().eq('id', initial.id)
    router.push('/admin/beaches')
    router.refresh()
  }

  const checkboxes: { key: keyof BeachFormValues; label: string }[] = [
    { key: 'family_friendly', label: 'Aile Dostu' },
    { key: 'pet_friendly', label: 'Evcil Hayvan Dostu' },
    { key: 'blue_flag', label: 'Mavi Bayrak' },
    { key: 'has_parking', label: 'Otopark' },
    { key: 'has_showers', label: 'Duş' },
    { key: 'has_toilets', label: 'Tuvalet' },
    { key: 'has_beach_bar', label: 'Plaj Bar' },
    { key: 'has_lifeguard', label: 'Cankurtaran' },
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

      <div>
        <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Açıklama</label>
        <textarea rows={3} value={values.description} onChange={(e) => set('description', e.target.value)}
          className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-2.5 px-4 text-sm outline-none focus:border-sky-500" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Plaj Tipi</label>
          <select value={values.beach_type} onChange={(e) => set('beach_type', e.target.value as BeachFormValues['beach_type'])}
            className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-2.5 px-4 text-sm outline-none focus:border-sky-500">
            <option value="sand">Kumluk</option>
            <option value="pebble">Çakıllık</option>
            <option value="mixed">Karışık</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Kalabalıklık</label>
          <select value={values.crowd_level} onChange={(e) => set('crowd_level', e.target.value as BeachFormValues['crowd_level'])}
            className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-2.5 px-4 text-sm outline-none focus:border-sky-500">
            <option value="low">Az</option>
            <option value="medium">Orta</option>
            <option value="high">Yoğun</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Gün Batımı (1-5)</label>
          <input type="number" min={1} max={5} value={values.sunset_rating} onChange={(e) => set('sunset_rating', e.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-2.5 px-4 text-sm outline-none focus:border-sky-500" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Şezlong Fiyatı (€)</label>
          <input type="number" value={values.sunbed_price} onChange={(e) => set('sunbed_price', e.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-2.5 px-4 text-sm outline-none focus:border-sky-500" />
        </div>
        <div>
          <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Şemsiye Fiyatı (€)</label>
          <input type="number" value={values.umbrella_price} onChange={(e) => set('umbrella_price', e.target.value)}
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
        <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Erişilebilirlik Notu</label>
        <input value={values.accessibility} onChange={(e) => set('accessibility', e.target.value)}
          className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-2.5 px-4 text-sm outline-none focus:border-sky-500" />
      </div>

      <div>
        <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Kapak Görseli URL</label>
        <input value={values.cover_image_url} onChange={(e) => set('cover_image_url', e.target.value)}
          className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-2.5 px-4 text-sm outline-none focus:border-sky-500" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 border-t border-slate-100 dark:border-neutral-800 pt-4">
        {checkboxes.map(({ key, label }) => (
          <label key={key} className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 cursor-pointer">
            <input type="checkbox" checked={values[key] as boolean} onChange={(e) => set(key, e.target.checked as BeachFormValues[typeof key])}
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
            Plajı Sil
          </button>
        )}
      </div>
    </form>
  )
}
