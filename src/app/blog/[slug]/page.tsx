import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBlog } from '@/lib/api';
import Breadcrumb from '@/components/Breadcrumb';
import ShareArticle from '@/components/ShareArticle';
import NewsletterSignup from '@/components/NewsletterSignup';
import RelatedPosts from '@/components/RelatedPosts';
import TrackView from '@/components/blog/TrackView';
import { extractToc } from '@/lib/toc';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const blog = await getBlog(resolvedParams.slug);
  if (!blog) {
    return { title: 'Not Found' };
  }

  return {
    title: blog.meta_title || `${blog.title} | PestControl99`,
    description: blog.meta_description || blog.excerpt,
    keywords: blog.target_keywords,
    alternates: {
      canonical: blog.canonical_url || `https://www.pestcontrol99.com/blog/${blog.slug}/`,
    },
    openGraph: {
      title: blog.og_title || blog.meta_title,
      description: blog.og_description || blog.meta_description,
      type: "article",
      url: `https://www.pestcontrol99.com/blog/${blog.slug}/`,
      images: blog.featured_image ? [{ url: blog.featured_image, alt: blog.featured_image_alt }] : [],
      publishedTime: blog.publish_date,
      modifiedTime: blog.updated_at,
      authors: [blog.author_name],
      section: blog.category?.name,
      tags: blog.tags?.map((t: any) => t.name),
    },
    twitter: {
      card: "summary_large_image",
      title: blog.og_title,
      description: blog.og_description,
      images: blog.featured_image ? [blog.featured_image] : [],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const blog = await getBlog(resolvedParams.slug);

  if (!blog) {
    notFound();
  }

  const toc = extractToc(blog.content || '');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <TrackView slug={params.slug} />
      <Breadcrumb 
        items={[
          { label: 'Blog', href: '/blog' },
          { label: blog.category?.name || 'Category', href: blog.category ? `/blog/category/${blog.category.slug}` : '#' },
          { label: blog.title }
        ]} 
      />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <article className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
                {blog.featured_image && (
                  <div className="relative h-64 md:h-96 w-full">
                    <Image
                      src={blog.featured_image}
                      alt={blog.featured_image_alt || blog.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      className="w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  </div>
                )}

                <div className="p-6 md:p-10">
                  <div className="flex flex-wrap items-center text-sm text-gray-600 mb-8 gap-4">
                    <div className="flex items-center bg-gray-50 px-3 py-1.5 rounded-full">
                      {new Date(blog.publish_date || blog.created_at).toLocaleDateString('en-US', {
                        year: 'numeric', month: 'long', day: 'numeric'
                      })}
                    </div>
                    <div className="flex items-center bg-gray-50 px-3 py-1.5 rounded-full">
                      {blog.author_name || 'Expert'}
                    </div>
                    {blog.reading_time && (
                      <div className="flex items-center bg-gray-50 px-3 py-1.5 rounded-full">
                        {blog.reading_time} min read
                      </div>
                    )}
                  </div>

                  <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
                    {blog.title}
                  </h1>

                  <div 
                    className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-green-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700 prose-li:mb-2 prose-img:rounded-lg prose-img:shadow-md"
                    dangerouslySetInnerHTML={{ __html: blog.content || '' }}
                  />

                  {blog.tags && blog.tags.length > 0 && (
                    <div className="mt-8 pt-8 border-t border-gray-100">
                      <h4 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">Tags:</h4>
                      <div className="flex flex-wrap gap-2">
                        {blog.tags.map((tag: any) => (
                          <Link 
                            key={tag.id} 
                            href={`/blog/tag/${tag.slug}`}
                            className="bg-gray-100 hover:bg-green-50 text-gray-700 hover:text-green-700 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                          >
                            #{tag.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-16 pt-8 border-t border-gray-200">
                    <Link
                      href="/blog"
                      className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 font-semibold transition-all duration-300 group shadow-lg hover:shadow-xl"
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
                        className="block text-sm text-gray-600 hover:text-green-600 transition-colors"
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
              {/* <RelatedPosts currentPostId={blog.id} limit={3} /> */}
            </div>
          </div>
        </div>
      </div>
      
      {/* Blog Detail Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": blog.schema_type || "Article",
            "headline": blog.title,
            "description": blog.meta_description || blog.excerpt,
            "image": blog.featured_image ? {
              "@type": "ImageObject",
              "url": blog.featured_image,
              "description": blog.featured_image_alt
            } : undefined,
            "author": {
              "@type": "Person",
              "name": blog.author_name || 'Expert'
            },
            "publisher": {
              "@type": "Organization",
              "name": "PestControl99",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.pestcontrol99.com/logo.png"
              }
            },
            "datePublished": blog.publish_date || blog.created_at,
            "dateModified": blog.updated_at || blog.created_at,
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://www.pestcontrol99.com/blog/${blog.slug}/`
            },
            "keywords": blog.target_keywords
          })
        }}
      />
    </div>
  );
}