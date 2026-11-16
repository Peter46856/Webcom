-- Run in the Supabase SQL editor or with `supabase db push` after linking your project.
create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 100),
  email text not null check (char_length(email) <= 254),
  company text not null check (char_length(company) between 2 and 160),
  scope text not null check (scope in ('Software engineering', 'Logistics & fleet systems', 'Network infrastructure', 'Cloud & DevOps', 'Architecture consultation')),
  budget text not null check (budget in ('Under $5,000', '$5,000–$15,000', '$15,000–$50,000', '$50,000+', 'Let’s scope it together')),
  message text not null check (char_length(message) between 30 and 5000),
  consent_at timestamptz not null,
  created_at timestamptz not null default now(),
  status text not null default 'new' check (status in ('new','contacted','qualified','closed'))
);
create index if not exists inquiries_created_at_idx on public.inquiries(created_at desc);
alter table public.inquiries enable row level security;
-- No public policies. Anonymous and authenticated browser roles cannot access inquiries.
revoke all on public.inquiries from anon, authenticated;
grant select, insert, update, delete on public.inquiries to service_role;
comment on table public.inquiries is 'Private enterprise inquiries. Backend service role only. Contains personal data.';
