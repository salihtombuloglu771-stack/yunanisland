'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export function AdInquiryForm() {
  const [companyName, setCompanyName] = useState('')
  const [contactName, setContactName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [placementInterest, setPlacementInterest] = useState('')
  const [budgetRange, setBudgetRange] = useState('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (companyName.trim().length < 2 || contactName.trim().length < 2 || !email.includes('@')) {
      setError('Lütfen firma adı, yetkili adı ve geçerli bir e-posta girin.')
      return
    }

    setError(null)
    setSubmitting(true)

    const supabase = createClient()
    const { error: insertError } = await supabase.from('ad_inquiries').insert({
      company_name: companyName.trim(),
      contact_name: contactName.trim(),
      email: email.trim(),
      phone: phone.trim() || null,
      placement_interest: placementInterest || null,
      budget_range: budgetRange.trim() || null,
      message: message.trim() || null,
    })

    setSubmitting(false)

    if (insertError) {
      setError('Talebiniz gönderilemedi, lütfen tekrar deneyin.')
      return
    }

    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="mt-8 text-center py-12 rounded-2xl bg-white dark:bg-neutral-900 border border-slate-100 dark:border-neutral-900 shadow-sm">
        <span className="text-4xl">✅</span>
        <h3 className="mt-3 font-bold text-neutral-900 dark:text-white">Talebiniz Alındı</h3>
        <p className="mt-1 text-sm text-neutral-500">En kısa sürede e-posta adresinizden sizinle iletişime geçeceğiz.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4 bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-slate-100 dark:border-neutral-900 shadow-sm">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">Firma Adı</label>
          <input
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 px-4 py-2.5 text-sm outline-none focus:border-sky-500 transition-all"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">Yetkili Adı Soyadı</label>
          <input
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 px-4 py-2.5 text-sm outline-none focus:border-sky-500 transition-all"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">E-posta</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 px-4 py-2.5 text-sm outline-none focus:border-sky-500 transition-all"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">Telefon (opsiyonel)</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 px-4 py-2.5 text-sm outline-none focus:border-sky-500 transition-all"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">İlgilendiğiniz Alan (opsiyonel)</label>
          <select
            value={placementInterest}
            onChange={(e) => setPlacementInterest(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 px-4 py-2.5 text-sm outline-none focus:border-sky-500 transition-all"
          >
            <option value="">Seçilmedi</option>
            <option value="home">Ana Sayfa</option>
            <option value="blog">Gezi Blogu</option>
            <option value="other">Diğer / Emin Değilim</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">Bütçe Aralığı (opsiyonel)</label>
          <input
            value={budgetRange}
            onChange={(e) => setBudgetRange(e.target.value)}
            placeholder="Örn. 500-1000 TL/ay"
            className="mt-1.5 w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 px-4 py-2.5 text-sm outline-none focus:border-sky-500 transition-all"
          />
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">Mesajınız (opsiyonel)</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className="mt-1.5 w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 px-4 py-2.5 text-sm outline-none focus:border-sky-500 transition-all"
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-sky-500 transition-colors disabled:opacity-50"
      >
        {submitting ? 'Gönderiliyor...' : 'Talebi Gönder'}
      </button>
    </form>
  )
}
