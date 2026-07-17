-- ============================================================
-- 3 NEW ISLANDS
-- ============================================================
insert into public.islands (name, slug, description, history, population, latitude, longitude, best_time_to_visit, budget_level, cover_image_url, is_published) values
('Rodos (Rhodes)', 'rodos', 'Ortaçağ Şövalyeler Kalesi''nin çevrelediği tarihi Eski Şehri, antik Lindos Akropolü ve uzun kumsallarıyla On İki Ada''nın en büyük ve en tarihi adası.', 'Antik çağda dünyanın yedi harikasından biri olan dev Rodos Heykeli (Colossus) burada yer alıyordu. Ortaçağda Aziz Yuhanna Şövalyeleri tarafından inşa edilen surlu Eski Şehir, UNESCO Dünya Mirası listesindedir.', 50000, 36.4341, 28.2176, 'Mayıs - Ekim', 'mid', null, true),
('Paros', 'paros', 'Naousa''nın balıkçı köyü atmosferi, Altın Plaj''ın rüzgar sörfü sahnesi ve beyaz mermer ocaklarıyla ünlü, sakin ama canlı bir Kiklad adası.', 'Antik çağda Paros mermeri (Parian mermer) heykeltıraşlar arasında dünyaca ünlüydü; Louvre''daki Venüs de Milo gibi pek çok ünlü heykel bu mermerden yapılmıştır.', 13700, 37.0853, 25.1488, 'Haziran - Eylül', 'mid', null, true),
('Milos', 'milos', 'Ay yüzeyini andıran beyaz volkanik kayalıkları, tekneyle ulaşılan gizli koyları ve rengarenk balıkçı köyleriyle Kiklad adaları arasında en fotojenik olanlardan biri.', 'Ünlü Venüs de Milo heykeli 1820''de bu adada bir çiftçi tarafından bulunmuştur. Ada, antik çağdan beri obsidyen (volkanik cam) madenciliğiyle de bilinir.', 5000, 36.7469, 24.4423, 'Haziran - Eylül', 'luxury', null, true);

