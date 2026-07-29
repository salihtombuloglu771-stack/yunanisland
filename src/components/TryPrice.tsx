'use client'

import { useEurToTry } from '@/lib/useEurToTry'

export function TryPrice({ eur, className }: { eur: number; className?: string }) {
  const rate = useEurToTry()
  if (!rate) return null

  return (
    <span className={className ?? 'text-neutral-400'}>
      {' '}(~{Math.round(eur * rate).toLocaleString('tr-TR')} TL)
    </span>
  )
}
