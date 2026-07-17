'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

interface FerryRouteFormValues {
  from_port: string
  to_port: string
  companies: string
  duration_minutes: string
  price_min: string
  price_max: string
}

const EMPTY: FerryRouteFormValues = {
  from_port: '',
  to_port: '',
  companies: '',
  duration_minutes: '',
  price_min: '',
  price_max: '',
}

export function FerryRouteForm({ initial }: { initial?: Partial<FerryRouteFormValues> & { id: string } }) {
  const router = useRouter()
  const [values, setValues] = useState<FerryRouteFormValues>({ ...EMPTY, ...initial })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const set = <K extends keyof FerryRouteFormValues>(key: K, value: FerryRouteFormValues[K]) =>
    setValues((v) => ({ ...v, [key]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    const supabase = createClient()
    const payload = {
      from_port: values.from_port,
      to_port: values.to_port,
      companies: values.companies.split(',').map((c) => c.trim()).filter(Boolean),
      duration_minutes: values.duration_minutes ? Number(values.duration_minutes) : null,
      price_min: values.price_min ? Number(values.price_min) : null,
      price_max: values.price_max ? Number(values.price_max) : null,
    }

    const result = initial?.id
      ? await supabase.from('ferry_routes').update(payload).eq('id', initial.id)
      : await supabase.from('ferry_routes').insert(payload)

    if (result.error) {
      setError(result.error.message)
      setSaving(false)
      return
    }

    router.push('/admin/ferry-routes')
    router.refresh()
  }

  const handleDelete = async () => {
    if (!initial?.id) return
    if (!confirm(`"${values.from_port} → ${values.to_port}" rotasını silmek istediğine emin misin?`)) return
    const supabase = createClient()
    await supabase.from('ferry_routes').delete().eq('id', initial.id)
    router.push('/admin/ferry-routes')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-slate-100 dark:border-neutral-900 shadow-sm">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Kalkış Limanı</label>
          <input required value={values.from_port} onChange={(e) => set('from_port', e.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-2.5 px-4 text-sm outline-none focus:border-sky-500" />
        </div>
        <div>
          <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Varış Limanı</label>
          <input required value={values.to_port} onChange={(e) => set('to_port', e.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-2.5 px-4 text-sm outline-none focus:border-sky-500" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Firmalar (virgülle ayır)</label>
        <input value={values.companies} onChange={(e) => set('companies', e.target.value)} placeholder="örn. Seajets, Blue Star Ferries"
          className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-2.5 px-4 text-sm outline-none focus:border-sky-500" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Süre (dakika)</label>
          <input type="number" value={values.duration_minutes} onChange={(e) => set('duration_minutes', e.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-2.5 px-4 text-sm outline-none focus:border-sky-500" />
        </div>
        <div>
          <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Min Fiyat (€)</label>
          <input type="number" value={values.price_min} onChange={(e) => set('price_min', e.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-2.5 px-4 text-sm outline-none focus:border-sky-500" />
        </div>
        <div>
          <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Max Fiyat (€)</label>
          <input type="number" value={values.price_max} onChange={(e) => set('price_max', e.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-2.5 px-4 text-sm outline-none focus:border-sky-500" />
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex items-center justify-between pt-2">
        <button type="submit" disabled={saving}
          className="rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-sky-500 transition-colors disabled:opacity-50">
          {saving ? 'Kaydediliyor...' : 'Kaydet'}
        </button>
        {initial?.id && (
          <button type="button" onClick={handleDelete} className="text-sm font-semibold text-red-600 hover:underline">
            Rotayı Sil
          </button>
        )}
      </div>
    </form>
  )
}
