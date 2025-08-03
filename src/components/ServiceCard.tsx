import Link from 'next/link';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  features: string[];
  index?: number;
}

export default function ServiceCard({ title, description, icon, href, features, index = 0 }: ServiceCardProps) {
  return (
    <Link href={href} className="block group">
      <div className="bg-white border-2 border-gray-100 rounded-2xl p-8 hover:shadow-2xl hover:border-green-200 transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden cursor-pointer">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-green-50 opacity-30 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500"></div>
        
        {/* Icon */}
        <div className="mb-6 group-hover:scale-110 transition-all duration-300">
          {icon}
        </div>
        
        {/* Title */}
        <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-green-700 transition-colors">
          {title}
        </h3>
        
        {/* Description */}
        <p className="text-gray-600 mb-6 leading-relaxed">
          {description}
        </p>
        
        {/* Features */}
        <ul className="space-y-3 mb-8">
          {features.map((feature, featureIndex) => (
            <li key={featureIndex} className="flex items-start text-sm text-gray-700">
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
              </div>
              <span className="font-medium">{feature}</span>
            </li>
          ))}
        </ul>
        
        {/* CTA Button */}
        <div className="inline-flex items-center justify-center w-full bg-green-500 group-hover:bg-green-600 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform group-hover:scale-105 shadow-lg hover:shadow-xl">
          Learn More
          <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
          </svg>
        </div>
      </div>
    </Link>
  );
}