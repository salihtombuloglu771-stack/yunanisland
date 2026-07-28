-- Seyahat notları (özel, sadece sahibi görür) + gezi hikayeleri (herkese açık, kullanıcı üretimi)

create table public.trip_notes (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users(id) on delete cascade not null,
  entity_type text not null check (entity_type in ('island', 'beach', 'restaurant', 'hotel')),
  entity_id uuid not null,
  note text,
  visited_at date,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  unique (user_id, entity_type, entity_id)
);

create table public.travel_stories (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users(id) on delete cascade not null,
  island_id uuid references public.islands(id) on delete set null,
  title text not null,
  content text not null,
  cover_image_url text,
  is_published boolean default true not null,
  created_at timestamptz default now() not null
);

create index idx_trip_notes_user on public.trip_notes(user_id);
create index idx_trip_notes_entity on public.trip_notes(entity_type, entity_id);
create index idx_travel_stories_user on public.travel_stories(user_id);
create index idx_travel_stories_island on public.travel_stories(island_id);

alter table public.trip_notes enable row level security;
alter table public.travel_stories enable row level security;

create policy "Users view own trip notes" on public.trip_notes for select using (user_id = auth.uid());
create policy "Users insert own trip notes" on public.trip_notes for insert with check (user_id = auth.uid());
create policy "Users update own trip notes" on public.trip_notes for update using (user_id = auth.uid());
create policy "Users delete own trip notes" on public.trip_notes for delete using (user_id = auth.uid());

create policy "Public can view published stories" on public.travel_stories for select using (is_published or user_id = auth.uid() or public.is_admin());
create policy "Users create own stories" on public.travel_stories for insert with check (user_id = auth.uid());
create policy "Users update own stories" on public.travel_stories for update using (user_id = auth.uid() or public.is_admin());
create policy "Users delete own stories" on public.travel_stories for delete using (user_id = auth.uid() or public.is_admin());
