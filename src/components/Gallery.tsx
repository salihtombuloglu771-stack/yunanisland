export interface MediaItem {
  id: string
  url: string
  media_type: 'photo' | 'video' | 'drone'
}

const TYPE_LABELS: Record<MediaItem['media_type'], string> = {
  photo: '📸 Fotoğraf',
  video: '🎥 Video',
  drone: '🚁 Drone Görüntüsü',
}

export function Gallery({ items }: { items: MediaItem[] }) {
  if (items.length === 0) {
    return (
      <div className="py-12 text-center bg-white dark:bg-neutral-900 border border-slate-100 dark:border-neutral-900 rounded-2xl">
        <span className="text-3xl">📸</span>
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">Henüz galeri içeriği eklenmedi.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {items.map((item) =>
        item.media_type === 'photo' ? (
          <div key={item.id} className="relative aspect-square rounded-xl overflow-hidden bg-slate-100 dark:bg-neutral-800">
            {/* eslint-disable-next-line @next/next/no-img-element -- admin-entered URLs can be any external host, avoids next/image remotePatterns allowlist */}
            <img src={item.url} alt="Galeri fotoğrafı" className="absolute inset-0 h-full w-full object-cover" />
          </div>
        ) : (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex aspect-square items-center justify-center rounded-xl bg-slate-100 dark:bg-neutral-800 text-center text-xs font-semibold text-neutral-600 dark:text-neutral-300 p-3 hover:bg-slate-200 dark:hover:bg-neutral-700 transition-colors"
          >
            {TYPE_LABELS[item.media_type]} — İzle ↗
          </a>
        )
      )}
    </div>
  )
}
