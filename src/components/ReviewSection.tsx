'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

type EntityType = 'island' | 'beach' | 'restaurant' | 'hotel'

interface Review {
  id: string
  rating: number
  comment: string | null
  created_at: string
  user_id: string
  users: { full_name: string | null } | null
}

export function ReviewSection({ entityType, entityId }: { entityType: EntityType; entityId: string }) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [userId, setUserId] = useState<string | null>(null)
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)

  const load = async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    setUserId(user?.id ?? null)

    const { data } = await supabase
      .from('reviews')
      .select('id, rating, comment, created_at, user_id, users(full_name)')
      .eq('entity_type', entityType)
      .eq('entity_id', entityId)
      .order('created_at', { ascending: false })

    setReviews((data as unknown as Review[]) ?? [])
    setLoading(false)
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entityType, entityId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!userId) return
    setSubmitting(true)

    const supabase = createClient()
    await supabase.from('reviews').insert({
      user_id: userId,
      entity_type: entityType,
      entity_id: entityId,
      rating,
      comment: comment.trim() || null,
    })

    setComment('')
    setRating(5)
    setSubmitting(false)
    await load()
  }

  const average = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : null

  return (
    <div className="mt-8">
      <div className="flex items-center gap-3 mb-4">
        <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Yorumlar & Değerlendirmeler</h3>
        {average && (
          <span className="text-sm font-semibold text-amber-500">⭐ {average} ({reviews.length})</span>
        )}
      </div>

      {userId ? (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-neutral-900 p-5 rounded-2xl border border-slate-100 dark:border-neutral-900 shadow-sm mb-6">
          <div className="flex items-center gap-1 mb-3">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                type="button"
                key={n}
                onClick={() => setRating(n)}
                className={`text-2xl ${n <= rating ? 'opacity-100' : 'opacity-30'}`}
                aria-label={`${n} yıldız`}
              >
                ⭐
              </button>
            ))}
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Deneyimini paylaş..."
            rows={3}
            className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 px-4 py-2.5 text-sm outline-none focus:border-sky-500 transition-all"
          />
          <button
            type="submit"
            disabled={submitting}
            className="mt-3 rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-500 transition-colors disabled:opacity-50"
          >
            {submitting ? 'Gönderiliyor...' : 'Yorum Yap'}
          </button>
        </form>
      ) : (
        <p className="text-sm text-neutral-500 mb-6">
          Yorum yapmak için <a href="/login" className="text-sky-600 font-medium hover:underline">giriş yap</a>.
        </p>
      )}

      {!loading && reviews.length === 0 && (
        <p className="text-sm text-neutral-500">Henüz yorum yapılmamış. İlk yorumu sen yaz!</p>
      )}

      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white dark:bg-neutral-900 p-4 rounded-xl border border-slate-100 dark:border-neutral-900">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                {review.users?.full_name || 'Bir gezgin'}
              </span>
              <span className="text-xs text-amber-500">{'⭐'.repeat(review.rating)}</span>
            </div>
            {review.comment && (
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">{review.comment}</p>
            )}
            <p className="mt-2 text-xs text-neutral-400">
              {new Date(review.created_at).toLocaleDateString('tr-TR')}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
