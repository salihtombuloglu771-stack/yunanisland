import type { Faq } from '@/components/FaqAccordion'

type Locale = 'tr' | 'en' | 'el'

export function getBeachFaqs(beach: {
  name: string
  blue_flag: boolean
  sunset_rating: number | null
  sunbed_price: number | null
  umbrella_price: number | null
  has_parking: boolean
  has_showers: boolean
  has_toilets: boolean
  has_beach_bar: boolean
  has_lifeguard: boolean
  family_friendly: boolean
}, locale: Locale): Faq[] {
  const faqs: Faq[] = []
  const isFree = !beach.sunbed_price && !beach.umbrella_price
  // İsim zaten "Plajı"/"Beach" içeriyorsa ("Super Paradise Beach" gibi)
  // ikinci kez eklemiyoruz — "Agios Prokopios Plajı plajı" gibi tekrarı önler.
  const hasBeachWord = /plaj|beach/i.test(beach.name)
  const beachSuffix = hasBeachWord ? '' : ' plajı'
  const bareName = hasBeachWord ? beach.name : `${beach.name} plajı`

  faqs.push({
    question: locale === 'en' ? `Is ${beach.name} a paid beach?` : locale === 'el' ? `Η παραλία ${beach.name} είναι επί πληρωμή;` : `${beach.name}${beachSuffix} ücretli mi?`,
    answer: isFree
      ? (locale === 'en' ? 'No, sunbeds and umbrellas are free or not offered at this beach.' : locale === 'el' ? 'Όχι, οι ξαπλώστρες και οι ομπρέλες σε αυτή την παραλία είναι δωρεάν ή δεν προσφέρονται.' : 'Hayır, bu plajda şezlong ve şemsiye ücretsiz veya sunulmuyor.')
      : (locale === 'en' ? `Sunbed price is around €${beach.sunbed_price ?? 0}, umbrella price is around €${beach.umbrella_price ?? 0}.` : locale === 'el' ? `Η τιμή ξαπλώστρας είναι περίπου €${beach.sunbed_price ?? 0}, η τιμή ομπρέλας περίπου €${beach.umbrella_price ?? 0}.` : `Şezlong fiyatı yaklaşık ${beach.sunbed_price ?? 0} €, şemsiye fiyatı yaklaşık ${beach.umbrella_price ?? 0} €.`),
  })

  const amenities = [
    beach.has_parking && (locale === 'en' ? 'parking' : locale === 'el' ? 'πάρκινγκ' : 'otopark'),
    beach.has_showers && (locale === 'en' ? 'showers' : locale === 'el' ? 'ντουζ' : 'duş'),
    beach.has_toilets && (locale === 'en' ? 'toilets' : locale === 'el' ? 'τουαλέτες' : 'tuvalet'),
    beach.has_beach_bar && (locale === 'en' ? 'a beach bar' : locale === 'el' ? 'beach bar' : 'plaj bar'),
    beach.has_lifeguard && (locale === 'en' ? 'a lifeguard' : locale === 'el' ? 'ναυαγοσώστη' : 'cankurtaran'),
  ].filter((v): v is string => Boolean(v))

  if (amenities.length > 0) {
    faqs.push({
      question: locale === 'en' ? `What amenities does ${beach.name} have?` : locale === 'el' ? `Τι παροχές έχει η παραλία ${beach.name};` : `${bareName}nda hangi imkanlar var?`,
      answer: locale === 'en' ? `This beach has ${amenities.join(', ')}.` : locale === 'el' ? `Αυτή η παραλία διαθέτει ${amenities.join(', ')}.` : `Bu plajda ${amenities.join(', ')} bulunuyor.`,
    })
  }

  if (beach.blue_flag) {
    faqs.push({
      question: locale === 'en' ? `Does ${beach.name} have a Blue Flag?` : locale === 'el' ? `Η παραλία ${beach.name} έχει Γαλάζια Σημαία;` : `${beach.name} Mavi Bayrak ödüllü mü?`,
      answer: locale === 'en' ? `Yes, ${beach.name} is a Blue Flag certified beach.` : locale === 'el' ? `Ναι, η παραλία ${beach.name} είναι πιστοποιημένη με Γαλάζια Σημαία.` : `Evet, ${beach.name} Mavi Bayrak sertifikalı bir plajdır.`,
    })
  }

  faqs.push({
    question: locale === 'en' ? `Is ${beach.name} good for families with children?` : locale === 'el' ? `Η παραλία ${beach.name} είναι κατάλληλη για οικογένειες με παιδιά;` : `${beach.name} çocuklu aileler için uygun mu?`,
    answer: beach.family_friendly
      ? (locale === 'en' ? 'Yes, this beach is considered family friendly.' : locale === 'el' ? 'Ναι, αυτή η παραλία θεωρείται φιλική για οικογένειες.' : 'Evet, bu plaj aile dostu olarak kabul ediliyor.')
      : (locale === 'en' ? 'This beach is not specifically marked as family friendly, so check conditions before visiting with young children.' : locale === 'el' ? 'Αυτή η παραλία δεν είναι ειδικά επισημασμένη ως φιλική για οικογένειες, οπότε ελέγξτε τις συνθήκες πριν την επισκεφθείτε με μικρά παιδιά.' : 'Bu plaj özellikle aile dostu olarak işaretlenmemiş, küçük çocuklarla gitmeden önce koşulları kontrol etmenizde fayda var.'),
  })

  if (beach.sunset_rating) {
    faqs.push({
      question: locale === 'en' ? `Is ${beach.name} good for watching the sunset?` : locale === 'el' ? `Η παραλία ${beach.name} είναι καλή για το ηλιοβασίλεμα;` : `${beach.name} gün batımını izlemek için uygun mu?`,
      answer: locale === 'en' ? `Yes, it has a sunset rating of ${beach.sunset_rating}/5.` : locale === 'el' ? `Ναι, έχει βαθμολογία ηλιοβασιλέματος ${beach.sunset_rating}/5.` : `Evet, gün batımı puanı 5 üzerinden ${beach.sunset_rating}.`,
    })
  }

  return faqs
}

