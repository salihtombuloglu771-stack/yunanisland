'use client'

import { useEffect, useState } from 'react'
import { Header } from '@/components/Header'
import { SiteFooter } from '@/components/SiteFooter'
import { PageHero } from '@/components/PageHero'
import { useLocalStorageState } from '@/lib/useLocalStorageState'
import { useLanguage } from '@/lib/i18n/LanguageProvider'

const CHECKLIST_ITEMS = {
  tr: [
    'Pasaport (en az 6 ay geçerlilik)',
    'Schengen Vizesi',
    'Otel / Konaklama Rezervasyonu',
    'Feribot / Uçak Bileti',
    'Seyahat Sağlık Sigortası',
    'Yeterli Euro Nakit',
    'Elektrik Adaptörü (Tip C/F)',
    'Kişisel İlaçlar',
    'eSIM / Yerel SIM Kart',
    'Güneş Kremi & Şapka',
  ],
  en: [
    'Passport (valid at least 6 months)',
    'Schengen Visa',
    'Hotel / Accommodation Reservation',
    'Ferry / Flight Ticket',
    'Travel Health Insurance',
    'Enough Euro Cash',
    'Power Adapter (Type C/F)',
    'Personal Medication',
    'eSIM / Local SIM Card',
    'Sunscreen & Hat',
  ],
  el: [
    'Διαβατήριο (ισχύς τουλάχιστον 6 μήνες)',
    'Βίζα Σένγκεν',
    'Κράτηση Ξενοδοχείου / Διαμονής',
    'Εισιτήριο Φέριμποτ / Αεροπλάνου',
    'Ταξιδιωτική Ασφάλεια Υγείας',
    'Αρκετά Μετρητά σε Ευρώ',
    'Προσαρμογέας Ρεύματος (Τύπος C/F)',
    'Προσωπική Φαρμακευτική Αγωγή',
    'eSIM / Τοπική Κάρτα SIM',
    'Αντηλιακό & Καπέλο',
  ],
}

// DEFAULT_CHECKLIST keeps the Turkish strings as the storage keys, so existing
// saved progress in users' browsers keeps working across locales.
const DEFAULT_CHECKLIST = CHECKLIST_ITEMS.tr

function TravelChecklist() {
  const { locale } = useLanguage()
  const [checked, setChecked] = useLocalStorageState<Record<string, boolean>>('yunanisland-checklist', {})

  const toggle = (item: string) => setChecked((c) => ({ ...c, [item]: !c[item] }))
  const doneCount = DEFAULT_CHECKLIST.filter((i) => checked[i]).length
  const displayItems = CHECKLIST_ITEMS[locale]

  const t = {
    title: locale === 'en' ? '✅ Travel Checklist' : locale === 'el' ? '✅ Λίστα Ελέγχου Ταξιδιού' : '✅ Seyahat Checklist',
    note: locale === 'en'
      ? 'Your checkmarks are saved in your browser, so you can continue where you left off next time.'
      : locale === 'el'
      ? 'Οι επιλογές σας αποθηκεύονται στο πρόγραμμα περιήγησής σας, ώστε να συνεχίσετε από εκεί που σταματήσατε την επόμενη φορά.'
      : 'İşaretlemelerin tarayıcında saklanır, bir dahaki gelişinde kaldığın yerden devam edersin.',
  }

  return (
    <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-slate-100 dark:border-neutral-900 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-neutral-900 dark:text-white">{t.title}</h2>
        <span className="text-xs font-semibold text-sky-600">{doneCount}/{DEFAULT_CHECKLIST.length}</span>
      </div>
      <div className="space-y-2">
        {DEFAULT_CHECKLIST.map((item, idx) => (
          <label key={item} className="flex items-center gap-3 text-sm text-neutral-700 dark:text-neutral-300 cursor-pointer">
            <input
              type="checkbox"
              checked={!!checked[item]}
              onChange={() => toggle(item)}
              className="rounded border-slate-300 text-sky-600 focus:ring-sky-500 h-4 w-4"
            />
            <span className={checked[item] ? 'line-through text-neutral-400' : ''}>{displayItems[idx]}</span>
          </label>
        ))}
      </div>
      <p className="mt-4 text-xs text-neutral-400">{t.note}</p>
    </div>
  )
}

