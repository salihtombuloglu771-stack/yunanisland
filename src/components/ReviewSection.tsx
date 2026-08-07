'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useLanguage } from '@/lib/i18n/LanguageProvider'

type EntityType = 'island' | 'beach' | 'restaurant' | 'hotel' | 'attraction'
type SortOption = 'newest' | 'highest' | 'lowest'

interface Review {
  id: string
  rating: number
  comment: string | null
  image_url: string | null
  created_at: string
  user_id: string
  users: { full_name: string | null } | null
}

const PAGE_SIZE = 10

export function ReviewSection({ entityType, entityId }: { entityType: EntityType; entityId: string }) {
  const { locale } = useLanguage()
  const [reviews, setReviews] = useState<Review[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [averageRating, setAverageRating] = useState<number | null>(null)
  const [sort, setSort] = useState<SortOption>('newest')
  const [userId, setUserId] = useState<string | null>(null)
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)

  const orderBy: Record<SortOption, { column: string; ascending: boolean }> = {
    newest: { column: 'created_at', ascending: false },
    highest: { column: 'rating', ascending: false },
    lowest: { column: 'rating', ascending: true },
  }

  const loadPage = async (from: number) => {
    const supabase = createClient()
    const { column, ascending } = orderBy[sort]
    const { data, count } = await supabase
      .from('reviews')
      .select('id, rating, comment, image_url, created_at, user_id, users(full_name)', { count: 'exact' })
      .eq('entity_type', entityType)
      .eq('entity_id', entityId)
      .order(column, { ascending })
      .range(from, from + PAGE_SIZE - 1)

    if (from === 0) {
      setReviews((data as unknown as Review[]) ?? [])
    } else {
      setReviews((prev) => [...prev, ...((data as unknown as Review[]) ?? [])])
    }
    setTotalCount(count ?? 0)
  }

  const loadAverage = async () => {
    const supabase = createClient()
    const { data } = await supabase
      .from('reviews')
      .select('rating')
      .eq('entity_type', entityType)
      .eq('entity_id', entityId)

    const ratings = data ?? []
    setAverageRating(ratings.length ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length : null)
  }

  const load = async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    setUserId(user?.id ?? null)
    await Promise.all([loadPage(0), loadAverage()])
    setLoading(false)
  }

  const handleLoadMore = async () => {
    setLoadingMore(true)
    await loadPage(reviews.length)
    setLoadingMore(false)
  }

  useEffect(() => {
    setLoading(true)
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entityType, entityId, sort])

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
      image_url: imageUrl.trim() || null,
    })

    setComment('')
    setRating(5)
    setImageUrl('')
    setSubmitting(false)
    await load()
  }

  const t = {
    title: locale === 'en' ? 'Reviews & Ratings' : locale === 'el' ? 'Κριτικές & Βαθμολογίες' : 'Yorumlar & Değerlendirmeler',
    star: locale === 'en' ? 'star' : locale === 'el' ? 'αστέρι' : 'yıldız',
    sharePlaceholder: locale === 'en' ? 'Share your experience...' : locale === 'el' ? 'Μοιραστείτε την εμπειρία σας...' : 'Deneyimini paylaş...',
    photoLinkPlaceholder: locale === 'en' ? 'Photo link (optional)' : locale === 'el' ? 'Σύνδεσμος φωτογραφίας (προαιρετικό)' : 'Fotoğraf bağlantısı (isteğe bağlı)',
    sending: locale === 'en' ? 'Sending...' : locale === 'el' ? 'Αποστολή...' : 'Gönderiliyor...',
    submit: locale === 'en' ? 'Post Review' : locale === 'el' ? 'Δημοσίευση Κριτικής' : 'Yorum Yap',
    empty: locale === 'en' ? 'No reviews yet. Be the first to write one!' : locale === 'el' ? 'Δεν υπάρχουν ακόμη κριτικές. Γράψτε την πρώτη!' : 'Henüz yorum yapılmamış. İlk yorumu sen yaz!',
    photoAlt: locale === 'en' ? 'Review photo' : locale === 'el' ? 'Φωτογραφία κριτικής' : 'Yorum fotoğrafı',
    sortNewest: locale === 'en' ? 'Newest' : locale === 'el' ? 'Νεότερα' : 'En Yeni',
    sortHighest: locale === 'en' ? 'Highest rated' : locale === 'el' ? 'Υψηλότερη βαθμολογία' : 'En Yüksek Puan',
    sortLowest: locale === 'en' ? 'Lowest rated' : locale === 'el' ? 'Χαμηλότερη βαθμολογία' : 'En Düşük Puan',
    loadMore: locale === 'en' ? 'Load more reviews' : locale === 'el' ? 'Φόρτωση περισσότερων κριτικών' : 'Daha Fazla Yorum Göster',
    loadingMore: locale === 'en' ? 'Loading...' : locale === 'el' ? 'Φόρτωση...' : 'Yükleniyor...',
  }

  return (
    <div className="mt-8">
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <h3 className="text-lg font-bold text-neutral-900 dark:text-white">{t.title}</h3>
        {averageRating !== null && (
          <span className="text-sm font-semibold text-amber-500">⭐ {averageRating.toFixed(1)} ({totalCount})</span>
        )}
        {totalCount > 1 && (
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="ml-auto rounded-lg border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 py-1.5 px-3 text-xs outline-none focus:border-sky-500"
          >
            <option value="newest">{t.sortNewest}</option>
            <option value="highest">{t.sortHighest}</option>
            <option value="lowest">{t.sortLowest}</option>
          </select>
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
                aria-label={`${n} ${t.star}`}
              >
                ⭐
              </button>
            ))}
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={t.sharePlaceholder}
            rows={3}
            className="w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 px-4 py-2.5 text-sm outline-none focus:border-sky-500 transition-all"
          />
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder={t.photoLinkPlaceholder}
            className="mt-2 w-full rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 px-4 py-2.5 text-sm outline-none focus:border-sky-500 transition-all"
          />
          <button
            type="submit"
            disabled={submitting}
            className="mt-3 rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-500 transition-colors disabled:opacity-50"
          >
            {submitting ? t.sending : t.submit}
          </button>
        </form>
      ) : (
        <p className="text-sm text-neutral-500 mb-6">
          {locale === 'en' ? (
            <>To post a review, <a href="/login" className="text-sky-600 font-medium hover:underline">log in</a>.</>
          ) : locale === 'el' ? (
            <>Για να αφήσετε κριτική, <a href="/login" className="text-sky-600 font-medium hover:underline">συνδεθείτε</a>.</>
          ) : (
            <>Yorum yapmak için <a href="/login" className="text-sky-600 font-medium hover:underline">giriş yap</a>.</>
          )}
        </p>
      )}

      {!loading && reviews.length === 0 && (
        <p className="text-sm text-neutral-500">{t.empty}</p>
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
            {review.image_url && (
              // eslint-disable-next-line @next/next/no-img-element -- kullanıcı URL'i herhangi bir dış domain olabilir
              <img
                src={review.image_url}
                alt={t.photoAlt}
                className="mt-2 max-h-64 rounded-lg border border-slate-100 dark:border-neutral-800 object-cover"
              />
            )}
            <p className="mt-2 text-xs text-neutral-400">
              {new Date(review.created_at).toLocaleDateString('tr-TR')}
            </p>
          </div>
        ))}
      </div>

      {reviews.length < totalCount && (
        <button
          onClick={handleLoadMore}
          disabled={loadingMore}
          className="mt-4 w-full rounded-xl border border-slate-200 dark:border-neutral-800 py-2.5 text-sm font-semibold text-neutral-600 dark:text-neutral-400 hover:bg-slate-50 dark:hover:bg-neutral-900 transition-colors disabled:opacity-50"
        >
          {loadingMore ? t.loadingMore : t.loadMore}
        </button>
      )}
    </div>
  )
}
