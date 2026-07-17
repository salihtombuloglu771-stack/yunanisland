-- Seed data — moves the previous mock data (src/lib/mockData.ts) into real tables.

insert into public.islands (name, slug, description, history, population, latitude, longitude, best_time_to_visit, budget_level, cover_image_url, is_published) values
('Santorini', 'santorini', 'Eşsiz gün batımı, mavi kubbeli kiliseleri ve volkanik caldera manzarasıyla ünlü, Ege''nin en romantik ve popüler adası.', 'Antik çağda Thera olarak bilinen Santorini, M.Ö. 1600 civarında gerçekleşen tarihin en büyük volkanik patlamalarından biriyle bugünkü hilal şeklini almıştır. Bazı teorisyenler kayıp kıta Atlantis''in burası olduğunu iddia eder.', 15550, 36.3932, 25.4615, 'Eylül - Ekim', 'luxury', '/santorini.jpg', true),
('Mykonos', 'mykonos', 'Kozmopolit gece hayatı, tarihi yel değirmenleri, labirent gibi sokakları ve turkuaz renkli plajları ile ünlü eğlence adası.', 'Yunan mitolojisine göre Mykonos, Herakles tarafından öldürülen devlerin petrikleşmiş bedenlerinden oluşmuştur. Adını ise Apollon''un torunu Mykons''tan almıştır. 1950''lerden sonra sanatçılar ve ünlüler için bir çekim merkezi haline gelmiştir.', 10134, 37.4467, 25.3689, 'Temmuz - Ağustos', 'luxury', '/mykonos.jpg', true),
('Zakynthos', 'zakynthos', 'Büyüleyici Navagio (Batık) Plajı, devasa kireçtaşı uçurumları ve caretta caretta kaplumbağaları ile ünlü İyon Denizi cenneti.', 'Zakynthos (veya Zante), yüzyıllar boyunca Venedik egemenliği altında kalmış ve "Doğu''nun Çiçeği" (Fior di Levante) olarak adlandırılmıştır. İtalyan mimarisi ve müzikal gelenekleri adanın kültüründe derin izler bırakmıştır.', 40759, 37.7870, 20.8999, 'Haziran - Eylül', 'mid', '/zakynthos.jpg', true),
('Naxos', 'naxos', 'Geniş kumsalları, antik Apollon Tapınağı kapısı (Portara) ve lezzetli yerel tarım ürünleriyle öne çıkan, aileler için ideal büyük ada.', 'Kiklad takımadalarının en büyüğü olan Naxos, mitolojide Zeus''un büyütüldüğü yer olarak bilinir. Ayrıca Theseus''un Minotaur''u öldürdükten sonra Ariadne''yi bıraktığı adadır. Ortaçağda Venedik Dükalığı''nın merkezi olmuştur.', 18938, 37.1009, 25.3767, 'Haziran - Eylül', 'budget', null, true),
('Kos (İstanköy)', 'kos', 'Tıbbın babası Hipokrat''ın doğum yeri olan, zengin tarihi kalıntıları, geniş bisiklet yolları ve uzun kumsallarıyla bilinen popüler Kiklad/Oniki Ada üyesi.', 'Antik çağda Asclepeion (dünyanın ilk tıp okulu ve şifa merkezi) burada kurulmuştur. Hipokrat''ın öğrencilerine gölgesinde ders anlattığına inanılan tarihi Hipokrat Ağacı adanın merkezinde yer alır. Ada uzun süre Osmanlı ve İtalyan egemenliğinde kalmıştır.', 33388, 36.8931, 27.2880, 'Haziran - Eylül', 'mid', '/kos.jpg', true);

