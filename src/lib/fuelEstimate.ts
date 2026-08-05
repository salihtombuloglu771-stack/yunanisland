import { haversineKm } from '@/lib/geo'

export interface CarType {
  id: 'compact' | 'sedan' | 'suv'
  label: { tr: string; en: string; el: string }
  icon: string
  consumption: number // L / 100km, ortalama
}

export const CAR_TYPES: CarType[] = [
  {
    id: 'compact',
    label: { tr: 'Kompakt (örn. Fiat Panda)', en: 'Compact (e.g. Fiat Panda)', el: 'Μικρό (π.χ. Fiat Panda)' },
    icon: '🚗',
    consumption: 5.5,
  },
  {
    id: 'sedan',
    label: { tr: 'Orta Sınıf (örn. Toyota Corolla)', en: 'Mid-Size (e.g. Toyota Corolla)', el: 'Μεσαία Κατηγορία (π.χ. Toyota Corolla)' },
    icon: '🚙',
    consumption: 6.5,
  },
  {
    id: 'suv',
    label: { tr: 'SUV / Cip (örn. Jeep Renegade)', en: 'SUV / Jeep (e.g. Jeep Renegade)', el: 'SUV / Τζιπ (π.χ. Jeep Renegade)' },
    icon: '🚐',
    consumption: 8.5,
  },
]

export const DEFAULT_CAR_ID: CarType['id'] = 'compact'

// Yunanistan ortalama kurşunsuz benzin fiyatı (€/L) — GlobalPetrolPrices.com ve
// fuel-prices.eu kaynaklı, Temmuz 2026 itibarıyla güncel gerçek fiyat. Ücretsiz,
// anahtar gerektirmeyen canlı bir API bulunamadığı için sabit değer olarak
// tutuluyor; fiyat önemli ölçüde değiştiğinde elle güncellenmeli.
export const FUEL_PRICE_EUR_PER_LITER = 1.98

// Kuş uçuşu mesafeyi ada içi yol mesafesine yaklaştırmak için çarpan
const ROAD_DISTANCE_FACTOR = 1.35

export function getCarType(id: string): CarType {
  return CAR_TYPES.find((c) => c.id === id) ?? CAR_TYPES[0]
}

export interface FuelEstimateResult {
  distanceKm: number
  liters: number
  costEur: number
}

export function estimateFuel(
  originLat: number,
  originLng: number,
  destLat: number,
  destLng: number,
  car: CarType
): FuelEstimateResult {
  const distanceKm = haversineKm(originLat, originLng, destLat, destLng) * ROAD_DISTANCE_FACTOR
  const liters = (distanceKm / 100) * car.consumption
  const costEur = liters * FUEL_PRICE_EUR_PER_LITER
  return { distanceKm, liters, costEur }
}
