-- GÜVENLİK: public.users tablosundaki "for select using (true)" RLS
-- politikası satır bazlı olduğu için TÜM sütunları (email dahil)
-- kimliği doğrulanmamış (anon) ziyaretçilere açıyordu. Anon anahtarıyla
-- doğrudan PostgREST'e istek atan herkes `select email from users` ile
-- kayıtlı TÜM kullanıcıların e-posta adreslerini toplu çekebiliyordu
-- (spam/phishing riski). RLS satır filtresi sütun gizleyemediği için
-- Postgres'in native sütun bazlı yetkilendirmesi kullanılıyor: email
-- sütunu anon/authenticated'dan tamamen çekiliyor. Kullanıcının KENDİ
-- e-postası zaten Supabase Auth oturumunda (auth.getUser().email) var,
-- bu tablodan tekrar okumaya gerek yok. Admin kullanıcı listesi ise
-- security definer bir fonksiyon üzerinden (is_admin() kontrolüyle)
-- erişiyor.

revoke select (email) on public.users from anon, authenticated;

create or replace function public.admin_list_users()
returns table (id uuid, email text, full_name text, role text, created_at timestamptz)
language sql stable security definer
set search_path = public
as $$
  select u.id, u.email, u.full_name, u.role, u.created_at
  from public.users u
  where public.is_admin()
  order by u.created_at desc;
$$;

grant execute on function public.admin_list_users() to authenticated;
