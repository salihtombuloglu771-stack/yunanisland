import { createClient } from '@/lib/supabase/server'
import { AdInquiryStatusSelect } from '@/components/admin/AdInquiryStatusSelect'

export default async function AdInquiriesPage() {
  const supabase = await createClient()
  const { data: inquiries } = await supabase
    .from('ad_inquiries')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Reklam Talepleri</h1>
      <p className="mt-1 text-sm text-neutral-500">{inquiries?.length ?? 0} talep</p>

      <div className="mt-8 space-y-4">
        {(inquiries ?? []).map((inq) => (
          <div key={inq.id} className="bg-white dark:bg-neutral-900 rounded-2xl border border-slate-100 dark:border-neutral-900 shadow-sm p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-bold text-neutral-900 dark:text-white">{inq.company_name}</p>
                <p className="text-sm text-neutral-500">{inq.contact_name} · <a href={`mailto:${inq.email}`} className="text-sky-600 hover:underline">{inq.email}</a>{inq.phone && ` · ${inq.phone}`}</p>
              </div>
              <AdInquiryStatusSelect id={inq.id} status={inq.status} />
            </div>
            <div className="mt-3 flex flex-wrap gap-2 text-xs text-neutral-500">
              {inq.placement_interest && <span className="bg-slate-100 dark:bg-neutral-800 rounded-lg px-2 py-1">{inq.placement_interest}</span>}
              {inq.budget_range && <span className="bg-slate-100 dark:bg-neutral-800 rounded-lg px-2 py-1">💰 {inq.budget_range}</span>}
              <span className="bg-slate-100 dark:bg-neutral-800 rounded-lg px-2 py-1">{new Date(inq.created_at).toLocaleDateString('tr-TR')}</span>
            </div>
            {inq.message && <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">{inq.message}</p>}
          </div>
        ))}

        {(!inquiries || inquiries.length === 0) && (
          <p className="text-sm text-neutral-500">Henüz reklam talebi yok.</p>
        )}
      </div>
    </main>
  )
}
