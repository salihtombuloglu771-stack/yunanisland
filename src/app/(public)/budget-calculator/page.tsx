'use client'

import { useMemo, useState } from 'react'
import { Header } from '@/components/Header'
import { PageHero } from '@/components/PageHero'
import { useLanguage } from '@/lib/i18n/LanguageProvider'

const HOTEL_LEVELS = {
  budget: { perNight: 40, label: { tr: 'Bütçe Otel', en: 'Budget Hotel', el: 'Οικονομικό Ξενοδοχείο' } },
  mid: { perNight: 90, label: { tr: 'Orta Segment Otel', en: 'Mid-Range Hotel', el: 'Ξενοδοχείο Μεσαίας Κατηγορίας' } },
  luxury: { perNight: 220, label: { tr: 'Lüks Otel / Resort', en: 'Luxury Hotel / Resort', el: 'Πολυτελές Ξενοδοχείο / Θέρετρο' } },
}

const TRANSPORT_LEVELS = {
  local: { perDay: 10, label: { tr: 'Yerel Ulaşım (Otobüs/Yürüyüş)', en: 'Local Transport (Bus/Walking)', el: 'Τοπικές Μεταφορές (Λεωφορείο/Περπάτημα)' } },
  scooter: { perDay: 35, label: { tr: 'Scooter/Araç Kiralama', en: 'Scooter/Car Rental', el: 'Ενοικίαση Σκούτερ/Αυτοκινήτου' } },
  taxi: { perDay: 60, label: { tr: 'Taksi Ağırlıklı', en: 'Mostly Taxi', el: 'Κυρίως Ταξί' } },
}

const FOOD_LEVELS = {
  budget: { perDay: 20, label: { tr: 'Sokak Lezzetleri & Market', en: 'Street Food & Groceries', el: 'Street Food & Σούπερ Μάρκετ' } },
  mid: { perDay: 45, label: { tr: 'Taverna & Orta Segment Restoranlar', en: 'Taverna & Mid-Range Restaurants', el: 'Ταβέρνες & Εστιατόρια Μεσαίας Κατηγορίας' } },
  luxury: { perDay: 90, label: { tr: 'Gurme Restoranlar', en: 'Gourmet Restaurants', el: 'Γκουρμέ Εστιατόρια' } },
}

