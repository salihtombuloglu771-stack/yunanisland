import { FerryRouteForm } from '@/components/admin/FerryRouteForm'

export default function NewFerryRoutePage() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-8">Yeni Feribot Rotası Ekle</h1>
      <FerryRouteForm />
    </main>
  )
}
