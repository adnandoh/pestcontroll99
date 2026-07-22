import NotFoundPage from '@/app/not-found';
import AreaPageTemplate from '@/components/AreaPageTemplate';
import { getAreaBySlug } from '@/config/areasWeServe';

export default function MonsoonPestControlPunePage() {
  const area = getAreaBySlug('pune');

  if (!area) {
    return <NotFoundPage />;
  }

  return <AreaPageTemplate area={area} contentSlug="monsoon-pest-control-pune" canonicalPath="/monsoon-pest-control-pune/" />;
}
