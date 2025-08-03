import Link from 'next/link';
import Image from 'next/image';

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
          <div className="max-w-4xl mx-auto">
            <div className="text-center">
              <p className="text-gray-600 text-base sm:text-lg">
                Blog content coming soon...
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}