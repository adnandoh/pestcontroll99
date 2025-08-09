'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { stripHtmlAndDecode, decodeHtmlEntities } from '@/utils/htmlUtils';
import Breadcrumb from '@/components/Breadcrumb';

// WordPress API Response Types
interface WordPressPost {
  id: number;
  date: string;
  slug: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  author: number;
  featured_media: number;
  _embedded?: {
    author?: Array<{
      name: string;
    }>;
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
  };
}

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  image: string;
  imageAlt: string;
  slug: string;
}

// Loading skeleton component
const BlogPostSkeleton = () => (
  <div className="bg-white rounded-lg overflow-hidden shadow-md animate-pulse">
    <div className="h-48 bg-gray-300"></div>
    <div className="p-6">
      <div className="h-4 bg-gray-300 rounded mb-2 w-1/2"></div>
      <div className="h-6 bg-gray-300 rounded mb-3"></div>
      <div className="h-4 bg-gray-300 rounded mb-2"></div>
      <div className="h-4 bg-gray-300 rounded mb-4 w-3/4"></div>
      <div className="h-4 bg-gray-300 rounded w-1/4"></div>
    </div>
  </div>
);

// Error component
const ErrorMessage = ({ message, onRetry }: { message: string; onRetry: () => void }) => (
  <div className="text-center py-12">
    <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
      <svg className="h-12 w-12 text-red-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
      <h3 className="text-lg font-medium text-red-800 mb-2">Unable to load blog posts</h3>
      <p className="text-red-600 mb-4">{message}</p>
      <button
        onClick={onRetry}
        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
      >
        Try Again
      </button>
    </div>
  </div>
);

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);

  const fetchBlogPosts = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        'https://pestcontrol99.in/wp-json/wp/v2/posts?_embed&per_page=12&orderby=date&order=desc',
        {
          headers: {
            'Accept': 'application/json',
          },
          // Add cache control for better performance
          next: { revalidate: 300 } // Revalidate every 5 minutes
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch posts: ${response.status} ${response.statusText}`);
      }

      const data: WordPressPost[] = await response.json();

      // Transform WordPress data to our format
      const transformedPosts: BlogPost[] = data.map((post) => ({
        id: post.id,
        title: decodeHtmlEntities(post.title.rendered),
        excerpt: stripHtmlAndDecode(post.excerpt.rendered).substring(0, 150) + '...',
        date: new Date(post.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        author: decodeHtmlEntities(post._embedded?.author?.[0]?.name || 'PestControl99 Team'),
        image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/images/heroimage.png',
        imageAlt: decodeHtmlEntities(post._embedded?.['wp:featuredmedia']?.[0]?.alt_text || post.title.rendered),
        slug: `/blog/${post.slug}`
      }));

      setPosts(transformedPosts);
      setFilteredPosts(transformedPosts);
    } catch (err) {
      console.error('Error fetching blog posts:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPosts(filtered);
    }
  }, [searchTerm, posts]);

  const handleRetry = () => {
    fetchBlogPosts();
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: 'Blog' }]} />
      
      {/* Header Section */}
      <section className="py-6 bg-gradient-to-br from-green-50 via-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              <span className="text-green-600">Pest Control</span> Blog
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Expert tips, insights, and solutions from certified pest control professionals to keep your home and business pest-free.
            </p>

            <div className="max-w-md mx-auto relative">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-12 pr-4 text-gray-700 bg-white border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content Section */}
      <section className="py-4 sm:py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Error State */}
            {error && <ErrorMessage message={error} onRetry={handleRetry} />}

            {/* Loading State */}
            {loading && !error && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, index) => (
                  <BlogPostSkeleton key={index} />
                ))}
              </div>
            )}

            {/* Search Results Info */}
            {!loading && !error && searchTerm && (
              <div className="mb-8">
                <p className="text-gray-600">
                  {filteredPosts.length === 0
                    ? `No articles found for "${searchTerm}"`
                    : `Found ${filteredPosts.length} article${filteredPosts.length === 1 ? '' : 's'} for "${searchTerm}"`
                  }
                </p>
              </div>
            )}

            {/* Posts Grid */}
            {!loading && !error && filteredPosts.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post, index) => (
                  <article key={post.id} className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                    <Link href={post.slug} className="block">
                      <div className="relative h-48 w-full overflow-hidden">
                        <Image
                          src={post.image}
                          alt={post.imageAlt}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          style={{ objectFit: 'cover' }}
                          className="transition-transform duration-500 group-hover:scale-110"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/images/heroimage.png';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        {index === 0 && (
                          <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                            Latest
                          </div>
                        )}
                      </div>
                    </Link>
                    <div className="p-6">
                      <div className="text-sm text-gray-500 mb-3 flex items-center flex-wrap gap-2">
                        <div className="flex items-center bg-gray-50 px-2 py-1 rounded-full">
                          <svg className="h-3 w-3 mr-1 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {post.date}
                        </div>
                        <div className="flex items-center bg-gray-50 px-2 py-1 rounded-full">
                          <svg className="h-3 w-3 mr-1 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          {post.author}
                        </div>
                      </div>
                      <Link href={post.slug}>
                        <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors duration-300 line-clamp-2 leading-tight">
                          {post.title}
                        </h2>
                      </Link>
                      <p className="text-gray-600 mb-5 line-clamp-3 leading-relaxed">{post.excerpt}</p>
                      <Link
                        href={post.slug}
                        className="inline-flex items-center text-green-600 hover:text-green-700 font-semibold transition-all duration-300 group-hover:gap-2 gap-1"
                      >
                        Read Full Article
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && filteredPosts.length === 0 && posts.length > 0 && (
              <div className="text-center py-16">
                <svg className="h-20 w-20 text-gray-300 mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">No articles found</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  We couldn&apos;t find any articles matching your search. Try different keywords or browse all articles.
                </p>
                <button
                  onClick={() => setSearchTerm('')}
                  className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition-colors font-medium"
                >
                  Clear Search
                </button>
              </div>
            )}

            {!loading && !error && posts.length === 0 && (
              <div className="text-center py-16">
                <svg className="h-20 w-20 text-gray-300 mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">No articles available</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  Check back later for new content from our pest control experts.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}