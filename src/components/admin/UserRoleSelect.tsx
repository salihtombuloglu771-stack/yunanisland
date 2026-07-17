'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export function UserRoleSelect({ userId, currentRole, disabled }: { userId: string; currentRole: string; disabled?: boolean }) {
  const router = useRouter()
  const [role, setRole] = useState(currentRole)
  const [saving, setSaving] = useState(false)

  const handleChange = async (newRole: string) => {
    setSaving(true)
    const supabase = createClient()
    const { error } = await supabase.from('users').update({ role: newRole }).eq('id', userId)
    if (!error) setRole(newRole)
    setSaving(false)
    router.refresh()
  }

  return (
    <select
      value={role}
      disabled={disabled || saving}
      onChange={(e) => handleChange(e.target.value)}
      className="rounded-lg border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-1.5 px-3 text-xs font-medium outline-none focus:border-sky-500 disabled:opacity-50"
    >
      <option value="user">Kullanıcı</option>
      <option value="admin">Admin</option>
    </select>
  )
}
