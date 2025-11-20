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
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-10 sm:py-12 md:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 mb-8 sm:mb-10 md:mb-12">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-2 rounded-xl">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Green Valley</h3>
                <p className="text-sm text-gray-400">Convent School</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Nurturing young minds with excellence in education since 2005. Building future leaders through holistic development.
            </p>
            <div className="flex space-x-3 pt-4">
              <a
                href="https://www.facebook.com/share/g/1AUWJr7BfD/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 p-3 rounded-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-110"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/greenvalleyconventschooll?igsh=MWRsdjBxd25seGYzMQ=="
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 p-3 rounded-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-110"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.youtube.com/@greenvalleyconventschooll"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 p-3 rounded-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-110"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 flex items-center">
              <span className="w-1 h-6 bg-green-500 mr-3 rounded"></span>
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-gray-400 hover:text-green-400 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-0 h-0.5 bg-green-400 group-hover:w-4 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 flex items-center">
              <span className="w-1 h-6 bg-green-500 mr-3 rounded"></span>
              Important
            </h4>
            <ul className="space-y-3">
              {importantLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-gray-400 hover:text-green-400 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-0 h-0.5 bg-green-400 group-hover:w-4 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 flex items-center">
              <span className="w-1 h-6 bg-green-500 mr-3 rounded"></span>
              Contact Info
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-gray-400">
                <MapPin className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <span>Gali No.7, Bhatta Road, Delhi - 110042</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400 hover:text-green-400 transition-colors">
                <Phone className="w-5 h-5 text-green-500 flex-shrink-0" />
                <a href="tel:+919213555965">+91 92135 55965</a>
              </li>
              <li className="flex items-center space-x-3 text-gray-400 hover:text-green-400 transition-colors">
                <Mail className="w-5 h-5 text-green-500 flex-shrink-0" />
                <a href="mailto:greenvalleyconventschools@gmail.com" className="break-all">
                  greenvalleyconventschools@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left space-y-1">
              <p className="text-gray-300 text-sm font-semibold">Made by Aryan</p>
              <p className="text-gray-400 text-sm flex items-center justify-center md:justify-start">
                Made with <Heart className="w-4 h-4 mx-1 text-red-500 fill-current animate-pulse" /> for education
              </p>
            </div>
            <p className="text-gray-400 text-sm text-center md:text-right">
              &copy; {new Date().getFullYear()} Green Valley Convent School. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
