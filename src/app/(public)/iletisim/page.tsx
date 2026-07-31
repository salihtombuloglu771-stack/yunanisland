import { Header } from '@/components/Header'
import { SiteFooter } from '@/components/SiteFooter'
import { ContactForm } from '@/components/ContactForm'

export const metadata = {
  title: 'İletişim — Yunanisland',
  description: 'Sorularınız, önerileriniz veya iş birliği talepleriniz için bize ulaşın.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 transition-colors duration-300">
      <Header />

      <main className="mx-auto max-w-2xl px-6 py-16">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">✉️ İletişim</h1>
        <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Sorularınız, önerileriniz veya iş birliği talepleriniz için aşağıdaki formu doldurabilirsiniz.
          En kısa sürede e-posta adresinizden size dönüş yapacağız.
        </p>

        <ContactForm />
      </main>

      <SiteFooter />
    </div>
  )
}
