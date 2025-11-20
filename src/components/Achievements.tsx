import { Trophy, Medal, Star, Award, TrendingUp, Users } from 'lucide-react';

export default function Achievements() {
  const achievements = [
    {
      icon: Trophy,
      title: '100% Results',
      description: 'Consistent excellence in board examinations',
      color: 'from-yellow-500 to-amber-500',
    },
    {
      icon: Medal,
      title: 'Sports Champions',
      description: 'Multiple inter-school tournament winners',
      color: 'from-blue-500 to-indigo-500',
    },
    {
      icon: Star,
      title: 'Academic Excellence',
      description: 'Top performers in CBSE examinations',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Award,
      title: 'Cultural Events',
      description: 'Award-winning performances in competitions',
      color: 'from-green-500 to-emerald-500',
    },
  ];

  const testimonials = [
    {
      name: 'Mrs. Sharma',
      role: 'Parent',
      text: 'Green Valley has transformed my child\'s learning experience. The teachers are dedicated and caring, and the facilities are excellent.',
      rating: 5,
    },
    {
      name: 'Mr. Verma',
      role: 'Parent',
      text: 'The holistic approach to education here is remarkable. My daughter excels not just academically but also in sports and arts.',
      rating: 5,
    },
    {
      name: 'Mrs. Patel',
      role: 'Parent',
      text: 'Highly recommend this school! The individual attention each child receives is outstanding. Worth every penny.',
      rating: 5,
    },
  ];

  return (
    <section id="achievements" className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12 md:mb-16 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Our <span className="text-green-600">Achievements</span>
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-600 mx-auto mb-4 sm:mb-6"></div>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Celebrating excellence and milestones achieved by our students and school
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 md:gap-8 mb-10 sm:mb-12 md:mb-16">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-500 overflow-hidden animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${achievement.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              <div className="relative z-10">
                <div className={`bg-gradient-to-br ${achievement.color} w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}>
                  <achievement.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">{achievement.title}</h3>
                <p className="text-gray-600 text-sm sm:text-base">{achievement.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 mb-10 sm:mb-12 md:mb-16 animate-fade-in-up">
          <h3 className="text-2xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-6 sm:mb-7 md:mb-8 text-center">Key Highlights</h3>
          <div className="grid sm:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
            <div className="text-center group">
              <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
                <h4 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">98%+</h4>
                <p className="text-gray-600 text-sm sm:text-base">Average Pass Percentage</p>
              </div>
            </div>
            <div className="text-center group">
              <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
                <h4 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">50+</h4>
                <p className="text-gray-600 text-sm sm:text-base">Awards & Recognitions</p>
              </div>
            </div>
            <div className="text-center group">
              <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
                <h4 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">1000+</h4>
                <p className="text-gray-600 text-sm sm:text-base">Happy Students</p>
              </div>
            </div>
          </div>
        </div>

        <div className="animate-fade-in-up">
          <h3 className="text-2xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-6 sm:mb-7 md:mb-8 text-center">What Parents Say</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-7 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="flex mb-3 sm:mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 sm:mb-5 md:mb-6 leading-relaxed italic text-sm sm:text-base">"{testimonial.text}"</p>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg flex-shrink-0">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-sm sm:text-base">{testimonial.name}</div>
                    <div className="text-xs sm:text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
