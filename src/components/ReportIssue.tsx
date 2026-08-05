'use client'

import { useState } from 'react'
import { useLanguage } from '@/lib/i18n/LanguageProvider'

type EntityType = 'island' | 'beach' | 'restaurant' | 'hotel' | 'attraction'

export function ReportIssue({ entityType, entityId }: { entityType: EntityType; entityId: string }) {
  const { locale } = useLanguage()
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [website, setWebsite] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const t = {
    trigger: locale === 'en' ? '⚠️ Report incorrect info' : locale === 'el' ? '⚠️ Αναφορά λάθους' : '⚠️ Hatalı bilgi bildir',
    placeholder: locale === 'en' ? 'What\'s wrong with this page?' : locale === 'el' ? 'Τι είναι λάθος σε αυτή τη σελίδα;' : 'Bu sayfada ne yanlış?',
    send: locale === 'en' ? 'Send' : locale === 'el' ? 'Αποστολή' : 'Gönder',
    sending: locale === 'en' ? 'Sending...' : locale === 'el' ? 'Αποστολή...' : 'Gönderiliyor...',
    success: locale === 'en' ? 'Thanks, we\'ll take a look!' : locale === 'el' ? 'Ευχαριστούμε, θα το ελέγξουμε!' : 'Teşekkürler, kontrol edeceğiz!',
    error: locale === 'en' ? 'Something went wrong.' : locale === 'el' ? 'Κάτι πήγε στραβά.' : 'Bir şeyler ters gitti.',
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return
    setStatus('submitting')

    try {
      const res = await fetch('/api/report-issue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entityType, entityId, message, website }),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      setMessage('')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">✓ {t.success}</p>
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="text-xs text-neutral-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors underline-offset-2 hover:underline"
      >
        {t.trigger}
      </button>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-sm">
      {/* Honeypot: gerçek kullanıcılar görmez */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="hidden"
        aria-hidden="true"
      />
      <textarea
        autoFocus
        required
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={t.placeholder}
        rows={2}
        className="rounded-lg border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 px-3 py-2 text-xs outline-none focus:border-amber-500 transition-all"
      />
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-400 transition-colors disabled:opacity-50"
        >
          {status === 'submitting' ? t.sending : t.send}
        </button>
        <button type="button" onClick={() => setOpen(false)} className="text-xs text-neutral-400 hover:text-neutral-600">
          ✕
        </button>
      </div>
      {status === 'error' && <p className="text-xs text-red-500">{t.error}</p>}
    </form>
  )
}
