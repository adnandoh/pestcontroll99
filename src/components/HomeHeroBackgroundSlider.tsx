import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppImage from '@/components/AppImage';
import { BUSINESS } from '@/config/business';

type HeroSlideOverlay = {
  headline: string;
  subheadline: string;
  body: string;
};

type HeroSlide = {
  id: string;
  src: string;
  mobileSrc?: string;
  alt: string;
  overlay?: HeroSlideOverlay;
  imageFit?: 'cover' | 'contain';
};

const WHATSAPP_URL = `https://wa.me/${BUSINESS.phoneWhatsApp}?text=${encodeURIComponent(
  'Hello Pest Control 99, I would like to book a pest control service.',
)}`;

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'monsoon',
    src: '/images/hero-monsoon-wide.webp',
    mobileSrc: '/images/hero-monsoon-mobile.webp',
    alt: "Don't let monsoon invite pests into your home — safe pest control by Pest Control 99",
  },
  {
    id: 'home',
    src: '/images/hero-slide-2-desktop.webp',
    mobileSrc: '/images/hero-slide-2-mobile.webp',
    alt: 'Pest Control 99 technician providing safe, professional pest control in a Mumbai home',
  },

];

const AUTO_MS = 6000;

function HeroSlideOverlayPanel({ overlay }: { overlay: HeroSlideOverlay }) {
  return (
    <div className="hero-slide-overlay">
      <div className="hero-slide-overlay-inner">
        <h2 className="hero-slide-headline">{overlay.headline}</h2>
        <p className="hero-slide-subheadline">{overlay.subheadline}</p>
        <p className="hero-slide-body">{overlay.body}</p>
        <div className="hero-slide-ctas">
          <Link to="/#get-quote" className="hero-slide-btn hero-slide-btn-primary">
            Book Now
          </Link>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-slide-btn hero-slide-btn-whatsapp"
          >
            WhatsApp Us
          </a>
        </div>
      </div>
    </div>
  );
}

export default function HomeHeroBackgroundSlider() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = HERO_SLIDES.length;
  const activeSlide = HERO_SLIDES[active];

  const goTo = useCallback(
    (index: number) => {
      setActive(((index % count) + count) % count);
    },
    [count],
  );

  useEffect(() => {
    if (paused || count <= 1) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % count);
    }, AUTO_MS);
    return () => window.clearInterval(timer);
  }, [paused, count]);

  return (
    <div
      className={`hero-bg-slider${activeSlide.overlay ? ' hero-bg-slider--text-overlay' : ''}${activeSlide.imageFit === 'contain' ? ' hero-bg-slider--fit-contain' : ''}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {HERO_SLIDES.map((slide, index) => (
        <div
          key={slide.id}
          className={`hero-bg-slide ${index === active ? 'is-active' : ''}${slide.imageFit === 'contain' ? ' hero-bg-slide--contain' : ''}`}
          aria-hidden={index !== active}
        >
          {slide.mobileSrc ? (
            <>
              <div className="hidden md:block absolute inset-0 h-full w-full">
                <AppImage
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className={
                    slide.imageFit === 'contain'
                      ? 'object-contain object-center'
                      : 'object-cover object-center'
                  }
                />
              </div>
              <div className="block md:hidden absolute inset-0 h-full w-full">
                <AppImage
                  src={slide.mobileSrc}
                  alt={slide.alt}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className={
                    slide.imageFit === 'contain'
                      ? 'object-contain object-center'
                      : 'object-cover object-center'
                  }
                />
              </div>
            </>
          ) : (
            <AppImage
              src={slide.src}
              alt={slide.alt}
              fill
              priority={index === 0}
              sizes="100vw"
              className={
                slide.imageFit === 'contain'
                  ? 'object-contain object-center'
                  : 'object-cover object-center'
              }
            />
          )}
        </div>
      ))}



      {activeSlide.overlay ? <HeroSlideOverlayPanel overlay={activeSlide.overlay} /> : null}

      <div className="hero-bg-slider-dots" role="tablist" aria-label="Hero slides">
        {HERO_SLIDES.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            role="tab"
            aria-selected={index === active}
            aria-label={`Show hero slide ${index + 1} of ${count}`}
            className={`hero-bg-slider-dot ${index === active ? 'is-active' : ''}`}
            onClick={() => goTo(index)}
          />
        ))}
      </div>
    </div>
  );
}
