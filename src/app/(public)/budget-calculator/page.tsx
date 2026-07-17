'use client'

import { useMemo, useState } from 'react'
import { Header } from '@/components/Header'
import { PageHero } from '@/components/PageHero'

const HOTEL_LEVELS = {
  budget: { label: 'Bütçe Otel', perNight: 40 },
  mid: { label: 'Orta Segment Otel', perNight: 90 },
  luxury: { label: 'Lüks Otel / Resort', perNight: 220 },
}

const TRANSPORT_LEVELS = {
  local: { label: 'Yerel Ulaşım (Otobüs/Yürüyüş)', perDay: 10 },
  scooter: { label: 'Scooter/Araç Kiralama', perDay: 35 },
  taxi: { label: 'Taksi Ağırlıklı', perDay: 60 },
}

const FOOD_LEVELS = {
  budget: { label: 'Sokak Lezzetleri & Market', perDay: 20 },
  mid: { label: 'Taverna & Orta Segment Restoranlar', perDay: 45 },
  luxury: { label: 'Gurme Restoranlar', perDay: 90 },
}

export default function BudgetCalculatorPage() {
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  const [days, setDays] = useState(5)
  const [hotelLevel, setHotelLevel] = useState<keyof typeof HOTEL_LEVELS>('mid')
  const [transportLevel, setTransportLevel] = useState<keyof typeof TRANSPORT_LEVELS>('local')
  const [foodLevel, setFoodLevel] = useState<keyof typeof FOOD_LEVELS>('mid')

  const result = useMemo(() => {
    const totalPeople = adults + children * 0.6
    const accommodation = HOTEL_LEVELS[hotelLevel].perNight * days
    const transport = TRANSPORT_LEVELS[transportLevel].perDay * days
    const food = FOOD_LEVELS[foodLevel].perDay * days * totalPeople
    const activities = 25 * days * totalPeople
    const total = accommodation + transport + food + activities

    return {
      accommodation: Math.round(accommodation),
      transport: Math.round(transport),
      food: Math.round(food),
      activities: Math.round(activities),
      total: Math.round(total),
    }
  }, [adults, children, days, hotelLevel, transportLevel, foodLevel])

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 transition-colors duration-300">
      <Header />

      <PageHero
        image="/kos.jpg"
        badge="Gezi Bütçesi"
        title="Bütçe Hesaplayıcı"
        subtitle="Kişi sayısı, gün ve tercih ettiğin konfor seviyesine göre tahmini seyahat bütçeni hesapla."
      />

      <main className="mx-auto max-w-5xl px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-slate-100 dark:border-neutral-900 shadow-sm space-y-6 h-fit">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">Yetişkin</label>
              <input
                type="number"
                min={1}
                value={adults}
                onChange={(e) => setAdults(Math.max(1, Number(e.target.value)))}
                className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-2.5 px-4 text-sm outline-none focus:border-sky-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">Çocuk</label>
              <input
                type="number"
                min={0}
                value={children}
                onChange={(e) => setChildren(Math.max(0, Number(e.target.value)))}
                className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-2.5 px-4 text-sm outline-none focus:border-sky-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">Gün Sayısı</label>
            <input
              type="number"
              min={1}
              value={days}
              onChange={(e) => setDays(Math.max(1, Number(e.target.value)))}
              className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-2.5 px-4 text-sm outline-none focus:border-sky-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">Konaklama Seviyesi</label>
            <div className="flex flex-col gap-2">
              {(Object.keys(HOTEL_LEVELS) as (keyof typeof HOTEL_LEVELS)[]).map((key) => (
                <button
                  key={key}
                  onClick={() => setHotelLevel(key)}
                  className={`text-left rounded-xl px-4 py-2.5 text-sm font-medium border transition-all ${
                    hotelLevel === key
                      ? 'bg-sky-50 dark:bg-sky-950/30 text-sky-600 border-sky-300'
                      : 'bg-slate-50 dark:bg-neutral-950 border-slate-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  {HOTEL_LEVELS[key].label} <span className="text-xs opacity-60">(~{HOTEL_LEVELS[key].perNight}€/gece)</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">Ulaşım Tercihi</label>
            <div className="flex flex-col gap-2">
              {(Object.keys(TRANSPORT_LEVELS) as (keyof typeof TRANSPORT_LEVELS)[]).map((key) => (
                <button
                  key={key}
                  onClick={() => setTransportLevel(key)}
                  className={`text-left rounded-xl px-4 py-2.5 text-sm font-medium border transition-all ${
                    transportLevel === key
                      ? 'bg-sky-50 dark:bg-sky-950/30 text-sky-600 border-sky-300'
                      : 'bg-slate-50 dark:bg-neutral-950 border-slate-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  {TRANSPORT_LEVELS[key].label} <span className="text-xs opacity-60">(~{TRANSPORT_LEVELS[key].perDay}€/gün)</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">Yeme-İçme Tercihi</label>
            <div className="flex flex-col gap-2">
              {(Object.keys(FOOD_LEVELS) as (keyof typeof FOOD_LEVELS)[]).map((key) => (
                <button
                  key={key}
                  onClick={() => setFoodLevel(key)}
                  className={`text-left rounded-xl px-4 py-2.5 text-sm font-medium border transition-all ${
                    foodLevel === key
                      ? 'bg-sky-50 dark:bg-sky-950/30 text-sky-600 border-sky-300'
                      : 'bg-slate-50 dark:bg-neutral-950 border-slate-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  {FOOD_LEVELS[key].label} <span className="text-xs opacity-60">(~{FOOD_LEVELS[key].perDay}€/gün/kişi)</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-slate-100 dark:border-neutral-900 shadow-sm h-fit">
          <h2 className="text-lg font-bold text-neutral-900 dark:text-white mb-6">Tahmini Bütçe</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between border-b border-slate-100 dark:border-neutral-800 pb-3">
              <span className="text-neutral-500">🏨 Konaklama</span>
              <span className="font-semibold text-neutral-800 dark:text-neutral-200">{result.accommodation} €</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 dark:border-neutral-800 pb-3">
              <span className="text-neutral-500">🚗 Ulaşım</span>
              <span className="font-semibold text-neutral-800 dark:text-neutral-200">{result.transport} €</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 dark:border-neutral-800 pb-3">
              <span className="text-neutral-500">🍽️ Yeme-İçme</span>
              <span className="font-semibold text-neutral-800 dark:text-neutral-200">{result.food} €</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 dark:border-neutral-800 pb-3">
              <span className="text-neutral-500">🎟️ Aktiviteler</span>
              <span className="font-semibold text-neutral-800 dark:text-neutral-200">{result.activities} €</span>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between bg-sky-50 dark:bg-sky-950/30 rounded-xl px-4 py-4">
            <span className="text-sm font-bold text-neutral-700 dark:text-neutral-300">Tahmini Toplam</span>
            <span className="text-2xl font-extrabold text-sky-600 dark:text-sky-400">{result.total} €</span>
          </div>
          <p className="mt-4 text-xs text-neutral-400 leading-relaxed">
            Bu tahmin ortalama fiyatlara dayanır, sezona ve rezervasyon zamanına göre değişebilir. Feribot/uçak bileti fiyatları dahil değildir.
          </p>
        </div>
      </main>
    </div>
  )
}
