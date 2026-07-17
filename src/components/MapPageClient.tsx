'use client'

import dynamic from 'next/dynamic'
import type { MapPoint } from '@/components/IslandMap'

const IslandMap = dynamic(() => import('@/components/IslandMap').then((m) => m.IslandMap), {
  ssr: false,
  loading: () => (
    <div className="h-[600px] w-full rounded-2xl bg-slate-100 dark:bg-neutral-900 animate-pulse flex items-center justify-center text-sm text-neutral-400">
      Harita yükleniyor...
    </div>
  ),
})

export function MapPageClient({ points }: { points: MapPoint[] }) {
  return <IslandMap points={points} />
}
