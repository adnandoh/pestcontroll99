import { Link } from 'react-router-dom';
import { AREAS_WE_SERVE_ZONES, getAreaPath } from '@/config/areasWeServe';

function LocationPinIcon() {
  return (
    <svg
      className="h-4 w-4 shrink-0 sm:h-[18px] sm:w-[18px]"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
        fill="var(--green-bright)"
      />
      <circle cx="12" cy="9" r="2.5" fill="#FFFFFF" />
    </svg>
  );
}

const ALL_AREAS = AREAS_WE_SERVE_ZONES.flatMap(({ areas }) =>
  areas.map(({ slug, label }) => ({
    slug,
    label: label.replace(/^Pest Control /, 'Pest Control Services in '),
  })),
);

function splitIntoColumns<T>(items: T[], columnCount: number): T[][] {
  const columns: T[][] = Array.from({ length: columnCount }, () => []);
  const itemsPerColumn = Math.ceil(items.length / columnCount);

  for (let i = 0; i < columnCount; i++) {
    columns[i] = items.slice(i * itemsPerColumn, (i + 1) * itemsPerColumn);
  }

  return columns;
}

const AREA_COLUMNS = splitIntoColumns(ALL_AREAS, 3);

export default function AreasWeServe() {
  return (
    <section
      id="areas-we-serve"
      className="section-dark border-t border-white/10 py-12 sm:py-14 md:py-16"
      aria-labelledby="areas-we-serve-heading"
    >
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <h2
          id="areas-we-serve-heading"
          className="areas-serve-heading mx-auto mb-10 max-w-5xl text-center text-xl font-bold leading-snug text-white sm:mb-12 sm:text-2xl md:text-3xl"
        >
          Top Localities for Pest Control Services in Mumbai, Navi Mumbai, Thane, Lonavala &amp; Pune
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-0">
          {AREA_COLUMNS.map((column, columnIndex) => (
            <ul key={columnIndex} className="space-y-2.5 sm:space-y-3">
              {column.map(({ slug, label }) => (
                <li key={slug}>
                  <Link
                    to={getAreaPath(slug)}
                    className="area-serve-link group flex items-start gap-2.5 text-sm leading-snug sm:text-[15px]"
                  >
                    <span className="mt-0.5">
                      <LocationPinIcon />
                    </span>
                    <span className="group-hover:underline">{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
