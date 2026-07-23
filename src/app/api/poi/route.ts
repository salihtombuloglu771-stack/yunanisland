import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const revalidate = 86400 // Overpass verisi (hastane/eczane/ATM) sık değişmez, günde bir kez tazelenir

export interface PoiPoint {
  id: string
  type: 'hospital' | 'pharmacy' | 'atm'
  name: string
  latitude: number
  longitude: number
}

const RADIUS_METERS = 20000
const OVERPASS_ENDPOINTS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
]

function buildQuery(islands: { latitude: number; longitude: number }[]): string {
  const clauses = islands.flatMap((i) => [
    `node["amenity"="hospital"](around:${RADIUS_METERS},${i.latitude},${i.longitude});`,
    `node["amenity"="pharmacy"](around:${RADIUS_METERS},${i.latitude},${i.longitude});`,
    `node["amenity"="atm"](around:${RADIUS_METERS},${i.latitude},${i.longitude});`,
  ]).join('\n')
  return `[out:json][timeout:20];(${clauses});out body;`
}

const AMENITY_LABEL: Record<string, PoiPoint['type']> = { hospital: 'hospital', pharmacy: 'pharmacy', atm: 'atm' }
const FALLBACK_NAME: Record<PoiPoint['type'], string> = { hospital: 'Hastane', pharmacy: 'Eczane', atm: 'ATM' }

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: islands } = await supabase
      .from('islands')
      .select('latitude, longitude')
      .eq('is_published', true)

    const validIslands = (islands ?? []).filter((i): i is { latitude: number; longitude: number } => !!i.latitude && !!i.longitude)
    if (validIslands.length === 0) return NextResponse.json({ points: [] })

    const query = buildQuery(validIslands)

    let data: { elements?: { id: number; lat: number; lon: number; tags?: Record<string, string> }[] } | null = null
    const debug: string[] = []
    for (const endpoint of OVERPASS_ENDPOINTS) {
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          body: `data=${encodeURIComponent(query)}`,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'Yunanisland/1.0 (https://yunanisland.vercel.app; travel guide POI layer)',
            'Accept': 'application/json, text/plain, */*',
          },
          signal: AbortSignal.timeout(15000),
        })
        debug.push(`${endpoint}: status ${res.status}`)
        if (res.ok) {
          data = await res.json()
          break
        } else {
          debug.push(await res.text().then(t => t.slice(0, 300)))
        }
      } catch (e) {
        debug.push(`${endpoint}: error ${e instanceof Error ? e.message : String(e)}`)
        continue
      }
    }

    if (!data?.elements) return NextResponse.json({ points: [], debug, islandCount: validIslands.length })

    const points: PoiPoint[] = data.elements
      .filter((el) => el.tags?.amenity && AMENITY_LABEL[el.tags.amenity])
      .map((el) => {
        const type = AMENITY_LABEL[el.tags!.amenity!]
        return {
          id: `${type}-${el.id}`,
          type,
          name: el.tags?.name || FALLBACK_NAME[type],
          latitude: el.lat,
          longitude: el.lon,
        }
      })

    return NextResponse.json({ points })
  } catch {
    return NextResponse.json({ points: [] })
  }
}