insert into public.beaches (island_id, name, slug, description, beach_type, water_depth, crowd_level, family_friendly, pet_friendly, blue_flag, sunbed_price, umbrella_price, has_parking, has_showers, has_toilets, has_beach_bar, has_lifeguard, accessibility, sunset_rating, latitude, longitude, cover_image_url)
select id, 'Kızıl Plaj (Red Beach)', 'red-beach', 'Koyu kırmızı volkanik kayaların ve siyah kumların oluşturduğu, dünyada eşine az rastlanan nefes kesici bir plaj.', 'sand', 'deep', 'high', false, true, false, 25, 10, true, false, false, true, true, 'Zorlu, kayalık patikadan yürümek gerekiyor', 4, 36.3473, 25.3948, null from public.islands where slug = 'santorini'
union all
select id, 'Kamari Plajı', 'kamari-beach', 'Uzun siyah kumlu sahili, kristal suları ve sahil boyunca uzanan restoranları ile tam teşekküllü popüler bir plaj.', 'mixed', 'medium', 'high', true, true, true, 15, 5, true, true, true, true, true, 'Düz ayak, kolay erişilebilir', 3, 36.3762, 25.4851, null from public.islands where slug = 'santorini'
union all
select id, 'Psarou Plajı', 'psarou-beach', 'Ünlülerin uğrak noktası olan, lüks yatların demirlediği ve dünyaca ünlü plaj kulüplerinin bulunduğu popüler altın sarısı kumsal.', 'sand', 'shallow', 'high', true, false, true, 80, 40, true, true, true, true, true, 'Kolay erişim, özel vale otoparkı mevcut', 3, 37.4162, 25.3374, null from public.islands where slug = 'mykonos'
union all
select id, 'Elia Plajı', 'elia-beach', 'Mykonos''un en uzun kumsallarından biri. Daha sakin, geniş alanı ve berrak suları ile bilinir.', 'sand', 'medium', 'medium', true, true, false, 30, 15, true, true, true, true, false, 'Kolay erişim, halk otobüsleri ve su taksileri çalışıyor', 4, 37.4208, 25.3905, null from public.islands where slug = 'mykonos'
union all
select id, 'Navagio (Batık) Plajı', 'navagio-beach', 'Beyaz çakıllı kumsalı, kireçtaşı uçurumları ve ortasındaki eski batık gemisi ile dünyanın en ikonik plajlarından biri.', 'pebble', 'deep', 'high', false, false, false, null, null, false, false, false, false, false, 'Sadece deniz yoluyla, teknelerle ulaşılabilir', 5, 37.8594, 20.6247, '/zakynthos.jpg' from public.islands where slug = 'zakynthos'
union all
select id, 'Banana Plajı', 'banana-beach', 'Su sporları merkezleri, geniş kumsalı ve sığ denizi ile adanın en uzun ve eğlenceli organize plajı.', 'sand', 'shallow', 'medium', true, true, true, 15, 5, true, true, true, true, true, 'Oldukça kolay, geniş otoparkı var', 4, 37.7479, 20.9782, null from public.islands where slug = 'zakynthos'
union all
select id, 'Plaka Plajı', 'plaka-beach', 'Metrelerce uzanan ince kumları, arkasındaki koruma altındaki kum tepeleri ve turkuaz deniziyle Naxos''un en popüler plajı.', 'sand', 'shallow', 'medium', true, true, true, 15, 5, true, true, true, true, true, 'Kolay erişim, toprak yol sahil boyunca uzanır', 5, 37.0456, 25.3619, null from public.islands where slug = 'naxos'
union all
select id, 'Tigaki Plajı', 'tigaki-beach', 'İnce beyaz kumları, sığ denizi ve rüzgar sörfüne uygun yapısıyla özellikle çocuklu aileler için mükemmel bir plaj.', 'sand', 'shallow', 'medium', true, true, true, 10, 5, true, true, true, true, true, 'Düz ayak, tekerlekli sandalye erişimine uygun', 4, 36.8834, 27.1873, null from public.islands where slug = 'kos'
union all
select id, 'Paradise Plajı', 'paradise-beach', 'Adanın en ünlü plajlarından biri. Sudan çıkan doğal volkanik gaz kabarcıkları nedeniyle ''Bubble Beach'' olarak da bilinir.', 'sand', 'shallow', 'high', true, false, false, 15, 5, true, true, true, true, true, 'Oldukça kolay, tesisler hemen sahil kenarında', 3, 36.7821, 27.0234, null from public.islands where slug = 'kos';

insert into public.restaurants (island_id, name, slug, cuisine, price_level, average_cost, opening_hours, phone, website, vegetarian, vegan, gluten_free, sea_view, outdoor_seating, family_friendly, latitude, longitude, cover_image_url)
select id, 'Selene Restaurant', 'selene-restaurant', 'Modern Yunan & Gurme', 'expensive', 150, '18:00 - 23:30', '+30 22860 22249', 'https://selene.gr', true, true, true, true, true, false, 36.4192, 25.4312, null from public.islands where slug = 'santorini'
union all
select id, 'Metaxi Mas Taverna', 'metaxi-mas', 'Geleneksel Girit & Santorini', 'mid', 35, '13:00 - 23:00', '+30 22860 31323', 'https://www.santorini-metaximas.gr', true, false, true, false, true, true, 36.3861, 25.4542, null from public.islands where slug = 'santorini'
union all
select id, 'Spilia Deniz Kenarı Restoranı', 'spilia-seaside', 'Akdeniz & Taze Deniz Ürünleri', 'expensive', 120, '12:00 - 00:00', '+30 22890 71205', 'https://spilia-co.gr', false, false, true, true, true, true, 37.4194, 25.4093, null from public.islands where slug = 'mykonos'
union all
select id, 'Kiki''s Tavern', 'kikis-tavern', 'Odun Ateşinde Izgara & Meze', 'mid', 30, '12:30 - 18:30 (Elektriksiz mutfak)', null, null, true, false, false, true, true, true, 37.4801, 25.3582, null from public.islands where slug = 'mykonos'
union all
select id, 'Nobelos Bio Restaurant', 'nobelos-bio', 'Organik Akdeniz & Deniz Ürünleri', 'expensive', 80, '09:00 - 23:00', '+30 26950 31132', 'https://www.nobelos.gr', true, true, true, true, true, true, 37.9152, 20.6974, null from public.islands where slug = 'zakynthos'
union all
select id, 'Axiotissa Taverna', 'axiotissa', 'Yöresel Naxos Mutfağı', 'mid', 25, '13:00 - 23:00', '+30 22850 75107', null, true, true, false, false, true, true, 37.0289, 25.3854, null from public.islands where slug = 'naxos'
union all
select id, 'Oromedon Restoran', 'oromedon', 'Geleneksel Oniki Ada Lezzetleri', 'mid', 30, '12:00 - 23:30', '+30 22420 69983', 'https://oromedon.com', true, false, true, true, true, true, 36.8482, 27.2045, null from public.islands where slug = 'kos';

