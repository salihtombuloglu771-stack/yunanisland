-- Kullanıcıların galeriye kendi fotoğraflarını (URL ile) eklemesi — admin
-- onaylayana kadar sadece kendisi ve admin görebiliyor, onaylanınca herkese açık.
-- Var olan admin-eklenen satırlar geriye dönük 'approved' sayılır (default ile).

alter table public.media add column if not exists status text not null default 'approved' check (status in ('pending', 'approved', 'rejected'));
alter table public.media add column if not exists submitted_by uuid references auth.users(id) on delete set null;

drop policy if exists "Public can view media" on public.media;
create policy "Public can view approved media" on public.media for select using (
  status = 'approved' or public.is_admin() or submitted_by = auth.uid()
);

create policy "Users submit pending media" on public.media for insert with check (
  auth.uid() is not null and submitted_by = auth.uid() and status = 'pending'
);

create policy "Admin reviews media status" on public.media for update using (public.is_admin());
