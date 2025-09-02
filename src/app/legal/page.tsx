import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Privacy Policy | PestControl99',
  description: 'Terms and conditions, privacy policy, and legal information for PestControl99 pest control services in Mumbai.',
  keywords: 'terms and conditions, privacy policy, legal, pest control terms, pest control privacy',
  openGraph: {
    title: 'Terms & Conditions | Privacy Policy | PestControl99',
    description: 'Terms and conditions, privacy policy, and legal information for PestControl99 pest control services in Mumbai.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.pestcontrol99.com/legal',
  },
};

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Breadcrumb items={[
        { label: 'Legal', href: '/legal' }
      ]} />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8 text-center">
            Terms & Conditions & Privacy Policy
          </h1>
          
          <div className="bg-white rounded-lg shadow-lg p-8 space-y-12">
            
            {/* Terms & Conditions Section */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Terms & Conditions</h2>
              
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h3>
                  <p>
                    By accessing and using PestControl99 services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">2. Service Description</h3>
                  <p>
                    PestControl99 provides professional pest control services including but not limited to cockroach control, termite treatment, rodent control, mosquito control, wood borer control, and honey bee removal services in Mumbai and surrounding areas.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">3. Booking and Payment</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>All bookings are subject to availability and confirmation</li>
                    <li>Payment is due upon completion of services unless otherwise agreed</li>
                    <li>We accept cash, digital payments, and bank transfers</li>
                    <li>GST will be charged as applicable by law</li>
                    <li>Prices are subject to change without prior notice</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">4. Service Warranty</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Cockroach Control: 365-day warranty</li>
                    <li>Termite Control: Up to 5-year warranty</li>
                    <li>Rodent Control: 90-day warranty</li>
                    <li>Other services: Warranty as specified during booking</li>
                    <li>Warranty covers re-treatment if pests return within warranty period</li>
                    <li>Warranty void if customer uses other pest control services</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">5. Customer Responsibilities</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Provide accurate information about pest problems</li>
                    <li>Ensure access to all areas requiring treatment</li>
                    <li>Follow pre-treatment and post-treatment instructions</li>
                    <li>Keep children and pets away during treatment</li>
                    <li>Maintain cleanliness and hygiene standards</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">6. Cancellation Policy</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Free cancellation up to 24 hours before scheduled service</li>
                    <li>50% charge for cancellations within 24 hours</li>
                    <li>Full charge for no-shows or same-day cancellations</li>
                    <li>Weather-related cancellations will be rescheduled free of charge</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">7. Liability</h3>
                  <p>
                    PestControl99 shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of our services.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">8. Force Majeure</h3>
                  <p>
                    PestControl99 shall not be liable for any failure to perform its obligations where such failure is a result of Acts of Nature, government actions, war, civil disturbance, or other causes beyond our reasonable control.
                  </p>
                </div>
              </div>
            </section>

            {/* Privacy Policy Section */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Privacy Policy</h2>
              
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">1. Information We Collect</h3>
                  <p className="mb-3">We collect information you provide directly to us, such as when you:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Book our services</li>
                    <li>Contact us for quotes or support</li>
                    <li>Fill out forms on our website</li>
                    <li>Subscribe to our newsletter</li>
                    <li>Leave reviews or feedback</li>
                  </ul>
                  <p className="mt-3">
                    This information may include your name, email address, phone number, address, property details, and pest control requirements.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">2. How We Use Your Information</h3>
                  <p className="mb-3">We use the information we collect to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Provide and improve our pest control services</li>
                    <li>Process bookings and payments</li>
                    <li>Send service confirmations and updates</li>
                    <li>Provide customer support</li>
                    <li>Send marketing communications (with your consent)</li>
                    <li>Comply with legal obligations</li>
                    <li>Analyze and improve our website and services</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">3. Information Sharing</h3>
                  <p>
                    We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mt-3">
                    <li>To trusted third-party service providers who assist us in operating our business</li>
                    <li>To comply with legal requirements or protect our rights</li>
                    <li>In connection with a business transfer or merger</li>
                    <li>With your explicit consent</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">4. Data Security</h3>
                  <p>
                    We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">5. Cookies and Tracking</h3>
                  <p>
                    Our website uses cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and understand where our visitors are coming from. You can control cookie settings through your browser preferences.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">6. Your Rights</h3>
                  <p className="mb-3">You have the right to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Access your personal information</li>
                    <li>Correct inaccurate information</li>
                    <li>Request deletion of your information</li>
                    <li>Opt-out of marketing communications</li>
                    <li>Withdraw consent at any time</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">7. Data Retention</h3>
                  <p>
                    We retain your personal information for as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements. Service records are typically retained for 5 years.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">8. Children&apos;s Privacy</h3>
                  <p>
                    Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe we have collected such information, please contact us immediately.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">9. Changes to This Policy</h3>
                  <p>
                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &ldquo;Last Updated&rdquo; date. Your continued use of our services after such changes constitutes acceptance of the updated policy.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">10. Contact Us</h3>
                  <p>
                    If you have any questions about this Privacy Policy or our data practices, please contact us at:
                  </p>
                  <div className="mt-3 p-4 bg-gray-50 rounded-lg">
                    <p><strong>Email:</strong> info@pestcontrol99@gmail.com</p>
                    <p><strong>Phone:</strong> +91 77100 32627</p>
                    <p><strong>Address:</strong> 9/B Arasa shopping center, S.V road, Next to Paneri Shop, Andheri West, Mumbai - 400058</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Additional Legal Information */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional Information</h2>
              
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">GST Information</h3>
                  <p>
                    All our services are subject to applicable GST rates as per Indian tax laws. GST invoices will be provided for all transactions.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Insurance and Licensing</h3>
                  <p>
                    PestControl99 maintains appropriate insurance coverage and holds all necessary licenses and permits required for pest control operations in Mumbai.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Environmental Compliance</h3>
                  <p>
                    We use only approved and environmentally safe pest control products. Our methods comply with all local and national environmental regulations.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Emergency Services</h3>
                  <p>
                    We provide 24/7 emergency pest control services. Emergency calls will be prioritized and responded to as quickly as possible.
                  </p>
                </div>
              </div>
            </section>

            {/* Contact Section */}
            <section className="bg-green-50 p-6 rounded-lg">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Questions About Our Terms or Privacy Policy?</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about our terms and conditions or privacy policy, please don&apos;t hesitate to contact us.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-colors duration-300"
                >
                  Contact Us
                </Link>
                <a
                  href="tel:+917710032627"
                  className="inline-flex items-center justify-center px-6 py-3 bg-white text-green-600 font-semibold rounded-full border-2 border-green-600 hover:bg-green-50 transition-colors duration-300"
                >
                  Call Now: +91 77100 32627
                </a>
              </div>
            </section>

            <div className="text-center text-sm text-gray-500 pt-6 border-t border-gray-200">
              <p>Last Updated: August 2024</p>
              <p>© 2024 PestControl99. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
