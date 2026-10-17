import AppImage from '@/components/AppImage';
import { BUSINESS } from '@/config/business';
import type { ReactNode } from 'react';

/** Real technician service photo already used site-wide (OG / landing). */
const HERO_MEDIA = {
  src: '/images/hero-home.webp',
  width: 1706,
  height: 922,
} as const;

const HERO_MEDIA_ALT = `${BUSINESS.brandName} technician treating a home — licensed pest control in Mumbai`;

type HomeBookingHeroProps = {
  form: ReactNode;
};

function HeroTrustLine({ className }: { className?: string }) {
  return (
    <div className={className ?? 'home-booking-trust'}>
      <span>Verified Experts</span>
      <i aria-hidden />
      <span>Branded Chemicals</span>
      <i aria-hidden />
      <span>Invoice</span>
    </div>
  );
}

/** Mobile booking composition + desktop image-left / form-right hero */
export default function HomeBookingHero({ form }: HomeBookingHeroProps) {
  return (
    <section className="home-booking-hero" aria-labelledby="home-booking-headline">
      {/* Single document h1 — visual copies below are aria-hidden to avoid duplicates */}
      <h1 id="home-booking-headline" className="sr-only">
        Book Pest Control in 60 Seconds
      </h1>

      <div className="home-booking-app">
        <div className="home-booking-media">
          <AppImage
            src={HERO_MEDIA.src}
            alt={HERO_MEDIA_ALT}
            width={HERO_MEDIA.width}
            height={HERO_MEDIA.height}
            priority
            sizes="(min-width: 1024px) 55vw, (min-width: 768px) 50vw, 100vw"
            className="home-booking-media-img"
          />
          {/* Desktop-only: marketing copy overlaid on hero photo (bottom-left) */}
          <div className="home-booking-media-copy" aria-hidden="true">
            <span className="home-booking-media-badge">LICENSED PEST CONTROL</span>
            <p className="home-booking-media-headline">
              Book Pest Control <span className="home-booking-media-headline-accent">in 60 Seconds</span>
            </p>
            <HeroTrustLine className="home-booking-media-trust" />
          </div>
        </div>

        <div className="home-booking-panel">
          <div className="home-booking-form-col">{form}</div>
        </div>
      </div>
    </section>
  );
}
