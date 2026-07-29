import { Header } from '@/components/Header'
import { SiteFooter } from '@/components/SiteFooter'
import { AdInquiryForm } from '@/components/AdInquiryForm'

export const metadata = {
  title: 'Reklam Ver — Yunanisland',
  description: 'Yunanisland üzerinde reklam vermek ister misiniz? Bize ulaşın.',
}

export default function AdvertisePage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 transition-colors duration-300">
      <Header />

      <main className="mx-auto max-w-2xl px-6 py-16">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">📢 Yunanisland&apos;da Reklam Ver</h1>
        <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Yunan Adaları&apos;na gezi planlayan, yüksek niyetli bir kitleye ulaşmak ister misiniz?
          Ana sayfa, blog ve daha fazla sayfada reklam banner alanlarımız mevcut. Aşağıdaki formu
          doldurun, size uygun paketi ve fiyatlandırmayı konuşmak üzere en kısa sürede dönüş yapalım.
        </p>

        <div className="mt-8 grid grid-cols-3 gap-3 text-center">
          <div className="bg-white dark:bg-neutral-900 rounded-xl p-4 border border-slate-100 dark:border-neutral-900">
            <p className="text-2xl">🏠</p>
            <p className="mt-1 text-xs font-semibold text-neutral-700 dark:text-neutral-300">Ana Sayfa</p>
          </div>
          <div className="bg-white dark:bg-neutral-900 rounded-xl p-4 border border-slate-100 dark:border-neutral-900">
            <p className="text-2xl">📝</p>
            <p className="mt-1 text-xs font-semibold text-neutral-700 dark:text-neutral-300">Gezi Blogu</p>
          </div>
          <div className="bg-white dark:bg-neutral-900 rounded-xl p-4 border border-slate-100 dark:border-neutral-900">
            <p className="text-2xl">🏝️</p>
            <p className="mt-1 text-xs font-semibold text-neutral-700 dark:text-neutral-300">Ada Sayfaları</p>
          </div>
        </div>

        <AdInquiryForm />
      </main>

      <SiteFooter />
    </div>
  )
}
