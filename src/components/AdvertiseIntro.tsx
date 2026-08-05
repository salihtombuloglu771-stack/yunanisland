'use client'

import { useLanguage } from '@/lib/i18n/LanguageProvider'

export function AdvertiseIntro() {
  const { locale } = useLanguage()

  const t = {
    title: locale === 'en' ? "📢 Advertise on Yunanisland" : locale === 'el' ? '📢 Διαφημίσου στο Yunanisland' : "📢 Yunanisland'da Reklam Ver",
    subtitle: locale === 'en'
      ? 'Want to reach a highly intent audience planning a trip to the Greek Islands? We have ad banner spots available on the homepage, blog and more. Fill out the form below and we\'ll get back to you shortly to discuss the right package and pricing for you.'
      : locale === 'el'
        ? 'Θέλεις να φτάσεις σε ένα κοινό με υψηλή πρόθεση που σχεδιάζει ταξίδι στα Ελληνικά Νησιά; Διαθέτουμε χώρους διαφημιστικών banner στην αρχική σελίδα, το blog και αλλού. Συμπλήρωσε την παρακάτω φόρμα και θα επικοινωνήσουμε μαζί σου σύντομα για να συζητήσουμε το κατάλληλο πακέτο και την τιμολόγηση.'
        : "Yunan Adaları'na gezi planlayan, yüksek niyetli bir kitleye ulaşmak ister misiniz? Ana sayfa, blog ve daha fazla sayfada reklam banner alanlarımız mevcut. Aşağıdaki formu doldurun, size uygun paketi ve fiyatlandırmayı konuşmak üzere en kısa sürede dönüş yapalım.",
    home: locale === 'en' ? 'Homepage' : locale === 'el' ? 'Αρχική Σελίδα' : 'Ana Sayfa',
    blog: locale === 'en' ? 'Travel Blog' : locale === 'el' ? 'Ταξιδιωτικό Blog' : 'Gezi Blogu',
    islandPages: locale === 'en' ? 'Island Pages' : locale === 'el' ? 'Σελίδες Νησιών' : 'Ada Sayfaları',
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">{t.title}</h1>
      <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
        {t.subtitle}
      </p>

      <div className="mt-8 grid grid-cols-3 gap-3 text-center">
        <div className="bg-white dark:bg-neutral-900 rounded-xl p-4 border border-slate-100 dark:border-neutral-900">
          <p className="text-2xl">🏠</p>
          <p className="mt-1 text-xs font-semibold text-neutral-700 dark:text-neutral-300">{t.home}</p>
        </div>
        <div className="bg-white dark:bg-neutral-900 rounded-xl p-4 border border-slate-100 dark:border-neutral-900">
          <p className="text-2xl">📝</p>
          <p className="mt-1 text-xs font-semibold text-neutral-700 dark:text-neutral-300">{t.blog}</p>
        </div>
        <div className="bg-white dark:bg-neutral-900 rounded-xl p-4 border border-slate-100 dark:border-neutral-900">
          <p className="text-2xl">🏝️</p>
          <p className="mt-1 text-xs font-semibold text-neutral-700 dark:text-neutral-300">{t.islandPages}</p>
        </div>
      </div>
    </>
  )
}
