import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Image, Video, X, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import type { GalleryItem } from '../lib/supabase';
import { getGalleryItems } from '../lib/supabase';

export default function Gallery() {
  const [activeTab, setActiveTab] = useState<'photos' | 'videos'>('photos');
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [brokenIds, setBrokenIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getGalleryItems();
        setItems(data || []);
      } catch (err) {
        console.error('Failed to load gallery:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [lightboxIndex]);

  const photos = items.filter((i) => i.media_type === 'image');
  const videos = items.filter((i) => i.media_type === 'video');
  const activeItems = activeTab === 'photos' ? photos : videos;

  const markBroken = (id: string) => {
    setBrokenIds((prev) => { const s = new Set(prev); s.add(id); return s; });
  };

  const prev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + activeItems.length) % activeItems.length);
  };

  const next = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % activeItems.length);
  };

  const closeLightbox = () => setLightboxIndex(null);

  if (loading) {
    return (
      <section className="min-h-screen bg-school-cream pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16 md:pb-20">
        <div className="section-container">
          <div className="text-center py-20">
            <div className="w-12 h-12 border-4 border-school-green border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading gallery...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-school-cream pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16 md:pb-20">
      <div className="section-container">
        {/* Back */}
        <div className="mb-5 sm:mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 bg-white text-school-green font-semibold text-sm rounded-lg shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        {/* Heading */}
        <div className="text-center mb-7 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
            Gallery
          </h2>
          <div className="accent-line" />
          <p className="section-subheading">
            Explore our school through photos and videos showcasing our facilities, events, and achievements
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex justify-center mb-7 sm:mb-10">
          <div className="inline-flex bg-white rounded-lg p-1 shadow-sm border border-gray-100 w-full max-w-xs sm:max-w-none sm:w-auto">
            <button
              onClick={() => { setActiveTab('photos'); setLightboxIndex(null); }}
              className={`flex-1 sm:flex-none px-5 sm:px-8 py-2.5 rounded-md font-semibold text-sm sm:text-base transition-all duration-300 flex items-center justify-center gap-2 ${
                activeTab === 'photos'
                  ? 'bg-school-green text-white shadow-sm'
                  : 'text-gray-600 hover:text-school-green'
              }`}
            >
              <Image className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              Photos
              <span className="text-xs opacity-75">({photos.length})</span>
            </button>
            <button
              onClick={() => { setActiveTab('videos'); setLightboxIndex(null); }}
              className={`flex-1 sm:flex-none px-5 sm:px-8 py-2.5 rounded-md font-semibold text-sm sm:text-base transition-all duration-300 flex items-center justify-center gap-2 ${
                activeTab === 'videos'
                  ? 'bg-school-green text-white shadow-sm'
                  : 'text-gray-600 hover:text-school-green'
              }`}
            >
              <Video className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              Videos
              <span className="text-xs opacity-75">({videos.length})</span>
            </button>
          </div>
        </div>

        {/* Empty state */}
        {activeItems.length === 0 && (
          <div className="text-center py-20">
            {activeTab === 'photos'
              ? <Image className="w-16 h-16 text-gray-200 mx-auto mb-4" />
              : <Video className="w-16 h-16 text-gray-200 mx-auto mb-4" />
            }
            <p className="text-gray-400 text-lg font-medium">No {activeTab} uploaded yet</p>
          </div>
        )}

        {/* Photos grid */}
        {activeTab === 'photos' && photos.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
            {photos.map((photo, index) => (
              <div
                key={photo.id}
                onClick={() => setLightboxIndex(index)}
                className="group relative overflow-hidden rounded-xl sm:rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer bg-gray-100 aspect-square"
              >
                {brokenIds.has(photo.id) ? (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-school-green/10 to-school-green/5">
                    <Image className="w-8 h-8 sm:w-10 sm:h-10 text-school-green/30" />
                  </div>
                ) : (
                  <img
                    src={photo.url}
                    alt={photo.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={() => markBroken(photo.id)}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 md:p-4">
                    <p className="text-white font-medium text-xs sm:text-sm truncate">{photo.caption}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Videos grid */}
        {activeTab === 'videos' && videos.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {videos.map((video, index) => (
              <div
                key={video.id}
                onClick={() => setLightboxIndex(index)}
                className="group relative overflow-hidden rounded-xl sm:rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer bg-gray-100"
              >
                <div className="aspect-video relative bg-gray-900 flex items-center justify-center">
                  <Video className="w-12 h-12 text-white/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                      <Video className="w-5 h-5 sm:w-7 sm:h-7 text-school-green ml-0.5" />
                    </div>
                  </div>
                </div>
                <div className="p-3 sm:p-4 bg-white">
                  <p className="font-medium text-sm text-gray-900 truncate">{video.caption}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Lightbox */}
        {lightboxIndex !== null && activeItems.length > 0 && (
          <div
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close — always top-right, safe from notch */}
            <button
              onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
              className="absolute top-3 right-3 sm:top-5 sm:right-5 text-white z-20 bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Prev — vertically centred, never overlaps media on small screens */}
            {activeItems.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 text-white z-20 bg-black/50 rounded-full p-2 sm:p-2.5 hover:bg-black/70 transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
              </button>
            )}

            {/* Next */}
            {activeItems.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-white z-20 bg-black/50 rounded-full p-2 sm:p-2.5 hover:bg-black/70 transition-colors"
                aria-label="Next"
              >
                <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
              </button>
            )}

            {/* Media container — padded so nav buttons don't overlap */}
            <div
              className="w-full max-w-5xl mx-auto flex flex-col gap-3 px-12 sm:px-16 max-h-[95vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {activeItems[lightboxIndex].media_type === 'video' ? (
                <video
                  key={activeItems[lightboxIndex].id}
                  src={activeItems[lightboxIndex].url}
                  controls
                  autoPlay
                  className="w-full max-h-[72vh] rounded-lg bg-black"
                />
              ) : brokenIds.has(activeItems[lightboxIndex].id) ? (
                <div className="aspect-video bg-gray-800 flex items-center justify-center rounded-lg">
                  <Image className="w-16 h-16 text-white/20" />
                </div>
              ) : (
                <img
                  src={activeItems[lightboxIndex].url}
                  alt={activeItems[lightboxIndex].caption}
                  className="w-full max-h-[72vh] object-contain rounded-lg"
                  onError={() => markBroken(activeItems[lightboxIndex].id)}
                />
              )}
              <div className="bg-white rounded-lg px-4 py-3 text-center flex-shrink-0">
                <p className="text-sm sm:text-base md:text-lg font-bold text-gray-900 leading-tight">
                  {activeItems[lightboxIndex].caption}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {lightboxIndex + 1} / {activeItems.length}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
