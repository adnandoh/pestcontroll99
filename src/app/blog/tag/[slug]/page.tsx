import { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import AppImage from '@/components/AppImage';
import Breadcrumb from '@/components/Breadcrumb';
import PageMeta from '@/components/PageMeta';
import { getBlogs, getTags } from '@/lib/api';

export default function TagPage() {
  const { slug: tagSlug = '' } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);

  const [tag, setTag] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    Promise.all([getBlogs({ page, page_size: 12, tag: tagSlug }), getTags()])
      .then(([blogsData, tags]) => {
        if (cancelled) return;
        setTag(tags?.find((t: { slug: string }) => t.slug === tagSlug));
        setPosts(blogsData?.results || []);
        setTotalPages(blogsData?.total_pages || 1);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [tagSlug, page]);

  return (
    <div className="min-h-screen bg-gray-50">
      <PageMeta
        title={`Blogs tagged "${tag?.name || tagSlug}" | PestControl99`}
        description={`All pest control blogs tagged ${tag?.name || tagSlug}.`}
        canonical={`https://www.pestcontrol99.com/blog/tag/${tagSlug}/`}
        noindex
      />
      <Breadcrumb
        items={[
          { label: 'Blog', href: '/blog' },
          { label: tag?.name ? `#${tag.name}` : 'Tag' },
        ]}
      />

      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {tag?.name ? `#${tag.name}` : 'Tag'}
            </h1>
          </div>

          {loading ? (
            <div className="flex justify-center py-16">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-green-600 border-t-transparent" />
            </div>
          ) : posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post: any) => (
                <article key={post.id} className="bg-white rounded-2xl overflow-hidden border border-gray-200">
                  <Link to={`/blog/${post.slug}`}>
                    <div className="relative h-48 w-full">
                      <AppImage
                        src={post.image_medium || post.featured_image || '/images/heroimage.png'}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h2 className="text-lg font-bold text-gray-900">{post.title}</h2>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Link to="/blog" className="bg-green-500 text-white px-8 py-3 rounded-xl">
                Browse All Articles
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
