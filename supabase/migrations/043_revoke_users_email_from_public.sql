-- GÜVENLİK (devamı, migration 042'nin tamamlayıcısı): 042'deki
-- "revoke select (email) on public.users from anon, authenticated"
-- uygulandıktan sonra bile anon anahtarıyla email hâlâ okunabiliyordu
-- (gerçek anahtarla canlıda doğrulandı). Sebep: Postgres'te bir rolün
-- doğrudan REVOKE edilmesi, o rolün üye olduğu PUBLIC (örtük, herkesin
-- üyesi olduğu sözde rol) üzerinden gelen bir izni GERİ ALMAZ. Bu
-- projenin tabloları muhtemelen ilk kurulumda (Supabase'in public şema
-- varsayılanı ya da eski bir migration) PUBLIC'e select vermiş; anon/
-- authenticated bu izni PUBLIC üyeliğinden miras alıyordu, 042'deki
-- role-özel REVOKE bu yüzden görünürde işe yaramadı. Asıl izni PUBLIC'ten
-- de açıkça geri almak gerekiyor.

revoke select (email) on public.users from public;

-- Yine de emin olmak için role-özel revoke'u tekrar uyguluyoruz (no-op
-- olsa da zararsız, 042 ile aynı).
revoke select (email) on public.users from anon, authenticated;
