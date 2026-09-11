-- Paylaşılabilir favori listesi ("Benim Yunanistan Listem"): her kullanıcı
-- kendi favorilerini token tabanlı, herkese açık bir linkle paylaşabilir.
-- Token kendi tablosunda tutuluyor (users tablosundaki "Users can view all
-- profiles" select(true) politikasına token'ı hiç sokmamak için) — böylece
-- sadece token'ı bilen kişi favorileri görebilir, tabloyu tarayarak değil.
create table public.share_tokens (
  user_id uuid primary key references public.users(id) on delete cascade,
  token uuid not null unique default gen_random_uuid(),
  created_at timestamptz not null default now()
);

alter table public.share_tokens enable row level security;

create policy "Users can view own share token" on public.share_tokens
  for select using (user_id = auth.uid());
create policy "Users can create own share token" on public.share_tokens
  for insert with check (user_id = auth.uid());
create policy "Users can delete own share token" on public.share_tokens
  for delete using (user_id = auth.uid());

-- Herkese açık paylaşım sayfası bu token'ı bilen herkesin favorileri
-- görmesine izin veriyor — share_tokens/favorites RLS'ini bilinçli olarak
-- security definer ile aşıyor, tabloyu değil sadece bu tek fonksiyonu açığa çıkarır.
create or replace function public.get_shared_favorites(p_token uuid)
returns table (entity_type text, entity_id uuid, owner_name text)
language sql stable security definer as $$
  select f.entity_type, f.entity_id, u.full_name as owner_name
  from public.favorites f
  join public.share_tokens st on st.user_id = f.user_id
  join public.users u on u.id = f.user_id
  where st.token = p_token
  order by f.created_at desc;
$$;

grant execute on function public.get_shared_favorites(uuid) to anon, authenticated;

-- get_trending_islands (bkz. migration 026) ile aynı desen, ama plaj/restoran/
-- otel/gezilecek-yer sayfaları için de kullanılabilecek genel bir versiyon.
create or replace function public.get_trending_entities(p_path_prefix text, days_back int default 30, limit_count int default 3)
returns table (slug text, view_count bigint)
language sql stable security definer as $$
  select
    split_part(path, '/', 3) as slug,
    count(*) as view_count
  from public.page_views
  where path like '/' || p_path_prefix || '/%'
    and created_at > now() - (days_back || ' days')::interval
  group by split_part(path, '/', 3)
  order by view_count desc
  limit limit_count;
$$;

grant execute on function public.get_trending_entities(text, int, int) to anon, authenticated;
