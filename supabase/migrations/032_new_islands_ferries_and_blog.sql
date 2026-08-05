-- Girit, Korfu ve Kefalonya (031_new_islands_crete_corfu_kefalonia.sql ile eklenen 3 yeni ada)
-- için gerçek feribot rota verisi ve tanıtım blog yazıları.
--
-- 1) FERRY_ROUTES: Bu adalar Ege'deki diğer adalardan (Bodrum/Kos/Santorini/Rhodes)
--    coğrafi olarak uzak ve farklı bölgelerde olduğundan (Girit -> Girit Denizi/güney,
--    Korfu & Kefalonya -> İyon Denizi/batı), kendilerine özgü gerçek limanlar kullanılıyor.
--    Her rota HER İKİ yönde de (A->B ve B->A) ayrı satır olarak ekleniyor
--    (002_seed_data.sql'deki desenle aynı).
--    to_port değerleri ada isimleriyle birebir aynı (Girit / Korfu / Kefalonya).
--    from_port değerleri: 'Atina (Pire)' (mevcut ferry-guide PORTS listesinde zaten var)
--    ve yeni limanlar: 'Patras', 'Igoumenitsa', 'Killini'.
--
-- 2) ARTICLES: 3 tanıtım/gezi rehberi yazısı, 002_seed_data.sql'deki üslupla aynı —
--    düz paragraflar + **kalın** vurgular, boş satırla ayrılmış (src/lib/markdown.ts
--    ve src/components/MarkdownContent.tsx sadece bu formatı destekliyor; başlık/liste yok).
--
-- Bu migration çalıştırılmadı — sadece dosya hazırlandı (Supabase erişimi bu oturumda yok).

-- ============================================================
-- FERRY ROUTES
-- ============================================================
insert into public.ferry_routes (from_port, to_port, companies, duration_minutes, price_min, price_max) values
('Atina (Pire)', 'Girit', array['Minoan Lines', 'ANEK Lines'], 540, 35, 70),
('Girit', 'Atina (Pire)', array['Minoan Lines', 'ANEK Lines'], 540, 35, 70),
('Patras', 'Korfu', array['Anek Lines'], 420, 35, 55),
('Korfu', 'Patras', array['Anek Lines'], 420, 35, 55),
('Igoumenitsa', 'Korfu', array['Kerkyra Lines'], 90, 8, 15),
('Korfu', 'Igoumenitsa', array['Kerkyra Lines'], 90, 8, 15),
('Patras', 'Kefalonya', array['Ionian Group'], 180, 25, 40),
('Kefalonya', 'Patras', array['Ionian Group'], 180, 25, 40),
('Killini', 'Kefalonya', array['Ionian Group'], 90, 12, 20),
('Kefalonya', 'Killini', array['Ionian Group'], 90, 12, 20);

-- ============================================================
-- ARTICLES (blog)
-- ============================================================
insert into public.articles (title, slug, content, category_id, cover_image_url, is_published, published_at)
select
  'Girit Rehberi: Yunanistan''ın En Büyük Adasında Görülmesi Gerekenler',
  'girit-rehberi',
  'Girit, Yunanistan''ın en büyük ve nüfus bakımından en kalabalık adası; Girit Denizi''nin ortasında, Avrupa, Asya ve Afrika''nın kesişim noktasına yakın konumda yer alır. Yaklaşık 260 kilometre uzunluğundaki ada, hem dağlık hem sahil şeridi zengin bir coğrafyaya sahiptir ve Yunanistan''ın diğer adalarından çok farklı, kendi başına bir ülke gibi hissettirir. Girit''i gerçek anlamda keşfetmek isteyenlere en az beş ila yedi gün ayırmalarını öneririz.

Adanın kalbi kuşkusuz **Knossos Sarayı**''dır. M.Ö. 2. binyılda Avrupa''nın en eski gelişmiş uygarlığı olan Minos uygarlığının başkenti olan bu saray kompleksi, efsanevi Kral Minos ve Labirent mitinin de geçtiği yer olarak kabul edilir. Heraklion''a birkaç kilometre mesafedeki kalıntılar, arkeolog Sir Arthur Evans tarafından 20. yüzyıl başında ortaya çıkarılmış ve kısmen yeniden inşa edilmiştir; rehberli bir tur, sarayın karmaşık yapısını ve mitolojik hikayesini çok daha anlaşılır kılar.

