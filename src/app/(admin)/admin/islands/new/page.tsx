import { IslandForm } from '@/components/admin/IslandForm'

export default function NewIslandPage() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-8">Yeni Ada Ekle</h1>
      <IslandForm />
    </main>
  )
}
