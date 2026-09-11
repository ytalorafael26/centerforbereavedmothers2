create extension if not exists "pgcrypto";

create type public.app_role as enum ('member','volunteer','professional','moderator','admin','super_admin');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  preferred_language text not null default 'en',
  timezone text,
  country text,
  privacy_level text not null default 'private',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.user_roles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role public.app_role not null default 'member',
  created_at timestamptz not null default now()
);

create table public.journal_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text,
  body text not null,
  mood smallint,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.memorials (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  child_name text,
  birth_date date,
  memorial_date date,
  life_story text,
  mother_message text,
  privacy text not null default 'private' check (privacy in ('private','shared','public')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.user_roles enable row level security;
alter table public.journal_entries enable row level security;
alter table public.memorials enable row level security;

create policy "profiles are self readable" on public.profiles
for select using (auth.uid() = id);
create policy "profiles are self editable" on public.profiles
for update using (auth.uid() = id);

create policy "journal is private" on public.journal_entries
for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "memorial owner access" on public.memorials
for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles(id) values (new.id);
  insert into public.user_roles(user_id, role) values (new.id, 'member');
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();
