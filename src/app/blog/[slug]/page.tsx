import { Metadata } from 'next';
import BlogPostClient from './BlogPostClient';
import { decodeHtmlEntities, stripHtmlAndDecode } from '@/utils/htmlUtils';

// WordPress API Response Types (for metadata generation)
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

// Generate metadata for blog posts
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const response = await fetch(
      `https://pestcontrol99.in/wp-json/wp/v2/posts?slug=${slug}&_embed`,
      { next: { revalidate: 3600 } }
    );
    
    if (!response.ok) {
      return {
        title: 'Blog Post | PestControl99',
        description: 'Expert pest control tips and advice from PestControl99 professionals.',
      };
    }

    const data: WordPressPost[] = await response.json();
    
    if (data.length === 0) {
      return {
        title: 'Blog Post Not Found | PestControl99',
        description: 'The requested blog post could not be found.',
      };
    }

    const post = data[0];
    const cleanTitle = decodeHtmlEntities(post.title.rendered);
    const cleanExcerpt = stripHtmlAndDecode(post.excerpt.rendered).substring(0, 160);
    const cleanAuthor = decodeHtmlEntities(post._embedded?.author?.[0]?.name || 'PestControl99 Team');
    
    return {
      title: `${cleanTitle} | PestControl99 Blog`,
      description: cleanExcerpt || 'Expert pest control advice and tips from certified professionals.',
      keywords: 'pest control tips, pest prevention, pest control advice, pest control blog',
      openGraph: {
        title: cleanTitle,
        description: cleanExcerpt,
        type: 'article',
        publishedTime: post.date,
        authors: [cleanAuthor],
        images: post._embedded?.['wp:featuredmedia']?.[0]?.source_url ? [post._embedded['wp:featuredmedia'][0].source_url] : undefined,
      },
      alternates: {
        canonical: `https://www.pestcontrol99.com/blog/${slug}`,
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Blog Post | PestControl99',
      description: 'Expert pest control tips and advice from PestControl99 professionals.',
    };
  }
}



export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <BlogPostClient slug={slug} />;
}