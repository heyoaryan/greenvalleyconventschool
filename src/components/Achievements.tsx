import { Trophy, Medal, Star, Award, TrendingUp, Users } from 'lucide-react';

export default function Achievements() {
  const achievements = [
    {
      icon: Trophy,
      title: '100% Results',
      description: 'Consistent excellence in board examinations year after year.',
    },
    {
      icon: Medal,
      title: 'Sports Champions',
      description: 'Multiple inter-school tournament winners across various sports.',
    },
    {
      icon: Star,
      title: 'Academic Excellence',
      description: 'Top performers in CBSE examinations with district rankings.',
    },
    {
      icon: Award,
      title: 'Cultural Events',
      description: 'Award-winning performances in inter-school competitions.',
    },
  ];

  const stats = [
    { number: '9,000+', label: 'Students Educated', icon: Users },
    { number: '19+', label: 'Years of Excellence', icon: Trophy },
    { number: '50+', label: 'Awards & Recognitions', icon: Award },
    { number: '100%', label: 'Average Pass Rate', icon: TrendingUp },
  ];

  return (
    <section id="achievements" className="py-14 sm:py-20 md:py-28 bg-school-cream">
      <div className="section-container">
        <div className="text-center mb-10 sm:mb-16 md:mb-20">
          <h2 className="section-heading">
            Our <span className="text-school-green">Achievements</span>
          </h2>
          <div className="accent-line" />
          <p className="section-subheading">
            Celebrating excellence and milestones achieved by our students and school community
          </p>
        </div>

        {/* Achievement Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-14 sm:mb-20">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-4 sm:p-6 md:p-8 shadow-sm border border-gray-100 hover:shadow-lg hover:border-school-green/20 transition-all duration-300 text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-school-green/5 mb-4 group-hover:bg-school-green/10 transition-colors duration-300">
                <achievement.icon className="w-6 h-6 sm:w-7 sm:h-7 text-school-green" />
              </div>
              <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-1 sm:mb-2 leading-tight">
                {achievement.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{achievement.description}</p>
            </div>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-12 shadow-sm border border-gray-100">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
            Key Highlights
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-school-green/5 mb-3 sm:mb-4 group-hover:bg-school-green/10 transition-colors duration-300">
                  <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-school-green" />
                </div>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1 leading-tight">
                  {stat.number}
                </div>
                <div className="text-xs sm:text-sm text-gray-600 leading-tight">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
