import { useEffect, useState } from 'react';
import { whatsAppUrl } from '@/config/business';

const WHATSAPP_WIDGET_ICON =
  'https://s3.ap-south-1.amazonaws.com/cdn.limechat.ai/packs/js/whatsapp_widget/media/LC_WA.png';

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