function VacationCountdown() {
  const { locale } = useLanguage()
  const [targetDate, setTargetDate] = useLocalStorageState<string>('yunanisland-countdown-date', '')
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())
    const interval = setInterval(() => setNow(new Date()), 60_000)
    return () => clearInterval(interval)
  }, [])

  const daysLeft = targetDate && now
    ? Math.ceil((new Date(targetDate).getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    : null

  const t = {
    title: locale === 'en' ? '🏖️ Vacation Countdown' : locale === 'el' ? '🏖️ Αντίστροφη Μέτρηση Διακοπών' : '🏖️ Tatil Geri Sayımı',
    label: locale === 'en' ? 'Your Vacation Date' : locale === 'el' ? 'Ημερομηνία Διακοπών σας' : 'Tatil Tarihin',
    daysLeft: locale === 'en' ? 'days left 🏝️' : locale === 'el' ? 'ημέρες απομένουν 🏝️' : 'gün kaldı 🏝️',
    todayIsTheDay: locale === 'en' ? 'Today is vacation day! Have a great trip 🎉' : locale === 'el' ? 'Σήμερα είναι η μέρα των διακοπών! Καλό ταξίδι 🎉' : 'Bugün tatil günü! İyi tatiller 🎉',
    pastDate: locale === 'en' ? 'This date is in the past.' : locale === 'el' ? 'Αυτή η ημερομηνία έχει περάσει.' : 'Bu tarih geçmişte kalmış.',
  }

  return (
    <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-slate-100 dark:border-neutral-900 shadow-sm">
      <h2 className="text-lg font-bold text-neutral-900 dark:text-white mb-4">{t.title}</h2>
      <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">{t.label}</label>
      <input
        type="date"
        value={targetDate}
        onChange={(e) => setTargetDate(e.target.value)}
        className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-2.5 px-4 text-sm outline-none focus:border-sky-500"
      />

      {daysLeft !== null && (
        <div className="mt-6 text-center">
          {daysLeft > 0 ? (
            <>
              <p className="text-4xl font-extrabold text-sky-600 dark:text-sky-400">{daysLeft}</p>
              <p className="text-sm text-neutral-500 mt-1">{t.daysLeft}</p>
            </>
          ) : daysLeft === 0 ? (
            <p className="text-lg font-bold text-emerald-600">{t.todayIsTheDay}</p>
          ) : (
            <p className="text-sm text-neutral-400">{t.pastDate}</p>
          )}
        </div>
      )}
    </div>
  )
}

export default function TripToolsPage() {
  const { locale } = useLanguage()

  const t = {
    badge: locale === 'en' ? 'Travel Tools' : locale === 'el' ? 'Ταξιδιωτικά Εργαλεία' : 'Seyahat Araçları',
    title: locale === 'en' ? 'Your Prep Tools' : locale === 'el' ? 'Εργαλεία Προετοιμασίας σας' : 'Hazırlık Araçların',
    subtitle: locale === 'en'
      ? 'Count down to your vacation and track your preparation checklist.'
      : locale === 'el'
      ? 'Κάντε αντίστροφη μέτρηση για τις διακοπές σας και παρακολουθήστε τη λίστα προετοιμασίας σας.'
      : 'Tatilin için geri sayım yap, hazırlık listeni takip et.',
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 transition-colors duration-300">
      <Header />

      <PageHero
        image="/santorini.jpg"
        badge={t.badge}
        title={t.title}
        subtitle={t.subtitle}
      />

      <main className="mx-auto max-w-3xl px-6 py-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <VacationCountdown />
        <TravelChecklist />
      </main>
      <SiteFooter />
    </div>
  )
}
