'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

type Factor = { id: string; factor_type: string; status: string }

export function MfaEnrollment() {
  const [factors, setFactors] = useState<Factor[]>([])
  const [loading, setLoading] = useState(true)
  const [enrolling, setEnrolling] = useState(false)
  const [qrCode, setQrCode] = useState<string | null>(null)
  const [factorId, setFactorId] = useState<string | null>(null)
  const [code, setCode] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const refreshFactors = async () => {
    const supabase = createClient()
    const { data } = await supabase.auth.mfa.listFactors()
    setFactors((data?.totp ?? []) as Factor[])
    setLoading(false)
  }

  useEffect(() => {
    refreshFactors()
  }, [])

  const startEnroll = async () => {
    setError(null)
    setEnrolling(true)
    const supabase = createClient()
    const { data, error: enrollError } = await supabase.auth.mfa.enroll({ factorType: 'totp' })

    if (enrollError) {
      setError(enrollError.message)
      setEnrolling(false)
      return
    }

    setQrCode(data.totp.qr_code)
    setFactorId(data.id)
  }

  const confirmEnroll = async () => {
    if (!factorId || code.trim().length < 6) {
      setError('Lütfen uygulamandaki 6 haneli kodu gir.')
      return
    }
    setError(null)

    const supabase = createClient()
    const { data: challenge, error: challengeError } = await supabase.auth.mfa.challenge({ factorId })
    if (challengeError) {
      setError(challengeError.message)
      return
    }

    const { error: verifyError } = await supabase.auth.mfa.verify({
      factorId,
      challengeId: challenge.id,
      code: code.trim(),
    })

    if (verifyError) {
      setError('Kod yanlış veya süresi dolmuş, tekrar dene.')
      return
    }

    setSuccess('İki adımlı doğrulama etkinleştirildi.')
    setQrCode(null)
    setFactorId(null)
    setCode('')
    setEnrolling(false)
    await refreshFactors()
  }

  const unenroll = async (id: string) => {
    if (!confirm('İki adımlı doğrulamayı kapatmak istediğine emin misin?')) return
    const supabase = createClient()
    await supabase.auth.mfa.unenroll({ factorId: id })
    await refreshFactors()
  }

  if (loading) return null

  const activeFactor = factors.find((f) => f.status === 'verified')

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-slate-100 dark:border-neutral-900 shadow-sm p-5">
      <h3 className="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-2">
        🔐 İki Adımlı Doğrulama (2FA)
      </h3>
      <p className="mt-1 text-xs text-neutral-500">
        Şifren ele geçirilse bile hesabına girilmesini engeller — Google Authenticator, Microsoft Authenticator gibi bir uygulama gerekir.
      </p>

      {activeFactor ? (
        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            ✅ Aktif
          </span>
          <button
            type="button"
            onClick={() => unenroll(activeFactor.id)}
            className="text-xs font-semibold text-red-600 hover:underline"
          >
            Kapat
          </button>
        </div>
      ) : qrCode ? (
        <div className="mt-4 space-y-3">
          <p className="text-xs text-neutral-600 dark:text-neutral-400">
            Authenticator uygulamanla aşağıdaki kodu tara, sonra uygulamanın verdiği 6 haneli kodu gir.
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={qrCode} alt="MFA QR kodu" className="w-40 h-40 mx-auto border border-slate-200 dark:border-neutral-800 rounded-lg" />
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="123456"
            maxLength={6}
            className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 px-4 py-2.5 text-sm text-center tracking-widest outline-none focus:border-sky-500 transition-all"
          />
          {error && <p className="text-xs text-red-500">{error}</p>}
          <button
            type="button"
            onClick={confirmEnroll}
            className="w-full rounded-xl bg-sky-600 px-4 py-2.5 text-xs font-semibold text-white shadow-md hover:bg-sky-500 transition-colors"
          >
            Doğrula ve Etkinleştir
          </button>
        </div>
      ) : (
        <div className="mt-4">
          {success && <p className="text-xs text-emerald-600 mb-2">{success}</p>}
          {error && <p className="text-xs text-red-500 mb-2">{error}</p>}
          <button
            type="button"
            onClick={startEnroll}
            disabled={enrolling}
            className="rounded-xl bg-sky-600 px-4 py-2 text-xs font-semibold text-white shadow-md hover:bg-sky-500 transition-colors disabled:opacity-50"
          >
            2FA&apos;yı Etkinleştir
          </button>
        </div>
      )}
    </div>
  )
}
