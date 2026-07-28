'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/Header'
import { BeachCard } from '@/components/BeachCard'
import { RestaurantCard } from '@/components/RestaurantCard'
import { HotelCard, type Hotel } from '@/components/HotelCard'
import { AttractionCard, type Attraction } from '@/components/AttractionCard'
import { FavoriteButton } from '@/components/FavoriteButton'
import { ReviewSection } from '@/components/ReviewSection'
import { TripNoteBox } from '@/components/TripNoteBox'
import { Gallery, type MediaItem } from '@/components/Gallery'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { FaqAccordion, type Faq } from '@/components/FaqAccordion'
import { SimilarIslands } from '@/components/SimilarIslands'
import { CarSelector } from '@/components/CarSelector'
import { useLanguage } from '@/lib/i18n/LanguageProvider'
import { useLocalStorageState } from '@/lib/useLocalStorageState'
import { DEFAULT_CAR_ID, type CarType } from '@/lib/fuelEstimate'
import type { Island, Beach, Restaurant } from '@/lib/mockData'
import type { Island as IslandCardType } from '@/components/IslandCard'

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://yunanisland.vercel.app'

const BUDGET_LEVEL_LABELS = {
  budget: { label: 'Bütçe Dostu', color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' },
  mid: { label: 'Orta Segment', color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20' },
  luxury: { label: 'Lüks', color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20' },
}

export function IslandDetailClient({ island, allBeaches, allRestaurants, allHotels, allAttractions, media, similarIslands }: { island: Island & { faqs?: Faq[] }; allBeaches: Beach[]; allRestaurants: Restaurant[]; allHotels: Hotel[]; allAttractions: Attraction[]; media: MediaItem[]; similarIslands: IslandCardType[] }) {
  const { locale } = useLanguage()
  const description = locale === 'en' ? (island.description_en || island.description)
    : locale === 'el' ? (island.description_el || island.description)
    : island.description
  const history = locale === 'en' ? (island.history_en || island.history)
    : locale === 'el' ? (island.history_el || island.history)
    : island.history
  const bestTime = locale === 'en' ? (island.best_time_to_visit_en || island.best_time_to_visit)
    : locale === 'el' ? (island.best_time_to_visit_el || island.best_time_to_visit)
    : island.best_time_to_visit

  const [activeTab, setActiveTab] = useState<'about' | 'beaches' | 'restaurants' | 'hotels' | 'attractions' | 'gallery'>('about')

  const [carId, setCarId] = useLocalStorageState<CarType['id']>('yunanisland-car', DEFAULT_CAR_ID)

  const [beachTypeFilter, setBeachTypeFilter] = useState<'all' | 'sand' | 'pebble'>('all')
  const [beachFamilyFilter, setBeachFamilyFilter] = useState(false)
  const [beachBlueFlagFilter, setBeachBlueFlagFilter] = useState(false)
  const [beachParkingFilter, setBeachParkingFilter] = useState(false)
  const [beachShowerFilter, setBeachShowerFilter] = useState(false)

  const [restPriceFilter, setRestPriceFilter] = useState<'all' | 'mid' | 'expensive'>('all')
  const [restSeaViewFilter, setRestSeaViewFilter] = useState(false)
  const [restVeganFilter, setRestVeganFilter] = useState(false)
  const [restOutdoorFilter, setRestOutdoorFilter] = useState(false)

  const [weather, setWeather] = useState<{
    temp: number
    humidity: number
    windSpeed: number
    uvIndex: number | null
    description: string
    icon: string
    loading: boolean
    error: boolean
  }>({
    temp: 28,
    humidity: 50,
    windSpeed: 12,
    uvIndex: null,
    description: 'Açık / Güneşli',
    icon: '☀️',
    loading: true,
    error: false,
  })

  const [marine, setMarine] = useState<{
    seaTemp: number | null
    waveHeight: number | null
    loading: boolean
    error: boolean
  }>({ seaTemp: null, waveHeight: null, loading: true, error: false })

  useEffect(() => {
    if (!island.latitude || !island.longitude) return

    let isMounted = true

    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${island.latitude}&longitude=${island.longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,uv_index`)
      .then(res => res.json())
      .then(data => {
        if (!isMounted) return
        const current = data.current
        if (current) {
          const code = current.weather_code
          let desc = 'Güneşli'
          let icon = '☀️'

          if (code === 0) { desc = 'Açık / Güneşli'; icon = '☀️' }
          else if ([1, 2, 3].includes(code)) { desc = 'Parçalı Bulutlu'; icon = '🌤️' }
          else if ([45, 48].includes(code)) { desc = 'Sisli'; icon = '🌫️' }
          else if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) { desc = 'Çiseleyen/Hafif Yağmur'; icon = '🌧️' }
          else if ([71, 73, 75].includes(code)) { desc = 'Karlı'; icon = '🌨️' }
          else if ([95, 96, 99].includes(code)) { desc = 'Gökgürültülü Fırtına'; icon = '⛈️' }

          setWeather({
            temp: Math.round(current.temperature_2m),
            humidity: current.relative_humidity_2m,
            windSpeed: Math.round(current.wind_speed_10m),
            uvIndex: typeof current.uv_index === 'number' ? Math.round(current.uv_index * 10) / 10 : null,
            description: desc,
            icon: icon,
            loading: false,
            error: false
          })
        }
      })
      .catch(() => {
        if (!isMounted) return
        setWeather(prev => ({ ...prev, loading: false, error: true }))
      })

    fetch(`https://marine-api.open-meteo.com/v1/marine?latitude=${island.latitude}&longitude=${island.longitude}&current=wave_height,sea_surface_temperature`)
      .then(res => res.json())
      .then(data => {
        if (!isMounted) return
        const current = data.current
        if (current && typeof current.sea_surface_temperature === 'number') {
          setMarine({
            seaTemp: Math.round(current.sea_surface_temperature * 10) / 10,
            waveHeight: Math.round(current.wave_height * 10) / 10,
            loading: false,
            error: false,
          })
        } else {
          setMarine(prev => ({ ...prev, loading: false, error: true }))
        }
      })
      .catch(() => {
        if (!isMounted) return
        setMarine(prev => ({ ...prev, loading: false, error: true }))
      })

    return () => {
      isMounted = false
    }
  }, [island])

  const budget = BUDGET_LEVEL_LABELS[island.budget_level]

  const filteredBeaches = allBeaches.filter(beach => {
    if (beachTypeFilter !== 'all' && beach.beach_type !== beachTypeFilter) return false
    if (beachFamilyFilter && !beach.family_friendly) return false
    if (beachBlueFlagFilter && !beach.blue_flag) return false
    if (beachParkingFilter && !beach.has_parking) return false
    if (beachShowerFilter && !beach.has_showers) return false
    return true
  })

  const RESTAURANT_PRICE_ORDER: Record<string, number> = { budget: 0, mid: 1, expensive: 2 }

  const filteredRestaurants = allRestaurants
    .filter(rest => {
      if (restPriceFilter !== 'all' && rest.price_level !== restPriceFilter) return false
      if (restSeaViewFilter && !rest.sea_view) return false
      if (restVeganFilter && !rest.vegan) return false
      if (restOutdoorFilter && !rest.outdoor_seating) return false
      return true
    })
    .sort((a, b) => RESTAURANT_PRICE_ORDER[a.price_level] - RESTAURANT_PRICE_ORDER[b.price_level])

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 transition-colors duration-300">
      <Header />

      <div className="mx-auto max-w-7xl px-6 pt-4">
        <Breadcrumbs
          baseUrl={SITE_URL}
          items={[
            { label: 'Ana Sayfa', href: '/' },
            { label: island.name },
          ]}
        />
      </div>

      {/* Hero Banner */}
      <section className="relative h-[350px] md:h-[450px] w-full overflow-hidden bg-slate-900">
        {island.cover_image_url ? (
          <>
            <Image
              src={island.cover_image_url}
              alt={island.name}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-sky-600 via-sky-800 to-indigo-900" />
        )}

        <div className="absolute top-20 right-6">
          <FavoriteButton entityType="island" entityId={island.id} />
        </div>

        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-6 pb-12 text-white flex flex-col justify-end h-full">
          <div className="flex flex-wrap items-center gap-3">
            <span className={`inline-flex items-center rounded-full border px-3 py-0.5 text-xs font-semibold ${budget.color}`}>
              {budget.label}
            </span>
            {bestTime && (
              <span className="text-xs bg-white/10 backdrop-blur-md px-3 py-1 rounded-full font-medium">
                📅 {locale === 'en' ? 'Best time to visit' : locale === 'el' ? 'Καλύτερη εποχή' : 'Ziyaret Zamanı'}: {bestTime}
              </span>
            )}
            {island.population && (
              <span className="text-xs bg-white/10 backdrop-blur-md px-3 py-1 rounded-full font-medium">
                👥 {locale === 'en' ? 'Population' : locale === 'el' ? 'Πληθυσμός' : 'Nüfus'}: {island.population.toLocaleString(locale === 'en' ? 'en-US' : locale === 'el' ? 'el-GR' : 'tr-TR')}
              </span>
            )}
          </div>
          <h1 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight">
            {island.name}
          </h1>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2">

            <div className="flex border-b border-slate-200 dark:border-neutral-800 mb-8 overflow-x-auto">
              {[
                { id: 'about' as const, label: locale === 'en' ? '📖 About' : locale === 'el' ? '📖 Σχετικά' : '📖 Hakkında' },
                { id: 'beaches' as const, label: `🏖️ ${locale === 'en' ? 'Beaches' : locale === 'el' ? 'Παραλίες' : 'Plajlar'} (${allBeaches.length})` },
                { id: 'restaurants' as const, label: `🍽️ ${locale === 'en' ? 'Restaurants' : locale === 'el' ? 'Εστιατόρια' : 'Restoranlar'} (${allRestaurants.length})` },
                { id: 'hotels' as const, label: `🏨 ${locale === 'en' ? 'Hotels' : locale === 'el' ? 'Ξενοδοχεία' : 'Oteller'} (${allHotels.length})` },
                { id: 'attractions' as const, label: `📍 ${locale === 'en' ? 'Places to Visit' : locale === 'el' ? 'Αξιοθέατα' : 'Gezilecek Yerler'} (${allAttractions.length})` },
                { id: 'gallery' as const, label: `📸 ${locale === 'en' ? 'Gallery' : locale === 'el' ? 'Γκαλερί' : 'Galeri'} (${media.length})` },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`border-b-2 py-4 px-6 text-sm font-semibold whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'border-sky-600 text-sky-600 dark:border-sky-400 dark:text-sky-400'
                      : 'border-transparent text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div>

              {activeTab === 'about' && (
                <>
                  <article className="prose max-w-none dark:prose-invert">
                    <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
                      {locale === 'en' ? 'Overview' : locale === 'el' ? 'Επισκόπηση' : 'Genel Bakış'}
                    </h2>
                    <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed text-base">
                      {description}
                    </p>

                    {history && (
                      <div className="mt-8 bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-slate-100 dark:border-neutral-900 shadow-sm">
                        <h3 className="text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2 mb-3">
                          🏛️ {locale === 'en' ? 'History & Culture' : locale === 'el' ? 'Ιστορία & Πολιτισμός' : 'Tarihçesi & Kültürü'}
                        </h3>
                        <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                          {history}
                        </p>
                      </div>
                    )}
                  </article>

                  <FaqAccordion faqs={island.faqs ?? []} />
                  <ReviewSection entityType="island" entityId={island.id} />
                  <TripNoteBox entityType="island" entityId={island.id} />
                </>
              )}

              {activeTab === 'beaches' && (
                <div>

                  <div className="bg-white dark:bg-neutral-900 p-5 rounded-2xl border border-slate-100 dark:border-neutral-900 shadow-sm mb-6">
                    <h4 className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-3">
                      Plaj Filtreleri
                    </h4>

                    <div className="flex gap-2 flex-wrap mb-4">
                      {[
                        { id: 'all' as const, label: 'Tüm Tipler' },
                        { id: 'sand' as const, label: '🏖️ Sadece Kumluk' },
                        { id: 'pebble' as const, label: '🪨 Sadece Çakıllık' },
                      ].map(type => (
                        <button
                          key={type.id}
                          onClick={() => setBeachTypeFilter(type.id)}
                          className={`rounded-lg px-3 py-1.5 text-xs font-medium border transition-all ${
                            beachTypeFilter === type.id
                              ? 'bg-sky-50 dark:bg-sky-950/30 text-sky-600 border-sky-300'
                              : 'bg-slate-50 dark:bg-neutral-950 border-slate-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400'
                          }`}
                        >
                          {type.label}
                        </button>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 border-t border-slate-100 dark:border-neutral-800 pt-4">
                      <label className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={beachFamilyFilter}
                          onChange={(e) => setBeachFamilyFilter(e.target.checked)}
                          className="rounded border-slate-300 text-sky-600 focus:ring-sky-500 h-4 w-4"
                        />
                        👨‍👩‍👧 Aile Dostu
                      </label>
                      <label className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={beachBlueFlagFilter}
                          onChange={(e) => setBeachBlueFlagFilter(e.target.checked)}
                          className="rounded border-slate-300 text-sky-600 focus:ring-sky-500 h-4 w-4"
                        />
                        💙 Mavi Bayrak
                      </label>
                      <label className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={beachParkingFilter}
                          onChange={(e) => setBeachParkingFilter(e.target.checked)}
                          className="rounded border-slate-300 text-sky-600 focus:ring-sky-500 h-4 w-4"
                        />
                        🚗 Otopark
                      </label>
                      <label className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={beachShowerFilter}
                          onChange={(e) => setBeachShowerFilter(e.target.checked)}
                          className="rounded border-slate-300 text-sky-600 focus:ring-sky-500 h-4 w-4"
                        />
                        🚿 Duş & WC
                      </label>
                    </div>

                  </div>

                  <div className="mb-6">
                    <CarSelector carId={carId} onChange={setCarId} />
                  </div>

                  {filteredBeaches.length > 0 ? (
                    <div className="grid gap-6 sm:grid-cols-2">
                      {filteredBeaches.map(beach => (
                        <BeachCard key={beach.id} beach={beach} islandLat={island.latitude} islandLng={island.longitude} carId={carId} />
                      ))}
                    </div>
                  ) : (
                    <div className="py-12 text-center bg-white dark:bg-neutral-900 border border-slate-100 dark:border-neutral-900 rounded-2xl">
                      <span className="text-3xl">🏜️</span>
                      <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                        Seçilen kriterlere uygun plaj bulunamadı.
                      </p>
                    </div>
                  )}

                </div>
              )}

              {activeTab === 'restaurants' && (
                <div>

                  <div className="bg-white dark:bg-neutral-900 p-5 rounded-2xl border border-slate-100 dark:border-neutral-900 shadow-sm mb-6">
                    <h4 className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-3">
                      Restoran Filtreleri
                    </h4>

                    <div className="flex gap-2 flex-wrap mb-4">
                      {[
                        { id: 'all' as const, label: 'Tüm Fiyatlar' },
                        { id: 'mid' as const, label: '💳 Orta Segment' },
                        { id: 'expensive' as const, label: '💎 Lüks / Gurme' },
                      ].map(price => (
                        <button
                          key={price.id}
                          onClick={() => setRestPriceFilter(price.id)}
                          className={`rounded-lg px-3 py-1.5 text-xs font-medium border transition-all ${
                            restPriceFilter === price.id
                              ? 'bg-sky-50 dark:bg-sky-950/30 text-sky-600 border-sky-300'
                              : 'bg-slate-50 dark:bg-neutral-950 border-slate-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400'
                          }`}
                        >
                          {price.label}
                        </button>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 border-t border-slate-100 dark:border-neutral-800 pt-4">
                      <label className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={restSeaViewFilter}
                          onChange={(e) => setRestSeaViewFilter(e.target.checked)}
                          className="rounded border-slate-300 text-sky-600 focus:ring-sky-500 h-4 w-4"
                        />
                        🌊 Deniz Manzaralı
                      </label>
                      <label className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={restVeganFilter}
                          onChange={(e) => setRestVeganFilter(e.target.checked)}
                          className="rounded border-slate-300 text-sky-600 focus:ring-sky-500 h-4 w-4"
                        />
                        🌱 Vegan Seçenekli
                      </label>
                      <label className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={restOutdoorFilter}
                          onChange={(e) => setRestOutdoorFilter(e.target.checked)}
                          className="rounded border-slate-300 text-sky-600 focus:ring-sky-500 h-4 w-4"
                        />
                        🪑 Açık Hava Alanı
                      </label>
                    </div>

                  </div>

                  {filteredRestaurants.length > 0 ? (
                    <div className="grid gap-6 sm:grid-cols-2">
                      {filteredRestaurants.map(rest => (
                        <RestaurantCard key={rest.id} restaurant={rest} />
                      ))}
                    </div>
                  ) : (
                    <div className="py-12 text-center bg-white dark:bg-neutral-900 border border-slate-100 dark:border-neutral-900 rounded-2xl">
                      <span className="text-3xl">🍝</span>
                      <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                        Seçilen kriterlere uygun restoran bulunamadı.
                      </p>
                    </div>
                  )}

                </div>
              )}

              {activeTab === 'hotels' && (
                <div>
                  {allHotels.length > 0 && (
                    <div className="mb-6">
                      <CarSelector carId={carId} onChange={setCarId} />
                    </div>
                  )}
                  {allHotels.length > 0 ? (
                    <div className="grid gap-6 sm:grid-cols-2">
                      {allHotels.map(hotel => (
                        <HotelCard key={hotel.id} hotel={hotel} islandLat={island.latitude} islandLng={island.longitude} carId={carId} />
                      ))}
                    </div>
                  ) : (
                    <div className="py-12 text-center bg-white dark:bg-neutral-900 border border-slate-100 dark:border-neutral-900 rounded-2xl">
                      <span className="text-3xl">🏨</span>
                      <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                        Bu ada için henüz otel eklenmedi.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'attractions' && (
                <div>
                  {allAttractions.length > 0 ? (
                    <div className="grid gap-6 sm:grid-cols-2">
                      {allAttractions.map(attraction => (
                        <AttractionCard key={attraction.id} attraction={attraction} />
                      ))}
                    </div>
                  ) : (
                    <div className="py-12 text-center bg-white dark:bg-neutral-900 border border-slate-100 dark:border-neutral-900 rounded-2xl">
                      <span className="text-3xl">📍</span>
                      <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                        Bu ada için henüz gezilecek yer eklenmedi.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'gallery' && <Gallery items={media} />}

            </div>

          </div>

          <div className="space-y-6">

            <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-slate-100 dark:border-neutral-900 shadow-sm">
              <h3 className="text-sm font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-4">
                Konum Detayları
              </h3>
              <div className="flex items-center gap-4 bg-slate-50 dark:bg-neutral-950 p-4 rounded-xl">
                <span className="text-3xl">📍</span>
                <div>
                  <p className="text-xs text-neutral-400 dark:text-neutral-500">Koordinatlar</p>
                  <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                    {island.latitude}° K, {island.longitude}° D
                  </p>
                </div>
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${island.latitude},${island.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 block text-center rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 py-2.5 text-xs font-bold text-neutral-800 dark:text-neutral-200 transition-colors"
              >
                Haritada Göster ↗
              </a>
            </div>

            <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-slate-100 dark:border-neutral-900 shadow-sm">
              <h3 className="text-sm font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-4">
                Hava Durumu (Canlı API)
              </h3>
              {weather.loading ? (
                <div className="animate-pulse space-y-3">
                  <div className="h-8 bg-slate-100 dark:bg-neutral-800 rounded w-1/3"></div>
                  <div className="h-4 bg-slate-100 dark:bg-neutral-800 rounded w-1/2"></div>
                </div>
              ) : weather.error ? (
                <div className="text-xs text-red-500">Hava durumu verisi alınamadı.</div>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-extrabold text-neutral-900 dark:text-white">{weather.temp}°C</p>
                      <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
                        {weather.icon} {weather.description}
                      </p>
                    </div>
                    <span className="text-5xl">{weather.icon}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-4 border-t border-slate-200 dark:border-neutral-800 pt-4 text-xs text-neutral-500 dark:text-neutral-400">
                    <div>🌬️ Rüzgar: {weather.windSpeed} km/sa</div>
                    <div>💧 Nem: %{weather.humidity}</div>
                    {weather.uvIndex !== null && (
                      <div>🔆 UV İndeksi: {weather.uvIndex}</div>
                    )}
                  </div>
                </>
              )}

              {!marine.loading && !marine.error && marine.seaTemp !== null && (
                <div className="grid grid-cols-2 gap-2 mt-2 border-t border-slate-200 dark:border-neutral-800 pt-4 text-xs text-neutral-500 dark:text-neutral-400">
                  <div>🌊 Deniz Sıcaklığı: {marine.seaTemp}°C</div>
                  <div>🌊 Dalga Yüksekliği: {marine.waveHeight} m</div>
                </div>
              )}
            </div>

            <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-slate-100 dark:border-neutral-900 shadow-sm">
              <h3 className="text-sm font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-3">
                Ulaşım Tüyoları
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Kos&apos;a Atina limanlarından feribotla gelinebildiği gibi, Türkiye kıyılarına (özellikle Bodrum&apos;a) sadece 20 dakikalık katamaran seferleri de bulunur.
              </p>
              <Link
                href={`/ferry-guide?to=${island.name}`}
                className="mt-4 block text-center rounded-xl border border-sky-600/20 hover:border-sky-600/40 text-sky-600 dark:text-sky-400 py-2.5 text-xs font-semibold transition-colors"
              >
                Bodrum - Kos Feribot Seferleri
              </Link>
            </div>

          </div>

        </div>

        <SimilarIslands islands={similarIslands} />
      </main>

      <footer className="border-t border-slate-100 dark:border-neutral-900 bg-white dark:bg-neutral-950 py-8 mt-24">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            &copy; 2026 Yunanisland. Tüm hakları saklıdır.
          </p>
        </div>
      </footer>

    </div>
  )
}
