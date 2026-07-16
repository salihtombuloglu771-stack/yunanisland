# Yunanisland

Yunan Adaları için kapsamlı bir gezi platformu. Next.js + Supabase üzerine kurulu.

**Durum**: Teknik altyapı kurulum aşamasında — sayfa tasarımı ve Supabase canlı bağlantısı henüz yapılmadı.

## Teknoloji

- **Next.js 16** (App Router, Turbopack)
- **Supabase** (Postgres + Auth + Storage), Row Level Security ile
- **Tailwind CSS v4**

## Kurulum

```bash
npm install
cp .env.example .env.local   # Supabase bilgilerinizi girin
npm run dev
```

### Veritabanı

`supabase/migrations/001_initial_schema.sql` — Supabase projesi oluşturulduktan sonra Dashboard → SQL Editor'den çalıştırılmalı. İçerik: users, categories, islands, beaches, restaurants, hotels, ferry_routes, articles, advertisements, favorites, reviews, media, affiliate_links — hepsinde RLS açık, admin/public ayrımı `is_admin()` fonksiyonuyla yapılıyor.

Hava durumu verisi ayrı bir tablo olarak tutulmuyor — canlı bir API'den çekilecek (ileride entegre edilecek).

## Geliştirme notları

- `npx tsc --noEmit` — tip kontrolü
- `npm run lint` — ESLint
- `npm run build` — üretim derlemesi
