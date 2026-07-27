-- profiles: auth.users'a 1-1 bağlı, rol bilgisi burada tutulur.
-- Menü verisini herkes okuyabilir ama sadece role='admin' yazabilir.

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role text not null default 'staff' check (role in ('admin', 'staff')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Kullanıcı kendi profilini görebilir"
  on public.profiles for select
  using (id = auth.uid());

create or replace function public.is_admin()
returns boolean
language plpgsql
security definer
stable
set search_path = public
as $$
declare
  result boolean;
begin
  select (role = 'admin') into result
  from public.profiles
  where id = auth.uid();

  return coalesce(result, false);
end;
$$;

-- Yeni auth kullanıcısı oluşunca otomatik profil satırı aç.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, role) values (new.id, 'staff');
  return new;
end;
$$;

create trigger trg_handle_new_user
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Rol yükseltmesi sadece mevcut adminler tarafından yapılabilir.
create or replace function public.prevent_role_escalation()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.role <> old.role and not public.is_admin() then
    raise exception 'Rol değişikliği yalnızca admin tarafından yapılabilir';
  end if;
  return new;
end;
$$;

create trigger trg_prevent_role_escalation
  before update on public.profiles
  for each row execute function public.prevent_role_escalation();
