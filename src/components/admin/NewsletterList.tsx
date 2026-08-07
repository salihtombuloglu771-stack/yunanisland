'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

interface Subscriber {
  id: string
  email: string
  created_at: string
}

function csvEscape(value: string): string {
  return /[",\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value
}

export function NewsletterList({ subscribers }: { subscribers: Subscriber[] }) {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    if (!confirm('Bu aboneyi silmek istiyor musunuz?')) return
    setDeletingId(id)
    const supabase = createClient()
    await supabase.from('newsletter_subscribers').delete().eq('id', id)
    setDeletingId(null)
    router.refresh()
  }

  const handleExport = () => {
    const rows = [['E-posta', 'Kayıt Tarihi'], ...subscribers.map((s) => [s.email, new Date(s.created_at).toLocaleDateString('tr-TR')])]
    const csv = rows.map((row) => row.map(csvEscape).join(',')).join('\r\n')
    const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `yunanisland-bulten-aboneleri-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <>
      <div className="mt-4 flex justify-end">
        <button
          onClick={handleExport}
          disabled={subscribers.length === 0}
          className="rounded-xl bg-sky-600 px-4 py-2 text-xs font-semibold text-white shadow-md hover:bg-sky-500 transition-colors disabled:opacity-50"
        >
          📥 CSV Olarak İndir
        </button>
      </div>

      <div className="mt-4 bg-white dark:bg-neutral-900 rounded-2xl border border-slate-100 dark:border-neutral-900 shadow-sm divide-y divide-slate-100 dark:divide-neutral-800">
        {subscribers.map((s) => (
          <div key={s.id} className="flex items-center justify-between px-5 py-3">
            <span className="text-sm text-neutral-800 dark:text-neutral-200">{s.email}</span>
            <div className="flex items-center gap-3">
              <span className="text-xs text-neutral-400">{new Date(s.created_at).toLocaleDateString('tr-TR')}</span>
              <button
                onClick={() => handleDelete(s.id)}
                disabled={deletingId === s.id}
                className="text-xs font-semibold text-red-500 hover:text-red-600 disabled:opacity-50"
              >
                {deletingId === s.id ? '...' : '🗑️'}
              </button>
            </div>
          </div>
        ))}

        {subscribers.length === 0 && (
          <p className="px-5 py-8 text-center text-sm text-neutral-500">Henüz abone yok.</p>
        )}
      </div>
    </>
  )
}
