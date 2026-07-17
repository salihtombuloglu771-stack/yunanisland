'use client'

import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'))
  }, [])

  const toggle = () => {
    const next = !isDark
    setIsDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  return (
    <button
      onClick={toggle}
      aria-label="Tema değiştir"
      className="text-xs font-bold text-neutral-500 dark:text-neutral-400 hover:text-sky-600 dark:hover:text-sky-400 border border-slate-200 dark:border-neutral-800 rounded-lg px-2 py-1 transition-colors"
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  )
}
