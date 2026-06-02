import { Link } from 'react-router-dom';
import Breadcrumb from '@/components/Breadcrumb';
import BusinessDetailsCard from '@/components/BusinessDetailsCard';
import { BUSINESS } from '@/config/business';

export default function DeleteAccountPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Breadcrumb items={[{ label: 'Delete Account', href: '/delete-account' }]} />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="bg-red-700 px-8 py-10 text-white text-center">
              <h1 className="text-3xl md:text-4xl font-extrabold mb-2">Delete Your Account</h1>
              <p className="text-red-100 opacity-90">
                Pest 99 Partner App — {BUSINESS.legalName}
              </p>
            </div>

            <div className="p-8 md:p-12 space-y-8 text-gray-700 leading-relaxed">
              <p className="text-lg">
                {BUSINESS.legalOperatorLine} If you use the <strong>Pest 99 Partner</strong> mobile
                app, you can permanently delete your technician account using either method below.
              </p>

              <section className="rounded-xl border border-green-100 bg-green-50 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Option 1 — In the app (recommended)</h2>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Open the Pest 99 Partner app and sign in.</li>
                  <li>Go to <strong>Profile</strong>.</li>
                  <li>Tap <strong>Delete Account</strong>.</li>
                  <li>Read the warning, check the confirmation box, enter your password, and confirm.</li>
                </ol>
              </section>

              <section className="rounded-xl border border-gray-200 bg-gray-50 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Option 2 — Email request</h2>
                <p className="mb-4">
                  Email{' '}
                  <a href={`mailto:${BUSINESS.email}`} className="text-green-700 font-semibold hover:underline">
                    {BUSINESS.email}
                  </a>{' '}
                  from your registered mobile number with subject line:{' '}
                  <strong>&quot;Partner Account Deletion Request&quot;</strong>.
                </p>
                <p className="text-sm text-gray-600">
                  We will verify your identity and complete deletion within 7 business days.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-3">What happens when you delete</h2>
                <ul className="space-y-2 list-disc pl-6">
                  <li>Your profile, login, and push notification tokens are removed immediately.</li>
                  <li>Personal data such as name, mobile, photo, and bank details are anonymized or deleted.</li>
                  <li>
                    Completed booking and payment records may be retained for up to{' '}
                    <strong>90 days</strong> for legal, tax, and dispute resolution, then archived per our{' '}
                    <Link to="/data-deletion" className="text-green-700 hover:underline">
                      Data Deletion Policy
                    </Link>
                    .
                  </li>
                  <li>Deletion is permanent and cannot be undone.</li>
                </ul>
              </section>

              <p className="text-sm text-gray-500">
                See also our{' '}
                <Link to="/privacy-policy" className="text-green-700 hover:underline">
                  Privacy Policy
                </Link>{' '}
                and{' '}
                <Link to="/terms-and-conditions" className="text-green-700 hover:underline">
                  Terms & Conditions
                </Link>
                .
              </p>
            </div>
          </div>

          <BusinessDetailsCard />
        </div>
      </div>
    </div>
  );
}
