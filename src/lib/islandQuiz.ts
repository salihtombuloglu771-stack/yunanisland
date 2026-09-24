// "Sana Hangi Yunan Adası Uygun?" quiz'i — tamamen kural tabanlı, AI yok.
// Her cevap adaların gerçek `moods` etiketlerine (migration 022) ve
// `budget_level` alanına ağırlık veriyor; ada puanı = eşleşen ağırlıkların
// toplamı, olası en yüksek puana oranlanıp yüzdeye çevriliyor.

import type { Locale } from '@/lib/i18n/dictionary'

export type Mood = 'honeymoon' | 'family' | 'nightlife' | 'nature' | 'history'
export type Budget = 'budget' | 'mid' | 'luxury'

type Localized = Record<Locale, string>

export interface QuizOption {
  id: string
  emoji: string
  label: Localized
  moods?: Partial<Record<Mood, number>>
  budget?: Budget
}

export interface QuizQuestion {
  id: string
  title: Localized
  options: QuizOption[]
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'company',
    title: { tr: 'Kiminle gidiyorsun?', en: 'Who are you travelling with?', el: 'Με ποιον ταξιδεύετε;' },
    options: [
      { id: 'couple', emoji: '💑', label: { tr: 'Sevgilimle / eşimle', en: 'My partner', el: 'Με τον/την σύντροφό μου' }, moods: { honeymoon: 2 } },
      { id: 'friends', emoji: '🥳', label: { tr: 'Arkadaş grubuyla', en: 'A group of friends', el: 'Με παρέα φίλων' }, moods: { nightlife: 2 } },
      { id: 'family', emoji: '👨‍👩‍👧', label: { tr: 'Ailemle / çocuklarla', en: 'Family with kids', el: 'Με την οικογένεια' }, moods: { family: 2 } },
      { id: 'solo', emoji: '🎒', label: { tr: 'Tek başıma', en: 'Solo', el: 'Μόνος/η' }, moods: { nature: 1, history: 1 } },
    ],
  },
  {
    id: 'day',
    title: { tr: 'İdeal bir gün nasıl geçer?', en: 'What does your ideal day look like?', el: 'Πώς είναι η ιδανική σας μέρα;' },
    options: [
      { id: 'beach', emoji: '🏖️', label: { tr: 'Saklı koylarda yüzmek', en: 'Swimming in hidden coves', el: 'Κολύμπι σε κρυφούς όρμους' }, moods: { nature: 2 } },
      { id: 'party', emoji: '🍹', label: { tr: 'Beach bar, müzik, eğlence', en: 'Beach bars, music, fun', el: 'Beach bar, μουσική, διασκέδαση' }, moods: { nightlife: 2 } },
      { id: 'ruins', emoji: '🏛️', label: { tr: 'Antik kentler ve müzeler', en: 'Ancient sites and museums', el: 'Αρχαία και μουσεία' }, moods: { history: 2 } },
      { id: 'view', emoji: '🌅', label: { tr: 'Manzaralı bir terasta keyif', en: 'Relaxing on a terrace with a view', el: 'Χαλάρωση σε βεράντα με θέα' }, moods: { honeymoon: 2 } },
    ],
  },
  {
    id: 'budget',
    title: { tr: 'Bütçen nasıl?', en: 'What is your budget?', el: 'Ποιος είναι ο προϋπολογισμός σας;' },
    options: [
      { id: 'budget', emoji: '💰', label: { tr: 'Hesaplı olsun', en: 'Keep it affordable', el: 'Οικονομικά' }, budget: 'budget' },
      { id: 'mid', emoji: '💳', label: { tr: 'Orta segment', en: 'Mid-range', el: 'Μεσαία κατηγορία' }, budget: 'mid' },
      { id: 'luxury', emoji: '💎', label: { tr: 'Lüks, kendimi şımartırım', en: 'Luxury, treat myself', el: 'Πολυτέλεια' }, budget: 'luxury' },
    ],
  },
  {
    id: 'evening',
    title: { tr: 'Akşamları ne yaparsın?', en: 'How do you spend your evenings?', el: 'Τι κάνετε τα βράδια;' },
    options: [
      { id: 'taverna', emoji: '🍽️', label: { tr: 'Sakin bir tavernada yemek', en: 'Dinner at a quiet taverna', el: 'Δείπνο σε ήσυχη ταβέρνα' }, moods: { family: 1, nature: 1 } },
      { id: 'club', emoji: '🎶', label: { tr: 'Sabaha kadar dans', en: 'Dance until sunrise', el: 'Χορός μέχρι το πρωί' }, moods: { nightlife: 2 } },
      { id: 'sunset', emoji: '🥂', label: { tr: 'Gün batımında şarap', en: 'Wine at sunset', el: 'Κρασί στο ηλιοβασίλεμα' }, moods: { honeymoon: 2 } },
      { id: 'oldtown', emoji: '🏰', label: { tr: 'Eski şehir sokaklarında yürüyüş', en: 'Strolling the old town', el: 'Βόλτα στην παλιά πόλη' }, moods: { history: 2 } },
    ],
  },
  {
    id: 'crowd',
    title: { tr: 'Kalabalık konusunda?', en: 'How do you feel about crowds?', el: 'Πώς νιώθετε για τον κόσμο;' },
    options: [
      { id: 'quiet', emoji: '🌿', label: { tr: 'Ne kadar sakin o kadar iyi', en: 'The quieter the better', el: 'Όσο πιο ήσυχα τόσο καλύτερα' }, moods: { nature: 2 } },
      { id: 'balanced', emoji: '⚖️', label: { tr: 'Dengeli olsun', en: 'Somewhere in between', el: 'Κάτι ενδιάμεσο' }, moods: { family: 1, history: 1 } },
      { id: 'lively', emoji: '🎉', label: { tr: 'Hareketli, canlı yerler', en: 'Lively and buzzing', el: 'Ζωντανά μέρη' }, moods: { nightlife: 2 } },
    ],
  },
]

