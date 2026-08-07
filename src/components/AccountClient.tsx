'use client'

import Link from 'next/link'
import { Header } from '@/components/Header'
import { SiteFooter } from '@/components/SiteFooter'
import { MfaEnrollment } from '@/components/MfaEnrollment'
import { useLanguage } from '@/lib/i18n/LanguageProvider'

export interface BadgeState {
  id: string
  icon: string
  unlocked: boolean
}

export interface NoteItem {
  id: string
  note: string | null
  visitedAt: string | null
  entityName: string | null
  entityHref: string
  entityIcon: string
}

export interface FavoriteItem {
  id: string
  name: string
  href: string
}

interface AccountClientProps {
  displayName: string
  badges: BadgeState[]
  storiesCount: number
  notes: NoteItem[]
  islandFavorites: FavoriteItem[]
  beachFavorites: FavoriteItem[]
  restaurantFavorites: FavoriteItem[]
}

const BADGE_LABELS: Record<string, { tr: { label: string; desc: string }; en: { label: string; desc: string }; el: { label: string; desc: string } }> = {
  'first-step': {
    tr: { label: 'İlk Adım', desc: 'İlk favorini ekle' },
    en: { label: 'First Step', desc: 'Add your first favorite' },
    el: { label: 'Πρώτο Βήμα', desc: 'Προσθέστε το πρώτο σας αγαπημένο' },
  },
  explorer: {
    tr: { label: 'Kaşif', desc: '5+ favori ekle' },
    en: { label: 'Explorer', desc: 'Add 5+ favorites' },
    el: { label: 'Εξερευνητής', desc: 'Προσθέστε 5+ αγαπημένα' },
  },
  reviewer: {
    tr: { label: 'Değerlendirici', desc: 'İlk yorumunu yaz' },
    en: { label: 'Reviewer', desc: 'Write your first review' },
    el: { label: 'Κριτικός', desc: 'Γράψτε την πρώτη σας κριτική' },
  },
  planner: {
    tr: { label: 'Planlayıcı', desc: 'İlk seyahat notunu ekle' },
    en: { label: 'Planner', desc: 'Add your first trip note' },
    el: { label: 'Σχεδιαστής', desc: 'Προσθέστε την πρώτη σας σημείωση ταξιδιού' },
  },
  storyteller: {
    tr: { label: 'Anlatıcı', desc: 'İlk gezi hikayeni paylaş' },
    en: { label: 'Storyteller', desc: 'Share your first travel story' },
    el: { label: 'Αφηγητής', desc: 'Μοιραστείτε την πρώτη σας ταξιδιωτική ιστορία' },
  },
  traveler: {
    tr: { label: 'Gezgin', desc: '3+ farklı adayla etkileşime geç' },
    en: { label: 'Traveler', desc: 'Interact with 3+ different islands' },
    el: { label: 'Ταξιδιώτης', desc: 'Αλληλεπιδράστε με 3+ διαφορετικά νησιά' },
  },
}

