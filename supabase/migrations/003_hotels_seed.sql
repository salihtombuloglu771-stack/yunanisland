insert into public.hotels (island_id, name, slug, category, description, price_range, affiliate_link, latitude, longitude, cover_image_url)
select id, 'Canaves Oia Suites', 'canaves-oia-suites', 'luxury', 'Caldera manzaralı, özel havuzlu süit oda konsepti ile Santorini''nin en prestijli butik otellerinden biri.', '450-900 €/gece', null, 36.4614, 25.3753, null from public.islands where slug = 'santorini'
union all
select id, 'Villa Renos', 'villa-renos', 'mid-range', 'Fira merkezine yürüme mesafesinde, geleneksel Kiklad mimarisiyle inşa edilmiş rahat bir pansiyon.', '90-160 €/gece', null, 36.4176, 25.4323, null from public.islands where slug = 'santorini'
union all
select id, 'Cavo Tagoo Mykonos', 'cavo-tagoo-mykonos', 'luxury', 'Mykonos Town''a hakim, sonsuzluk havuzlu, minimalist tasarımıyla ödüllü lüks otel.', '400-800 €/gece', null, 37.4520, 25.3260, null from public.islands where slug = 'mykonos'
union all
select id, 'Fresh Hotel Mykonos', 'fresh-hotel-mykonos', 'mid-range', 'Liman bölgesine yakın, samimi atmosferli, aile işletmesi orta segment otel.', '110-180 €/gece', null, 37.4467, 25.3282, null from public.islands where slug = 'mykonos'
union all
select id, 'Ionian Blue Boutique Hotel', 'ionian-blue-boutique', 'luxury', 'Tsilivi sahiline sıfır, adults-only konsept lüks butik otel.', '250-420 €/gece', null, 37.8280, 20.8420, null from public.islands where slug = 'zakynthos'
union all
select id, 'Zante Royal Resort', 'zante-royal-resort', 'budget', 'Her şey dahil konsept, aileler için geniş odalar ve çocuk havuzuyla ekonomik tatil köyü.', '55-95 €/gece', null, 37.7180, 20.8890, null from public.islands where slug = 'zakynthos'
union all
select id, 'Naxos Palace Hotel', 'naxos-palace-hotel', 'mid-range', 'Naxos Town sahiline sıfır, geniş terasları olan klasik tarz otel.', '85-140 €/gece', null, 37.1050, 25.3730, null from public.islands where slug = 'naxos'
union all
select id, 'Kos Aktis Art Hotel', 'kos-aktis-art-hotel', 'luxury', 'Kos Town''un tarihi merkezinde, modern sanat galerisi konseptli tasarım otel.', '220-380 €/gece', null, 36.8940, 27.2880, null from public.islands where slug = 'kos'
union all
select id, 'Kos Backpackers Inn', 'kos-backpackers-inn', 'budget', 'Genç gezginler için paylaşımlı ve özel odalar, ortak mutfak ve çatı terası.', '25-45 €/gece', null, 36.8900, 27.2830, null from public.islands where slug = 'kos';
