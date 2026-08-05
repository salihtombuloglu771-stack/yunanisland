-- Yeni 3 gerçek ada: Girit (Crete), Korfu (Corfu), Kefalonya (Kefalonia)
-- Her adaya: TR/EN/EL içerik, FAQ, mood, 4 plaj, 3 restoran, 2 otel, 5 gezilecek yer.
--
-- Kapak fotoğrafları — Wikimedia Commons (özgür lisanslı, ticari kullanımda attribution gerekebilir):
--   public/girit.jpg          — "Chania - Venetian harbor 2.jpg", Lapplaender, CC BY-SA 3.0 de
--                                https://commons.wikimedia.org/wiki/File:Chania_-_Venetian_harbor_2.jpg
--   public/korfu.jpg          — "Corfu Old Fortress R02.jpg", Marc Ryckaert (MJJR), CC BY 3.0
--                                https://commons.wikimedia.org/wiki/File:Corfu_Old_Fortress_R02.jpg
--   public/kefalonya.jpg      — "Myrtos Beach, Kefalonia.jpg", Matt Sims, CC BY 2.0
--                                https://commons.wikimedia.org/wiki/File:Myrtos_Beach,_Kefalonia.jpg
--
-- Attraction fotoğrafları — Wikimedia Commons (özgür lisanslı):
--   knossos-sarayi              — "Ruins of the Minoan Palace in Knossos.jpg", CC BY-SA 4.0
--   samarya-kanyonu              — "Samaria Gorge, Crete (150857) (9450576425).jpg", CC BY 2.0
--   hanya-venedik-limani         — "Chania, old harbour with lighthouse 2019.jpg", CC BY-SA 4.0
--   rethymno-kalesi               — "Kreta (GR), Rethymno, Fortezza -- 2023 -- 8239.jpg", CC BY-SA 4.0
--   spinalonga-adasi              — "Spinalonga - Sept 2019 a.jpg", CC BY-SA 4.0
--   korfu-eski-kalesi             — "Corfu Old Fortress R09.jpg", Marc Ryckaert (MJJR), CC BY 3.0
--   akhilleion-sarayi             — "Korfu (GR), Gastouri, Achilleion -- 2018 -- 1312.jpg", CC BY-SA 4.0
--   aziz-spyridon-kilisesi        — "Korfu (GR), Korfu, Altstadt, St.-Spiridon-Kirche -- 2018 -- 1161.jpg", CC BY-SA 4.0
--   ask-kanali-sidari             — "Sidari, Corfu, Canal d'Amour (248847007).jpg", CC BY 3.0
--   paleokastritsa-manastiri      — "Corfu Paleokastritsa Monastery R03.jpg", CC BY 3.0
--   melissani-magarasi            — "Melissani Cave, Kefalonia 1.jpg", CC BY 2.0
--   drogarati-magarasi            — "Druipsteengrot op Kefalonia.JPG", CC BY-SA 3.0
--   assos-koyu-venedik-kalesi     — "Asos Castle Cephalonia Greece.jpg", CC BY-SA 4.0
--   fiskardo-koyu                 — "Lighthouse Fiskardo.jpg", CC BY-SA 4.0
--   myrtos-plaji-manzara-noktasi  — "Myrtos Beach 5 (9344634826).jpg", Tony Hisgett, CC BY 2.0
--
-- Bu migration çalıştırılmadı — sadece dosya hazırlandı (Supabase erişimi bu oturumda yok).

-- ============================================================
-- ISLANDS
-- ============================================================
insert into public.islands (name, slug, description, history, population, latitude, longitude, best_time_to_visit, budget_level, cover_image_url, is_published) values
('Girit', 'girit', 'Yunanistan''ın en büyük adası; zengin Minos uygarlığı mirası, etkileyici dağları, uzun plajları ve canlı şehirleriyle bilinir.', 'Avrupa''nın en eski gelişmiş uygarlıklarından Minos uygarlığının beşiği olan Girit''te, bu döneme ait Knossos Sarayı hâlâ ayakta durur. Ada sırasıyla Roma, Bizans, Venedik ve Osmanlı egemenliğinde kaldıktan sonra 1913''te modern Yunan devletine katılmıştır.', 620000, 35.2401, 24.8093, 'Mayıs - Ekim', 'mid', '/girit.jpg', true),
('Korfu', 'korfu', 'Yeşil manzaraları, Venedik mimarisiyle bezeli eski şehri ve İyon Denizi''nin en romantik koylarıyla ünlü bir ada.', 'Antik çağda Korkyra olarak bilinen Korfu, yüzyıllar boyunca Venedik yönetiminde kalmış ve Yunanistan''ın büyük bölümünden farklı olarak hiçbir zaman Osmanlı egemenliğine girmemiştir — bu da adaya belirgin bir Avrupa mimarisi ve kültürü kazandırmıştır. Eski Kale bölgesi UNESCO Dünya Mirası listesindedir.', 104000, 39.6243, 19.9217, 'Mayıs - Eylül', 'mid', '/korfu.jpg', true),
('Kefalonya', 'kefalonya', 'İyon Denizi''nin en büyük adası; turkuaz koyları, gizemli mağaraları ve doğal güzellikleriyle tanınır.', 'Ada, 1953''teki yıkıcı depremde tarihi mimarisinin büyük kısmını kaybetmiş, İkinci Dünya Savaşı sırasında ise İtalyan işgal garnizonuyla ilgili trajik bir olaya sahne olmuştur. Bugün her şeyden önce eşsiz doğal güzellikleriyle öne çıkmaktadır.', 35000, 38.1755, 20.4881, 'Haziran - Eylül', 'mid', '/kefalonya.jpg', true);

