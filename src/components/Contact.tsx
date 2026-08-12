import { MapPin, Phone, Mail, Facebook, Instagram, Youtube } from 'lucide-react';

export default function Contact() {
  const contactInfo = [
    {
      icon: MapPin,
      title: 'Address',
      details: ['Gali No.7, Bhatta Road', 'Delhi - 110042', 'India'],
      color: 'text-red-600 bg-red-50',
    },
    {
      icon: Phone,
      title: 'Phone',
      details: ['+91 92135 55965', '+91 98109 55677'],
      color: 'text-school-green bg-school-green/5',
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['greenvalleyconventschools@gmail.com'],
      color: 'text-blue-600 bg-blue-50',
    },
  ];

  return (
    <section id="contact" className="py-14 sm:py-20 md:py-28 bg-school-cream">
      <div className="section-container">
        <div className="text-center mb-10 sm:mb-16 md:mb-20">
          <h2 className="section-heading">
            Get in <span className="text-school-green">Touch</span>
          </h2>
          <div className="accent-line" />
          <p className="section-subheading">
            We'd love to hear from you. Visit us or reach out for any inquiries
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-10 sm:mb-16">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-5 sm:p-6 md:p-8 shadow-sm border border-gray-100 hover:shadow-md hover:border-school-green/20 transition-all duration-300"
            >
              <div className={`inline-flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl ${info.color} mb-4`}>
                <info.icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3">{info.title}</h3>
              <div className="space-y-1.5">
                {info.details.map((detail, idx) => {
                  if (info.title === 'Email' && detail.includes('@')) {
                    return (
                      <a
                        key={idx}
                        href={`mailto:${detail}`}
                        className="block text-gray-900 hover:text-school-green text-xs sm:text-sm font-medium transition-colors duration-300 hover:underline break-all"
                      >
                        {detail}
                      </a>
                    );
                  }
                  if (info.title === 'Phone' && detail.includes('+91')) {
                    return (
                      <a
                        key={idx}
                        href={`tel:${detail.replace(/\s/g, '')}`}
                        className="block text-gray-900 hover:text-school-green text-xs sm:text-sm font-medium transition-colors duration-300 hover:underline"
                      >
                        {detail}
                      </a>
                    );
                  }
                  return (
                    <p key={idx} className="text-xs sm:text-sm text-gray-600">
                      {detail}
                    </p>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Map + Social */}
        <div className="grid lg:grid-cols-5 gap-6 sm:gap-8 md:gap-10">
          {/* Map */}
          <div className="lg:col-span-3 bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 min-h-[260px] sm:min-h-[340px]">
            <iframe
              src="https://maps.google.com/maps?q=Green+Valley+Convent+School,+Gali+No.7,+Bhatta+Road,+Delhi+110042&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, display: 'block', minHeight: '260px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Green Valley Convent School Location"
              className="w-full h-full"
            />
          </div>

          {/* Social */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-5 sm:p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col justify-center">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Follow Us</h3>
            <p className="text-gray-600 mb-6 text-xs sm:text-sm leading-relaxed">
              Stay connected with us on social media for updates, events, announcements, and daily
              school activities.
            </p>
            {/* Stack on xs, row on sm+ */}
            <div className="flex flex-col xs:flex-row sm:flex-col md:flex-row gap-3">
              <a
                href="https://www.facebook.com/share/g/1AUWJr7BfD/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 px-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-all duration-300 font-medium text-xs sm:text-sm min-w-0"
              >
                <Facebook className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">Facebook</span>
              </a>
              <a
                href="https://www.instagram.com/greenvalleyconventschooll?igsh=MWRsdjBxd25seGYzMQ=="
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 px-3 bg-pink-50 text-pink-600 rounded-xl hover:bg-pink-100 transition-all duration-300 font-medium text-xs sm:text-sm min-w-0"
              >
                <Instagram className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">Instagram</span>
              </a>
              <a
                href="https://www.youtube.com/@greenvalleyconventschooll"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 px-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-all duration-300 font-medium text-xs sm:text-sm min-w-0"
              >
                <Youtube className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">YouTube</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
