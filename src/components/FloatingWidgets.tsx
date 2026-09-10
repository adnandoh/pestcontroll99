import { useEffect, useState } from 'react';
import { BUSINESS, whatsAppUrl } from '@/config/business';

const WHATSAPP_WIDGET_ICON =
  'https://s3.ap-south-1.amazonaws.com/cdn.limechat.ai/packs/js/whatsapp_widget/media/LC_WA.png';

function PhoneIcon({ className = 'h-7 w-7' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.4 21 3 13.6 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.01l-2.21 2.2z" />
    </svg>
  );
}

export default function FloatingWidgets() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="floating-widgets-wrap">
      <a
        href={`tel:${BUSINESS.phoneTel}`}
        className="floating-fab floating-fab-call group relative"
        aria-label={`Call ${BUSINESS.phoneDisplay}`}
        title={`Call ${BUSINESS.phoneDisplay}`}
      >
        <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-lg bg-gray-900 px-3 py-1.5 text-sm text-white opacity-0 shadow-md transition-opacity group-hover:opacity-100">
          Call Us
        </span>
        <PhoneIcon />
      </a>
      <a
        href={whatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-fab floating-fab-whatsapp group relative overflow-hidden"
        aria-label="Chat on WhatsApp"
        title="WhatsApp Us"
      >
        <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-lg bg-gray-900 px-3 py-1.5 text-sm text-white opacity-0 shadow-md transition-opacity group-hover:opacity-100">
          WhatsApp Us
        </span>
        <img
          src={WHATSAPP_WIDGET_ICON}
          alt=""
          width={56}
          height={56}
          className="h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </a>
    </div>
  );
}
