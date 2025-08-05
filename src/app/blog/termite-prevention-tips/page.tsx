import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "5 Essential Termite Prevention Tips for Homeowners | PestControl99 Blog",
  description: "Learn 5 proven termite prevention tips from pest control experts. Protect your home from termite damage with these professional prevention strategies.",
  keywords: "termite prevention tips, prevent termites, termite prevention, home termite protection, termite control tips, white ant prevention, termite damage prevention",
  openGraph: {
    title: "5 Essential Termite Prevention Tips for Homeowners",
    description: "Expert termite prevention tips to protect your home from costly termite damage.",
    type: "article",
  },
};

export default function TermitePreventionBlogPost() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="py-10 sm:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-3 sm:mb-4">
              5 Essential Termite Prevention Tips for Homeowners
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Published on June 10, 2023 | By PestControl99 Expert Team
            </p>
            <div className="w-16 sm:w-24 h-1 bg-gray-300 mx-auto mt-4 sm:mt-6"></div>
          </div>
        </div>
      </section>

      {/* Blog Content Section */}
      <section className="py-10 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <Image 
                src="/images/Termite.webp" 
                alt="Termite Prevention" 
                width={800} 
                height={450} 
                className="rounded-lg shadow-md w-full h-auto"
              />
            </div>
            
            <article className="prose prose-lg max-w-none">
              <p className="text-gray-700 mb-6">
                Termites are one of the most destructive pests that can invade your home, causing billions of dollars in damage annually across India. These silent destroyers work 24/7, feeding on the wood structures of your home without any immediate signs of damage. By the time you notice their presence, they may have already caused significant structural damage.
              </p>
              
              <p className="text-gray-700 mb-6">
                At PestControl99, we believe prevention is always better than cure. Here are five essential termite prevention tips every homeowner should know:
              </p>
              
              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">1. Eliminate Wood-to-Soil Contact</h2>
              <p className="text-gray-700 mb-6">
                Termites typically enter homes through wood that directly contacts soil. Inspect your home&apos;s foundation and ensure no wooden structures touch the ground. Use concrete or metal barriers between wooden structures and soil. This simple step can significantly reduce the risk of termite infestation.
              </p>
              
              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">2. Reduce Moisture Around Your Home</h2>
              <p className="text-gray-700 mb-6">
                Termites thrive in moist environments. Fix leaky pipes, faucets, and AC units promptly. Ensure proper drainage around your foundation and maintain gutters and downspouts to direct water away from your home. Consider using dehumidifiers in damp areas like basements.
              </p>
              
              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">3. Store Firewood and Lumber Away From Your Home</h2>
              <p className="text-gray-700 mb-6">
                Keep firewood, lumber, and other wooden materials elevated and at least 20 feet away from your home&apos;s foundation. Termites can easily move from these wood sources to your home if they&apos;re stored too close.
              </p>
              
              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">4. Regular Inspections</h2>
              <p className="text-gray-700 mb-6">
                Schedule annual professional termite inspections. Trained pest control experts can identify early signs of termite activity that you might miss. Early detection can save you thousands in potential damage repair costs.
              </p>
              
              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">5. Consider Preventive Treatments</h2>
              <p className="text-gray-700 mb-6">
                Professional preventive treatments create a protective barrier around your home. These treatments can be liquid termiticides applied to the soil or bait systems installed around your property. Consult with PestControl99 experts to determine the best preventive solution for your specific situation.
              </p>
              
              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Conclusion</h2>
              <p className="text-gray-700 mb-6">
                Implementing these preventive measures can significantly reduce the risk of termite infestation in your home. Remember, the cost of prevention is always less than the cost of repairing termite damage. If you suspect termite activity or want to schedule a preventive inspection, contact PestControl99 today.
              </p>
              
              <div className="bg-gray-100 p-6 rounded-lg mt-8">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Need Professional Help?</h3>
                <p className="text-gray-700 mb-4">
                  Our termite control experts are ready to help protect your home from these destructive pests.
                </p>
                <Link href="/quote" className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-md transition duration-300">
                  Get a Free Quote
                </Link>
              </div>
            </article>
            
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Share this article:</h3>
              <div className="flex space-x-4">
                <button className="text-blue-600 hover:text-blue-800">
                  Facebook
                </button>
                <button className="text-blue-400 hover:text-blue-600">
                  Twitter
                </button>
                <button className="text-red-600 hover:text-red-800">
                  Pinterest
                </button>
                <button className="text-green-600 hover:text-green-800">
                  WhatsApp
                </button>
              </div>
            </div>
            
            <div className="mt-12">
              <Link href="/blog" className="text-blue-600 hover:text-blue-800 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Back to Blog
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}