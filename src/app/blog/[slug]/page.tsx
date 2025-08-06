'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import RelatedPosts from '@/components/RelatedPosts';
import ShareArticle from '@/components/ShareArticle';
import NewsletterSignup from '@/components/NewsletterSignup';

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

interface TocItem {
  id: string;
  text: string;
  level: number;
}

// Loading skeleton for blog post
const BlogPostSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-8 bg-gray-300 rounded mb-4 w-3/4"></div>
    <div className="h-4 bg-gray-300 rounded mb-6 w-1/2"></div>
    <div className="h-64 bg-gray-300 rounded mb-8"></div>
    <div className="space-y-4">
      <div className="h-4 bg-gray-300 rounded"></div>
      <div className="h-4 bg-gray-300 rounded"></div>
      <div className="h-4 bg-gray-300 rounded w-5/6"></div>
      <div className="h-4 bg-gray-300 rounded"></div>
      <div className="h-4 bg-gray-300 rounded w-4/5"></div>
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
      <h3 className="text-lg font-medium text-red-800 mb-2">Unable to load blog post</h3>
      <p className="text-red-600 mb-4">{message}</p>
      <button
        onClick={onRetry}
        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors mr-2"
      >
        Try Again
      </button>
      <Link
        href="/blog"
        className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
      >
        Back to Blog
      </Link>
    </div>
  </div>
);

// Reading Progress Component
const ReadingProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
      <div 
        className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

// Table of Contents Component
const TableOfContents = ({ toc, activeId }: { toc: TocItem[]; activeId: string }) => {
  if (toc.length === 0) return null;

  return (
    <div className="sticky top-8">
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
          <svg className="h-5 w-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
          Table of Contents
        </h3>
        <nav className="space-y-2">
          {toc.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`block text-sm transition-colors duration-200 hover:text-green-600 ${
                activeId === item.id ? 'text-green-600 font-medium' : 'text-gray-600'
              }`}
              style={{ paddingLeft: `${(item.level - 1) * 12}px` }}
            >
              {item.text}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [post, setPost] = useState<WordPressPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const contentRef = useRef<HTMLDivElement>(null);

  const fetchBlogPost = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(
        `https://pestcontrol99.in/wp-json/wp/v2/posts?slug=${slug}&_embed`,
        {
          headers: {
            'Accept': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch post: ${response.status} ${response.statusText}`);
      }

      const data: WordPressPost[] = await response.json();
      
      if (data.length === 0) {
        throw new Error('Post not found');
      }

      setPost(data[0]);
    } catch (err) {
      console.error('Error fetching blog post:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  }, [slug]);

  // Generate table of contents from post content
  const generateToc = useCallback((content: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');
    
    const tocItems: TocItem[] = [];
    headings.forEach((heading, index) => {
      const level = parseInt(heading.tagName.charAt(1));
      const text = heading.textContent || '';
      const id = `heading-${index}`;
      
      // Add ID to heading for linking
      heading.id = id;
      
      tocItems.push({ id, text, level });
    });
    
    return { tocItems, modifiedContent: doc.body.innerHTML };
  }, []);

  // Update TOC when post content changes
  useEffect(() => {
    if (post?.content.rendered) {
      const { tocItems, modifiedContent } = generateToc(post.content.rendered);
      setToc(tocItems);
      
      // Update post content with IDs
      setPost(prev => prev ? {
        ...prev,
        content: { ...prev.content, rendered: modifiedContent }
      } : null);
    }
  }, [post?.content.rendered, generateToc]);

  // Handle scroll to update active TOC item
  useEffect(() => {
    const handleScroll = () => {
      const headings = document.querySelectorAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]');
      let currentActiveId = '';
      
      headings.forEach((heading) => {
        const rect = heading.getBoundingClientRect();
        if (rect.top <= 100) {
          currentActiveId = heading.id;
        }
      });
      
      setActiveId(currentActiveId);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [post]);

  useEffect(() => {
    if (slug) {
      fetchBlogPost();
    }
  }, [slug, fetchBlogPost]);

  const handleRetry = () => {
    fetchBlogPost();
  };

  // Show 404 if post not found
  if (error === 'Post not found') {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <ReadingProgress />
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-green-600 transition-colors font-medium">
              Home
            </Link>
            <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/blog" className="hover:text-green-600 transition-colors font-medium">
              Blog
            </Link>
            <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-900 font-semibold truncate">
              {loading ? 'Loading...' : post?.title.rendered || 'Post'}
            </span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Error State */}
        {error && error !== 'Post not found' && (
          <div className="max-w-4xl mx-auto">
            <ErrorMessage message={error} onRetry={handleRetry} />
          </div>
        )}
        
        {/* Loading State */}
        {loading && !error && (
          <div className="max-w-4xl mx-auto">
            <BlogPostSkeleton />
          </div>
        )}

        {/* Blog Post Content */}
        {!loading && !error && post && (
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-3">
                <article className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
                  {/* Featured Image */}
                  {post._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
                    <div className="relative h-64 md:h-96 w-full">
                      <Image
                        src={post._embedded['wp:featuredmedia'][0].source_url}
                        alt={post._embedded['wp:featuredmedia'][0].alt_text || post.title.rendered}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="w-full h-full"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/images/heroimage.png';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    </div>
                  )}

                  <div className="p-6 md:p-10">
                    {/* Post Meta */}
                    <div className="flex flex-wrap items-center text-sm text-gray-600 mb-8 gap-4">
                      <div className="flex items-center bg-gray-50 px-3 py-1.5 rounded-full">
                        <svg className="h-4 w-4 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                      <div className="flex items-center bg-gray-50 px-3 py-1.5 rounded-full">
                        <svg className="h-4 w-4 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        {post._embedded?.author?.[0]?.name || 'PestControl99 Team'}
                      </div>
                    </div>

                    {/* Post Title */}
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
                      {post.title.rendered}
                    </h1>

                    {/* Post Content */}
                    <div 
                      ref={contentRef}
                      className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-green-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700 prose-li:mb-2 prose-img:rounded-lg prose-img:shadow-md"
                      dangerouslySetInnerHTML={{ __html: post.content.rendered }}
                    />

                    {/* Back to Blog Button */}
                    <div className="mt-16 pt-8 border-t border-gray-200">
                      <Link
                        href="/blog"
                        className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 font-semibold transition-all duration-300 group shadow-lg hover:shadow-xl"
                      >
                        <svg className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to All Articles
                      </Link>
                    </div>
                  </div>
                </article>
              </div>

              {/* Table of Contents Sidebar */}
              <div className="lg:col-span-1 space-y-8">
                <TableOfContents toc={toc} activeId={activeId} />
                <ShareArticle title={post.title.rendered} url={`/blog/${slug}`} />
                <NewsletterSignup />
                <RelatedPosts currentPostId={post.id} limit={3} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}