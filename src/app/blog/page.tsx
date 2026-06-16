import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import AppImage from '@/components/AppImage';
import Breadcrumb from '@/components/Breadcrumb';
import PageMeta from '@/components/PageMeta';
import { getBlogs } from '@/lib/api';

export default function BlogPage() {
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);
  const query = searchParams.get('q') || '';
  const categoryParam = searchParams.get('category') || '';

  const [posts, setPosts] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setErrorMsg(null);

    getBlogs({
      page,
      page_size: 12,
      q: query || undefined,
      category: categoryParam || undefined,
    })
      .then((data) => {
        if (cancelled) return;
        setPosts(data?.results || []);
        setTotalPages(data?.total_pages || 1);
      })
      .catch((err) => {
        console.error('Failed to fetch blogs:', err);
        if (!cancelled) {
          setErrorMsg('Failed to load blogs. Please try again later.');
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [page, query, categoryParam]);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  return (
    <div className="min-h-screen bg-gray-50">
      <PageMeta
        title="Pest Control Blog | Tips, Guides & Expert Advice | PestControl99"
        description="Read expert pest control blogs, tips, and guides for Mumbai & India."
        canonical="https://www.pestcontrol99.com/blog/"
        ogUrl="https://www.pestcontrol99.com/blog/"
      />
      <Breadcrumb items={[{ label: 'Blog' }]} />

      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Expert pest control tips, guides, and insights to help you maintain a pest-free environment.
              </p>
            </div>

            <div className="max-w-md mx-auto mb-8">
              <form action="/blog" method="GET" className="relative">
                <input
                  type="text"
                  name="q"
                  defaultValue={query}
                  placeholder="Search articles..."
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </form>
            </div>

            {loading && (
              <div className="flex justify-center py-16">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-green-600 border-t-transparent" />
              </div>
            )}

            {errorMsg && (
              <div className="text-center py-12">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                  <p className="text-red-600 mb-4">{errorMsg}</p>
                </div>
              </div>
            )}

            {!loading && !errorMsg && posts.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post: any) => (
                  <article
                    key={post.id}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-150 border border-gray-200 hover:border-green-300"
                  >
                    <Link to={`/blog/${post.slug}`} className="block">
                      <div className="relative h-48 w-full overflow-hidden">
                        <AppImage
                          src={post.image_medium || post.featured_image || '/images/heroimage.webp'}
                          alt={post.featured_image_alt || post.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </Link>
                    <div className="p-6">
                      <Link to={`/blog/${post.slug}`}>
                        <h2 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors duration-150 line-clamp-2 leading-tight">
                          {post.title}
                        </h2>
                      </Link>
                      <p className="text-gray-600 mb-4 line-clamp-2 text-sm leading-relaxed">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <Link
                          to={`/blog/${post.slug}`}
                          className="inline-flex items-center text-green-600 hover:text-green-700 font-semibold text-sm"
                        >
                          Read Article
                        </Link>
                        <span className="text-gray-400 text-xs">{formatDate(post.publish_date)}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {!loading && !errorMsg && posts.length === 0 && (
              <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">No articles found</h3>
                <Link to="/blog" className="bg-green-500 text-white px-8 py-3 rounded-xl hover:bg-green-600 inline-block mt-4">
                  Clear Search & Browse All
                </Link>
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex justify-center mt-12 gap-2">
                {page > 1 && (
                  <Link
                    to={`/blog?page=${page - 1}${query ? `&q=${encodeURIComponent(query)}` : ''}`}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Previous
                  </Link>
                )}
                <span className="px-4 py-2 bg-green-50 text-green-700 font-medium rounded-lg">
                  Page {page} of {totalPages}
                </span>
                {page < totalPages && (
                  <Link
                    to={`/blog?page=${page + 1}${query ? `&q=${encodeURIComponent(query)}` : ''}`}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Next
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
