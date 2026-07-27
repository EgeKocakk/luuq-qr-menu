-- categories: menü kategorileri, sıralama admin'den yönetilir.

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create index categories_sort_order_idx on public.categories (sort_order);

alter table public.categories enable row level security;

create policy "Aktif kategorileri herkes görebilir, admin hepsini görür"
  on public.categories for select
  using (is_active = true or public.is_admin());

create policy "Admin kategori ekleyebilir"
  on public.categories for insert
  with check (public.is_admin());

create policy "Admin kategori güncelleyebilir"
  on public.categories for update
  using (public.is_admin())
  with check (public.is_admin());

create policy "Admin kategori silebilir"
  on public.categories for delete
  using (public.is_admin());
