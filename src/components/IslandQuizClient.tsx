'use client'

import { useMemo, useState } from 'react'
import Link, { useLocalizedHref } from '@/components/LocaleLink'
import Image from 'next/image'
import { ShareButtons } from '@/components/ShareButtons'
import { useLanguage } from '@/lib/i18n/LanguageProvider'
import { QUIZ_QUESTIONS, MOOD_LABELS, scoreIslands, type Budget } from '@/lib/islandQuiz'

export interface QuizIslandData {
  id: string
  name: string
  slug: string
  description: string | null
  description_en?: string | null
  description_el?: string | null
  budget_level: Budget | null
  moods?: string[] | null
  cover_image_url: string | null
}

interface IslandQuizClientProps {
  islands: QuizIslandData[]
  siteUrl: string
  sharedResult?: QuizIslandData | null
}

export function IslandQuizClient({ islands, siteUrl, sharedResult }: IslandQuizClientProps) {
  const { locale } = useLanguage()
  const localize = useLocalizedHref()
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})

  const done = step >= QUIZ_QUESTIONS.length
  const results = useMemo(() => (done ? scoreIslands(islands, answers) : []), [done, islands, answers])

  const tt = {
    friendGot: (name: string) => locale === 'en' ? `Your friend got ${name}! Which island are you?` : locale === 'el' ? `Ο φίλος σας βγήκε ${name}! Εσείς ποιο νησί είστε;` : `Arkadaşına ${name} çıktı! Peki sana hangisi?`,
    question: (n: number) => locale === 'en' ? `Question ${n} / ${QUIZ_QUESTIONS.length}` : locale === 'el' ? `Ερώτηση ${n} / ${QUIZ_QUESTIONS.length}` : `Soru ${n} / ${QUIZ_QUESTIONS.length}`,
    back: locale === 'en' ? '← Back' : locale === 'el' ? '← Πίσω' : '← Geri',
    yourIsland: locale === 'en' ? 'Your island is' : locale === 'el' ? 'Το νησί σας είναι' : 'Senin adan',
    match: locale === 'en' ? 'match' : locale === 'el' ? 'ταίριασμα' : 'uyum',
    explore: locale === 'en' ? 'Explore the island →' : locale === 'el' ? 'Εξερευνήστε το νησί →' : 'Adayı keşfet →',
    alsoGood: locale === 'en' ? 'Also a great fit' : locale === 'el' ? 'Επίσης ταιριάζουν' : 'Bunlar da sana uygun',
    share: locale === 'en' ? 'Share your result' : locale === 'el' ? 'Μοιραστείτε το αποτέλεσμα' : 'Sonucunu paylaş',
    retry: locale === 'en' ? '↺ Retake the quiz' : locale === 'el' ? '↺ Ξανά το κουίζ' : '↺ Testi tekrar çöz',
    shareTitle: (name: string) => locale === 'en' ? `My Greek island is ${name}! Which one are you?` : locale === 'el' ? `Το ελληνικό μου νησί είναι η ${name}! Εσείς;` : `Bana uygun Yunan adası ${name} çıktı! Sana hangisi?`,
  }

  const describe = (i: QuizIslandData) =>
    (locale === 'en' ? i.description_en : locale === 'el' ? i.description_el : null) || i.description || ''

  const choose = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }))
    setStep((s) => s + 1)
  }

  const restart = () => {
    setAnswers({})
    setStep(0)
  }

  if (done && results.length > 0) {
    const [top, ...rest] = results
    const shareUrl = `${siteUrl}${localize(`/hangi-ada?sonuc=${top.island.slug}`)}`
    return (
      <div className="space-y-8">
        <div className="overflow-hidden rounded-3xl bg-white dark:bg-neutral-900 border border-slate-100 dark:border-neutral-800 shadow-sm">
          <div className="relative h-56 sm:h-72 bg-gradient-to-br from-sky-500 to-indigo-600">
            {top.island.cover_image_url && (
              <Image src={top.island.cover_image_url} alt={top.island.name} fill sizes="(max-width: 768px) 100vw, 768px" className="object-cover" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <p className="text-sm font-semibold uppercase tracking-wider opacity-90">{tt.yourIsland}</p>
              <h2 className="text-4xl sm:text-5xl font-extrabold drop-shadow">{top.island.name}</h2>
            </div>
            <span className="absolute top-4 right-4 rounded-full bg-white/95 px-4 py-1.5 text-sm font-bold text-sky-700 shadow">
              %{top.percent} {tt.match}
            </span>
          </div>
          <div className="p-6 space-y-5">
            {top.matchedMoods.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {top.matchedMoods.map((m) => (
                  <span key={m} className="rounded-full bg-sky-50 dark:bg-sky-950 px-3 py-1 text-xs font-semibold text-sky-700 dark:text-sky-300">
                    {MOOD_LABELS[m][locale]}
                  </span>
                ))}
              </div>
            )}
            <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed line-clamp-4">{describe(top.island)}</p>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <Link href={`/islands/${top.island.slug}`} className="rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-sky-500 transition-colors">
                {tt.explore}
              </Link>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-neutral-500">{tt.share}</span>
                <ShareButtons url={shareUrl} title={tt.shareTitle(top.island.name)} />
              </div>
            </div>
          </div>
        </div>

        {rest.length > 0 && (
          <div>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-4">{tt.alsoGood}</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {rest.slice(0, 2).map((r) => (
                <Link key={r.island.id} href={`/islands/${r.island.slug}`}
                  className="group flex items-center gap-4 rounded-2xl bg-white dark:bg-neutral-900 border border-slate-100 dark:border-neutral-800 p-3 shadow-sm hover:shadow-md transition-shadow">
                  <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-sky-100 dark:bg-neutral-800">
                    {r.island.cover_image_url && (
                      <Image src={r.island.cover_image_url} alt={r.island.name} fill sizes="64px" className="object-cover" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900 dark:text-white group-hover:text-sky-600">{r.island.name}</p>
                    <p className="text-sm text-neutral-500">%{r.percent} {tt.match}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="text-center">
          <button type="button" onClick={restart} className="text-sm font-semibold text-sky-600 hover:text-sky-500">
            {tt.retry}
          </button>
        </div>
      </div>
    )
  }

  const question = QUIZ_QUESTIONS[Math.min(step, QUIZ_QUESTIONS.length - 1)]
  const progress = (step / QUIZ_QUESTIONS.length) * 100

  return (
    <div className="space-y-6">
      {sharedResult && step === 0 && (
        <div className="rounded-2xl bg-sky-50 dark:bg-sky-950/50 border border-sky-100 dark:border-sky-900 px-5 py-4 text-sm font-semibold text-sky-800 dark:text-sky-200">
          🏝️ {tt.friendGot(sharedResult.name)}
        </div>
      )}

      <div className="rounded-3xl bg-white dark:bg-neutral-900 border border-slate-100 dark:border-neutral-800 p-6 sm:p-8 shadow-sm">
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
            <span>{tt.question(step + 1)}</span>
            {step > 0 && (
              <button type="button" onClick={() => setStep((s) => s - 1)} className="normal-case tracking-normal text-sm font-semibold text-sky-600 hover:text-sky-500">
                {tt.back}
              </button>
            )}
          </div>
          <div className="h-2 rounded-full bg-slate-100 dark:bg-neutral-800 overflow-hidden">
            <div className="h-full rounded-full bg-sky-500 transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white mb-6">{question.title[locale]}</h2>

        <div className="grid gap-3 sm:grid-cols-2">
          {question.options.map((o) => {
            const selected = answers[question.id] === o.id
            return (
              <button
                key={o.id}
                type="button"
                onClick={() => choose(question.id, o.id)}
                className={`flex items-center gap-4 rounded-2xl border-2 px-5 py-4 text-left transition-all hover:-translate-y-0.5 hover:shadow-md ${
                  selected
                    ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/50'
                    : 'border-slate-100 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 hover:border-sky-300 dark:hover:border-sky-700'
                }`}
              >
                <span className="text-3xl">{o.emoji}</span>
                <span className="font-semibold text-neutral-800 dark:text-neutral-200">{o.label[locale]}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
