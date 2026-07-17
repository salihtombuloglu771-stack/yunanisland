import { createClient } from '@/lib/supabase/server'

export async function AdBanner({ placement }: { placement: string }) {
  const supabase = await createClient()
  const nowIso = new Date().toISOString()

  const { data: ads } = await supabase
    .from('advertisements')
    .select('id, title, image_url, link_url')
    .eq('placement', placement)
    .eq('is_active', true)
    .or(`starts_at.is.null,starts_at.lte.${nowIso}`)
    .or(`ends_at.is.null,ends_at.gte.${nowIso}`)
    .limit(1)

  const ad = ads?.[0]
  if (!ad) return null

  const content = (
    <div className="flex items-center gap-4 bg-white dark:bg-neutral-900 border border-slate-100 dark:border-neutral-900 rounded-2xl p-4 shadow-sm">
      {ad.image_url && (
        // eslint-disable-next-line @next/next/no-img-element -- admin-entered arbitrary ad creative URL
        <img src={ad.image_url} alt={ad.title} className="h-14 w-14 rounded-xl object-cover flex-shrink-0" />
      )}
      <div>
        <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Sponsorlu</p>
        <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">{ad.title}</p>
      </div>
    </div>
  )

  return ad.link_url ? (
    <a href={ad.link_url} target="_blank" rel="noopener noreferrer sponsored" className="block mb-8">{content}</a>
  ) : (
    <div className="mb-8">{content}</div>
  )
}
