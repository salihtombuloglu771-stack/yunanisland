-- Analytics: sayfa ziyaretleri ve arama sorguları — sadece admin panelinde
-- "hangi sayfa/ada en çok ziyaret ediliyor, en çok ne aranıyor" göstermek için.
-- Herkes (anon dahil) kayıt ekleyebilir (with check true) ama sadece admin okuyabilir.

create table public.page_views (
  id uuid primary key default uuid_generate_v4(),
  path text not null,
  created_at timestamptz default now() not null
);

create table public.search_logs (
  id uuid primary key default uuid_generate_v4(),
  query text not null,
  results_count integer not null default 0,
  created_at timestamptz default now() not null
);

create index page_views_path_idx on public.page_views(path);
create index page_views_created_at_idx on public.page_views(created_at);
create index search_logs_query_idx on public.search_logs(query);

alter table public.page_views enable row level security;
alter table public.search_logs enable row level security;

create policy "Anyone can log a page view" on public.page_views for insert with check (true);
create policy "Admin can view page views" on public.page_views for select using (public.is_admin());

create policy "Anyone can log a search" on public.search_logs for insert with check (true);
create policy "Admin can view search logs" on public.search_logs for select using (public.is_admin());
