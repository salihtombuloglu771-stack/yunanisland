-- Gerçek kapak görseli olmayan plaj/restoran/otel/gezilecek yer kayıtlarına
-- kategori bazlı, gerçek (Wikimedia Commons, CC0/CC-BY/CC-BY-SA) jenerik
-- fotoğraflar atar. Attribution (public/generic/ altındaki dosyalar için):
--   beach-sand.jpg — Jebulon (CC0)
--   beach-pebble.jpg — Jules Verne Times Two (CC BY-SA 4.0)
--   beach-mixed.jpg — Tony Hisgett (CC BY 2.0)
--   restaurant-generic.jpg — Mustang Joe (CC0)
--   hotel-budget.jpg — ERWEH (CC BY-SA 2.5)
--   hotel-midrange.jpg — (CC BY-SA 3.0)
--   hotel-luxury.jpg — bongo vongo (CC BY-SA 2.0)
--   attraction-archaeological.jpg — Annatsach (CC BY-SA 4.0)
--   attraction-viewpoint.jpg — Navin75 (CC BY-SA 2.0)
--   attraction-museum.jpg — Yair-haklai (CC BY-SA 4.0)
--   attraction-church.jpg — Mstyslav Chernov (CC BY-SA 3.0)
--   attraction-nature.jpg — Robert Linsdell (CC BY 2.0)
--   attraction-village.jpg — Kondephy (CC BY-SA 4.0)
--   attraction-castle.jpg — Dnalor 01 (CC BY-SA 3.0 at)
--   attraction-landmark.jpg — Julian Lupyan (CC0)

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

update public.attractions
set cover_image_url = '/generic/attraction-' || category || '.jpg'
where cover_image_url is null;
