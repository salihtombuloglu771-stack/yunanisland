'use client'

import { useEffect, useState } from 'react'

export function useLocalStorageState<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const stored = window.localStorage.getItem(key)
    if (stored) {
      try { setValue(JSON.parse(stored)) } catch { /* ignore invalid stored value */ }
    }
    setLoaded(true)
  }, [key])

  useEffect(() => {
    if (loaded) window.localStorage.setItem(key, JSON.stringify(value))
  }, [key, value, loaded])

  return [value, setValue] as const
}
