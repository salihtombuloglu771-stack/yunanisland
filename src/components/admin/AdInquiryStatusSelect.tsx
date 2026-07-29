'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export function AdInquiryStatusSelect({ id, status }: { id: string; status: string }) {
  const router = useRouter()
  const [value, setValue] = useState(status)
  const [saving, setSaving] = useState(false)

  const handleChange = async (newStatus: string) => {
    setValue(newStatus)
    setSaving(true)
    const supabase = createClient()
    await supabase.from('ad_inquiries').update({ status: newStatus }).eq('id', id)
    setSaving(false)
    router.refresh()
  }

  return (
    <select
      value={value}
      disabled={saving}
      onChange={(e) => handleChange(e.target.value)}
      className="rounded-lg border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 px-2.5 py-1.5 text-xs font-semibold outline-none focus:border-sky-500 disabled:opacity-50"
    >
      <option value="new">🆕 Yeni</option>
      <option value="contacted">📞 İletişime Geçildi</option>
      <option value="closed">✅ Kapandı</option>
    </select>
  )
}
