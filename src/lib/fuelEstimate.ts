export interface CarType {
  id: 'compact' | 'sedan' | 'suv'
  label: string
  icon: string
  consumption: number // L / 100km, ortalama
}

export const CAR_TYPES: CarType[] = [
  { id: 'compact', label: 'Kompakt (örn. Fiat Panda)', icon: '🚗', consumption: 5.5 },
  { id: 'sedan', label: 'Orta Sınıf (örn. Toyota Corolla)', icon: '🚙', consumption: 6.5 },
  { id: 'suv', label: 'SUV / Cip (örn. Jeep Renegade)', icon: '🚐', consumption: 8.5 },
]

export const DEFAULT_CAR_ID: CarType['id'] = 'compact'

// Yunanistan ortalama benzin fiyatı, yaklaşık (€/L)
export const FUEL_PRICE_EUR_PER_LITER = 1.85

// Kuş uçuşu mesafeyi ada içi yol mesafesine yaklaştırmak için çarpan
const ROAD_DISTANCE_FACTOR = 1.35

export function getCarType(id: string): CarType {
  return CAR_TYPES.find((c) => c.id === id) ?? CAR_TYPES[0]
}

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
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
