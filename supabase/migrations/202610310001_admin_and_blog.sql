-- Apply AFTER 202610300001_inquiries.sql. Existing inquiries are preserved.
create table if not exists public.admin_members(user_id uuid primary key references auth.users(id) on delete cascade,created_at timestamptz not null default now());
alter table public.admin_members enable row level security;
revoke all on public.admin_members from anon,authenticated;
grant select on public.admin_members to authenticated;
drop policy if exists admin_read_own_membership on public.admin_members;
create policy admin_read_own_membership on public.admin_members for select to authenticated using(user_id=(select auth.uid()));
revoke update on public.inquiries from authenticated;
grant select on public.inquiries to authenticated;
grant update(status) on public.inquiries to authenticated;
drop policy if exists admin_read_inquiries on public.inquiries;
create policy admin_read_inquiries on public.inquiries for select to authenticated using(exists(select 1 from public.admin_members where user_id=(select auth.uid())));
drop policy if exists admin_update_inquiries on public.inquiries;
create policy admin_update_inquiries on public.inquiries for update to authenticated using(exists(select 1 from public.admin_members where user_id=(select auth.uid()))) with check(exists(select 1 from public.admin_members where user_id=(select auth.uid())));
create table if not exists public.blog_posts(
  id uuid primary key default gen_random_uuid(),
  title text not null check(char_length(title) between 5 and 160),
  slug text unique not null check(slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$' and char_length(slug) between 3 and 120),
  description text not null check(char_length(description) between 30 and 350),
  category text not null check(category in('Software Engineering','Logistics Tech','Network Infrastructure')),
  content text not null check(char_length(content) between 100 and 80000),
  status text not null default 'draft' check(status in('draft','published')),
  author_id uuid references auth.users(id) on delete set null,
  published_at timestamptz,created_at timestamptz not null default now(),updated_at timestamptz not null default now()
);
create index if not exists blog_published_idx on public.blog_posts(status,published_at desc);
create or replace function public.webcom_blog_timestamps() returns trigger language plpgsql set search_path='' as $$
begin
new.updated_at=now();
if new.status='published' and (TG_OP='INSERT' or old.status='draft') then new.published_at=now(); end if;
if new.status='draft' then new.published_at=null; end if;
return new;
end;
$$;
drop trigger if exists blog_timestamps on public.blog_posts;
create trigger blog_timestamps before insert or update on public.blog_posts for each row execute function public.webcom_blog_timestamps();
alter table public.blog_posts enable row level security;
revoke all on public.blog_posts from anon,authenticated;
grant select on public.blog_posts to anon,authenticated;
grant insert,update,delete on public.blog_posts to authenticated;
drop policy if exists public_read_published on public.blog_posts;
create policy public_read_published on public.blog_posts for select to anon,authenticated using(status='published' and published_at<=now());
drop policy if exists admin_manage_posts on public.blog_posts;
create policy admin_manage_posts on public.blog_posts for all to authenticated using(exists(select 1 from public.admin_members where user_id=(select auth.uid()))) with check(exists(select 1 from public.admin_members where user_id=(select auth.uid())));
-- Create user via Supabase Authentication, then grant access from SQL editor:
-- insert into public.admin_members(user_id) values('ACTUAL-AUTH-USER-UUID') on conflict do nothing;
