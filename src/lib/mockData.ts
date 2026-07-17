export interface Island {
  id: string
  name: string
  slug: string
  description: string | null
  description_en?: string | null
  description_el?: string | null
  history: string | null
  history_en?: string | null
  history_el?: string | null
  population: number | null
  latitude: number | null
  longitude: number | null
  best_time_to_visit: string | null
  best_time_to_visit_en?: string | null
  best_time_to_visit_el?: string | null
  budget_level: 'budget' | 'mid' | 'luxury'
  cover_image_url: string | null
  is_published: boolean
}

export interface Beach {
  id: string
  island_id: string
  name: string
  slug: string
  description: string | null
  beach_type: 'sand' | 'pebble' | 'mixed'
  water_depth: 'shallow' | 'medium' | 'deep' | string
  crowd_level: 'low' | 'medium' | 'high'
  family_friendly: boolean
  pet_friendly: boolean
  blue_flag: boolean
  sunbed_price: number | null
  umbrella_price: number | null
  has_parking: boolean
  has_showers: boolean
  has_toilets: boolean
  has_beach_bar: boolean
  has_lifeguard: boolean
  accessibility: string | null
  sunset_rating: number | null // 1 to 5
  latitude: number | null
  longitude: number | null
  cover_image_url: string | null
}

export interface Restaurant {
  id: string
  island_id: string
  name: string
  slug: string
  cuisine: string | null
  price_level: 'budget' | 'mid' | 'expensive'
  average_cost: number | null
  opening_hours: string | null
  phone: string | null
  website: string | null
  vegetarian: boolean
  vegan: boolean
  gluten_free: boolean
  sea_view: boolean
  outdoor_seating: boolean
  family_friendly: boolean
  latitude: number | null
  longitude: number | null
  cover_image_url: string | null
}

export const MOCK_ISLANDS: Island[] = [
  {
    id: 'island-santorini',
    name: 'Santorini',
    slug: 'santorini',
    description: 'Eşsiz gün batımı, mavi kubbeli kiliseleri ve volkanik caldera manzarasıyla ünlü, Ege\'nin en romantik ve popüler adası.',
    history: 'Antik çağda Thera olarak bilinen Santorini, M.Ö. 1600 civarında gerçekleşen tarihin en büyük volkanik patlamalarından biriyle bugünkü hilal şeklini almıştır. Bazı teorisyenler kayıp kıta Atlantis\'in burası olduğunu iddia eder.',
    population: 15550,
    latitude: 36.3932,
    longitude: 25.4615,
    best_time_to_visit: 'Eylül - Ekim',
    budget_level: 'luxury',
    cover_image_url: '/santorini.jpg',
    is_published: true
  },
  {
    id: 'island-mykonos',
    name: 'Mykonos',
    slug: 'mykonos',
    description: 'Kozmopolit gece hayatı, tarihi yel değirmenleri, labirent gibi sokakları ve turkuaz renkli plajları ile ünlü eğlence adası.',
    history: 'Yunan mitolojisine göre Mykonos, Herakles tarafından öldürülen devlerin petrikleşmiş bedenlerinden oluşmuştur. Adını ise Apollon\'un torunu Mykons\'tan almıştır. 1950\'lerden sonra sanatçılar ve ünlüler için bir çekim merkezi haline gelmiştir.',
    population: 10134,
    latitude: 37.4467,
    longitude: 25.3689,
    best_time_to_visit: 'Temmuz - Ağustos',
    budget_level: 'luxury',
    cover_image_url: '/mykonos.jpg',
    is_published: true
  },
  {
    id: 'island-zakynthos',
    name: 'Zakynthos',
    slug: 'zakynthos',
    description: 'Büyüleyici Navagio (Batık) Plajı, devasa kireçtaşı uçurumları ve caretta caretta kaplumbağaları ile ünlü İyon Denizi cenneti.',
    history: 'Zakynthos (veya Zante), yüzyıllar boyunca Venedik egemenliği altında kalmış ve "Doğu\'nun Çiçeği" (Fior di Levante) olarak adlandırılmıştır. İtalyan mimarisi ve müzikal gelenekleri adanın kültüründe derin izler bırakmıştır.',
    population: 40759,
    latitude: 37.7870,
    longitude: 20.8999,
    best_time_to_visit: 'Haziran - Eylül',
    budget_level: 'mid',
    cover_image_url: '/zakynthos.jpg',
    is_published: true
  },
  {
    id: 'island-naxos',
    name: 'Naxos',
    slug: 'naxos',
    description: 'Geniş kumsalları, antik Apollon Tapınağı kapısı (Portara) ve lezzetli yerel tarım ürünleriyle öne çıkan, aileler için ideal büyük ada.',
    history: 'Kiklad takımadalarının en büyüğü olan Naxos, mitolojide Zeus\'un büyütüldüğü yer olarak bilinir. Ayrıca Theseus\'un Minotaur\'u öldürdükten sonra Ariadne\'yi bıraktığı adadır. Ortaçağda Venedik Dükalığı\'nın merkezi olmuştur.',
    population: 18938,
    latitude: 37.1009,
    longitude: 25.3767,
    best_time_to_visit: 'Haziran - Eylül',
    budget_level: 'budget',
    cover_image_url: null,
    is_published: true
  },
  {
    id: 'island-kos',
    name: 'Kos (İstanköy)',
    slug: 'kos',
    description: 'Tıbbın babası Hipokrat\'ın doğum yeri olan, zengin tarihi kalıntıları, geniş bisiklet yolları ve uzun kumsallarıyla bilinen popüler Kiklad/Oniki Ada üyesi.',
    history: 'Antik çağda Asclepeion (dünyanın ilk tıp okulu ve şifa merkezi) burada kurulmuştur. Hipokrat\'ın öğrencilerine gölgesinde ders anlattığına inanılan tarihi Hipokrat Ağacı adanın merkezinde yer alır. Ada uzun süre Osmanlı ve İtalyan egemenliğinde kalmıştır.',
    population: 33388,
    latitude: 36.8931,
    longitude: 27.2880,
    best_time_to_visit: 'Haziran - Eylül',
    budget_level: 'mid',
    cover_image_url: '/kos.jpg',
    is_published: true
  }
]

