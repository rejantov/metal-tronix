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


<<<<<<< HEAD
-- ─── ROW LEVEL SECURITY ──────────────────────────────────────

alter table products enable row level security;
alter table quotes   enable row level security;
alter table partners enable row level security;
=======
-- Company settings — the "FROM" side of every receipt. Single row, id is always 1.
create table if not exists company_settings (
  id          integer primary key default 1 check (id = 1),
  name        text not null default 'Metal Tronix',
  address     text not null default '',
  phone       text not null default '',
  email       text not null default '',
  business_no text not null default '',
  logo_url    text,
  updated_at  timestamptz default now()
);

insert into company_settings (id) values (1) on conflict (id) do nothing;

-- Receipts — header + the "BILLED TO" side. Totals are stored so the list
-- and the search can work without loading every line item.
create table if not exists receipts (
  id                 uuid primary key default gen_random_uuid(),
  receipt_no         text not null unique,
  client_name        text not null default '',
  client_address     text not null default '',
  client_phone       text not null default '',
  client_email       text not null default '',
  client_business_no text not null default '',
  issue_date         date,
  due_date           date,
  issued_by          text not null default '',
  type_of_goods      text not null default '',
  subtotal_no_tax    numeric(12,2) not null default 0,
  discount_total     numeric(12,2) not null default 0,
  tax_total          numeric(12,2) not null default 0,
  total              numeric(12,2) not null default 0,
  amount_paid        numeric(12,2) not null default 0,
  balance_due        numeric(12,2) not null default 0,
  currency           text not null default 'EUR',
  -- The customer's language, so a reprint matches the original document.
  language           text not null default 'sq' check (language in ('sq', 'en')),
  created_at         timestamptz default now(),
  updated_at         timestamptz default now()
);

-- Receipt line items. Only the typed-in values are stored — every derived
-- column on the printed receipt (price w/o tax, tax, totals) is recomputed
-- from these in lib/receipt.ts, so the math lives in exactly one place.
create table if not exists receipt_items (
  id             uuid primary key default gen_random_uuid(),
  receipt_id     uuid not null references receipts(id) on delete cascade,
  position       integer not null default 1,
  code           text not null default '',
  product_name   text not null default '',
  qty            numeric(12,3) not null default 1,
  unit           text not null default 'pcs',
  price_with_tax numeric(12,4) not null default 0,
  discount_pct   numeric(5,2) not null default 0,
  tax_rate       numeric(5,2) not null default 18
);

create index if not exists receipt_items_receipt_id_idx on receipt_items (receipt_id);
create index if not exists receipts_receipt_no_idx      on receipts (receipt_no);
create index if not exists receipts_client_name_idx     on receipts (client_name);


-- ─── ROW LEVEL SECURITY ──────────────────────────────────────

alter table products         enable row level security;
alter table quotes           enable row level security;
alter table partners         enable row level security;
alter table company_settings enable row level security;
alter table receipts         enable row level security;
alter table receipt_items    enable row level security;

-- Receipts are internal business records: admins only, no public access.
create policy "receipts_auth_all"
  on receipts for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "receipt_items_auth_all"
  on receipt_items for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "company_settings_auth_read"
  on company_settings for select using (auth.role() = 'authenticated');

create policy "company_settings_auth_update"
  on company_settings for update using (auth.role() = 'authenticated');
>>>>>>> feature/our_story

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
<<<<<<< HEAD
=======
--   Bucket name: company-assets   (public: yes)   ← receipt logo
>>>>>>> feature/our_story
--
-- Then add these storage policies (Storage → Policies):
--
-- product-images: allow public SELECT (anyone can view images)
-- product-images: allow authenticated INSERT / DELETE
--
-- partner-logos: allow public SELECT
-- partner-logos: allow authenticated INSERT / DELETE
<<<<<<< HEAD
=======
--
-- company-assets: allow public SELECT
-- company-assets: allow authenticated INSERT / DELETE
>>>>>>> feature/our_story


-- ─── ADMIN USER ──────────────────────────────────────────────
-- Create the admin account in Supabase:
-- Authentication → Users → Invite user (or Add user)
-- Use: metal.tronixx@gmail.com  +  a strong password
-- Then share the credentials with your team — that is the login for /admin
