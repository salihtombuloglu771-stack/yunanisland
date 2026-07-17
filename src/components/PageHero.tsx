import Image from 'next/image'

export function PageHero({ image, badge, title, subtitle }: { image: string; badge: string; title: string; subtitle: string }) {
  return (
    <section className="relative overflow-hidden bg-slate-900 py-16 text-white dark:bg-black">
      <Image src={image} alt="" fill priority className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/55 via-slate-950/35 to-slate-950/95" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,165,233,0.15),rgba(255,255,255,0))]" />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <span className="inline-flex items-center rounded-full bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-400 ring-1 ring-inset ring-sky-500/20">
          {badge}
        </span>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl bg-gradient-to-r from-sky-400 to-teal-300 bg-clip-text text-transparent">
          {title}
        </h1>
        <p className="mt-4 text-sm text-slate-300 max-w-xl mx-auto">
          {subtitle}
        </p>
      </div>
    </section>
  )
}