-- ============================================================
-- MORE BEACHES (existing islands)
-- ============================================================
insert into public.beaches (island_id, name, slug, description, beach_type, water_depth, crowd_level, family_friendly, pet_friendly, blue_flag, sunbed_price, umbrella_price, has_parking, has_showers, has_toilets, has_beach_bar, has_lifeguard, accessibility, sunset_rating, latitude, longitude, cover_image_url)
select id, 'Perissa Plajı', 'perissa-beach', 'Santorini''nin en uzun sahillerinden biri, koyu siyah kumu ve sahil boyunca uzanan restoranlarıyla aileler için de uygun sakin bir plaj.', 'sand', 'medium', 'medium', true, true, true, 12, 5, true, true, true, true, true, 'Düz ayak, kolay erişilebilir', 3, 36.3494, 25.4633, null from public.islands where slug = 'santorini'
union all
select id, 'Paradise Plajı (Mykonos)', 'paradise-beach-mykonos', 'Plaj partileriyle ünlü, adanın en enerjik ve kalabalık plajlarından biri; gündüz güneşlenme, akşam müzikli eğlence bir arada.', 'sand', 'shallow', 'high', false, false, false, 35, 15, true, true, true, true, true, 'Orta zorlukta, dik bir yoldan iniliyor', 3, 37.3892, 25.3661, null from public.islands where slug = 'mykonos'
union all
select id, 'Gerakas Plajı', 'gerakas-beach', 'Caretta caretta deniz kaplumbağalarının yuvalama alanı olduğu için akşam saatlerinde erişimi kısıtlı, sakin ve korunaklı bir koy.', 'sand', 'shallow', 'low', true, false, true, null, null, true, false, false, false, false, 'Ahşap merdivenlerle iniliyor, orta zorlukta', 4, 37.7180, 20.9080, null from public.islands where slug = 'zakynthos'
union all
select id, 'Agios Prokopios Plajı', 'agios-prokopios-beach', 'Naxos''un defalarca Avrupa''nın en iyi plajları listesine giren, ince beyaz kumu ve sığ turkuaz deniziyle amiral gemisi plajı.', 'sand', 'shallow', 'medium', true, true, true, 10, 5, true, true, true, true, true, 'Düz ayak, kolay erişilebilir', 4, 37.0611, 25.3378, null from public.islands where slug = 'naxos'
union all
select id, 'Agios Stefanos Plajı (Kos)', 'agios-stefanos-beach-kos', 'Kefalos yakınında, hemen açıklarındaki küçük adacıkta yer alan bazilika kalıntılarıyla manzarası eşsiz, sakin bir plaj.', 'sand', 'shallow', 'low', true, true, false, 10, 5, true, false, false, true, false, 'Düz ayak, kolay erişilebilir', 5, 36.7280, 26.9950, null from public.islands where slug = 'kos'
union all
select id, 'Anthony Quinn Koyu', 'anthony-quinn-bay', 'Adını burada çekilen bir filmden alan, çakıllı kumsalı ve berrak çakıl taşlı sığ suyuyla dalış/şnorkel için ideal küçük koy.', 'pebble', 'medium', 'medium', true, false, false, 8, 5, true, true, true, true, false, 'Merdivenlerle iniliyor', 4, 36.3392, 28.2286, null from public.islands where slug = 'rodos'
union all
select id, 'Tsambika Plajı', 'tsambika-beach', 'Adanın en güzel plajlarından biri, ince altın kumu ve tepesindeki manastırıyla hem doğa hem kültür turu sunuyor.', 'sand', 'shallow', 'medium', true, true, true, 10, 5, true, true, true, true, true, 'Düz ayak, geniş otoparkı var', 4, 36.2075, 28.0503, null from public.islands where slug = 'rodos'
union all
select id, 'Elli Plajı', 'elli-beach', 'Rodos Şehri''nin hemen kenarında, şehir merkezine yürüme mesafesinde şık bir kent plajı.', 'sand', 'shallow', 'high', true, false, true, 15, 8, true, true, true, true, true, 'Şehir merkezinden yürüme mesafesi', 3, 36.4548, 28.2280, null from public.islands where slug = 'rodos'
union all
select id, 'Altın Plaj (Paros)', 'golden-beach-paros', 'Rüzgar sörfü ve kitesurf için Akdeniz''in önde gelen noktalarından biri, uzun altın kumsalıyla ünlü.', 'sand', 'medium', 'medium', true, true, true, 10, 5, true, true, true, true, false, 'Düz ayak, kolay erişilebilir', 4, 37.0139, 25.2100, null from public.islands where slug = 'paros'
union all
select id, 'Kolymbithres Plajı', 'kolymbithres-beach', 'Rüzgar ve suyun aşındırdığı doğal granit kaya oluşumlarının arasında küçük gizli koylar sunan sıra dışı bir plaj.', 'sand', 'shallow', 'low', true, true, false, null, null, true, false, false, true, false, 'Kayalık patikalardan iniliyor', 5, 37.1206, 25.1519, null from public.islands where slug = 'paros'
union all
select id, 'Sarakiniko Plajı', 'sarakiniko-beach', 'Ay yüzeyini andıran beyaz volkanik kayalıklarıyla dünyaca ünlü, plajdan çok doğal bir heykel bahçesini andıran eşsiz bir manzara.', 'mixed', 'deep', 'high', false, false, false, null, null, true, false, false, false, false, 'Kayalık, düz ayakkabı önerilir', 5, 36.7742, 24.4600, null from public.islands where slug = 'milos'
union all
select id, 'Kleftiko', 'kleftiko-beach', 'Sadece tekneyle ulaşılabilen, korsanların gizlendiği söylenen etkileyici kayalık oluşumlarla çevrili gizli koy.', 'pebble', 'deep', 'low', false, false, false, null, null, false, false, false, false, false, 'Sadece tekne turlarıyla ulaşılabilir', 5, 36.6942, 24.4292, null from public.islands where slug = 'milos';

