-- Ayarlarda tek bir "haftanın demlemesi" ürününe referans.
-- Ürün silinirse alan otomatik olarak null'a döner (menü çökmez).

alter table public.settings
  add column weekly_brew_product_id uuid references public.products (id) on delete set null;
