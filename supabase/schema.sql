-- Run this once in Supabase: SQL Editor > New query > paste > Run

create table progress (
  user_id uuid references auth.users on delete cascade,
  key text,
  score int not null,
  primary key (user_id, key)
);

create table queries (
  id bigint generated always as identity primary key,
  user_id uuid not null default auth.uid() references auth.users on delete cascade,
  email text,
  name text,
  subject text not null,
  message text not null,
  created_at timestamptz default now()
);

-- each user can only see and change their own rows
alter table progress enable row level security;
alter table queries enable row level security;

create policy "read own progress" on progress for select using (auth.uid() = user_id);
create policy "add own progress" on progress for insert with check (auth.uid() = user_id);
create policy "update own progress" on progress for update using (auth.uid() = user_id);
create policy "add own queries" on queries for insert with check (auth.uid() = user_id);
create policy "read own queries" on queries for select using (auth.uid() = user_id);
