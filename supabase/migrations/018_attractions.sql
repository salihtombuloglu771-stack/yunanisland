-- Gezilecek yerler (tarihi/doğal/kültürel mekanlar) — beach/restaurant/hotel ile aynı desen

create table public.attractions (
  id uuid primary key default uuid_generate_v4(),
  island_id uuid references public.islands(id) on delete cascade,
  name text not null,
  slug text not null unique,
  category text not null check (category in ('archaeological', 'viewpoint', 'museum', 'church', 'nature', 'village', 'castle', 'landmark')),
  description text,
  opening_hours text,
  ticket_price text,
  latitude numeric,
  longitude numeric,
  cover_image_url text,
  created_at timestamptz default now() not null
);

create index idx_attractions_island on public.attractions(island_id);

alter table public.attractions enable row level security;

create policy "Public can view attractions" on public.attractions for select using (true);
create policy "Admin manages attractions" on public.attractions for insert with check (public.is_admin());
create policy "Admin updates attractions" on public.attractions for update using (public.is_admin());
create policy "Admin deletes attractions" on public.attractions for delete using (public.is_admin());

-- favorites/reviews/media/affiliate_links/trip_notes: 'attraction' değerini de kabul etsin
alter table public.favorites drop constraint favorites_entity_type_check;
alter table public.favorites add constraint favorites_entity_type_check check (entity_type in ('island', 'beach', 'restaurant', 'hotel', 'attraction'));

alter table public.reviews drop constraint reviews_entity_type_check;
alter table public.reviews add constraint reviews_entity_type_check check (entity_type in ('island', 'beach', 'restaurant', 'hotel', 'attraction'));

alter table public.media drop constraint media_entity_type_check;
alter table public.media add constraint media_entity_type_check check (entity_type in ('island', 'beach', 'restaurant', 'hotel', 'attraction'));

alter table public.affiliate_links drop constraint affiliate_links_entity_type_check;
alter table public.affiliate_links add constraint affiliate_links_entity_type_check check (entity_type in ('island', 'beach', 'restaurant', 'hotel', 'attraction'));

alter table public.trip_notes drop constraint trip_notes_entity_type_check;
alter table public.trip_notes add constraint trip_notes_entity_type_check check (entity_type in ('island', 'beach', 'restaurant', 'hotel', 'attraction'));
