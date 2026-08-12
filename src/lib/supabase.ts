import { supabase } from './supabaseClient';

// ─── Constants ───────────────────────────────────────────────────────────────
const GALLERY_BUCKET = 'gallery';
const MAX_NOTICES = 3;
const MAX_PHOTOS = 12;  // photos alag limit
const MAX_VIDEOS = 12;  // videos alag limit

// ─── Types ───────────────────────────────────────────────────────────────────
export interface NoticeFormData {
  title: string;
  description: string;
  link?: string;
  link_text?: string;
  date: string;
}

export interface Notice {
  id: string;
  title: string;
  description: string;
  link?: string;
  link_text?: string;
  date: string;
  created_at: string;
}

export interface GalleryItem {
  id: string;
  filename: string;
  url: string;
  caption: string;
  media_type: 'image' | 'video';
  uploaded_by: string | null;
  created_at: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function getStoragePathFromPublicUrl(url: string, bucket: string): string {
  const marker = `/object/public/${bucket}/`;
  const idx = url.indexOf(marker);
  if (idx !== -1) return decodeURIComponent(url.slice(idx + marker.length));
  try {
    const u = new URL(url);
    const parts = u.pathname.split(marker);
    if (parts.length > 1) return decodeURIComponent(parts[1]);
  } catch (_) {
    // ignore
  }
  return url.split('/').slice(-2).join('/');
}

function detectMediaType(url: string, filename: string): 'image' | 'video' {
  if (url.includes('/videos/')) return 'video';
  if (url.includes('/images/')) return 'image';
  const ext = filename.split('.').pop()?.toLowerCase() ?? '';
  const videoExts = ['mp4', 'mov', 'avi', 'webm', 'mkv', 'wmv', 'm4v'];
  return videoExts.includes(ext) ? 'video' : 'image';
}

async function ensureAuthenticatedAdmin() {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) {
    throw new Error('Admin session is missing or expired. Please sign in again.');
  }
  return user;
}

// ─── Auth ─────────────────────────────────────────────────────────────────────
export async function signInAdmin(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function signUpAdmin(email: string, password: string, fullName?: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName || email } },
  });
  if (error) throw error;
  return data;
}

export async function signOutAdmin() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

// ─── Notices ──────────────────────────────────────────────────────────────────

/**
 * Fetch all notices, newest first.
 * Max MAX_NOTICES (3) exist at any time — enforced in createNotice.
 */
export async function getNotices(): Promise<Notice[]> {
  const { data, error } = await supabase
    .from('notices')
    .select('id, title, description, attachments, date, created_at')
    .order('created_at', { ascending: false });

  if (error) throw error;

  return (data || []).map((n: any): Notice => {
    let link: string | undefined;
    let link_text: string | undefined;
    if (n.attachments) {
      try {
        const att = typeof n.attachments === 'string'
          ? JSON.parse(n.attachments)
          : n.attachments;
        const found = Array.isArray(att) ? att.find((a: any) => a.type === 'link') : null;
        if (found) { link = found.url ?? undefined; link_text = found.text ?? undefined; }
      } catch (_) { /* ignore */ }
    }
    return {
      id: String(n.id),
      title: n.title ?? '',
      description: n.description ?? '',
      link,
      link_text,
      date: n.date ?? n.created_at ?? '',
      created_at: n.created_at ?? '',
    };
  });
}

/**
 * Create a notice.
 * Enforces MAX_NOTICES (3) — deletes oldest from DB before inserting.
 */
export async function createNotice(notice: NoticeFormData): Promise<Notice> {
  await ensureAuthenticatedAdmin();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: existing, error: fetchError } = await supabase
    .from('notices')
    .select('id, created_at')
    .order('created_at', { ascending: true });

  if (fetchError) throw fetchError;

  const currentCount = (existing || []).length;
  if (currentCount >= MAX_NOTICES) {
    const toDelete = (existing || []).slice(0, currentCount - MAX_NOTICES + 1);
    for (const old of toDelete) {
      const { error: delError } = await supabase.from('notices').delete().eq('id', old.id);
      if (delError) console.error('Failed to delete old notice:', delError);
    }
  }

  const payload: any = {
    title: notice.title,
    description: notice.description ?? '',
    posted_by: user?.id ?? null,
    date: notice.date ? new Date(notice.date).toISOString() : new Date().toISOString(),
  };

  if (notice.link) {
    payload.attachments = JSON.stringify([
      { type: 'link', url: notice.link, text: notice.link_text ?? null },
    ]);
  }

  const { data, error } = await supabase
    .from('notices')
    .insert([payload])
    .select()
    .single();

  if (error) throw error;

  return {
    id: String(data.id),
    title: data.title ?? '',
    description: data.description ?? '',
    link: notice.link || undefined,
    link_text: notice.link_text || undefined,
    date: data.date ?? data.created_at ?? '',
    created_at: data.created_at ?? '',
  };
}

