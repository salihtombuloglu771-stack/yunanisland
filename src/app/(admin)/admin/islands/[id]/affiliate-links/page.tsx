import { notFound } from 'next/navigation'
import { AffiliateLinkManager } from '@/components/admin/AffiliateLinkManager'
import { createClient } from '@/lib/supabase/server'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function IslandAffiliateLinksPage({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()

  const [{ data: island }, { data: links }] = await Promise.all([
    supabase.from('islands').select('id, name').eq('id', id).maybeSingle(),
    supabase.from('affiliate_links').select('id, provider, url, label').eq('entity_type', 'island').eq('entity_id', id),
  ])

  if (!island) notFound()

  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">{island.name} — Partner Linkleri</h1>
      <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-8">
        Araç kiralama, transfer, feribot, uçak bileti gibi partner/affiliate linklerini buradan ekle — ada sayfasında ilgili bölümde otomatik listelenir.
      </p>
      <AffiliateLinkManager entityType="island" entityId={island.id} initialItems={links ?? []} />
    </main>
  )
}
