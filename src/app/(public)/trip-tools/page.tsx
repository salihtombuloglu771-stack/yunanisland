'use client'

import { useEffect, useState } from 'react'
import { Header } from '@/components/Header'
import { PageHero } from '@/components/PageHero'
import { useLocalStorageState } from '@/lib/useLocalStorageState'

const DEFAULT_CHECKLIST = [
  'Pasaport (en az 6 ay geçerlilik)',
  'Schengen Vizesi',
  'Otel / Konaklama Rezervasyonu',
  'Feribot / Uçak Bileti',
  'Seyahat Sağlık Sigortası',
  'Yeterli Euro Nakit',
  'Elektrik Adaptörü (Tip C/F)',
  'Kişisel İlaçlar',
  'eSIM / Yerel SIM Kart',
  'Güneş Kremi & Şapka',
]

function TravelChecklist() {
  const [checked, setChecked] = useLocalStorageState<Record<string, boolean>>('yunanisland-checklist', {})

  const toggle = (item: string) => setChecked((c) => ({ ...c, [item]: !c[item] }))
  const doneCount = DEFAULT_CHECKLIST.filter((i) => checked[i]).length

  return (
    <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-slate-100 dark:border-neutral-900 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-neutral-900 dark:text-white">✅ Seyahat Checklist</h2>
        <span className="text-xs font-semibold text-sky-600">{doneCount}/{DEFAULT_CHECKLIST.length}</span>
      </div>
      <div className="space-y-2">
        {DEFAULT_CHECKLIST.map((item) => (
          <label key={item} className="flex items-center gap-3 text-sm text-neutral-700 dark:text-neutral-300 cursor-pointer">
            <input
              type="checkbox"
              checked={!!checked[item]}
              onChange={() => toggle(item)}
              className="rounded border-slate-300 text-sky-600 focus:ring-sky-500 h-4 w-4"
            />
            <span className={checked[item] ? 'line-through text-neutral-400' : ''}>{item}</span>
          </label>
        ))}
      </div>
      <p className="mt-4 text-xs text-neutral-400">İşaretlemelerin tarayıcında saklanır, bir dahaki gelişinde kaldığın yerden devam edersin.</p>
    </div>
  )
}

function VacationCountdown() {
  const [targetDate, setTargetDate] = useLocalStorageState<string>('yunanisland-countdown-date', '')
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())
    const interval = setInterval(() => setNow(new Date()), 60_000)
    return () => clearInterval(interval)
  }, [])

  const daysLeft = targetDate && now
    ? Math.ceil((new Date(targetDate).getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    : null

  return (
    <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-slate-100 dark:border-neutral-900 shadow-sm">
      <h2 className="text-lg font-bold text-neutral-900 dark:text-white mb-4">🏖️ Tatil Geri Sayımı</h2>
      <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">Tatil Tarihin</label>
      <input
        type="date"
        value={targetDate}
        onChange={(e) => setTargetDate(e.target.value)}
        className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-2.5 px-4 text-sm outline-none focus:border-sky-500"
      />

      {daysLeft !== null && (
        <div className="mt-6 text-center">
          {daysLeft > 0 ? (
            <>
              <p className="text-4xl font-extrabold text-sky-600 dark:text-sky-400">{daysLeft}</p>
              <p className="text-sm text-neutral-500 mt-1">gün kaldı 🏝️</p>
            </>
          ) : daysLeft === 0 ? (
            <p className="text-lg font-bold text-emerald-600">Bugün tatil günü! İyi tatiller 🎉</p>
          ) : (
            <p className="text-sm text-neutral-400">Bu tarih geçmişte kalmış.</p>
          )}
        </div>
      )}
    </div>
  )
}

export default function TripToolsPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 transition-colors duration-300">
      <Header />

      <PageHero
        image="/santorini.jpg"
        badge="Seyahat Araçları"
        title="Hazırlık Araçların"
        subtitle="Tatilin için geri sayım yap, hazırlık listeni takip et."
      />

      <main className="mx-auto max-w-3xl px-6 py-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <VacationCountdown />
        <TravelChecklist />
      </main>
    </div>
  )
}
