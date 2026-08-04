'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useLanguage } from '@/lib/i18n/LanguageProvider'

const LABELS = {
  tr: (n: number) => `Şu an ${n} kişi bakıyor`,
  en: (n: number) => `${n} people viewing now`,
  el: (n: number) => `${n} άτομα το βλέπουν τώρα`,
}

export function LiveViewers() {
  const pathname = usePathname()
  const { locale } = useLanguage()
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    let isMounted = true

    const check = async () => {
      const { data } = await createClient().rpc('get_recent_page_views', { p_path: pathname, p_minutes: 5 })
      if (isMounted && typeof data === 'number') setCount(data)
    }

    check()
    const interval = setInterval(check, 20000)
    return () => {
      isMounted = false
      clearInterval(interval)
    }
  }, [pathname])

  if (!count || count < 2) return null

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-black/40 backdrop-blur-md px-3 py-1 text-xs font-semibold text-white">
      <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
      {LABELS[locale](count)}
    </span>
  )
}
