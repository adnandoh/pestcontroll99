import AppImage from '@/components/AppImage';
import { BUSINESS } from '@/config/business';

const HERO_BANNER = {
  src: '/images/hero-banner.png',
  alt: `${BUSINESS.brandName} — we keep your home & business pest-free. Cockroaches, bed bugs, mosquitoes, termites, rodents & ants. Licensed, government-approved chemicals, invoice provided.`,
  width: 2103,
  height: 748,
} as const;

/**
 * Single full-width hero banner. Marketing copy is baked into the artwork.
 * Scales with w-full h-auto so mobile never crops the panoramic image.
 */
export default function HomeHeroBanner() {
  return (
    <div className="hero-bg-slider hero-bg-slider--single">
      <div className="hero-bg-slide is-active">
        <AppImage
          src={HERO_BANNER.src}
          alt={HERO_BANNER.alt}
          width={HERO_BANNER.width}
          height={HERO_BANNER.height}
          priority
          sizes="100vw"
          className="block h-auto w-full"
        />
      </div>
    </div>
  );
}