export function AccountClient({ displayName, badges, storiesCount, notes, islandFavorites, beachFavorites, restaurantFavorites }: AccountClientProps) {
  const { locale } = useLanguage()

  const t = {
    myAccount: locale === 'en' ? 'My Account' : locale === 'el' ? 'Ο Λογαριασμός μου' : 'Hesabım',
    loggedInAs: locale === 'en' ? 'you are logged in as' : locale === 'el' ? 'έχετε συνδεθεί ως' : 'olarak giriş yaptın.',
    security: locale === 'en' ? '🔐 Security' : locale === 'el' ? '🔐 Ασφάλεια' : '🔐 Güvenlik',
    badgesTitle: locale === 'en' ? '🏅 Badges' : locale === 'el' ? '🏅 Παράσημα' : '🏅 Rozetler',
    myStories: locale === 'en' ? '✍️ My Travel Stories' : locale === 'el' ? '✍️ Οι Ταξιδιωτικές μου Ιστορίες' : '✍️ Gezi Hikayelerim',
    newStory: locale === 'en' ? '+ New Story' : locale === 'el' ? '+ Νέα Ιστορία' : '+ Yeni Hikaye',
    sharedStories: (n: number) => locale === 'en' ? `You've shared ${n} ${n === 1 ? 'story' : 'stories'}.` : locale === 'el' ? `Έχετε μοιραστεί ${n} ιστορίες.` : `${n} hikaye paylaştın.`,
    noStories: locale === 'en' ? "You haven't shared any stories yet." : locale === 'el' ? 'Δεν έχετε μοιραστεί ακόμα ιστορίες.' : 'Henüz hikaye paylaşmadın.',
    viewAllStories: locale === 'en' ? 'View all stories' : locale === 'el' ? 'Δείτε όλες τις ιστορίες' : 'Tüm hikayeleri gör',
    myTripNotes: locale === 'en' ? '📝 My Trip Notes' : locale === 'el' ? '📝 Οι Σημειώσεις Ταξιδιού μου' : '📝 Seyahat Notlarım',
    unknownPlace: locale === 'en' ? 'Unknown place' : locale === 'el' ? 'Άγνωστο μέρος' : 'Bilinmeyen yer',
    noTripNotes: locale === 'en' ? 'You haven’t added a trip note yet. You can add one from the "Personal Trip Note" box on an island/beach/restaurant/hotel page.' : locale === 'el' ? 'Δεν έχετε προσθέσει ακόμα σημείωση ταξιδιού. Μπορείτε να προσθέσετε μία από το πλαίσιο «Προσωπική Σημείωση Ταξιδιού» σε μια σελίδα νησιού/παραλίας/εστιατορίου/ξενοδοχείου.' : 'Henüz seyahat notu eklemedin. Bir ada/plaj/restoran/otel sayfasında "Kişisel Seyahat Notu" kutusundan ekleyebilirsin.',
    favIslands: locale === 'en' ? '❤️ Favorite Islands' : locale === 'el' ? '❤️ Αγαπημένα Νησιά' : '❤️ Favori Adalar',
    noFavIslands: locale === 'en' ? "You haven't added a favorite island yet." : locale === 'el' ? 'Δεν έχετε προσθέσει ακόμα αγαπημένο νησί.' : 'Henüz favori ada eklemedin.',
    favBeaches: locale === 'en' ? '🏖️ Favorite Beaches' : locale === 'el' ? '🏖️ Αγαπημένες Παραλίες' : '🏖️ Favori Plajlar',
    noFavBeaches: locale === 'en' ? "You haven't added a favorite beach yet." : locale === 'el' ? 'Δεν έχετε προσθέσει ακόμα αγαπημένη παραλία.' : 'Henüz favori plaj eklemedin.',
    favRestaurants: locale === 'en' ? '🍽️ Favorite Restaurants' : locale === 'el' ? '🍽️ Αγαπημένα Εστιατόρια' : '🍽️ Favori Restoranlar',
    noFavRestaurants: locale === 'en' ? "You haven't added a favorite restaurant yet." : locale === 'el' ? 'Δεν έχετε προσθέσει ακόμα αγαπημένο εστιατόριο.' : 'Henüz favori restoran eklemedin.',
  }

  const dateLocale = locale === 'en' ? 'en-US' : locale === 'el' ? 'el-GR' : 'tr-TR'

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 transition-colors duration-300">
      <Header />

      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">{t.myAccount}</h1>
        <p className="mt-2 text-sm text-neutral-500">
          {displayName} {t.loggedInAs}
        </p>

        <section className="mt-10">
          <h2 className="text-lg font-bold text-neutral-900 dark:text-white mb-4">{t.security}</h2>
          <MfaEnrollment />
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-bold text-neutral-900 dark:text-white mb-4">{t.badgesTitle}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {badges.map((badge) => {
              const labels = BADGE_LABELS[badge.id]?.[locale] ?? BADGE_LABELS[badge.id]?.tr
              return (
                <div
                  key={badge.id}
                  className={`p-4 rounded-xl border text-center transition-all ${
                    badge.unlocked
                      ? 'bg-white dark:bg-neutral-900 border-amber-300/60 dark:border-amber-500/30 shadow-sm'
                      : 'bg-slate-100/60 dark:bg-neutral-900/40 border-slate-200 dark:border-neutral-800 opacity-50'
                  }`}
                >
                  <div className="text-2xl">{badge.unlocked ? badge.icon : '🔒'}</div>
                  <p className="mt-1 text-xs font-bold text-neutral-800 dark:text-neutral-200">{labels?.label}</p>
                  <p className="mt-0.5 text-[11px] text-neutral-500">{labels?.desc}</p>
                </div>
              )
            })}
          </div>
        </section>

        <section className="mt-10 flex items-center justify-between">
          <h2 className="text-lg font-bold text-neutral-900 dark:text-white">{t.myStories}</h2>
          <Link href="/gezi-hikayeleri/yeni" className="text-xs font-semibold text-sky-600 hover:underline">{t.newStory}</Link>
        </section>
        <p className="mt-2 text-sm text-neutral-500">
          {storiesCount > 0 ? t.sharedStories(storiesCount) : t.noStories}{' '}
          <Link href="/gezi-hikayeleri" className="text-sky-600 hover:underline">{t.viewAllStories}</Link>
        </p>

        <section className="mt-10">
          <h2 className="text-lg font-bold text-neutral-900 dark:text-white mb-4">{t.myTripNotes}</h2>
          {notes.length > 0 ? (
            <div className="space-y-3">
              {notes.map((n) => (
                <Link
                  key={n.id}
                  href={n.entityHref}
                  className="block bg-white dark:bg-neutral-900 p-4 rounded-xl border border-slate-100 dark:border-neutral-900 hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-neutral-800 dark:text-neutral-200 text-sm">
                      {n.entityIcon} {n.entityName ?? t.unknownPlace}
                    </span>
                    {n.visitedAt && (
                      <span className="text-xs text-neutral-400">{new Date(n.visitedAt).toLocaleDateString(dateLocale)}</span>
                    )}
                  </div>
                  {n.note && <p className="mt-1.5 text-xs text-neutral-500 line-clamp-2">{n.note}</p>}
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-sm text-neutral-500">{t.noTripNotes}</p>
          )}
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-bold text-neutral-900 dark:text-white mb-4">{t.favIslands}</h2>
          {islandFavorites.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {islandFavorites.map((i) => (
                <Link key={i.id} href={i.href} className="bg-white dark:bg-neutral-900 p-4 rounded-xl border border-slate-100 dark:border-neutral-900 hover:shadow-md transition-all font-semibold text-neutral-800 dark:text-neutral-200">
                  🏝️ {i.name}
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-sm text-neutral-500">{t.noFavIslands}</p>
          )}
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-bold text-neutral-900 dark:text-white mb-4">{t.favBeaches}</h2>
          {beachFavorites.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {beachFavorites.map((b) => (
                <Link key={b.id} href={b.href} className="bg-white dark:bg-neutral-900 p-4 rounded-xl border border-slate-100 dark:border-neutral-900 hover:shadow-md transition-all font-semibold text-neutral-800 dark:text-neutral-200">
                  🏖️ {b.name}
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-sm text-neutral-500">{t.noFavBeaches}</p>
          )}
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-bold text-neutral-900 dark:text-white mb-4">{t.favRestaurants}</h2>
          {restaurantFavorites.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {restaurantFavorites.map((r) => (
                <Link key={r.id} href={r.href} className="bg-white dark:bg-neutral-900 p-4 rounded-xl border border-slate-100 dark:border-neutral-900 hover:shadow-md transition-all font-semibold text-neutral-800 dark:text-neutral-200">
                  🍽️ {r.name}
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-sm text-neutral-500">{t.noFavRestaurants}</p>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
