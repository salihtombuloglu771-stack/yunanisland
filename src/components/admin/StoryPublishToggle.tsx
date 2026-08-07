'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export function StoryPublishToggle({ id, isPublished }: { id: string; isPublished: boolean }) {
  const router = useRouter()
  const [published, setPublished] = useState(isPublished)
  const [saving, setSaving] = useState(false)

  const handleToggle = async () => {
    setSaving(true)
    const supabase = createClient()
    const next = !published
    await supabase.from('travel_stories').update({ is_published: next }).eq('id', id)
    setPublished(next)
    setSaving(false)
    router.refresh()
  }

  return (
    <button
      onClick={handleToggle}
      disabled={saving}
      className={`text-xs font-semibold px-2.5 py-1 rounded-lg disabled:opacity-50 ${
        published ? 'bg-green-50 dark:bg-green-950/30 text-green-600' : 'bg-slate-100 dark:bg-neutral-800 text-neutral-500'
      }`}
    >
      {published ? '✅ Yayında' : '🚫 Gizli'}
    </button>
  )
}