export const MOCK_BEACHES: Beach[] = [
  // Santorini Beaches
  {
    id: 'beach-red-beach',
    island_id: 'island-santorini',
    name: 'Kızıl Plaj (Red Beach)',
    slug: 'red-beach',
    description: 'Koyu kırmızı volkanik kayaların ve siyah kumların oluşturduğu, dünyada eşine az rastlanan nefes kesici bir plaj.',
    beach_type: 'sand',
    water_depth: 'deep',
    crowd_level: 'high',
    family_friendly: false,
    pet_friendly: true,
    blue_flag: false,
    sunbed_price: 25,
    umbrella_price: 10,
    has_parking: true,
    has_showers: false,
    has_toilets: false,
    has_beach_bar: true,
    has_lifeguard: true,
    accessibility: 'Zorlu, kayalık patikadan yürümek gerekiyor',
    sunset_rating: 4,
    latitude: 36.3473,
    longitude: 25.3948,
    cover_image_url: null
  },
  {
    id: 'beach-kamari',
    island_id: 'island-santorini',
    name: 'Kamari Plajı',
    slug: 'kamari-beach',
    description: 'Uzun siyah kumlu sahili, kristal suları ve sahil boyunca uzanan restoranları ile tam teşekküllü popüler bir plaj.',
    beach_type: 'mixed',
    water_depth: 'medium',
    crowd_level: 'high',
    family_friendly: true,
    pet_friendly: true,
    blue_flag: true,
    sunbed_price: 15,
    umbrella_price: 5,
    has_parking: true,
    has_showers: true,
    has_toilets: true,
    has_beach_bar: true,
    has_lifeguard: true,
    accessibility: 'Düz ayak, kolay erişilebilir',
    sunset_rating: 3,
    latitude: 36.3762,
    longitude: 25.4851,
    cover_image_url: null
  },

  // Mykonos Beaches
  {
    id: 'beach-psarou',
    island_id: 'island-mykonos',
    name: 'Psarou Plajı',
    slug: 'psarou-beach',
    description: 'Ünlülerin uğrak noktası olan, lüks yatların demirlediği ve dünyaca ünlü plaj kulüplerinin bulunduğu popüler altın sarısı kumsal.',
    beach_type: 'sand',
    water_depth: 'shallow',
    crowd_level: 'high',
    family_friendly: true,
    pet_friendly: false,
    blue_flag: true,
    sunbed_price: 80,
    umbrella_price: 40,
    has_parking: true,
    has_showers: true,
    has_toilets: true,
    has_beach_bar: true,
    has_lifeguard: true,
    accessibility: 'Kolay erişim, özel vale otoparkı mevcut',
    sunset_rating: 3,
    latitude: 37.4162,
    longitude: 25.3374,
    cover_image_url: null
  },
  {
    id: 'beach-elia',
    island_id: 'island-mykonos',
    name: 'Elia Plajı',
    slug: 'elia-beach',
    description: 'Mykonos\'un en uzun kumsallarından biri. Daha sakin, geniş alanı ve berrak suları ile bilinir.',
    beach_type: 'sand',
    water_depth: 'medium',
    crowd_level: 'medium',
    family_friendly: true,
    pet_friendly: true,
    blue_flag: false,
    sunbed_price: 30,
    umbrella_price: 15,
    has_parking: true,
    has_showers: true,
    has_toilets: true,
    has_beach_bar: true,
    has_lifeguard: false,
    accessibility: 'Kolay erişim, halk otobüsleri ve su taksileri çalışıyor',
    sunset_rating: 4,
    latitude: 37.4208,
    longitude: 25.3905,
    cover_image_url: null
  },

  // Zakynthos Beaches
  {
    id: 'beach-navagio',
    island_id: 'island-zakynthos',
    name: 'Navagio (Batık) Plajı',
    slug: 'navagio-beach',
    description: 'Beyaz çakıllı kumsalı, kireçtaşı uçurumları ve ortasındaki eski batık gemisi ile dünyanın en ikonik plajlarından biri.',
    beach_type: 'pebble',
    water_depth: 'deep',
    crowd_level: 'high',
    family_friendly: false,
    pet_friendly: false,
    blue_flag: false,
    sunbed_price: null,
    umbrella_price: null,
    has_parking: false,
    has_showers: false,
    has_toilets: false,
    has_beach_bar: false,
    has_lifeguard: false,
    accessibility: 'Sadece deniz yoluyla, teknelerle ulaşılabilir',
    sunset_rating: 5,
    latitude: 37.8594,
    longitude: 20.6247,
    cover_image_url: '/zakynthos.jpg'
  },
  {
    id: 'beach-banana',
    island_id: 'island-zakynthos',
    name: 'Banana Plajı',
    slug: 'banana-beach',
    description: 'Su sporları merkezleri, geniş kumsalı ve sığ denizi ile adanın en uzun ve eğlenceli organize plajı.',
    beach_type: 'sand',
    water_depth: 'shallow',
    crowd_level: 'medium',
    family_friendly: true,
    pet_friendly: true,
    blue_flag: true,
    sunbed_price: 15,
    umbrella_price: 5,
    has_parking: true,
    has_showers: true,
    has_toilets: true,
    has_beach_bar: true,
    has_lifeguard: true,
    accessibility: 'Oldukça kolay, geniş otoparkı var',
    sunset_rating: 4,
    latitude: 37.7479,
    longitude: 20.9782,
    cover_image_url: null
  },

  // Naxos Beaches
  {
    id: 'beach-plaka',
    island_id: 'island-naxos',
    name: 'Plaka Plajı',
    slug: 'plaka-beach',
    description: 'Metrelerce uzanan ince kumları, arkasındaki koruma altındaki kum tepeleri ve turkuaz deniziyle Naxos\'un en popüler plajı.',
    beach_type: 'sand',
    water_depth: 'shallow',
    crowd_level: 'medium',
    family_friendly: true,
    pet_friendly: true,
    blue_flag: true,
    sunbed_price: 15,
    umbrella_price: 5,
    has_parking: true,
    has_showers: true,
    has_toilets: true,
    has_beach_bar: true,
    has_lifeguard: true,
    accessibility: 'Kolay erişim, toprak yol sahil boyunca uzanır',
    sunset_rating: 5,
    latitude: 37.0456,
    longitude: 25.3619,
    cover_image_url: null
  },
  
  // Kos Beaches
  {
    id: 'beach-tigaki',
    island_id: 'island-kos',
    name: 'Tigaki Plajı',
    slug: 'tigaki-beach',
    description: 'İnce beyaz kumları, sığ denizi ve rüzgar sörfüne uygun yapısıyla özellikle çocuklu aileler için mükemmel bir plaj.',
    beach_type: 'sand',
    water_depth: 'shallow',
    crowd_level: 'medium',
    family_friendly: true,
    pet_friendly: true,
    blue_flag: true,
    sunbed_price: 10,
    umbrella_price: 5,
    has_parking: true,
    has_showers: true,
    has_toilets: true,
    has_beach_bar: true,
    has_lifeguard: true,
    accessibility: 'Düz ayak, tekerlekli sandalye erişimine uygun',
    sunset_rating: 4,
    latitude: 36.8834,
    longitude: 27.1873,
    cover_image_url: null
  },
  {
    id: 'beach-paradise',
    island_id: 'island-kos',
    name: 'Paradise Plajı',
    slug: 'paradise-beach',
    description: 'Adanın en ünlü plajlarından biri. Sudan çıkan doğal volkanik gaz kabarcıkları nedeniyle \'Bubble Beach\' olarak da bilinir.',
    beach_type: 'sand',
    water_depth: 'shallow',
    crowd_level: 'high',
    family_friendly: true,
    pet_friendly: false,
    blue_flag: false,
    sunbed_price: 15,
    umbrella_price: 5,
    has_parking: true,
    has_showers: true,
    has_toilets: true,
    has_beach_bar: true,
    has_lifeguard: true,
    accessibility: 'Oldukça kolay, tesisler hemen sahil kenarında',
    sunset_rating: 3,
    latitude: 36.7821,
    longitude: 27.0234,
    cover_image_url: null
  }
]

