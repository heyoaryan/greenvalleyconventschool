import { BookOpen, Palette, Music, FlaskConical } from 'lucide-react';

export default function Academics() {
  const wings = [
    {
      title: 'Pre-Primary Wing',
      grade: 'Nursery to KG',
      icon: Palette,
      color: 'from-pink-500 to-rose-500',
      description: 'Play-based learning with focus on motor skills, creativity, and social development',
      features: ['Activity-Based Learning', 'Creative Arts', 'Language Development', 'Motor Skills'],
    },
    {
      title: 'Primary Wing',
      grade: 'Class 1st to 5th',
      icon: BookOpen,
      color: 'from-blue-500 to-indigo-500',
      description: 'Strong foundation in core subjects with emphasis on conceptual understanding',
      features: ['CBSE Curriculum', 'Smart Classrooms', 'Life Skills', 'Sports & Games'],
    },
    {
      title: 'Middle Wing',
      grade: 'Class 6th to 8th',
      icon: FlaskConical,
      color: 'from-green-500 to-emerald-500',
      description: 'Advanced learning with practical application and exam preparation',
      features: ['Advanced Sciences', 'Mathematics', 'Computer Education', 'Career Guidance'],
    },
  ];

  const subjects = [
    { name: 'Mathematics', icon: '🔢', color: 'bg-blue-100 text-blue-600' },
    { name: 'Science', icon: '🔬', color: 'bg-green-100 text-green-600' },
    { name: 'English', icon: '📚', color: 'bg-purple-100 text-purple-600' },
    { name: 'Hindi', icon: '🇮🇳', color: 'bg-orange-100 text-orange-600' },
    { name: 'Social Studies', icon: '🌍', color: 'bg-teal-100 text-teal-600' },
    { name: 'Computer Science', icon: '💻', color: 'bg-indigo-100 text-indigo-600' },
    { name: 'Art & Craft', icon: '🎨', color: 'bg-pink-100 text-pink-600' },
    { name: 'Music', icon: '🎵', color: 'bg-yellow-100 text-yellow-600' },
  ];

  return (
    <section id="academics" className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12 md:mb-16 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Academic <span className="text-green-600">Excellence</span>
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-600 mx-auto mb-4 sm:mb-6"></div>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Comprehensive CBSE curriculum designed to build strong foundations and nurture curious minds
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 sm:gap-7 md:gap-8 mb-10 sm:mb-12 md:mb-16">
          {wings.map((wing, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-50 to-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 group animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`bg-gradient-to-br ${wing.color} p-6 text-white`}>
                <div className="flex items-center justify-between mb-4">
                  <wing.icon className="w-12 h-12" />
                  <span className="text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">
                    {wing.grade}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-2">{wing.title}</h3>
                <p className="text-white/90">{wing.description}</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  {wing.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-3 text-gray-700">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 animate-fade-in-up">
          <h3 className="text-2xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">Our Curriculum</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
            {subjects.map((subject, index) => (
              <div
                key={index}
                className={`${subject.color} rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 text-center transform hover:scale-110 transition-all duration-300 cursor-pointer shadow-md hover:shadow-xl`}
              >
                <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">{subject.icon}</div>
                <div className="font-semibold text-xs sm:text-sm md:text-base">{subject.name}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 sm:mt-10 md:mt-12 grid md:grid-cols-2 gap-6 sm:gap-7 md:gap-8">
          <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-7 md:p-8 shadow-lg border-2 border-green-100 hover:border-green-300 transition-colors duration-300">
            <div className="flex items-start space-x-3 sm:space-x-4">
              <div className="bg-green-100 p-2 sm:p-3 rounded-lg sm:rounded-xl flex-shrink-0">
                <BookOpen className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-green-600" />
              </div>
              <div>
                <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Teaching Methodology</h4>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  We employ modern teaching techniques including interactive learning, smart classroom technology,
                  and hands-on practical sessions to make education engaging and effective.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-7 md:p-8 shadow-lg border-2 border-blue-100 hover:border-blue-300 transition-colors duration-300">
            <div className="flex items-start space-x-3 sm:space-x-4">
              <div className="bg-blue-100 p-2 sm:p-3 rounded-lg sm:rounded-xl flex-shrink-0">
                <Music className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-blue-600" />
              </div>
              <div>
                <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Beyond Academics</h4>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  Extra-curricular activities including sports, music, dance, art, and cultural programs ensure
                  holistic development and help students discover their talents.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