update public.islands set
  description_en = 'Greece''s largest island, cradle of the ancient Minoan civilization, known for its dramatic mountains, long beaches and vibrant cities.',
  history_en = 'Crete was the heart of Europe''s earliest advanced civilization, the Minoans, whose palace at Knossos still stands today. The island later passed through Roman, Byzantine, Venetian and Ottoman rule before joining the modern Greek state in 1913.',
  best_time_to_visit_en = 'May - October',
  description_el = 'Το μεγαλύτερο νησί της Ελλάδας, λίκνο του μινωικού πολιτισμού, γνωστό για τα εντυπωσιακά βουνά, τις μακριές παραλίες και τις ζωντανές πόλεις του.',
  history_el = 'Η Κρήτη υπήρξε η καρδιά του πρώτου προηγμένου πολιτισμού της Ευρώπης, του μινωικού, με το ανάκτορο της Κνωσού να στέκεται ακόμη σήμερα. Το νησί πέρασε αργότερα από ρωμαϊκή, βυζαντινή, ενετική και οθωμανική κυριαρχία, προτού ενσωματωθεί στο σύγχρονο ελληνικό κράτος το 1913.',
  best_time_to_visit_el = 'Μάιος - Οκτώβριος'
where slug = 'girit';

update public.islands set
  description_en = 'An island famed for its lush green scenery, Venetian-flavored old town and some of the most romantic coves in the Ionian Sea.',
  history_en = 'Known in antiquity as Korkyra, Corfu spent centuries under Venetian rule and, unlike most of Greece, was never conquered by the Ottomans — leaving it with a distinctly European architecture and culture. Its Old Town is a UNESCO World Heritage Site.',
  best_time_to_visit_en = 'May - September',
  description_el = 'Ένα νησί φημισμένο για την καταπράσινη φύση του, την ενετική παλιά πόλη του και μερικούς από τους πιο ρομαντικούς όρμους του Ιονίου Πελάγους.',
  history_el = 'Γνωστή στην αρχαιότητα ως Κόρκυρα, η Κέρκυρα πέρασε αιώνες υπό ενετική κυριαρχία και, σε αντίθεση με το μεγαλύτερο μέρος της Ελλάδας, δεν κατακτήθηκε ποτέ από τους Οθωμανούς — κάτι που της χάρισε μια ξεχωριστά ευρωπαϊκή αρχιτεκτονική και κουλτούρα. Η Παλιά Πόλη της είναι Μνημείο Παγκόσμιας Κληρονομιάς της UNESCO.',
  best_time_to_visit_el = 'Μάιος - Σεπτέμβριος'
where slug = 'korfu';

update public.islands set
  description_en = 'The largest island in the Ionian Sea, known for its turquoise coves, mysterious caves and outstanding natural beauty.',
  history_en = 'The island lost much of its historic architecture in the devastating 1953 earthquake and was also the site of a tragic WWII episode involving the Italian occupying garrison. Today it is celebrated above all for its natural beauty.',
  best_time_to_visit_en = 'June - September',
  description_el = 'Το μεγαλύτερο νησί του Ιονίου Πελάγους, γνωστό για τους τιρκουάζ όρμους του, τα μυστηριώδη σπήλαιά του και την εξαιρετική φυσική ομορφιά του.',
  history_el = 'Το νησί έχασε μεγάλο μέρος της ιστορικής αρχιτεκτονικής του στον καταστροφικό σεισμό του 1953 και υπήρξε επίσης σκηνή ενός τραγικού επεισοδίου του Β'' Παγκοσμίου Πολέμου με την ιταλική φρουρά κατοχής. Σήμερα ξεχωρίζει πάνω απ'' όλα για τη φυσική του ομορφιά.',
  best_time_to_visit_el = 'Ιούνιος - Σεπτέμβριος'
where slug = 'kefalonya';

update public.islands set moods = array['history', 'nature'] where slug = 'girit';
update public.islands set moods = array['honeymoon', 'nature'] where slug = 'korfu';
update public.islands set moods = array['nature', 'family'] where slug = 'kefalonya';

update public.islands set faqs = '[
  {"question": "Girit''e ulaşım nasıl sağlanır?", "answer": "Heraklion ve Hanya''da uluslararası havalimanları bulunur; ayrıca Atina (Pire) limanından gece feribotuyla da ulaşılabilir."},
  {"question": "Girit ne kadar büyük, kaç günde gezilir?", "answer": "Yunanistan''ın en büyük adası olan Girit''i (yaklaşık 260 km uzunluğunda) rahatça gezmek için en az 5-7 gün önerilir."},
  {"question": "Knossos Sarayı''nı ziyaret etmek için rehber şart mı?", "answer": "Şart değildir ama sarayın karmaşık yapısı ve tarihi nedeniyle rehberli tur, ziyareti çok daha anlamlı hale getirir."}
]'::jsonb where slug = 'girit';

