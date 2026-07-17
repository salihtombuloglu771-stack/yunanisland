export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 rounded-full border-4 border-sky-200 dark:border-neutral-800 border-t-sky-600 dark:border-t-sky-400 animate-spin" />
        <span className="text-sm text-neutral-400">Yükleniyor...</span>
      </div>
    </div>
  )
}
