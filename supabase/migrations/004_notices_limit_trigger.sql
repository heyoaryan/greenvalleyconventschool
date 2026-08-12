-- ============================================================
-- Migration 004 — DB-level trigger: enforce max 3 notices
-- ============================================================
-- This is a safety net that runs *inside* Postgres.
-- The application code already deletes the oldest notice before
-- inserting (in supabase.ts → createNotice), but this trigger
-- makes the rule bulletproof even if the app logic is bypassed
-- (e.g. direct REST calls, future admin tools, etc.).
--
-- Logic: BEFORE INSERT on notices
--   • Count existing rows
--   • If count >= 3, delete the oldest row (lowest created_at)
-- ============================================================

create or replace function public.enforce_max_notices()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_count  int;
  v_oldest uuid;
begin
  select count(*) into v_count from public.notices;

  if v_count >= 3 then
    -- find the oldest notice
    select id into v_oldest
    from public.notices
    order by created_at asc
    limit 1;

    -- delete it
    delete from public.notices where id = v_oldest;
  end if;

  return new;
end;
$$;

-- Drop and recreate so re-running the migration is idempotent
drop trigger if exists trg_enforce_max_notices on public.notices;

create trigger trg_enforce_max_notices
  before insert on public.notices
  for each row
  execute function public.enforce_max_notices();
