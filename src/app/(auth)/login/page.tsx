'use client'

import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })

    if (signInError) {
      setError('E-posta veya şifre hatalı.')
      setLoading(false)
      return
    }

    const next = searchParams.get('next') || '/'
    router.push(next)
    router.refresh()
  }

  return (
    <div className="w-full max-w-sm">
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Giriş Yap</h1>
      <p className="mt-2 text-sm text-neutral-500">Hesabına giriş yaparak favorilerine ve yorumlarına eriş.</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
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

      <p className="mt-6 text-sm text-neutral-500 text-center">
        Hesabın yok mu?{' '}
        <Link href="/register" className="text-sky-600 font-medium hover:underline">
          Hesap oluştur
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
