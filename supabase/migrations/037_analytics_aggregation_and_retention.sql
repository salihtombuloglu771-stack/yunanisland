-- Analytics sayfası page_views/search_logs'u limitsiz çekip JS'te grupluyordu —
-- veri büyüdükçe sayfa yavaşlayıp çökebilirdi. SQL tarafında agregasyon yapan
-- iki RPC (get_trending_islands ile aynı desen) + eski kayıtları temizleyen
-- bir retention fonksiyonu (cron'dan çağrılacak).

create or replace function public.get_page_view_stats(p_since timestamptz, p_limit int default 15)
returns table (path text, view_count bigint)
language sql stable security definer as $$
  select path, count(*) as view_count
  from public.page_views
  where created_at >= p_since
  group by path
  order by view_count desc
  limit p_limit;
$$;

create or replace function public.get_search_query_stats(p_since timestamptz, p_limit int default 15)
returns table (query text, search_count bigint, total_results bigint)
language sql stable security definer as $$
  select lower(trim(query)) as query, count(*) as search_count, coalesce(sum(results_count), 0) as total_results
  from public.search_logs
  where created_at >= p_since and trim(query) <> ''
  group by lower(trim(query))
  order by search_count desc
  limit p_limit;
$$;

grant execute on function public.get_page_view_stats(timestamptz, int) to authenticated;
grant execute on function public.get_search_query_stats(timestamptz, int) to authenticated;

-- Retention: 90 günden eski page_views/search_logs kayıtlarını siler.
-- Cron'dan (src/app/api/cron/cleanup-analytics) service role ile çağrılıyor.
create or replace function public.cleanup_old_analytics()
returns void language sql security definer as $$
  delete from public.page_views where created_at < now() - interval '90 days';
  delete from public.search_logs where created_at < now() - interval '90 days';
$$;
