'use client'

import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import Link from 'next/link'

export interface MapPoint {
  id: string
  type: 'island' | 'beach' | 'restaurant'
  name: string
  slug: string
  islandSlug?: string
  latitude: number
  longitude: number
}

const TYPE_EMOJI: Record<MapPoint['type'], string> = {
  island: '🏝️',
  beach: '🏖️',
  restaurant: '🍽️',
}

export function IslandMap({ points }: { points: MapPoint[] }) {
  useEffect(() => {
    delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    })
  }, [])

  const center: [number, number] = points.length
    ? [points[0].latitude, points[0].longitude]
    : [37.5, 25]

  return (
    <MapContainer center={center} zoom={7} scrollWheelZoom style={{ height: '600px', width: '100%', borderRadius: '1rem' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> katkıda bulunanlar'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {points.map((p) => (
        <Marker key={`${p.type}-${p.id}`} position={[p.latitude, p.longitude]}>
          <Popup>
            <div className="text-sm">
              <p className="font-semibold">{TYPE_EMOJI[p.type]} {p.name}</p>
              <Link href={`/islands/${p.type === 'island' ? p.slug : p.islandSlug}`} className="text-sky-600 hover:underline text-xs">
                Detayları gör →
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
