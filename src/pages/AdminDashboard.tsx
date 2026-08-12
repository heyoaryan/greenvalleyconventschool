import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, LogOut, Plus, Trash2, Upload, Image as ImageIcon, Megaphone, Video } from 'lucide-react';
import type { Notice, GalleryItem } from '../lib/supabase';
import {
  getNotices, createNotice, deleteNotice,
  getGalleryItems, uploadGalleryItem, deleteGalleryItem,
  signOutAdmin,
} from '../lib/supabase';

const MAX_NOTICES = 3;
const MAX_PHOTOS = 12;
const MAX_VIDEOS = 12;

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'notices' | 'gallery'>('notices');

  // ── Notices state ──
  const [notices, setNotices] = useState<Notice[]>([]);
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeDescription, setNoticeDescription] = useState('');
  const [noticeLink, setNoticeLink] = useState('');
  const [noticeLinkText, setNoticeLinkText] = useState('');
  const [noticeDate, setNoticeDate] = useState(new Date().toISOString().split('T')[0]);

  // ── Gallery state ──
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [mediaCaption, setMediaCaption] = useState('');
  const [mediaFiles, setMediaFiles] = useState<FileList | null>(null);
  const [uploadProgress, setUploadProgress] = useState<string>('');

  // ── Shared state ──
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const admin = localStorage.getItem('admin');
    if (!admin) { navigate('/admin/login'); return; }
    loadData();
  }, [navigate]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [noticesData, itemsData] = await Promise.all([getNotices(), getGalleryItems()]);
      setNotices(noticesData || []);
      setItems(itemsData || []);
    } catch (err) {
      console.error('Failed to load data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try { await signOutAdmin(); } catch (_) {}
    localStorage.removeItem('admin');
    navigate('/admin/login');
  };

  // ── Notice handlers ──
  const handleCreateNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noticeTitle.trim() || !noticeDescription.trim()) return;
    setSubmitting(true);
    try {
      await createNotice({
        title: noticeTitle.trim(),
        description: noticeDescription.trim(),
        link: noticeLink.trim() || undefined,
        link_text: noticeLinkText.trim() || undefined,
        date: noticeDate,
      });
      setNoticeTitle('');
      setNoticeDescription('');
      setNoticeLink('');
      setNoticeLinkText('');
      setNoticeDate(new Date().toISOString().split('T')[0]);
      await loadData();
    } catch (err: any) {
      const msg = err?.message || '';
      alert(
        msg.includes('row-level security') || msg.includes('RLS')
          ? 'Blocked by Supabase RLS. Add an INSERT policy for authenticated users on public.notices.'
          : 'Failed to add notice: ' + msg,
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteNotice = async (id: string) => {
    if (!confirm('Delete this notice?')) return;
    try {
      await deleteNotice(id);
      await loadData();
    } catch (err: any) {
      alert('Failed to delete notice: ' + (err?.message || 'Please try again.'));
    }
  };

  // ── Gallery handlers ──
  const handleUploadMedia = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mediaFiles || mediaFiles.length === 0) return;

    const files = Array.from(mediaFiles);
    setSubmitting(true);
    setUploadProgress('');

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setUploadProgress(`Uploading ${i + 1} of ${files.length}: ${file.name}`);
        await uploadGalleryItem(file, mediaCaption.trim() || file.name);
      }
      setMediaCaption('');
      setMediaFiles(null);
      // Reset the file input
      const input = document.getElementById('media-file-input') as HTMLInputElement | null;
      if (input) input.value = '';
      await loadData();
    } catch (err: any) {
      const msg = err?.message || '';
      alert(
        msg.includes('row-level security') || msg.includes('RLS')
          ? 'Upload blocked by Supabase RLS. Add INSERT policies for gallery_photos and the gallery storage bucket.'
          : 'Upload failed: ' + msg,
      );
    } finally {
      setSubmitting(false);
      setUploadProgress('');
    }
  };

  const handleDeleteItem = async (id: string, url: string) => {
    if (!confirm('Delete this media item?')) return;
    try {
      await deleteGalleryItem(id, url);
      await loadData();
    } catch (err: any) {
      alert('Failed to delete item: ' + (err?.message || 'Please try again.'));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-school-cream flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-school-green border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const photosCount = items.filter(i => i.media_type === 'image').length;
  const videosCount = items.filter(i => i.media_type === 'video').length;

  return (
    <div className="min-h-screen bg-school-cream">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="section-container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-500">Manage notices and gallery</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="section-container py-6 sm:py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-100">
            <button
              onClick={() => setActiveTab('notices')}
              className={`flex-1 sm:flex-none px-6 py-4 text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                activeTab === 'notices'
                  ? 'text-school-green border-b-2 border-school-green bg-school-green/5'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Megaphone className="w-4 h-4" />
              Notices
              <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600">
                {notices.length}/{MAX_NOTICES}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('gallery')}
              className={`flex-1 sm:flex-none px-6 py-4 text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                activeTab === 'gallery'
                  ? 'text-school-green border-b-2 border-school-green bg-school-green/5'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              Gallery
              <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600">
                {photosCount}/{MAX_PHOTOS} photos · {videosCount}/{MAX_VIDEOS} videos
              </span>
            </button>
          </div>

          <div className="p-6 sm:p-8">
            {/* ── NOTICES TAB ── */}
            {activeTab === 'notices' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Add form */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <h3 className="text-lg font-bold text-gray-900">Add New Notice</h3>
                    {notices.length >= MAX_NOTICES && (
                      <span className="px-2 py-0.5 text-xs bg-amber-100 text-amber-700 rounded-full font-medium">
                        Oldest will be removed
                      </span>
                    )}
                  </div>
                  <form onSubmit={handleCreateNotice} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                      <input
                        type="text"
                        value={noticeTitle}
                        onChange={(e) => setNoticeTitle(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-school-green/20 focus:border-school-green outline-none transition-all"
                        placeholder="Notice title"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea
                        value={noticeDescription}
                        onChange={(e) => setNoticeDescription(e.target.value)}
                        rows={4}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-school-green/20 focus:border-school-green outline-none transition-all resize-none"
                        placeholder="Notice description"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                      <input
                        type="date"
                        value={noticeDate}
                        onChange={(e) => setNoticeDate(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-school-green/20 focus:border-school-green outline-none transition-all"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Link (optional)</label>
                      <input
                        type="url"
                        value={noticeLink}
                        onChange={(e) => setNoticeLink(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-school-green/20 focus:border-school-green outline-none transition-all"
                        placeholder="https://example.com"
                      />
                    </div>

                    {noticeLink && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Link Text</label>
                        <input
                          type="text"
                          value={noticeLinkText}
                          onChange={(e) => setNoticeLinkText(e.target.value)}
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-school-green/20 focus:border-school-green outline-none transition-all"
                          placeholder="Click here"
                        />
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3 bg-school-green text-white font-semibold rounded-lg hover:bg-school-green/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      {submitting ? 'Adding...' : 'Add Notice'}
                    </button>
                  </form>
                </div>

                {/* Existing notices */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Current Notices ({notices.length}/{MAX_NOTICES})
                  </h3>
                  <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                    {notices.length === 0 ? (
                      <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                        <Megaphone className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-sm text-gray-500">No notices yet</p>
                      </div>
                    ) : (
                      notices.map((notice, index) => (
                        <div
                          key={notice.id}
                          className="bg-gray-50 rounded-xl p-4 border border-gray-100 group relative"
                        >
                          {index === notices.length - 1 && notices.length === MAX_NOTICES && (
                            <div className="absolute -top-1.5 left-3">
                              <span className="px-2 py-0.5 text-xs bg-amber-100 text-amber-700 rounded-full font-medium">
                                Oldest — next to go
                              </span>
                            </div>
                          )}
                          <div className="flex items-start justify-between gap-3 mt-1">
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-gray-900 text-sm truncate mb-0.5">
                                {notice.title}
                              </h4>
                              <p className="text-xs text-gray-400 mb-1.5">
                                {new Date(notice.date).toLocaleDateString('en-IN')}
                              </p>
                              <p className="text-sm text-gray-600 line-clamp-2">{notice.description}</p>
                              {notice.link && (
                                <a
                                  href={notice.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs text-school-green hover:underline mt-1 inline-block"
                                >
                                  {notice.link_text || 'View link'}
                                </a>
                              )}
                            </div>
                            <button
                              onClick={() => handleDeleteNotice(notice.id)}
                              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100 flex-shrink-0"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ── GALLERY TAB ── */}
            {activeTab === 'gallery' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Upload form */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <h3 className="text-lg font-bold text-gray-900">Upload Media</h3>
                    {(photosCount >= MAX_PHOTOS || videosCount >= MAX_VIDEOS) && (
                      <span className="px-2 py-0.5 text-xs bg-amber-100 text-amber-700 rounded-full font-medium">
                        {photosCount >= MAX_PHOTOS && videosCount >= MAX_VIDEOS
                          ? 'Photos & videos full — oldest will be removed'
                          : photosCount >= MAX_PHOTOS
                          ? 'Photos full — oldest photo will be removed'
                          : 'Videos full — oldest video will be removed'}
                      </span>
                    )}
                  </div>

                  <div className="mb-4 flex gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <ImageIcon className="w-4 h-4 text-school-green" />
                      {photosCount}/{MAX_PHOTOS} photos
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Video className="w-4 h-4 text-school-green" />
                      {videosCount}/{MAX_VIDEOS} videos
                    </span>
                  </div>

                  <form onSubmit={handleUploadMedia} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Caption</label>
                      <input
                        type="text"
                        value={mediaCaption}
                        onChange={(e) => setMediaCaption(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-school-green/20 focus:border-school-green outline-none transition-all"
                        placeholder="e.g. Annual Day 2025"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Photos &amp; Videos
                      </label>
                      <input
                        id="media-file-input"
                        type="file"
                        accept="image/*,video/*"
                        multiple
                        onChange={(e) => setMediaFiles(e.target.files)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-school-green/20 focus:border-school-green outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-school-green file:text-white file:font-medium file:text-sm hover:file:bg-school-green/90"
                        required
                      />
                      <p className="text-xs text-gray-500 mt-1.5">
                        Photos max {MAX_PHOTOS}, videos max {MAX_VIDEOS}. Each type is tracked separately — uploading a photo never removes a video and vice versa.
                      </p>
                    </div>

                    {uploadProgress && (
                      <p className="text-xs text-school-green font-medium animate-pulse">
                        {uploadProgress}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3 bg-school-green text-white font-semibold rounded-lg hover:bg-school-green/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                    >
                      <Upload className="w-4 h-4" />
                      {submitting ? 'Uploading...' : 'Upload Media'}
                    </button>
                  </form>
                </div>

                {/* Current gallery grid */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Gallery ({photosCount}/{MAX_PHOTOS} photos · {videosCount}/{MAX_VIDEOS} videos)
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[520px] overflow-y-auto pr-1">
                    {items.length === 0 ? (
                      <div className="col-span-full text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                        <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-sm text-gray-500">No media uploaded yet</p>
                      </div>
                    ) : (
                      items.map((item) => (
                        <div
                          key={item.id}
                          className="group relative aspect-square rounded-xl overflow-hidden bg-gray-100 shadow-sm border border-gray-100"
                        >
                          {item.media_type === 'video' ? (
                            <div className="w-full h-full flex items-center justify-center bg-gray-800">
                              <Video className="w-8 h-8 text-white/60" />
                            </div>
                          ) : (
                            <img
                              src={item.url}
                              alt={item.caption}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          )}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <button
                              onClick={() => handleDeleteItem(item.id, item.url)}
                              className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
                            <div className="flex items-center gap-1">
                              {item.media_type === 'video' ? (
                                <Video className="w-3 h-3 text-white/80 flex-shrink-0" />
                              ) : (
                                <ImageIcon className="w-3 h-3 text-white/80 flex-shrink-0" />
                              )}
                              <p className="text-white text-xs font-medium truncate">{item.caption}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
