import Link from 'next/link'
import { JsonLd } from '@/components/JsonLd'

export interface Crumb { label: string; href?: string }

export function Breadcrumbs({ items, baseUrl }: { items: Crumb[]; baseUrl: string }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `${baseUrl}${item.href}` } : {}),
    })),
  }

  return (
    <>
      <JsonLd data={jsonLd} />
      <nav aria-label="breadcrumb" className="text-xs text-neutral-400 mb-4 flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-1.5">
            {i > 0 && <span>/</span>}
            {item.href ? (
              <Link href={item.href} className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-neutral-600 dark:text-neutral-300">{item.label}</span>
            )}
          </span>
        ))}
      </nav>
    </>
  )
}
