'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useLanguage } from '@/lib/i18n/LanguageProvider'

type EntityType = 'island' | 'beach' | 'restaurant' | 'hotel' | 'attraction'

export function TripNoteBox({ entityType, entityId }: { entityType: EntityType; entityId: string }) {
  const { locale } = useLanguage()
  const [userId, setUserId] = useState<string | null>(null)
  const [noteId, setNoteId] = useState<string | null>(null)
  const [note, setNote] = useState('')
  const [visitedAt, setVisitedAt] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    let isMounted = true
    const supabase = createClient()

    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!isMounted) return
      setUserId(user?.id ?? null)

      if (user) {
        const { data } = await supabase
          .from('trip_notes')
          .select('id, note, visited_at')
          .eq('user_id', user.id)
          .eq('entity_type', entityType)
          .eq('entity_id', entityId)
          .maybeSingle()
        if (isMounted && data) {
          setNoteId(data.id)
          setNote(data.note ?? '')
          setVisitedAt(data.visited_at ?? '')
        }
      }
      if (isMounted) setLoading(false)
    }
    load()

    return () => { isMounted = false }
  }, [entityType, entityId])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!userId) return
    setSaving(true)
    setSaved(false)

    const supabase = createClient()
    const { data } = await supabase
      .from('trip_notes')
      .upsert(
        {
          user_id: userId,
          entity_type: entityType,
          entity_id: entityId,
          note: note.trim() || null,
          visited_at: visitedAt || null,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'user_id,entity_type,entity_id' }
      )
      .select('id')
      .single()

    if (data) setNoteId(data.id)
    setSaving(false)
    setSaved(true)
  }

  const handleDelete = async () => {
    if (!userId || !noteId) return
    const supabase = createClient()
    await supabase.from('trip_notes').delete().eq('id', noteId)
    setNoteId(null)
    setNote('')
    setVisitedAt('')
    setSaved(false)
  }

  if (loading) return null

  const t = {
    title: locale === 'en' ? '📝 Personal Trip Note' : locale === 'el' ? '📝 Προσωπική Σημείωση Ταξιδιού' : '📝 Kişisel Seyahat Notu',
    titlePrivate: locale === 'en' ? '📝 Personal Trip Note (visible only to you)' : locale === 'el' ? '📝 Προσωπική Σημείωση Ταξιδιού (ορατή μόνο σε εσάς)' : '📝 Kişisel Seyahat Notu (sadece sen görürsün)',
    notePlaceholder: locale === 'en' ? 'Take a note: where I parked, the best time to go, things to watch out for...' : locale === 'el' ? 'Κρατήστε σημείωση: πού παρκάρισα, η καλύτερη ώρα, τι να προσέξω...' : 'Kendine not al: nereye park ettim, en iyi saat, dikkat edilecek şeyler...',
    visitDate: locale === 'en' ? 'Visit date:' : locale === 'el' ? 'Ημερομηνία επίσκεψης:' : 'Ziyaret tarihi:',
    saving: locale === 'en' ? 'Saving...' : locale === 'el' ? 'Αποθήκευση...' : 'Kaydediliyor...',
    saveNote: locale === 'en' ? 'Save Note' : locale === 'el' ? 'Αποθήκευση Σημείωσης' : 'Notu Kaydet',
    deleteNote: locale === 'en' ? 'Delete Note' : locale === 'el' ? 'Διαγραφή Σημείωσης' : 'Notu Sil',
    saved: locale === 'en' ? '✓ Saved' : locale === 'el' ? '✓ Αποθηκεύτηκε' : '✓ Kaydedildi',
  }

  if (!userId) {
    return (
      <div className="mt-8 bg-white dark:bg-neutral-900 p-5 rounded-2xl border border-slate-100 dark:border-neutral-900 shadow-sm">
        <h3 className="text-sm font-bold text-neutral-900 dark:text-white mb-1">{t.title}</h3>
        <p className="text-xs text-neutral-500">
          {locale === 'en' ? (
            <>To add a note and save your visit date, <a href="/login" className="text-sky-600 font-medium hover:underline">log in</a>. These notes are visible only to you.</>
          ) : locale === 'el' ? (
            <>Για να προσθέσετε σημείωση και να αποθηκεύσετε την ημερομηνία επίσκεψης, <a href="/login" className="text-sky-600 font-medium hover:underline">συνδεθείτε</a>. Αυτές οι σημειώσεις είναι ορατές μόνο σε εσάς.</>
          ) : (
            <>Not eklemek ve ziyaret tarihini kaydetmek için <a href="/login" className="text-sky-600 font-medium hover:underline">giriş yap</a>. Bu notlar sadece sana görünür.</>
          )}
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSave} className="mt-8 bg-white dark:bg-neutral-900 p-5 rounded-2xl border border-slate-100 dark:border-neutral-900 shadow-sm">
      <h3 className="text-sm font-bold text-neutral-900 dark:text-white mb-3">{t.titlePrivate}</h3>
      <textarea
        value={note}
        onChange={(e) => { setNote(e.target.value); setSaved(false) }}
        placeholder={t.notePlaceholder}
        rows={3}
        className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 px-4 py-2.5 text-sm outline-none focus:border-sky-500 transition-all"
      />
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <label className="text-xs text-neutral-500 dark:text-neutral-400 flex items-center gap-2">
          {t.visitDate}
          <input
            type="date"
            value={visitedAt}
            onChange={(e) => { setVisitedAt(e.target.value); setSaved(false) }}
            className="rounded-lg border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 px-2.5 py-1.5 text-xs outline-none focus:border-sky-500 transition-all"
          />
        </label>
        <button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-sky-600 px-4 py-2 text-xs font-semibold text-white hover:bg-sky-500 transition-colors disabled:opacity-50"
        >
          {saving ? t.saving : t.saveNote}
        </button>
        {noteId && (
          <button
            type="button"
            onClick={handleDelete}
            className="text-xs font-semibold text-red-500 hover:underline"
          >
            {t.deleteNote}
          </button>
        )}
        {saved && <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">{t.saved}</span>}
      </div>
    </form>
  )
}
