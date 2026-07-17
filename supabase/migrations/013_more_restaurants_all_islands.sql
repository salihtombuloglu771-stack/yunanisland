-- Fills out restaurant coverage so every island has a budget/mid/expensive spread.

insert into public.restaurants (island_id, name, slug, cuisine, price_level, average_cost, opening_hours, phone, website, vegetarian, vegan, gluten_free, sea_view, outdoor_seating, family_friendly, latitude, longitude, cover_image_url)
select id, 'Kos Gyros Köşesi', 'kos-gyros-kosesi', 'Sokak Lezzetleri', 'budget', 10, '11:00 - 23:00', null, null, true, false, false, false, true, true, 36.8935, 27.2875, null from public.islands where slug = 'kos'
union all
select id, 'Petrino Restaurant', 'petrino-restaurant', 'Modern Yunan Mutfağı', 'expensive', 70, '19:00 - 23:30', null, null, true, true, true, true, true, false, 36.8945, 27.2865, null from public.islands where slug = 'kos'
union all
select id, 'Klima Ouzeri', 'klima-ouzeri', 'Meze & Ouzo', 'budget', 15, '12:00 - 22:00', null, null, true, false, false, true, true, true, 36.7180, 24.4280, null from public.islands where slug = 'milos'
union all
select id, 'Medousa Taverna', 'medousa-taverna', 'Ada Mutfağı', 'mid', 35, '18:00 - 23:00', null, null, true, false, false, false, true, true, 36.7260, 24.4370, null from public.islands where slug = 'milos'
union all
select id, 'Jimmy''s Gyros', 'jimmys-gyros', 'Sokak Lezzetleri', 'budget', 8, '11:00 - 02:00', null, null, false, false, false, false, true, true, 37.4470, 25.3260, null from public.islands where slug = 'mykonos'
union all
select id, 'Alea Restaurant', 'alea-restaurant', 'Gurme Akdeniz', 'expensive', 55, '19:30 - 23:30', null, null, true, true, false, false, true, false, 37.1035, 25.3755, null from public.islands where slug = 'naxos'
union all
select id, 'Happy Green Bay Snack Bar', 'happy-green-bay-snack-bar', 'Plaj Atıştırmalıkları', 'budget', 12, '10:00 - 20:00', null, null, true, true, false, true, true, true, 37.0100, 25.2050, null from public.islands where slug = 'paros'
union all
select id, 'Barbarossa Ouzeri', 'barbarossa-ouzeri', 'Meze & Deniz Ürünleri', 'mid', 30, '18:00 - 00:00', null, null, true, false, false, true, true, true, 37.1245, 25.2375, null from public.islands where slug = 'paros'
union all
select id, 'Rodos Gyro Point', 'rodos-gyro-point', 'Sokak Lezzetleri', 'budget', 9, '11:00 - 23:00', null, null, false, false, false, false, true, true, 36.4420, 28.2230, null from public.islands where slug = 'rodos'
union all
select id, 'Alexis 4 Seasons', 'alexis-4-seasons', 'Deniz Ürünleri & Gurme', 'expensive', 65, '19:00 - 23:30', null, null, false, false, true, true, true, false, 36.4510, 28.2270, null from public.islands where slug = 'rodos'
union all
select id, 'Lucky''s Souvlakis', 'luckys-souvlakis', 'Sokak Lezzetleri', 'budget', 8, '10:00 - 01:00', null, null, false, false, false, false, true, true, 36.4165, 25.4325, null from public.islands where slug = 'santorini'
union all
select id, 'Cameo Taverna', 'cameo-taverna', 'Geleneksel Yunan', 'budget', 15, '12:00 - 23:00', null, null, true, false, false, true, true, true, 37.7900, 20.8900, null from public.islands where slug = 'zakynthos';
