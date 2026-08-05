'use client'

import { CAR_TYPES, type CarType } from '@/lib/fuelEstimate'
import { useLanguage } from '@/lib/i18n/LanguageProvider'

export function CarSelector({ carId, onChange }: { carId: CarType['id']; onChange: (id: CarType['id']) => void }) {
  const { locale } = useLanguage()

  const title = locale === 'en' ? '⛽ Vehicle for Fuel Estimate' : locale === 'el' ? '⛽ Όχημα για Υπολογισμό Καυσίμου' : '⛽ Yakıt Hesabı İçin Araç'

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 px-3 py-2 text-xs">
      <span className="font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">{title}</span>
      <div className="flex flex-wrap gap-1.5">
        {CAR_TYPES.map((car) => (
          <button
            key={car.id}
            type="button"
            onClick={() => onChange(car.id)}
            className={`rounded-lg px-2.5 py-1 font-medium border transition-all ${
              carId === car.id
                ? 'bg-sky-50 dark:bg-sky-950/30 text-sky-600 dark:text-sky-400 border-sky-300 dark:border-sky-800'
                : 'bg-white dark:bg-neutral-900 border-slate-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400'
            }`}
          >
            {car.icon} {car.label[locale]}
          </button>
        ))}
      </div>
    </div>
  )
}
