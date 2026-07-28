'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useLanguage } from '@/lib/i18n/LanguageProvider'
import { ThemeToggle } from '@/components/ThemeToggle'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { HeaderSearch } from '@/components/HeaderSearch'

export function Header() {
  const router = useRouter()
  const { t } = useLanguage()
  const [email, setEmail] = useState<string | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [toolsOpen, setToolsOpen] = useState(false)

  const toolLinks = [
    { href: '/ferry-guide', label: t('nav.ferryGuide') },
    { href: '/budget-calculator', label: t('nav.budgetCalculator') },
    { href: '/trip-tools', label: t('nav.tripTools') },
    { href: '/compare', label: t('nav.compare') },
  ]

  useEffect(() => {
    const supabase = createClient()

    const loadUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setEmail(user?.email ?? null)
      if (user) {
        const { data: profile } = await supabase.from('users').select('role').eq('id', user.id).single()
        setIsAdmin(profile?.role === 'admin')
      } else {
        setIsAdmin(false)
      }
    }
    loadUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => loadUser())
    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 dark:border-neutral-900 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-sky-600 dark:text-sky-400">
          <span>🏝️</span>
          <span>Yunanisland</span>
        </Link>

        <nav className="hidden xl:flex items-center gap-7">
          <Link href="/" className="text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
            {t('nav.home')}
          </Link>
          <Link href="/blog" className="text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
            {t('nav.blog')}
          </Link>
          <Link href="/gezi-hikayeleri" className="text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
            {t('nav.stories')}
          </Link>
          <Link href="/map" className="text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
            {t('nav.map')}
          </Link>
          <Link href="/events" className="text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
            {t('nav.events')}
          </Link>

          <div className="relative">
            <button
              onClick={() => setToolsOpen((v) => !v)}
              onBlur={() => setTimeout(() => setToolsOpen(false), 150)}
              className="flex items-center gap-1 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
            >
              {t('nav.tools')}
              <svg className={`h-3.5 w-3.5 transition-transform ${toolsOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {toolsOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-xl shadow-lg overflow-hidden z-50">
                {toolLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-2.5 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:bg-slate-50 dark:hover:bg-neutral-800 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {isAdmin && (
            <Link href="/admin/dashboard" className="text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
              {t('nav.admin')}
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center">
            <HeaderSearch />
          </div>
          <ThemeToggle />
          <LanguageSwitcher />
          {email ? (
            <div className="hidden sm:flex items-center gap-4">
              <Link href="/account" className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 hover:text-sky-600 transition-colors">
                {t('nav.account')}
              </Link>
              <button
                onClick={handleLogout}
                className="rounded-xl bg-slate-100 dark:bg-neutral-800 px-4 py-2 text-sm font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-slate-200 dark:hover:bg-neutral-700 transition-colors"
              >
                {t('nav.logout')}
              </button>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-4">
              <Link href="/login" className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 hover:text-sky-600 transition-colors">
                {t('nav.login')}
              </Link>
              <Link href="/register" className="rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-sky-500 transition-all hover:shadow-sky-500/10">
                {t('nav.register')}
              </Link>
            </div>
          )}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="xl:hidden text-neutral-600 dark:text-neutral-300"
            aria-label="Menü"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="xl:hidden border-t border-slate-100 dark:border-neutral-900 px-6 py-4 space-y-3 bg-white dark:bg-neutral-950">
          <Link href="/" className="block text-sm font-medium text-neutral-600 dark:text-neutral-400">{t('nav.home')}</Link>
          <Link href="/ferry-guide" className="block text-sm font-medium text-neutral-600 dark:text-neutral-400">{t('nav.ferryGuide')}</Link>
          <Link href="/blog" className="block text-sm font-medium text-neutral-600 dark:text-neutral-400">{t('nav.blog')}</Link>
          <Link href="/budget-calculator" className="block text-sm font-medium text-neutral-600 dark:text-neutral-400">{t('nav.budgetCalculator')}</Link>
          <Link href="/trip-tools" className="block text-sm font-medium text-neutral-600 dark:text-neutral-400">{t('nav.tripTools')}</Link>
          <Link href="/map" className="block text-sm font-medium text-neutral-600 dark:text-neutral-400">{t('nav.map')}</Link>
          <Link href="/compare" className="block text-sm font-medium text-neutral-600 dark:text-neutral-400">{t('nav.compare')}</Link>
          <Link href="/events" className="block text-sm font-medium text-neutral-600 dark:text-neutral-400">{t('nav.events')}</Link>
          <Link href="/gezi-hikayeleri" className="block text-sm font-medium text-neutral-600 dark:text-neutral-400">{t('nav.stories')}</Link>
          <Link href="/search" className="block text-sm font-medium text-neutral-600 dark:text-neutral-400">{t('nav.search')}</Link>
          {isAdmin && <Link href="/admin/dashboard" className="block text-sm font-medium text-neutral-600 dark:text-neutral-400">{t('nav.admin')}</Link>}
          <div className="pt-3 border-t border-slate-100 dark:border-neutral-900">
            {email ? (
              <div className="flex items-center gap-4">
                <Link href="/account" className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">{t('nav.account')}</Link>
                <button onClick={handleLogout} className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">{t('nav.logout')}</button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link href="/login" className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">{t('nav.login')}</Link>
                <Link href="/register" className="text-sm font-semibold text-sky-600">{t('nav.register')}</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
