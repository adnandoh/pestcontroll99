import { BUSINESS } from '@/config/business';

export default function BusinessDetailsCard({ className = '' }: { className?: string }) {
  const rows = [
    { label: 'Business Name', value: BUSINESS.legalName },
    { label: 'Brand Name', value: BUSINESS.brandName },
    { label: 'Website', value: BUSINESS.websiteDisplay, href: BUSINESS.website },
    { label: 'Official Email', value: BUSINESS.email, href: `mailto:${BUSINESS.email}` },
    { label: 'Phone Number', value: BUSINESS.phoneDisplay, href: `tel:${BUSINESS.phoneTel}` },
    { label: 'Registered Address', value: BUSINESS.address.full },
  ];

  return (
    <div className={`rounded-2xl border border-green-100 bg-green-50/50 p-6 sm:p-8 ${className}`}>
      <h2 className="text-lg font-bold text-gray-900 mb-1">Official Business Details</h2>
      <p className="text-sm text-gray-600 mb-6">{BUSINESS.legalOperatorLine}</p>
      <dl className="space-y-4">
        {rows.map((row) => (
          <div key={row.label} className="border-b border-green-100/80 pb-4 last:border-0 last:pb-0">
            <dt className="text-xs font-bold uppercase tracking-wider text-gray-500">{row.label}</dt>
            <dd className="mt-1 text-sm sm:text-base font-semibold text-gray-900">
              {row.href ? (
                <a href={row.href} className="text-green-700 hover:underline break-all">
                  {row.value}
                </a>
              ) : (
                row.value
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