export async function deleteNotice(id: string): Promise<void> {
  await ensureAuthenticatedAdmin();
  const { error } = await supabase.from('notices').delete().eq('id', id);
  if (error) throw error;
}

// ─── Gallery ──────────────────────────────────────────────────────────────────

/**
 * Fetch all gallery items (photos + videos), newest first.
 */
export async function getGalleryItems(): Promise<GalleryItem[]> {
  const { data, error } = await supabase
    .from('gallery_photos')
    .select('id, filename, url, caption, uploaded_by, created_at, uploaded_at')
    .order('created_at', { ascending: false });

  if (error) throw error;

  return (data || []).map((p: any): GalleryItem => ({
    id: String(p.id),
    filename: p.filename ?? '',
    url: p.url ?? '',
    caption: p.caption ?? '',
    media_type: detectMediaType(p.url ?? '', p.filename ?? ''),
    uploaded_by: p.uploaded_by ?? null,
    created_at: p.created_at ?? p.uploaded_at ?? '',
  }));
}

export const getGalleryPhotos = getGalleryItems;

/**
 * Upload a single file to the gallery.
 *
 * Photos aur videos ka limit ALAG-ALAG hai:
 *   - Images  → max MAX_PHOTOS (12) — sirf images/  folder ke items count
 *   - Videos  → max MAX_VIDEOS (12) — sirf videos/ folder ke items count
 *
 * Agar usi type ka limit full ho toh usi type ka oldest item
 * storage + DB dono se delete hota hai pehle.
 */
export async function uploadGalleryItem(file: File, caption: string): Promise<GalleryItem> {
  await ensureAuthenticatedAdmin();

  const isVideo = file.type.startsWith('video/');
  const folder = isVideo ? 'videos' : 'images';
  const limit = isVideo ? MAX_VIDEOS : MAX_PHOTOS;
  const mediaType: 'image' | 'video' = isVideo ? 'video' : 'image';

  // 1. Fetch ALL existing items oldest-first, then filter to same type
  const { data: allExisting, error: fetchError } = await supabase
    .from('gallery_photos')
    .select('id, url, filename, created_at')
    .order('created_at', { ascending: true });

  if (fetchError) throw fetchError;

  const sameTypeItems = (allExisting || []).filter(
    (item) => detectMediaType(item.url ?? '', item.filename ?? '') === mediaType,
  );

  // 2. Delete oldest of the same type until we're below the limit
  const currentCount = sameTypeItems.length;
  if (currentCount >= limit) {
    const toDelete = sameTypeItems.slice(0, currentCount - limit + 1);
    for (const old of toDelete) {
      const storagePath = getStoragePathFromPublicUrl(old.url ?? '', GALLERY_BUCKET);
      const { error: storageErr } = await supabase.storage
        .from(GALLERY_BUCKET)
        .remove([storagePath]);
      if (storageErr) console.error('Storage delete error:', storageErr);

      const { error: dbErr } = await supabase
        .from('gallery_photos')
        .delete()
        .eq('id', old.id);
      if (dbErr) console.error('DB delete error:', dbErr);
    }
  }

  // 3. Upload new file to storage under images/ or videos/
  const fileExt = file.name.split('.').pop() || (isVideo ? 'mp4' : 'jpg');
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
  const filePath = `${folder}/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from(GALLERY_BUCKET)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.type || undefined,
    });

  if (uploadError) throw uploadError;

  const { data: publicData } = supabase.storage
    .from(GALLERY_BUCKET)
    .getPublicUrl(filePath) as any;
  const publicUrl: string = publicData?.publicUrl ?? '';

  // 4. Insert DB row
  const { data: { user } } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from('gallery_photos')
    .insert([{
      filename: fileName,
      url: publicUrl,
      caption: caption || file.name,
      uploaded_by: user?.id ?? null,
    }])
    .select()
    .single();

  if (error) throw error;

  return {
    id: String(data.id),
    filename: data.filename ?? fileName,
    url: data.url ?? publicUrl,
    caption: data.caption ?? caption,
    media_type: mediaType,
    uploaded_by: data.uploaded_by ?? null,
    created_at: data.created_at ?? data.uploaded_at ?? '',
  };
}

export const uploadGalleryPhoto = uploadGalleryItem;

export async function deleteGalleryItem(id: string, url: string): Promise<void> {
  await ensureAuthenticatedAdmin();

  const filePath = getStoragePathFromPublicUrl(url, GALLERY_BUCKET);
  const { error: storageError } = await supabase.storage
    .from(GALLERY_BUCKET)
    .remove([filePath]);
  if (storageError) console.error('Storage delete error:', storageError);

  const { error } = await supabase.from('gallery_photos').delete().eq('id', id);
  if (error) throw error;
}

export const deleteGalleryPhoto = deleteGalleryItem;
