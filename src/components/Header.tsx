import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    if (location.pathname !== '/') {
      window.location.href = '/#' + id;
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { label: 'Home', id: 'hero' },
    { label: 'About', id: 'about' },
    { label: 'Academics', id: 'academics' },
    { label: 'Facilities', id: 'facilities' },
    { label: 'Achievements', id: 'achievements' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-3 sm:py-4'
        }`}
      >
        <div className="section-container">
          <div className="flex items-center justify-between min-w-0">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 sm:gap-3 group min-w-0 flex-shrink-0"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <div
                id="site-logo"
                className="relative w-9 h-9 sm:w-11 sm:h-11 flex-shrink-0"
              >
                <img
                  src="/logo/logo.png"
                  alt="Green Valley Convent School"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="hidden sm:block min-w-0">
                <h1
                  className={`text-sm sm:text-base lg:text-lg font-bold leading-tight transition-colors truncate ${
                    isScrolled ? 'text-school-green' : 'text-white'
                  }`}
                >
                  Green Valley
                </h1>
                <p
                  className={`text-xs transition-colors truncate ${
                    isScrolled ? 'text-gray-600' : 'text-green-100'
                  }`}
                >
                  Convent School
                </p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1 flex-shrink-0">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 xl:px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 whitespace-nowrap ${
                    isScrolled
                      ? 'text-gray-700 hover:text-school-green hover:bg-school-green/5'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => scrollToSection('admissions')}
                className="px-4 xl:px-5 py-2 bg-school-gold text-school-green text-sm font-semibold rounded-lg hover:bg-school-gold/90 transition-all duration-300 shadow-sm hover:shadow-md whitespace-nowrap"
              >
                Admissions
              </button>
            </nav>

            {/* Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors flex-shrink-0 ${
                isScrolled ? 'text-gray-900 hover:bg-gray-100' : 'text-white hover:bg-white/10'
              }`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[9999] lg:hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'visible' : 'invisible pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Drawer */}
        <nav
          className={`absolute top-0 right-0 h-full w-72 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-shrink-0">
            <div>
              <p className="text-sm font-semibold text-gray-900">Menu</p>
              <p className="text-xs text-gray-500">Green Valley Convent School</p>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-lg text-gray-700 hover:bg-gray-100"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav items */}
          <div className="px-3 py-4 space-y-1 flex-1 overflow-y-auto">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left px-3 py-3 rounded-lg text-gray-700 hover:text-school-green hover:bg-school-green/5 transition-all duration-200 font-medium"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Admissions CTA */}
          <div className="px-5 py-4 border-t border-gray-100 flex-shrink-0">
            <button
              onClick={() => scrollToSection('admissions')}
              className="w-full px-4 py-3 bg-school-gold text-school-green font-semibold rounded-lg hover:bg-school-gold/90 transition-all duration-300"
            >
              Admissions
            </button>
          </div>
        </nav>
      </div>
    </>
  );
}
