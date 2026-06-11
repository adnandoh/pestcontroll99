import { Link } from 'react-router-dom';
import { AREAS_WE_SERVE_ZONES, getAreaPath } from '@/config/areasWeServe';

function LocationPinIcon() {
  return (
    <svg
      className="w-5 h-5 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
        fill="#00C950"
      />
      <circle cx="12" cy="9" r="2.5" fill="#FEF08A" stroke="#166534" strokeWidth="0.5" />
    </svg>
  );
}

const ALL_AREAS = AREAS_WE_SERVE_ZONES.flatMap(({ areas }) =>
  areas.map(({ slug, label }) => ({
    slug,
    name: label,
  })),
);

export default function AreasWeServe() {
  return (
    <section
      id="areas-we-serve"
      className="py-12 sm:py-16 md:py-20 bg-white border-t border-gray-100"
      aria-labelledby="areas-we-serve-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="text-center mb-10 sm:mb-12">
          <h2
            id="areas-we-serve-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3"
          >
            Areas We Serve
          </h2>
          <p className="text-base sm:text-lg text-gray-500 max-w-3xl mx-auto">
            Pest Control Services Across Mumbai, Navi Mumbai, Thane &amp; Lonavala
          </p>
        </div>

        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-5 sm:gap-x-6 sm:gap-y-6">
          {ALL_AREAS.map(({ slug, name }) => (
            <li key={slug}>
              <Link
                to={getAreaPath(slug)}
                className="group flex items-center gap-2.5 text-gray-800 hover:text-gray-900 transition-colors"
              >
                <LocationPinIcon />
                <span className="text-sm sm:text-[15px] font-normal group-hover:font-bold transition-all truncate">
                  {name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
