create table public.events (
  id uuid primary key default uuid_generate_v4(),
  island_id uuid references public.islands(id) on delete set null,
  title text not null,
  slug text not null unique,
  description text,
  category text check (category in ('festival', 'concert', 'sports', 'food', 'religious', 'seasonal', 'other')) default 'other',
  start_date date not null,
  end_date date,
  location text,
  image_url text,
  is_published boolean default false not null,
  created_at timestamptz default now() not null
);

create index idx_events_island on public.events(island_id);
create index idx_events_start_date on public.events(start_date);

alter table public.events enable row level security;

create policy "Public can view published events" on public.events for select using (is_published or public.is_admin());
create policy "Admin manages events" on public.events for insert with check (public.is_admin());
create policy "Admin updates events" on public.events for update using (public.is_admin());
create policy "Admin deletes events" on public.events for delete using (public.is_admin());
