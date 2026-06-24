import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppImage from '@/components/AppImage';
import { FEATURED_PEST_SERVICES } from '@/config/homeServices';

const VALUE_SLIDES = [
  {
    id: 'warranty',
    title: '365-Day Warranty',
    subtitle: 'Written warranty on every treatment — herbals & lab-tested chemicals.',
    image: '/images/pest-control-hero-mumbai.webp',
    accent: '/images/cockroaches.webp',
    href: '/#get-quote',
    cta: 'Get Free Quote',
  },
  {
    id: 'same-day',
    title: 'Same-Day Service',
    subtitle: 'Book before noon — we reach Mumbai, Thane, Navi Mumbai & Pune the same day.',
    image: '/images/hero-home.webp',
    accent: '/images/mosquitoes.webp',
    href: '/#get-quote',
    cta: 'Book Now',
  },
] as const;

type PromoSlide = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  accent: string;
  href: string;
  cta: string;
  alt: string;
  accentAlt: string;
};

const PEST_SLIDES: PromoSlide[] = FEATURED_PEST_SERVICES.map((service, index) => {
  const accent = FEATURED_PEST_SERVICES[(index + 1) % FEATURED_PEST_SERVICES.length];
  return {
    id: service.id,
    title: service.name,
    subtitle: 'Safe, odourless treatment with upfront pricing and expert technicians.',
    image: service.image,
    accent: accent.image,
    href: service.href,
    cta: `View ${service.cardLabel}`,
    alt: service.alt,
    accentAlt: accent.alt,
  };
});

const SLIDES: PromoSlide[] = [...PEST_SLIDES, ...VALUE_SLIDES.map((slide) => ({
  ...slide,
  alt: slide.title,
  accentAlt: 'Pest illustration',
}))];

const AUTO_MS = 5000;

export default function HomeHeroPromoSlider() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = SLIDES.length;

  const goTo = useCallback(
    (index: number) => {
      setActive(((index % count) + count) % count);
    },
    [count],
  );

  const goNext = useCallback(() => goTo(active + 1), [active, goTo]);
  const goPrev = useCallback(() => goTo(active - 1), [active, goTo]);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % count);
    }, AUTO_MS);
    return () => window.clearInterval(timer);
  }, [paused, count]);

  const slide = SLIDES[active];

  return (
    <div
      className="hero-promo-slider"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="hero-promo-slider-stage" aria-live="polite">
        <div className="hero-promo-diamond hero-promo-diamond--accent hero-promo-diamond--tl">
          <div className="hero-promo-diamond-inner">
            <AppImage
              src={slide.accent}
              alt={slide.accentAlt}
              className="hero-promo-diamond-img"
            />
          </div>
        </div>

        <div className="hero-promo-diamond hero-promo-diamond--main">
          <div className="hero-promo-diamond-inner">
            <AppImage
              src={slide.image}
              alt={slide.alt}
              className="hero-promo-diamond-img"
            />
          </div>
        </div>

        <div className="hero-promo-diamond hero-promo-diamond--accent hero-promo-diamond--br">
          <div className="hero-promo-diamond-inner">
            <AppImage
              src={slide.accent}
              alt=""
              aria-hidden="true"
              className="hero-promo-diamond-img"
            />
          </div>
        </div>
      </div>

      <div className="hero-promo-slider-copy">
        <h3 className="hero-promo-slider-title">{slide.title}</h3>
        <p className="hero-promo-slider-subtitle">{slide.subtitle}</p>
        <Link to={slide.href} className="hero-promo-slider-cta">
          {slide.cta}
          <span aria-hidden="true">→</span>
        </Link>
      </div>

      <div className="hero-promo-slider-nav" aria-label="Pest showcase carousel">
        <button
          type="button"
          className="hero-promo-slider-arrow"
          onClick={goPrev}
          aria-label="Previous slide"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="hero-promo-slider-dots" role="tablist">
          {SLIDES.map((item, index) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={index === active}
              aria-label={`Show slide: ${item.title}`}
              className={`hero-promo-slider-dot ${index === active ? 'is-active' : ''}`}
              onClick={() => goTo(index)}
            />
          ))}
        </div>

        <button
          type="button"
          className="hero-promo-slider-arrow"
          onClick={goNext}
          aria-label="Next slide"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
