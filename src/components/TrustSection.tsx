import { useCallback, useEffect, useRef, useState } from 'react';
import { GOOGLE_RATING_SUMMARY, GOOGLE_REVIEWS } from '@/config/googleReviews';

function GoogleLogo({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  );
}

function StarRating({ rating }: { rating: number }) {
  const filled = Math.round(rating);

  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className={`h-4 w-4 ${i < filled ? 'text-[#FBBC04]' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: (typeof GOOGLE_REVIEWS)[number] }) {
  const initial = review.name.charAt(0).toUpperCase();

  return (
    <article className="review-card flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5">
      <div className="flex items-start gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
          style={{ backgroundColor: review.avatarColor }}
          aria-hidden="true"
        >
          {initial}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold leading-snug text-gray-900">{review.name}</p>
          <p className="mt-0.5 text-xs leading-normal text-gray-500">{review.location}</p>
          <div className="mt-1.5 flex flex-wrap items-center gap-2">
            <StarRating rating={review.rating} />
            <span className="text-xs text-gray-400">{review.date}</span>
          </div>
        </div>
      </div>
      <p className="review-card-text mt-4 flex-1 text-sm text-gray-700">{review.text}</p>
      <div className="mt-4 flex items-center gap-1.5 border-t border-gray-100 pt-3">
        <GoogleLogo className="h-4 w-4" />
        <span className="text-xs text-gray-500">
          Posted on <span className="font-medium text-gray-700">Google</span>
        </span>
      </div>
    </article>
  );
}

function getSlidesPerView(width: number) {
  if (width >= 1024) return 3;
  if (width >= 768) return 2;
  return 1;
}

function ChevronIcon({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d={direction === 'left' ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'}
      />
    </svg>
  );
}

function ReviewsSlider() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(1);

  const maxIndex = Math.max(0, GOOGLE_REVIEWS.length - slidesPerView);

  useEffect(() => {
    const updateSlidesPerView = () => {
      setSlidesPerView(getSlidesPerView(window.innerWidth));
    };

    updateSlidesPerView();
    window.addEventListener('resize', updateSlidesPerView);
    return () => window.removeEventListener('resize', updateSlidesPerView);
  }, []);

  useEffect(() => {
    setActiveIndex((current) => Math.min(current, maxIndex));
  }, [maxIndex]);

  const scrollToIndex = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(index, maxIndex));
    const track = trackRef.current;
    const slide = track?.children[clamped] as HTMLElement | undefined;

    if (slide) {
      slide.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
    }

    setActiveIndex(clamped);
  }, [maxIndex]);

  const handleScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const scrollLeft = track.scrollLeft;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    Array.from(track.children).forEach((child, index) => {
      const element = child as HTMLElement;
      const distance = Math.abs(element.offsetLeft - scrollLeft);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(Math.min(closestIndex, maxIndex));
  }, [maxIndex]);

  const pageCount = maxIndex + 1;

  return (
    <div className="mx-auto max-w-6xl">
      <div className="reviews-slider flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          onClick={() => scrollToIndex(activeIndex - 1)}
          disabled={activeIndex === 0}
          className="reviews-slider-nav inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-navy-base shadow-md transition hover:border-green-base hover:text-green-base disabled:cursor-not-allowed disabled:opacity-40 sm:h-11 sm:w-11"
          aria-label="Previous review"
        >
          <ChevronIcon direction="left" />
        </button>

        <div className="min-w-0 flex-1 overflow-hidden">
          <div
            ref={trackRef}
            onScroll={handleScroll}
            className="reviews-slider-track flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-label="Client testimonials carousel"
          >
            {GOOGLE_REVIEWS.map((review) => (
              <div key={review.id} className="reviews-slider-slide shrink-0 snap-start">
                <ReviewCard review={review} />
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => scrollToIndex(activeIndex + 1)}
          disabled={activeIndex >= maxIndex}
          className="reviews-slider-nav inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-navy-base shadow-md transition hover:border-green-base hover:text-green-base disabled:cursor-not-allowed disabled:opacity-40 sm:h-11 sm:w-11"
          aria-label="Next review"
        >
          <ChevronIcon direction="right" />
        </button>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2">
        {Array.from({ length: pageCount }, (_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => scrollToIndex(index)}
            className={`h-2.5 rounded-full transition-all ${
              index === activeIndex ? 'w-7 bg-green-base' : 'w-2.5 bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to review slide ${index + 1}`}
            aria-current={index === activeIndex ? 'true' : undefined}
          />
        ))}
      </div>
    </div>
  );
}

export default function TrustSection() {
  return (
    <section className="border-y border-gray-100 bg-gray-50 py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-8 text-center sm:mb-10">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Client Testimonials</h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-gray-600 sm:text-base">
            Real feedback from customers across Mumbai, Thane, Navi Mumbai, Lonavala &amp; Pune
          </p>
        </div>

        <div className="mx-auto mb-8 flex max-w-xl flex-col items-center justify-center gap-4 rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-sm sm:flex-row sm:gap-6">
          <div className="flex items-center gap-3">
            <GoogleLogo className="h-8 w-8" />
            <div className="text-left">
              <p className="text-lg font-semibold leading-none text-gray-900">Google Reviews</p>
              <p className="mt-1 text-xs text-gray-500">Pest Control 99 on Google</p>
            </div>
          </div>
          <div className="hidden h-10 w-px bg-gray-200 sm:block" aria-hidden="true" />
          <div className="flex items-center gap-3">
            <p className="text-3xl font-bold leading-none text-gray-900">{GOOGLE_RATING_SUMMARY.rating}</p>
            <div>
              <StarRating rating={Number(GOOGLE_RATING_SUMMARY.rating)} />
              <p className="mt-1 text-xs text-gray-500">{GOOGLE_RATING_SUMMARY.reviewCount}+ reviews</p>
            </div>
          </div>
        </div>

        <ReviewsSlider />
      </div>
    </section>
  );
}
