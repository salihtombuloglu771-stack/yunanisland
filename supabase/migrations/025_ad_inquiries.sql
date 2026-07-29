-- Reklam vermek isteyenlerin doldurduğu teklif formu — herkes ekleyebilir, sadece admin görebilir/yönetebilir.

create table public.ad_inquiries (
  id uuid primary key default uuid_generate_v4(),
  company_name text not null,
  contact_name text not null,
  email text not null,
  phone text,
  placement_interest text,
  budget_range text,
  message text,
  status text not null default 'new' check (status in ('new', 'contacted', 'closed')),
  created_at timestamptz default now() not null
);

alter table public.ad_inquiries enable row level security;

create policy "Anyone can submit an ad inquiry" on public.ad_inquiries for insert with check (true);
create policy "Admin can view ad inquiries" on public.ad_inquiries for select using (public.is_admin());
create policy "Admin can update ad inquiries" on public.ad_inquiries for update using (public.is_admin());
create policy "Admin can delete ad inquiries" on public.ad_inquiries for delete using (public.is_admin());
