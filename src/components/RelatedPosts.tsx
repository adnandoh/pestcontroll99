'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { decodeHtmlEntities, stripHtmlAndDecode } from '@/utils/htmlUtils';

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
            title: decodeHtmlEntities(post.title.rendered),
            excerpt: stripHtmlAndDecode(post.excerpt.rendered).substring(0, 100) + '...',
            date: new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            }),
            image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/images/heroimage.png',
            imageAlt: decodeHtmlEntities(post._embedded?.['wp:featuredmedia']?.[0]?.alt_text || post.title.rendered),
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
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex items-center mb-6">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-3">
            <div className="w-4 h-4 bg-white/30 rounded animate-pulse"></div>
          </div>
          <h3 className="text-lg font-bold text-gray-900">Related Articles</h3>
        </div>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex space-x-4 animate-pulse">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl flex-shrink-0"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-300 rounded-lg mb-2"></div>
                <div className="h-3 bg-gray-200 rounded-lg w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded-lg w-1/2"></div>
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
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <div className="flex items-center mb-6">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-3">
          <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-gray-900">Related Articles</h3>
      </div>
      
      <div className="space-y-4">
        {posts.map((post, index) => (
          <article key={post.id} className="group">
            <Link href={post.slug} className="flex space-x-4 hover:bg-blue-50 p-3 rounded-xl transition-colors duration-150 border border-transparent hover:border-blue-200">
              <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden rounded-xl">
                <Image
                  src={post.image}
                  alt={post.imageAlt}
                  fill
                  sizes="64px"
                  style={{ objectFit: 'cover' }}
                  className=""
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/images/heroimage.png';
                  }}
                />

                {index === 0 && (
                  <div className="absolute -top-1 -right-1">
                    <div className="w-5 h-5 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-150 line-clamp-2 mb-1 leading-tight">
                  {post.title}
                </h4>
                <p className="text-xs text-gray-600 line-clamp-2 mb-2 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-lg">
                    <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {post.date}
                  </div>
                  <div className="opacity-0 group-hover:opacity-100">
                    <svg className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-100">
        <Link
          href="/blog"
          className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold py-3 px-4 rounded-xl transition-colors duration-150 inline-flex items-center justify-center group border border-blue-200 hover:border-blue-300"
        >
          <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          Explore All Articles
          <svg className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}