export const MOCK_RESTAURANTS: Restaurant[] = [
  // Santorini Restaurants
  {
    id: 'rest-selene',
    island_id: 'island-santorini',
    name: 'Selene Restaurant',
    slug: 'selene-restaurant',
    cuisine: 'Modern Yunan & Gurme',
    price_level: 'expensive',
    average_cost: 150,
    opening_hours: '18:00 - 23:30',
    phone: '+30 22860 22249',
    website: 'https://selene.gr',
    vegetarian: true,
    vegan: true,
    gluten_free: true,
    sea_view: true,
    outdoor_seating: true,
    family_friendly: false,
    latitude: 36.4192,
    longitude: 25.4312,
    cover_image_url: null
  },
  {
    id: 'rest-metaxi-mas',
    island_id: 'island-santorini',
    name: 'Metaxi Mas Taverna',
    slug: 'metaxi-mas',
    cuisine: 'Geleneksel Girit & Santorini',
    price_level: 'mid',
    average_cost: 35,
    opening_hours: '13:00 - 23:00',
    phone: '+30 22860 31323',
    website: 'https://www.santorini-metaximas.gr',
    vegetarian: true,
    vegan: false,
    gluten_free: true,
    sea_view: false,
    outdoor_seating: true,
    family_friendly: true,
    latitude: 36.3861,
    longitude: 25.4542,
    cover_image_url: null
  },

  // Mykonos Restaurants
  {
    id: 'rest-spilia',
    island_id: 'island-mykonos',
    name: 'Spilia Deniz Kenarı Restoranı',
    slug: 'spilia-seaside',
    cuisine: 'Akdeniz & Taze Deniz Ürünleri',
    price_level: 'expensive',
    average_cost: 120,
    opening_hours: '12:00 - 00:00',
    phone: '+30 22890 71205',
    website: 'https://spilia-co.gr',
    vegetarian: false,
    vegan: false,
    gluten_free: true,
    sea_view: true,
    outdoor_seating: true,
    family_friendly: true,
    latitude: 37.4194,
    longitude: 25.4093,
    cover_image_url: null
  },
  {
    id: 'rest-kikis',
    island_id: 'island-mykonos',
    name: 'Kiki\'s Tavern',
    slug: 'kikis-tavern',
    cuisine: 'Odun Ateşinde Izgara & Meze',
    price_level: 'mid',
    average_cost: 30,
    opening_hours: '12:30 - 18:30 (Elektriksiz mutfak)',
    phone: null,
    website: null,
    vegetarian: true,
    vegan: false,
    gluten_free: false,
    sea_view: true,
    outdoor_seating: true,
    family_friendly: true,
    latitude: 37.4801,
    longitude: 25.3582,
    cover_image_url: null
  },

  // Zakynthos Restaurants
  {
    id: 'rest-nobelos',
    island_id: 'island-zakynthos',
    name: 'Nobelos Bio Restaurant',
    slug: 'nobelos-bio',
    cuisine: 'Organik Akdeniz & Deniz Ürünleri',
    price_level: 'expensive',
    average_cost: 80,
    opening_hours: '09:00 - 23:00',
    phone: '+30 26950 31132',
    website: 'https://www.nobelos.gr',
    vegetarian: true,
    vegan: true,
    gluten_free: true,
    sea_view: true,
    outdoor_seating: true,
    family_friendly: true,
    latitude: 37.9152,
    longitude: 20.6974,
    cover_image_url: null
  },

  // Naxos Restaurants
  {
    id: 'rest-axiotissa',
    island_id: 'island-naxos',
    name: 'Axiotissa Taverna',
    slug: 'axiotissa',
    cuisine: 'Yöresel Naxos Mutfağı',
    price_level: 'mid',
    average_cost: 25,
    opening_hours: '13:00 - 23:00',
    phone: '+30 22850 75107',
    website: null,
    vegetarian: true,
    vegan: true,
    gluten_free: false,
    sea_view: false,
    outdoor_seating: true,
    family_friendly: true,
    latitude: 37.0289,
    longitude: 25.3854,
    cover_image_url: null
  },

  // Kos Restaurants
  {
    id: 'rest-oromedon',
    island_id: 'island-kos',
    name: 'Oromedon Restoran',
    slug: 'oromedon',
    cuisine: 'Geleneksel Oniki Ada Lezzetleri',
    price_level: 'mid',
    average_cost: 30,
    opening_hours: '12:00 - 23:30',
    phone: '+30 22420 69983',
    website: 'https://oromedon.com',
    vegetarian: true,
    vegan: false,
    gluten_free: true,
    sea_view: true,
    outdoor_seating: true,
    family_friendly: true,
    latitude: 36.8482,
    longitude: 27.2045,
    cover_image_url: null
  }
]

