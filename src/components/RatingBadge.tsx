export function RatingBadge({ avgRating, reviewCount }: { avgRating: number | null | undefined; reviewCount: number | undefined }) {
  if (!avgRating || !reviewCount) return null

  return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 dark:text-amber-400">
      ⭐ {avgRating.toFixed(1)} <span className="text-neutral-400 font-normal">({reviewCount})</span>
    </span>
  )
}
