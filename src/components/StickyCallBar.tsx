import { BUSINESS } from '@/config/business';

const PHONE_CALL_ICON = '/icons/phone-call.png';

export default function StickyCallBar() {
  return (
    <div className="sticky-cta-bar">
      <a
        href={`tel:${BUSINESS.phoneTel}`}
        aria-label={`Call ${BUSINESS.phoneDisplay} for a free inspection`}
      >
        <span className="cta-icon" aria-hidden="true">
          <img
            src={PHONE_CALL_ICON}
            alt=""
            width={44}
            height={44}
            className="cta-icon-img"
            loading="eager"
            decoding="async"
          />
        </span>
        <span className="cta-text">
          Call Us For A <span className="cta-free">FREE</span> Inspection
        </span>
      </a>
    </div>
  );
}
