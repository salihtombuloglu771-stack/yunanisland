'use client'

import { useEffect, useState } from 'react'
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

const POI_LAYERS: { type: MapPoint['type']; label: string; emoji: string }[] = [
  { type: 'hospital', label: 'Hastaneler', emoji: '🏥' },
  { type: 'pharmacy', label: 'Eczaneler', emoji: '💊' },
  { type: 'atm', label: 'ATM\'ler', emoji: '🏧' },
]

export function MapPageClient({ points }: { points: MapPoint[] }) {
  const [poiPoints, setPoiPoints] = useState<MapPoint[]>([])
  const [activeLayers, setActiveLayers] = useState<MapPoint['type'][]>(['hospital', 'pharmacy', 'atm'])
  const [loadingPoi, setLoadingPoi] = useState(true)

  useEffect(() => {
    let isMounted = true
    fetch('/api/poi')
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return
        setPoiPoints((data.points ?? []).map((p: { id: string; type: string; name: string; latitude: number; longitude: number }) => ({
          id: p.id, type: p.type, name: p.name, latitude: p.latitude, longitude: p.longitude,
        })))
      })
      .catch(() => {})
      .finally(() => { if (isMounted) setLoadingPoi(false) })
    return () => { isMounted = false }
  }, [])

  const toggleLayer = (type: MapPoint['type']) => {
    setActiveLayers((prev) => prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type])
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mr-1">Katmanlar:</span>
        {POI_LAYERS.map((layer) => (
          <button
            key={layer.type}
            type="button"
            onClick={() => toggleLayer(layer.type)}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium border transition-colors ${
              activeLayers.includes(layer.type)
                ? 'bg-sky-600 border-sky-600 text-white'
                : 'bg-white dark:bg-neutral-900 border-slate-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400'
            }`}
          >
            {layer.emoji} {layer.label}
          </button>
        ))}
        {loadingPoi && <span className="text-xs text-neutral-400">Yükleniyor...</span>}
      </div>
      <IslandMap points={[...points, ...poiPoints]} activePoiTypes={activeLayers} />
    </div>
  )
}
