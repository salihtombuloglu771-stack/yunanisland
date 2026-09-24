import Link from '@/components/LocaleLink'

interface IslandSummary {
  slug: string
  name: string
  budget_level: string
  best_time_to_visit: string | null
}

const BUDGET_LABELS: Record<string, string> = {
  budget: 'Bütçe Dostu',
  mid: 'Orta Segment',
  luxury: 'Lüks',
}

export function HomeSeoContent({ islands }: { islands: IslandSummary[] }) {
  const byBudget: Record<string, IslandSummary[]> = {}
  for (const island of islands) {
    byBudget[island.budget_level] = byBudget[island.budget_level] ?? []
    byBudget[island.budget_level].push(island)
  }

  return (
    <section className="mt-16 border-t border-slate-200 dark:border-neutral-800 pt-12">
      <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">Yunan Adaları Rehberi: Nereye, Ne Zaman Gitmeli?</h2>
      <p className="mt-4 text-neutral-700 dark:text-neutral-300 leading-relaxed max-w-3xl">
        Yunan Adaları'nı ziyaret etmeyi planlıyorsanız doğru yerdesiniz. Yunanisland, ilham veren fotoğraflardan öte,
        her ada için gerçek fiyatlar, gezgin yorumları, feribot rotaları ve pratik araçlar sunan kapsamlı bir Yunan
        Adaları rehberidir. Aşağıda bütçenize ve zamanınıza göre hangi adayı seçmeniz gerektiğine dair gerçek verilere
        dayanan bir özet bulacaksınız.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        {(['budget', 'mid', 'luxury'] as const).map((level) => (
          byBudget[level]?.length ? (
            <div key={level} className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-slate-100 dark:border-neutral-900">
              <h3 className="font-bold text-neutral-900 dark:text-white">{BUDGET_LABELS[level]} Yunan Adaları</h3>
              <ul className="mt-3 space-y-1.5 text-sm">
                {byBudget[level].map((i) => (
                  <li key={i.slug}>
                    <Link href={`/islands/${i.slug}`} className="text-sky-600 dark:text-sky-400 hover:underline">
                      {i.name}
                    </Link>
                    {i.best_time_to_visit && <span className="text-neutral-400"> — en iyi zaman: {i.best_time_to_visit}</span>}
                  </li>
                ))}
              </ul>
            </div>
          ) : null
        ))}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div>
          <h3 className="font-bold text-neutral-900 dark:text-white">Adalar Arası Nasıl Ulaşılır?</h3>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Yunan Adaları arasındaki en yaygın ulaşım yöntemi feribotlardır. Hangi adadan hangi adaya, hangi sıklıkla
            feribot olduğunu görmek için{' '}
            <Link href="/ferry-guide" className="text-sky-600 dark:text-sky-400 hover:underline">Feribot Rehberi</Link>'mizi inceleyebilirsiniz.
          </p>
        </div>
        <div>
          <h3 className="font-bold text-neutral-900 dark:text-white">Bütçenizi Nasıl Planlarsınız?</h3>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Konaklama, yemek ve ulaşım masraflarınızı seçtiğiniz adaya göre tahmin etmek için{' '}
            <Link href="/budget-calculator" className="text-sky-600 dark:text-sky-400 hover:underline">Bütçe Hesaplayıcı</Link> aracımızı,
            iki adayı yan yana karşılaştırmak için ise{' '}
            <Link href="/compare" className="text-sky-600 dark:text-sky-400 hover:underline">Karşılaştır</Link> sayfasını kullanabilirsiniz.
          </p>
        </div>
      </div>
    </section>
  )
}