update public.islands set faqs = '[
  {"question": "Korfu''ya Yunanistan''ın diğer bölgelerinden nasıl ulaşılır?", "answer": "Korfu''nun kendi uluslararası havalimanı vardır; Patras ve İgumenitsa limanlarından da feribot seferleri mevcuttur."},
  {"question": "Korfu diğer Yunan adalarından mimari olarak neden farklı?", "answer": "Osmanlı egemenliği görmediği için Venedik, Fransız ve İngiliz mimari izlerini yoğun biçimde taşır."},
  {"question": "Korfu balayı için uygun mu?", "answer": "Evet, sakin koyları, lüks butik otelleri ve romantik gün batımı noktalarıyla popüler bir balayı destinasyonudur."}
]'::jsonb where slug = 'korfu';

update public.islands set faqs = '[
  {"question": "Kefalonya''ya nasıl gidilir?", "answer": "Kefalonya''nın Argostoli yakınında kendi havalimanı vardır; Patras ve Killini limanlarından feribotla da ulaşılabilir."},
  {"question": "Myrtos Plajı''na inmek zor mu?", "answer": "Plaja inen yol dik virajlıdır ve zeminde çakıl taşları vardır, ancak yol üzerindeki manzara noktasından da nefes kesici bir görünüm izlenebilir."},
  {"question": "Kefalonya aileler için uygun mu?", "answer": "Evet, sakin köyleri, doğal mağaraları ve geniş plajlarıyla aile dostu bir tatil sunar."}
]'::jsonb where slug = 'kefalonya';

