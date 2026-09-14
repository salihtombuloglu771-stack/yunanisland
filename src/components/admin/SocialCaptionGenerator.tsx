'use client'

import { useState } from 'react'
import { generateArticleCaption } from '@/lib/socialCaption'

export function SocialCaptionGenerator({ title, slug, content, categoryName }: {
  title: string
  slug: string
  content: string | null
  categoryName?: string | null
}) {
  const [tab, setTab] = useState<'instagram' | 'twitter'>('instagram')
  const [copied, setCopied] = useState(false)

  const { instagram, twitter } = generateArticleCaption({ title, slug, content, categoryName })
  const text = tab === 'instagram' ? instagram : twitter

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="mt-8 bg-white dark:bg-neutral-900 rounded-xl border border-slate-100 dark:border-neutral-900 p-5">
      <h3 className="font-bold text-neutral-900 dark:text-white">📱 Sosyal Medya Paylaşım Metni</h3>
      <p className="mt-1 text-xs text-neutral-500">Gerçek yazı içeriğinden otomatik üretildi, kopyalayıp doğrudan paylaşabilirsin.</p>

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => setTab('instagram')}
          className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${tab === 'instagram' ? 'bg-sky-600 text-white' : 'bg-slate-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'}`}
        >
          Instagram
        </button>
        <button
          type="button"
          onClick={() => setTab('twitter')}
          className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${tab === 'twitter' ? 'bg-sky-600 text-white' : 'bg-slate-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'}`}
        >
          X / Twitter
        </button>
      </div>

      <textarea
        readOnly
        value={text}
        rows={8}
        className="mt-3 w-full rounded-lg border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 p-3 text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed resize-none"
      />

      <button
        type="button"
        onClick={handleCopy}
        className="mt-3 rounded-lg bg-sky-600 px-4 py-2 text-xs font-semibold text-white hover:bg-sky-500 transition-colors"
      >
        {copied ? 'Kopyalandı!' : 'Metni Kopyala'}
      </button>
    </div>
  )
}
