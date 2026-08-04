'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export function ConfirmClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const tokenHash = searchParams.get('token_hash')
  const type = searchParams.get('type')

  const handleConfirm = async () => {
    if (!tokenHash || !type) {
      setError('Onay linki eksik veya bozuk.')
      return
    }

    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { error: verifyError } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      type: type as any,
    })

    setLoading(false)

    if (verifyError) {
      setError('Onay linki geçersiz veya süresi dolmuş. Lütfen tekrar kayıt olmayı deneyin.')
      return
    }

    router.push('/')
    router.refresh()
  }

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm text-center">
        <span className="text-4xl">✉️</span>
        <h1 className="mt-3 text-2xl font-bold text-neutral-900 dark:text-white">Hesabını Onayla</h1>
        <p className="mt-2 text-sm text-neutral-500">
          Yunanisland hesabını aktifleştirmek için aşağıdaki butona bas.
        </p>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

        <button
          type="button"
          onClick={handleConfirm}
          disabled={loading || !tokenHash}
          className="mt-6 w-full rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-sky-500 transition-colors disabled:opacity-50"
        >
          {loading ? 'Onaylanıyor...' : 'Girişi Onayla ve Devam Et'}
        </button>
      </div>
    </main>
  )
}
