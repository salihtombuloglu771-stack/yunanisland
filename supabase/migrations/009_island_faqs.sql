alter table public.islands add column if not exists faqs jsonb default '[]'::jsonb;

update public.islands set faqs = '[
  {"question": "Santorini''ye gitmek için vize gerekir mi?", "answer": "Türk vatandaşları için Yunanistan Schengen bölgesi üyesi olduğundan kısa süreli ziyaretlerde Schengen vizesi gereklidir."},
  {"question": "Santorini''de en iyi gün batımı nereden izlenir?", "answer": "Oia köyü dünyaca ünlü gün batımı manzarasıyla bilinir, yaz aylarında oldukça kalabalık olur, erken yer tutmanız önerilir."},
  {"question": "Santorini pahalı bir ada mı?", "answer": "Evet, Santorini Yunan adaları arasında en pahalılardan biridir; özellikle Temmuz-Ağustos aylarında konaklama fiyatları belirgin şekilde artar."}
]'::jsonb where slug = 'santorini';

update public.islands set faqs = '[
  {"question": "Mykonos gece hayatıyla mı ünlü?", "answer": "Evet, Mykonos özellikle plaj kulüpleri ve gece kulüpleriyle Yunanistan''ın en canlı eğlence merkezlerinden biridir."},
  {"question": "Mykonos aileler için uygun mu?", "answer": "Mykonos daha çok genç ve çift ağırlıklı bir destinasyon olsa da Elia gibi sakin plajlarda aile dostu seçenekler bulunur."},
  {"question": "Mykonos''a Bodrum''dan feribot var mı?", "answer": "Direkt feribot sınırlıdır; genellikle Kos veya Atina üzerinden aktarmalı seyahat edilir."}
]'::jsonb where slug = 'mykonos';

update public.islands set faqs = '[
  {"question": "Navagio Plajı''na nasıl ulaşılır?", "answer": "Navagio Plajı''na kara yolu yoktur, sadece tekne turlarıyla deniz yoluyla ulaşılabilir."},
  {"question": "Zakynthos ne zaman ziyaret edilmeli?", "answer": "Haziran-Eylül arası en uygun dönemdir; Temmuz-Ağustos yoğun ama deniz suyu en sıcak zamandır."}
]'::jsonb where slug = 'zakynthos';

update public.islands set faqs = '[
  {"question": "Naxos bütçe dostu bir ada mı?", "answer": "Evet, Naxos Kiklad adaları arasında görece daha uygun fiyatlı konaklama ve yeme-içme seçenekleri sunar."},
  {"question": "Naxos''ta hangi aktiviteler var?", "answer": "Geniş plajlar, antik Portara kapısı, dağ köyleri ve yerel tarım ürünleri tadım turları öne çıkan aktivitelerdir."}
]'::jsonb where slug = 'naxos';

update public.islands set faqs = '[
  {"question": "Kos''a Bodrum''dan feribotla ne kadar sürede gidilir?", "answer": "Hızlı feribotlarla yaklaşık 20 dakika sürer, Türkiye''ye en yakın Yunan adalarından biridir."},
  {"question": "Kos aile tatili için uygun mu?", "answer": "Evet, geniş kumsalları, bisiklet yolları ve sığ sularıyla Kos aileler için oldukça uygundur."}
]'::jsonb where slug = 'kos';