Doğa tutkunları için **Samarya Kanyonu** kaçırılmaması gereken bir deneyimdir. Avrupa''nın en uzun kanyonlarından biri olan bu 16 kilometrelik patika, dik kayalıklar arasından Libya Denizi''ne kadar iner ve genellikle altı ila sekiz saat süren zorlu ama unutulmaz bir yürüyüş sunar. Kanyon yalnızca Mayıs''tan Ekim''e kadar, hava koşullarına bağlı olarak açık tutulur.

**Hanya**''nın Venedik dönemine ait limanı, Girit''in en romantik köşelerinden biridir. Taş binaları, tarihi deniz feneri ve rengarenk balıkçı tekneleriyle liman çevresi, günün her saatinde keyifle yürünecek dar sokaklara ve tavernalara açılır. Yakınlardaki Rethymno''nun 16. yüzyıldan kalma Fortezza kalesi de şehir ve deniz manzarasını izlemek isteyenler için ideal bir duraktır.

Plaj seçenekleri konusunda Girit gerçekten şımartır. **Elafonisi**''nin pembemsi kumu ve sığ turkuaz lagünü, **Balos**''un Gramvousa Yarımadası ucundaki eşsiz manzarası ve Avrupa''nın en büyük doğal palmiye ormanının kıyısında uzanan **Vai Plajı**, adanın en çok fotoğraflanan kıyı şeritleri arasındadır. Güneyde, palmiyelerle çevrili bir nehrin Libya Denizi''ne kavuştuğu Preveli de listeye eklenmeyi hak eder.

Mutfak kültürü de Girit''i özel kılan unsurlardan biridir. Zeytinyağı, yerel otlar ve az işlenmiş malzemelere dayanan Girit mutfağı, dünyaca ünlü Akdeniz diyetinin en saf haliyle yaşandığı bir yer olarak kabul edilir. Kızarmış peynirle servis edilen **dakos**, yerel rakı ve taze deniz ürünleri, adadaki tavernalarda mutlaka denenmesi gereken lezzetlerdendir.

Girit''e ulaşım, Heraklion ve Hanya''daki uluslararası havalimanları sayesinde oldukça kolaydır; Atina (Pire) limanından gece feribotuyla da adaya geçmek mümkündür. Adanın büyüklüğü göz önüne alındığında, bölgeler arasında hareket etmek için araç kiralamak neredeyse şarttır.',
  id, '/girit.jpg', true, now()
from public.categories where slug = 'gezi-ipuclari'
union all
select
  'Korfu: Yunanistan''ın En Avrupai Adası',
  'korfu-rehberi',
  'İyon Denizi''nin kuzeyinde, İtalya kıyılarına Yunanistan''ın çoğu adasından daha yakın konumda yer alan Korfu (Kerkyra), ülkenin en yeşil ve mimari açıdan en farklı adalarından biridir. Antik çağda Korkyra olarak bilinen ada, Homeros''un Odysseia destanında da adı geçen köklü bir tarihe sahiptir.

Korfu''yu diğer Yunan adalarından ayıran en çarpıcı özellik, tarihi boyunca hiçbir zaman Osmanlı egemenliğine girmemiş olmasıdır. Ada yüzyıllarca **Venedik Cumhuriyeti**''nin yönetiminde kalmış, ardından kısa süreliğine Fransız ve İngiliz kontrolüne geçmiştir. Bu benzersiz geçmiş, Korfu''ya Yunanistan''ın geri kalanından belirgin biçimde farklı, oldukça Avrupai bir mimari doku ve kültür kazandırmıştır.

Bu mirasın en güzel örneği, UNESCO Dünya Mirası Listesi''nde yer alan **Korfu Şehri**''nin eski şehir merkezidir. Dar taş sokaklar, Venedik tarzı balkonlu binalar ve İtalyan kafe kültürünün izlerini taşıyan meydanlar, ziyaretçilere neredeyse bir İtalyan şehrinde geziyormuş hissi verir. Bizans döneminden kalma ve sonradan Venedikliler tarafından genişletilen **Eski Kale**, şehrin simgesi haline gelmiş, denize hakim etkileyici bir yapıdır.

Adanın bir diğer önemli durağı, Avusturya İmparatoriçesi Sisi için 19. yüzyılda inşa edilen **Akhilleion Sarayı**''dır. Aşil mitolojisinden ilham alan heykelleri ve gösterişli bahçeleriyle saray, imparatoriçenin adaya duyduğu tutkuyu yansıtır. Şehrin merkezinde ise adanın koruyucu azizi Aziz Spyridon''un kalıntılarını barındıran, kırmızı kubbeli çan kulesiyle tanınan kilise, yerel halkın en çok değer verdiği mekanlardan biridir.

