import Link from 'next/link';
import Image from 'next/image';
import Breadcrumb from '@/components/Breadcrumb';
import { getBlogs, getCategories } from '@/lib/api';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const categories = await getCategories();
  const category = categories?.find((c: any) => c.slug === params.slug);
  
  if (!category) return { title: 'Category Not Found' };

  return {
    title: `${category.name} Blogs | PestControl99`,
    description: category.meta_description || `Expert ${category.name} guides, tips and services from PestControl99.`,
    alternates: {
      canonical: `https://www.pestcontrol99.com/blog/category/${category.slug}/`,
    },
    openGraph: {
      type: 'website',
    }
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { page?: string };
}) {
  const page = parseInt(searchParams.page || '1');
  const categorySlug = params.slug;

  const [blogsData, categories] = await Promise.all([
    getBlogs({ page, page_size: 12, category: categorySlug }),
    getCategories()
  ]);

  const category = categories?.find((c: any) => c.slug === categorySlug);
  const posts = blogsData?.results || [];
  const totalPages = blogsData?.total_pages || 1;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Breadcrumb 
        items={[
          { label: 'Blog', href: '/blog' },
          { label: category ? category.name : 'Category' }
        ]} 
      />
      
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{category ? category.name : 'Category'}</h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {category?.description || `Explore our articles and guides about ${category?.name || 'this topic'}.`}
              </p>
            </div>

            {posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post: any) => (
                  <article key={post.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-150 border border-gray-200 hover:border-green-300">
                    <Link href={`/blog/${post.slug}`} className="block">
                      <div className="relative h-48 w-full overflow-hidden">
                        <Image
                          src={post.image_medium || post.featured_image || '/images/heroimage.png'}
                          alt={post.featured_image_alt || post.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                    </Link>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center bg-blue-50 text-blue-700 px-2.5 py-1 rounded-lg text-xs font-medium">
                            {formatDate(post.publish_date)}
                          </div>
                          <div className="flex items-center bg-green-50 text-green-700 px-2.5 py-1 rounded-lg text-xs font-medium">
                            {post.author_name || 'Expert'}
                          </div>
                        </div>
                      </div>
                      <Link href={`/blog/${post.slug}`}>
                        <h2 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors duration-150 line-clamp-2 leading-tight">
                          {post.title}
                        </h2>
                      </Link>
                      <p className="text-gray-600 mb-4 line-clamp-2 text-sm leading-relaxed">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="inline-flex items-center text-green-600 hover:text-green-700 font-semibold text-sm transition-colors duration-150"
                        >
                          Read Article
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
                 <h3 className="text-2xl font-bold text-gray-900 mb-3">No articles found</h3>
                 <p className="text-gray-600 mb-8">We couldn&apos;t find any articles in this category.</p>
                 <Link href="/blog" className="bg-green-500 text-white px-8 py-3 rounded-xl hover:bg-green-600">
                   Browse All Articles
                 </Link>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12 gap-2">
                {page > 1 && (
                  <Link href={`/blog/category/${categorySlug}?page=${page - 1}`} className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                    Previous
                  </Link>
                )}
                <span className="px-4 py-2 bg-green-50 text-green-700 font-medium rounded-lg">
                  Page {page} of {totalPages}
                </span>
                {page < totalPages && (
                  <Link href={`/blog/category/${categorySlug}?page=${page + 1}`} className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
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
