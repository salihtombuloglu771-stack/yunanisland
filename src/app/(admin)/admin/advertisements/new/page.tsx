import { AdvertisementForm } from '@/components/admin/AdvertisementForm'

export default function NewAdvertisementPage() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-8">Yeni Reklam Ekle</h1>
      <AdvertisementForm />
    </main>
  )
}
