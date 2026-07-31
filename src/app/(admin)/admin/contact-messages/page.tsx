import { createClient } from '@/lib/supabase/server'
import { ContactMessageStatusSelect } from '@/components/admin/ContactMessageStatusSelect'

export default async function ContactMessagesPage() {
  const supabase = await createClient()
  const { data: messages } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">İletişim Mesajları</h1>
      <p className="mt-1 text-sm text-neutral-500">{messages?.length ?? 0} mesaj</p>

      <div className="mt-8 space-y-4">
        {(messages ?? []).map((msg) => (
          <div key={msg.id} className="bg-white dark:bg-neutral-900 rounded-2xl border border-slate-100 dark:border-neutral-900 shadow-sm p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-bold text-neutral-900 dark:text-white">{msg.name}</p>
                <p className="text-sm text-neutral-500">
                  <a href={`mailto:${msg.email}`} className="text-sky-600 hover:underline">{msg.email}</a>
                </p>
              </div>
              <ContactMessageStatusSelect id={msg.id} status={msg.status} />
            </div>
            <div className="mt-3 flex flex-wrap gap-2 text-xs text-neutral-500">
              {msg.subject && <span className="bg-slate-100 dark:bg-neutral-800 rounded-lg px-2 py-1">{msg.subject}</span>}
              <span className="bg-slate-100 dark:bg-neutral-800 rounded-lg px-2 py-1">{new Date(msg.created_at).toLocaleDateString('tr-TR')}</span>
            </div>
            <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400 whitespace-pre-wrap">{msg.message}</p>
          </div>
        ))}

        {(!messages || messages.length === 0) && (
          <p className="text-sm text-neutral-500">Henüz iletişim mesajı yok.</p>
        )}
      </div>
    </main>
  )
}
