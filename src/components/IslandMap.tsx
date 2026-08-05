'use client'

import { useMemo } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import Link from 'next/link'
import { useLanguage } from '@/lib/i18n/LanguageProvider'

export interface MapPoint {
  id: string
  type: 'island' | 'beach' | 'restaurant' | 'hotel' | 'attraction' | 'hospital' | 'pharmacy' | 'atm'
  name: string
  slug?: string
  islandSlug?: string
  latitude: number
  longitude: number
}

const TYPE_EMOJI: Record<MapPoint['type'], string> = {
  island: '🏝️',
  beach: '🏖️',
  restaurant: '🍽️',
  hotel: '🏨',
  attraction: '📍',
  hospital: '🏥',
  pharmacy: '💊',
  atm: '🏧',
}

const TYPE_HREF: Partial<Record<MapPoint['type'], (p: MapPoint) => string>> = {
  island: (p) => `/islands/${p.slug}`,
  beach: (p) => `/beaches/${p.slug}`,
  restaurant: (p) => `/restaurants/${p.slug}`,
  hotel: (p) => `/hotels/${p.slug}`,
  attraction: (p) => `/attractions/${p.slug}`,
}

const POI_TYPES: MapPoint['type'][] = ['hospital', 'pharmacy', 'atm']

function poiDivIcon(type: MapPoint['type']) {
  return L.divIcon({
    html: `<div style="font-size:18px;line-height:1;filter:drop-shadow(0 1px 2px rgba(0,0,0,.5))">${TYPE_EMOJI[type]}</div>`,
    className: '',
    iconSize: [22, 22],
    iconAnchor: [11, 11],
  })
}

export function IslandMap({ points, activePoiTypes = [], activeBaseTypes }: { points: MapPoint[]; activePoiTypes?: MapPoint['type'][]; activeBaseTypes?: MapPoint['type'][] }) {
  const { locale } = useLanguage()
  const t = {
    attribution: locale === 'en' ? 'contributors' : locale === 'el' ? 'συνεισφέροντες' : 'katkıda bulunanlar',
    viewDetails: locale === 'en' ? 'View details →' : locale === 'el' ? 'Δείτε λεπτομέρειες →' : 'Detayları gör →',
  }
  const allIcons = useMemo(() => Object.fromEntries(
    (Object.keys(TYPE_EMOJI) as MapPoint['type'][]).map((t) => [t, poiDivIcon(t)])
  ), [])

  const visiblePoints = useMemo(
    () => points.filter((p) => {
      if (POI_TYPES.includes(p.type)) return activePoiTypes.includes(p.type)
      return !activeBaseTypes || activeBaseTypes.includes(p.type)
    }),
    [points, activePoiTypes, activeBaseTypes]
  )

  const center: [number, number] = points.length
    ? [points[0].latitude, points[0].longitude]
    : [37.5, 25]

  return (
    <MapContainer center={center} zoom={7} scrollWheelZoom style={{ height: '600px', width: '100%', borderRadius: '1rem' }}>
      <TileLayer
        attribution={`&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> ${t.attribution}`}
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {visiblePoints.map((p) => {
        const hrefBuilder = TYPE_HREF[p.type]
        return (
          <Marker
            key={`${p.type}-${p.id}`}
            position={[p.latitude, p.longitude]}
            icon={allIcons[p.type]}
          >
            <Popup>
              <div className="text-sm">
                <p className="font-semibold">{TYPE_EMOJI[p.type]} {p.name}</p>
                {hrefBuilder && (
                  <Link href={hrefBuilder(p)} className="text-sky-600 hover:underline text-xs">
                    {t.viewDetails}
                  </Link>
                )}
              </div>
            </Popup>
          </Marker>
        )
      })}
    </MapContainer>
  )
}
