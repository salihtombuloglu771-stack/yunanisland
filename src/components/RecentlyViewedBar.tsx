'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getRecentlyViewed, recentItemHref, RECENT_TYPE_EMOJI, type RecentItem } from '@/lib/useRecentlyViewed'

export function RecentlyViewedBar() {
  const [items, setItems] = useState<RecentItem[]>([])

  useEffect(() => {
    setItems(getRecentlyViewed())
  }, [])

  if (items.length === 0) return null

  return (
    <div className="mb-8">
      <h3 className="text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-3 flex items-center gap-2">
        🕘 Son Baktıkların
      </h3>
      <div className="flex gap-3 overflow-x-auto pb-1">
        {items.map((item) => (
          <Link
            key={`${item.type}-${item.id}`}
            href={recentItemHref(item)}
            className="flex-none flex items-center gap-2 bg-white dark:bg-neutral-900 border border-slate-100 dark:border-neutral-900 rounded-xl px-4 py-2.5 shadow-sm hover:shadow-md transition-all whitespace-nowrap"
          >
            <span>{RECENT_TYPE_EMOJI[item.type]}</span>
            <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
