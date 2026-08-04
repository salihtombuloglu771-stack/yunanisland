'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

type EntityType = 'island' | 'beach' | 'restaurant' | 'hotel' | 'attraction'

export function PhotoContribution({ entityType, entityId }: { entityType: EntityType; entityId: string }) {
  const [userId, setUserId] = useState<string | null>(null)
  const [url, setUrl] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    createClient().auth.getUser().then(({ data }) => setUserId(data.user?.id ?? null))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!userId || !url.trim()) return
    setSubmitting(true)

    const supabase = createClient()
    await supabase.from('media').insert({
      entity_type: entityType,
      entity_id: entityId,
      url: url.trim(),
      media_type: 'photo',
      submitted_by: userId,
      status: 'pending',
    })

    setUrl('')
    setSubmitting(false)
    setSent(true)
  }

  if (!userId) {
    return (
      <p className="mt-4 text-sm text-neutral-500">
        Kendi fotoğrafını eklemek için <a href="/login" className="text-sky-600 font-medium hover:underline">giriş yap</a>.
      </p>
    )
  }

  return (
    <div className="mt-4">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <input
          type="url"
          required
          value={url}
          onChange={(e) => { setUrl(e.target.value); setSent(false) }}
          placeholder="Kendi fotoğrafının bağlantısını ekle..."
          className="flex-1 rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 px-4 py-2.5 text-sm outline-none focus:border-sky-500 transition-all"
        />
        <button
          type="submit"
          disabled={submitting}
          className="rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-sky-500 transition-colors disabled:opacity-50 whitespace-nowrap"
        >
          {submitting ? 'Gönderiliyor...' : sent ? 'Gönderildi ✓' : 'Fotoğraf Gönder'}
        </button>
      </form>
      <p className="mt-1.5 text-xs text-neutral-400">Onaylandıktan sonra galeride görünecek.</p>
    </div>
  )
}
