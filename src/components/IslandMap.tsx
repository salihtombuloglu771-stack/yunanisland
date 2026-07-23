'use client'

import { useEffect, useMemo } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import Link from 'next/link'

export interface MapPoint {
  id: string
  type: 'island' | 'beach' | 'restaurant' | 'hospital' | 'pharmacy' | 'atm'
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
  hospital: '🏥',
  pharmacy: '💊',
  atm: '🏧',
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

export function IslandMap({ points, activePoiTypes = [] }: { points: MapPoint[]; activePoiTypes?: MapPoint['type'][] }) {
  useEffect(() => {
    delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    })
  }, [])

  const visiblePoints = useMemo(
    () => points.filter((p) => !POI_TYPES.includes(p.type) || activePoiTypes.includes(p.type)),
    [points, activePoiTypes]
  )

  const center: [number, number] = points.length
    ? [points[0].latitude, points[0].longitude]
    : [37.5, 25]

  return (
    <MapContainer center={center} zoom={7} scrollWheelZoom style={{ height: '600px', width: '100%', borderRadius: '1rem' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> katkıda bulunanlar'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {visiblePoints.map((p) => (
        <Marker
          key={`${p.type}-${p.id}`}
          position={[p.latitude, p.longitude]}
          icon={POI_TYPES.includes(p.type) ? poiDivIcon(p.type) : undefined}
        >
          <Popup>
            <div className="text-sm">
              <p className="font-semibold">{TYPE_EMOJI[p.type]} {p.name}</p>
              {p.type !== 'atm' && p.type !== 'hospital' && p.type !== 'pharmacy' && (
                <Link href={`/islands/${p.type === 'island' ? p.slug : p.islandSlug}`} className="text-sky-600 hover:underline text-xs">
                  Detayları gör →
                </Link>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
