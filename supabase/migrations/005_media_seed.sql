insert into public.media (entity_type, entity_id, url, media_type)
select 'island', id, '/santorini.jpg', 'photo' from public.islands where slug = 'santorini'
union all
select 'island', id, '/mykonos.jpg', 'photo' from public.islands where slug = 'mykonos'
union all
select 'island', id, '/zakynthos.jpg', 'photo' from public.islands where slug = 'zakynthos'
union all
select 'island', id, '/kos.jpg', 'photo' from public.islands where slug = 'kos';
