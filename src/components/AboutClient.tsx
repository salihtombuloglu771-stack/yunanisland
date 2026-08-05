'use client'

import { Header } from '@/components/Header'
import { SiteFooter } from '@/components/SiteFooter'
import { useLanguage } from '@/lib/i18n/LanguageProvider'

const CONTENT = {
  tr: {
    title: 'Hakkımızda',
    intro: 'Yunanisland, Yunan Adaları\'nı gezmeyi planlayan Türkçe konuşan gezginler için bağımsız olarak hazırlanan kapsamlı bir gezi rehberidir. Herhangi bir seyahat acentesi, otel zinciri ya da turizm kurumuyla bağlantımız yoktur — amacımız tarafsız, güncel ve gerçek bilgiye dayalı bir kaynak oluşturmak.',
    whatTitle: 'Sitede Neler Var?',
    whatItems: [
      'Yunan adaları, plajları, restoranları, otelleri ve gezilecek yerleri hakkında detaylı, gerçek bilgi',
      'Canlı hava durumu, deniz sıcaklığı ve döviz kuru verileri',
      'Gerçek kullanıcı yorumları, puanlamaları ve paylaşılan fotoğraflar',
      'Feribot ve uçak bileti karşılaştırma araçları',
      'Bütçe hesaplayıcı, gezi checklist\'i ve interaktif harita',
    ],
    honestyTitle: 'Dürüstlük İlkemiz',
    honesty: 'Sitedeki hiçbir fiyat veya rezervasyon bilgisi uydurma değildir: gerçek bir bilet/rezervasyon sistemimiz olmadığı yerlerde (ör. uçak bileti), sizi doğrudan gerçek fiyatları gösteren dış kaynaklara (Google Flights gibi) yönlendiriyoruz. İçerik sürekli güncellenmekte ve genişletilmektedir.',
    contactTitle: 'İletişim',
    contact: 'Öneri, düzeltme veya iş birliği talepleriniz için',
    contactLink: 'iletişim sayfamızı',
    contactSuffix: 'kullanabilirsiniz.',
  },
  en: {
    title: 'About Us',
    intro: 'Yunanisland is an independently run travel guide for the Greek Islands, built for Turkish-speaking travelers planning their trip. We have no affiliation with any travel agency, hotel chain, or tourism board — our goal is to provide an unbiased, up-to-date resource grounded in real information.',
    whatTitle: 'What\'s on the Site?',
    whatItems: [
      'Detailed, real information on Greek islands, beaches, restaurants, hotels and attractions',
      'Live weather, sea temperature and currency exchange data',
      'Real user reviews, ratings and shared photos',
      'Ferry and flight price comparison tools',
      'A budget calculator, trip checklist and interactive map',
    ],
    honestyTitle: 'Our Honesty Principle',
    honesty: 'No price or booking information on this site is made up: where we don\'t have a real booking system of our own (e.g. flights), we send you directly to external sources showing real prices (like Google Flights). Content is continuously updated and expanded.',
    contactTitle: 'Contact',
    contact: 'For suggestions, corrections or partnership inquiries, you can use our',
    contactLink: 'contact page',
    contactSuffix: '.',
  },
  el: {
    title: 'Σχετικά με Εμάς',
    intro: 'Το Yunanisland είναι ένας ανεξάρτητος ταξιδιωτικός οδηγός για τα Ελληνικά Νησιά, φτιαγμένος για τουρκόφωνους ταξιδιώτες που σχεδιάζουν το ταξίδι τους. Δεν έχουμε καμία σχέση με ταξιδιωτικό γραφείο, αλυσίδα ξενοδοχείων ή τουριστικό οργανισμό — στόχος μας είναι μια αμερόληπτη, ενημερωμένη πηγή βασισμένη σε πραγματικές πληροφορίες.',
    whatTitle: 'Τι Περιλαμβάνει η Ιστοσελίδα;',
    whatItems: [
      'Λεπτομερείς, πραγματικές πληροφορίες για ελληνικά νησιά, παραλίες, εστιατόρια, ξενοδοχεία και αξιοθέατα',
      'Δεδομένα καιρού, θερμοκρασίας θάλασσας και συναλλάγματος σε πραγματικό χρόνο',
      'Πραγματικές κριτικές χρηστών, βαθμολογίες και κοινόχρηστες φωτογραφίες',
      'Εργαλεία σύγκρισης τιμών πλοίων και πτήσεων',
      'Υπολογιστή προϋπολογισμού, λίστα ελέγχου ταξιδιού και διαδραστικό χάρτη',
    ],
    honestyTitle: 'Η Αρχή Ειλικρίνειάς μας',
    honesty: 'Καμία πληροφορία τιμής ή κράτησης σε αυτή την ιστοσελίδα δεν είναι επινοημένη: όπου δεν έχουμε δικό μας σύστημα κρατήσεων (π.χ. πτήσεις), σας κατευθύνουμε απευθείας σε εξωτερικές πηγές που δείχνουν πραγματικές τιμές (όπως το Google Flights). Το περιεχόμενο ενημερώνεται και επεκτείνεται συνεχώς.',
    contactTitle: 'Επικοινωνία',
    contact: 'Για προτάσεις, διορθώσεις ή αιτήματα συνεργασίας, μπορείτε να χρησιμοποιήσετε τη',
    contactLink: 'σελίδα επικοινωνίας μας',
    contactSuffix: '.',
  },
}

export function AboutClient() {
  const { locale } = useLanguage()
  const c = CONTENT[locale]

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 transition-colors duration-300">
      <Header />

      <main className="mx-auto max-w-3xl px-6 py-16 prose dark:prose-invert prose-sm sm:prose-base">
        <h1>{c.title}</h1>

        <p>{c.intro}</p>

        <h2>{c.whatTitle}</h2>
        <ul>
          {c.whatItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <h2>{c.honestyTitle}</h2>
        <p>{c.honesty}</p>

        <h2>{c.contactTitle}</h2>
        <p>
          {c.contact}{' '}
          <a href="/iletisim">{c.contactLink}</a>
          {c.contactSuffix}
        </p>
      </main>

      <SiteFooter />
    </div>
  )
}
