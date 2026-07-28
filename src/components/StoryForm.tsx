'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export function StoryForm({ islands }: { islands: { id: string; name: string }[] }) {
  const router = useRouter()
  const [userId, setUserId] = useState<string | null>(null)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [islandId, setIslandId] = useState('')
  const [coverImageUrl, setCoverImageUrl] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUserId(user?.id ?? null)
      setCheckingAuth(false)
    })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!userId) return
    if (title.trim().length < 5) { setError('Başlık en az 5 karakter olmalı.'); return }
    if (content.trim().length < 50) { setError('Hikaye en az 50 karakter olmalı.'); return }

    setError(null)
    setSubmitting(true)

    const supabase = createClient()
    const { data, error: insertError } = await supabase
      .from('travel_stories')
      .insert({
        user_id: userId,
        title: title.trim(),
        content: content.trim(),
        island_id: islandId || null,
        cover_image_url: coverImageUrl.trim() || null,
      })
      .select('id')
      .single()

    setSubmitting(false)

    if (insertError || !data) {
      setError('Hikaye kaydedilemedi, lütfen tekrar dene.')
      return
    }

    router.push(`/gezi-hikayeleri/${data.id}`)
  }

  if (checkingAuth) return null

  if (!userId) {
    return (
      <div className="mt-8 bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-slate-100 dark:border-neutral-900 shadow-sm text-center">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Hikaye paylaşmak için <a href="/login?next=/gezi-hikayeleri/yeni" className="text-sky-600 font-medium hover:underline">giriş yapmalısın</a>.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5 bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-slate-100 dark:border-neutral-900 shadow-sm">
      <div>
        <label className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">Başlık</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Örn: Santorini'de Unutulmaz Bir Gün Batımı"
          className="mt-1.5 w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 px-4 py-2.5 text-sm outline-none focus:border-sky-500 transition-all"
        />
      </div>

      <div>
        <label className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">İlgili Ada (opsiyonel)</label>
        <select
          value={islandId}
          onChange={(e) => setIslandId(e.target.value)}
          className="mt-1.5 w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 px-4 py-2.5 text-sm outline-none focus:border-sky-500 transition-all"
        >
          <option value="">Seçilmedi</option>
          {islands.map((i) => (
            <option key={i.id} value={i.id}>{i.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">Kapak Görseli URL&apos;i (opsiyonel)</label>
        <input
          value={coverImageUrl}
          onChange={(e) => setCoverImageUrl(e.target.value)}
          placeholder="https://..."
          className="mt-1.5 w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 px-4 py-2.5 text-sm outline-none focus:border-sky-500 transition-all"
        />
      </div>

      <div>
        <label className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">Hikayen</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Deneyimini anlat..."
          rows={10}
          className="mt-1.5 w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 px-4 py-2.5 text-sm outline-none focus:border-sky-500 transition-all"
        />
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-sky-500 transition-colors disabled:opacity-50"
      >
        {submitting ? 'Paylaşılıyor...' : 'Hikayeyi Paylaş'}
      </button>
    </form>
  )
}
