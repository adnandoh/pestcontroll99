import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Residential Pest Control in Pune | Same-Day Service | PestControl99",
  description: "Professional residential pest control services in Pune. Safe, eco-friendly treatment for homes. ISO-certified experts with 24/7 emergency service. Get instant quote.",
  keywords: "residential pest control pune, home pest control pune, cockroach control pune, termite control pune, safe pest control pune",
};

export default function ResidentialPestControlPune() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Residential Pest Control in Pune
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-8">
              Safe, Same-Day Pest Control for Your Home | ISO-Certified Experts
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+919594966921" 
                className="bg-white text-green-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                Call Now: +91 95949 66921
              </a>
              <a 
                href="/quote" 
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-green-600 transition-colors"
              >
                Get Instant Quote
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Why Choose Our Residential Pest Control in Pune?
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Same-Day Service in Pune</h4>
                      <p className="text-gray-600 text-sm">Quick response across all Pune areas including Kothrud, Baner, Wakad, and Hinjewadi.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Safe for Families & Pets</h4>
                      <p className="text-gray-600 text-sm">Eco-friendly, odourless treatments that are completely safe for children and pets.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">365-Day Warranty</h4>
                      <p className="text-gray-600 text-sm">Complete satisfaction guarantee with free re-treatment if pests return.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Pune Residential Pricing</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="font-medium">1 BHK Apartment</span>
                    <span className="text-green-600 font-bold">₹799</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="font-medium">2 BHK Home</span>
                    <span className="text-green-600 font-bold">₹1,299</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="font-medium">3 BHK Home</span>
                    <span className="text-green-600 font-bold">₹1,999</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="font-medium">Villa/Bungalow</span>
                    <span className="text-green-600 font-bold">₹2,999</span>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800">
                    <strong>Free:</strong> Inspection, consultation, and 365-day warranty included
                  </p>
                </div>
              </div>
            </div>

            {/* Areas Covered */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Areas We Cover in Pune</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  "Kothrud", "Baner", "Wakad", "Hinjewadi", "Aundh", "Viman Nagar", 
                  "Koregaon Park", "Camp Area", "Shivaji Nagar", "Deccan", "Karve Nagar", 
                  "Warje", "Bavdhan", "Pashan", "Sus", "Pimple Saudagar"
                ].map((area, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">{area}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}