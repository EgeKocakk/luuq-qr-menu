-- settings: tek satırlık genel ayarlar (duyuru bandı, hero görseli).

create table public.settings (
  id boolean primary key default true check (id = true), -- tek satır garantisi
  announcement text,
  hero_image_url text,
  updated_at timestamptz not null default now()
);

insert into public.settings (id) values (true);

alter table public.settings enable row level security;

create policy "Ayarları herkes görebilir"
  on public.settings for select
  using (true);

create policy "Admin ayarları güncelleyebilir"
  on public.settings for update
  using (public.is_admin())
  with check (public.is_admin());
