import AppImage from '@/components/AppImage';
import { BUSINESS } from '@/config/business';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

const HERO_BUGS = ['🪳', '🐜', '🦟', '🐀'] as const;

const PLAY_STORE_URL =
  'https://play.google.com/store/apps/details?id=com.pestcontrol99.pest_99_customer_app';

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

/** Official Google Play 2022-style prism (blue / green / yellow / red). */
function PlayStoreGlyph() {
  return (
    <svg viewBox="0 0 256 283" aria-hidden focusable="false">
      <path
        fill="#EA4335"
        d="M119.55 134.92 1.06 259.06c2.7 9.56 9.66 17.33 18.86 21.06 9.2 3.73 19.61 3 28.2-1.99l133.33-75.93-61.9-67.28z"
      />
      <path
        fill="#FBBC04"
        d="m239.37 113.81-57.66-33.02-64.9 56.95 65.16 64.28 57.22-32.67c10.33-5.41 16.8-16.11 16.8-27.77s-6.47-22.36-16.62-27.77z"
      />
      <path
        fill="#4285F4"
        d="M1.06 23.49C.34 26.13 0 28.87 0 31.61v219.33c0 2.74.36 5.47 1.06 8.12L123.61 138.1 1.06 23.49z"
      />
      <path
        fill="#34A853"
        d="m120.44 141.27 61.28-60.48L48.56 4.5C43.55 1.57 37.86.02 32.05 0 17.64-.03 4.98 9.53 1.06 23.4l119.38 117.87z"
      />
    </svg>
  );
}

function MessageGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M4 4h16v12H7l-3 3zm3 4v2h10V8zm0 4v2h7v-2z" />
    </svg>
  );
}

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
          {/* Mobile-only mint band — hidden on desktop so the form sits higher */}
          <div className="home-booking-hero-band" aria-hidden="true">
            <span className="home-booking-badge">LICENSED PEST CONTROL</span>
            <p className="home-booking-headline">
              Book Pest Control <span className="home-booking-headline-accent">in 60 Seconds</span>
            </p>
            <HeroTrustLine />
            <div className="home-booking-bugline">
              {HERO_BUGS.map((bug) => (
                <div key={bug} className="home-booking-bug">
                  {bug}
                </div>
              ))}
            </div>
            <div className="home-booking-leaf" />
          </div>

          <div className="home-booking-form-col">{form}</div>
        </div>
      </div>

      {/* Fixed to viewport — kept outside .home-booking-app so layout/overflow never traps it */}
      <nav className="home-booking-action-bar" aria-label="Quick actions">
        <a
          href={PLAY_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="home-booking-action home-booking-action-play"
        >
          <PlayStoreGlyph />
          Download App
        </a>
        <Link to="/quote/" className="home-booking-action home-booking-action-inquiry">
          <MessageGlyph />
          Send Inquiry
        </Link>
        <a href={`tel:${BUSINESS.phoneTel}`} className="home-booking-action home-booking-action-call">
          ☎ Call Now
        </a>
      </nav>
    </section>
  );
}
