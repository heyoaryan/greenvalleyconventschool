import { FileText, Calendar, ClipboardCheck, UserCheck, Download, ArrowRight } from 'lucide-react';

export default function Admissions() {
  const steps = [
    {
      icon: FileText,
      title: 'Fill Application',
      description: 'Download and complete the admission form with required details',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: ClipboardCheck,
      title: 'Submit Documents',
      description: 'Submit the form along with necessary documents and photographs',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: UserCheck,
      title: 'Interaction',
      description: 'Meet with our admission team for student and parent interaction',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Calendar,
      title: 'Admission Confirm',
      description: 'Complete formalities and receive admission confirmation',
      color: 'from-orange-500 to-amber-500',
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
    <section id="admissions" className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12 md:mb-16 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Admission <span className="text-green-600">Status</span>
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-600 mx-auto mb-4 sm:mb-6"></div>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Admissions for the academic year <span className="font-semibold">2025-26</span> are currently{' '}
            <span className="font-semibold text-red-600">closed</span>. Stay tuned for updates regarding{' '}
            <span className="font-semibold">2026-27</span> academic session.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 md:gap-8 mb-10 sm:mb-12 md:mb-16">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 h-full">
                <div className="flex items-center justify-between mb-4 sm:mb-5 md:mb-6">
                  <div className={`bg-gradient-to-br ${step.color} w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg transform hover:rotate-12 transition-transform duration-300`}>
                    <step.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                  </div>
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-200">0{index + 1}</div>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <ArrowRight className="w-8 h-8 text-green-400" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-7 md:gap-8 mb-10 sm:mb-12 md:mb-16">
          <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl sm:rounded-3xl p-6 sm:p-7 md:p-8 lg:p-10 text-white shadow-2xl animate-fade-in-left">
            <h3 className="text-2xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-5 md:mb-6">
              Admissions Closed for 2025-26
            </h3>
            <p className="text-green-100 text-base sm:text-lg mb-4 sm:mb-5 md:mb-6 leading-relaxed">
              Thank you for your interest in Green Valley Convent School. Admissions for the academic year{' '}
              <span className="font-semibold">2025-26</span> are now closed.
            </p>
            <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-7 md:mb-8">
              <li className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                <span className="text-green-50 text-sm sm:text-base">
                  Stay tuned for announcements regarding <span className="font-semibold">2026-27</span> admissions.
                </span>
              </li>
              <li className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                <span className="text-green-50 text-sm sm:text-base">
                  Follow our social media channels for the latest updates.
                </span>
              </li>
            </ul>
            <button
              className="w-full sm:w-auto bg-white text-green-600 px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 rounded-full font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-2 group"
              onClick={() => window.alert('Currently Admission Closed')}
            >
              <Download className="w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-bounce" />
              <span>Download Application Form</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 md:p-8 lg:p-10 shadow-xl border-2 border-gray-100 animate-fade-in-right">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-5 md:mb-6">Required Documents</h3>
            <ul className="space-y-3 sm:space-y-4">
              {requirements.map((req, index) => (
                <li
                  key={index}
                  className="flex items-start space-x-2 sm:space-x-3 group"
                >
                  <div className="bg-green-100 p-1 rounded-full mt-1 group-hover:bg-green-200 transition-colors duration-300 flex-shrink-0">
                    <ClipboardCheck className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                  </div>
                  <span className="text-gray-700 flex-1 text-sm sm:text-base">{req}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-2xl sm:rounded-3xl p-6 sm:p-7 md:p-8 lg:p-12 text-center animate-fade-in-up">
          <h3 className="text-2xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Have Questions?</h3>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-7 md:mb-8 max-w-2xl mx-auto px-4">
            Our admission team is ready to help you with any queries regarding the admission process
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 active:scale-95"
            >
              Contact Admission Office
            </button>
            <a
              href="tel:+919213555965"
              className="px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 bg-white text-gray-900 rounded-full font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border-2 border-gray-200 active:scale-95"
            >
              Call: +91 92135 55965
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