-- ============================================================
-- MORE RESTAURANTS
-- ============================================================
insert into public.restaurants (island_id, name, slug, cuisine, price_level, average_cost, opening_hours, phone, website, vegetarian, vegan, gluten_free, sea_view, outdoor_seating, family_friendly, latitude, longitude, cover_image_url)
select id, 'Ammoudi Fish Tavern', 'ammoudi-fish-tavern', 'Taze Deniz Ürünleri', 'mid', 40, '12:00 - 22:00', null, null, false, false, true, true, true, true, 36.4225, 25.3958, null from public.islands where slug = 'santorini'
union all
select id, 'Nammos Beach Restaurant', 'nammos-beach-restaurant', 'Akdeniz & Gurme', 'expensive', 180, '12:00 - 01:00', null, null, true, true, true, true, true, false, 37.4158, 25.3378, null from public.islands where slug = 'mykonos'
union all
select id, 'Porto Zante Taverna', 'porto-zante-taverna', 'Geleneksel Yunan', 'mid', 30, '12:00 - 23:00', null, null, true, false, false, true, true, true, 37.7850, 20.8950, null from public.islands where slug = 'zakynthos'
union all
select id, 'Naxos Deniz Taverna', 'naxos-deniz-taverna', 'Ada Mutfağı & Izgara', 'budget', 20, '18:00 - 23:30', null, null, true, false, false, true, true, true, 37.1030, 25.3750, null from public.islands where slug = 'naxos'
union all
select id, 'Kos Liman Restoranı', 'kos-liman-restorani', 'Deniz Ürünleri & Meze', 'mid', 30, '11:00 - 23:00', null, null, true, false, true, true, true, true, 36.8920, 27.2870, null from public.islands where slug = 'kos'
union all
select id, 'Lindos Taverna', 'lindos-taverna', 'Geleneksel Rodos Mutfağı', 'mid', 32, '12:00 - 23:00', null, null, true, true, false, true, true, true, 36.0917, 28.0864, null from public.islands where slug = 'rodos'
union all
select id, 'Old Town Meyhanesi', 'old-town-meyhanesi', 'Akdeniz & Meze', 'mid', 28, '18:00 - 00:00', null, null, true, false, false, false, true, true, 36.4408, 28.2225, null from public.islands where slug = 'rodos'
union all
select id, 'Naousa Balıkçı Lokantası', 'naousa-balikci-lokantasi', 'Taze Balık & Deniz Ürünleri', 'expensive', 50, '19:00 - 00:00', null, null, false, false, true, true, true, false, 37.1243, 25.2380, null from public.islands where slug = 'paros'
union all
select id, 'Sirocco Milos', 'sirocco-milos', 'Modern Yunan Mutfağı', 'expensive', 60, '19:00 - 23:30', null, null, true, true, true, true, true, false, 36.7250, 24.4350, null from public.islands where slug = 'milos';

-- ============================================================
-- MORE HOTELS
-- ============================================================
insert into public.hotels (island_id, name, slug, category, description, price_range, affiliate_link, latitude, longitude, cover_image_url)
select id, 'Grace Santorini', 'grace-santorini', 'luxury', 'İmerovigli''de caldera manzaralı, sonsuzluk havuzuyla ödüllü bir butik otel.', '500-950 €/gece', null, 36.4262, 25.4275, null from public.islands where slug = 'santorini'
union all
select id, 'Mykonos Blu', 'mykonos-blu', 'luxury', 'Psarou plajına yakın, özel kabanalı geniş bir resort oteli.', '450-850 €/gece', null, 37.4175, 25.3392, null from public.islands where slug = 'mykonos'
union all
select id, 'Windmill Studios Naxos', 'windmill-studios-naxos', 'budget', 'Naxos Town''a yürüme mesafesinde, ekonomik ve samimi bir stüdyo daire tesisi.', '45-70 €/gece', null, 37.1042, 25.3765, null from public.islands where slug = 'naxos'
union all
select id, 'Rodos Palace Resort', 'rodos-palace-resort', 'luxury', 'İxia sahilinde, geniş konferans ve spa tesisleriyle büyük ölçekli bir resort otel.', '180-320 €/gece', null, 36.4180, 28.2085, null from public.islands where slug = 'rodos'
union all
select id, 'Lindos Village Hotel', 'lindos-village-hotel', 'mid-range', 'Lindos Akropolü''ne yürüme mesafesinde geleneksel mimarili konforlu bir otel.', '90-160 €/gece', null, 36.0900, 28.0850, null from public.islands where slug = 'rodos'
union all
select id, 'Paros Agnanti Resort', 'paros-agnanti-resort', 'mid-range', 'Naousa yakınında, geleneksel Kiklad mimarisiyle inşa edilmiş sakin bir tatil köyü.', '110-190 €/gece', null, 37.1200, 25.2350, null from public.islands where slug = 'paros'
union all
select id, 'Milos Cove Suites', 'milos-cove-suites', 'luxury', 'Adaya özgü volkanik mimariyle tasarlanmış, özel havuzlu süit konsept butik otel.', '350-600 €/gece', null, 36.7300, 24.4400, null from public.islands where slug = 'milos';

