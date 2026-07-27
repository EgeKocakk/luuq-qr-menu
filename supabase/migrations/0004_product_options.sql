-- product_option_groups + product_options: "Boy", "Süt" gibi seçim grupları
-- ve fiyat farkı olan seçenekleri (küçük boy için negatif fark dahil).

create table public.product_option_groups (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products (id) on delete cascade,
  name text not null,
  type text not null check (type in ('single', 'multi')),
  is_required boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create index product_option_groups_product_idx on public.product_option_groups (product_id, sort_order);

alter table public.product_option_groups enable row level security;

create policy "Aktif ürünün opsiyon gruplarını herkes görebilir"
  on public.product_option_groups for select
  using (
    public.is_admin()
    or exists (
      select 1 from public.products p
      where p.id = product_id and p.is_active = true
    )
  );

create policy "Admin opsiyon grubu ekleyebilir"
  on public.product_option_groups for insert
  with check (public.is_admin());

create policy "Admin opsiyon grubu güncelleyebilir"
  on public.product_option_groups for update
  using (public.is_admin())
  with check (public.is_admin());

create policy "Admin opsiyon grubu silebilir"
  on public.product_option_groups for delete
  using (public.is_admin());

create table public.product_options (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references public.product_option_groups (id) on delete cascade,
  name text not null,
  price_diff integer not null default 0,
  is_default boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create index product_options_group_idx on public.product_options (group_id, sort_order);

alter table public.product_options enable row level security;

create policy "Aktif ürünün opsiyonlarını herkes görebilir"
  on public.product_options for select
  using (
    public.is_admin()
    or exists (
      select 1 from public.product_option_groups g
      join public.products p on p.id = g.product_id
      where g.id = group_id and p.is_active = true
    )
  );

create policy "Admin opsiyon ekleyebilir"
  on public.product_options for insert
  with check (public.is_admin());

create policy "Admin opsiyon güncelleyebilir"
  on public.product_options for update
  using (public.is_admin())
  with check (public.is_admin());

create policy "Admin opsiyon silebilir"
  on public.product_options for delete
  using (public.is_admin());