insert into public.ferry_routes (from_port, to_port, companies, duration_minutes, price_min, price_max) values
('Bodrum', 'Kos', array['Yesil Marmaris Lines', 'Makri Travel', 'Exas Shipping'], 20, 20, 35),
('Kos', 'Bodrum', array['Yesil Marmaris Lines', 'Makri Travel', 'Exas Shipping'], 20, 20, 35),
('Atina (Pire)', 'Kos', array['Blue Star Ferries'], 510, 60, 120),
('Kos', 'Atina (Pire)', array['Blue Star Ferries'], 510, 60, 120),
('Santorini', 'Kos', array['Seajets'], 240, 45, 80),
('Kos', 'Santorini', array['Seajets'], 240, 45, 80),
('Rhodes', 'Kos', array['Dodekanisos Seaways', 'Blue Star Ferries'], 150, 30, 55),
('Kos', 'Rhodes', array['Dodekanisos Seaways', 'Blue Star Ferries'], 150, 30, 55);

insert into public.categories (name, slug, description) values
('Gezi İpuçları', 'gezi-ipuclari', 'Yunan Adaları''nda seyahat ederken bilinmesi gerekenler'),
('Bütçe Seyahat', 'butce-seyahat', 'Ekonomik gezi önerileri ve tasarruf ipuçları'),
('En İyi Plajlar', 'en-iyi-plajlar', 'Ada ada en güzel plaj listeleri'),
('Ada Karşılaştırmaları', 'ada-karsilastirmalari', 'Hangi ada kime göre — karşılaştırmalı rehberler');

insert into public.articles (title, slug, content, category_id, is_published, published_at)
select 'Santorini vs Mykonos: Hangi Ada Size Göre?', 'santorini-vs-mykonos',
'Yunanistan''a giden pek çok gezgin bu iki adadan birini seçmekte zorlanır. Santorini, romantik gün batımları ve caldera manzarasıyla çiftler için idealdir; Mykonos ise kozmopolit gece hayatı ve enerjik plaj kulüpleriyle daha genç ve eğlence odaklı bir kitleye hitap eder. Bütçe açısından her iki ada da Yunanistan''ın en pahalı bölgeleri arasında yer alır. Sakin bir balayı arıyorsanız Santorini, arkadaş grubuyla parti temalı bir tatil istiyorsanız Mykonos daha uygun olacaktır.',
id, true, now() from public.categories where slug = 'ada-karsilastirmalari'
union all
select 'Yunan Adalarında Bütçe Dostu Gezi İçin 10 İpucu', 'butce-dostu-gezi-ipuclari',
'Yunan adalarını uygun bütçeyle gezmek mümkün. Yüksek sezon yerine Haziran başı veya Eylül sonunu tercih edin, feribotları erken rezerve edin, yerel taverna''larda öğle menülerini değerlendirin ve daha az bilinen adaları (Naxos, Paros gibi) keşfedin. Konaklamada apart otel veya pansiyon seçenekleri, otellere göre önemli tasarruf sağlar.',
id, true, now() from public.categories where slug = 'butce-seyahat'
union all
select 'Ege''nin En İyi 10 Plajı', 'egenin-en-iyi-10-plaji',
'Navagio''nun ikonik batık gemisinden Santorini''nin volkanik Kızıl Plajı''na kadar, Yunan adaları dünyanın en etkileyici kıyı şeritlerinden bazılarına ev sahipliği yapıyor. Bu listede aile dostu sakin koylardan hareketli beach club''lara kadar farklı zevklere uygun plajları bir araya getirdik.',
id, true, now() from public.categories where slug = 'en-iyi-plajlar';
