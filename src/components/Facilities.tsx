import { Computer, BookMarked, Music, HeartPulse, Microscope, Palette, MonitorPlay, Trophy } from 'lucide-react';

export default function Facilities() {
  const facilities = [
    {
      icon: Computer,
      title: 'Computer Lab',
      description: 'State-of-the-art computer lab with latest systems and high-speed internet for digital learning.',
      features: ['Latest Hardware', 'Coding Classes', 'Internet Access'],
      color: 'text-blue-600 bg-blue-50',
    },
    {
      icon: BookMarked,
      title: 'Library',
      description: 'Well-stocked library with thousands of books, magazines, and digital resources.',
      features: ['10,000+ Books', 'Reading Room', 'Digital Library'],
      color: 'text-purple-600 bg-purple-50',
    },
    {
      icon: Microscope,
      title: 'Science Lab',
      description: 'Fully equipped laboratories for Physics, Chemistry, and Biology practical sessions.',
      features: ['Modern Equipment', 'Safe Environment', 'Hands-on Learning'],
      color: 'text-emerald-600 bg-emerald-50',
    },
    {
      icon: Music,
      title: 'Music Room',
      description: 'Dedicated music room with instruments and training for vocal and instrumental music.',
      features: ['Musical Instruments', 'Trained Teachers', 'Regular Practice'],
      color: 'text-amber-600 bg-amber-50',
    },
    {
      icon: Palette,
      title: 'Art Room',
      description: 'Creative space for painting, drawing, and craft activities to nurture artistic talents.',
      features: ['Art Supplies', 'Creative Projects', 'Exhibitions'],
      color: 'text-pink-600 bg-pink-50',
    },
    {
      icon: MonitorPlay,
      title: 'Smart Classrooms',
      description: 'Technology-enabled classrooms with interactive boards and multimedia learning tools.',
      features: ['Interactive Boards', 'Digital Content', 'Engaging Learning'],
      color: 'text-indigo-600 bg-indigo-50',
    },
    {
      icon: Trophy,
      title: 'Sports Complex',
      description: 'Spacious playground and indoor facilities for various sports and physical activities.',
      features: ['Multiple Sports', 'Indoor & Outdoor', 'Trained Coaches'],
      color: 'text-red-600 bg-red-50',
    },
    {
      icon: HeartPulse,
      title: 'Medical Room',
      description: 'Well-equipped medical room with trained staff for immediate healthcare needs.',
      features: ['First Aid', 'Trained Nurse', 'Emergency Care'],
      color: 'text-teal-600 bg-teal-50',
    },
  ];

  return (
    <section id="facilities" className="py-14 sm:py-20 md:py-28 bg-white">
      <div className="section-container">
        <div className="text-center mb-10 sm:mb-16 md:mb-20">
          <h2 className="section-heading">
            World-Class <span className="text-school-green">Facilities</span>
          </h2>
          <div className="accent-line" />
          <p className="section-subheading">
            Modern infrastructure and state-of-the-art facilities to provide the best learning environment
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {facilities.map((facility, index) => (
            <div
              key={index}
              className="group bg-school-cream rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg hover:border-school-green/20 transition-all duration-300"
            >
              <div className="p-5 sm:p-6">
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl ${facility.color} mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <facility.icon className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">{facility.title}</h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-4">{facility.description}</p>
                <ul className="space-y-1.5">
                  {facility.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-xs text-gray-600">
                      <span className="w-1.5 h-1.5 bg-school-gold rounded-full mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Amenities */}
        <div className="mt-14 sm:mt-20 bg-gradient-to-br from-school-green to-school-green/90 rounded-3xl p-6 sm:p-8 md:p-12 text-white">
          <div className="text-center mb-8 sm:mb-10">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3">Additional Amenities</h3>
            <p className="text-white/80 max-w-2xl mx-auto text-sm sm:text-base">
              We go beyond standard facilities to ensure comfort, safety, and convenience for all our students
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {[
              { title: 'Safe Transportation', desc: 'GPS-enabled buses with trained drivers and attendants' },
              { title: 'Healthy Cafeteria', desc: 'Nutritious meals and fresh snacks prepared daily' },
              { title: 'Security System', desc: 'CCTV surveillance and secure campus entry' },
              { title: 'Drinking Water', desc: 'RO water purifiers installed throughout campus' },
              { title: 'Clean Washrooms', desc: 'Well-maintained and regularly sanitized facilities' },
              { title: 'Power Backup', desc: 'Uninterrupted electricity supply for all operations' },
            ].map((amenity, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-5 hover:bg-white/15 transition-all duration-300"
              >
                <h4 className="text-sm sm:text-base font-bold mb-1.5">{amenity.title}</h4>
                <p className="text-xs sm:text-sm text-white/80">{amenity.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
