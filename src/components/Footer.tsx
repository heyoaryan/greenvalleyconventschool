import { GraduationCap, Facebook, Instagram, Youtube, Mail, Phone, MapPin, Heart } from 'lucide-react';

export default function Footer() {
  const quickLinks = [
    { name: 'Home', id: 'hero' },
    { name: 'About Us', id: 'about' },
    { name: 'Academics', id: 'academics' },
    { name: 'Facilities', id: 'facilities' },
  ];

  const importantLinks = [
    { name: 'Achievements', id: 'achievements' },
    { name: 'Admissions', id: 'admissions' },
    { name: 'Contact Us', id: 'contact' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="section-container py-10 sm:py-14 md:py-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 mb-10 sm:mb-16">
          {/* Brand — full width on xs, 2 cols on sm via col-span-2 */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <div className="p-2 bg-school-green rounded-lg flex-shrink-0">
                <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold">Green Valley</h3>
                <p className="text-xs text-gray-400">Convent School</p>
              </div>
            </div>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-5 sm:mb-6 max-w-xs">
              Nurturing young minds with excellence in education since 2005. Building future leaders
              through holistic development.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/share/g/1AUWJr7BfD/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-school-green transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a
                href="https://www.instagram.com/greenvalleyconventschooll?igsh=MWRsdjBxd25seGYzMQ=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-school-green transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a
                href="https://www.youtube.com/@greenvalleyconventschooll"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-school-green transition-colors duration-300"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-white mb-4 sm:mb-5 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-gray-400 hover:text-school-gold transition-colors duration-300 text-xs sm:text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Important Links */}
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-white mb-4 sm:mb-5 uppercase tracking-wider">
              Important
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {importantLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-gray-400 hover:text-school-gold transition-colors duration-300 text-xs sm:text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-1">
            <h4 className="text-xs sm:text-sm font-bold text-white mb-4 sm:mb-5 uppercase tracking-wider">
              Contact Info
            </h4>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-school-gold mt-0.5 flex-shrink-0" />
                <span className="text-xs sm:text-sm leading-relaxed">
                  Gali No.7, Bhatta Road, Delhi - 110042
                </span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 hover:text-school-gold transition-colors">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-school-gold flex-shrink-0" />
                <a href="tel:+919213555965" className="text-xs sm:text-sm hover:underline">
                  +91 92135 55965
                </a>
              </li>
              <li className="flex items-start gap-3 text-gray-400 hover:text-school-gold transition-colors">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-school-gold flex-shrink-0 mt-0.5" />
                <a
                  href="mailto:greenvalleyconventschools@gmail.com"
                  className="text-xs sm:text-sm hover:underline break-all leading-relaxed"
                >
                  greenvalleyconventschools@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <p className="text-gray-400 text-xs sm:text-sm text-center sm:text-left">
              &copy; {new Date().getFullYear()} Green Valley Convent School. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs sm:text-sm flex items-center gap-1">
              Made with <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500 fill-current" /> for education
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
