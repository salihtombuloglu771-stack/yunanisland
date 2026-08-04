-- Yorumlara fotoğraf ekleme — reviews'a nullable bir image_url kolonu.
-- Diğer kullanıcı içeriklerinde (gezi hikayesi kapak görseli gibi) zaten
-- kullanılan "URL yapıştır" deseni tekrarlanıyor, yeni bir storage bucket
-- kurmaya gerek kalmıyor.
alter table public.reviews add column if not exists image_url text;

-- "Şu an X kişi bakıyor" için: page_views admin-only select olduğundan
-- (get_trending_islands ile aynı gerekçe) belirli bir sayfanın son birkaç
-- dakikadaki ziyaret sayısını herkese güvenle açan bir RPC.
create or replace function public.get_recent_page_views(p_path text, p_minutes int default 5)
returns bigint
language sql stable security definer as $$
  select count(*)
  from public.page_views
  where path = p_path
    and created_at > now() - (p_minutes || ' minutes')::interval
$$;

grant execute on function public.get_recent_page_views(text, int) to anon, authenticated;
