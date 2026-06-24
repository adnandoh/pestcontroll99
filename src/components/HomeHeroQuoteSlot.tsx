import { useEffect, useRef, type ReactNode } from 'react';

type HomeHeroQuoteSlotProps = {
  image: ReactNode;
  form: ReactNode;
};

export default function HomeHeroQuoteSlot({ image, form }: HomeHeroQuoteSlotProps) {
  const formRef = useRef<HTMLDivElement>(null);
  const imageFrameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const syncImageHeight = () => {
      const card = formRef.current?.querySelector('[data-hero-form-card]') as HTMLElement | null;
      const frame = imageFrameRef.current;
      if (!card || !frame) return;

      frame.style.height = `${card.getBoundingClientRect().height}px`;
    };

    syncImageHeight();

    const card = formRef.current?.querySelector('[data-hero-form-card]') as HTMLElement | null;
    const observer = new ResizeObserver(syncImageHeight);
    if (card) observer.observe(card);
    window.addEventListener('resize', syncImageHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', syncImageHeight);
    };
  }, []);

  return (
    <div className="home-hero-quote-slot relative z-30 mt-4 scroll-mt-20 sm:mt-6 md:-mt-8">
      <div className="home-hero-promo-image hidden lg:block">
        <div ref={imageFrameRef} className="home-hero-promo-image-frame overflow-hidden rounded-xl shadow-lg">
          {image}
        </div>
      </div>
      <div ref={formRef} className="home-hero-form-wrap">
        {form}
      </div>
    </div>
  );
}
