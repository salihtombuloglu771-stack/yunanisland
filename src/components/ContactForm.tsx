'use client'

import { useState } from 'react'

export function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [website, setWebsite] = useState('') // honeypot — botlar doldurur, gerçek kullanıcılar görmez
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim().length < 2 || !email.includes('@') || message.trim().length < 5) {
      setError('Lütfen adınızı, geçerli bir e-posta ve mesajınızı girin.')
      return
    }

    setError(null)
    setSubmitting(true)

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim() || undefined,
        message: message.trim(),
        website,
      }),
    })

    setSubmitting(false)

    if (!res.ok) {
      setError('Mesajınız gönderilemedi, lütfen tekrar deneyin.')
      return
    }

    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="mt-8 text-center py-12 rounded-2xl bg-white dark:bg-neutral-900 border border-slate-100 dark:border-neutral-900 shadow-sm">
        <span className="text-4xl">✅</span>
        <h3 className="mt-3 font-bold text-neutral-900 dark:text-white">Mesajınız Alındı</h3>
        <p className="mt-1 text-sm text-neutral-500">En kısa sürede e-posta adresinizden size dönüş yapacağız.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4 bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-slate-100 dark:border-neutral-900 shadow-sm">
      <input
        type="text"
        name="website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="sr-only"
      />

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">Ad Soyad</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 px-4 py-2.5 text-sm outline-none focus:border-sky-500 transition-all"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">E-posta</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 px-4 py-2.5 text-sm outline-none focus:border-sky-500 transition-all"
          />
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">Konu (opsiyonel)</label>
        <input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="mt-1.5 w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 px-4 py-2.5 text-sm outline-none focus:border-sky-500 transition-all"
        />
      </div>

      <div>
        <label className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">Mesajınız</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          className="mt-1.5 w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 px-4 py-2.5 text-sm outline-none focus:border-sky-500 transition-all"
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-sky-500 transition-colors disabled:opacity-50"
      >
        {submitting ? 'Gönderiliyor...' : 'Mesajı Gönder'}
      </button>
    </form>
  )
}
