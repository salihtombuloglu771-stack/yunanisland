-- Her adaya, mevcut restoranlarla çakışmayan iki restoran daha ekleyerek çeşitliliği artırır.

insert into public.restaurants (island_id, name, slug, cuisine, price_level, average_cost, opening_hours, phone, website, vegetarian, vegan, gluten_free, sea_view, outdoor_seating, family_friendly, latitude, longitude, cover_image_url)
select id, 'Kaldera Işıkları', 'kaldera-isiklari', 'Gurme Akdeniz', 'expensive', 85, '19:00 - 23:30', null, null, true, true, true, true, true, false, 36.4610, 25.3760 , null from public.islands where slug = 'santorini'
union all
select id, 'Yiannis Ouzerisi', 'yiannis-ouzerisi', 'Meze & Ouzo', 'budget', 14, '12:00 - 24:00', null, null, true, false, false, false, true, true, 36.4180, 25.4320 , null from public.islands where slug = 'santorini'
union all
select id, 'Bakalo Taverna', 'bakalo-taverna', 'Geleneksel Kiklad Mutfağı', 'mid', 32, '18:00 - 23:00', null, null, true, false, false, false, true, true, 37.4470, 25.3255 , null from public.islands where slug = 'mykonos'
union all
select id, 'Interni Restaurant', 'interni-restaurant', 'Modern Akdeniz', 'expensive', 75, '19:30 - 24:00', null, null, true, true, false, false, true, false, 37.4448, 25.3268 , null from public.islands where slug = 'mykonos'
union all
select id, 'Marco Polo Mansion', 'marco-polo-mansion', 'Gurme Akdeniz', 'expensive', 65, '19:00 - 23:00', null, null, true, false, true, false, true, false, 36.4460, 28.2255 , null from public.islands where slug = 'rodos'
union all
select id, 'Ammos Beach Bar', 'ammos-beach-bar-rodos', 'Deniz Ürünleri', 'mid', 30, '10:00 - 23:00', null, null, false, false, false, true, true, true, 36.3400, 28.2020 , null from public.islands where slug = 'rodos'
union all
select id, 'Levantis Restaurant', 'levantis-restaurant', 'Gurme Akdeniz', 'expensive', 60, '19:00 - 23:30', null, null, true, true, true, false, true, false, 37.0850, 25.1500 , null from public.islands where slug = 'paros'
union all
select id, 'Siparos Taverna', 'siparos-taverna', 'Geleneksel Kiklad Mutfağı', 'mid', 28, '18:30 - 23:00', null, null, true, false, false, true, true, true, 37.1245, 25.2375 , null from public.islands where slug = 'paros'
union all
select id, 'Armenaki Taverna', 'armenaki-taverna', 'Deniz Ürünleri', 'mid', 35, '18:00 - 23:00', null, null, false, false, false, true, true, true, 36.7280, 24.4400 , null from public.islands where slug = 'milos'
union all
select id, 'Alisachni', 'alisachni', 'Gurme Ege Mutfağı', 'expensive', 70, '19:30 - 23:30', null, null, true, true, true, true, true, false, 36.7350, 24.4405 , null from public.islands where slug = 'milos'
union all
select id, 'Ambavris Taverna', 'ambavris-taverna', 'Geleneksel Ege Mutfağı', 'mid', 26, '18:30 - 23:00', null, null, true, false, false, false, true, true, 36.8790, 27.2920 , null from public.islands where slug = 'kos'
union all
select id, 'Nonna Sofia', 'nonna-sofia', 'İtalyan-Yunan Füzyon', 'mid', 30, '18:00 - 23:30', null, null, true, false, false, false, true, true, 36.8935, 27.2900 , null from public.islands where slug = 'kos'
union all
select id, 'To Elliniko', 'to-elliniko-naxos', 'Geleneksel Ege Mutfağı', 'budget', 16, '12:00 - 22:30', null, null, true, false, false, false, true, true, 37.1055, 25.3765 , null from public.islands where slug = 'naxos'
union all
select id, 'Palatia Taverna', 'palatia-taverna', 'Deniz Ürünleri', 'mid', 32, '18:00 - 23:00', null, null, false, false, false, true, true, true, 37.1095, 25.3715 , null from public.islands where slug = 'naxos'
union all
select id, 'Sarakina Bay Restaurant', 'sarakina-bay-restaurant', 'Deniz Ürünleri', 'mid', 34, '12:00 - 23:00', null, null, false, false, false, true, true, true, 37.7900, 20.8970 , null from public.islands where slug = 'zakynthos'
union all
select id, 'To Kanoni', 'to-kanoni', 'Geleneksel Yunan Mutfağı', 'budget', 15, '11:00 - 23:00', null, null, true, false, false, false, true, true, 37.7920, 20.8990 , null from public.islands where slug = 'zakynthos';
