'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export interface AffiliateLinkItem {
  id: string
  provider: string
  url: string
  label: string | null
}

const PROVIDERS: { value: string; label: string }[] = [
  { value: 'car_rental', label: 'Araç Kiralama' },
  { value: 'transfer', label: 'Transfer' },
  { value: 'ferry', label: 'Feribot' },
  { value: 'flight', label: 'Uçak Bileti' },
  { value: 'hotel', label: 'Otel' },
  { value: 'tour', label: 'Tur' },
  { value: 'insurance', label: 'Sigorta' },
  { value: 'esim', label: 'eSIM' },
]

const PROVIDER_LABEL: Record<string, string> = Object.fromEntries(PROVIDERS.map((p) => [p.value, p.label]))

interface AffiliateLinkManagerProps {
  entityType: 'island' | 'beach' | 'restaurant' | 'hotel'
  entityId: string
  initialItems: AffiliateLinkItem[]
}

export function AffiliateLinkManager({ entityType, entityId, initialItems }: AffiliateLinkManagerProps) {
  const router = useRouter()
  const [items, setItems] = useState(initialItems)
  const [provider, setProvider] = useState('car_rental')
  const [url, setUrl] = useState('')
  const [label, setLabel] = useState('')
  const [saving, setSaving] = useState(false)

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url.trim()) return
    setSaving(true)

    const supabase = createClient()
    const { data, error } = await supabase
      .from('affiliate_links')
      .insert({ entity_type: entityType, entity_id: entityId, provider, url: url.trim(), label: label.trim() || null })
      .select('id, provider, url, label')
      .single()

    if (!error && data) {
      setItems((prev) => [...prev, data])
      setUrl('')
      setLabel('')
    }
    setSaving(false)
    router.refresh()
  }

  const handleDelete = async (id: string) => {
    const supabase = createClient()
    await supabase.from('affiliate_links').delete().eq('id', id)
    setItems((prev) => prev.filter((i) => i.id !== id))
    router.refresh()
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleAdd} className="bg-white dark:bg-neutral-900 p-5 rounded-2xl border border-slate-100 dark:border-neutral-900 shadow-sm flex flex-col sm:flex-row gap-3">
        <select
          value={provider}
          onChange={(e) => setProvider(e.target.value)}
          className="rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-2.5 px-4 text-sm outline-none focus:border-sky-500"
        >
          {PROVIDERS.map((p) => (
            <option key={p.value} value={p.value}>{p.label}</option>
          ))}
        </select>
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Affiliate/partner linki (https://...)"
          className="flex-1 rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-2.5 px-4 text-sm outline-none focus:border-sky-500"
        />
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Not (opsiyonel, sadece admin görür)"
          className="sm:w-56 rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-2.5 px-4 text-sm outline-none focus:border-sky-500"
        />
        <button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-sky-500 transition-colors disabled:opacity-50"
        >
          Ekle
        </button>
      </form>

      {items.length === 0 ? (
        <p className="text-sm text-neutral-500 dark:text-neutral-400">Henüz eklenmiş bir partner linki yok — eklenince ilgili sayfada otomatik görünecek.</p>
      ) : (
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-3 bg-white dark:bg-neutral-900 p-3.5 rounded-xl border border-slate-100 dark:border-neutral-900">
              <span className="text-xs font-semibold rounded-full bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300 px-2.5 py-1 shrink-0">
                {PROVIDER_LABEL[item.provider] ?? item.provider}
              </span>
              <a href={item.url} target="_blank" rel="noopener noreferrer" className="flex-1 text-sm text-neutral-700 dark:text-neutral-300 truncate hover:underline">
                {item.url}
              </a>
              {item.label && <span className="text-xs text-neutral-400 shrink-0">{item.label}</span>}
              <button
                onClick={() => handleDelete(item.id)}
                className="text-xs font-semibold text-red-600 hover:underline shrink-0"
              >
                Sil
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
