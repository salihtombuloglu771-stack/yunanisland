'use client'

import { useState } from 'react'

interface IslandOption { id: string; name: string; slug: string }

interface TripPlan {
  title: string
  summary: string
  days: { day: number; title: string; activities: string[] }[]
  tips: string[]
}

export function TripPlannerClient({ islands }: { islands: IslandOption[] }) {
  const [days, setDays] = useState(5)
  const [adults, setAdults] = useState(2)
  const [budgetLevel, setBudgetLevel] = useState<'budget' | 'mid' | 'luxury'>('mid')
  const [style, setStyle] = useState<'romantic' | 'family' | 'adventure' | 'nightlife' | 'relax'>('relax')
  const [islandSlug, setIslandSlug] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [plan, setPlan] = useState<TripPlan | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setPlan(null)

    try {
      const res = await fetch('/api/trip-planner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ days, adults, budgetLevel, style, islandSlug: islandSlug || undefined }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'Bir hata oluştu.')
      } else {
        setPlan(data.plan)
      }
    } catch {
      setError('Sunucuya ulaşılamadı.')
    }
    setLoading(false)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-slate-100 dark:border-neutral-900 shadow-sm h-fit space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">Gün Sayısı</label>
            <input type="number" min={1} max={14} value={days} onChange={(e) => setDays(Number(e.target.value))}
              className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-2.5 px-4 text-sm outline-none focus:border-sky-500" />
          </div>
          <div>
            <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">Yetişkin Sayısı</label>
            <input type="number" min={1} value={adults} onChange={(e) => setAdults(Number(e.target.value))}
              className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-2.5 px-4 text-sm outline-none focus:border-sky-500" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">Bütçe Seviyesi</label>
          <select value={budgetLevel} onChange={(e) => setBudgetLevel(e.target.value as typeof budgetLevel)}
            className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-2.5 px-4 text-sm outline-none focus:border-sky-500">
            <option value="budget">💰 Bütçe Dostu</option>
            <option value="mid">💳 Orta Segment</option>
            <option value="luxury">💎 Lüks</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">Seyahat Tarzı</label>
          <select value={style} onChange={(e) => setStyle(e.target.value as typeof style)}
            className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-2.5 px-4 text-sm outline-none focus:border-sky-500">
            <option value="relax">🧘 Sakin / Dinlenme</option>
            <option value="romantic">💕 Romantik / Balayı</option>
            <option value="family">👨‍👩‍👧 Aile Dostu</option>
            <option value="adventure">🏄 Macera / Aktivite</option>
            <option value="nightlife">🎉 Gece Hayatı</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">Ada Tercihi</label>
          <select value={islandSlug} onChange={(e) => setIslandSlug(e.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-2.5 px-4 text-sm outline-none focus:border-sky-500">
            <option value="">Fark etmez, öner</option>
            {islands.map((i) => <option key={i.id} value={i.slug}>{i.name}</option>)}
          </select>
        </div>

        <button type="submit" disabled={loading}
          className="w-full rounded-xl bg-sky-600 hover:bg-sky-500 py-3 text-sm font-semibold text-white shadow-md transition-colors disabled:opacity-50">
          {loading ? 'Planlanıyor...' : '✨ Gezi Planımı Oluştur'}
        </button>

        {error && <p className="text-sm text-red-600">{error}</p>}
      </form>

      <div>
        {!plan && !loading && (
          <div className="py-16 text-center bg-white dark:bg-neutral-900 border border-dashed border-slate-200 dark:border-neutral-800 rounded-2xl">
            <span className="text-4xl">🤖🏝️</span>
            <p className="mt-4 text-sm text-neutral-500">Tercihlerini seç, yapay zeka sana özel bir gezi planı hazırlasın.</p>
          </div>
        )}

        {loading && (
          <div className="py-16 text-center bg-white dark:bg-neutral-900 border border-slate-100 dark:border-neutral-900 rounded-2xl animate-pulse">
            <span className="text-4xl">🤔</span>
            <p className="mt-4 text-sm text-neutral-500">Yapay zeka senin için en iyi rotayı düşünüyor...</p>
          </div>
        )}

        {plan && (
          <div className="space-y-4">
            <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-slate-100 dark:border-neutral-900 shadow-sm">
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white">{plan.title}</h2>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">{plan.summary}</p>
            </div>

            {plan.days.map((d) => (
              <div key={d.day} className="bg-white dark:bg-neutral-900 p-5 rounded-2xl border border-slate-100 dark:border-neutral-900 shadow-sm">
                <h3 className="text-sm font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider mb-2">Gün {d.day}: {d.title}</h3>
                <ul className="space-y-1.5 text-sm text-neutral-700 dark:text-neutral-300">
                  {d.activities.map((a, i) => <li key={i}>• {a}</li>)}
                </ul>
              </div>
            ))}

            {plan.tips.length > 0 && (
              <div className="bg-sky-50 dark:bg-sky-950/30 p-5 rounded-2xl">
                <h3 className="text-sm font-bold text-sky-700 dark:text-sky-400 mb-2">💡 İpuçları</h3>
                <ul className="space-y-1 text-sm text-sky-800 dark:text-sky-300">
                  {plan.tips.map((tip, i) => <li key={i}>• {tip}</li>)}
                </ul>
              </div>
            )}

            <p className="text-[10px] text-neutral-400 text-center">
              Bu plan yapay zeka tarafından oluşturulmuştur, gerçek rezervasyon/açılış saatlerini kontrol etmenizi öneririz.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