Doğal güzellikler açısından da Korfu geride kalmaz. Yeşil tepelerle çevrili küçük koylardan oluşan **Paleokastritsa**, adanın en fotojenik kıyı şeridi olarak kabul edilir. Sidari köyündeki Aşk Kanalı''nda, rüzgar ve suyun kumtaşı kayalıkları oyarak oluşturduğu dar kanaldan birlikte yüzen çiftlerin sonsuza dek birlikte kalacağına dair yerel bir efsane anlatılır.

Sakin koyları, lüks butik otelleri, romantik gün batımı noktaları ve İtalya''yı andıran zarif atmosferiyle Korfu, özellikle **balayı çiftleri** arasında uzun süredir popüler bir tercih. Adanın kendi uluslararası havalimanı bulunur; Patras ve İgumenitsa limanlarından feribotla da erişim mümkündür.',
  id, '/korfu.jpg', true, now()
from public.categories where slug = 'gezi-ipuclari'
union all
select
  'Kefalonya''da Doğa Harikaları: Melissani''den Myrtos''a',
  'kefalonya-rehberi',
  'İyon Denizi''nin en büyük adası olan Kefalonya, kalabalık turizm rotalarının biraz dışında kalan, sakinliğini ve el değmemiş doğasını hâlâ koruyabilmiş nadir Yunan adalarından biridir. Dağlık iç kesimleri, turkuaz koyları ve gizemli yeraltı mağaralarıyla ada, doğa tutkunları için adeta bir açık hava müzesi gibidir.

Adanın en büyülü noktalarından biri **Melissani Mağarası**''dır. Çatısının bir kısmı binlerce yıl önce çökmüş olan bu yeraltı gölü mağarası, öğle saatlerinde tavandaki açıklıktan süzülen gün ışığının suyu inanılmaz bir turkuaz tona bürümesiyle ünlüdür. Ziyaretçiler mağarayı küçük kayıklarla gezerek bu doğa harikasını yakından deneyimleyebilir. Yakınlardaki **Drogarati Mağarası** ise 150 milyon yıllık sarkıt ve dikitleriyle dikkat çeker; mükemmel akustiği sayesinde zaman zaman konserlere bile ev sahipliği yapmıştır.

Plaj denince akla ilk gelen isim ise kuşkusuz **Myrtos Plajı**''dır. Dik beyaz kayalıklar arasında, parlak beyaz çakılları ve derin turkuaz suyuyla Myrtos, Yunanistan''ın en çok fotoğraflanan plajları arasında sayılır. Kıvrımlı dağ yolunun üzerindeki manzara noktasından plajı yukarıdan izlemek bile başlı başına bir deneyimdir. Daha az bilinen ama Myrtos kadar etkileyici olan **Petani Plajı**, Paliki Yarımadası''nda çok daha az kalabalıkla aynı büyüleyici manzarayı sunar.

Kefalonya''nın tarihi, 1953 yılında adayı vuran yıkıcı bir depremle derinden şekillenmiştir. Deprem, adanın çoğu kasabasındaki tarihi Venedik mimarisini neredeyse tamamen yok etmiş, günümüzdeki köylerin büyük bölümü depremden sonra yeniden inşa edilmiştir. Depremden nadiren hasar görmeden kurtulan **Fiskardo** köyü ise bu yüzden özel bir değer taşır; rengarenk Venedik dönemi evleri ve şirin balıkçı limanıyla adanın en özgün köşesi olarak öne çıkar.

Adanın bir diğer tarihi durağı, dar bir kara şeridiyle anakaraya bağlı küçük yarımadada kurulu **Assos** köyüdür; tepesindeki Venedik kalesi kalıntıları ile rengarenk evleri, ziyaretçilere adeta bir kartpostal manzarası sunar. İkinci Dünya Savaşı sırasında adada konuşlanan İtalyan garnizonuyla ilgili trajik olaylar da Kefalonya''nın yakın tarihinin acı bir parçasıdır ve dünya çapında ünlenen bir roman ve filme de konu olmuştur.

Diğer popüler Yunan adalarına kıyasla çok daha sakin kalabalığı, geniş aile dostu plajları (Xi Plajı gibi) ve doğal güzellikleriyle Kefalonya, kalabalıktan uzak, otantik bir Yunanistan deneyimi arayanlar için mükemmel bir seçimdir. Adaya Argostoli yakınındaki havalimanının yanı sıra Patras ve Killini limanlarından feribotla da ulaşmak mümkündür.',
  id, '/kefalonya.jpg', true, now()
from public.categories where slug = 'en-iyi-plajlar';