export function getIslandBySlug(slug: string): Island | undefined {
  return MOCK_ISLANDS.find(island => island.slug.toLowerCase() === slug.toLowerCase())
}

export function getBeachesForIsland(islandId: string): Beach[] {
  return MOCK_BEACHES.filter(beach => beach.island_id === islandId)
}

export function getRestaurantsForIsland(islandId: string): Restaurant[] {
  return MOCK_RESTAURANTS.filter(rest => rest.island_id === islandId)
}

export interface FerryRoute {
  id: string
  from_port: string
  to_port: string
  companies: string[]
  duration_minutes: number
  price_min: number
  price_max: number
}

export const MOCK_FERRY_ROUTES: FerryRoute[] = [
  {
    id: 'route-bodrum-kos',
    from_port: 'Bodrum',
    to_port: 'Kos',
    companies: ['Yesil Marmaris Lines', 'Makri Travel', 'Exas Shipping'],
    duration_minutes: 20,
    price_min: 20,
    price_max: 35
  },
  {
    id: 'route-kos-bodrum',
    from_port: 'Kos',
    to_port: 'Bodrum',
    companies: ['Yesil Marmaris Lines', 'Makri Travel', 'Exas Shipping'],
    duration_minutes: 20,
    price_min: 20,
    price_max: 35
  },
  {
    id: 'route-athens-kos',
    from_port: 'Atina (Pire)',
    to_port: 'Kos',
    companies: ['Blue Star Ferries'],
    duration_minutes: 510,
    price_min: 60,
    price_max: 120
  },
  {
    id: 'route-kos-athens',
    from_port: 'Kos',
    to_port: 'Atina (Pire)',
    companies: ['Blue Star Ferries'],
    duration_minutes: 510,
    price_min: 60,
    price_max: 120
  },
  {
    id: 'route-santorini-kos',
    from_port: 'Santorini',
    to_port: 'Kos',
    companies: ['Seajets'],
    duration_minutes: 240,
    price_min: 45,
    price_max: 80
  },
  {
    id: 'route-kos-santorini',
    from_port: 'Kos',
    to_port: 'Santorini',
    companies: ['Seajets'],
    duration_minutes: 240,
    price_min: 45,
    price_max: 80
  },
  {
    id: 'route-rhodes-kos',
    from_port: 'Rhodes',
    to_port: 'Kos',
    companies: ['Dodekanisos Seaways', 'Blue Star Ferries'],
    duration_minutes: 150,
    price_min: 30,
    price_max: 55
  },
  {
    id: 'route-kos-rhodes',
    from_port: 'Kos',
    to_port: 'Rhodes',
    companies: ['Dodekanisos Seaways', 'Blue Star Ferries'],
    duration_minutes: 150,
    price_min: 30,
    price_max: 55
  }
]

export function searchFerryRoutes(fromPort: string, toPort: string): FerryRoute[] {
  return MOCK_FERRY_ROUTES.filter(route => 
    route.from_port.toLowerCase() === fromPort.toLowerCase() && 
    route.to_port.toLowerCase() === toPort.toLowerCase()
  )
}

