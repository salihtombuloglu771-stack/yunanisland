import { Header } from '@/components/Header'
import { SiteFooter } from '@/components/SiteFooter'
import { AdInquiryForm } from '@/components/AdInquiryForm'
import { AdvertiseIntro } from '@/components/AdvertiseIntro'

export const metadata = {
  title: 'Reklam Ver — Yunanisland',
  description: 'Yunanisland üzerinde reklam vermek ister misiniz? Bize ulaşın.',
}

export default function AdvertisePage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 transition-colors duration-300">
      <Header />

      <main className="mx-auto max-w-2xl px-6 py-16">
        <AdvertiseIntro />

        <AdInquiryForm />
      </main>

      <SiteFooter />
    </div>
  )
}
