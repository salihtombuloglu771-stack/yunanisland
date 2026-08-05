'use client'

import { useState } from 'react'
import { JsonLd } from '@/components/JsonLd'
import { useLanguage } from '@/lib/i18n/LanguageProvider'

export interface Faq { question: string; answer: string }

export function FaqAccordion({ faqs, faqsEn, faqsEl }: { faqs: Faq[]; faqsEn?: Faq[]; faqsEl?: Faq[] }) {
  const { locale } = useLanguage()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const activeFaqs = locale === 'en' ? (faqsEn?.length ? faqsEn : faqs)
    : locale === 'el' ? (faqsEl?.length ? faqsEl : faqs)
    : faqs

  const title = locale === 'en' ? '❓ Frequently Asked Questions' : locale === 'el' ? '❓ Συχνές Ερωτήσεις' : '❓ Sık Sorulan Sorular'

  if (!activeFaqs || activeFaqs.length === 0) return null

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: activeFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }

  return (
    <div className="mt-8">
      <JsonLd data={jsonLd} />
      <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-4">{title}</h3>
      <div className="space-y-2">
        {activeFaqs.map((faq, i) => (
          <div key={i} className="bg-white dark:bg-neutral-900 rounded-xl border border-slate-100 dark:border-neutral-900 overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between text-left px-5 py-4 text-sm font-semibold text-neutral-800 dark:text-neutral-200"
            >
              {faq.question}
              <span className={`transition-transform ${openIndex === i ? 'rotate-45' : ''}`}>+</span>
            </button>
            {openIndex === i && (
              <div className="px-5 pb-4 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
