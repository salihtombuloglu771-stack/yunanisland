-- E-posta bülteni — contact_messages/ad_inquiries ile aynı desen: herkes
-- ekleyebilir (kendi e-postasını), sadece admin listeyi görebilir.
create table public.newsletter_subscribers (
  id uuid primary key default uuid_generate_v4(),
  email text not null unique,
  created_at timestamptz default now() not null
);

alter table public.newsletter_subscribers enable row level security;

create policy "Anyone can subscribe" on public.newsletter_subscribers for insert with check (true);
create policy "Admin can view subscribers" on public.newsletter_subscribers for select using (public.is_admin());
create policy "Admin can delete subscribers" on public.newsletter_subscribers for delete using (public.is_admin());
