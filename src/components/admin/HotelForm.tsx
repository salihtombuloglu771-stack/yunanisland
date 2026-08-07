'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

interface IslandOption { id: string; name: string }

interface HotelFormValues {
  island_id: string
  name: string
  slug: string
  category: 'budget' | 'mid-range' | 'luxury'
  description: string
  price_range: string
  affiliate_link: string
  latitude: string
  longitude: string
  cover_image_url: string
  star_rating: string
  has_wifi: boolean
  has_pool: boolean
  has_breakfast: boolean
  beachfront: boolean
}

const EMPTY: HotelFormValues = {
  island_id: '',
  name: '',
  slug: '',
  category: 'mid-range',
  description: '',
  price_range: '',
  affiliate_link: '',
  latitude: '',
  longitude: '',
  cover_image_url: '',
  star_rating: '',
  has_wifi: false,
  has_pool: false,
  has_breakfast: false,
  beachfront: false,
}

export function HotelForm({ islands, initial }: { islands: IslandOption[]; initial?: Partial<HotelFormValues> & { id: string } }) {
  const router = useRouter()
  const [values, setValues] = useState<HotelFormValues>({ ...EMPTY, island_id: islands[0]?.id ?? '', ...initial })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const set = <K extends keyof HotelFormValues>(key: K, value: HotelFormValues[K]) =>
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
      price_range: values.price_range || null,
      affiliate_link: values.affiliate_link || null,
      latitude: values.latitude ? Number(values.latitude) : null,
      longitude: values.longitude ? Number(values.longitude) : null,
      cover_image_url: values.cover_image_url || null,
      star_rating: values.star_rating ? Number(values.star_rating) : null,
      has_wifi: values.has_wifi,
      has_pool: values.has_pool,
      has_breakfast: values.has_breakfast,
      beachfront: values.beachfront,
    }

    const result = initial?.id
      ? await supabase.from('hotels').update(payload).eq('id', initial.id)
      : await supabase.from('hotels').insert(payload)

    if (result.error) {
      setError(result.error.message)
      setSaving(false)
      return
    }

    router.push('/admin/hotels')
    router.refresh()
  }

  const handleDelete = async () => {
    if (!initial?.id) return
    if (!confirm(`"${values.name}" otelini silmek istediğine emin misin?`)) return
    const supabase = createClient()
    await supabase.from('hotels').delete().eq('id', initial.id)
    router.push('/admin/hotels')
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
        <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Açıklama</label>
        <textarea rows={3} value={values.description} onChange={(e) => set('description', e.target.value)}
          className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-2.5 px-4 text-sm outline-none focus:border-sky-500" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Kategori</label>
          <select value={values.category} onChange={(e) => set('category', e.target.value as HotelFormValues['category'])}
            className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-2.5 px-4 text-sm outline-none focus:border-sky-500">
            <option value="budget">Bütçe Dostu</option>
            <option value="mid-range">Orta Segment</option>
            <option value="luxury">Lüks</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Fiyat Aralığı</label>
          <input value={values.price_range} onChange={(e) => set('price_range', e.target.value)} placeholder="örn. 90-160 €/gece"
            className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-2.5 px-4 text-sm outline-none focus:border-sky-500" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Affiliate Link</label>
        <input value={values.affiliate_link} onChange={(e) => set('affiliate_link', e.target.value)}
          className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-2.5 px-4 text-sm outline-none focus:border-sky-500" />
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

      <div>
        <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Yıldız (1-5)</label>
        <select value={values.star_rating} onChange={(e) => set('star_rating', e.target.value)}
          className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-2.5 px-4 text-sm outline-none focus:border-sky-500">
          <option value="">Belirtilmedi</option>
          {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{'★'.repeat(n)}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <label className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 cursor-pointer">
          <input type="checkbox" checked={values.has_wifi} onChange={(e) => set('has_wifi', e.target.checked)}
            className="rounded border-slate-300 text-sky-600 focus:ring-sky-500 h-4 w-4" />
          📶 Wifi
        </label>
        <label className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 cursor-pointer">
          <input type="checkbox" checked={values.has_pool} onChange={(e) => set('has_pool', e.target.checked)}
            className="rounded border-slate-300 text-sky-600 focus:ring-sky-500 h-4 w-4" />
          🏊 Havuz
        </label>
        <label className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 cursor-pointer">
          <input type="checkbox" checked={values.has_breakfast} onChange={(e) => set('has_breakfast', e.target.checked)}
            className="rounded border-slate-300 text-sky-600 focus:ring-sky-500 h-4 w-4" />
          🍳 Kahvaltı Dahil
        </label>
        <label className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 cursor-pointer">
          <input type="checkbox" checked={values.beachfront} onChange={(e) => set('beachfront', e.target.checked)}
            className="rounded border-slate-300 text-sky-600 focus:ring-sky-500 h-4 w-4" />
          🏖️ Plaja Sıfır
        </label>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex items-center justify-between pt-2">
        <button type="submit" disabled={saving}
          className="rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-sky-500 transition-colors disabled:opacity-50">
          {saving ? 'Kaydediliyor...' : 'Kaydet'}
        </button>
        {initial?.id && (
          <button type="button" onClick={handleDelete} className="text-sm font-semibold text-red-600 hover:underline">
            Oteli Sil
          </button>
        )}
      </div>
    </form>
  )
}
