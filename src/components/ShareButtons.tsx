'use client'

import { useState } from 'react'

interface ShareButtonsProps {
  url: string
  title: string
}

export function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const links = [
    {
      label: 'WhatsApp',
      emoji: '💬',
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    },
    {
      label: 'Facebook',
      emoji: '📘',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      label: 'X',
      emoji: '🐦',
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    },
  ]

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex items-center gap-2">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          title={`${link.label}'da paylaş`}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 dark:bg-neutral-900/90 backdrop-blur border border-slate-200 dark:border-neutral-800 text-base shadow-sm hover:scale-110 transition-transform"
        >
          {link.emoji}
        </a>
      ))}
      <button
        type="button"
        onClick={handleCopy}
        title="Linki kopyala"
        className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 dark:bg-neutral-900/90 backdrop-blur border border-slate-200 dark:border-neutral-800 text-base shadow-sm hover:scale-110 transition-transform"
      >
        {copied ? '✅' : '🔗'}
      </button>
    </div>
  )
}
