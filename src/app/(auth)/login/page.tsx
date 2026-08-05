'use client'

import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { useLanguage } from '@/lib/i18n/LanguageProvider'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { locale } = useLanguage()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const t = {
    invalidCredentials: locale === 'en' ? 'Incorrect email or password.' : locale === 'el' ? 'Λανθασμένο email ή κωδικός πρόσβασης.' : 'E-posta veya şifre hatalı.',
    enterSixDigit: locale === 'en' ? 'Please enter the 6-digit code from your app.' : locale === 'el' ? 'Παρακαλώ εισάγετε τον 6ψήφιο κωδικό από την εφαρμογή σας.' : 'Lütfen uygulamandaki 6 haneli kodu gir.',
    codeExpired: locale === 'en' ? 'Incorrect or expired code, try again.' : locale === 'el' ? 'Λανθασμένος ή ληγμένος κωδικός, δοκιμάστε ξανά.' : 'Kod yanlış veya süresi dolmuş, tekrar dene.',
    mfaTitle: locale === 'en' ? 'Two-Factor Authentication' : locale === 'el' ? 'Έλεγχος Ταυτότητας Δύο Παραγόντων' : 'İki Adımlı Doğrulama',
    mfaDesc: locale === 'en' ? 'Enter the 6-digit code from your authenticator app.' : locale === 'el' ? 'Εισάγετε τον 6ψήφιο κωδικό από την εφαρμογή ελέγχου ταυτότητας.' : 'Authenticator uygulamandaki 6 haneli kodu gir.',
    verifying: locale === 'en' ? 'Verifying...' : locale === 'el' ? 'Επαλήθευση...' : 'Doğrulanıyor...',
    verifyAndLogin: locale === 'en' ? 'Verify & Log In' : locale === 'el' ? 'Επαλήθευση & Σύνδεση' : 'Doğrula ve Giriş Yap',
    loginTitle: locale === 'en' ? 'Log In' : locale === 'el' ? 'Σύνδεση' : 'Giriş Yap',
    loginDesc: locale === 'en' ? 'Log in to access your favorites and reviews.' : locale === 'el' ? 'Συνδεθείτε για πρόσβαση στα αγαπημένα και τις κριτικές σας.' : 'Hesabına giriş yaparak favorilerine ve yorumlarına eriş.',
    email: locale === 'en' ? 'Email' : locale === 'el' ? 'Email' : 'E-posta',
    password: locale === 'en' ? 'Password' : locale === 'el' ? 'Κωδικός Πρόσβασης' : 'Şifre',
    loggingIn: locale === 'en' ? 'Logging in...' : locale === 'el' ? 'Σύνδεση σε εξέλιξη...' : 'Giriş yapılıyor...',
    logIn: locale === 'en' ? 'Log In' : locale === 'el' ? 'Σύνδεση' : 'Giriş Yap',
    noAccount: locale === 'en' ? "Don't have an account?" : locale === 'el' ? 'Δεν έχετε λογαριασμό;' : 'Hesabın yok mu?',
    createAccount: locale === 'en' ? 'Create account' : locale === 'el' ? 'Δημιουργία λογαριασμού' : 'Hesap oluştur',
  }

  // 2FA açık bir hesapla giriş yapılırsa şifre doğru olsa bile oturum "aal2"ye
  // yükselene kadar tamamlanmış sayılmıyor — bu ikinci adım o yükseltmeyi yapıyor.
  const [needsMfa, setNeedsMfa] = useState(false)
  const [mfaFactorId, setMfaFactorId] = useState<string | null>(null)
  const [mfaCode, setMfaCode] = useState('')

  const finishLogin = () => {
    const next = searchParams.get('next') || '/'
    router.push(next)
    router.refresh()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })

    if (signInError) {
      setError(t.invalidCredentials)
      setLoading(false)
      return
    }

    const { data: aal } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel()
    setLoading(false)

    if (aal && aal.nextLevel === 'aal2' && aal.nextLevel !== aal.currentLevel) {
      const { data: factors } = await supabase.auth.mfa.listFactors()
      const factor = factors?.totp?.find((f) => f.status === 'verified')
      if (factor) {
        setMfaFactorId(factor.id)
        setNeedsMfa(true)
        return
      }
    }

    finishLogin()
  }

  const handleMfaSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!mfaFactorId || mfaCode.trim().length < 6) {
      setError(t.enterSixDigit)
      return
    }

    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { data: challenge, error: challengeError } = await supabase.auth.mfa.challenge({ factorId: mfaFactorId })

    if (challengeError) {
      setError(challengeError.message)
      setLoading(false)
      return
    }

    const { error: verifyError } = await supabase.auth.mfa.verify({
      factorId: mfaFactorId,
      challengeId: challenge.id,
      code: mfaCode.trim(),
    })

    setLoading(false)

    if (verifyError) {
      setError(t.codeExpired)
      return
    }

    finishLogin()
  }

  if (needsMfa) {
    return (
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">{t.mfaTitle}</h1>
        <p className="mt-2 text-sm text-neutral-500">{t.mfaDesc}</p>

        <form onSubmit={handleMfaSubmit} className="mt-8 space-y-4">
          <input
            value={mfaCode}
            onChange={(e) => setMfaCode(e.target.value)}
            placeholder="123456"
            maxLength={6}
            autoFocus
            className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-4 py-2.5 text-sm text-center tracking-widest focus:outline-none focus:ring-2 focus:ring-sky-500"
          />

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-sky-500 transition-colors disabled:opacity-50"
          >
            {loading ? t.verifying : t.verifyAndLogin}
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="w-full max-w-sm">
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">{t.loginTitle}</h1>
      <p className="mt-2 text-sm text-neutral-500">{t.loginDesc}</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
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
          {loading ? t.loggingIn : t.logIn}
        </button>
      </form>

      <p className="mt-6 text-sm text-neutral-500 text-center">
        {t.noAccount}{' '}
        <Link href="/register" className="text-sky-600 font-medium hover:underline">
          {t.createAccount}
        </Link>
      </p>
    </div>
  )
}

export default function LoginPage() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-6 py-16">
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </main>
  )
}
