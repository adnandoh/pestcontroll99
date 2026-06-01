import Breadcrumb from '@/components/Breadcrumb';
import { BUSINESS } from '@/config/business';

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Breadcrumb items={[{ label: 'Refund Policy', href: '/refund-policy' }]} />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="bg-emerald-700 px-8 py-10 text-white text-center">
              <h1 className="text-3xl md:text-4xl font-extrabold mb-2">Refund Policy</h1>
              <p className="text-emerald-100 opacity-90">Effective Date: 28 May 2026</p>
            </div>

            <div className="p-8 md:p-12 space-y-8 text-gray-700 leading-relaxed">
              <p className="text-lg italic border-l-4 border-emerald-500 pl-6">
                {BUSINESS.legalOperatorLine} This Refund Policy applies to services booked through{' '}
                {BUSINESS.websiteDisplay} under the brand {BUSINESS.brandName}.
              </p>

              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-3">1. Service satisfaction</h2>
                <p>
                  We stand behind our pest control treatments. If pests covered under your service
                  warranty return within the warranty period, we will provide a complimentary
                  re-treatment in line with the warranty terms agreed at booking.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-3">2. Cancellation before service</h2>
                <p>
                  If you cancel before our technician arrives, any advance payment may be refunded
                  minus applicable payment gateway or administrative charges, at our discretion and
                  as communicated at the time of booking.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-3">3. Completed services</h2>
                <p>
                  Once a service visit is completed and treatment has been applied, fees are
                  generally non-refundable. Partial refunds are considered only where service was
                  not delivered as agreed and cannot be remedied by re-treatment.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-3">4. How to request a refund</h2>
                <p>
                  Email{' '}
                  <a href={`mailto:${BUSINESS.email}`} className="text-emerald-700 font-semibold hover:underline">
                    {BUSINESS.email}
                  </a>{' '}
                  or call{' '}
                  <a href={`tel:${BUSINESS.phoneTel}`} className="text-emerald-700 font-semibold hover:underline">
                    {BUSINESS.phoneDisplay}
                  </a>{' '}
                  with your booking reference, service date, and reason for the request. We aim to
                  respond within 3–5 business days.
                </p>
              </section>

              <section className="rounded-xl bg-gray-50 border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-2">Contact</h2>
                <p className="font-semibold text-gray-900">{BUSINESS.legalName}</p>
                <p className="text-sm text-gray-600">Brand: {BUSINESS.brandName}</p>
                <p className="text-sm mt-2">{BUSINESS.address.full}</p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
