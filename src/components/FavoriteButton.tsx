'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

type EntityType = 'island' | 'beach' | 'restaurant' | 'hotel' | 'attraction'

export function FavoriteButton({ entityType, entityId, className }: { entityType: EntityType; entityId: string; className?: string }) {
  const router = useRouter()
  const [userId, setUserId] = useState<string | null>(null)
  const [isFavorite, setIsFavorite] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    const supabase = createClient()

    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!isMounted) return
      setUserId(user?.id ?? null)

      if (user) {
        const { data } = await supabase
          .from('favorites')
          .select('id')
          .eq('user_id', user.id)
          .eq('entity_type', entityType)
          .eq('entity_id', entityId)
          .maybeSingle()
        if (isMounted) setIsFavorite(!!data)
      }
      if (isMounted) setLoading(false)
    }
    load()

    return () => { isMounted = false }
  }, [entityType, entityId])

  const toggle = async () => {
    if (!userId) {
      router.push('/login')
      return
    }

    const supabase = createClient()
    if (isFavorite) {
      await supabase.from('favorites').delete()
        .eq('user_id', userId)
        .eq('entity_type', entityType)
        .eq('entity_id', entityId)
      setIsFavorite(false)
    } else {
      await supabase.from('favorites').insert({ user_id: userId, entity_type: entityType, entity_id: entityId })
      setIsFavorite(true)
    }
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      aria-label={isFavorite ? 'Favorilerden çıkar' : 'Favorilere ekle'}
      className={className ?? 'inline-flex items-center justify-center h-9 w-9 rounded-full bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md shadow-md text-lg transition-transform hover:scale-110'}
    >
      {isFavorite ? '❤️' : '🤍'}
    </button>
  )
}
