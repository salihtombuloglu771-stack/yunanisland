-- IP+endpoint bazlı sabit-pencere rate limiting — dış bir servise (Upstash vb.)
-- gerek kalmadan doğrudan Postgres üzerinde. Tek satırlık atomik upsert ile
-- yarış durumu (race condition) olmadan sayaç tutuluyor.
create table public.rate_limits (
  key text primary key,
  count int not null default 1,
  window_start timestamptz not null default now()
);

create or replace function public.check_rate_limit(p_key text, p_limit int, p_window_seconds int)
returns boolean
language plpgsql security definer as $$
declare
  v_count int;
begin
  insert into public.rate_limits (key, count, window_start)
  values (p_key, 1, now())
  on conflict (key) do update set
    count = case
      when public.rate_limits.window_start < now() - (p_window_seconds || ' seconds')::interval
        then 1
      else public.rate_limits.count + 1
    end,
    window_start = case
      when public.rate_limits.window_start < now() - (p_window_seconds || ' seconds')::interval
        then now()
      else public.rate_limits.window_start
    end
  returning count into v_count;

  return v_count <= p_limit;
end;
$$;

grant execute on function public.check_rate_limit(text, int, int) to anon, authenticated;

alter table public.rate_limits enable row level security;
-- Tabloya doğrudan erişim yok, sadece yukarıdaki security definer fonksiyon üzerinden.
