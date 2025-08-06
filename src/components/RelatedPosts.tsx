'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
  };
}

interface RelatedPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  imageAlt: string;
  slug: string;
}

interface RelatedPostsProps {
  currentPostId: number;
  limit?: number;
}

export default function RelatedPosts({ currentPostId, limit = 3 }: RelatedPostsProps) {
  const [posts, setPosts] = useState<RelatedPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedPosts = async () => {
      try {
        setLoading(true);
        
        const response = await fetch(
          `https://pestcontrol99.in/wp-json/wp/v2/posts?_embed&per_page=${limit + 1}&orderby=date&order=desc&exclude=${currentPostId}`,
          {
            headers: {
              'Accept': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch related posts');
        }

        const data: WordPressPost[] = await response.json();
        
        const transformedPosts: RelatedPost[] = data
          .filter(post => post.id !== currentPostId)
          .slice(0, limit)
          .map((post) => ({
            id: post.id,
            title: post.title.rendered,
            excerpt: post.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 100) + '...',
            date: new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            }),
            image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/images/heroimage.png',
            imageAlt: post._embedded?.['wp:featuredmedia']?.[0]?.alt_text || post.title.rendered,
            slug: `/blog/${post.slug}`
          }));

        setPosts(transformedPosts);
      } catch (error) {
        console.error('Error fetching related posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedPosts();
  }, [currentPostId, limit]);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h3>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex space-x-4 animate-pulse">
              <div className="w-20 h-20 bg-gray-300 rounded-lg flex-shrink-0"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        <svg className="h-6 w-6 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
        Related Articles
      </h3>
      <div className="space-y-6">
        {posts.map((post) => (
          <article key={post.id} className="group">
            <Link href={post.slug} className="flex space-x-4 hover:bg-gray-50 p-3 rounded-lg transition-colors duration-200">
              <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={post.image}
                  alt={post.imageAlt}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="transition-transform duration-300 group-hover:scale-110"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/images/heroimage.png';
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-gray-900 group-hover:text-green-600 transition-colors duration-200 line-clamp-2 mb-1">
                  {post.title}
                </h4>
                <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center text-xs text-gray-500">
                  <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {post.date}
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
      <div className="mt-6 pt-6 border-t border-gray-200">
        <Link
          href="/blog"
          className="text-green-600 hover:text-green-700 font-medium text-sm inline-flex items-center transition-colors duration-200 group"
        >
          View All Articles
          <svg className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}