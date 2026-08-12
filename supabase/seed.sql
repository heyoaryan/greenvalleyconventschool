-- ============================================================
-- Seed — optional test data
-- Run this ONLY in development / staging, never in production.
-- ============================================================

-- Clear existing data first (safe for dev resets)
truncate public.gallery_photos restart identity cascade;
truncate public.notices        restart identity cascade;

-- Sample notices (max 3 will be kept by the trigger anyway)
insert into public.notices (title, description, date) values
  (
    'School Reopens After Summer Break',
    'All students are requested to report on 1st July 2025. Please bring the fee receipt and updated medical certificate.',
    '2025-06-25 09:00:00+05:30'
  ),
  (
    'Annual Sports Day — Registration Open',
    'Students from Class 3 onwards can register for track, field, and team events. Last date: 10th July 2025.',
    '2025-07-01 09:00:00+05:30'
  ),
  (
    'Parent-Teacher Meeting',
    'PTM scheduled for 20th July 2025 from 9 AM to 1 PM. All parents are requested to attend.',
    '2025-07-10 09:00:00+05:30'
  );
