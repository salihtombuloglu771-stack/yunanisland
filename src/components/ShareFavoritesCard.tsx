'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useLanguage } from '@/lib/i18n/LanguageProvider'

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://yunanisland.vercel.app'

export function ShareFavoritesCard({ initialToken }: { initialToken: string | null }) {
  const { locale } = useLanguage()
  const [token, setToken] = useState(initialToken)
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const t = {
    title: locale === 'en' ? '🔗 My Greece List' : locale === 'el' ? '🔗 Η Λίστα μου για την Ελλάδα' : '🔗 Benim Yunanistan Listem',
    description: locale === 'en'
      ? 'Share your favorite islands, beaches, restaurants, hotels and places with a public link.'
      : locale === 'el'
      ? 'Μοιραστείτε τα αγαπημένα σας νησιά, παραλίες, εστιατόρια, ξενοδοχεία και μέρη με ένα δημόσιο σύνδεσμο.'
      : 'Favori adalarını, plajlarını, restoranlarını, otellerini ve gezilecek yerlerini herkese açık bir linkle paylaş.',
    create: locale === 'en' ? 'Create Shareable Link' : locale === 'el' ? 'Δημιουργία Συνδέσμου' : 'Paylaşılabilir Link Oluştur',
    copy: locale === 'en' ? 'Copy' : locale === 'el' ? 'Αντιγραφή' : 'Kopyala',
    copied: locale === 'en' ? 'Copied!' : locale === 'el' ? 'Αντιγράφηκε!' : 'Kopyalandı!',
    revoke: locale === 'en' ? 'Revoke Link' : locale === 'el' ? 'Ανάκληση Συνδέσμου' : 'Linki İptal Et',
  }

  const shareUrl = token ? `${SITE_URL}/liste/${token}` : null

  const handleCreate = async () => {
    setLoading(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setLoading(false); return }

    const { data, error } = await supabase
      .from('share_tokens')
      .insert({ user_id: user.id })
      .select('token')
      .single()

    if (!error && data) setToken(data.token)
    setLoading(false)
  }

  const handleRevoke = async () => {
    setLoading(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      await supabase.from('share_tokens').delete().eq('user_id', user.id)
    }
    setToken(null)
    setLoading(false)
  }

  const handleCopy = async () => {
    if (!shareUrl) return
    await navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-white dark:bg-neutral-900 p-5 rounded-xl border border-slate-100 dark:border-neutral-900">
      <h3 className="font-bold text-neutral-900 dark:text-white">{t.title}</h3>
      <p className="mt-1 text-sm text-neutral-500">{t.description}</p>

      {shareUrl ? (
        <div className="mt-4 space-y-3">
          <div className="flex items-center gap-2 rounded-lg border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 p-2">
            <input readOnly value={shareUrl} className="flex-1 min-w-0 bg-transparent text-xs text-neutral-600 dark:text-neutral-400 outline-none" />
            <button onClick={handleCopy} className="shrink-0 rounded-md bg-sky-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-sky-500 transition-colors">
              {copied ? t.copied : t.copy}
            </button>
          </div>
          <button onClick={handleRevoke} disabled={loading} className="text-xs font-semibold text-rose-600 hover:underline disabled:opacity-50">
            {t.revoke}
          </button>
        </div>
      ) : (
        <button
          onClick={handleCreate}
          disabled={loading}
          className="mt-4 rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-sky-500 transition-colors disabled:opacity-50"
        >
          {t.create}
        </button>
      )}
    </div>
  )
}
