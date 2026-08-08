-- ============================================================
-- Metal Tronix — Supabase Database & Storage Setup
-- Run this in the Supabase SQL Editor (supabase.com → your project → SQL Editor)
-- ============================================================


-- ─── TABLES ──────────────────────────────────────────────────

-- Products table
create table if not exists products (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  description text not null,
  category    text not null check (category in (
    'Laser Cutting',
    'Press Brake Forming',
    'Tube & Pipe',
    'Custom Fabrication',
    'Assemblies'
  )),
  image_url   text not null,
  created_at  timestamptz default now()
);

-- Quotes table
create table if not exists quotes (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  company    text,
  email      text not null,
  phone      text,
  service    text not null,
  material   text,
  quantity   text,
  message    text not null,
  read       boolean not null default false,
  created_at timestamptz default now()
);

-- Partners table
create table if not exists partners (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  logo_url      text,
  initials      char(2) not null,
  display_order integer not null default 1,
  created_at    timestamptz default now()
);


-- ─── ROW LEVEL SECURITY ──────────────────────────────────────

alter table products enable row level security;
alter table quotes   enable row level security;
alter table partners enable row level security;

-- Products: anyone can read; only authenticated users (admins) can write
create policy "products_public_read"
  on products for select using (true);

create policy "products_auth_insert"
  on products for insert with check (auth.role() = 'authenticated');

create policy "products_auth_delete"
  on products for delete using (auth.role() = 'authenticated');

-- Quotes: anonymous visitors can insert (contact form); only admins can read/update
create policy "quotes_anon_insert"
  on quotes for insert with check (true);

create policy "quotes_auth_read"
  on quotes for select using (auth.role() = 'authenticated');

create policy "quotes_auth_update"
  on quotes for update using (auth.role() = 'authenticated');

-- Partners: anyone can read; only authenticated users can write
create policy "partners_public_read"
  on partners for select using (true);

create policy "partners_auth_insert"
  on partners for insert with check (auth.role() = 'authenticated');

create policy "partners_auth_update"
  on partners for update using (auth.role() = 'authenticated');

create policy "partners_auth_delete"
  on partners for delete using (auth.role() = 'authenticated');


-- ─── STORAGE BUCKETS ─────────────────────────────────────────
-- Run these in the Supabase Storage UI or via the SQL editor using the storage schema.
-- Go to Storage → New bucket → set as Public and use the names below.
--
--   Bucket name: product-images   (public: yes)
--   Bucket name: partner-logos    (public: yes)
--
-- Then add these storage policies (Storage → Policies):
--
-- product-images: allow public SELECT (anyone can view images)
-- product-images: allow authenticated INSERT / DELETE
--
-- partner-logos: allow public SELECT
-- partner-logos: allow authenticated INSERT / DELETE


-- ─── ADMIN USER ──────────────────────────────────────────────
-- Create the admin account in Supabase:
-- Authentication → Users → Invite user (or Add user)
-- Use: metal.tronixx@gmail.com  +  a strong password
-- Then share the credentials with your team — that is the login for /admin
