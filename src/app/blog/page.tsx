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

// Dashboard-style loading skeleton
const BlogPostSkeleton = () => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 animate-pulse">
    <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300"></div>
    <div className="p-6">
      <div className="flex gap-2 mb-4">
        <div className="h-6 bg-gray-200 rounded-lg w-20"></div>
        <div className="h-6 bg-gray-200 rounded-lg w-24"></div>
      </div>
      <div className="h-6 bg-gray-300 rounded-lg mb-3 w-full"></div>
      <div className="h-6 bg-gray-300 rounded-lg mb-4 w-3/4"></div>
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
      <div className="flex justify-between items-center">
        <div className="h-4 bg-gray-300 rounded w-24"></div>
        <div className="h-4 bg-gray-200 rounded w-16"></div>
      </div>
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
      
      {/* Simple Header */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Expert pest control tips, guides, and insights to help you maintain a pest-free environment.
              </p>
            </div>

            {/* Simple Search */}
            <div className="max-w-md mx-auto mb-8">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
            {/* Error State */}
            {error && <ErrorMessage message={error} onRetry={handleRetry} />}

            {/* Loading State */}
            {loading && !error && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                  <BlogPostSkeleton key={index} />
                ))}
              </div>
            )}

            {/* Search Results Info */}
            {!loading && !error && searchTerm && (
              <div className="mb-6 bg-white rounded-xl p-4 border border-gray-200">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-gray-700 font-medium">
                    {filteredPosts.length === 0
                      ? `No articles found for "${searchTerm}"`
                      : `Found ${filteredPosts.length} article${filteredPosts.length === 1 ? '' : 's'} for "${searchTerm}"`
                    }
                  </p>
                </div>
              </div>
            )}

            {/* Dashboard-style Posts Grid */}
            {!loading && !error && filteredPosts.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map((post, index) => (
                  <article key={post.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-150 border border-gray-200 hover:border-green-300">
                    <Link href={post.slug} className="block">
                      <div className="relative h-48 w-full overflow-hidden">
                        <Image
                          src={post.image}
                          alt={post.imageAlt}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          style={{ objectFit: 'cover' }}
                          className=""
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/images/heroimage.png';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100">
                          {index === 0 && (
                            <div className="absolute top-4 left-4">
                              <span className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
                                ✨ Latest
                              </span>
                            </div>
                          )}
                          <div className="absolute top-4 right-4">
                            <div className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100">
                              <svg className="w-4 h-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center bg-blue-50 text-blue-700 px-2.5 py-1 rounded-lg text-xs font-medium">
                            <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {post.date}
                          </div>
                          <div className="flex items-center bg-green-50 text-green-700 px-2.5 py-1 rounded-lg text-xs font-medium">
                            <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            {post.author}
                          </div>
                        </div>
                      </div>
                      <Link href={post.slug}>
                        <h2 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors duration-150 line-clamp-2 leading-tight">
                          {post.title}
                        </h2>
                      </Link>
                      <p className="text-gray-600 mb-4 line-clamp-2 text-sm leading-relaxed">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <Link
                          href={post.slug}
                          className="inline-flex items-center text-green-600 hover:text-green-700 font-semibold text-sm transition-colors duration-150"
                        >
                          Read Article
                          <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </Link>
                        <div className="flex items-center text-gray-400 text-xs">
                          <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          5 min read
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* Dashboard Empty State */}
            {!loading && !error && filteredPosts.length === 0 && posts.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">No articles found</h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  We couldn&apos;t find any articles matching your search. Try different keywords or browse all articles.
                </p>
                <button
                  onClick={() => setSearchTerm('')}
                  className="bg-green-500 text-white px-8 py-3 rounded-xl hover:bg-green-600 transition-colors duration-150 font-semibold"
                >
                  Clear Search & Browse All
                </button>
              </div>
            )}

            {!loading && !error && posts.length === 0 && (
              <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Content Coming Soon</h3>
                <p className="text-gray-600 max-w-md mx-auto mb-8">
                  Our pest control experts are preparing valuable content for you. Check back soon for helpful tips and guides.
                </p>
                <Link
                  href="/contact"
                  className="bg-green-500 text-white px-8 py-3 rounded-xl hover:bg-green-600 transition-colors duration-150 font-semibold inline-flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Contact Our Experts
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}