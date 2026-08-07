'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export function AdminDeleteButton({ table, id, confirmMessage }: { table: string; id: string; confirmMessage: string }) {
  const router = useRouter()
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm(confirmMessage)) return
    setDeleting(true)
    const supabase = createClient()
    await supabase.from(table).delete().eq('id', id)
    setDeleting(false)
    router.refresh()
  }

  return (
    <button
      onClick={handleDelete}
      disabled={deleting}
      className="text-xs font-semibold text-red-500 hover:text-red-600 disabled:opacity-50"
    >
      {deleting ? '...' : '🗑️ Sil'}
    </button>
  )
}
