import { BUSINESS } from '@/config/business';

interface BusinessIdentityBannerProps {
  variant?: 'default' | 'compact' | 'hero';
  className?: string;
}

export default function BusinessIdentityBanner({
  variant = 'default',
  className = '',
}: BusinessIdentityBannerProps) {
  if (variant === 'hero') {
    return (
      <div
        className={`rounded-2xl border border-white/30 bg-white/95 px-5 py-4 shadow-lg backdrop-blur-sm ${className}`}
      >
        <p className="text-xs font-bold uppercase tracking-widest text-green-700">
          {BUSINESS.brandName}
        </p>
        <p className="mt-1 text-sm font-medium text-gray-800 leading-relaxed">
          {BUSINESS.operatingStatement}
        </p>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <p className={`text-sm text-gray-600 leading-relaxed ${className}`}>
        <span className="font-semibold text-gray-900">{BUSINESS.brandName}</span> is a brand
        operated and managed by{' '}
        <span className="font-semibold text-gray-900">{BUSINESS.legalName}</span>.
      </p>
    );
  }

  return (
    <section
      className={`rounded-2xl border border-green-100 bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-8 text-center shadow-sm ${className}`}
    >
      <p className="text-sm font-bold uppercase tracking-wider text-green-700">
        {BUSINESS.brandName}
      </p>
      <p className="mt-3 text-base sm:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
        {BUSINESS.operatingStatement}
      </p>
      <p className="mt-2 text-sm text-gray-500">
        Official website:{' '}
        <a
          href={BUSINESS.website}
          className="font-semibold text-green-700 hover:underline"
          rel="noopener noreferrer"
        >
          {BUSINESS.websiteDisplay}
        </a>
      </p>
    </section>
  );
}
