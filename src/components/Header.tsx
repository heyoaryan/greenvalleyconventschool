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

  const scrollToSection = (id: string, isLink: boolean = false) => {
    if (isLink) {
      setIsMobileMenuOpen(false);
      return;
    }
    // If we're on gallery page, navigate to home first
    if (location.pathname !== '/') {
      window.location.href = '/#' + id;
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { label: 'Home', id: 'hero', isLink: false },
    { label: 'About', id: 'about', isLink: false },
    { label: 'Academics', id: 'academics', isLink: false },
    { label: 'Facilities', id: 'facilities', isLink: false },
    { label: 'Achievements', id: 'achievements', isLink: false },
    { label: 'Contact', id: 'contact', isLink: false },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-white shadow-lg py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3 cursor-pointer group">
            <div className="flex items-center justify-center">
              <img
                src="/logo/logo.png"
                alt="Green Valley Convent School Logo"
                id="site-logo"
                className="h-8 w-auto sm:h-9 md:h-10 rounded-xl shadow-lg transform group-hover:scale-105 group-hover:-rotate-3 transition-transform duration-300"
              />
            </div>
            <div className="min-w-0">
              <h1
                className={`text-sm sm:text-base md:text-lg lg:text-xl font-bold transition-colors truncate ${
                  isScrolled ? 'text-gray-900' : 'text-white'
                }`}
              >
                Green Valley Convent School
              </h1>
              <p
                className={`text-[10px] sm:text-xs transition-colors hidden xs:block ${
                  isScrolled ? 'text-gray-600' : 'text-green-100'
                }`}
              >
                Nurturing Young Minds Since 2005
              </p>
            </div>
          </Link>

          <nav className="hidden lg:flex space-x-1">
            {navItems.map((item) => (
              item.isLink ? (
                <Link
                  key={item.id}
                  to={item.id}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                    isScrolled
                      ? 'text-gray-700 hover:bg-green-50 hover:text-green-600'
                      : 'text-white hover:bg-white/20'
                  }`}
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id, item.isLink)}
                  className={`px-2 sm:px-3 md:px-4 py-2 rounded-lg font-medium text-sm sm:text-base transition-all duration-300 hover:scale-105 ${
                    isScrolled
                      ? 'text-gray-700 hover:bg-green-50 hover:text-green-600'
                      : 'text-white hover:bg-white/20'
                  }`}
                >
                  {item.label}
                </button>
              )
            ))}
          </nav>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              isScrolled ? 'text-gray-900' : 'text-white'
            }`}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 space-y-2 animate-fade-in">
            {navItems.map((item) => (
              item.isLink ? (
                <Link
                  key={item.id}
                  to={item.id}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-left px-4 py-3 rounded-lg font-medium bg-white text-gray-700 hover:bg-green-50 hover:text-green-600 transition-all duration-300 transform hover:translate-x-2"
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id, item.isLink)}
                  className="block w-full text-left px-4 py-3 rounded-lg font-medium bg-white text-gray-700 hover:bg-green-50 hover:text-green-600 transition-all duration-300 transform hover:translate-x-2"
                >
                  {item.label}
                </button>
              )
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
