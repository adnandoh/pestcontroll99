import Link from 'next/link';
import Image from 'next/image';

const blogPosts = [
  {
    id: 1,
    title: '5 Essential Termite Prevention Tips for Homeowners',
    excerpt: 'Learn how to protect your home from termites with these expert prevention tips from PestControl99 professionals.',
    date: 'June 10, 2023',
    author: 'PestControl99 Expert Team',
    image: '/images/Termite.webp',
    slug: '/blog/termite-prevention-tips',
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="py-10 sm:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-3 sm:mb-4">
              PestControl99 Blog
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Expert tips, insights, and latest news from PestControl99 professionals
            </p>
            <div className="w-16 sm:w-24 h-1 bg-gray-300 mx-auto mt-4 sm:mt-6"></div>
          </div>
        </div>
      </section>

      {/* Blog Content Section */}
      <section className="py-10 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                  <Link href={post.slug}>
                    <div className="relative h-48 w-full">
                      <Image 
                        src={post.image} 
                        alt={post.title} 
                        fill
                        style={{ objectFit: 'cover' }}
                        className="transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  </Link>
                  <div className="p-6">
                    <div className="text-sm text-gray-500 mb-2">{post.date} | By {post.author}</div>
                    <Link href={post.slug}>
                      <h2 className="text-xl font-bold text-gray-800 mb-3 hover:text-green-600 transition-colors duration-300">
                        {post.title}
                      </h2>
                    </Link>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <Link 
                      href={post.slug} 
                      className="text-green-600 hover:text-green-700 font-medium inline-flex items-center transition-colors duration-300"
                    >
                      Read More
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            
            {blogPosts.length === 0 && (
              <div className="text-center">
                <p className="text-gray-600 text-base sm:text-lg">
                  More blog content coming soon...
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}