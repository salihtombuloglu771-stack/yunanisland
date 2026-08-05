'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import type { MapPoint } from '@/components/IslandMap'
import { useLanguage } from '@/lib/i18n/LanguageProvider'
import type { Locale } from '@/lib/i18n/dictionary'

function readCookieLocale(): Locale {
  if (typeof document === 'undefined') return 'tr'
  const match = document.cookie.match(/yunanisland-locale=(tr|en|el)/)
  return (match?.[1] as Locale) ?? 'tr'
}

const MAP_LOADING_TEXT: Record<Locale, string> = {
  tr: 'Harita yükleniyor...',
  en: 'Loading map...',
  el: 'Φόρτωση χάρτη...',
}

const IslandMap = dynamic(() => import('@/components/IslandMap').then((m) => m.IslandMap), {
  ssr: false,
  loading: () => (
    <div className="h-[600px] w-full rounded-2xl bg-slate-100 dark:bg-neutral-900 animate-pulse flex items-center justify-center text-sm text-neutral-400">
      {MAP_LOADING_TEXT[readCookieLocale()]}
    </div>
  ),
})

const BASE_LAYERS: { type: MapPoint['type']; label: Record<Locale, string>; emoji: string }[] = [
  { type: 'island', label: { tr: 'Adalar', en: 'Islands', el: 'Νησιά' }, emoji: '🏝️' },
  { type: 'beach', label: { tr: 'Plajlar', en: 'Beaches', el: 'Παραλίες' }, emoji: '🏖️' },
  { type: 'restaurant', label: { tr: 'Restoranlar', en: 'Restaurants', el: 'Εστιατόρια' }, emoji: '🍽️' },
  { type: 'hotel', label: { tr: 'Oteller', en: 'Hotels', el: 'Ξενοδοχεία' }, emoji: '🏨' },
  { type: 'attraction', label: { tr: 'Gezilecek Yerler', en: 'Attractions', el: 'Αξιοθέατα' }, emoji: '📍' },
]

const POI_LAYERS: { type: MapPoint['type']; label: Record<Locale, string>; emoji: string }[] = [
  { type: 'hospital', label: { tr: 'Hastaneler', en: 'Hospitals', el: 'Νοσοκομεία' }, emoji: '🏥' },
  { type: 'pharmacy', label: { tr: 'Eczaneler', en: 'Pharmacies', el: 'Φαρμακεία' }, emoji: '💊' },
  { type: 'atm', label: { tr: 'ATM\'ler', en: 'ATMs', el: 'ATM' }, emoji: '🏧' },
]

export function MapPageClient({ points }: { points: MapPoint[] }) {
  const { locale } = useLanguage()
  const [poiPoints, setPoiPoints] = useState<MapPoint[]>([])
  const [activeLayers, setActiveLayers] = useState<MapPoint['type'][]>(['hospital', 'pharmacy', 'atm'])
  const [activeBaseTypes, setActiveBaseTypes] = useState<MapPoint['type'][]>(BASE_LAYERS.map((l) => l.type))
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

  const toggleBaseType = (type: MapPoint['type']) => {
    setActiveBaseTypes((prev) => prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type])
  }

  const t = {
    heading: locale === 'en' ? 'Interactive Map' : locale === 'el' ? 'Διαδραστικός Χάρτης' : 'Etkileşimli Harita',
    subheading: locale === 'en'
      ? 'All islands, beaches and restaurants on one map. Click a marker to see the details.'
      : locale === 'el'
      ? 'Όλα τα νησιά, οι παραλίες και τα εστιατόρια σε έναν χάρτη. Κάντε κλικ σε έναν δείκτη για να δείτε λεπτομέρειες.'
      : 'Tüm adalar, plajlar ve restoranlar tek haritada. Bir işarete tıklayarak detaylara ulaşabilirsin.',
    content: locale === 'en' ? 'Content:' : locale === 'el' ? 'Περιεχόμενο:' : 'İçerik:',
    layers: locale === 'en' ? 'Layers:' : locale === 'el' ? 'Επίπεδα:' : 'Katmanlar:',
    loading: locale === 'en' ? 'Loading...' : locale === 'el' ? 'Φόρτωση...' : 'Yükleniyor...',
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">{t.heading}</h1>
      <p className="text-sm text-neutral-500 mb-6">{t.subheading}</p>
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mr-1">{t.content}</span>
        {BASE_LAYERS.map((layer) => (
          <button
            key={layer.type}
            type="button"
            onClick={() => toggleBaseType(layer.type)}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium border transition-colors ${
              activeBaseTypes.includes(layer.type)
                ? 'bg-emerald-600 border-emerald-600 text-white'
                : 'bg-white dark:bg-neutral-900 border-slate-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400'
            }`}
          >
            {layer.emoji} {layer.label[locale]}
          </button>
        ))}
      </div>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mr-1">{t.layers}</span>
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
            {layer.emoji} {layer.label[locale]}
          </button>
        ))}
        {loadingPoi && <span className="text-xs text-neutral-400">{t.loading}</span>}
      </div>
      <IslandMap points={[...points, ...poiPoints]} activePoiTypes={activeLayers} activeBaseTypes={activeBaseTypes} />
    </div>
  )
}