-- ============================================================
-- MORE FERRY ROUTES
-- ============================================================
insert into public.ferry_routes (from_port, to_port, companies, duration_minutes, price_min, price_max) values
('Atina (Pire)', 'Rodos', array['Blue Star Ferries'], 900, 70, 130),
('Rodos', 'Atina (Pire)', array['Blue Star Ferries'], 900, 70, 130),
('Atina (Pire)', 'Paros', array['Blue Star Ferries', 'Seajets'], 300, 45, 85),
('Paros', 'Atina (Pire)', array['Blue Star Ferries', 'Seajets'], 300, 45, 85),
('Atina (Pire)', 'Milos', array['Blue Star Ferries'], 420, 45, 90),
('Milos', 'Atina (Pire)', array['Blue Star Ferries'], 420, 45, 90),
('Paros', 'Naxos', array['Seajets', 'Blue Star Ferries'], 45, 15, 30),
('Naxos', 'Paros', array['Seajets', 'Blue Star Ferries'], 45, 15, 30),
('Santorini', 'Milos', array['Seajets'], 195, 40, 75),
('Milos', 'Santorini', array['Seajets'], 195, 40, 75);

-- ============================================================
-- FAQS FOR NEW ISLANDS
-- ============================================================
update public.islands set faqs = '[
  {"question": "Rodos''ta Eski Şehir''i gezmek ne kadar sürer?", "answer": "Ortaçağ surlarıyla çevrili Eski Şehir''i yüzeysel gezmek yarım gün, detaylı gezmek (müzeler dahil) tam bir gün alır."},
  {"question": "Rodos''a Türkiye''den nasıl ulaşılır?", "answer": "Marmaris''ten düzenli feribot seferleri bulunur, yaz aylarında seyahat süresi yaklaşık 1-1.5 saattir."}
]'::jsonb where slug = 'rodos';

update public.islands set faqs = '[
  {"question": "Paros hangi adalara yakın?", "answer": "Paros, Kiklad adalarının merkezinde yer alır; Naxos''a feribotla sadece 45 dakika, Mykonos ve Santorini''ye de kolay bağlantısı vardır — ada turlama rotalarında sık tercih edilir."},
  {"question": "Naousa''da ne yapılır?", "answer": "Naousa''nın rengarenk balıkçı limanı, akşam yürüyüşü ve deniz ürünleri restoranlarıyla adanın en canlı köyüdür."}
]'::jsonb where slug = 'paros';

update public.islands set faqs = '[
  {"question": "Sarakiniko Plajı''na nasıl ulaşılır?", "answer": "Milos''un ana limanı Adamas''a araçla yaklaşık 10 dakika mesafededir, kendi aracınızla veya taksiyle kolayca ulaşılır."},
  {"question": "Milos neden pahalı bir ada?", "answer": "Son yıllarda dünya çapında popülerlik kazanan Milos''ta konaklama kapasitesi sınırlı kaldığından, özellikle Temmuz-Ağustos''ta fiyatlar hızla artmıştır."}
]'::jsonb where slug = 'milos';
