import { FileText, ClipboardCheck, UserCheck, Calendar, ArrowRight } from 'lucide-react';

export default function Admissions() {
  const steps = [
    {
      icon: FileText,
      title: 'Fill Application',
      description: 'Download and complete the admission form with accurate details and information.',
    },
    {
      icon: ClipboardCheck,
      title: 'Submit Documents',
      description: 'Submit the completed form along with necessary documents and photographs.',
    },
    {
      icon: UserCheck,
      title: 'Interaction',
      description: 'Meet with our admission team for student and parent interaction session.',
    },
    {
      icon: Calendar,
      title: 'Confirmation',
      description: 'Complete formalities and receive official admission confirmation.',
    },
  ];

  const requirements = [
    'Birth Certificate (Original & Copy)',
    'Transfer Certificate (for classes 2nd onwards)',
    'Previous Year Mark Sheet',
    'Aadhar Card (Student & Parents)',
    'Recent Passport Size Photographs (4 copies)',
    'Address Proof',
  ];

  return (
    <section id="admissions" className="py-14 sm:py-20 md:py-28 bg-white">
      <div className="section-container">
        <div className="text-center mb-10 sm:mb-16 md:mb-20">
          <h2 className="section-heading">
            Admission <span className="text-school-green">Status</span>
          </h2>
          <div className="accent-line" />
          <p className="section-subheading">
            Admissions for the academic year{' '}
            <span className="font-semibold">2026-27</span> are{' '}
            <span className="font-semibold text-red-600">closed</span>. Stay tuned for updates regarding{' '}
            <span className="font-semibold">2027-28</span> academic session.
          </p>
        </div>

        {/* Admission Process */}
        <div className="mb-14 sm:mb-20">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
            Admission Process
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {steps.map((step, index) => (
              <div key={index}>
                <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 shadow-sm border border-gray-100 hover:shadow-md hover:border-school-green/20 transition-all duration-300 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-school-green/5 flex items-center justify-center flex-shrink-0">
                      <span className="text-school-green font-bold text-base sm:text-lg">{index + 1}</span>
                    </div>
                    <div className="p-2 sm:p-2.5 bg-school-green/5 rounded-lg flex-shrink-0">
                      <step.icon className="w-4 h-4 sm:w-5 sm:h-5 text-school-green" />
                    </div>
                  </div>
                  <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-2 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Info blocks */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 mb-10 sm:mb-16">
          {/* Closed Notice */}
          <div className="bg-gradient-to-br from-school-green to-school-green/90 rounded-3xl p-6 sm:p-8 md:p-10 text-white shadow-lg">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">
              Admissions Closed for 2026-27
            </h3>
            <p className="text-white/80 mb-6 leading-relaxed text-sm sm:text-base">
              Thank you for your interest in Green Valley Convent School. Admissions for the academic
              year <span className="font-semibold text-white">2026-27</span> are now closed.
            </p>
            <ul className="space-y-3 mb-6 sm:mb-8">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-school-gold rounded-full mt-2 flex-shrink-0" />
                <span className="text-white/90 text-xs sm:text-sm">
                  Stay tuned for announcements regarding{' '}
                  <span className="font-semibold text-white">2027-28</span> admissions.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-school-gold rounded-full mt-2 flex-shrink-0" />
                <span className="text-white/90 text-xs sm:text-sm">
                  Follow our social media channels for the latest updates and announcements.
                </span>
              </li>
            </ul>
            <button
              onClick={() => window.alert('Currently Admission Closed')}
              className="inline-flex items-center gap-2 px-5 py-3 bg-white text-school-green font-semibold rounded-lg hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-sm sm:text-base"
            >
              <FileText className="w-4 h-4 flex-shrink-0" />
              Fill Application Form
            </button>
          </div>

          {/* Documents */}
          <div className="bg-school-cream rounded-3xl p-6 sm:p-8 md:p-10 border border-gray-100">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-5 sm:mb-6">
              Required Documents on visit school
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {requirements.map((req, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 p-2.5 sm:p-3 bg-white rounded-xl border border-gray-100 hover:border-school-green/20 transition-all duration-300"
                >
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-school-green/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-school-green">{index + 1}</span>
                  </div>
                  <span className="text-xs sm:text-sm text-gray-700 font-medium leading-snug">{req}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-br from-school-navy/5 to-school-green/5 rounded-3xl p-6 sm:p-8 md:p-12 border border-gray-100">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3">Have Questions?</h3>
          <p className="text-gray-600 mb-6 sm:mb-8 max-w-xl mx-auto text-sm sm:text-base">
            Our admission team is ready to help you with any queries regarding the admission process
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary w-full sm:w-auto"
            >
              Contact Admission Office
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
            <a
              href="tel:+919213555965"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg border-2 border-gray-200 hover:border-school-green hover:text-school-green transition-all duration-300 w-full sm:w-auto text-sm sm:text-base"
            >
              +91 92135 55965
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
