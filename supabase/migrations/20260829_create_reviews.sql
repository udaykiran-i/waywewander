create extension if not exists pgcrypto;

create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  full_name text not null check (char_length(full_name) between 2 and 80),
  email text not null check (char_length(email) between 5 and 254),
  trip_name text not null check (char_length(trip_name) between 2 and 120),
  travel_month date,
  trip_planning smallint not null check (trip_planning between 1 and 5),
  driver_transport smallint not null check (driver_transport between 1 and 5),
  stays_rooms smallint not null check (stays_rooms between 1 and 5),
  value_for_money smallint not null check (value_for_money between 1 and 5),
  overall_rating smallint not null check (overall_rating between 1 and 5),
  review text not null check (char_length(review) between 20 and 2000),
  consent boolean not null check (consent),
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now(),
  published_at timestamptz
);

create index reviews_published_at_idx on public.reviews (published_at desc) where status = 'approved';

create table public.review_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.reviews enable row level security;
alter table public.review_admins enable row level security;

create function public.is_review_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.review_admins where user_id = auth.uid());
$$;

revoke all on table public.reviews from public, anon, authenticated;
revoke all on table public.review_admins from public, anon, authenticated;
grant insert on table public.reviews to anon;
grant select, update, delete on table public.reviews to authenticated;
grant execute on function public.is_review_admin() to authenticated;

create policy "public can submit pending reviews"
on public.reviews for insert to anon
with check (status = 'pending' and published_at is null and consent = true);

create policy "review admins can read reviews"
on public.reviews for select to authenticated
using (public.is_review_admin());

create policy "review admins can update reviews"
on public.reviews for update to authenticated
using (public.is_review_admin())
with check (public.is_review_admin());

create policy "review admins can delete reviews"
on public.reviews for delete to authenticated
using (public.is_review_admin());

create view public.published_reviews as
select
  id,
  full_name as name,
  trip_name,
  travel_month,
  trip_planning,
  driver_transport,
  stays_rooms,
  value_for_money,
  overall_rating,
  review,
  published_at
from public.reviews
where status = 'approved';

revoke all on table public.published_reviews from public, anon, authenticated;
grant select on table public.published_reviews to anon, authenticated;
