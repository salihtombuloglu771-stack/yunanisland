'use client'

import { useState } from 'react'
import { useLanguage } from '@/lib/i18n/LanguageProvider'

export function NewsletterSignup() {
  const { locale } = useLanguage()
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const t = {
    title: locale === 'en' ? 'Get notified about new content' : locale === 'el' ? 'Ενημερωθείτε για νέο περιεχόμενο' : 'Yeni içeriklerden haberdar ol',
    placeholder: locale === 'en' ? 'you@example.com' : locale === 'el' ? 'you@example.com' : 'e-posta@ornek.com',
    subscribe: locale === 'en' ? 'Subscribe' : locale === 'el' ? 'Εγγραφή' : 'Abone Ol',
    submitting: locale === 'en' ? '...' : locale === 'el' ? '...' : '...',
    success: locale === 'en' ? 'Subscribed! Thanks.' : locale === 'el' ? 'Η εγγραφή ολοκληρώθηκε!' : 'Abone oldun, teşekkürler!',
    error: locale === 'en' ? 'Something went wrong, try again.' : locale === 'el' ? 'Κάτι πήγε στραβά, δοκιμάστε ξανά.' : 'Bir şeyler ters gitti, tekrar dene.',
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setStatus('submitting')

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, website }),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">✓ {t.success}</p>
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-2">
      <span className="text-xs text-neutral-500 dark:text-neutral-400 whitespace-nowrap">{t.title}</span>
      <div className="flex gap-2">
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
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t.placeholder}
          className="rounded-lg border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3 py-1.5 text-xs outline-none focus:border-sky-500 transition-all w-44"
        />
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="rounded-lg bg-sky-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-sky-500 transition-colors disabled:opacity-50 whitespace-nowrap"
        >
          {status === 'submitting' ? t.submitting : t.subscribe}
        </button>
      </div>
      {status === 'error' && <p className="text-xs text-red-500">{t.error}</p>}
    </form>
  )
}
