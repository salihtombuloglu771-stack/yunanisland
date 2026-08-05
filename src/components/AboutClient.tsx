'use client'

import Image from 'next/image'
import { Header } from '@/components/Header'
import { SiteFooter } from '@/components/SiteFooter'
import { useLanguage } from '@/lib/i18n/LanguageProvider'

const CONTENT = {
  tr: {
    title: 'Hakkımızda',
    intro: 'Yunanisland, T.C. Kültür ve Turizm Bakanlığı\'ndan A Grubu Seyahat Acentası belgesine sahip Adema Turizm Dış Ticaret Limited Şirketi (Pars Safari Turizm) çatısı altında hazırlanan bir gezi rehberi projesidir. Amacımız, Yunan Adaları\'nı gezmeyi planlayan Türkçe konuşan gezginler için tarafsız, güncel ve gerçek bilgiye dayalı bir kaynak oluşturmak.',
    whatTitle: 'Sitede Neler Var?',
    whatItems: [
      'Yunan adaları, plajları, restoranları, otelleri ve gezilecek yerleri hakkında detaylı, gerçek bilgi',
      'Canlı hava durumu, deniz sıcaklığı ve döviz kuru verileri',
      'Gerçek kullanıcı yorumları, puanlamaları ve paylaşılan fotoğraflar',
      'Feribot ve uçak bileti karşılaştırma araçları',
      'Bütçe hesaplayıcı, gezi checklist\'i ve interaktif harita',
    ],
    legalTitle: 'Yasal Bilgiler',
    legalItems: [
      { label: 'Şirket', value: 'Adema Turizm Dış Ticaret Limited Şirketi' },
      { label: 'Marka', value: 'Pars Safari Turizm' },
      { label: 'Belge Türü', value: 'A Grubu Seyahat Acentası İşletme Belgesi' },
      { label: 'Belge No', value: '13637' },
      { label: 'Merkezi', value: 'Burdur' },
    ],
    legalImageAlt: 'A Grubu Seyahat Acentası İşletme Belgesi',
    honestyTitle: 'Dürüstlük İlkemiz',
    honesty: 'Sitedeki hiçbir fiyat veya rezervasyon bilgisi uydurma değildir: sitenin kendi üzerinden doğrudan rezervasyon alınmayan yerlerde (ör. uçak bileti), sizi doğrudan gerçek fiyatları gösteren dış kaynaklara (Google Flights gibi) yönlendiriyoruz. İçerik sürekli güncellenmekte ve genişletilmektedir.',
    contactTitle: 'İletişim',
    contact: 'Öneri, düzeltme veya iş birliği talepleriniz için',
    contactLink: 'iletişim sayfamızı',
    contactSuffix: 'kullanabilirsiniz.',
  },
  en: {
    title: 'About Us',
    intro: 'Yunanisland is a travel guide project run under Adema Turizm Dış Ticaret Limited Şirketi (Pars Safari Turizm), a Group A licensed travel agency registered with the Turkish Ministry of Culture and Tourism. Our goal is to provide an unbiased, up-to-date resource grounded in real information for Turkish-speaking travelers planning a trip to the Greek Islands.',
    whatTitle: 'What\'s on the Site?',
    whatItems: [
      'Detailed, real information on Greek islands, beaches, restaurants, hotels and attractions',
      'Live weather, sea temperature and currency exchange data',
      'Real user reviews, ratings and shared photos',
      'Ferry and flight price comparison tools',
      'A budget calculator, trip checklist and interactive map',
    ],
    legalTitle: 'Legal Information',
    legalItems: [
      { label: 'Company', value: 'Adema Turizm Dış Ticaret Limited Şirketi' },
      { label: 'Brand', value: 'Pars Safari Turizm' },
      { label: 'License Type', value: 'Group A Travel Agency License' },
      { label: 'License No.', value: '13637' },
      { label: 'Headquarters', value: 'Burdur, Turkey' },
    ],
    legalImageAlt: 'Group A Travel Agency License',
    honestyTitle: 'Our Honesty Principle',
    honesty: 'No price or booking information on this site is made up: where the site doesn\'t take a direct booking itself (e.g. flights), we send you directly to external sources showing real prices (like Google Flights). Content is continuously updated and expanded.',
    contactTitle: 'Contact',
    contact: 'For suggestions, corrections or partnership inquiries, you can use our',
    contactLink: 'contact page',
    contactSuffix: '.',
  },
  el: {
    title: 'Σχετικά με Εμάς',
    intro: 'Το Yunanisland είναι ένα έργο ταξιδιωτικού οδηγού που λειτουργεί υπό την Adema Turizm Dış Ticaret Limited Şirketi (Pars Safari Turizm), ένα αδειοδοτημένο ταξιδιωτικό γραφείο Ομάδας Α, καταχωρημένο στο Τουρκικό Υπουργείο Πολιτισμού και Τουρισμού. Στόχος μας είναι μια αμερόληπτη, ενημερωμένη πηγή βασισμένη σε πραγματικές πληροφορίες για τουρκόφωνους ταξιδιώτες που σχεδιάζουν ταξίδι στα Ελληνικά Νησιά.',
    whatTitle: 'Τι Περιλαμβάνει η Ιστοσελίδα;',
    whatItems: [
      'Λεπτομερείς, πραγματικές πληροφορίες για ελληνικά νησιά, παραλίες, εστιατόρια, ξενοδοχεία και αξιοθέατα',
      'Δεδομένα καιρού, θερμοκρασίας θάλασσας και συναλλάγματος σε πραγματικό χρόνο',
      'Πραγματικές κριτικές χρηστών, βαθμολογίες και κοινόχρηστες φωτογραφίες',
      'Εργαλεία σύγκρισης τιμών πλοίων και πτήσεων',
      'Υπολογιστή προϋπολογισμού, λίστα ελέγχου ταξιδιού και διαδραστικό χάρτη',
    ],
    legalTitle: 'Νομικές Πληροφορίες',
    legalItems: [
      { label: 'Εταιρεία', value: 'Adema Turizm Dış Ticaret Limited Şirketi' },
      { label: 'Εμπορικό Σήμα', value: 'Pars Safari Turizm' },
      { label: 'Τύπος Άδειας', value: 'Άδεια Ταξιδιωτικού Γραφείου Ομάδας Α' },
      { label: 'Αρ. Άδειας', value: '13637' },
      { label: 'Έδρα', value: 'Burdur, Τουρκία' },
    ],
    legalImageAlt: 'Άδεια Ταξιδιωτικού Γραφείου Ομάδας Α',
    honestyTitle: 'Η Αρχή Ειλικρίνειάς μας',
    honesty: 'Καμία πληροφορία τιμής ή κράτησης σε αυτή την ιστοσελίδα δεν είναι επινοημένη: όπου η ιστοσελίδα δεν δέχεται απευθείας κράτηση η ίδια (π.χ. πτήσεις), σας κατευθύνουμε απευθείας σε εξωτερικές πηγές που δείχνουν πραγματικές τιμές (όπως το Google Flights). Το περιεχόμενο ενημερώνεται και επεκτείνεται συνεχώς.',
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

        <h2>{c.legalTitle}</h2>
        <dl className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {c.legalItems.map((item) => (
            <div key={item.label} className="bg-white dark:bg-neutral-900 rounded-xl border border-slate-100 dark:border-neutral-900 px-4 py-3">
              <dt className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">{item.label}</dt>
              <dd className="text-sm font-medium text-neutral-800 dark:text-neutral-200">{item.value}</dd>
            </div>
          ))}
        </dl>
        <div className="not-prose relative w-full max-w-sm mx-auto aspect-[9/16] rounded-xl overflow-hidden border border-slate-200 dark:border-neutral-800 shadow-sm mb-8">
          <Image src="/seyahat-acentasi-belgesi.jpg" alt={c.legalImageAlt} fill className="object-cover" />
        </div>

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
