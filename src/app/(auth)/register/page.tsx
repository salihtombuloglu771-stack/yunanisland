'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function RegisterPage() {
  const router = useRouter()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [awaitingConfirmation, setAwaitingConfirmation] = useState(false)

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
          <h1 className="mt-3 text-2xl font-bold text-neutral-900 dark:text-white">E-postanı Kontrol Et</h1>
          <p className="mt-2 text-sm text-neutral-500">
            <strong>{email}</strong> adresine bir onay linki gönderdik. Hesabını aktifleştirmek için o linke tıkla.
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Hesap Oluştur</h1>
        <p className="mt-2 text-sm text-neutral-500">Favori adalarını, plajlarını kaydet, yorum yap.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Ad Soyad</label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">E-posta</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Şifre</label>
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
            {loading ? 'Oluşturuluyor...' : 'Hesap Oluştur'}
          </button>
        </form>

        <p className="mt-6 text-sm text-neutral-500 text-center">
          Zaten hesabın var mı?{' '}
          <Link href="/login" className="text-sky-600 font-medium hover:underline">
            Giriş yap
          </Link>
        </p>
      </div>
    </main>
  )
}
