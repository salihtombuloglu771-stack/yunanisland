'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export function AdminDuplicateButton({ table, id, routeBase }: { table: string; id: string; routeBase: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleDuplicate = async () => {
    setLoading(true)
    const supabase = createClient()
    const { data: original } = await supabase.from(table).select('*').eq('id', id).single()
    if (!original) {
      setLoading(false)
      return
    }

    const rest: Record<string, unknown> = { ...original }
    delete rest.id
    delete rest.created_at
    delete rest.updated_at

    const suffix = Math.random().toString(36).slice(2, 6)
    const payload = {
      ...rest,
      name: `${(rest.name as string) ?? ''} (Kopya)`,
      slug: `${(rest.slug as string) ?? 'kopya'}-${suffix}`,
    }

    const { data: inserted, error } = await supabase.from(table).insert(payload).select('id').single()
    setLoading(false)

    if (error || !inserted) {
      alert('Kopyalama başarısız: ' + (error?.message ?? 'bilinmeyen hata'))
      return
    }

    router.push(`${routeBase}/${inserted.id}`)
    router.refresh()
  }

  return (
    <button
      onClick={handleDuplicate}
      disabled={loading}
      className="text-emerald-600 hover:underline font-semibold text-xs disabled:opacity-50"
    >
      {loading ? '...' : '📋 Kopyala'}
    </button>
  )
}
