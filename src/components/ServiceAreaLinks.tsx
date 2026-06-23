import { Link } from 'react-router-dom';
import { getAreaPath } from '@/config/areasWeServe';

const DEFAULT_AREAS = [
  { slug: 'andheri', label: 'Andheri' },
  { slug: 'thane', label: 'Thane' },
  { slug: 'borivali', label: 'Borivali' },
  { slug: 'bandra', label: 'Bandra' },
  { slug: 'powai', label: 'Powai' },
];

type ServiceAreaLinksProps = {
  areas?: { slug: string; label: string }[];
  heading?: string;
};

export default function ServiceAreaLinks({
  areas = DEFAULT_AREAS,
  heading = 'Pest control areas we serve',
}: ServiceAreaLinksProps) {
  return (
    <section className="py-10 bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">{heading}</h2>
        <ul className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
          {areas.map(({ slug, label }) => (
            <li key={slug}>
              <Link
                to={getAreaPath(slug)}
                className="inline-block px-4 py-2 text-sm font-medium text-navy-base bg-white border border-gray-200 rounded-full hover:border-green-base hover:text-green-base transition-colors"
              >
                Pest Control {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