-- ============================================================
-- BEACHES (4 per island, description_en/description_el dahil)
-- ============================================================
insert into public.beaches (island_id, name, slug, description, description_en, description_el, beach_type, water_depth, crowd_level, family_friendly, pet_friendly, blue_flag, sunbed_price, umbrella_price, has_parking, has_showers, has_toilets, has_beach_bar, has_lifeguard, accessibility, sunset_rating, latitude, longitude, cover_image_url)
select id, 'Elafonisi Plajı', 'elafonisi-plaji', 'Pembemsi kumu ve sığ turkuaz laguniyle ünlü, adanın güneybatısındaki koruma altında bir doğa harikası plaj.', 'Famous for its pinkish sand and shallow turquoise lagoon, this protected nature reserve in southwest Crete is one of the island''s most photographed beaches.', 'Διάσημη για τη ροζ άμμο και τη ρηχή τιρκουάζ λιμνοθάλασσά της, αυτή η προστατευόμενη περιοχή στα νοτιοδυτικά της Κρήτης είναι μία από τις πιο φωτογραφημένες παραλίες του νησιού.', 'sand', 'shallow', 'high', true, false, false, 6, 5, true, true, true, true, false, 'Uzun toprak yoldan araçla, sonrasında kısa yürüyüş', 5, 35.2725, 23.5350, null from public.islands where slug = 'girit'
union all
select id, 'Balos Lagünü', 'balos-laguni', 'Gramvousa Yarımadası''nın ucunda, turkuaz-mavi tonlarının iç içe geçtiği muhteşem bir lagün — tekne turlarıyla ya da toprak yolla ulaşılıyor.', 'At the tip of the Gramvousa Peninsula, a stunning lagoon where shades of turquoise and blue blend together — reached by boat tour or a rough dirt road.', 'Στην άκρη της χερσονήσου Γραμβούσας, μια εκπληκτική λιμνοθάλασσα όπου συναντιούνται αποχρώσεις τιρκουάζ και μπλε — προσβάσιμη με βαρκάδα ή χωματόδρομο.', 'sand', 'shallow', 'high', false, false, false, null, null, false, false, false, false, false, 'Zorlu toprak yol veya tekne turu, son bölüm yürüyerek', 5, 35.5464, 23.5942, null from public.islands where slug = 'girit'
union all
select id, 'Vai Plajı', 'vai-plaji', 'Avrupa''nın en büyük doğal palmiye ormanının kıyısında uzanan, egzotik bir atmosfere sahip altın kumlu plaj.', 'Golden sands fringed by Europe''s largest natural palm forest give this beach an exotic, tropical atmosphere.', 'Η χρυσή άμμος περιτριγυρισμένη από το μεγαλύτερο φυσικό φοινικόδασος της Ευρώπης προσδίδει σε αυτή την παραλία μια εξωτική, τροπική ατμόσφαιρα.', 'sand', 'shallow', 'medium', true, false, true, 6, 5, true, true, true, true, true, 'Otoparktan kısa yürüyüş, düz zemin', 4, 35.2908, 26.2564, null from public.islands where slug = 'girit'
union all
select id, 'Preveli Plajı', 'preveli-plaji', 'Palmiye ağaçlarıyla çevrili bir nehrin Libya Denizi''ne kavuştuğu, doğal güzelliğiyle büyüleyen bir koy.', 'A palm-lined river meets the Libyan Sea at this beach, creating one of Crete''s most enchanting natural landscapes.', 'Ένα ποτάμι περιτριγυρισμένο από φοίνικες συναντά τη Λιβυκή Θάλασσα σε αυτή την παραλία, δημιουργώντας ένα από τα πιο μαγευτικά φυσικά τοπία της Κρήτης.', 'pebble', 'medium', 'medium', false, false, false, 5, 4, true, false, false, true, false, 'Otoparktan yaklaşık 15 dakikalık merdivenli yürüyüş', 4, 35.1436, 24.4694, null from public.islands where slug = 'girit'
union all
select id, 'Paleokastritsa Plajı', 'paleokastritsa-plaji', 'Yeşil tepelerle çevrili, küçük koylardan oluşan, Korfu''nun en fotojenik kıyı şeridi.', 'Surrounded by green hills and made up of a series of small coves, this is Corfu''s most photogenic stretch of coastline.', 'Περιτριγυρισμένη από πράσινους λόφους και αποτελούμενη από μια σειρά μικρών όρμων, είναι η πιο φωτογενής ακτογραμμή της Κέρκυρας.', 'mixed', 'medium', 'high', true, false, true, 10, 7, true, true, true, true, true, 'Kolay erişim, ana yola yakın', 4, 39.6706, 19.7186, null from public.islands where slug = 'korfu'
union all
select id, 'Glyfada Plajı', 'glyfada-plaji-korfu', 'Altın kumu, sığ berrak suları ve canlı plaj barlarıyla Korfu''nun en popüler tatil plajlarından biri.', 'With golden sand, shallow clear waters and lively beach bars, this is one of Corfu''s most popular resort beaches.', 'Με χρυσή άμμο, ρηχά καθαρά νερά και ζωντανά beach bar, είναι μία από τις πιο δημοφιλείς παραλίες θέρετρα της Κέρκυρας.', 'sand', 'shallow', 'high', true, false, true, 12, 8, true, true, true, true, true, 'Düz ayak, kolay erişilebilir', 4, 39.5850, 19.8283, null from public.islands where slug = 'korfu'
union all
select id, 'Aşk Kanalı Plajı (Sidari)', 'ask-kanali-plaji', 'Rüzgar ve suyun aşındırdığı kumtaşı kayalıklar arasında dar bir kanal oluşturan, efsaneye göre birlikte yüzenleri sonsuza dek birleştiren ünlü bir doğa harikası.', 'Wind and water have carved a narrow channel through sandstone cliffs here — legend says couples who swim through it together will stay together forever.', 'Ο άνεμος και το νερό έχουν σμιλέψει ένα στενό κανάλι μέσα σε βράχους από ψαμμίτη — ο θρύλος λέει πως τα ζευγάρια που κολυμπούν μαζί μέσα από αυτό θα μείνουν για πάντα ενωμένα.', 'sand', 'medium', 'high', true, false, false, 8, 6, true, true, true, true, false, 'Kayalıklardan dikkatli yürüyüş gerekiyor', 4, 39.7908, 19.6967, null from public.islands where slug = 'korfu'
union all
select id, 'Porto Timoni', 'porto-timoni-plaji', 'Dar bir kara şeridiyle ayrılan iki koydan oluşan, sadece yürüyüş parkuruyla ulaşılabilen nefes kesici bir manzara.', 'Two coves separated by a narrow strip of land, reachable only by a hiking trail — one of Corfu''s most breathtaking viewpoints.', 'Δύο όρμοι που χωρίζονται από μια στενή λωρίδα γης, προσβάσιμοι μόνο μέσω μονοπατιού πεζοπορίας — ένα από τα πιο εντυπωσιακά σημεία θέας της Κέρκυρας.', 'pebble', 'deep', 'low', false, false, false, null, null, false, false, false, false, false, 'Sadece 30-40 dakikalık patika yürüyüşüyle ulaşılabiliyor', 5, 39.7139, 19.6822, null from public.islands where slug = 'korfu'
union all
select id, 'Myrtos Plajı', 'myrtos-plaji', 'Dik beyaz kayalıklar arasında, parlak beyaz çakılları ve derin turkuaz suyuyla Yunanistan''ın en çok fotoğraflanan plajlarından biri.', 'Framed by steep white cliffs, with brilliant white pebbles and deep turquoise water, this is one of Greece''s most photographed beaches.', 'Πλαισιωμένη από απόκρημνους λευκούς βράχους, με λαμπερά λευκά βότσαλα και βαθιά τιρκουάζ νερά, είναι μία από τις πιο φωτογραφημένες παραλίες της Ελλάδας.', 'pebble', 'deep', 'high', true, false, true, 8, 6, true, true, true, true, true, 'Dik virajlı yoldan araçla iniş, otopark mevcut', 5, 38.3167, 20.5333, null from public.islands where slug = 'kefalonya'
union all
select id, 'Antisamos Plajı', 'antisamos-plaji', 'Yemyeşil tepelerle çevrili, "Benim Adım Korelli" filminde de yer alan çakıl-kum karışımı bir koy.', 'Ringed by lush green hills, this pebble-and-sand cove featured in the film "Captain Corelli''s Mandolin."', 'Περιτριγυρισμένος από καταπράσινους λόφους, αυτός ο όρμος με βότσαλα και άμμο εμφανίστηκε στην ταινία «Το Μαντολίνο του Λοχαγού Κορέλι».', 'mixed', 'medium', 'medium', true, false, false, 6, 5, true, true, true, true, false, 'Otoparktan kısa yürüyüş', 4, 38.2814, 20.6592, null from public.islands where slug = 'kefalonya'
union all
select id, 'Xi Plajı', 'xi-plaji', 'Kırmızımsı kumu ve kil kayalıklarıyla adanın diğer plajlarından farklılaşan sığ ve aile dostu bir plaj.', 'Distinguished by its reddish sand and clay cliffs, this shallow beach stands apart from the island''s other beaches and is ideal for families.', 'Ξεχωρίζει με την κοκκινωπή άμμο και τους πήλινους βράχους της, αυτή η ρηχή παραλία είναι ιδανική για οικογένειες.', 'sand', 'shallow', 'medium', true, true, false, 6, 5, true, true, true, true, true, 'Düz ayak, kolay erişilebilir', 3, 38.1667, 20.5667, null from public.islands where slug = 'kefalonya'
union all
select id, 'Petani Plajı', 'petani-plaji', 'Paliki Yarımadası''nda, dik kayalıklarla çevrili, Myrtos kadar etkileyici ama daha az kalabalık bir koy.', 'On the Paliki Peninsula, framed by steep cliffs, this cove rivals Myrtos in beauty but draws far fewer crowds.', 'Στη χερσόνησο Παλική, πλαισιωμένος από απόκρημνους βράχους, αυτός ο όρμος συναγωνίζεται σε ομορφιά τον Μύρτο αλλά προσελκύει πολύ λιγότερο κόσμο.', 'pebble', 'deep', 'low', true, false, false, 6, 5, true, false, false, true, false, 'Dik yoldan araçla iniş', 5, 38.2394, 20.4794, null from public.islands where slug = 'kefalonya';

