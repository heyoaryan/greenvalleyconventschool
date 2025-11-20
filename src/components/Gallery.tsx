import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Image, Video, X, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';

export default function Gallery() {
  const [activeTab, setActiveTab] = useState<'photos' | 'videos'>('photos');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());
  const [videoErrors, setVideoErrors] = useState<Set<number>>(new Set());

  // Sample photos - replace with actual image paths
  const photos = [
    { id: 1, src: '/gallerysection/photo1.jpg', title: 'School Building' },
    { id: 2, src: '/gallerysection/photo2.jpg', title: 'Classroom' },
    { id: 3, src: '/gallerysection/photo3.jpg', title: 'Library' },
    { id: 4, src: '/gallerysection/photo4.jpg', title: 'Playground' },
    { id: 5, src: '/gallerysection/photo5.jpg', title: 'Science Lab' },
    { id: 6, src: '/gallerysection/photo6.jpg', title: 'Computer Lab' },
    { id: 7, src: '/gallerysection/photo7.jpg', title: 'Sports Day' },
    { id: 8, src: '/gallerysection/photo8.jpg', title: 'Annual Function' },
    { id: 9, src: '/gallerysection/photo9.jpg', title: 'Students' },
    { id: 10, src: '/gallerysection/photo10.jpg', title: 'Cultural Event' },
    { id: 11, src: '/gallerysection/photo11.jpg', title: 'Award Ceremony' },
    { id: 12, src: '/gallerysection/photo12.jpg', title: 'Field Trip' },
  ];

  // Sample videos - replace with actual video paths
  const videos = [
    { id: 1, src: '/gallerysection/video1.mp4', thumbnail: '/gallerysection/video1-thumb.jpg', title: 'School Tour' },
    { id: 2, src: '/gallerysection/video2.mp4', thumbnail: '/gallerysection/video2-thumb.jpg', title: 'Annual Day' },
    { id: 3, src: '/gallerysection/video3.mp4', thumbnail: '/gallerysection/video3-thumb.jpg', title: 'Sports Meet' },
    { id: 4, src: '/gallerysection/video4.mp4', thumbnail: '/gallerysection/video4-thumb.jpg', title: 'Science Fair' },
    { id: 5, src: '/gallerysection/video5.mp4', thumbnail: '/gallerysection/video5-thumb.jpg', title: 'Cultural Fest' },
    { id: 6, src: '/gallerysection/video6.mp4', thumbnail: '/gallerysection/video6-thumb.jpg', title: 'Graduation Ceremony' },
  ];

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % photos.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + photos.length) % photos.length);
    }
  };

  const nextVideo = () => {
    if (selectedVideo !== null) {
      setSelectedVideo((selectedVideo + 1) % videos.length);
    }
  };

  const prevVideo = () => {
    if (selectedVideo !== null) {
      setSelectedVideo((selectedVideo - 1 + videos.length) % videos.length);
    }
  };

  return (
    <section id="gallery" className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-emerald-50 pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16 md:pb-20">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Back to Home Button */}
        <div className="mb-6 sm:mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-white text-green-600 rounded-full font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 hover:bg-green-50 active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Gallery
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Explore our school through photos and videos showcasing our facilities, events, and achievements
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8 sm:mb-10 md:mb-12 px-2">
          <div className="inline-flex bg-white rounded-full p-1 sm:p-2 shadow-lg w-full sm:w-auto max-w-xs sm:max-w-none">
            <button
              onClick={() => {
                setActiveTab('photos');
                setSelectedImage(null);
                setSelectedVideo(null);
              }}
              className={`flex-1 sm:flex-none px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-full font-semibold text-sm sm:text-base md:text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                activeTab === 'photos'
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              <Image className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Photos</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('videos');
                setSelectedImage(null);
                setSelectedVideo(null);
              }}
              className={`flex-1 sm:flex-none px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-full font-semibold text-sm sm:text-base md:text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                activeTab === 'videos'
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              <Video className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Videos</span>
            </button>
          </div>
        </div>

        {/* Photos Section */}
        {activeTab === 'photos' && (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
            {photos.map((photo, index) => (
              <div
                key={photo.id}
                onClick={() => setSelectedImage(index)}
                className="group relative overflow-hidden rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300"
              >
                {imageErrors.has(photo.id) ? (
                  <div className="aspect-square bg-gradient-to-br from-green-200 to-emerald-300 flex items-center justify-center">
                    <Image className="w-12 h-12 sm:w-16 sm:h-16 text-white/50" />
                  </div>
                ) : (
                  <img
                    src={photo.src}
                    alt={photo.title}
                    className="w-full h-full object-cover aspect-square"
                    onError={() => setImageErrors(prev => new Set(prev).add(photo.id))}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 sm:group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 md:p-4 text-white">
                    <p className="font-semibold text-xs sm:text-sm md:text-base">{photo.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Videos Section */}
        {activeTab === 'videos' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {videos.map((video, index) => (
              <div
                key={video.id}
                onClick={() => setSelectedVideo(index)}
                className="group relative overflow-hidden rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300"
              >
                {videoErrors.has(video.id) ? (
                  <div className="aspect-video bg-gradient-to-br from-green-200 to-emerald-300 flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Video className="w-8 h-8 sm:w-10 sm:h-10 text-green-600 ml-1" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-video relative">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                      onError={() => setVideoErrors(prev => new Set(prev).add(video.id))}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Video className="w-8 h-8 sm:w-10 sm:h-10 text-green-600 ml-1" />
                      </div>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 sm:group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 md:p-4 text-white">
                    <p className="font-semibold text-xs sm:text-sm md:text-base">{video.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Image Lightbox */}
        {selectedImage !== null && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-2 sm:p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full p-2"
            >
              <X className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-2 sm:left-4 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full p-2"
            >
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-2 sm:right-4 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full p-2"
            >
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
            </button>
            <div className="max-w-full sm:max-w-3xl md:max-w-5xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden rounded-lg" onClick={(e) => e.stopPropagation()}>
              {imageErrors.has(photos[selectedImage].id) ? (
                <div className="aspect-video bg-gradient-to-br from-green-200 to-emerald-300 flex items-center justify-center">
                  <Image className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 text-white/50" />
                </div>
              ) : (
                <img
                  src={photos[selectedImage].src}
                  alt={photos[selectedImage].title}
                  className="w-full h-auto max-h-[75vh] sm:max-h-[70vh] object-contain"
                  onError={() => setImageErrors(prev => new Set(prev).add(photos[selectedImage].id))}
                />
              )}
              <div className="bg-white p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">{photos[selectedImage].title}</h3>
              </div>
            </div>
          </div>
        )}

        {/* Video Lightbox */}
        {selectedVideo !== null && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-2 sm:p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedVideo(null);
              }}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full p-2"
            >
              <X className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevVideo();
              }}
              className="absolute left-2 sm:left-4 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full p-2"
            >
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextVideo();
              }}
              className="absolute right-2 sm:right-4 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full p-2"
            >
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
            </button>
            <div className="max-w-full sm:max-w-3xl md:max-w-5xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden rounded-lg" onClick={(e) => e.stopPropagation()}>
              {videoErrors.has(videos[selectedVideo].id) ? (
                <div className="aspect-video bg-gradient-to-br from-green-200 to-emerald-300 flex items-center justify-center">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white/90 rounded-full flex items-center justify-center">
                    <Video className="w-12 h-12 sm:w-16 sm:h-16 text-green-600 ml-1 sm:ml-2" />
                  </div>
                </div>
              ) : (
                <video
                  src={videos[selectedVideo].src}
                  controls
                  className="w-full h-auto max-h-[75vh] sm:max-h-[70vh]"
                  onError={() => setVideoErrors(prev => new Set(prev).add(videos[selectedVideo].id))}
                />
              )}
              <div className="bg-white p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">{videos[selectedVideo].title}</h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

