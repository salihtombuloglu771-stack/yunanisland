'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { useLanguage } from '@/lib/i18n/LanguageProvider'

export default function RegisterPage() {
  const router = useRouter()
  const { locale } = useLanguage()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [awaitingConfirmation, setAwaitingConfirmation] = useState(false)

  const t = {
    checkEmailTitle: locale === 'en' ? 'Check Your Email' : locale === 'el' ? 'Ελέγξτε το Email σας' : 'E-postanı Kontrol Et',
    checkEmailDesc: locale === 'en' ? 'We sent a confirmation link to' : locale === 'el' ? 'Στείλαμε έναν σύνδεσμο επιβεβαίωσης στο' : 'adresine bir onay linki gönderdik.',
    checkEmailDescSuffix: locale === 'en' ? '. Click that link to activate your account.' : locale === 'el' ? '. Κάντε κλικ σε αυτόν τον σύνδεσμο για να ενεργοποιήσετε τον λογαριασμό σας.' : ' Hesabını aktifleştirmek için o linke tıkla.',
    createAccountTitle: locale === 'en' ? 'Create Account' : locale === 'el' ? 'Δημιουργία Λογαριασμού' : 'Hesap Oluştur',
    createAccountDesc: locale === 'en' ? 'Save your favorite islands and beaches, leave reviews.' : locale === 'el' ? 'Αποθηκεύστε τα αγαπημένα σας νησιά και παραλίες, αφήστε κριτικές.' : 'Favori adalarını, plajlarını kaydet, yorum yap.',
    fullName: locale === 'en' ? 'Full Name' : locale === 'el' ? 'Ονοματεπώνυμο' : 'Ad Soyad',
    email: locale === 'en' ? 'Email' : locale === 'el' ? 'Email' : 'E-posta',
    password: locale === 'en' ? 'Password' : locale === 'el' ? 'Κωδικός Πρόσβασης' : 'Şifre',
    creating: locale === 'en' ? 'Creating...' : locale === 'el' ? 'Δημιουργία...' : 'Oluşturuluyor...',
    createAccount: locale === 'en' ? 'Create Account' : locale === 'el' ? 'Δημιουργία Λογαριασμού' : 'Hesap Oluştur',
    alreadyHaveAccount: locale === 'en' ? 'Already have an account?' : locale === 'el' ? 'Έχετε ήδη λογαριασμό;' : 'Zaten hesabın var mı?',
    logIn: locale === 'en' ? 'Log in' : locale === 'el' ? 'Σύνδεση' : 'Giriş yap',
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    })

    setLoading(false)

    if (signUpError) {
      setError(signUpError.message)
      return
    }

    // E-posta doğrulaması açıkken signUp() oturum açmaz — kullanıcı e-postasındaki
    // linke tıklayana kadar giriş yapılmış sayılmaz.
    if (!data.session) {
      setAwaitingConfirmation(true)
      return
    }

    router.push('/')
    router.refresh()
  }

  if (awaitingConfirmation) {
    return (
      <main className="min-h-[70vh] flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm text-center">
          <span className="text-4xl">📬</span>
          <h1 className="mt-3 text-2xl font-bold text-neutral-900 dark:text-white">{t.checkEmailTitle}</h1>
          <p className="mt-2 text-sm text-neutral-500">
            {t.checkEmailDesc} <strong>{email}</strong>{t.checkEmailDescSuffix}
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">{t.createAccountTitle}</h1>
        <p className="mt-2 text-sm text-neutral-500">{t.createAccountDesc}</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">{t.fullName}</label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">{t.email}</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">{t.password}</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-sky-500 transition-colors disabled:opacity-50"
          >
            {loading ? t.creating : t.createAccount}
          </button>
        </form>

        <p className="mt-6 text-sm text-neutral-500 text-center">
          {t.alreadyHaveAccount}{' '}
          <Link href="/login" className="text-sky-600 font-medium hover:underline">
            {t.logIn}
          </Link>
        </p>
      </div>
    </main>
  )
}
