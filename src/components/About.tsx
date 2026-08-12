import { Award, Heart, Users, Target } from 'lucide-react';

export default function About() {
  const features = [
    {
      icon: Award,
      title: 'CBSE Curriculum',
      description: 'Comprehensive CBSE curriculum ensuring quality education and academic excellence across all grades.',
    },
    {
      icon: Heart,
      title: 'Holistic Development',
      description: 'Focus on overall personality development including academics, sports, arts, and character building.',
    },
    {
      icon: Users,
      title: 'Experienced Faculty',
      description: "Highly qualified and dedicated teachers committed to nurturing every student's potential.",
    },
    {
      icon: Target,
      title: 'Individual Attention',
      description: "Personalized learning approach with small class sizes to nurture each student's unique abilities.",
    },
  ];

  return (
    <section id="about" className="py-14 sm:py-20 md:py-28 bg-white">
      <div className="section-container">
        <div className="text-center mb-10 sm:mb-16 md:mb-20">
          <h2 className="section-heading">
            About <span className="text-school-green">Green Valley</span>
          </h2>
          <div className="accent-line" />
          <p className="section-subheading">
            Established in 2005, Green Valley Convent School has been a beacon of quality education
            in Delhi, providing comprehensive learning from Nursery to Class 8th.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start mb-14 sm:mb-20">
          {/* Text block */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Our Mission &amp; Vision
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4 text-sm sm:text-base">
                At Green Valley Convent School, we are committed to nurturing young minds and
                shaping future leaders. Our mission is to provide a stimulating learning environment
                that fosters academic excellence, character building, and holistic development.
              </p>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                We believe in empowering students with knowledge, values, and skills that prepare
                them for the challenges of tomorrow. Through modern teaching methodologies and
                state-of-the-art infrastructure, we ensure every child reaches their full potential.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-3 pt-2">
              <span className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-school-green/5 text-school-green text-xs sm:text-sm font-medium rounded-full">
                Govt. Recognized
              </span>
              <span className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-school-navy/5 text-school-navy text-xs sm:text-sm font-medium rounded-full">
                Nursery to 8th
              </span>
              <span className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-school-gold/10 text-school-rust text-xs sm:text-sm font-medium rounded-full">
                Delhi, India
              </span>
            </div>
          </div>

          {/* Feature cards — 2-col always, but smaller padding on xs */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-4 sm:p-5 md:p-6 rounded-2xl border border-gray-100 hover:border-school-green/30 hover:shadow-lg transition-all duration-300 bg-white"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-school-green/5 flex items-center justify-center mb-3 group-hover:bg-school-green/10 transition-colors duration-300">
                  <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-school-green" />
                </div>
                <h4 className="text-sm sm:text-base font-bold text-gray-900 mb-1 sm:mb-2 leading-tight">
                  {feature.title}
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 sm:gap-8">
          {[
            { number: '19+', label: 'Years of Excellence' },
            { number: '9,000+', label: 'Students Educated' },
            { number: '15+', label: 'Expert Faculty' },
            { number: '100%', label: 'Pass Results' },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-4 sm:p-6 md:p-8 rounded-2xl bg-gradient-to-br from-school-green/5 to-school-green/0 border border-school-green/10"
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-school-green mb-1 leading-tight">
                {stat.number}
              </div>
              <div className="text-xs sm:text-sm text-gray-600 font-medium leading-tight">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
