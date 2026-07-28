'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useLanguage } from '@/lib/i18n/LanguageProvider'

interface Suggestion {
  type: 'island' | 'beach' | 'restaurant' | 'hotel' | 'attraction'
  id: string
  name: string
  href: string
}

const TYPE_EMOJI: Record<Suggestion['type'], string> = {
  island: '🏝️',
  beach: '🏖️',
  restaurant: '🍽️',
  hotel: '🏨',
  attraction: '📍',
}

export function HeaderSearch() {
  const router = useRouter()
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const term = query.trim()
    if (term.length < 2) {
      setSuggestions([])
      return
    }
    const handle = setTimeout(async () => {
      const supabase = createClient()
      const ilikeTerm = `%${term}%`
      const [islandsRes, beachesRes, restaurantsRes, hotelsRes, attractionsRes] = await Promise.all([
        supabase.from('islands').select('id, name, slug').ilike('name', ilikeTerm).limit(3),
        supabase.from('beaches').select('id, name, slug').ilike('name', ilikeTerm).limit(3),
        supabase.from('restaurants').select('id, name, slug').ilike('name', ilikeTerm).limit(3),
        supabase.from('hotels').select('id, name, slug').ilike('name', ilikeTerm).limit(3),
        supabase.from('attractions').select('id, name, slug').ilike('name', ilikeTerm).limit(3),
      ])

      const combined: Suggestion[] = [
        ...(islandsRes.data ?? []).map((i) => ({ type: 'island' as const, id: i.id, name: i.name, href: `/islands/${i.slug}` })),
        ...(beachesRes.data ?? []).map((b) => ({ type: 'beach' as const, id: b.id, name: b.name, href: `/beaches/${b.slug}` })),
        ...(restaurantsRes.data ?? []).map((r) => ({ type: 'restaurant' as const, id: r.id, name: r.name, href: `/restaurants/${r.slug}` })),
        ...(hotelsRes.data ?? []).map((h) => ({ type: 'hotel' as const, id: h.id, name: h.name, href: `/hotels/${h.slug}` })),
        ...(attractionsRes.data ?? []).map((a) => ({ type: 'attraction' as const, id: a.id, name: a.name, href: `/attractions/${a.slug}` })),
      ].slice(0, 8)

      setSuggestions(combined)
    }, 300)
    return () => clearTimeout(handle)
  }, [query])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return
    router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    setOpen(false)
    setShowSuggestions(false)
    setQuery('')
  }

  const handleSuggestionClick = (href: string) => {
    setShowSuggestions(false)
    setOpen(false)
    setQuery('')
    router.push(href)
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        aria-label={t('nav.search')}
        className="text-neutral-500 dark:text-neutral-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    )
  }

  return (
    <div className="relative" ref={containerRef}>
      <form onSubmit={handleSubmit} className="flex items-center">
        <input
          autoFocus
          value={query}
          onChange={(e) => { setQuery(e.target.value); setShowSuggestions(true) }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => { if (!query) setOpen(false) }}
          placeholder={t('nav.search')}
          className="w-48 rounded-lg border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-1.5 px-3 text-sm outline-none focus:border-sky-500 transition-all"
        />
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute right-0 mt-1.5 w-72 bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-xl shadow-lg overflow-hidden z-50">
          {suggestions.map((s) => (
            <button
              key={`${s.type}-${s.id}`}
              type="button"
              onMouseDown={() => handleSuggestionClick(s.href)}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-left text-sm hover:bg-slate-50 dark:hover:bg-neutral-800 transition-colors"
            >
              <span>{TYPE_EMOJI[s.type]}</span>
              <span className="text-neutral-700 dark:text-neutral-300 truncate">{s.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
