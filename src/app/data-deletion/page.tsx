import Breadcrumb from '@/components/Breadcrumb';
import { BUSINESS } from '@/config/business';

export default function DataDeletionPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Breadcrumb items={[
        { label: 'Data Deletion', href: '/data-deletion' }
      ]} />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            {/* Header */}
            <div className="bg-red-600 px-8 py-10 text-white text-center">
              <h1 className="text-3xl md:text-4xl font-extrabold mb-2">Data Deletion Instructions</h1>
              <p className="text-red-100 opacity-90">Manage your personal data and privacy</p>
            </div>

            <div className="p-8 md:p-12 space-y-12">
              {/* Intro */}
              <div className="text-center">
                <p className="text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto">
                  {BUSINESS.legalOperatorLine} Users may request deletion of personal data collected by {BUSINESS.legalName} for {BUSINESS.brandName} services.
                </p>
              </div>

              {/* Step by Step */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">How to Request Data Deletion</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="relative group">
                    <div className="bg-red-50 rounded-2xl p-8 h-full border border-red-100 transition-all hover:shadow-lg">
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-lg">1</div>
                      <div className="pt-4 text-center">
                        <h3 className="font-bold text-gray-900 mb-3">Compose Email</h3>
                        <p className="text-sm text-gray-600">Send an email to: <span className="text-red-600 font-medium">accounts@pestcontrol99.com</span></p>
                      </div>
                    </div>
                  </div>
                  <div className="relative group">
                    <div className="bg-red-50 rounded-2xl p-8 h-full border border-red-100 transition-all hover:shadow-lg">
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-lg">2</div>
                      <div className="pt-4 text-center">
                        <h3 className="font-bold text-gray-900 mb-3">Subject Line</h3>
                        <p className="text-sm text-gray-600">Use the subject line: <br /><span className="text-red-600 font-medium">"Data Deletion Request"</span></p>
                      </div>
                    </div>
                  </div>
                  <div className="relative group">
                    <div className="bg-red-50 rounded-2xl p-8 h-full border border-red-100 transition-all hover:shadow-lg">
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-lg">3</div>
                      <div className="pt-4 text-center">
                        <h3 className="font-bold text-gray-900 mb-3">Include Details</h3>
                        <p className="text-sm text-gray-600">Include your registered phone number or email address.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border border-gray-200 bg-white p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">What we delete vs retain</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="py-3 pr-4 font-semibold text-gray-900">Data type</th>
                        <th className="py-3 pr-4 font-semibold text-gray-900">Action</th>
                        <th className="py-3 font-semibold text-gray-900">Retention</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700">
                      <tr className="border-b border-gray-100">
                        <td className="py-3 pr-4">Partner profile (name, mobile, photo, bank)</td>
                        <td className="py-3 pr-4">Deleted / anonymized</td>
                        <td className="py-3">Immediate</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 pr-4">Login credentials & push tokens</td>
                        <td className="py-3 pr-4">Deleted</td>
                        <td className="py-3">Immediate</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 pr-4">Completed booking & payment records</td>
                        <td className="py-3 pr-4">Retained (anonymized where required)</td>
                        <td className="py-3">Up to 90 days, then archived</td>
                      </tr>
                      <tr>
                        <td className="py-3 pr-4">Legal / tax invoices</td>
                        <td className="py-3 pr-4">Retained as required by law</td>
                        <td className="py-3">As per applicable regulations</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-6 text-sm text-gray-600">
                  Partner app users can also delete their account in-app under Profile → Delete Account, or via our{' '}
                  <a href="/delete-account" className="text-red-600 font-medium hover:underline">
                    Delete Account page
                  </a>
                  .
                </p>
              </section>

              {/* Processing Time */}
              <section className="bg-gray-900 text-white rounded-2xl p-8 md:p-12 relative overflow-hidden">
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="max-w-md">
                    <h2 className="text-2xl font-bold mb-4">Processing Time</h2>
                    <p className="text-gray-400 leading-relaxed">
                      Your privacy is our priority. Data deletion requests are generally processed within <span className="text-red-500 font-bold">7 to 15 business days</span>. You will receive a confirmation once your data has been successfully removed from our records.
                    </p>
                  </div>
                  <div className="bg-white/10 p-6 rounded-full backdrop-blur-sm">
                    <svg className="w-16 h-16 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                </div>
                {/* Decorative circle */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full -mr-32 -mt-32"></div>
              </section>

              {/* Contact */}
              <section className="pt-8 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact</h2>
                <div className="inline-block bg-gray-50 rounded-2xl p-8 border border-gray-100 min-w-[300px]">
                  <p className="text-xl font-bold text-gray-900 mb-1">{BUSINESS.brandName}</p>
                  <p className="text-sm text-gray-500 mb-4">{BUSINESS.legalName}</p>
                  <div className="space-y-2 mt-4">
                    <a href={BUSINESS.website} className="block text-red-600 hover:underline font-medium">{BUSINESS.websiteDisplay}</a>
                    <a href={`mailto:${BUSINESS.email}`} className="block text-red-600 hover:underline font-medium">{BUSINESS.email}</a>
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
