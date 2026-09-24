-- GÜVENLİK (042/043'ün yerini alan kesin çözüm): public.users.email'i
-- anon/authenticated/PUBLIC'ten REVOKE etmek canlıda ısrarla tutmadı
-- (sebebi tespit edilemedi — muhtemelen bu Supabase projesinin
-- PostgREST/şema önbelleği katmanında bilinmeyen bir davranış).
-- Column-level GRANT/REVOKE nadir kullanılan, daha az test edilmiş bir
-- mekanizma; bunun yerine bu projede zaten kanıtlanmış şekilde çalışan
-- satır bazlı güvenliğe (RLS) geçiliyor: email, public.users'tan tamamen
-- ayrı, kendi RLS'i olan bir tabloya taşınıyor. Sütun fiziksel olarak
-- var olmadığı için artık "yanlışlıkla açık kalma" ihtimali yok.

create table public.user_emails (
  user_id uuid primary key references public.users(id) on delete cascade,
  email text not null
);

-- Kaynak auth.users (e-postanın asıl kaydı): public.users.email acil
-- önlem olarak önceden boşaltılmış olsa bile migration doğru çalışsın.
insert into public.user_emails (user_id, email)
select u.id, a.email
from public.users u
join auth.users a on a.id = u.id
where a.email is not null;

alter table public.user_emails enable row level security;

create policy "kullanici_kendi_epostasini_gorur" on public.user_emails
  for select using (auth.uid() = user_id);

-- Admin kullanıcı listesi (security definer, RLS'i atlıyor) artık
-- user_emails'tan email çekiyor.
create or replace function public.admin_list_users()
returns table (id uuid, email text, full_name text, role text, created_at timestamptz)
language sql stable security definer
set search_path = public
as $$
  select u.id, e.email, u.full_name, u.role, u.created_at
  from public.users u
  left join public.user_emails e on e.user_id = u.id
  where public.is_admin()
  order by u.created_at desc;
$$;

-- Kayıt anında auth.users'a eklenen kullanıcının e-postası artık
-- user_emails'a yazılıyor (public.users'a değil, orada sütun kalmıyor).
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.users (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  insert into public.user_emails (user_id, email)
  values (new.id, new.email);
  return new;
end;
$$;

-- Artık kullanılmayan, sızıntının fiziksel kaynağı olan sütun kaldırılıyor.
alter table public.users drop column email;
