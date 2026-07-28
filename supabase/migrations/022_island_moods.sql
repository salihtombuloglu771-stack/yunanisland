-- Ana sayfadaki "ruh haline göre" hızlı filtre için adalara gerçek mood etiketleri

alter table public.islands add column if not exists moods text[] not null default '{}';

update public.islands set moods = array['honeymoon', 'history'] where slug = 'santorini';
update public.islands set moods = array['nightlife', 'honeymoon'] where slug = 'mykonos';
update public.islands set moods = array['history', 'family'] where slug = 'rodos';
update public.islands set moods = array['nightlife', 'nature'] where slug = 'paros';
update public.islands set moods = array['nature', 'honeymoon'] where slug = 'milos';
update public.islands set moods = array['family', 'history'] where slug = 'kos';
update public.islands set moods = array['nature', 'family'] where slug = 'naxos';
update public.islands set moods = array['nature', 'family'] where slug = 'zakynthos';
