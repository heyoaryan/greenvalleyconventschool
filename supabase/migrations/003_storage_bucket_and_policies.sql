-- ============================================================
-- Migration 003 — "gallery" storage bucket + policies
-- ============================================================
-- Creates the storage bucket that holds gallery media and sets
-- up the access policies to match the RLS on gallery_photos.
--
-- Folder layout inside the bucket:
--   gallery/images/<timestamp>-<random>.<ext>   → photos
--   gallery/videos/<timestamp>-<random>.<ext>   → videos
-- ============================================================

-- Create the bucket if it doesn't exist yet.
-- public = true means the GET /object/public/gallery/... URL works
-- without a signed URL (required for <img src> and <video src>).
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'gallery',
  'gallery',
  true,
  52428800,   -- 50 MB per file
  array[
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/avif',
    'video/mp4',
    'video/webm',
    'video/quicktime',
    'video/x-msvideo',
    'video/x-matroska',
    'video/x-ms-wmv',
    'video/mp2t'
  ]
)
on conflict (id) do update
  set public            = excluded.public,
      file_size_limit   = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

-- ── Storage RLS policies ──────────────────────────────────────────────────────

-- 1. Public read (SELECT) — anyone can fetch files by public URL
create policy "Public can read gallery files"
  on storage.objects
  for select
  using (bucket_id = 'gallery');

-- 2. Authenticated admins can upload (INSERT)
create policy "Authenticated users can upload gallery files"
  on storage.objects
  for insert
  with check (
    bucket_id = 'gallery'
    and auth.role() = 'authenticated'
  );

-- 3. Authenticated admins can delete files
create policy "Authenticated users can delete gallery files"
  on storage.objects
  for delete
  using (
    bucket_id = 'gallery'
    and auth.role() = 'authenticated'
  );

-- 4. Authenticated admins can update (overwrite) files
create policy "Authenticated users can update gallery files"
  on storage.objects
  for update
  using (
    bucket_id = 'gallery'
    and auth.role() = 'authenticated'
  );
