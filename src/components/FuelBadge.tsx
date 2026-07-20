import { estimateFuel, getCarType, FUEL_PRICE_EUR_PER_LITER } from '@/lib/fuelEstimate'

interface FuelBadgeProps {
  originLat: number | null
  originLng: number | null
  destLat: number | null
  destLng: number | null
  carId: string
}

export function FuelBadge({ originLat, originLng, destLat, destLng, carId }: FuelBadgeProps) {
  if (originLat == null || originLng == null || destLat == null || destLng == null) return null

  const car = getCarType(carId)
  const { distanceKm, liters, costEur } = estimateFuel(originLat, originLng, destLat, destLng, car)

  const distanceLabel = distanceKm < 1 ? `${distanceKm.toFixed(1)} km` : `${distanceKm.toFixed(0)} km`
  const litersLabel = liters < 0.1 ? `${liters.toFixed(2)} L` : `${liters.toFixed(1)} L`
  const costLabel = costEur < 0.1 ? `${costEur.toFixed(2)} €` : `${costEur.toFixed(1)} €`

  return (
    <span
      className="inline-flex items-center gap-1 text-[11px] font-medium text-neutral-500 dark:text-neutral-400 bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-md px-2 py-0.5"
      title={`Ada merkezinden tek yön, yaklaşık tahmin (benzin ${FUEL_PRICE_EUR_PER_LITER.toFixed(2)} €/L, Temmuz 2026 güncel fiyatı)`}
    >
      {car.icon} ~{distanceLabel} · ~{litersLabel} · ~{costLabel}
    </span>
  )
}
