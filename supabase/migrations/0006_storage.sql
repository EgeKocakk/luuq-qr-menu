-- menu-images bucket: ürün/hero görselleri. Public okuma, sadece admin yazma.

insert into storage.buckets (id, name, public)
values ('menu-images', 'menu-images', true)
on conflict (id) do nothing;

create policy "menu-images herkese açık okuma"
  on storage.objects for select
  using (bucket_id = 'menu-images');

create policy "menu-images admin yükleyebilir"
  on storage.objects for insert
  with check (bucket_id = 'menu-images' and public.is_admin());

create policy "menu-images admin güncelleyebilir"
  on storage.objects for update
  using (bucket_id = 'menu-images' and public.is_admin())
  with check (bucket_id = 'menu-images' and public.is_admin());

create policy "menu-images admin silebilir"
  on storage.objects for delete
  using (bucket_id = 'menu-images' and public.is_admin());
