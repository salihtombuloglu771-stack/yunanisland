-- Kurumsal güven özellikleri: içerik güncelleme tarihi, hatalı bilgi bildirimi,
-- blog yazarı imzası.

-- ============================================================
-- updated_at: her güncellemede otomatik yenilenen tarih damgası
-- ============================================================
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

alter table public.islands add column if not exists updated_at timestamptz default now() not null;
alter table public.beaches add column if not exists updated_at timestamptz default now() not null;
alter table public.restaurants add column if not exists updated_at timestamptz default now() not null;
alter table public.hotels add column if not exists updated_at timestamptz default now() not null;
alter table public.attractions add column if not exists updated_at timestamptz default now() not null;

drop trigger if exists islands_set_updated_at on public.islands;
create trigger islands_set_updated_at before update on public.islands for each row execute function public.set_updated_at();

drop trigger if exists beaches_set_updated_at on public.beaches;
create trigger beaches_set_updated_at before update on public.beaches for each row execute function public.set_updated_at();

drop trigger if exists restaurants_set_updated_at on public.restaurants;
create trigger restaurants_set_updated_at before update on public.restaurants for each row execute function public.set_updated_at();

drop trigger if exists hotels_set_updated_at on public.hotels;
create trigger hotels_set_updated_at before update on public.hotels for each row execute function public.set_updated_at();

drop trigger if exists attractions_set_updated_at on public.attractions;
create trigger attractions_set_updated_at before update on public.attractions for each row execute function public.set_updated_at();

-- ============================================================
-- Blog yazarı imzası
-- ============================================================
alter table public.articles add column if not exists author_name text not null default 'Yunanisland Editörü';

-- ============================================================
-- İçerik hata bildirimi — ad_inquiries/contact_messages ile aynı desen:
-- herkes ekleyebilir, sadece admin görüp yönetebilir.
-- ============================================================
create table public.content_reports (
  id uuid primary key default uuid_generate_v4(),
  entity_type text not null check (entity_type in ('island', 'beach', 'restaurant', 'hotel', 'attraction')),
  entity_id uuid not null,
  message text not null,
  reporter_email text,
  status text not null default 'new' check (status in ('new', 'reviewed', 'resolved')),
  created_at timestamptz default now() not null
);

alter table public.content_reports enable row level security;

create policy "Anyone can report content issues" on public.content_reports for insert with check (true);
create policy "Admin can view content reports" on public.content_reports for select using (public.is_admin());
create policy "Admin can update content reports" on public.content_reports for update using (public.is_admin());
create policy "Admin can delete content reports" on public.content_reports for delete using (public.is_admin());
