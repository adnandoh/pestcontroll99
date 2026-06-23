import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AppImage from '@/components/AppImage';
import { getBlog } from '@/lib/api';
import Breadcrumb from '@/components/Breadcrumb';
import ShareArticle from '@/components/ShareArticle';
import NewsletterSignup from '@/components/NewsletterSignup';
import TrackView from '@/components/blog/TrackView';
import PageMeta from '@/components/PageMeta';
import { extractToc } from '@/lib/toc';
import { getBlogPostingSchema } from '@/utils/blogSchema';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    setLoading(true);

    getBlog(slug)
      .then((data) => {
        if (cancelled) return;
        if (!data) {
          navigate('/404', { replace: true });
          return;
        }
        setBlog(data);
      })
      .catch(() => {
        if (!cancelled) navigate('/404', { replace: true });
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-green-600 border-t-transparent" />
      </div>
    );
  }

  if (!blog) return null;

  const toc = extractToc(blog.content || '');
  const blogPostingSchema = getBlogPostingSchema(blog);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <PageMeta
        title={blog.meta_title || `${blog.title} | Pest Control 99`}
        description={blog.meta_description || blog.excerpt}
        keywords={blog.target_keywords}
        canonical={blog.canonical_url || `https://www.pestcontrol99.com/blog/${blog.slug}/`}
        ogUrl={`https://www.pestcontrol99.com/blog/${blog.slug}/`}
        ogImage={blog.featured_image}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      <TrackView slug={slug!} />
      <Breadcrumb
        items={[
          { label: 'Blog', href: '/blog' },
          {
            label: blog.category?.name || 'Category',
            href: blog.category ? `/blog/category/${blog.category.slug}` : '#',
          },
          { label: blog.title },
        ]}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <article className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
                {blog.featured_image && (
                  <div className="relative h-64 md:h-96 w-full">
                    <AppImage
                      src={blog.featured_image}
                      alt={blog.featured_image_alt || blog.title}
                      fill
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}

                <div className="p-6 md:p-10">
                  <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
                    {blog.title}
                  </h1>

                  <div
                    className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-green-600"
                    dangerouslySetInnerHTML={{ __html: blog.content || '' }}
                  />

                  {blog.tags?.length > 0 && (
                    <div className="mt-8 pt-8 border-t border-gray-100">
                      <div className="flex flex-wrap gap-2">
                        {blog.tags.map((tag: { id: number; slug: string; name: string }) => (
                          <Link
                            key={tag.id}
                            to={`/blog/tag/${tag.slug}`}
                            className="bg-gray-100 hover:bg-green-50 text-gray-700 hover:text-green-700 px-3 py-1 rounded-full text-sm font-medium"
                          >
                            #{tag.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-16 pt-8 border-t border-gray-200">
                    <Link
                      to="/blog"
                      className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 font-semibold"
                    >
                      Back to All Articles
                    </Link>
                  </div>
                </div>
              </article>
            </div>

            <div className="lg:col-span-1 space-y-8">
              {toc.length > 0 && (
                <div className="sticky top-8 bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Table of Contents</h3>
                  <nav className="space-y-2">
                    {toc.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className="block text-sm text-gray-600 hover:text-green-600"
                        style={{ paddingLeft: `${(item.level - 2) * 12}px` }}
                      >
                        {item.text}
                      </a>
                    ))}
                  </nav>
                </div>
              )}
              <ShareArticle title={blog.title} url={`/blog/${blog.slug}`} />
              <NewsletterSignup />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
