import {
  getReviewsForService,
  GOOGLE_RATING_SUMMARY,
  type GoogleReview,
  type ServiceReviewFilter,
} from '@/config/googleReviews';

function GoogleMark({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

function Stars({ rating }: { rating: number }) {
  const filled = Math.round(rating);
  return (
    <div className="flex text-[#FBBC04]" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, index) => (
        <span key={index} className={index < filled ? 'opacity-100' : 'opacity-25'}>
          ★
        </span>
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: GoogleReview }) {
  const initial = review.name.charAt(0).toUpperCase();

  return (
    <article className="flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-6 text-left shadow-lg">
      <div className="mb-4 flex items-start gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
          style={{ backgroundColor: review.avatarColor }}
          aria-hidden="true"
        >
          {initial}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-gray-900">{review.name}</p>
          <p className="text-xs text-gray-500">{review.location}</p>
          <div className="mt-1.5 flex flex-wrap items-center gap-2">
            <Stars rating={review.rating} />
            <span className="text-xs text-gray-400">{review.date}</span>
          </div>
        </div>
      </div>
      <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-700">&ldquo;{review.text}&rdquo;</p>
      <div className="mt-auto flex items-center gap-1.5 border-t border-gray-100 pt-3 text-xs text-gray-500">
        <GoogleMark />
        <span>
          Posted on <span className="font-medium text-gray-700">Google</span>
        </span>
      </div>
    </article>
  );
}

type ServiceReviewsSectionProps = {
  service: ServiceReviewFilter;
  className?: string;
};

export default function ServiceReviewsSection({ service, className = 'bg-gray-50' }: ServiceReviewsSectionProps) {
  const reviews = getReviewsForService(service, 3);

  return (
    <section className={`py-16 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="mb-3 text-3xl font-bold text-gray-900 lg:text-4xl">What customers say</h2>
          <p className="mx-auto mb-10 max-w-2xl text-sm text-gray-600 sm:text-base">
            Real Google reviews from Pest Control 99 customers across Mumbai, Thane &amp; Navi Mumbai
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
          <p className="mt-8 text-sm font-medium text-green-700">
            {GOOGLE_RATING_SUMMARY.rating}★ average · {GOOGLE_RATING_SUMMARY.reviewCount}+ Google reviews
          </p>
        </div>
      </div>
    </section>
  );
}
