import Link from 'next/link';
import Image from 'next/image';
import Breadcrumb from '@/components/Breadcrumb';
import { getBlogs, getCategories } from '@/lib/api';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pest Control Blog | Tips, Guides & Expert Advice | PestControl99',
  description: 'Read expert pest control blogs, tips, and guides for Mumbai & India. Cockroach, termite, rodent, mosquito control advice.',
  alternates: {
    canonical: 'https://www.pestcontrol99.com/blog/',
  },
  openGraph: {
    title: 'Pest Control Blog | PestControl99',
    description: 'Expert pest control guides for homes and businesses.',
    type: 'website',
    url: 'https://www.pestcontrol99.com/blog/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pest Control Blog | PestControl99',
    description: 'Expert pest control tips and guides.',
  },
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { page?: string; q?: string; category?: string }
}) {
  const page = parseInt(searchParams.page || '1');
  const query = searchParams.q || '';
  const categoryParam = searchParams.category || '';

  // Fetch blogs from our new backend
  let data;
  let errorMsg = null;
  
  try {
    data = await getBlogs({ 
      page, 
      page_size: 12,
      q: query,
      category: categoryParam 
    });
  } catch (err) {
    console.error('Failed to fetch blogs:', err);
    errorMsg = 'Failed to load blogs. Please try again later.';
  }

  const posts = data?.results || [];
  const totalPages = data?.total_pages || 1;

  // Render Date nicely
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
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

            {/* Search Form (Client-Side navigation using a form) */}
            <div className="max-w-md mx-auto mb-8">
              <form action="/blog" method="GET" className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  name="q"
                  defaultValue={query}
                  placeholder="Search articles..."
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </form>
            </div>

            {errorMsg && (
              <div className="text-center py-12">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                  <p className="text-red-600 mb-4">{errorMsg}</p>
                </div>
              </div>
            )}

            {!errorMsg && posts.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post: any, index: number) => (
                  <article key={post.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-150 border border-gray-200 hover:border-green-300">
                    <Link href={`/blog/${post.slug}`} className="block">
                      <div className="relative h-48 w-full overflow-hidden">
                        {/* We use standard img to let srcset work via picture or Next/Image */}
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
                            <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {formatDate(post.publish_date)}
                          </div>
                          <div className="flex items-center bg-green-50 text-green-700 px-2.5 py-1 rounded-lg text-xs font-medium">
                            <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
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
                          <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </Link>
                        {post.reading_time && (
                          <div className="flex items-center text-gray-400 text-xs">
                            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {post.reading_time} min read
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {!errorMsg && posts.length === 0 && (
              <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
                 <h3 className="text-2xl font-bold text-gray-900 mb-3">No articles found</h3>
                 <p className="text-gray-600 mb-8">We couldn&apos;t find any articles matching your search.</p>
                 <Link href="/blog" className="bg-green-500 text-white px-8 py-3 rounded-xl hover:bg-green-600">
                   Clear Search & Browse All
                 </Link>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12 gap-2">
                {page > 1 && (
                  <Link href={`/blog?page=${page - 1}${query ? `&q=${query}` : ''}`} className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                    Previous
                  </Link>
                )}
                <span className="px-4 py-2 bg-green-50 text-green-700 font-medium rounded-lg">
                  Page {page} of {totalPages}
                </span>
                {page < totalPages && (
                  <Link href={`/blog?page=${page + 1}${query ? `&q=${query}` : ''}`} className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                    Next
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Breadcrumb Schema for Blog Listing */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.pestcontrol99.com/" },
              { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.pestcontrol99.com/blog/" }
            ]
          })
        }}
      />
    </div>
  );
}