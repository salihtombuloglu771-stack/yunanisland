'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useLanguage } from '@/lib/i18n/LanguageProvider'

type EntityType = 'island' | 'beach' | 'restaurant' | 'hotel' | 'attraction'

export function PhotoContribution({ entityType, entityId }: { entityType: EntityType; entityId: string }) {
  const { locale } = useLanguage()
  const [userId, setUserId] = useState<string | null>(null)
  const [url, setUrl] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    createClient().auth.getUser().then(({ data }) => setUserId(data.user?.id ?? null))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!userId || !url.trim()) return
    setSubmitting(true)

    const supabase = createClient()
    await supabase.from('media').insert({
      entity_type: entityType,
      entity_id: entityId,
      url: url.trim(),
      media_type: 'photo',
      submitted_by: userId,
      status: 'pending',
    })

    setUrl('')
    setSubmitting(false)
    setSent(true)
  }

  const t = {
    placeholder: locale === 'en' ? 'Add a link to your own photo...' : locale === 'el' ? 'Προσθέστε τον σύνδεσμο της δικής σας φωτογραφίας...' : 'Kendi fotoğrafının bağlantısını ekle...',
    sending: locale === 'en' ? 'Sending...' : locale === 'el' ? 'Αποστολή...' : 'Gönderiliyor...',
    sent: locale === 'en' ? 'Sent ✓' : locale === 'el' ? 'Στάλθηκε ✓' : 'Gönderildi ✓',
    submit: locale === 'en' ? 'Send Photo' : locale === 'el' ? 'Αποστολή Φωτογραφίας' : 'Fotoğraf Gönder',
    note: locale === 'en' ? 'It will appear in the gallery once approved.' : locale === 'el' ? 'Θα εμφανιστεί στη γκαλερί μετά την έγκριση.' : 'Onaylandıktan sonra galeride görünecek.',
  }

  if (!userId) {
    return (
      <p className="mt-4 text-sm text-neutral-500">
        {locale === 'en' ? (
          <>To add your own photo, <a href="/login" className="text-sky-600 font-medium hover:underline">log in</a>.</>
        ) : locale === 'el' ? (
          <>Για να προσθέσετε τη δική σας φωτογραφία, <a href="/login" className="text-sky-600 font-medium hover:underline">συνδεθείτε</a>.</>
        ) : (
          <>Kendi fotoğrafını eklemek için <a href="/login" className="text-sky-600 font-medium hover:underline">giriş yap</a>.</>
        )}
      </p>
    )
  }

  return (
    <div className="mt-4">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <input
          type="url"
          required
          value={url}
          onChange={(e) => { setUrl(e.target.value); setSent(false) }}
          placeholder={t.placeholder}
          className="flex-1 rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 px-4 py-2.5 text-sm outline-none focus:border-sky-500 transition-all"
        />
        <button
          type="submit"
          disabled={submitting}
          className="rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-sky-500 transition-colors disabled:opacity-50 whitespace-nowrap"
        >
          {submitting ? t.sending : sent ? t.sent : t.submit}
        </button>
      </form>
      <p className="mt-1.5 text-xs text-neutral-400">{t.note}</p>
    </div>
  )
}
