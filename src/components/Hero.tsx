import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [counts, setCounts] = useState({
    established: 0,
    students: 0,
    faculty: 0,
    success: 0,
  });
  const hasAnimated = useRef(false);

  // Hero section images
  const heroImages = [
    '/herosection/1.jpg',
    '/herosection/2.jpg',
    '/herosection/3.jpg',
    '/herosection/4.jpg',
    '/herosection/5.jpg',
  ];

  useEffect(() => {
    // Preload all images
    heroImages.forEach((imageSrc) => {
      const img = new Image();
      img.src = imageSrc;
    });

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Counting animation effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            
            const currentYear = new Date().getFullYear();
            const startYear = 2005;
            const yearsToCount = currentYear - startYear + 1; // 2005 to current year
            
            const targets = {
              established: currentYear,
              students: 1000,
              faculty: 15,
              success: 100,
            };

            const duration = 2000; // 2 seconds
            const steps = 60;
            const stepDuration = duration / steps;

            let currentStep = 0;
            const interval = setInterval(() => {
              currentStep++;
              const progress = currentStep / steps;

              // For established: count year by year from 2005 to current year
              const establishedValue = startYear + Math.floor(yearsToCount * progress);
              
              setCounts({
                established: establishedValue,
                students: Math.floor(targets.students * progress),
                faculty: Math.floor(targets.faculty * progress),
                success: Math.floor(targets.success * progress),
              });

              if (currentStep >= steps) {
                clearInterval(interval);
                setCounts(targets);
              }
            }, stepDuration);
          }
        });
      },
      { threshold: 0.3 }
    );

    const statsSection = document.getElementById('hero-stats');
    if (statsSection) {
      observer.observe(statsSection);
    }

    return () => {
      if (statsSection) {
        observer.unobserve(statsSection);
      }
    };
  }, []);

  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Background Image Carousel */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((image, index) => {
          const isActive = index === currentImageIndex;
          const isPrevious = index === (currentImageIndex - 1 + heroImages.length) % heroImages.length;
          
          return (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive 
                  ? 'opacity-100 z-10' 
                  : isPrevious
                  ? 'opacity-0 z-0'
                  : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <img
                src={image}
                alt={`Hero ${index + 1}`}
                className="w-full h-full object-cover"
                loading="eager"
                onError={(e) => {
                  // Fallback to black if image doesn't exist
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-black/40"></div>
            </div>
          );
        })}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 text-center">
        <div className="animate-fade-in-up">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-5 md:mb-6 leading-tight px-2">
            Welcome to
            <br />
            <span className="bg-gradient-to-r from-yellow-300 to-amber-300 bg-clip-text text-transparent">
              Green Valley Convent School
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-green-50 mb-6 sm:mb-7 md:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
            Nurturing Young Minds with Excellence in Education Since 2005
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
            <button
              onClick={() => document.getElementById('admissions')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 bg-white text-green-600 rounded-full font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Apply for Admission
            </button>
            <Link
              to="/gallery"
              className="w-full sm:w-auto px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 bg-transparent border-2 border-white text-white rounded-full font-bold text-base sm:text-lg hover:bg-white hover:text-green-600 transition-all duration-300 transform hover:-translate-y-1 inline-block text-center active:scale-95"
            >
              Gallery
            </Link>
          </div>
        </div>

        <div id="hero-stats" className="mt-10 sm:mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-4xl mx-auto px-4">
          <div
            className="bg-white/10 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 transform hover:scale-110 transition-all duration-300 animate-fade-in-up"
            style={{ animationDelay: '0ms' }}
          >
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2">{counts.established}</div>
            <div className="text-green-100 text-xs sm:text-sm md:text-base">Established</div>
          </div>
          <div
            className="bg-white/10 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 transform hover:scale-110 transition-all duration-300 animate-fade-in-up"
            style={{ animationDelay: '100ms' }}
          >
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2">{counts.students}+</div>
            <div className="text-green-100 text-xs sm:text-sm md:text-base">Students</div>
          </div>
          <div
            className="bg-white/10 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 transform hover:scale-110 transition-all duration-300 animate-fade-in-up"
            style={{ animationDelay: '200ms' }}
          >
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2">{counts.faculty}+</div>
            <div className="text-green-100 text-xs sm:text-sm md:text-base">Faculty Members</div>
          </div>
          <div
            className="bg-white/10 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 transform hover:scale-110 transition-all duration-300 animate-fade-in-up"
            style={{ animationDelay: '300ms' }}
          >
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2">{counts.success}%</div>
            <div className="text-green-100 text-xs sm:text-sm md:text-base">Success Rate</div>
          </div>
        </div>

        {/* Image Indicators - Placed right after stats section */}
        <div className="mt-6 sm:mt-8 md:mt-10 flex justify-center gap-1.5 sm:gap-2 z-20">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                index === currentImageIndex
                  ? 'w-6 sm:w-8 bg-white'
                  : 'w-1.5 sm:w-2 bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Chevron Down Button - Placed at the very bottom */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-4 sm:bottom-6 md:bottom-10 left-1/2 transform -translate-x-1/2 text-white animate-bounce cursor-pointer hover:scale-110 transition-transform z-20"
      >
        <ChevronDown className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
      </button>
    </section>
  );
}
