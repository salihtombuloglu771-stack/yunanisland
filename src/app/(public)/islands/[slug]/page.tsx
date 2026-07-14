export default async function IslandPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <p className="text-sm text-neutral-500">Ada sayfası şablonu</p>
      <h1 className="text-3xl font-bold mt-1">{slug}</h1>
      <p className="mt-4 text-neutral-500">Bu sayfa henüz tasarlanmadı — altyapı kurulum aşamasında.</p>
    </main>
  )
}
