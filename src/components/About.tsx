import { Award, Heart, Users, Target } from 'lucide-react';

export default function About() {
  const features = [
    {
      icon: Award,
      title: 'CBSE Curriculum',
      description: 'Comprehensive CBSE curriculum ensuring quality education and academic excellence',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Heart,
      title: 'Holistic Development',
      description: 'Focus on overall personality development including academics, sports, and arts',
      color: 'from-rose-500 to-pink-500',
    },
    {
      icon: Users,
      title: 'Experienced Faculty',
      description: 'Highly qualified and dedicated teachers committed to student success',
      color: 'from-purple-500 to-indigo-500',
    },
    {
      icon: Target,
      title: 'Individual Attention',
      description: 'Personalized learning approach to nurture each student\'s unique potential',
      color: 'from-amber-500 to-orange-500',
    },
  ];

  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12 md:mb-16 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            About <span className="text-green-600">Green Valley</span>
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-600 mx-auto mb-4 sm:mb-6"></div>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Established in 2005, Green Valley Convent School has been a beacon of quality education in Delhi,
            providing comprehensive learning from Nursery to Class 8th.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center mb-10 sm:mb-12 md:mb-16">
          <div className="space-y-4 sm:space-y-5 md:space-y-6 animate-fade-in-left px-2">
            <h3 className="text-2xl sm:text-2xl md:text-3xl font-bold text-gray-900">Our Mission & Vision</h3>
            <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
              At Green Valley Convent School, we are committed to nurturing young minds and shaping future leaders.
              Our mission is to provide a stimulating learning environment that fosters academic excellence,
              character building, and holistic development.
            </p>
            <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
              We believe in empowering students with knowledge, values, and skills that prepare them for the
              challenges of tomorrow. Through modern teaching methodologies and state-of-the-art infrastructure,
              we ensure every child reaches their full potential.
            </p>
            <div className="flex flex-wrap gap-3 sm:gap-4 pt-2 sm:pt-4">
              <div className="flex items-center space-x-2 bg-green-50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-green-700 font-medium text-sm sm:text-base">CBSE Affiliated</span>
              </div>
              <div className="flex items-center space-x-2 bg-blue-50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-blue-700 font-medium text-sm sm:text-base">Nursery to 8th</span>
              </div>
              <div className="flex items-center space-x-2 bg-purple-50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-purple-700 font-medium text-sm sm:text-base">Delhi, India</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-5 md:gap-6 animate-fade-in-right">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 group"
              >
                <div className={`bg-gradient-to-br ${feature.color} w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-1 sm:mb-2">{feature.title}</h4>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 text-white shadow-2xl animate-fade-in-up">
          <div className="grid md:grid-cols-3 gap-6 sm:gap-7 md:gap-8 text-center">
            <div className="space-y-1 sm:space-y-2">
              <h4 className="text-3xl sm:text-4xl md:text-5xl font-bold">19+</h4>
              <p className="text-green-100 text-base sm:text-lg">Years of Excellence</p>
            </div>
            <div className="space-y-1 sm:space-y-2">
              <h4 className="text-3xl sm:text-4xl md:text-5xl font-bold">Modern</h4>
              <p className="text-green-100 text-base sm:text-lg">Infrastructure</p>
            </div>
            <div className="space-y-1 sm:space-y-2">
              <h4 className="text-3xl sm:text-4xl md:text-5xl font-bold">Safe</h4>
              <p className="text-green-100 text-base sm:text-lg">Learning Environment</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
