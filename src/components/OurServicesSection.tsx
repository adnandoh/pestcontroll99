import { Link, useNavigate } from 'react-router-dom';
import { FEATURED_PEST_SERVICES, HOME_PEST_SERVICES } from '@/config/homeServices';

const SECTION_TITLE = "We've Seen Every Pest. We've Fixed Every Problem.";
const SECTION_SUBTITLE =
  'Select your pest and get the right treatment today.';

function PestCard({ service }: { service: (typeof HOME_PEST_SERVICES)[number] }) {
  return (
    <Link to={service.href} className="pest-card-link">
      <div className="pest-card">
        <img src={service.image} alt={service.alt} loading="lazy" decoding="async" />
      </div>
      <span className="pest-card-label">{service.cardLabel}</span>
    </Link>
  );
}

export default function OurServicesSection() {
  const navigate = useNavigate();

  return (
    <section
      className="w-full border-y border-[#d8e2f0] bg-[#e8eef7]"
      aria-labelledby="our-services-heading"
    >
      <div className="mx-auto w-full max-w-[1480px] px-3 sm:px-5 lg:px-8 xl:px-10">
        <div className="pest-section-wrapper">
          <div className="pest-section-copy">
            <h2
              id="our-services-heading"
              className="text-[1.65rem] font-bold leading-snug sm:text-3xl lg:text-[2rem]"
            >
              {SECTION_TITLE}
            </h2>
            <p className="mt-3 text-sm leading-relaxed sm:mt-4 sm:text-base lg:text-lg">
              {SECTION_SUBTITLE}
            </p>

            <div className="pest-dropdown-wrap">
              <label htmlFor="pest-select" className="sr-only">
                Select a pest
              </label>
              <select
                id="pest-select"
                className="pest-dropdown"
                defaultValue=""
                onChange={(e) => {
                  const href = e.target.value;
                  if (href) navigate(href);
                }}
              >
                <option value="" disabled>
                  Click here to select a pest
                </option>
                {HOME_PEST_SERVICES.map((service) => (
                  <option key={service.id} value={service.href}>
                    {service.name}
                  </option>
                ))}
              </select>
              <svg
                className="pest-dropdown-chevron"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          <div className="pest-section-grid-wrap">
            <div className="pest-grid">
              {FEATURED_PEST_SERVICES.map((service) => (
                <PestCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
