import { Header } from '@/components/Header'
import { SiteFooter } from '@/components/SiteFooter'
import { ContactForm } from '@/components/ContactForm'
import { ContactIntro } from '@/components/ContactIntro'

export const metadata = {
  title: 'İletişim — Yunanisland',
  description: 'Sorularınız, önerileriniz veya iş birliği talepleriniz için bize ulaşın.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 transition-colors duration-300">
      <Header />

      <main className="mx-auto max-w-2xl px-6 py-16">
        <ContactIntro />

        <ContactForm />
      </main>

      <SiteFooter />
    </div>
  )
}
