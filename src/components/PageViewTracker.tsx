'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function PageViewTracker() {
  const pathname = usePathname()

  useEffect(() => {
    createClient().from('page_views').insert({ path: pathname }).then(() => {})
  }, [pathname])

  return null
}
