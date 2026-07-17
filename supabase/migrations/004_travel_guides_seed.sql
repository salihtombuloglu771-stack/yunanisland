insert into public.categories (name, slug, description) values
('Pratik Bilgiler', 'pratik-bilgiler', 'Vize, para birimi, iletişim ve seyahat öncesi bilinmesi gereken pratik rehberler');

insert into public.articles (title, slug, content, category_id, is_published, published_at)
select 'Yunanistan Vize Rehberi: Schengen Vizesi Nasıl Alınır?', 'yunanistan-vize-rehberi',
'Yunanistan, Schengen bölgesi üyesi bir ülkedir. Türk vatandaşları kısa süreli (90 güne kadar) turistik ziyaretler için Schengen (C tipi) vizesi almak zorundadır. Başvuru, Yunanistan Başkonsolosluğu''na bağlı vize başvuru merkezlerinden (VFS Global vb.) yapılır.

Genellikle istenen belgeler: geçerli pasaport, biyometrik fotoğraf, uçak/feribot rezervasyonu, otel rezervasyonu, seyahat sağlık sigortası (minimum 30.000 € teminatlı), son 3 aylık banka hesap dökümü ve iş/gelir belgesi.

Bazı dönemlerde belirli sınır adalarına (Kos, Rodos, Midilli, Sakız gibi) yönelik kısa süreli bölgesel giriş kolaylıkları uygulanabiliyor — bu programlar zaman zaman değişebildiği için başvurudan önce güncel durumu Yunanistan Konsolosluğu''nun resmi kaynaklarından teyit etmenizi öneririz.

**Öneri**: Vize başvurunuzu seyahat tarihinden en az 4-6 hafta önce yapın, yoğun yaz sezonunda randevu bulmak zorlaşabiliyor.',
id, true, now() from public.categories where slug = 'pratik-bilgiler'
union all
select 'Yunan Adalarında İnternet: eSIM Rehberi', 'yunan-adalarinda-esim-rehberi',
'Yunanistan Avrupa Birliği üyesi olduğu için AB içi roaming kuralları geçerlidir — ancak Türkiye AB üyesi olmadığından Türk hatlarında roaming genellikle pahalıdır. En pratik çözüm bir eSIM satın almaktır.

**Popüler eSIM sağlayıcıları**: Airalo, Holafly, Nomad — bu uygulamalar üzerinden Yunanistan veya "Avrupa" paketi alarak uçaktan iner inmez internete bağlanabilirsiniz, yerel bir SIM kart aramanıza gerek kalmaz.

**Yerel operatör SIM kartı isteyenler için**: Cosmote, Vodafone GR ve Nova havalimanlarında ve şehir merkezlerindeki bayilerde turist SIM paketleri satıyor; pasaportunuzu yanınızda bulundurun (Yunanistan''da SIM kayıt zorunluluğu var).

**İpucu**: eSIM''i seyahatten önce evde kurup aktive etmeden bırakın (çoğu sağlayıcı adaya varana kadar aktivasyonu erteleme imkânı sunar), böylece Wi-Fi''ye ihtiyaç duymadan kurulum derdi yaşamazsınız.',
id, true, now() from public.categories where slug = 'pratik-bilgiler'
union all
select 'Para Birimi ve Bütçe: Yunanistan''da Ödeme Rehberi', 'yunanistanda-odeme-rehberi',
'Yunanistan''ın para birimi **Euro (€)**''dur. Kredi/banka kartları (özellikle Visa ve Mastercard) şehir merkezlerinde ve çoğu işletmede geçerlidir, ancak küçük adalardaki bazı taverna, plaj barı ve yerel dükkânlar sadece nakit kabul edebilir — yanınızda küçük banknotlarla nakit bulundurmanız önerilir.

ATM''ler tüm adalarda liman/şehir merkezlerinde bulunur; yüksek sezonda bazı küçük adalarda ATM''lerin nakit tükenmesi yaşanabiliyor, bu yüzden büyük şehirden çıkmadan önce yeterli nakit çekmenizi öneririz.

**Bahşiş kültürü**: Zorunlu değildir ama restoranlarda hesabın %5-10''u kadar bahşiş bırakmak yaygın bir nezaket göstergesidir. Taksilerde üstü yuvarlamak yeterlidir.

**Tax Free (KDV İadesi)**: AB dışından gelen turistler, 50 €''yu aşan alışverişlerde KDV iadesi başvurusu yapabilir — mağazadan "Tax Free" formu istemeyi unutmayın.',
id, true, now() from public.categories where slug = 'pratik-bilgiler'
union all
select 'Acil Durum Numaraları ve Sağlık Bilgileri', 'acil-durum-numaralari',
'Yunanistan''da seyahat ederken bilmeniz gereken acil numaralar:

- **112** — Avrupa genel acil çağrı hattı (İngilizce konuşan operatör bulunur, tüm AB''de geçerlidir)
- **100** — Polis
- **166** — Ambulans / Acil Sağlık
- **199** — İtfaiye
- **108** — Kıyı Güvenliği / Liman Polisi (deniz kazaları için)

**Sağlık sigortası**: Schengen vizesi başvurusu için zaten zorunlu olan seyahat sağlık sigortanızın poliçe numarasını ve acil yardım hattını telefonunuzda kayıtlı tutun.

**Eczaneler**: Yunanistan''da eczaneler yeşil haç (+) tabelasıyla tanınır, çoğu küçük adada nöbetçi eczane sistemi vardır — kapıda "διανυκτερεύει" (nöbetçi) yazan eczaneyi arayın.

**Güneş çarpması uyarısı**: Yaz aylarında Ege sıcağı ciddi olabilir; bol su için, öğle 12:00-16:00 arası doğrudan güneşe çıkmaktan kaçının, özellikle çocuklu ailelerin dikkatli olması önerilir.',
id, true, now() from public.categories where slug = 'pratik-bilgiler'
union all
select 'Seyahat Öncesi Öğrenilecek Temel Yunanca İfadeler', 'temel-yunanca-ifadeler',
'Yerel halkla iletişimde birkaç basit Yunanca ifade kullanmak her zaman sıcak karşılanır:

- **Γειά σου** (Yassu) — Merhaba / Hoşça kal (günlük, samimi)
- **Καλημέρα** (Kaliméra) — Günaydın
- **Καλησπέρα** (Kalispéra) — İyi akşamlar
- **Ευχαριστώ** (Efharistó) — Teşekkür ederim
- **Παρακαλώ** (Parakaló) — Rica ederim / Lütfen
- **Ναι** (Ne) — Evet
- **Όχι** (Óhi) — Hayır
- **Πόσο κάνει;** (Póso káni?) — Ne kadar (fiyatı)?
- **Που είναι…;** (Pou íne…?) — … nerede?
- **Καλή όρεξη** (Kalí órexi) — Afiyet olsun

**İpucu**: Yunanca alfabe Latin alfabesinden farklıdır ama turistik bölgelerdeki tabelaların çoğu Latin harfleriyle de yazılıdır, bu yüzden okuma konusunda endişelenmenize gerek yok.',
id, true, now() from public.categories where slug = 'pratik-bilgiler';