export interface QuizIsland {
  slug: string
  moods?: string[] | null
  budget_level: Budget | null
}

const BUDGET_ORDER: Budget[] = ['budget', 'mid', 'luxury']
const BUDGET_WEIGHT = 3

function budgetScore(want: Budget, has: Budget | null): number {
  if (!has) return 0
  const diff = Math.abs(BUDGET_ORDER.indexOf(want) - BUDGET_ORDER.indexOf(has))
  return diff === 0 ? BUDGET_WEIGHT : diff === 1 ? 1 : 0
}

export interface QuizResult<T extends QuizIsland> {
  island: T
  percent: number
  matchedMoods: Mood[]
}

// answers: questionId -> optionId
export function scoreIslands<T extends QuizIsland>(islands: T[], answers: Record<string, string>): QuizResult<T>[] {
  const chosen = QUIZ_QUESTIONS
    .map((q) => q.options.find((o) => o.id === answers[q.id]))
    .filter((o): o is QuizOption => Boolean(o))

  const maxScore = chosen.reduce((sum, o) => {
    const moodMax = o.moods ? Object.values(o.moods).reduce((a, b) => a + b, 0) : 0
    return sum + moodMax + (o.budget ? BUDGET_WEIGHT : 0)
  }, 0)

  return islands
    .map((island) => {
      const moods = new Set(island.moods ?? [])
      const matched = new Set<Mood>()
      let score = 0
      for (const o of chosen) {
        for (const [mood, weight] of Object.entries(o.moods ?? {}) as [Mood, number][]) {
          if (moods.has(mood)) { score += weight; matched.add(mood) }
        }
        if (o.budget) score += budgetScore(o.budget, island.budget_level)
      }
      // Tabanı %40'a oturtuyoruz ki "sana %8 uygun" gibi moral bozucu değil,
      // paylaşılabilir bir sonuç çıksın; sıralama ham puana göre aynı kalıyor.
      const percent = maxScore > 0 ? Math.round(40 + (score / maxScore) * 60) : 40
      return { island, percent, matchedMoods: [...matched] }
    })
    .sort((a, b) => b.percent - a.percent || a.island.slug.localeCompare(b.island.slug))
}

export const MOOD_LABELS: Record<Mood, Localized> = {
  honeymoon: { tr: '❤️ Romantik', en: '❤️ Romantic', el: '❤️ Ρομαντικό' },
  family: { tr: '👨‍👩‍👧 Aile dostu', en: '👨‍👩‍👧 Family friendly', el: '👨‍👩‍👧 Οικογενειακό' },
  nightlife: { tr: '🎉 Gece hayatı', en: '🎉 Nightlife', el: '🎉 Νυχτερινή ζωή' },
  nature: { tr: '🌿 Doğa', en: '🌿 Nature', el: '🌿 Φύση' },
  history: { tr: '🏛️ Tarih', en: '🏛️ History', el: '🏛️ Ιστορία' },
}