export default function BudgetCalculatorPage() {
  const { locale } = useLanguage()

  const t = {
    badge: locale === 'en' ? 'Trip Budget' : locale === 'el' ? 'Προϋπολογισμός Ταξιδιού' : 'Gezi Bütçesi',
    title: locale === 'en' ? 'Budget Calculator' : locale === 'el' ? 'Υπολογιστής Προϋπολογισμού' : 'Bütçe Hesaplayıcı',
    subtitle: locale === 'en'
      ? 'Calculate your estimated travel budget based on number of people, days and your preferred comfort level.'
      : locale === 'el'
      ? 'Υπολογίστε τον εκτιμώμενο προϋπολογισμό ταξιδιού σας με βάση τον αριθμό ατόμων, τις ημέρες και το προτιμώμενο επίπεδο άνεσης.'
      : 'Kişi sayısı, gün ve tercih ettiğin konfor seviyesine göre tahmini seyahat bütçeni hesapla.',
    adults: locale === 'en' ? 'Adults' : locale === 'el' ? 'Ενήλικες' : 'Yetişkin',
    children: locale === 'en' ? 'Children' : locale === 'el' ? 'Παιδιά' : 'Çocuk',
    days: locale === 'en' ? 'Number of Days' : locale === 'el' ? 'Αριθμός Ημερών' : 'Gün Sayısı',
    accommodationLevel: locale === 'en' ? 'Accommodation Level' : locale === 'el' ? 'Επίπεδο Διαμονής' : 'Konaklama Seviyesi',
    transportPreference: locale === 'en' ? 'Transport Preference' : locale === 'el' ? 'Προτίμηση Μεταφοράς' : 'Ulaşım Tercihi',
    foodPreference: locale === 'en' ? 'Food & Drink Preference' : locale === 'el' ? 'Προτίμηση Φαγητού & Ποτού' : 'Yeme-İçme Tercihi',
    estimatedBudget: locale === 'en' ? 'Estimated Budget' : locale === 'el' ? 'Εκτιμώμενος Προϋπολογισμός' : 'Tahmini Bütçe',
    accommodation: locale === 'en' ? '🏨 Accommodation' : locale === 'el' ? '🏨 Διαμονή' : '🏨 Konaklama',
    transport: locale === 'en' ? '🚗 Transport' : locale === 'el' ? '🚗 Μεταφορά' : '🚗 Ulaşım',
    food: locale === 'en' ? '🍽️ Food & Drink' : locale === 'el' ? '🍽️ Φαγητό & Ποτό' : '🍽️ Yeme-İçme',
    activities: locale === 'en' ? '🎟️ Activities' : locale === 'el' ? '🎟️ Δραστηριότητες' : '🎟️ Aktiviteler',
    estimatedTotal: locale === 'en' ? 'Estimated Total' : locale === 'el' ? 'Εκτιμώμενο Σύνολο' : 'Tahmini Toplam',
    perNight: locale === 'en' ? 'night' : locale === 'el' ? 'διανυκτέρευση' : 'gece',
    perDay: locale === 'en' ? 'day' : locale === 'el' ? 'ημέρα' : 'gün',
    perDayPerson: locale === 'en' ? 'day/person' : locale === 'el' ? 'ημέρα/άτομο' : 'gün/kişi',
    disclaimer: locale === 'en'
      ? 'This estimate is based on average prices and may vary by season and booking time. Ferry/flight ticket prices are not included.'
      : locale === 'el'
      ? 'Αυτή η εκτίμηση βασίζεται σε μέσες τιμές και ενδέχεται να διαφέρει ανάλογα με την εποχή και τον χρόνο κράτησης. Δεν περιλαμβάνονται οι τιμές εισιτηρίων φέριμποτ/αεροπλάνου.'
      : 'Bu tahmin ortalama fiyatlara dayanır, sezona ve rezervasyon zamanına göre değişebilir. Feribot/uçak bileti fiyatları dahil değildir.',
  }

  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  const [days, setDays] = useState(5)
  const [hotelLevel, setHotelLevel] = useState<keyof typeof HOTEL_LEVELS>('mid')
  const [transportLevel, setTransportLevel] = useState<keyof typeof TRANSPORT_LEVELS>('local')
  const [foodLevel, setFoodLevel] = useState<keyof typeof FOOD_LEVELS>('mid')

  const result = useMemo(() => {
    const totalPeople = adults + children * 0.6
    const accommodation = HOTEL_LEVELS[hotelLevel].perNight * days
    const transport = TRANSPORT_LEVELS[transportLevel].perDay * days
    const food = FOOD_LEVELS[foodLevel].perDay * days * totalPeople
    const activities = 25 * days * totalPeople
    const total = accommodation + transport + food + activities

    return {
      accommodation: Math.round(accommodation),
      transport: Math.round(transport),
      food: Math.round(food),
      activities: Math.round(activities),
      total: Math.round(total),
    }
  }, [adults, children, days, hotelLevel, transportLevel, foodLevel])

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 transition-colors duration-300">
      <Header />

      <PageHero
        image="/kos.jpg"
        badge={t.badge}
        title={t.title}
        subtitle={t.subtitle}
      />

      <main className="mx-auto max-w-5xl px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-slate-100 dark:border-neutral-900 shadow-sm space-y-6 h-fit">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">{t.adults}</label>
              <input
                type="number"
                min={1}
                value={adults}
                onChange={(e) => setAdults(Math.max(1, Number(e.target.value)))}
                className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-2.5 px-4 text-sm outline-none focus:border-sky-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">{t.children}</label>
              <input
                type="number"
                min={0}
                value={children}
                onChange={(e) => setChildren(Math.max(0, Number(e.target.value)))}
                className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-2.5 px-4 text-sm outline-none focus:border-sky-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">{t.days}</label>
            <input
              type="number"
              min={1}
              value={days}
              onChange={(e) => setDays(Math.max(1, Number(e.target.value)))}
              className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-2.5 px-4 text-sm outline-none focus:border-sky-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">{t.accommodationLevel}</label>
            <div className="flex flex-col gap-2">
              {(Object.keys(HOTEL_LEVELS) as (keyof typeof HOTEL_LEVELS)[]).map((key) => (
                <button
                  key={key}
                  onClick={() => setHotelLevel(key)}
                  className={`text-left rounded-xl px-4 py-2.5 text-sm font-medium border transition-all ${
                    hotelLevel === key
                      ? 'bg-sky-50 dark:bg-sky-950/30 text-sky-600 border-sky-300'
                      : 'bg-slate-50 dark:bg-neutral-950 border-slate-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  {HOTEL_LEVELS[key].label[locale]} <span className="text-xs opacity-60">(~{HOTEL_LEVELS[key].perNight}€/{t.perNight})</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">{t.transportPreference}</label>
            <div className="flex flex-col gap-2">
              {(Object.keys(TRANSPORT_LEVELS) as (keyof typeof TRANSPORT_LEVELS)[]).map((key) => (
                <button
                  key={key}
                  onClick={() => setTransportLevel(key)}
                  className={`text-left rounded-xl px-4 py-2.5 text-sm font-medium border transition-all ${
                    transportLevel === key
                      ? 'bg-sky-50 dark:bg-sky-950/30 text-sky-600 border-sky-300'
                      : 'bg-slate-50 dark:bg-neutral-950 border-slate-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  {TRANSPORT_LEVELS[key].label[locale]} <span className="text-xs opacity-60">(~{TRANSPORT_LEVELS[key].perDay}€/{t.perDay})</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">{t.foodPreference}</label>
            <div className="flex flex-col gap-2">
              {(Object.keys(FOOD_LEVELS) as (keyof typeof FOOD_LEVELS)[]).map((key) => (
                <button
                  key={key}
                  onClick={() => setFoodLevel(key)}
                  className={`text-left rounded-xl px-4 py-2.5 text-sm font-medium border transition-all ${
                    foodLevel === key
                      ? 'bg-sky-50 dark:bg-sky-950/30 text-sky-600 border-sky-300'
                      : 'bg-slate-50 dark:bg-neutral-950 border-slate-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  {FOOD_LEVELS[key].label[locale]} <span className="text-xs opacity-60">(~{FOOD_LEVELS[key].perDay}€/{t.perDayPerson})</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-slate-100 dark:border-neutral-900 shadow-sm h-fit">
          <h2 className="text-lg font-bold text-neutral-900 dark:text-white mb-6">{t.estimatedBudget}</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between border-b border-slate-100 dark:border-neutral-800 pb-3">
              <span className="text-neutral-500">{t.accommodation}</span>
              <span className="font-semibold text-neutral-800 dark:text-neutral-200">{result.accommodation} €</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 dark:border-neutral-800 pb-3">
              <span className="text-neutral-500">{t.transport}</span>
              <span className="font-semibold text-neutral-800 dark:text-neutral-200">{result.transport} €</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 dark:border-neutral-800 pb-3">
              <span className="text-neutral-500">{t.food}</span>
              <span className="font-semibold text-neutral-800 dark:text-neutral-200">{result.food} €</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 dark:border-neutral-800 pb-3">
              <span className="text-neutral-500">{t.activities}</span>
              <span className="font-semibold text-neutral-800 dark:text-neutral-200">{result.activities} €</span>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between bg-sky-50 dark:bg-sky-950/30 rounded-xl px-4 py-4">
            <span className="text-sm font-bold text-neutral-700 dark:text-neutral-300">{t.estimatedTotal}</span>
            <span className="text-2xl font-extrabold text-sky-600 dark:text-sky-400">{result.total} €</span>
          </div>
          <p className="mt-4 text-xs text-neutral-400 leading-relaxed">
            {t.disclaimer}
          </p>
        </div>
      </main>
    </div>
  )
}
