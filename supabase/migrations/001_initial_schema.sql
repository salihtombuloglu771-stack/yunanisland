-- HelloIslands — initial schema
-- Not applied yet: Supabase project connection is deferred to a later session.
-- Run this in Supabase Dashboard → SQL Editor once the project exists.

create extension if not exists "uuid-ossp";

-- ============================================================
-- USERS (extends auth.users)
-- ============================================================
create table public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  avatar_url text,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz default now() not null
);

create or replace function public.is_admin()
returns boolean language sql stable security definer as $$
  select exists(select 1 from public.users where id = auth.uid() and role = 'admin')
$$;

-- auto-create public.users row when someone signs up
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.users (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================
-- CATEGORIES (blog / content categories)
-- ============================================================
create table public.categories (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  description text,
  created_at timestamptz default now() not null
);

-- ============================================================
-- ISLANDS
-- ============================================================
create table public.islands (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  description text,
  history text,
  population int,
  latitude numeric,
  longitude numeric,
  best_time_to_visit text,
  budget_level text check (budget_level in ('budget', 'mid', 'luxury')),
  cover_image_url text,
  is_published boolean default false not null,
  created_at timestamptz default now() not null
);

-- ============================================================
-- BEACHES
-- ============================================================
create table public.beaches (
  id uuid primary key default uuid_generate_v4(),
  island_id uuid references public.islands(id) on delete cascade,
  name text not null,
  slug text not null unique,
  description text,
  beach_type text check (beach_type in ('sand', 'pebble', 'mixed')),
  water_depth text,
  crowd_level text check (crowd_level in ('low', 'medium', 'high')),
  family_friendly boolean default true,
  pet_friendly boolean default false,
  blue_flag boolean default false,
  sunbed_price numeric,
  umbrella_price numeric,
  has_parking boolean default false,
  has_showers boolean default false,
  has_toilets boolean default false,
  has_beach_bar boolean default false,
  has_lifeguard boolean default false,
  accessibility text,
  sunset_rating int check (sunset_rating between 1 and 5),
  latitude numeric,
  longitude numeric,
  cover_image_url text,
  created_at timestamptz default now() not null
);

-- ============================================================
-- RESTAURANTS
-- ============================================================
create table public.restaurants (
  id uuid primary key default uuid_generate_v4(),
  island_id uuid references public.islands(id) on delete cascade,
  name text not null,
  slug text not null unique,
  cuisine text,
  price_level text check (price_level in ('budget', 'mid', 'expensive')),
  average_cost numeric,
  opening_hours text,
  phone text,
  website text,
  vegetarian boolean default false,
  vegan boolean default false,
  gluten_free boolean default false,
  sea_view boolean default false,
  outdoor_seating boolean default false,
  family_friendly boolean default true,
  latitude numeric,
  longitude numeric,
  cover_image_url text,
  created_at timestamptz default now() not null
);

-- ============================================================
-- HOTELS
-- ============================================================
create table public.hotels (
  id uuid primary key default uuid_generate_v4(),
  island_id uuid references public.islands(id) on delete cascade,
  name text not null,
  slug text not null unique,
  category text check (category in ('budget', 'mid-range', 'luxury')),
  description text,
  price_range text,
  affiliate_link text,
  latitude numeric,
  longitude numeric,
  cover_image_url text,
  created_at timestamptz default now() not null
);

-- ============================================================
-- FERRY ROUTES
-- ============================================================
create table public.ferry_routes (
  id uuid primary key default uuid_generate_v4(),
  from_port text not null,
  to_port text not null,
  companies text[],
  duration_minutes int,
  price_min numeric,
  price_max numeric,
  created_at timestamptz default now() not null
);

-- ============================================================
-- ARTICLES (blog)
-- ============================================================
create table public.articles (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text not null unique,
  content text,
  category_id uuid references public.categories(id) on delete set null,
  author_id uuid references public.users(id) on delete set null,
  cover_image_url text,
  is_published boolean default false not null,
  published_at timestamptz,
  created_at timestamptz default now() not null
);

-- ============================================================
-- ADVERTISEMENTS (admin-managed ad slots)
-- ============================================================
create table public.advertisements (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  image_url text,
  link_url text,
  placement text,
  is_active boolean default true not null,
  starts_at timestamptz,
  ends_at timestamptz,
  created_at timestamptz default now() not null
);

-- ============================================================
-- FAVORITES / REVIEWS / MEDIA / AFFILIATE_LINKS
-- polymorphic entity_type + entity_id: 'island' | 'beach' | 'restaurant' | 'hotel'
-- ============================================================
create table public.favorites (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users(id) on delete cascade not null,
  entity_type text not null check (entity_type in ('island', 'beach', 'restaurant', 'hotel')),
  entity_id uuid not null,
  created_at timestamptz default now() not null,
  unique (user_id, entity_type, entity_id)
);

create table public.reviews (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users(id) on delete cascade not null,
  entity_type text not null check (entity_type in ('island', 'beach', 'restaurant', 'hotel')),
  entity_id uuid not null,
  rating int not null check (rating between 1 and 5),
  comment text,
  created_at timestamptz default now() not null
);

create table public.media (
  id uuid primary key default uuid_generate_v4(),
  entity_type text not null check (entity_type in ('island', 'beach', 'restaurant', 'hotel')),
  entity_id uuid not null,
  url text not null,
  media_type text default 'photo' check (media_type in ('photo', 'video', 'drone')),
  created_at timestamptz default now() not null
);

create table public.affiliate_links (
  id uuid primary key default uuid_generate_v4(),
  entity_type text not null check (entity_type in ('island', 'beach', 'restaurant', 'hotel')),
  entity_id uuid not null,
  provider text not null check (provider in ('hotel', 'ferry', 'car_rental', 'flight', 'insurance', 'tour', 'esim')),
  url text not null,
  label text,
  created_at timestamptz default now() not null
);

-- ============================================================
-- INDEXES
-- ============================================================
create index idx_beaches_island on public.beaches(island_id);
create index idx_restaurants_island on public.restaurants(island_id);
create index idx_hotels_island on public.hotels(island_id);
create index idx_articles_category on public.articles(category_id);
create index idx_favorites_user on public.favorites(user_id);
create index idx_reviews_entity on public.reviews(entity_type, entity_id);
create index idx_media_entity on public.media(entity_type, entity_id);
create index idx_affiliate_links_entity on public.affiliate_links(entity_type, entity_id);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
alter table public.users enable row level security;
alter table public.categories enable row level security;
alter table public.islands enable row level security;
alter table public.beaches enable row level security;
alter table public.restaurants enable row level security;
alter table public.hotels enable row level security;
alter table public.ferry_routes enable row level security;
alter table public.articles enable row level security;
alter table public.advertisements enable row level security;
alter table public.favorites enable row level security;
alter table public.reviews enable row level security;
alter table public.media enable row level security;
alter table public.affiliate_links enable row level security;

-- users: everyone can view profiles, only the owner or an admin can update
create policy "Users can view all profiles" on public.users for select using (true);
create policy "Users can update own profile" on public.users for update using (id = auth.uid() or public.is_admin());

-- content tables: public read for published rows, admin-only write
create policy "Public can view categories" on public.categories for select using (true);
create policy "Admin manages categories" on public.categories for insert with check (public.is_admin());
create policy "Admin updates categories" on public.categories for update using (public.is_admin());
create policy "Admin deletes categories" on public.categories for delete using (public.is_admin());

create policy "Public can view published islands" on public.islands for select using (is_published or public.is_admin());
create policy "Admin manages islands" on public.islands for insert with check (public.is_admin());
create policy "Admin updates islands" on public.islands for update using (public.is_admin());
create policy "Admin deletes islands" on public.islands for delete using (public.is_admin());

create policy "Public can view beaches" on public.beaches for select using (true);
create policy "Admin manages beaches" on public.beaches for insert with check (public.is_admin());
create policy "Admin updates beaches" on public.beaches for update using (public.is_admin());
create policy "Admin deletes beaches" on public.beaches for delete using (public.is_admin());

create policy "Public can view restaurants" on public.restaurants for select using (true);
create policy "Admin manages restaurants" on public.restaurants for insert with check (public.is_admin());
create policy "Admin updates restaurants" on public.restaurants for update using (public.is_admin());
create policy "Admin deletes restaurants" on public.restaurants for delete using (public.is_admin());

create policy "Public can view hotels" on public.hotels for select using (true);
create policy "Admin manages hotels" on public.hotels for insert with check (public.is_admin());
create policy "Admin updates hotels" on public.hotels for update using (public.is_admin());
create policy "Admin deletes hotels" on public.hotels for delete using (public.is_admin());

create policy "Public can view ferry routes" on public.ferry_routes for select using (true);
create policy "Admin manages ferry routes" on public.ferry_routes for insert with check (public.is_admin());
create policy "Admin updates ferry routes" on public.ferry_routes for update using (public.is_admin());
create policy "Admin deletes ferry routes" on public.ferry_routes for delete using (public.is_admin());

create policy "Public can view published articles" on public.articles for select using (is_published or public.is_admin());
create policy "Admin manages articles" on public.articles for insert with check (public.is_admin());
create policy "Admin updates articles" on public.articles for update using (public.is_admin());
create policy "Admin deletes articles" on public.articles for delete using (public.is_admin());

create policy "Public can view active ads" on public.advertisements for select using (is_active or public.is_admin());
create policy "Admin manages ads" on public.advertisements for insert with check (public.is_admin());
create policy "Admin updates ads" on public.advertisements for update using (public.is_admin());
create policy "Admin deletes ads" on public.advertisements for delete using (public.is_admin());

-- favorites/reviews: owner-only write, public read (reviews are shown to everyone; favorites are private)
create policy "Users view own favorites" on public.favorites for select using (user_id = auth.uid() or public.is_admin());
create policy "Users manage own favorites" on public.favorites for insert with check (user_id = auth.uid());
create policy "Users delete own favorites" on public.favorites for delete using (user_id = auth.uid());

create policy "Public can view reviews" on public.reviews for select using (true);
create policy "Users create own reviews" on public.reviews for insert with check (user_id = auth.uid());
create policy "Users update own reviews" on public.reviews for update using (user_id = auth.uid());
create policy "Users delete own reviews" on public.reviews for delete using (user_id = auth.uid() or public.is_admin());

create policy "Public can view media" on public.media for select using (true);
create policy "Admin manages media" on public.media for insert with check (public.is_admin());
create policy "Admin deletes media" on public.media for delete using (public.is_admin());

create policy "Public can view affiliate links" on public.affiliate_links for select using (true);
create policy "Admin manages affiliate links" on public.affiliate_links for insert with check (public.is_admin());
create policy "Admin updates affiliate links" on public.affiliate_links for update using (public.is_admin());
create policy "Admin deletes affiliate links" on public.affiliate_links for delete using (public.is_admin());
