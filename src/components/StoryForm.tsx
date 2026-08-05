'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useLanguage } from '@/lib/i18n/LanguageProvider'

export function StoryForm({ islands }: { islands: { id: string; name: string }[] }) {
  const router = useRouter()
  const { locale } = useLanguage()
  const [userId, setUserId] = useState<string | null>(null)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [islandId, setIslandId] = useState('')
  const [coverImageUrl, setCoverImageUrl] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const t = {
    titleTooShort: locale === 'en' ? 'Title must be at least 5 characters.' : locale === 'el' ? 'Ο τίτλος πρέπει να έχει τουλάχιστον 5 χαρακτήρες.' : 'Başlık en az 5 karakter olmalı.',
    contentTooShort: locale === 'en' ? 'Story must be at least 50 characters.' : locale === 'el' ? 'Η ιστορία πρέπει να έχει τουλάχιστον 50 χαρακτήρες.' : 'Hikaye en az 50 karakter olmalı.',
    saveFailed: locale === 'en' ? 'Story could not be saved, please try again.' : locale === 'el' ? 'Η ιστορία δεν ήταν δυνατό να αποθηκευτεί, δοκίμασε ξανά.' : 'Hikaye kaydedilemedi, lütfen tekrar dene.',
    loginPrompt: locale === 'en' ? 'You need to' : locale === 'el' ? 'Πρέπει να' : 'Hikaye paylaşmak için',
    loginLink: locale === 'en' ? 'sign in to share a story' : locale === 'el' ? 'συνδεθείς για να μοιραστείς μια ιστορία' : 'giriş yapmalısın',
    titleLabel: locale === 'en' ? 'Title' : locale === 'el' ? 'Τίτλος' : 'Başlık',
    titlePlaceholder: locale === 'en' ? 'e.g: An Unforgettable Sunset in Santorini' : locale === 'el' ? 'π.χ.: Ένα Αξέχαστο Ηλιοβασίλεμα στη Σαντορίνη' : 'Örn: Santorini\'de Unutulmaz Bir Gün Batımı',
    islandLabel: locale === 'en' ? 'Related Island (optional)' : locale === 'el' ? 'Σχετικό Νησί (προαιρετικό)' : 'İlgili Ada (opsiyonel)',
    notSelected: locale === 'en' ? 'Not selected' : locale === 'el' ? 'Δεν επιλέχθηκε' : 'Seçilmedi',
    coverLabel: locale === 'en' ? 'Cover Image URL (optional)' : locale === 'el' ? 'URL Εικόνας Εξωφύλλου (προαιρετικό)' : 'Kapak Görseli URL\'i (opsiyonel)',
    storyLabel: locale === 'en' ? 'Your Story' : locale === 'el' ? 'Η Ιστορία σου' : 'Hikayen',
    storyPlaceholder: locale === 'en' ? 'Tell us about your experience...' : locale === 'el' ? 'Πες μας για την εμπειρία σου...' : 'Deneyimini anlat...',
    submitting: locale === 'en' ? 'Sharing...' : locale === 'el' ? 'Μοιράζεται...' : 'Paylaşılıyor...',
    submit: locale === 'en' ? 'Share Story' : locale === 'el' ? 'Μοιράσου την Ιστορία' : 'Hikayeyi Paylaş',
  }

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
    if (title.trim().length < 5) { setError(t.titleTooShort); return }
    if (content.trim().length < 50) { setError(t.contentTooShort); return }

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
      setError(t.saveFailed)
      return
    }

    router.push(`/gezi-hikayeleri/${data.id}`)
  }

  if (checkingAuth) return null

  if (!userId) {
    return (
      <div className="mt-8 bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-slate-100 dark:border-neutral-900 shadow-sm text-center">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {t.loginPrompt} <a href="/login?next=/gezi-hikayeleri/yeni" className="text-sky-600 font-medium hover:underline">{t.loginLink}</a>.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5 bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-slate-100 dark:border-neutral-900 shadow-sm">
      <div>
        <label className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">{t.titleLabel}</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={t.titlePlaceholder}
          className="mt-1.5 w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 px-4 py-2.5 text-sm outline-none focus:border-sky-500 transition-all"
        />
      </div>

      <div>
        <label className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">{t.islandLabel}</label>
        <select
          value={islandId}
          onChange={(e) => setIslandId(e.target.value)}
          className="mt-1.5 w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 px-4 py-2.5 text-sm outline-none focus:border-sky-500 transition-all"
        >
          <option value="">{t.notSelected}</option>
          {islands.map((i) => (
            <option key={i.id} value={i.id}>{i.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">{t.coverLabel}</label>
        <input
          value={coverImageUrl}
          onChange={(e) => setCoverImageUrl(e.target.value)}
          placeholder="https://..."
          className="mt-1.5 w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 px-4 py-2.5 text-sm outline-none focus:border-sky-500 transition-all"
        />
      </div>

      <div>
        <label className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">{t.storyLabel}</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={t.storyPlaceholder}
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
        {submitting ? t.submitting : t.submit}
      </button>
    </form>
  )
}
