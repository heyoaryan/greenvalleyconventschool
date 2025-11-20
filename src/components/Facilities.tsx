import { Computer, BookMarked, Music, HeartPulse, Microscope, Palette, MonitorPlay, Trophy } from 'lucide-react';

export default function Facilities() {
  const facilities = [
    {
      icon: Computer,
      title: 'Computer Lab',
      description: 'State-of-the-art computer lab with latest systems and high-speed internet for digital learning',
      color: 'from-blue-500 to-cyan-500',
      features: ['Latest Hardware', 'Coding Classes', 'Internet Access'],
    },
    {
      icon: BookMarked,
      title: 'Library',
      description: 'Well-stocked library with thousands of books, magazines, and digital resources',
      color: 'from-purple-500 to-pink-500',
      features: ['10,000+ Books', 'Reading Room', 'Digital Library'],
    },
    {
      icon: Microscope,
      title: 'Science Lab',
      description: 'Fully equipped laboratories for Physics, Chemistry, and Biology practical sessions',
      color: 'from-green-500 to-emerald-500',
      features: ['Modern Equipment', 'Safe Environment', 'Hands-on Learning'],
    },
    {
      icon: Music,
      title: 'Music Room',
      description: 'Dedicated music room with instruments and training for vocal and instrumental music',
      color: 'from-yellow-500 to-orange-500',
      features: ['Musical Instruments', 'Trained Teachers', 'Regular Practice'],
    },
    {
      icon: Palette,
      title: 'Art Room',
      description: 'Creative space for painting, drawing, and craft activities to nurture artistic talents',
      color: 'from-pink-500 to-rose-500',
      features: ['Art Supplies', 'Creative Projects', 'Exhibitions'],
    },
    {
      icon: MonitorPlay,
      title: 'Smart Classrooms',
      description: 'Technology-enabled classrooms with interactive boards and multimedia learning tools',
      color: 'from-indigo-500 to-blue-500',
      features: ['Interactive Boards', 'Digital Content', 'Engaging Learning'],
    },
    {
      icon: Trophy,
      title: 'Sports Complex',
      description: 'Spacious playground and indoor facilities for various sports and physical activities',
      color: 'from-red-500 to-orange-500',
      features: ['Multiple Sports', 'Indoor & Outdoor', 'Trained Coaches'],
    },
    {
      icon: HeartPulse,
      title: 'Medical Room',
      description: 'Well-equipped medical room with trained staff for immediate healthcare needs',
      color: 'from-teal-500 to-green-500',
      features: ['First Aid', 'Trained Nurse', 'Emergency Care'],
    },
  ];

  return (
    <section id="facilities" className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12 md:mb-16 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            World-Class <span className="text-green-600">Facilities</span>
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-600 mx-auto mb-4 sm:mb-6"></div>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Modern infrastructure and state-of-the-art facilities to provide the best learning environment
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 md:gap-8">
          {facilities.map((facility, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-500 animate-fade-in-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className={`bg-gradient-to-br ${facility.color} p-8 text-white relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative z-10">
                  <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform duration-300">
                    <facility.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{facility.title}</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4 leading-relaxed">{facility.description}</p>
                <div className="space-y-2">
                  {facility.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-sm text-gray-700">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 sm:mt-12 md:mt-16 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 text-white shadow-2xl animate-fade-in-up">
          <div className="text-center mb-6 sm:mb-7 md:mb-8">
            <h3 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">Additional Amenities</h3>
            <p className="text-green-100 text-base sm:text-lg max-w-3xl mx-auto px-4">
              We go beyond standard facilities to ensure comfort, safety, and convenience for all our students
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {[
              { title: 'Safe Transportation', desc: 'GPS-enabled buses with trained drivers' },
              { title: 'Healthy Cafeteria', desc: 'Nutritious meals and snacks available' },
              { title: 'Security System', desc: 'CCTV surveillance and secure campus' },
              { title: 'Drinking Water', desc: 'RO water purifiers throughout campus' },
              { title: 'Clean Washrooms', desc: 'Well-maintained sanitation facilities' },
              { title: 'Power Backup', desc: 'Uninterrupted electricity supply' },
            ].map((amenity, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
              >
                <h4 className="text-xl font-bold mb-2">{amenity.title}</h4>
                <p className="text-green-100">{amenity.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
