'use client'

import { useLanguage } from '@/lib/i18n/LanguageProvider'

export function ContactIntro() {
  const { locale } = useLanguage()

  const t = {
    title: locale === 'en' ? '✉️ Contact' : locale === 'el' ? '✉️ Επικοινωνία' : '✉️ İletişim',
    subtitle: locale === 'en'
      ? 'You can fill out the form below for your questions, suggestions or collaboration requests. We will get back to you via your email address as soon as possible.'
      : locale === 'el'
        ? 'Μπορείς να συμπληρώσεις την παρακάτω φόρμα για ερωτήσεις, προτάσεις ή αιτήματα συνεργασίας. Θα επικοινωνήσουμε μαζί σου μέσω του email σου το συντομότερο δυνατό.'
        : 'Sorularınız, önerileriniz veya iş birliği talepleriniz için aşağıdaki formu doldurabilirsiniz. En kısa sürede e-posta adresinizden size dönüş yapacağız.',
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">{t.title}</h1>
      <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
        {t.subtitle}
      </p>
    </>
  )
}
