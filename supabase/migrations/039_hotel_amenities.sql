-- Otellerde beaches/restaurants'taki gibi filtrelenebilir özellik yoktu
-- (yıldız, wifi, havuz, kahvaltı) — ada sayfasındaki otel sekmesi bu yüzden
-- hiç filtre sunamıyordu.
alter table public.hotels
  add column if not exists star_rating int check (star_rating between 1 and 5),
  add column if not exists has_wifi boolean not null default false,
  add column if not exists has_pool boolean not null default false,
  add column if not exists has_breakfast boolean not null default false,
  add column if not exists beachfront boolean not null default false;
