-- ============================================================
-- Migration 005 — DB-level trigger: enforce per-type gallery limits
-- ============================================================
-- Photos aur videos ke limits ALAG-ALAG hain:
--   images/  folder  → max 12 photos
--   videos/  folder  → max 12 videos
--
-- Media type URL se detect hota hai:
--   url LIKE '%/images/%'  → photo
--   url LIKE '%/videos/%'  → video
--
-- BEFORE INSERT on gallery_photos:
--   1. Naya item ka type detect karo
--   2. Usi type ke existing items count karo
--   3. Count >= limit hone par usi type ka oldest row delete karo
--
-- NOTE: Yeh trigger sirf DB row delete karta hai.
-- Normal app flow mein (uploadGalleryItem) storage file bhi
-- delete hoti hai. Yeh trigger direct DB insert ka safety net hai.
-- ============================================================

create or replace function public.enforce_gallery_type_limit()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_media_type text;
  v_count      int;
  v_oldest_id  uuid;
  v_limit      int := 12;
begin
  -- Detect type from URL path
  if new.url like '%/videos/%' then
    v_media_type := 'video';
  else
    v_media_type := 'image';
  end if;

  -- Count existing rows of the same type
  if v_media_type = 'video' then
    select count(*) into v_count
    from public.gallery_photos
    where url like '%/videos/%';
  else
    select count(*) into v_count
    from public.gallery_photos
    where url like '%/images/%'
       or (url not like '%/videos/%');
  end if;

  -- If at or above the limit, delete the oldest of the same type
  if v_count >= v_limit then
    if v_media_type = 'video' then
      select id into v_oldest_id
      from public.gallery_photos
      where url like '%/videos/%'
      order by created_at asc
      limit 1;
    else
      select id into v_oldest_id
      from public.gallery_photos
      where url like '%/images/%'
         or (url not like '%/videos/%')
      order by created_at asc
      limit 1;
    end if;

    if v_oldest_id is not null then
      delete from public.gallery_photos where id = v_oldest_id;
    end if;
  end if;

  return new;
end;
$$;

-- Drop and recreate (idempotent)
drop trigger if exists trg_enforce_gallery_type_limit on public.gallery_photos;
drop trigger if exists trg_enforce_max_gallery        on public.gallery_photos;

create trigger trg_enforce_gallery_type_limit
  before insert on public.gallery_photos
  for each row
  execute function public.enforce_gallery_type_limit();