export function getRestaurantFaqs(restaurant: {
  name: string
  priceLabel: string
  opening_hours: string | null
  sea_view: boolean
  vegan: boolean
  vegetarian: boolean
  gluten_free: boolean
}, locale: Locale): Faq[] {
  const faqs: Faq[] = []

  faqs.push({
    question: locale === 'en' ? `What is the price level at ${restaurant.name}?` : locale === 'el' ? `Ποιο είναι το επίπεδο τιμών στο ${restaurant.name};` : `${restaurant.name} restoranının fiyat seviyesi nedir?`,
    answer: locale === 'en' ? `${restaurant.name} is categorized as ${restaurant.priceLabel}.` : locale === 'el' ? `Το ${restaurant.name} κατατάσσεται ως ${restaurant.priceLabel}.` : `${restaurant.name}, ${restaurant.priceLabel} kategorisinde bir restorandır.`,
  })

  if (restaurant.opening_hours) {
    faqs.push({
      question: locale === 'en' ? `What are the opening hours of ${restaurant.name}?` : locale === 'el' ? `Ποιες είναι οι ώρες λειτουργίας του ${restaurant.name};` : `${restaurant.name} çalışma saatleri nedir?`,
      answer: restaurant.opening_hours,
    })
  }

  if (restaurant.sea_view) {
    faqs.push({
      question: locale === 'en' ? `Does ${restaurant.name} have a sea view?` : locale === 'el' ? `Το ${restaurant.name} έχει θέα στη θάλασσα;` : `${restaurant.name} deniz manzaralı mı?`,
      answer: locale === 'en' ? `Yes, ${restaurant.name} offers a sea view.` : locale === 'el' ? `Ναι, το ${restaurant.name} προσφέρει θέα στη θάλασσα.` : `Evet, ${restaurant.name} deniz manzarası sunuyor.`,
    })
  }

  const diets = [
    restaurant.vegan && (locale === 'en' ? 'vegan' : locale === 'el' ? 'vegan' : 'vegan'),
    restaurant.vegetarian && (locale === 'en' ? 'vegetarian' : locale === 'el' ? 'χορτοφαγικές' : 'vejetaryen'),
    restaurant.gluten_free && (locale === 'en' ? 'gluten-free' : locale === 'el' ? 'χωρίς γλουτένη' : 'glütensiz'),
  ].filter((v): v is string => Boolean(v))

  if (diets.length > 0) {
    faqs.push({
      question: locale === 'en' ? `Does ${restaurant.name} have vegetarian or vegan options?` : locale === 'el' ? `Το ${restaurant.name} έχει χορτοφαγικές ή vegan επιλογές;` : `${restaurant.name}'de vejetaryen veya vegan seçenek var mı?`,
      answer: locale === 'en' ? `Yes, ${restaurant.name} offers ${diets.join(', ')} options.` : locale === 'el' ? `Ναι, το ${restaurant.name} προσφέρει ${diets.join(', ')} επιλογές.` : `Evet, ${restaurant.name}'de ${diets.join(', ')} seçenekler bulunuyor.`,
    })
  }

  return faqs
}

