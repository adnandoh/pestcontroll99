import { BUSINESS } from '@/config/business';

type BlogPostSchemaInput = {
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  featured_image?: string;
  publish_date?: string;
  updated_at?: string;
  author?: string;
  category?: { name: string };
};

export function getBlogPostingSchema(blog: BlogPostSchemaInput) {
  const url = `${BUSINESS.website}/blog/${blog.slug}/`;
  const image =
    blog.featured_image && blog.featured_image.startsWith('http')
      ? blog.featured_image
      : `${BUSINESS.website}/images/hero-home.webp`;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: blog.excerpt || blog.title,
    image,
    datePublished: blog.publish_date,
    dateModified: blog.updated_at || blog.publish_date,
    author: {
      '@type': 'Organization',
      name: blog.author || BUSINESS.brandName,
    },
    publisher: {
      '@type': 'Organization',
      name: BUSINESS.brandName,
      logo: {
        '@type': 'ImageObject',
        url: `${BUSINESS.website}/android-chrome-512x512.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    articleSection: blog.category?.name,
    inLanguage: 'en-IN',
  };
}
