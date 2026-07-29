'use client'

import { useEffect, useState } from 'react'

let cachedRate: number | null = null
let inFlight: Promise<number | null> | null = null

function fetchRate(): Promise<number | null> {
  if (cachedRate !== null) return Promise.resolve(cachedRate)
  if (inFlight) return inFlight

  inFlight = fetch('https://api.frankfurter.dev/v1/latest?from=EUR&to=TRY')
    .then((res) => res.json())
    .then((json) => {
      const rate = json?.rates?.TRY
      if (typeof rate === 'number') cachedRate = rate
      return cachedRate
    })
    .catch(() => null)

  return inFlight
}

export function useEurToTry(): number | null {
  const [rate, setRate] = useState<number | null>(cachedRate)

  useEffect(() => {
    if (rate !== null) return
    let isMounted = true
    fetchRate().then((r) => {
      if (isMounted) setRate(r)
    })
    return () => { isMounted = false }
  }, [rate])

  return rate
}
