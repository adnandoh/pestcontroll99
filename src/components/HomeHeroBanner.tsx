import AppImage from '@/components/AppImage';
import { BUSINESS } from '@/config/business';

const HERO_ALT = `${BUSINESS.brandName} — we keep your home & business pest-free. Cockroaches, bed bugs, mosquitoes, termites, rodents & ants. Licensed, government-approved chemicals, invoice provided.`;

/** Near-square artwork for phones (< md / 768px). */
const HERO_BANNER_MOBILE = {
  src: '/images/hero-banner.png',
  width: 1230,
  height: 1037,
} as const;

/** Wide landscape artwork for tablet/desktop (md+ / ≥768px). Cache-bust when asset changes. */
const HERO_BANNER_DESKTOP = {
  src: '/images/hero-banner-desktop.png?v=991x396-natural',
  width: 991,
  height: 396,
} as const;

/**
 * Full-width hero banner. Marketing copy is baked into the artwork.
 * Mobile keeps the near-square banner; md+ swaps to the landscape desktop banner
 * via <picture> so only one asset is requested for the active viewport.
 * Desktop uses the asset's natural aspect ratio (already a short ~50% crop);
 * mobile keeps a max-height cover crop so the near-square art doesn't dominate.
 */
export default function HomeHeroBanner() {
  return (
    <div className="hero-bg-slider hero-bg-slider--single">
      <div className="hero-bg-slide is-active">
        <picture className="block w-full">
          <source
            media="(min-width: 768px)"
            srcSet={HERO_BANNER_DESKTOP.src}
            width={HERO_BANNER_DESKTOP.width}
            height={HERO_BANNER_DESKTOP.height}
          />
          <AppImage
            src={HERO_BANNER_MOBILE.src}
            alt={HERO_ALT}
            width={HERO_BANNER_MOBILE.width}
            height={HERO_BANNER_MOBILE.height}
            priority
            sizes="100vw"
            className="block h-auto w-full"
          />
        </picture>
      </div>
    </div>
  );
}
