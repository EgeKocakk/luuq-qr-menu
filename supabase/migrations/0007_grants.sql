-- Supabase varsayılan rollerine (anon, authenticated) tablo erişim izinleri.
-- Gerçek kısıtlama RLS politikalarında; bu grantlar olmadan RLS'e hiç
-- ulaşılamaz (Postgres önce grant kontrolü yapar).

grant usage on schema public to anon, authenticated;

grant select on public.categories, public.products,
  public.product_option_groups, public.product_options, public.settings
  to anon, authenticated;

grant insert, update, delete on public.categories, public.products,
  public.product_option_groups, public.product_options, public.settings
  to authenticated;

grant select, update on public.profiles to authenticated;
