import { Metadata } from 'next';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Privacy Policy | PestControl99',
  description: 'Privacy Policy for PestControl99. Learn how we collect, use, and protect your information.',
  keywords: 'privacy policy, data protection, pest control privacy, PestControl99',
  alternates: {
    canonical: 'https://www.pestcontrol99.com/privacy-policy',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Breadcrumb items={[
        { label: 'Privacy Policy', href: '/privacy-policy' }
      ]} />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            {/* Header */}
            <div className="bg-green-600 px-8 py-10 text-white text-center">
              <h1 className="text-3xl md:text-4xl font-extrabold mb-2">Privacy Policy</h1>
              <p className="text-green-100 opacity-90">Effective Date: 06 May 2026</p>
            </div>

            <div className="p-8 md:p-12 space-y-10">
              {/* Intro */}
              <p className="text-lg text-gray-700 leading-relaxed italic border-l-4 border-green-500 pl-6">
                Welcome to PestControl99.com. Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use our website and services.
              </p>

              {/* Section 1 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="bg-green-100 text-green-700 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">1</span>
                  Information We Collect
                </h2>
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                  <p className="text-gray-700 mb-4 font-medium">We may collect the following information:</p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      'Name',
                      'Phone number',
                      'Email address',
                      'Address',
                      'Booking details',
                      'Device and browser information',
                      'IP address'
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-center text-gray-600">
                        <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* Section 2 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="bg-green-100 text-green-700 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">2</span>
                  How We Use Your Information
                </h2>
                <div className="space-y-4">
                  <p className="text-gray-700">We use your information to:</p>
                  <div className="grid grid-cols-1 gap-4">
                    {[
                      'Provide pest control services',
                      'Respond to inquiries and bookings',
                      'Improve our website and services',
                      'Send service updates and notifications',
                      'Maintain security and prevent fraud'
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start p-4 bg-white border border-gray-100 rounded-lg hover:shadow-md transition-shadow">
                        <div className="bg-green-50 p-2 rounded-lg mr-4">
                          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                        </div>
                        <p className="text-gray-700 font-medium">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Section 3 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="bg-green-100 text-green-700 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">3</span>
                  Sharing of Information
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We do not sell your personal information. Information may only be shared with:
                </p>
                <ul className="space-y-3 pl-4">
                  {[
                    'Service providers working with us',
                    'Legal authorities if required by law',
                    'Payment or communication providers for business operations'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center text-gray-600">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Section 4 & 5 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <section className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">4. Data Security</h2>
                  <p className="text-gray-600 leading-relaxed">
                    We take reasonable security measures to protect your information from unauthorized access, misuse, or disclosure.
                  </p>
                </section>
                <section className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">5. Cookies</h2>
                  <p className="text-gray-600 leading-relaxed">
                    Our website may use cookies to improve user experience and website functionality.
                  </p>
                </section>
              </div>

              {/* Section 6 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-green-100 text-green-700 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">6</span>
                  Third-Party Services
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Our website may contain links or integrations with third-party services such as Meta, WhatsApp, Google, or payment providers.
                </p>
              </section>

              {/* Section 7 */}
              <section className="bg-green-50 p-8 rounded-2xl border border-green-100">
                <h2 className="text-2xl font-bold text-green-900 mb-6">7. Your Rights</h2>
                <p className="text-green-800 mb-6">You may contact us to:</p>
                <div className="flex flex-wrap gap-4">
                  {['Access your data', 'Correct your data', 'Request deletion of your data'].map((item, idx) => (
                    <span key={idx} className="bg-white px-4 py-2 rounded-full text-green-700 font-semibold shadow-sm text-sm border border-green-100">
                      {item}
                    </span>
                  ))}
                </div>
              </section>

              {/* Section 8 */}
              <section className="pt-8 border-t border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">8. Contact Us</h2>
                <div className="max-w-md mx-auto bg-gray-50 rounded-2xl p-8 border border-gray-100 text-center">
                  <p className="text-xl font-bold text-gray-900 mb-2">Pest Control 99</p>
                  <p className="text-gray-600 mb-4">If you have questions regarding this Privacy Policy, contact us:</p>
                  <div className="space-y-3">
                    <a href="https://pestcontrol99.com" className="block text-green-600 hover:underline font-medium">pestcontrol99.com</a>
                    <a href="mailto:info@pestcontrol99.com" className="block text-green-600 hover:underline font-medium">info@pestcontrol99.com</a>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
