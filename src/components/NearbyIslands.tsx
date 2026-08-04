'use client'

import Link from 'next/link'
import { useMemo } from 'react'
import { useGeolocation } from '@/lib/useGeolocation'
import { haversineKm } from '@/lib/geo'
import { useLanguage } from '@/lib/i18n/LanguageProvider'

interface NearbyIsland {
  id: string
  name: string
  slug: string
  latitude: number | null
  longitude: number | null
}

export function NearbyIslands({ islands }: { islands: NearbyIsland[] }) {
  const { locale } = useLanguage()
  const { coords, loading, error, request } = useGeolocation()

  const nearest = useMemo(() => {
    if (!coords) return []
    return islands
      .filter((i): i is NearbyIsland & { latitude: number; longitude: number } => i.latitude != null && i.longitude != null)
      .map((i) => ({ ...i, distanceKm: haversineKm(coords.lat, coords.lng, i.latitude, i.longitude) }))
      .sort((a, b) => a.distanceKm - b.distanceKm)
      .slice(0, 4)
  }, [coords, islands])

  const t = {
    title: locale === 'en' ? '📍 Nearest Islands to You' : locale === 'el' ? '📍 Τα Κοντινότερα Νησιά' : '📍 Sana En Yakın Adalar',
    cta: locale === 'en' ? 'Use My Location' : locale === 'el' ? 'Χρήση Τοποθεσίας μου' : 'Konumumu Kullan',
    loadingLabel: locale === 'en' ? 'Locating...' : locale === 'el' ? 'Εντοπισμός...' : 'Konum bulunuyor...',
    denied: locale === 'en' ? 'Location access denied or unavailable.' : locale === 'el' ? 'Δεν επιτράπηκε ή δεν είναι διαθέσιμη η πρόσβαση στην τοποθεσία.' : 'Konum izni verilmedi veya alınamadı.',
    away: locale === 'en' ? 'away' : locale === 'el' ? 'μακριά' : 'uzaklıkta',
  }

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-slate-100 dark:border-neutral-900 shadow-sm p-6 mb-10">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h3 className="text-lg font-bold text-neutral-900 dark:text-white">{t.title}</h3>
        {!coords && (
          <button
            onClick={request}
            disabled={loading}
            className="rounded-xl bg-sky-600 px-4 py-2 text-xs font-semibold text-white hover:bg-sky-500 transition-colors disabled:opacity-50"
          >
            📍 {loading ? t.loadingLabel : t.cta}
          </button>
        )}
      </div>

      {error && <p className="mt-3 text-xs text-red-500">{t.denied}</p>}

      {nearest.length > 0 && (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {nearest.map((island) => (
            <Link
              key={island.id}
              href={`/islands/${island.slug}`}
              className="rounded-xl border border-slate-100 dark:border-neutral-800 p-3 hover:border-sky-300 dark:hover:border-sky-800 transition-colors text-center"
            >
              <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">{island.name}</p>
              <p className="mt-1 text-xs text-sky-600 dark:text-sky-400 font-medium">
                ~{Math.round(island.distanceKm)} km {t.away}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
