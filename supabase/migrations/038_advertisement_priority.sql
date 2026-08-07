-- Ayni yerleşimde (placement) birden fazla aktif reklam olduğunda hangisinin
-- gösterileceği kontrol edilemiyordu (AdBanner .limit(1) ama sıralama yoktu,
-- Postgres hangi satırı döneceğini garanti etmez). priority eklendi — büyük
-- değer önce gösterilir.
alter table public.advertisements add column if not exists priority integer not null default 0;
