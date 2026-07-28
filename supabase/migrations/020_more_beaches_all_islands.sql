-- Her adaya, mevcut plajlarla çakışmayan birkaç gerçek plaj daha ekler.
-- (İlk denemede Kamari/Perissa/Paradise/Elia/Agios Prokopios/Plaka/Golden Beach/
-- Kolymbithres/Anthony Quinn/Tsambika/Banana/Gerakas/Agios Stefanos'un zaten
-- 002/013 seed'lerinde farklı slug'larla var olduğu görüldü, bu yüzden sadece
-- gerçekten yeni olanlar eklendi.)

insert into public.beaches (island_id, name, slug, description, beach_type, water_depth, crowd_level, family_friendly, pet_friendly, blue_flag, sunbed_price, umbrella_price, has_parking, has_showers, has_toilets, has_beach_bar, has_lifeguard, sunset_rating, latitude, longitude)
select id, 'Vlychada Plajı', 'vlychada-plaji', 'Rüzgar ve suyla şekillenmiş beyaz kaya oluşumlarıyla ay yüzeyini andıran, sakin ve az kalabalık bir plaj.', 'sand', 'deep', 'low', true, false, false, 6, 5, true, true, true, true, false, 4, 36.3384, 25.4517 from public.islands where slug = 'santorini'
union all
select id, 'Super Paradise Beach', 'super-paradise-beach', 'Paradise''e komşu, hem aile dostu bölümü hem de canlı beach club sahnesiyle iki farklı atmosferi bir arada sunan popüler plaj.', 'sand', 'medium', 'high', true, false, false, 18, 12, true, true, true, true, true, 4, 37.4055, 25.3295 from public.islands where slug = 'mykonos'
union all
select id, 'Faliraki Plajı', 'faliraki-plaji', 'Rodos''un en canlı tatil beldelerinden birindeki, ince altın kumlu uzun plaj — su sporları ve gece hayatıyla ünlü.', 'sand', 'medium', 'high', true, false, true, 8, 6, true, true, true, true, true, 3, 36.3390, 28.2010 from public.islands where slug = 'rodos'
union all
select id, 'Santa Maria Plajı', 'santa-maria-plaji-paros', 'Beyaz kumu ve sığ turkuaz sularıyla ünlü, su sporları ve plaj barlarıyla canlı bir tatil plajı.', 'sand', 'shallow', 'high', true, false, true, 8, 6, true, true, true, true, true, 3, 37.1450, 25.2040 from public.islands where slug = 'paros'
union all
select id, 'Firiplaka Plajı', 'firiplaka-plaji', 'Renkli kayalıkları ve altın kumuyla ünlü, adanın güneyindeki en güzel plajlarından biri — hem sakin hem etkileyici manzaralı.', 'sand', 'medium', 'low', true, false, false, 6, 5, false, false, false, true, false, 4, 36.6890, 24.4390 from public.islands where slug = 'milos'
union all
select id, 'Tsigrado Plajı', 'tsigrado-plaji', 'Dik kayalıklar arasına sıkışmış, halat ve merdivenle inilen küçük ama muhteşem turkuaz sulu gizli bir koy.', 'sand', 'deep', 'low', false, false, false, null, null, false, false, false, false, false, 5, 36.6960, 24.4200 from public.islands where slug = 'milos'
union all
select id, 'Papafragas Plajı', 'papafragas-plaji', 'Dar bir kanyonla denize açılan, dik beyaz kayalıklar arasında saklı minik bir koy — Milos''un en fotojenik noktalarından.', 'sand', 'deep', 'low', false, false, false, null, null, true, false, false, false, false, 4, 36.7690, 24.4780 from public.islands where slug = 'milos'
union all
select id, 'Mastihari Plajı', 'mastihari-plaji', 'Sakin bir balıkçı köyünün kıyısında, sığ suları ve aile dostu atmosferiyle bilinen geniş kumsal.', 'sand', 'shallow', 'low', true, true, false, 5, 4, true, true, true, true, false, 3, 36.8890, 27.1720 from public.islands where slug = 'kos'
union all
select id, 'Mikri Vigla Plajı', 'mikri-vigla-plaji', 'İki koydan oluşan, biri sakin biri rüzgar sörfüne uygun dalgalı — çok yönlü bir plaj deneyimi sunuyor.', 'sand', 'medium', 'low', true, false, false, 5, 4, true, false, false, true, false, 4, 37.0170, 25.3610 from public.islands where slug = 'naxos'
union all
select id, 'Porto Limnionas', 'porto-limnionas', 'Dik kayalıklarla çevrili küçük bir koyda, derin turkuaz sularıyla ünlü sakin ve etkileyici bir plaj.', 'pebble', 'deep', 'low', false, false, false, 6, 5, true, false, false, true, false, 5, 37.7550, 20.6280 from public.islands where slug = 'zakynthos';