-- ============================================================
-- RESTAURANTS (3 per island, cuisine_en/cuisine_el dahil)
-- ============================================================
insert into public.restaurants (island_id, name, slug, cuisine, cuisine_en, cuisine_el, price_level, average_cost, opening_hours, phone, website, vegetarian, vegan, gluten_free, sea_view, outdoor_seating, family_friendly, latitude, longitude, cover_image_url)
select id, 'Portes Tavernası', 'portes-tavernasi', 'Geleneksel Girit Mutfağı', 'Traditional Cretan Cuisine', 'Παραδοσιακή Κρητική Κουζίνα', 'mid', 30, '12:00 - 23:00', null, null, true, false, false, false, true, true, 35.5145, 24.0175, null from public.islands where slug = 'girit'
union all
select id, 'Dakos Meze Evi', 'dakos-meze-evi', 'Meze & Rakı', 'Meze & Raki', 'Μεζέδες & Ρακί', 'budget', 18, '11:00 - 24:00', null, null, true, true, false, false, true, true, 35.3387, 25.1442, null from public.islands where slug = 'girit'
union all
select id, 'Limani Balık Restoranı', 'limani-balik-restorani-girit', 'Deniz Ürünleri', 'Seafood', 'Θαλασσινά', 'expensive', 55, '18:00 - 23:30', null, null, false, false, true, true, true, true, 35.5130, 24.0165, null from public.islands where slug = 'girit'
union all
select id, 'Venetsia Taverna', 'venetsia-taverna', 'Geleneksel Korfu Mutfağı', 'Traditional Corfiot Cuisine', 'Παραδοσιακή Κερκυραϊκή Κουζίνα', 'mid', 32, '18:00 - 23:30', null, null, true, false, false, false, true, true, 39.6238, 19.9223, null from public.islands where slug = 'korfu'
union all
select id, 'Bella Venezia Restaurant', 'bella-venezia-restaurant', 'İtalyan-Yunan Füzyon', 'Italian-Greek Fusion', 'Ιταλο-ελληνική Φιούζον', 'expensive', 48, '19:00 - 23:00', null, null, true, true, true, false, true, false, 39.6252, 19.9198, null from public.islands where slug = 'korfu'
union all
select id, 'Paleokastritsa Balık Tavernası', 'paleokastritsa-balik-tavernasi', 'Deniz Ürünleri', 'Seafood', 'Θαλασσινά', 'mid', 35, '12:00 - 23:00', null, null, false, false, false, true, true, true, 39.6710, 19.7192, null from public.islands where slug = 'korfu'
union all
select id, 'Tselentata Taverna', 'tselentata-taverna', 'Geleneksel Kefalonya Mutfağı', 'Traditional Kefalonian Cuisine', 'Παραδοσιακή Κεφαλλονίτικη Κουζίνα', 'mid', 28, '12:00 - 23:00', null, null, true, false, false, false, true, true, 38.1758, 20.4885, null from public.islands where slug = 'kefalonya'
union all
select id, 'Fiskardo Liman Restoranı', 'fiskardo-liman-restorani', 'Deniz Ürünleri & Akdeniz', 'Seafood & Mediterranean', 'Θαλασσινά & Μεσογειακή', 'expensive', 50, '18:00 - 23:30', null, null, false, false, false, true, true, true, 38.4660, 20.5810, null from public.islands where slug = 'kefalonya'
union all
select id, 'Myrtos Kahvaltı & Kafe', 'myrtos-kahvalti-kafe', 'Kafe & Hafif Yemekler', 'Café & Light Meals', 'Καφέ & Ελαφρύ Φαγητό', 'budget', 15, '08:00 - 19:00', null, null, true, true, true, true, true, true, 38.3050, 20.5250, null from public.islands where slug = 'kefalonya';

