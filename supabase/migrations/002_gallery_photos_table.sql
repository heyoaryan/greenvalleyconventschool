-- ============================================================
-- Migration 002 — gallery_photos table
-- ============================================================
-- Stores metadata for gallery media (images and videos).
-- The actual files live in the "gallery" storage bucket under
--   images/<filename>   — for photos
--   videos/<filename>   — for videos
-- The application enforces a maximum of 12 items at a time:
-- when a 13th is uploaded the oldest (by created_at) is deleted
-- from both storage and this table first.
-- ============================================================

create table if not exists public.gallery_photos (
  id          uuid        primary key default gen_random_uuid(),
  filename    text        not null,
  -- full public URL returned by supabase.storage.getPublicUrl()
  url         text        not null,
  caption     text        not null default '',
  uploaded_by uuid        null references auth.users (id) on delete set null,
  -- uploaded_at kept for backwards compat; created_at is the canonical timestamp
  uploaded_at timestamptz null default now(),
  created_at  timestamptz not null default now()
);

-- Index so ORDER BY created_at is fast (used for both reads and oldest-first deletes)
create index if not exists gallery_photos_created_at_idx
  on public.gallery_photos (created_at asc);

-- ── Row-Level Security ────────────────────────────────────────────────────────
alter table public.gallery_photos enable row level security;

-- Anyone can view gallery items
create policy "Public read gallery_photos"
  on public.gallery_photos
  for select
  using (true);

-- Only authenticated admins can insert
create policy "Authenticated users can insert gallery_photos"
  on public.gallery_photos
  for insert
  with check (auth.role() = 'authenticated');

-- Only authenticated admins can delete
create policy "Authenticated users can delete gallery_photos"
  on public.gallery_photos
  for delete
  using (auth.role() = 'authenticated');

-- Only authenticated admins can update
create policy "Authenticated users can update gallery_photos"
  on public.gallery_photos
  for update
  using (auth.role() = 'authenticated');
