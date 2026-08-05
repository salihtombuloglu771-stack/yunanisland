'use client'

import { useState } from 'react'
import { useLanguage } from '@/lib/i18n/LanguageProvider'

export function AdInquiryForm() {
  const { locale } = useLanguage()
  const [companyName, setCompanyName] = useState('')
  const [contactName, setContactName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [placementInterest, setPlacementInterest] = useState('')
  const [budgetRange, setBudgetRange] = useState('')
  const [message, setMessage] = useState('')
  const [website, setWebsite] = useState('') // honeypot — botlar doldurur, gerçek kullanıcılar görmez
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const t = {
    validation: locale === 'en' ? 'Please enter the company name, contact name and a valid email.' : locale === 'el' ? 'Παρακαλώ εισάγετε την επωνυμία εταιρείας, το όνομα επικοινωνίας και ένα έγκυρο email.' : 'Lütfen firma adı, yetkili adı ve geçerli bir e-posta girin.',
    sendFailed: locale === 'en' ? 'Your request could not be sent, please try again.' : locale === 'el' ? 'Το αίτημά σας δεν ήταν δυνατό να σταλεί, δοκιμάστε ξανά.' : 'Talebiniz gönderilemedi, lütfen tekrar deneyin.',
    received: locale === 'en' ? 'Your Request Was Received' : locale === 'el' ? 'Το Αίτημά σας Ελήφθη' : 'Talebiniz Alındı',
    receivedSubtitle: locale === 'en' ? 'We will contact you via your email address as soon as possible.' : locale === 'el' ? 'Θα επικοινωνήσουμε μαζί σας μέσω του email σας το συντομότερο δυνατό.' : 'En kısa sürede e-posta adresinizden sizinle iletişime geçeceğiz.',
    companyLabel: locale === 'en' ? 'Company Name' : locale === 'el' ? 'Επωνυμία Εταιρείας' : 'Firma Adı',
    contactLabel: locale === 'en' ? 'Contact Full Name' : locale === 'el' ? 'Ονοματεπώνυμο Επικοινωνίας' : 'Yetkili Adı Soyadı',
    emailLabel: locale === 'en' ? 'Email' : locale === 'el' ? 'Email' : 'E-posta',
    phoneLabel: locale === 'en' ? 'Phone (optional)' : locale === 'el' ? 'Τηλέφωνο (προαιρετικό)' : 'Telefon (opsiyonel)',
    placementLabel: locale === 'en' ? 'Area of Interest (optional)' : locale === 'el' ? 'Τομέας Ενδιαφέροντος (προαιρετικό)' : 'İlgilendiğiniz Alan (opsiyonel)',
    notSelected: locale === 'en' ? 'Not selected' : locale === 'el' ? 'Δεν επιλέχθηκε' : 'Seçilmedi',
    placementHome: locale === 'en' ? 'Homepage' : locale === 'el' ? 'Αρχική Σελίδα' : 'Ana Sayfa',
    placementBlog: locale === 'en' ? 'Travel Blog' : locale === 'el' ? 'Ταξιδιωτικό Blog' : 'Gezi Blogu',
    placementOther: locale === 'en' ? 'Other / Not Sure' : locale === 'el' ? 'Άλλο / Δεν Είμαι Σίγουρος' : 'Diğer / Emin Değilim',
    budgetLabel: locale === 'en' ? 'Budget Range (optional)' : locale === 'el' ? 'Εύρος Προϋπολογισμού (προαιρετικό)' : 'Bütçe Aralığı (opsiyonel)',
    budgetPlaceholder: locale === 'en' ? 'e.g. €500-1000/mo' : locale === 'el' ? 'π.χ. 500-1000€/μήνα' : 'Örn. 500-1000 TL/ay',
    messageLabel: locale === 'en' ? 'Your Message (optional)' : locale === 'el' ? 'Το Μήνυμά σας (προαιρετικό)' : 'Mesajınız (opsiyonel)',
    sending: locale === 'en' ? 'Sending...' : locale === 'el' ? 'Αποστολή...' : 'Gönderiliyor...',
    send: locale === 'en' ? 'Send Request' : locale === 'el' ? 'Αποστολή Αιτήματος' : 'Talebi Gönder',
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (companyName.trim().length < 2 || contactName.trim().length < 2 || !email.includes('@')) {
      setError(t.validation)
      return
    }

    setError(null)
    setSubmitting(true)

    const res = await fetch('/api/ad-inquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        companyName: companyName.trim(),
        contactName: contactName.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        placementInterest: placementInterest || undefined,
        budgetRange: budgetRange.trim() || undefined,
        message: message.trim() || undefined,
        website,
      }),
    })

    setSubmitting(false)

    if (!res.ok) {
      setError(t.sendFailed)
      return
    }

    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="mt-8 text-center py-12 rounded-2xl bg-white dark:bg-neutral-900 border border-slate-100 dark:border-neutral-900 shadow-sm">
        <span className="text-4xl">✅</span>
        <h3 className="mt-3 font-bold text-neutral-900 dark:text-white">{t.received}</h3>
        <p className="mt-1 text-sm text-neutral-500">{t.receivedSubtitle}</p>
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
          <label className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">{t.companyLabel}</label>
          <input
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 px-4 py-2.5 text-sm outline-none focus:border-sky-500 transition-all"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">{t.contactLabel}</label>
          <input
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 px-4 py-2.5 text-sm outline-none focus:border-sky-500 transition-all"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">{t.emailLabel}</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 px-4 py-2.5 text-sm outline-none focus:border-sky-500 transition-all"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">{t.phoneLabel}</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 px-4 py-2.5 text-sm outline-none focus:border-sky-500 transition-all"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">{t.placementLabel}</label>
          <select
            value={placementInterest}
            onChange={(e) => setPlacementInterest(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 px-4 py-2.5 text-sm outline-none focus:border-sky-500 transition-all"
          >
            <option value="">{t.notSelected}</option>
            <option value="home">{t.placementHome}</option>
            <option value="blog">{t.placementBlog}</option>
            <option value="other">{t.placementOther}</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">{t.budgetLabel}</label>
          <input
            value={budgetRange}
            onChange={(e) => setBudgetRange(e.target.value)}
            placeholder={t.budgetPlaceholder}
            className="mt-1.5 w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 px-4 py-2.5 text-sm outline-none focus:border-sky-500 transition-all"
          />
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">{t.messageLabel}</label>
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
        {submitting ? t.sending : t.send}
      </button>
    </form>
  )
}
