import NotFoundPage from '@/app/not-found';
import AreaPageTemplate from '@/components/AreaPageTemplate';
import { getAreaBySlug } from '@/config/areasWeServe';

type AreaPageProps = {
  slug: string;
};

export default function AreaPage({ slug }: AreaPageProps) {
  const area = getAreaBySlug(slug);

  if (!area) {
    return <NotFoundPage />;
  }

  return <AreaPageTemplate area={area} />;
}
