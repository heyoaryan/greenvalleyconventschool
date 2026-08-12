# Supabase Migrations

## How to apply

### Option A — Supabase Dashboard (easiest, no CLI needed)

1. Open your project at [supabase.com/dashboard](https://supabase.com/dashboard)
2. Go to **SQL Editor** → **New query**
3. Paste and run each migration file **in order**:

| # | File | What it does |
|---|------|--------------|
| 1 | `migrations/001_notices_table.sql` | Creates `notices` table + RLS policies |
| 2 | `migrations/002_gallery_photos_table.sql` | Creates `gallery_photos` table + RLS policies |
| 3 | `migrations/003_storage_bucket_and_policies.sql` | Creates `gallery` storage bucket + storage policies |
| 4 | `migrations/004_notices_limit_trigger.sql` | DB trigger: auto-delete oldest notice when 4th is inserted |
| 5 | `migrations/005_gallery_limit_trigger.sql` | DB trigger: auto-delete oldest gallery item when 13th is inserted |

---

### Option B — Supabase CLI

```bash
# Install CLI if you haven't already
npm install -g supabase

# Link to your project (get project-ref from dashboard URL)
supabase link --project-ref <your-project-ref>

# Push all migrations
supabase db push
```

---

## What each migration creates

### `notices` table
| Column | Type | Notes |
|--------|------|-------|
| `id` | uuid (PK) | auto-generated |
| `title` | text | required |
| `description` | text | required |
| `attachments` | jsonb | optional — stores link as `[{type:"link", url:"...", text:"..."}]` |
| `posted_by` | uuid (FK → auth.users) | set to the logged-in admin's ID |
| `date` | timestamptz | display date shown on the notice card |
| `created_at` | timestamptz | used for ordering and oldest-first deletion |

### `gallery_photos` table
| Column | Type | Notes |
|--------|------|-------|
| `id` | uuid (PK) | auto-generated |
| `filename` | text | just the filename (e.g. `1720000000-abc.jpg`) |
| `url` | text | full public URL from Supabase Storage |
| `caption` | text | shown below the media |
| `uploaded_by` | uuid (FK → auth.users) | set to the logged-in admin's ID |
| `uploaded_at` | timestamptz | legacy column, kept for compat |
| `created_at` | timestamptz | canonical timestamp — used for ordering and oldest-first deletion |

### `gallery` storage bucket
- **Public** — files readable by anyone via their public URL
- **Folder structure:** `images/` for photos, `videos/` for videos
- **50 MB** per file limit
- Allowed types: jpg, png, gif, webp, avif, mp4, webm, mov, avi, mkv, wmv

---

## Business rules enforced at two levels

| Rule | App code | DB trigger |
|------|----------|------------|
| Max 3 notices | `createNotice()` in `supabase.ts` | `trg_enforce_max_notices` (migration 004) |
| Max 12 gallery items | `uploadGalleryItem()` in `supabase.ts` | `trg_enforce_max_gallery` (migration 005) |

Both layers do the same thing — delete the oldest row before the new insert goes through.
The app handles it so the UI stays in sync; the DB trigger is a safety net for direct API calls.

---

## RLS summary

| Table / Bucket | SELECT | INSERT | UPDATE | DELETE |
|----------------|--------|--------|--------|--------|
| `notices` | everyone | authenticated | authenticated | authenticated |
| `gallery_photos` | everyone | authenticated | authenticated | authenticated |
| `storage.objects` (gallery) | everyone | authenticated | authenticated | authenticated |