-- ============================================================
-- HOTELS (2 per island — sadece TR description, mevcut şema pattern'i)
-- ============================================================
insert into public.hotels (island_id, name, slug, category, description, price_range, affiliate_link, latitude, longitude, cover_image_url)
select id, 'Kastro Butik Otel', 'kastro-butik-otel-girit', 'luxury', 'Hanya''nın tarihi Venedik Limanı''na yürüme mesafesinde, taş duvarları ve özel havuzlu süitleriyle butik bir konaklama deneyimi.', '220-450 €/gece', null, 35.5142, 24.0172, null from public.islands where slug = 'girit'
union all
select id, 'Heraklion Merkez Otel', 'heraklion-merkez-otel', 'mid-range', 'Heraklion şehir merkezinde, Girit''i keşfetmek için ideal konumda konforlu bir aile oteli.', '70-120 €/gece', null, 35.3400, 25.1350, null from public.islands where slug = 'girit'
union all
select id, 'Kerkyra Sarayı Butik Otel', 'kerkyra-sarayi-butik-otel', 'luxury', 'Korfu Eski Kalesi manzaralı, Venedik mimarisiyle restore edilmiş tarihi bir konak oteli.', '250-480 €/gece', null, 39.6248, 19.9230, null from public.islands where slug = 'korfu'
union all
select id, 'Paleokastritsa Konukevi', 'paleokastritsa-konukevi', 'mid-range', 'Paleokastritsa koylarına yakın, deniz manzaralı odalarıyla sakin bir aile pansiyonu.', '90-150 €/gece', null, 39.6715, 19.7200, null from public.islands where slug = 'korfu'
union all
select id, 'Argostoli Körfez Resort', 'argostoli-korfez-resort', 'luxury', 'Argostoli körfezine hakim, infinity havuzu ve spa merkeziyle lüks bir tatil köyü.', '200-400 €/gece', null, 38.1740, 20.4870, null from public.islands where slug = 'kefalonya'
union all
select id, 'Fiskardo Liman Evi', 'fiskardo-liman-evi', 'mid-range', 'Fiskardo''nun renkli liman evlerinden birinde, samimi atmosferli butik bir pansiyon.', '85-140 €/gece', null, 38.4655, 20.5800, null from public.islands where slug = 'kefalonya';

-- ============================================================
-- ATTRACTIONS (5 per island, description_en/description_el baştan dolu)
-- ============================================================
insert into public.attractions (island_id, name, slug, category, description, description_en, description_el, opening_hours, ticket_price, latitude, longitude, cover_image_url)
select id, 'Knossos Sarayı', 'knossos-sarayi', 'archaeological', 'Avrupa''nın en eski şehir uygarlığı olan Minos uygarlığının başkenti; efsanevi Kral Minos''un sarayı ve Labirent mitinin geçtiği yer olarak kabul edilir.', 'The capital of Europe''s earliest urban civilization, the Minoans; believed to be the palace of the legendary King Minos and the setting of the myth of the Labyrinth.', 'Η πρωτεύουσα του πρώτου αστικού πολιτισμού της Ευρώπης, του μινωικού· θεωρείται το ανάκτορο του θρυλικού βασιλιά Μίνωα και ο τόπος του μύθου του Λαβυρίνθου.', '08:00 - 20:00 (yaz)', '15€', 35.2977, 25.1628, '/attractions/knossos-sarayi.jpg' from public.islands where slug = 'girit'
union all
select id, 'Samarya Kanyonu', 'samarya-kanyonu', 'nature', 'Avrupa''nın en uzun kanyonlarından biri; 16 km''lik dik kayalıklar arasındaki yürüyüş parkuruyla doğaseverlerin gözdesi.', 'One of the longest gorges in Europe — a 16 km hiking trail through towering rock walls, a favorite among nature lovers.', 'Ένα από τα μεγαλύτερα φαράγγια της Ευρώπης — ένα μονοπάτι πεζοπορίας 16 χιλιομέτρων ανάμεσα σε επιβλητικούς βράχους, αγαπημένο των λάτρεων της φύσης.', '07:00 - 15:00 (Mayıs-Ekim, hava koşullarına bağlı)', '5€', 35.3167, 23.9500, '/attractions/samarya-kanyonu.jpg' from public.islands where slug = 'girit'
union all
select id, 'Hanya Venedik Limanı', 'hanya-venedik-limani', 'landmark', 'Venedik döneminden kalma taş binaları, tarihi deniz feneri ve rengarenk tekneleriyle Girit''in en romantik liman manzarası.', 'With its Venetian-era stone buildings, historic lighthouse and colorful boats, this is Crete''s most romantic harbor scene.', 'Με τα ενετικά πέτρινα κτίριά του, τον ιστορικό φάρο και τις πολύχρωμες βάρκες, είναι η πιο ρομαντική λιμενική εικόνα της Κρήτης.', '7/24 açık', 'Ücretsiz', 35.5138, 24.0180, '/attractions/hanya-venedik-limani.jpg' from public.islands where slug = 'girit'
union all
select id, 'Rethymno Kalesi (Fortezza)', 'rethymno-kalesi', 'castle', '16. yüzyılda Venedikliler tarafından şehri korsan saldırılarından korumak için inşa edilen, tepeden şehir ve deniz manzarası sunan devasa bir kale.', 'A massive 16th-century Venetian fortress built to protect the city from pirate raids, offering panoramic views over the town and sea.', 'Ένα τεράστιο ενετικό φρούριο του 16ου αιώνα, χτισμένο για να προστατεύει την πόλη από πειρατικές επιδρομές, με πανοραμική θέα στην πόλη και τη θάλασσα.', '08:30 - 20:00', '4€', 35.3707, 24.4795, '/attractions/rethymno-kalesi.jpg' from public.islands where slug = 'girit'
union all
select id, 'Spinalonga Adası', 'spinalonga-adasi', 'landmark', 'Osmanlı döneminde kale, 20. yüzyılın ilk yarısında ise Avrupa''nın son cüzam kolonisi olarak kullanılan, tekneyle ulaşılan gizemli bir ada.', 'Once an Ottoman fortress and later Europe''s last leper colony in the early 20th century, this mysterious island is reached by boat.', 'Κάποτε οθωμανικό φρούριο και αργότερα η τελευταία λεπροαποικία της Ευρώπης στις αρχές του 20ού αιώνα, αυτό το μυστηριώδες νησί προσεγγίζεται με σκάφος.', '09:00 - 17:00', '16€ (tekne dahil ortalama)', 35.2999, 25.7391, '/attractions/spinalonga-adasi.jpg' from public.islands where slug = 'girit'
union all
select id, 'Korfu Eski Kalesi', 'korfu-eski-kalesi', 'castle', 'Bizans döneminden kalma, Venediklilerin genişlettiği, şehrin simgesi haline gelmiş deniz kalesi.', 'A Byzantine-era sea fortress later expanded by the Venetians, now the emblem of Corfu Town.', 'Ένα βυζαντινό θαλάσσιο φρούριο που αργότερα επεκτάθηκε από τους Ενετούς, σήμερα το έμβλημα της πόλης της Κέρκυρας.', '08:00 - 20:00', '6€', 39.6243, 19.9257, '/attractions/korfu-eski-kalesi.jpg' from public.islands where slug = 'korfu'
union all
select id, 'Akhilleion Sarayı', 'akhilleion-sarayi', 'museum', 'Avusturya İmparatoriçesi Sisi için 19. yüzyılda inşa edilen, Aşil mitolojisinden ilham alan heykel ve bahçeleriyle ünlü saray.', 'Built in the 19th century for Empress Elisabeth (Sisi) of Austria, this palace is famous for its gardens and statues inspired by the myth of Achilles.', 'Χτισμένο τον 19ο αιώνα για την αυτοκράτειρα Σίσσυ της Αυστρίας, αυτό το ανάκτορο είναι διάσημο για τους κήπους και τα αγάλματά του εμπνευσμένα από τον μύθο του Αχιλλέα.', '08:00 - 19:00', '10€', 39.5333, 19.9333, '/attractions/akhilleion-sarayi.jpg' from public.islands where slug = 'korfu'
union all
select id, 'Aziz Spyridon Kilisesi', 'aziz-spyridon-kilisesi', 'church', 'Adanın koruyucu azizi Aziz Spyridon''un kalıntılarını barındıran, kırmızı kubbeli çan kulesiyle Korfu Şehri''nin en tanınmış kilisesi.', 'Home to the relics of Saint Spyridon, the island''s patron saint, this church with its red-domed bell tower is Corfu Town''s most recognizable landmark.', 'Φιλοξενεί τα λείψανα του Αγίου Σπυρίδωνα, προστάτη του νησιού· με τον κόκκινο τρούλο του καμπαναριού, είναι το πιο αναγνωρίσιμο ορόσημο της πόλης της Κέρκυρας.', '07:00 - 21:00', 'Ücretsiz', 39.6238, 19.9219, '/attractions/aziz-spyridon-kilisesi.jpg' from public.islands where slug = 'korfu'
union all
select id, 'Aşk Kanalı (Sidari)', 'ask-kanali-sidari', 'viewpoint', 'Kumtaşı kayalıklar arasında rüzgar ve suyun oyduğu dar bir su kanalı — efsaneye göre birlikte yüzen çiftler sonsuza dek birlikte kalır.', 'A narrow water channel carved through sandstone cliffs by wind and water — legend holds that couples who swim through it together stay together forever.', 'Ένα στενό υδάτινο κανάλι σκαλισμένο σε βράχους από ψαμμίτη από τον άνεμο και το νερό — ο θρύλος λέει ότι τα ζευγάρια που το διασχίζουν κολυμπώντας μαζί μένουν για πάντα ενωμένα.', '7/24 açık', 'Ücretsiz', 39.7908, 19.6967, '/attractions/ask-kanali-sidari.jpg' from public.islands where slug = 'korfu'
union all
select id, 'Paleokastritsa Manastırı', 'paleokastritsa-manastiri', 'church', '13. yüzyılda kurulan, çarpıcı koy manzarasına hakim tepede yer alan, ikonlar ve el yazmalarıyla ünlü bir Ortodoks manastırı.', 'Founded in the 13th century and perched on a hilltop with a stunning view over the bay, this Orthodox monastery is known for its icons and manuscripts.', 'Ιδρύθηκε τον 13ο αιώνα και βρίσκεται σε έναν λόφο με εκπληκτική θέα στον κόλπο· αυτή η ορθόδοξη μονή είναι γνωστή για τις εικόνες και τα χειρόγραφά της.', '07:00 - 20:00', 'Ücretsiz (bağış kabul edilir)', 39.6717, 19.7194, '/attractions/paleokastritsa-manastiri.jpg' from public.islands where slug = 'korfu'
union all
select id, 'Melissani Mağarası', 'melissani-magarasi', 'nature', 'Çatısı çökmüş, gün ışığının turkuaz gölü aydınlattığı büyülü bir yeraltı mağara gölü — kayıkla gezilebiliyor.', 'A magical underground lake cave with a collapsed roof that lets sunlight illuminate its turquoise waters — explored by rowboat.', 'Μια μαγευτική υπόγεια λίμνη-σπηλιά με καταρρευμένη οροφή που επιτρέπει στο φως του ήλιου να φωτίζει τα τιρκουάζ νερά της — εξερευνάται με βάρκα.', '09:00 - 19:00 (yaz)', '9€', 38.2814, 20.6294, '/attractions/melissani-magarasi.jpg' from public.islands where slug = 'kefalonya'
union all
select id, 'Drogarati Mağarası', 'drogarati-magarasi', 'nature', '150 milyon yıllık sarkıt ve dikitleriyle ünlü, mükemmel akustiği sayesinde zaman zaman konserlere de ev sahipliği yapan devasa bir mağara.', 'Famous for its 150-million-year-old stalactites and stalagmites, this vast cave has exceptional acoustics and has even hosted concerts.', 'Διάσημο για τους σταλακτίτες και τους σταλαγμίτες ηλικίας 150 εκατομμυρίων ετών, αυτό το τεράστιο σπήλαιο έχει εξαιρετική ακουστική και έχει φιλοξενήσει ακόμη και συναυλίες.', '09:00 - 17:00', '5€', 38.1706, 20.6111, '/attractions/drogarati-magarasi.jpg' from public.islands where slug = 'kefalonya'
union all
select id, 'Assos Köyü ve Venedik Kalesi', 'assos-koyu-venedik-kalesi', 'village', 'Dar bir kara şeridiyle anakaraya bağlı küçük bir yarımadada kurulu, rengarenk evleri ve tepesindeki Venedik kalesi kalıntılarıyla resim gibi bir köy.', 'Set on a small peninsula connected to the mainland by a narrow strip of land, this picture-perfect village is known for its colorful houses and the ruins of a Venetian castle on the hill above.', 'Χτισμένο σε μια μικρή χερσόνησο που συνδέεται με την ξηρά μέσω μιας στενής λωρίδας γης, αυτό το γραφικό χωριό είναι γνωστό για τα πολύχρωμα σπίτια του και τα ερείπια ενετικού κάστρου στον λόφο από πάνω.', '7/24 açık (kale dıştan)', 'Ücretsiz', 38.3608, 20.5433, '/attractions/assos-koyu-venedik-kalesi.jpg' from public.islands where slug = 'kefalonya'
union all
select id, 'Fiskardo Köyü', 'fiskardo-koyu', 'village', '1953 depreminden hasar görmeden kurtulan, Venedik dönemi renkli evleri ve balıkçı limanıyla adanın en şirin köyü.', 'One of the few villages spared by the devastating 1953 earthquake, Fiskardo charms visitors with its colorful Venetian-era houses and fishing harbor.', 'Ένα από τα λίγα χωριά που γλίτωσαν από τον καταστροφικό σεισμό του 1953, το Φισκάρδο γοητεύει τους επισκέπτες με τα πολύχρωμα ενετικά σπίτια και το ψαρολίμανό του.', '7/24 açık', 'Ücretsiz', 38.4658, 20.5806, '/attractions/fiskardo-koyu.jpg' from public.islands where slug = 'kefalonya'
union all
select id, 'Myrtos Plajı Manzara Noktası', 'myrtos-plaji-manzara-noktasi', 'viewpoint', 'Kıvrımlı dağ yolunun üzerinden, aşağıdaki beyaz çakıllı Myrtos Plajı''nın tüm ihtişamıyla göründüğü, adanın en ünlü manzara noktası.', 'From this bend in the mountain road, the white pebbles of Myrtos Beach spread out below in full glory — the island''s most famous viewpoint.', 'Από αυτή τη στροφή του ορεινού δρόμου, τα λευκά βότσαλα της παραλίας Μύρτος απλώνονται από κάτω σε όλο τους το μεγαλείο — το πιο διάσημο σημείο θέας του νησιού.', '7/24 açık', 'Ücretsiz', 38.3167, 20.5333, '/attractions/myrtos-plaji-manzara-noktasi.jpg' from public.islands where slug = 'kefalonya';

-- ============================================================
-- Kapak görseli olmayan (bu migration'da eklenen) plaj/restoran/otel kayıtlarına
-- 023_generic_category_images.sql ile AYNI kategori->dosya eşlemesini kullanarak
-- jenerik kapak görseli atanıyor.
-- ============================================================
update public.beaches
set cover_image_url = case beach_type
  when 'sand' then '/generic/beach-sand.jpg'
  when 'pebble' then '/generic/beach-pebble.jpg'
  when 'mixed' then '/generic/beach-mixed.jpg'
end
where cover_image_url is null;

update public.restaurants
set cover_image_url = '/generic/restaurant-generic.jpg'
where cover_image_url is null;

update public.hotels
set cover_image_url = case category
  when 'budget' then '/generic/hotel-budget.jpg'
  when 'mid-range' then '/generic/hotel-midrange.jpg'
  when 'luxury' then '/generic/hotel-luxury.jpg'
end
where cover_image_url is null;
