-- Genel İletişim formu — reklam-ver'deki ad_inquiries ile aynı desen:
-- herkes ekleyebilir, sadece admin görüp yönetebilir.
create table public.contact_messages (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  status text not null default 'new' check (status in ('new', 'read', 'closed')),
  created_at timestamptz default now() not null
);

alter table public.contact_messages enable row level security;

create policy "Anyone can submit a contact message" on public.contact_messages for insert with check (true);
create policy "Admin can view contact messages" on public.contact_messages for select using (public.is_admin());
create policy "Admin can update contact messages" on public.contact_messages for update using (public.is_admin());
create policy "Admin can delete contact messages" on public.contact_messages for delete using (public.is_admin());

-- "Trend/Popüler" rozeti için: page_views tablosu admin-only select'e sahip
-- (kişisel veri taşımasa da RLS geneli böyle kurulmuş), bu yüzden ana sayfanın
-- son 30 günün en çok ziyaret edilen adalarını GÜVENLE (satır bazlı veri
-- sızdırmadan, sadece slug + sayım) okuyabilmesi için security definer bir
-- RPC — get_landing_stats ile aynı desen.
create or replace function public.get_trending_islands(days_back int default 30, limit_count int default 3)
returns table (slug text, view_count bigint)
language sql stable security definer as $$
  select
    split_part(path, '/', 3) as slug,
    count(*) as view_count
  from public.page_views
  where path like '/islands/%'
    and created_at > now() - (days_back || ' days')::interval
  group by split_part(path, '/', 3)
  order by view_count desc
  limit limit_count;
$$;

grant execute on function public.get_trending_islands(int, int) to anon, authenticated;