export function getHotelFaqs(hotel: {
  name: string
  categoryLabel: string
  star_rating?: number | null
  has_wifi?: boolean
  has_pool?: boolean
  has_breakfast?: boolean
  beachfront?: boolean
}, locale: Locale): Faq[] {
  const faqs: Faq[] = []

  faqs.push({
    question: locale === 'en' ? `What category is ${hotel.name}?` : locale === 'el' ? `Σε ποια κατηγορία ανήκει το ${hotel.name};` : `${hotel.name} hangi kategoride bir otel?`,
    answer: locale === 'en' ? `${hotel.name} is categorized as ${hotel.categoryLabel}.` : locale === 'el' ? `Το ${hotel.name} κατατάσσεται ως ${hotel.categoryLabel}.` : `${hotel.name}, ${hotel.categoryLabel} kategorisinde bir oteldir.`,
  })

  if (hotel.star_rating) {
    faqs.push({
      question: locale === 'en' ? `How many stars does ${hotel.name} have?` : locale === 'el' ? `Πόσα αστέρια έχει το ${hotel.name};` : `${hotel.name} kaç yıldızlı bir otel?`,
      answer: locale === 'en' ? `${hotel.name} is a ${hotel.star_rating}-star hotel.` : locale === 'el' ? `Το ${hotel.name} είναι ξενοδοχείο ${hotel.star_rating} αστέρων.` : `${hotel.name}, ${hotel.star_rating} yıldızlı bir oteldir.`,
    })
  }

  const amenities = [
    hotel.has_wifi && (locale === 'en' ? 'wifi' : locale === 'el' ? 'wifi' : 'wifi'),
    hotel.has_pool && (locale === 'en' ? 'a pool' : locale === 'el' ? 'πισίνα' : 'havuz'),
    hotel.has_breakfast && (locale === 'en' ? 'breakfast' : locale === 'el' ? 'πρωινό' : 'kahvaltı'),
    hotel.beachfront && (locale === 'en' ? 'a beachfront location' : locale === 'el' ? 'παραλιακή τοποθεσία' : 'plaja sıfır konum'),
  ].filter((v): v is string => Boolean(v))

  if (amenities.length > 0) {
    faqs.push({
      question: locale === 'en' ? `What amenities does ${hotel.name} offer?` : locale === 'el' ? `Τι παροχές προσφέρει το ${hotel.name};` : `${hotel.name} hangi imkanları sunuyor?`,
      answer: locale === 'en' ? `${hotel.name} offers ${amenities.join(', ')}.` : locale === 'el' ? `Το ${hotel.name} προσφέρει ${amenities.join(', ')}.` : `${hotel.name}, ${amenities.join(', ')} sunuyor.`,
    })
  }

  return faqs
}

export function getAttractionFaqs(attraction: {
  name: string
  categoryLabel: string
  opening_hours: string | null
  ticket_price: string | null
}, locale: Locale): Faq[] {
  const faqs: Faq[] = []

  faqs.push({
    question: locale === 'en' ? `What kind of attraction is ${attraction.name}?` : locale === 'el' ? `Τι είδους αξιοθέατο είναι το ${attraction.name};` : `${attraction.name} hangi kategoride bir gezilecek yer?`,
    answer: locale === 'en' ? `${attraction.name} is categorized as ${attraction.categoryLabel}.` : locale === 'el' ? `Το ${attraction.name} κατατάσσεται ως ${attraction.categoryLabel}.` : `${attraction.name}, ${attraction.categoryLabel} kategorisinde bir gezilecek yerdir.`,
  })

  if (attraction.ticket_price) {
    faqs.push({
      question: locale === 'en' ? `How much is the entrance fee for ${attraction.name}?` : locale === 'el' ? `Πόσο κοστίζει το εισιτήριο για το ${attraction.name};` : `${attraction.name}'in giriş ücreti nedir?`,
      answer: attraction.ticket_price,
    })
  }

  if (attraction.opening_hours) {
    faqs.push({
      question: locale === 'en' ? `What are the visiting hours of ${attraction.name}?` : locale === 'el' ? `Ποιες είναι οι ώρες επίσκεψης του ${attraction.name};` : `${attraction.name} ziyaret saatleri nedir?`,
      answer: attraction.opening_hours,
    })
  }

  return faqs
}
