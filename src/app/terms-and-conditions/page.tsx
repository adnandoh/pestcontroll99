import Breadcrumb from '@/components/Breadcrumb';
import { BUSINESS } from '@/config/business';

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Breadcrumb items={[
        { label: 'Terms & Conditions', href: '/terms-and-conditions' }
      ]} />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            {/* Header */}
            <div className="bg-blue-600 px-8 py-10 text-white text-center">
              <h1 className="text-3xl md:text-4xl font-extrabold mb-2">Terms and Conditions</h1>
              <p className="text-blue-100 opacity-90">Effective Date: 06 May 2026</p>
            </div>

            <div className="p-8 md:p-12 space-y-10">
              {/* Intro */}
              <p className="text-lg text-gray-700 leading-relaxed italic border-l-4 border-blue-500 pl-6">
                {BUSINESS.legalOperatorLine} By using {BUSINESS.websiteDisplay}, you agree to the following terms and conditions for {BUSINESS.brandName} services. Please read them carefully before booking.
              </p>

              {/* Section 1 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="bg-blue-100 text-blue-700 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">1</span>
                  Services
                </h2>
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                  <p className="text-gray-700 leading-relaxed">
                    <span className="font-bold">{BUSINESS.legalName}</span> ({BUSINESS.brandName}) provides pest control-related services and support through its website and communication channels. We strive to provide the highest quality service to ensure your environment is pest-free.
                  </p>
                </div>
              </section>

              {/* Section 2 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="bg-blue-100 text-blue-700 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">2</span>
                  Booking and Payments
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { title: 'Availability', text: 'Service bookings are subject to availability.' },
                    { title: 'Pricing', text: 'Prices may vary depending on service type and location.' },
                    { title: 'Accuracy', text: 'Users agree to provide accurate information during booking.' }
                  ].map((item, idx) => (
                    <div key={idx} className="p-6 bg-white border border-gray-100 rounded-xl hover:shadow-lg transition-all border-t-4 border-t-blue-500">
                      <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section 3 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="bg-blue-100 text-blue-700 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">3</span>
                  User Responsibilities
                </h2>
                <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100">
                  <p className="text-blue-900 font-semibold mb-4">Users must ensure the following:</p>
                  <ul className="space-y-4">
                    {[
                      'Provide correct contact details',
                      'Cooperate during service visits',
                      'Avoid misuse of the website or services'
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-center text-blue-800">
                        <svg className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* Section 4 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="bg-blue-100 text-blue-700 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">4</span>
                  Limitation of Liability
                </h2>
                <p className="text-gray-700 mb-6 italic"><span className="font-bold">{BUSINESS.legalName}</span> is not liable for:</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    'Delays caused by external factors',
                    'Temporary website downtime',
                    'Indirect damages or losses'
                  ].map((item, idx) => (
                    <div key={idx} className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-100 text-sm font-medium text-center">
                      {item}
                    </div>
                  ))}
                </div>
              </section>

              {/* Section 5 & 6 & 7 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <section className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">5. Intellectual Property</h2>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    All website content, branding, logos, and materials belong to <span className="font-bold">{BUSINESS.legalName}</span> ({BUSINESS.brandName}).
                  </p>
                </section>
                <section className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">6. Changes to Terms</h2>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    We may update these terms at any time without prior notice.
                  </p>
                </section>
                <section className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">7. Governing Law</h2>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    These terms shall be governed under the laws of India.
                  </p>
                </section>
              </div>

              {/* Section 8 */}
              <section className="pt-8 border-t border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">8. Contact</h2>
                <div className="max-w-md mx-auto bg-gray-50 rounded-2xl p-8 border border-gray-100 text-center">
                  <p className="text-xl font-bold text-gray-900 mb-1">{BUSINESS.brandName}</p>
                  <p className="text-sm text-gray-500 mb-4">{BUSINESS.legalName}</p>
                  <p className="text-gray-600 mb-4">{BUSINESS.legalOperatorLine}</p>
                  <div className="space-y-3">
                    <a href={BUSINESS.website} className="block text-blue-600 hover:underline font-medium">{BUSINESS.websiteDisplay}</a>
                    <a href={`mailto:${BUSINESS.email}`} className="block text-blue-600 hover:underline font-medium">{BUSINESS.email}</a>
                    <a href={`tel:${BUSINESS.phoneTel}`} className="block text-blue-600 hover:underline font-medium">{BUSINESS.phoneDisplay}</a>
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
