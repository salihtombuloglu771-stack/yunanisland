'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { MediaItem } from '@/components/Gallery'

export function MediaManager({ islandId, initialItems }: { islandId: string; initialItems: MediaItem[] }) {
  const router = useRouter()
  const [items, setItems] = useState(initialItems)
  const [url, setUrl] = useState('')
  const [mediaType, setMediaType] = useState<MediaItem['media_type']>('photo')
  const [saving, setSaving] = useState(false)

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url.trim()) return
    setSaving(true)

    const supabase = createClient()
    const { data, error } = await supabase
      .from('media')
      .insert({ entity_type: 'island', entity_id: islandId, url: url.trim(), media_type: mediaType })
      .select('id, url, media_type')
      .single()

    if (!error && data) {
      setItems((prev) => [...prev, data])
      setUrl('')
    }
    setSaving(false)
    router.refresh()
  }

  const handleDelete = async (id: string) => {
    const supabase = createClient()
    await supabase.from('media').delete().eq('id', id)
    setItems((prev) => prev.filter((i) => i.id !== id))
    router.refresh()
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleAdd} className="bg-white dark:bg-neutral-900 p-5 rounded-2xl border border-slate-100 dark:border-neutral-900 shadow-sm flex flex-col sm:flex-row gap-3">
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Görsel/video URL"
          className="flex-1 rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-2.5 px-4 text-sm outline-none focus:border-sky-500"
        />
        <select
          value={mediaType}
          onChange={(e) => setMediaType(e.target.value as MediaItem['media_type'])}
          className="rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-2.5 px-4 text-sm outline-none focus:border-sky-500"
        >
          <option value="photo">Fotoğraf</option>
          <option value="video">Video</option>
          <option value="drone">Drone Görüntüsü</option>
        </select>
        <button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-sky-500 transition-colors disabled:opacity-50"
        >
          Ekle
        </button>
      </form>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {items.map((item) => (
          <div key={item.id} className="relative group">
            {item.media_type === 'photo' ? (
              // eslint-disable-next-line @next/next/no-img-element -- admin-entered arbitrary URLs
              <img src={item.url} alt="" className="aspect-square w-full rounded-xl object-cover bg-slate-100 dark:bg-neutral-800" />
            ) : (
              <div className="aspect-square w-full rounded-xl bg-slate-100 dark:bg-neutral-800 flex items-center justify-center text-xs text-neutral-500 p-2 text-center">
                {item.media_type === 'video' ? '🎥 Video' : '🚁 Drone'}
              </div>
            )}
            <button
              onClick={() => handleDelete(item.id)}
              className="absolute top-1.5 right-1.5 h-6 w-6 rounded-full bg-red-600 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
