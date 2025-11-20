import { MapPin, Phone, Mail, Facebook, Instagram, Youtube } from 'lucide-react';

export default function Contact() {
  const contactInfo = [
    {
      icon: MapPin,
      title: 'Address',
      details: ['Gali No.7, Bhatta Road', 'Delhi - 110042', 'India'],
      color: 'from-red-500 to-rose-500',
    },
    {
      icon: Phone,
      title: 'Phone',
      details: ['+91 92135 55965', '+91 98109 55677'],
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['greenvalleyconventschools@gmail.com'],
      color: 'from-blue-500 to-cyan-500',
    },
  ];

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12 md:mb-16 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Get in <span className="text-green-600">Touch</span>
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-600 mx-auto mb-4 sm:mb-6"></div>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            We'd love to hear from you. Visit us or reach out for any inquiries
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8 mb-10 sm:mb-12 md:mb-16">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`bg-gradient-to-br ${info.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shadow-lg transform hover:rotate-12 transition-transform duration-300`}>
                <info.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{info.title}</h3>
              <div className="space-y-1">
                {info.details.map((detail, idx) => {
                  // Make email clickable with black text
                  if (info.title === 'Email' && detail.includes('@')) {
                    return (
                      <a
                        key={idx}
                        href={`mailto:${detail}`}
                        className="text-gray-900 hover:text-green-600 hover:underline break-all transition-colors duration-300 block"
                      >
                        {detail}
                      </a>
                    );
                  }
                  // Make phone numbers clickable
                  if (info.title === 'Phone' && detail.includes('+91')) {
                    return (
                      <a
                        key={idx}
                        href={`tel:${detail.replace(/\s/g, '')}`}
                        className="text-gray-600 hover:text-green-600 hover:underline transition-colors duration-300 block"
                      >
                        {detail}
                      </a>
                    );
                  }
                  return (
                    <p key={idx} className="text-gray-600">
                      {detail}
                    </p>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-7 md:gap-8 mb-10 sm:mb-12 md:mb-16">
          <div className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl h-64 sm:h-72 md:h-80 lg:h-96 animate-fade-in-left">
            <iframe
              src="https://maps.google.com/maps?q=Green+Valley+Convent+School,+Gali+No.7,+Bhatta+Road,+Delhi+110042&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Green Valley Convent School Location"
            ></iframe>
          </div>

          <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl sm:rounded-3xl p-6 sm:p-7 md:p-8 text-white shadow-xl animate-fade-in-right">
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Follow Us</h3>
            <p className="text-green-100 mb-4 sm:mb-5 md:mb-6 text-sm sm:text-base">
              Stay connected with us on social media for updates, events, and announcements
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              <a
                href="https://www.facebook.com/share/g/1AUWJr7BfD/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/20 backdrop-blur-sm p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-white/30 transition-all duration-300 transform hover:scale-110 group"
              >
                <Facebook className="w-5 h-5 sm:w-6 sm:h-6 group-hover:animate-pulse" />
              </a>
              <a
                href="https://www.instagram.com/greenvalleyconventschooll?igsh=MWRsdjBxd25seGYzMQ=="
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/20 backdrop-blur-sm p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-white/30 transition-all duration-300 transform hover:scale-110 group"
              >
                <Instagram className="w-5 h-5 sm:w-6 sm:h-6 group-hover:animate-pulse" />
              </a>
              <a
                href="https://www.youtube.com/@greenvalleyconventschooll"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/20 backdrop-blur-sm p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-white/30 transition-all duration-300 transform hover:scale-110 group"
              >
                <Youtube className="w-5 h-5 sm:w-6 sm:h-6 group-hover:animate-pulse" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
