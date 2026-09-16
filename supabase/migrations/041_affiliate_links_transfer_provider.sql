-- "Kiralık araç / transfer" özelliği için affiliate_links.provider check
-- constraint'ine 'transfer' eklenir (mevcut 'car_rental' ile birlikte,
-- havaalanı/liman transfer hizmetlerini ayrı bir kategori olarak göstermek için).
alter table public.affiliate_links drop constraint affiliate_links_provider_check;
alter table public.affiliate_links add constraint affiliate_links_provider_check
  check (provider in ('hotel', 'ferry', 'car_rental', 'flight', 'insurance', 'tour', 'esim', 'transfer'));
