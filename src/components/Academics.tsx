import { BookOpen, Palette, Music, FlaskConical } from 'lucide-react';

export default function Academics() {
  const wings = [
    {
      title: 'Pre-Primary Wing',
      grade: 'Nursery to KG',
      icon: Palette,
      color: 'text-pink-600 bg-pink-50',
      description:
        'Play-based learning with focus on motor skills, creativity, and social development through engaging activities.',
      features: ['Activity-Based Learning', 'Creative Arts', 'Language Development', 'Motor Skills'],
    },
    {
      title: 'Primary Wing',
      grade: 'Class 1st to 5th',
      icon: BookOpen,
      color: 'text-blue-600 bg-blue-50',
      description:
        'Strong foundation in core subjects with emphasis on conceptual understanding and practical application.',
      features: ['CBSE Curriculum', 'Smart Classrooms', 'Life Skills', 'Sports & Games'],
    },
    {
      title: 'Middle Wing',
      grade: 'Class 6th to 8th',
      icon: FlaskConical,
      color: 'text-school-green bg-school-green/5',
      description:
        'Advanced learning with practical application, project-based learning, and exam preparation.',
      features: ['Advanced Sciences', 'Mathematics', 'Computer Education', 'Career Guidance'],
    },
  ];

  const subjects = [
    { name: 'Mathematics', icon: '🔢', bg: 'bg-blue-50 text-blue-700' },
    { name: 'Science', icon: '🔬', bg: 'bg-emerald-50 text-emerald-700' },
    { name: 'English', icon: '📚', bg: 'bg-purple-50 text-purple-700' },
    { name: 'Hindi', icon: '📝', bg: 'bg-orange-50 text-orange-700' },
    { name: 'Social Studies', icon: '🌍', bg: 'bg-teal-50 text-teal-700' },
    { name: 'Computer', icon: '💻', bg: 'bg-indigo-50 text-indigo-700' },
    { name: 'Art & Craft', icon: '🎨', bg: 'bg-pink-50 text-pink-700' },
    { name: 'Music', icon: '🎵', bg: 'bg-amber-50 text-amber-700' },
  ];

  return (
    <section id="academics" className="py-14 sm:py-20 md:py-28 bg-school-cream">
      <div className="section-container">
        <div className="text-center mb-10 sm:mb-16 md:mb-20">
          <h2 className="section-heading">
            Academic <span className="text-school-green">Excellence</span>
          </h2>
          <div className="accent-line" />
          <p className="section-subheading">
            Comprehensive CBSE curriculum designed to build strong foundations and nurture curious minds
          </p>
        </div>

        {/* Wing Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8 mb-14 sm:mb-20">
          {wings.map((wing, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg hover:border-school-green/20 transition-all duration-300"
            >
              <div className="p-5 sm:p-6 md:p-8 border-l-4 border-school-green">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2.5 sm:p-3 rounded-xl ${wing.color} flex-shrink-0`}>
                    <wing.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full whitespace-nowrap ml-2">
                    {wing.grade}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{wing.title}</h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-4">{wing.description}</p>
                <ul className="space-y-2">
                  {wing.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-xs sm:text-sm text-gray-700">
                      <span className="w-1.5 h-1.5 bg-school-green rounded-full mr-2.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Subjects Grid */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-12 shadow-sm border border-gray-100">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
            Our Curriculum
          </h3>
          <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-4 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {subjects.map((subject, index) => (
              <div
                key={index}
                className={`${subject.bg} rounded-xl p-4 sm:p-5 text-center hover:shadow-md transition-all duration-300 hover:-translate-y-1`}
              >
                <div className="text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3">{subject.icon}</div>
                <div className="font-semibold text-xs sm:text-sm text-gray-900 leading-tight">{subject.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom cards */}
        <div className="mt-10 sm:mt-16 grid md:grid-cols-2 gap-5 sm:gap-8">
          <div className="p-5 sm:p-8 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="p-2.5 sm:p-3 bg-school-green/5 rounded-xl flex-shrink-0">
                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-school-green" />
              </div>
              <div className="min-w-0">
                <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-2">Teaching Methodology</h4>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  We employ modern teaching techniques including interactive learning, smart classroom
                  technology, and hands-on practical sessions to make education engaging and effective
                  for every student.
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 sm:p-8 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="p-2.5 sm:p-3 bg-school-navy/5 rounded-xl flex-shrink-0">
                <Music className="w-5 h-5 sm:w-6 sm:h-6 text-school-navy" />
              </div>
              <div className="min-w-0">
                <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-2">Beyond Academics</h4>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  Extra-curricular activities including sports, music, dance, art, and cultural programs
                  ensure holistic development and help students discover their hidden talents.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
