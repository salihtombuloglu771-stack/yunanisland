-- Her adaya 5 gerçek, tanınmış gezilecek yer (toplam 40)

insert into public.attractions (island_id, name, slug, category, description, opening_hours, ticket_price, latitude, longitude)
select id, 'Akrotiri Arkeolojik Alanı', 'akrotiri-arkeolojik-alani', 'archaeological', 'M.Ö. 17. yüzyılda volkanik külle örtülüp korunmuş, "Ege''nin Pompeii''si" olarak anılan Minos dönemi yerleşimi. Sokaklar, üç katlı binalar ve renkli fresklerle çok iyi korunmuş bir Tunç Çağı kenti.', '08:00 - 20:00 (yaz)', '12€', 36.3506, 25.4030 from public.islands where slug = 'santorini'
union all
select id, 'Oia Kalesi Gün Batımı Noktası', 'oia-kalesi-gun-batimi', 'viewpoint', 'Santorini''nin en ünlü gün batımı manzarası — beyaz badanalı evler, mavi kubbeli kiliseler ve kaldera manzarasıyla dünyanın en çok fotoğraflanan noktalarından biri.', '7/24 açık', 'Ücretsiz', 36.4617, 25.3753 from public.islands where slug = 'santorini'
union all
select id, 'Eski Thira Antik Kenti', 'eski-thira-antik-kenti', 'archaeological', 'Mesa Vouno dağının tepesinde, Dor, Helenistik ve Roma dönemlerinden kalma antik kent kalıntıları — muhteşem bir deniz manzarasıyla birlikte.', '08:30 - 15:00', '6€', 36.3477, 25.4535 from public.islands where slug = 'santorini'
union all
select id, 'Panagia Episkopi Kilisesi', 'panagia-episkopi-kilisesi', 'church', 'Mesa Gonia köyünde, 1052 yılına dayanan Bizans dönemi kilisesi — adanın en eski ve en önemli dini yapılarından biri.', '09:00 - 13:00, 17:00 - 20:00', 'Ücretsiz', 36.3665, 25.4550 from public.islands where slug = 'santorini'
union all
select id, 'Santo Wines Şarap Müzesi', 'santo-wines-sarap-muzesi', 'museum', 'Pyrgos köyü üstünde, kaldera manzaralı bir şarap bağı ve müze — Santorini''nin volkanik topraklarda yetişen Assyrtiko üzümünden yapılan şaraplarını tadım eşliğinde tanıtıyor.', '10:00 - 21:00', 'Tadım paketleri 15€''den başlıyor', 36.3775, 25.4390 from public.islands where slug = 'santorini'
union all
select id, 'Kato Mili Yel Değirmenleri', 'kato-mili-yel-degirmenleri', 'landmark', 'Mykonos Şehri''nin simgesi haline gelen, 16. yüzyıldan kalma beyaz yel değirmenleri — adanın en çok fotoğraflanan noktası.', '7/24 açık (dıştan)', 'Ücretsiz', 37.4425, 25.3260 from public.islands where slug = 'mykonos'
union all
select id, 'Little Venice (Alefkandra)', 'little-venice-alefkandra', 'landmark', 'Evlerin balkonları doğrudan denize açılan, renkli cepheleriyle ünlü tarihi mahalle — gün batımını izlemek için popüler kafeleriyle bilinir.', '7/24 açık', 'Ücretsiz', 37.4432, 25.3243 from public.islands where slug = 'mykonos'
union all
select id, 'Panagia Paraportiani Kilisesi', 'panagia-paraportiani-kilisesi', 'church', 'Beş ayrı kilisenin birbirine kaynaşmasıyla oluşan, kireç badanalı organik formuyla Yunanistan''ın en çok fotoğraflanan kiliselerinden biri.', '7/24 açık (dıştan)', 'Ücretsiz', 37.4442, 25.3255 from public.islands where slug = 'mykonos'
union all
select id, 'Delos Antik Kenti', 'delos-antik-kenti', 'archaeological', 'Mykonos''tan tekneyle ulaşılan, UNESCO Dünya Mirası listesindeki bu ıssız ada, Apollon''un doğum yeri kabul edilir ve antik Yunan''ın en önemli kutsal merkezlerinden biriydi.', '08:30 - 15:30 (Pazartesi kapalı)', '12€ + tekne bileti', 37.3967, 25.2717 from public.islands where slug = 'mykonos'
union all
select id, 'Armenistis Feneri', 'armenistis-feneri', 'viewpoint', 'Adanın kuzey ucunda, 1891''den kalma tarihi deniz feneri — Ege Denizi''ne nefes kesen bir manzara sunuyor.', '7/24 açık (dıştan)', 'Ücretsiz', 37.4966, 25.3502 from public.islands where slug = 'mykonos'
union all
select id, 'Rodos Ortaçağ Şehri & Büyük Üstat Sarayı', 'rodos-ortacag-sehri-buyuk-ustat-sarayi', 'castle', 'UNESCO Dünya Mirası listesindeki, Ortaçağ''dan kalma surlarla çevrili eski şehir ve Aziz Yuhanna Şövalyeleri''nin görkemli sarayı.', '08:00 - 20:00', '10€', 36.4447, 28.2265 from public.islands where slug = 'rodos'
union all
select id, 'Lindos Akropolü', 'lindos-akropolu', 'archaeological', 'Beyaz köy Lindos''un üstünde, kayalık bir tepede yükselen antik Atena Lindia Tapınağı kalıntıları — muhteşem koy manzarasıyla birlikte.', '08:00 - 17:00', '12€', 36.0917, 28.0864 from public.islands where slug = 'rodos'
union all
select id, 'Kelebekler Vadisi (Petaloudes)', 'kelebekler-vadisi-rodos', 'nature', 'Yaz aylarında binlerce Jersey kaplan güvesinin toplandığı, gölgeli ve serin bir vadi — yürüyüş parkurlarıyla popüler bir doğa noktası.', '08:30 - 18:00 (Haziran-Eylül)', '5€', 36.6167, 27.8500 from public.islands where slug = 'rodos'
union all
select id, 'Rodos Antik Şehir Surları', 'rodos-antik-sehir-surlari', 'landmark', 'Şövalyeler döneminden kalma, dünyanın en iyi korunmuş ortaçağ surlarından biri — hendek boyunca yürüyüş turu yapılabiliyor.', '09:00 - 15:00 (tur saatleri)', '3€', 36.4500, 28.2270 from public.islands where slug = 'rodos'
union all
select id, 'Yedi Kaynaklar (Epta Piges)', 'yedi-kaynaklar-epta-piges', 'nature', 'Yedi doğal kaynağın bir araya geldiği, çınar ağaçlarıyla gölgeli serin bir vadi — karanlık bir tünelden geçerek küçük bir göle ulaşılıyor.', '08:00 - 20:00', 'Ücretsiz', 36.3167, 27.9500 from public.islands where slug = 'rodos'
union all
select id, 'Panagia Ekatontapiliani Kilisesi', 'panagia-ekatontapiliani-kilisesi', 'church', '"Yüz Kapılı Kilise" anlamına gelen, 4. yüzyıla dayanan Yunanistan''ın en eski Hristiyan kiliselerinden biri — Parikia''nın merkezinde.', '07:30 - 21:00', 'Ücretsiz', 37.0847, 25.1497 from public.islands where slug = 'paros'
union all
select id, 'Naoussa Eski Liman Kalesi', 'naoussa-eski-liman-kalesi', 'landmark', 'Naoussa''nın balıkçı limanının girişinde, Venedik döneminden kalma yarı batık kale kalıntısı — akşamları balıkçı tekneleriyle ünlü bir manzara.', '7/24 açık', 'Ücretsiz', 37.1240, 25.2370 from public.islands where slug = 'paros'
union all
select id, 'Kelebekler Vadisi (Petaloudes, Paros)', 'kelebekler-vadisi-paros', 'nature', 'Yaz aylarında binlerce kelebeğin toplandığı, manastır bahçesi içinde yeşil ve serin bir vadi.', '09:00 - 20:00 (Haziran-Eylül)', '2€', 37.0333, 25.1500 from public.islands where slug = 'paros'
union all
select id, 'Lefkes Dağ Köyü', 'lefkes-dag-koyu', 'village', 'Adanın eski başkenti — mermer taş döşeli dar sokakları, geleneksel Kiklad mimarisi ve panoramik vadi manzarasıyla ünlü bir dağ köyü.', '7/24 açık', 'Ücretsiz', 37.0511, 25.1897 from public.islands where slug = 'paros'
union all
select id, 'Marathi Mermer Ocakları', 'marathi-mermer-ocaklari', 'archaeological', 'Antik çağda ünlü Parian mermerinin çıkarıldığı tarihi ocaklar — terk edilmiş tüneller ve galeriler bugün ziyaret edilebiliyor.', '7/24 açık (dıştan)', 'Ücretsiz', 37.0700, 25.1800 from public.islands where slug = 'paros'
union all
select id, 'Milos Katakompları', 'milos-katakomplari', 'archaeological', 'Erken Hristiyanlık döneminden kalma, Yunanistan''ın en önemli yeraltı mezarlıklarından biri — 1500''den fazla mezar barındırıyor.', '08:30 - 15:30', '4€', 36.7280, 24.4460 from public.islands where slug = 'milos'
union all
select id, 'Milos Antik Tiyatrosu', 'milos-antik-tiyatrosu', 'archaeological', 'Roma dönemine ait, denize bakan muhteşem konumuyla ünlü antik tiyatro — hâlâ yaz etkinliklerine ev sahipliği yapıyor.', '08:30 - 15:30', 'Ücretsiz', 36.7275, 24.4455 from public.islands where slug = 'milos'
union all
select id, 'Klima Balıkçı Köyü', 'klima-balikci-koyu', 'village', 'Kayalıklara oyulmuş, rengarenk kapılı geleneksel "syrmata" tekne garajlarıyla ünlü, resim gibi bir balıkçı köyü.', '7/24 açık', 'Ücretsiz', 36.7186, 24.4390 from public.islands where slug = 'milos'
union all
select id, 'Plaka Kalesi Gün Batımı Noktası', 'plaka-kalesi-gun-batimi', 'viewpoint', 'Adanın başkenti Plaka''nın üstünde, Venedik kalesi kalıntılarından tüm adayı ve Ege''yi kucaklayan bir gün batımı manzarası.', '7/24 açık', 'Ücretsiz', 36.7350, 24.4400 from public.islands where slug = 'milos'
union all
select id, 'Sarakiniko Ay Yüzeyi Kayalıkları', 'sarakiniko-ay-yuzeyi-kayaliklari', 'nature', 'Rüzgar ve suyun aşındırdığı, beyaz volkanik kayalarla adeta ay yüzeyini andıran sürreal bir peyzaj — doğal havuzlarıyla da ünlü.', '7/24 açık', 'Ücretsiz', 36.7628, 24.4453 from public.islands where slug = 'milos'
union all
select id, 'Asklepion Antik Sağlık Merkezi', 'asklepion-antik-saglik-merkezi', 'archaeological', 'Hipokrat''ın öğretilerinin uygulandığı antik dönemin en önemli şifa ve tıp merkezlerinden biri — üç teraslı görkemli kalıntılar.', '08:00 - 19:00', '8€', 36.8858, 27.2967 from public.islands where slug = 'kos'
union all
select id, 'Neratzia Kalesi', 'neratzia-kalesi', 'castle', 'Kos limanının girişinde, Aziz Yuhanna Şövalyeleri tarafından inşa edilmiş görkemli ortaçağ kalesi.', '08:00 - 19:00', '6€', 36.8944, 27.2884 from public.islands where slug = 'kos'
union all
select id, 'Hipokrat Çınarı', 'hipokrat-cinari', 'landmark', 'Rivayete göre "tıbbın babası" Hipokrat''ın öğrencilerine ders verdiği, 500 yılı aşkın yaşındaki devasa çınar ağacı.', '7/24 açık', 'Ücretsiz', 36.8938, 27.2878 from public.islands where slug = 'kos'
union all
select id, 'Zia Köyü Gün Batımı Noktası', 'zia-koyu-gun-batimi', 'viewpoint', 'Dikeos Dağı''nın eteklerinde, geleneksel taş evleri ve Kos''un en ünlü gün batımı manzarasıyla bilinen dağ köyü.', '7/24 açık', 'Ücretsiz', 36.8358, 27.1719 from public.islands where slug = 'kos'
union all
select id, 'Kos Arkeoloji Müzesi', 'kos-arkeoloji-muzesi', 'museum', 'Kos şehir merkezinde, Roma dönemi mozaikleri ve heykelleriyle adanın zengin antik tarihini sergileyen müze.', '08:30 - 15:30 (Pazartesi kapalı)', '6€', 36.8930, 27.2870 from public.islands where slug = 'kos'
union all
select id, 'Portara (Apollon Tapınağı Kapısı)', 'portara-apollon-tapinagi-kapisi', 'archaeological', 'Naxos limanının girişindeki küçük bir adacıkta yükselen, tamamlanmamış Apollon Tapınağı''nın devasa mermer kapısı — adanın simgesi.', '7/24 açık', 'Ücretsiz', 37.1092, 25.3717 from public.islands where slug = 'naxos'
union all
select id, 'Naxos Kalesi (Eski Şehir)', 'naxos-kalesi-eski-sehir', 'castle', 'Venedik döneminden kalma, dar taş sokaklarıyla adanın tarihi kalbi — kale burcundan Kiklad Denizi manzarası.', '7/24 açık', 'Ücretsiz', 37.1050, 25.3760 from public.islands where slug = 'naxos'
union all
select id, 'Apiranthos Mermer Köyü', 'apiranthos-mermer-koyu', 'village', 'Tamamen mermer taşlarla döşenmiş sokaklarıyla ünlü, dağlık bir geleneksel Kiklad köyü — küçük müzeleriyle de bilinir.', '7/24 açık', 'Ücretsiz', 37.0389, 25.5194 from public.islands where slug = 'naxos'
union all
select id, 'Demeter Tapınağı', 'demeter-tapinagi', 'archaeological', 'M.Ö. 6. yüzyıldan kalma, hasat tanrıçası Demeter''e adanmış beyaz mermer tapınak kalıntıları — verimli Naxos ovasının ortasında.', '08:30 - 15:30', '4€', 37.0000, 25.4500 from public.islands where slug = 'naxos'
union all
select id, 'Melanes Kurosları', 'melanes-kuroslari', 'archaeological', 'Antik taş ocaklarında yarım kalmış, dev boyutlardaki arkaik dönem mermer heykelleri (kuroslar) — açık havada ziyaret edilebiliyor.', '7/24 açık', 'Ücretsiz', 37.0850, 25.4200 from public.islands where slug = 'naxos'
union all
select id, 'Navagio (Gemi Enkazı) Manzara Noktası', 'navagio-gemi-enkazi-manzara-noktasi', 'viewpoint', 'Dik kayalıklarla çevrili gizli bir koyda, kumsala oturmuş gerçek bir gemi enkazıyla dünyaca ünlü, Yunanistan''ın en çok fotoğraflanan plaj manzarası.', '7/24 açık (manzara noktası)', 'Ücretsiz', 37.8599, 20.6242 from public.islands where slug = 'zakynthos'
union all
select id, 'Mavi Mağaralar', 'mavi-magaralar-zakynthos', 'nature', 'Berrak turkuaz suları ve doğal kaya kemerleriyle ünlü, sadece tekneyle ulaşılabilen etkileyici deniz mağaraları.', 'Tekne turları gün doğumundan öğlene', 'Tekne turu ~15€''den başlıyor', 37.9333, 20.7333 from public.islands where slug = 'zakynthos'
union all
select id, 'Bochali Tepesi Gün Batımı Noktası', 'bochali-tepesi-gun-batimi', 'viewpoint', 'Zakynthos şehrinin üstünde, Venedik kalesi kalıntıları ve körfezin nefes kesen gün batımı manzarasıyla ünlü bir tepe.', '7/24 açık', 'Ücretsiz', 37.7908, 20.8983 from public.islands where slug = 'zakynthos'
union all
select id, 'Zakynthos Venedik Kalesi', 'zakynthos-venedik-kalesi', 'castle', 'Bochali tepesinde, Venedik döneminden kalma kale kalıntıları — çam ormanları içinde piknik alanlarıyla da popüler.', '08:00 - 20:00', '2€', 37.7917, 20.8964 from public.islands where slug = 'zakynthos'
union all
select id, 'Laganas Körfezi Caretta Caretta Alanı', 'laganas-korfezi-caretta-caretta-alani', 'nature', 'Akdeniz''in en önemli Caretta caretta (iri başlı deniz kaplumbağası) yuvalama alanlarından biri — Ulusal Deniz Parkı sınırları içinde.', 'Tekne turlarıyla mevsimsel', 'Tekne turu ~20€''den başlıyor', 37.7167, 20.8667 from public.islands where slug = 'zakynthos';
