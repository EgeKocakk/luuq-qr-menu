-- products: kategoriye bağlı ürünler. Fiyat kuruş cinsinden integer.

create table public.products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.categories (id) on delete restrict,
  name text not null,
  description text,
  image_url text,
  base_price integer not null default 0 check (base_price >= 0),
  is_active boolean not null default true,
  is_featured boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create index products_category_sort_order_idx on public.products (category_id, sort_order);
create index products_is_featured_idx on public.products (is_featured) where is_featured = true;

alter table public.products enable row level security;

create policy "Aktif ürünleri herkes görebilir, admin hepsini görür"
  on public.products for select
  using (is_active = true or public.is_admin());

create policy "Admin ürün ekleyebilir"
  on public.products for insert
  with check (public.is_admin());

create policy "Admin ürün güncelleyebilir"
  on public.products for update
  using (public.is_admin())
  with check (public.is_admin());

create policy "Admin ürün silebilir"
  on public.products for delete
  using (public.is_admin());
