import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImages = [
    '/herosection/1.jpg',
    '/herosection/2.jpg',
    '/herosection/3.jpg',
    '/herosection/4.jpg',
    '/herosection/5.jpg',
  ];

  useEffect(() => {
    heroImages.forEach((imageSrc) => {
      const img = new Image();
      img.src = imageSrc;
    });

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-900"
    >
      {/* Background Image Carousel */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((image, index) => {
          const isActive = index === currentImageIndex;
          const isPrevious =
            index === (currentImageIndex - 1 + heroImages.length) % heroImages.length;

          return (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1500 ease-in-out ${
                isActive ? 'opacity-100 scale-100' : isPrevious ? 'opacity-0 scale-105' : 'opacity-0 scale-105'
              }`}
            >
              <img
                src={image}
                alt={`Campus ${index + 1}`}
                className="w-full h-full object-cover"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
            </div>
          );
        })}
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 sm:pt-28 pb-20">
        <div className="animate-slide-up">
          {/* Badge */}
          <div className="inline-flex items-center px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full mb-5 border border-white/20">
            <span className="w-2 h-2 bg-school-gold rounded-full mr-2 flex-shrink-0" />
            <span className="text-white/90 text-xs sm:text-sm font-medium whitespace-nowrap">
              Established 2005 · Delhi, India
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-5 leading-tight tracking-tight">
            Green Valley
            <br />
            <span className="text-school-gold">Convent School</span>
          </h1>

          {/* Sub-text */}
          <p className="text-sm sm:text-lg text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed px-2">
            Nurturing young minds with excellence in education. Building confident learners
            through holistic development from Nursery to Class 8th.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col xs:flex-row gap-3 justify-center items-center px-4 sm:px-0">
            <button
              onClick={() =>
                document.getElementById('admissions')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="w-full xs:w-auto px-6 sm:px-8 py-3 sm:py-3.5 bg-school-gold text-school-green font-semibold rounded-lg hover:bg-school-gold/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-sm sm:text-base"
            >
              Apply for Admission
            </button>
            <Link
              to="/gallery"
              className="w-full xs:w-auto px-6 sm:px-8 py-3 sm:py-3.5 bg-transparent border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 hover:border-white/50 transition-all duration-300 text-sm sm:text-base text-center"
            >
              View Gallery
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-4xl mx-auto">
          {[
            { value: '2005', label: 'Established' },
            { value: '9,000+', label: 'Students Educated' },
            { value: '15+', label: 'Faculty Members' },
            { value: '100%', label: 'Results' },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-3 sm:p-5 border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              <div className="text-xl sm:text-3xl md:text-4xl font-bold text-white mb-1 leading-tight">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-white/60 font-medium leading-tight">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 hover:text-white transition-colors duration-300 animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-6 h-6" />
      </button>
    </section>
  );
}
