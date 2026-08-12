-- ============================================================
-- Migration 001 — notices table
-- ============================================================
-- Stores school notices shown on the public Notice Board widget.
-- The application enforces a maximum of 3 notices at a time:
-- when a 4th is inserted the oldest (by created_at) is deleted first.
-- ============================================================

create table if not exists public.notices (
  id          uuid primary key default gen_random_uuid(),
  title       text        not null,
  description text        not null default '',
  -- attachments stores an optional JSON array of link objects:
  --   [{ "type": "link", "url": "https://...", "text": "label" }]
  attachments jsonb       null,
  posted_by   uuid        null references auth.users (id) on delete set null,
  date        timestamptz not null default now(),
  created_at  timestamptz not null default now()
);

-- Index so ORDER BY created_at is fast
create index if not exists notices_created_at_idx on public.notices (created_at desc);

-- ── Row-Level Security ────────────────────────────────────────────────────────
alter table public.notices enable row level security;

-- Anyone (including anonymous visitors) can read notices
create policy "Public read notices"
  on public.notices
  for select
  using (true);

-- Only authenticated admins can insert
create policy "Authenticated users can insert notices"
  on public.notices
  for insert
  with check (auth.role() = 'authenticated');

-- Only authenticated admins can delete
create policy "Authenticated users can delete notices"
  on public.notices
  for delete
  using (auth.role() = 'authenticated');

-- Only authenticated admins can update (kept for completeness)
create policy "Authenticated users can update notices"
  on public.notices
  for update
  using (auth.role() = 'authenticated');
