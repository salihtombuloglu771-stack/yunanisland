'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

type Item = { href: string; label: string; icon: string }
type Group = { title: string | null; items: Item[] }

const NAV: Group[] = [
  {
    title: null,
    items: [{ href: '/admin/dashboard', label: 'Panel', icon: '📊' }],
  },
  {
    title: 'İçerik',
    items: [
      { href: '/admin/islands', label: 'Adalar', icon: '🏝️' },
      { href: '/admin/beaches', label: 'Plajlar', icon: '🏖️' },
      { href: '/admin/restaurants', label: 'Restoranlar', icon: '🍽️' },
      { href: '/admin/hotels', label: 'Oteller', icon: '🏨' },
      { href: '/admin/attractions', label: 'Gezilecek Yerler', icon: '📍' },
      { href: '/admin/ferry-routes', label: 'Feribot Rotaları', icon: '🚢' },
      { href: '/admin/events', label: 'Etkinlikler', icon: '📅' },
      { href: '/admin/articles', label: 'Blog Yazıları', icon: '📝' },
    ],
  },
  {
    title: 'Topluluk',
    items: [
      { href: '/admin/reviews', label: 'Yorumlar', icon: '⭐' },
      { href: '/admin/travel-stories', label: 'Gezi Hikayeleri', icon: '📖' },
      { href: '/admin/media-review', label: 'Fotoğraf Onayı', icon: '🖼️' },
      { href: '/admin/users', label: 'Kullanıcılar', icon: '👤' },
    ],
  },
  {
    title: 'Pazarlama',
    items: [
      { href: '/admin/advertisements', label: 'Reklamlar', icon: '📢' },
      { href: '/admin/ad-inquiries', label: 'Reklam Talepleri', icon: '📬' },
      { href: '/admin/newsletter', label: 'Bülten', icon: '📧' },
    ],
  },
  {
    title: 'Gelen Kutusu',
    items: [
      { href: '/admin/contact-messages', label: 'İletişim Mesajları', icon: '✉️' },
      { href: '/admin/content-reports', label: 'Hata Bildirimleri', icon: '⚠️' },
    ],
  },
  {
    title: 'Raporlar',
    items: [{ href: '/admin/analytics', label: 'Analitik', icon: '📈' }],
  },
]

function isActive(pathname: string, href: string): boolean {
  if (href === '/admin/dashboard') return pathname === '/admin' || pathname === '/admin/dashboard'
  return pathname === href || pathname.startsWith(href + '/')
}

export default function AdminShell({
  children,
  userEmail,
}: {
  children: React.ReactNode
  userEmail: string | null
}) {
  const pathname = usePathname() || ''
  const router = useRouter()
  const [open, setOpen] = useState(false)

  async function handleLogout() {
    try {
      const supabase = createClient()
      await supabase.auth.signOut()
    } finally {
      router.push('/login')
      router.refresh()
    }
  }

  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-neutral-950 text-slate-800 dark:text-slate-200">
      {/* Mobil karartma */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      )}

      {/* Kenar menü (sidebar) */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 flex flex-col bg-[#0c2b3f] text-slate-300 shadow-xl transition-transform duration-200 lg:static lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Marka */}
        <div className="flex h-16 items-center gap-2 bg-[#09212f] px-5 shrink-0">
          <span className="text-xl">🏝️</span>
          <span className="text-lg font-bold tracking-wide text-white">
            Yunan<span className="text-sky-400">island</span>
          </span>
        </div>

        {/* Menü */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {NAV.map((group, gi) => (
            <div key={gi} className="mb-4">
              {group.title && (
                <p className="px-3 pb-1.5 pt-2 text-[11px] font-semibold uppercase tracking-wider text-sky-200/40">
                  {group.title}
                </p>
              )}
              <ul className="space-y-0.5">
                {group.items.map((item) => {
                  const active = isActive(pathname, item.href)
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                          active
                            ? 'bg-sky-600 text-white shadow-sm'
                            : 'text-slate-300 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <span className="text-base leading-none">{item.icon}</span>
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className="border-t border-white/10 px-5 py-3 text-[11px] text-slate-400 shrink-0">
          Yunanisland Yönetim © {new Date().getFullYear()}
        </div>
      </aside>

      {/* Sağ taraf: üst bar + içerik */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Üst bar (navbar) */}
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-slate-200 bg-white px-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden dark:text-slate-300 dark:hover:bg-neutral-800"
            aria-label="Menü"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          <div className="ml-auto flex items-center gap-2 sm:gap-4">
            <Link
              href="/"
              target="_blank"
              className="hidden items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100 sm:flex dark:text-slate-300 dark:hover:bg-neutral-800"
            >
              🌐 Siteyi Gör
            </Link>
            {userEmail && (
              <span className="hidden max-w-[180px] truncate text-sm text-slate-500 md:inline dark:text-slate-400">
                {userEmail}
              </span>
            )}
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-200 dark:bg-neutral-800 dark:text-slate-200 dark:hover:bg-neutral-700"
            >
              Çıkış
            </button>
          </div>
        </header>

        {/* İçerik */}
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </div>
  )
}
