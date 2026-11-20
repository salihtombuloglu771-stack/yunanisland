'use client'

import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

// Admin hesabı arka planda sabit — kullanıcı sadece şifre girer.
const ADMIN_EMAIL = 'saliht@yunanisland.com'

function AdminLoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const [needsMfa, setNeedsMfa] = useState(false)
  const [mfaFactorId, setMfaFactorId] = useState<string | null>(null)
  const [mfaCode, setMfaCode] = useState('')

  const finishLogin = () => {
    const next = searchParams.get('next') || '/admin/dashboard'
    router.push(next)
    router.refresh()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: ADMIN_EMAIL,
      password,
    })

    if (signInError) {
      setError('Şifre hatalı.')
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
      setError('Lütfen 6 haneli kodu gir.')
      return
    }

    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { data: challenge, error: challengeError } = await supabase.auth.mfa.challenge({
      factorId: mfaFactorId,
    })

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
      setError('Kod yanlış veya süresi dolmuş, tekrar dene.')
      return
    }

    finishLogin()
  }

  if (needsMfa) {
    return (
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">İki Adımlı Doğrulama</h1>
        <p className="mt-2 text-sm text-neutral-500">Authenticator uygulamandaki 6 haneli kodu gir.</p>

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
            {loading ? 'Doğrulanıyor...' : 'Doğrula ve Giriş Yap'}
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="w-full max-w-sm">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-600 dark:bg-neutral-800 dark:text-sky-400">
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </span>
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Yönetim Girişi</h1>
      </div>
      <p className="mt-2 text-sm text-neutral-500">Devam etmek için yönetici şifreni gir.</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Şifre</label>
          <input
            type="password"
            required
            autoFocus
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
          {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
        </button>
      </form>
    </div>
  )
}

export default function AdminLoginPage() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-6 py-16">
      <Suspense fallback={null}>
        <AdminLoginForm />
      </Suspense>
    </main>
  )
}
