-- Plaj/otel açıklamaları ve restoran mutfak etiketleri için İngilizce/Yunanca
-- kolonlar — islands tablosundaki description_en/description_el deseniyle aynı.

alter table public.beaches add column description_en text;
alter table public.beaches add column description_el text;

alter table public.hotels add column description_en text;
alter table public.hotels add column description_el text;

alter table public.restaurants add column cuisine_en text;
alter table public.restaurants add column cuisine_el text;
