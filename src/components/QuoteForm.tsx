'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface QuoteFormProps {
  service?: string;
  className?: string;
}

export default function QuoteForm({ service, className = '' }: QuoteFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    service: service || '',
    serviceType: 'one-time',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => {
      const nextData = {
        ...prev,
        [name]: value
      };

      // Check if the selected service restricts the service type to One-Time
      // Matching CRM rules: Only Cockroach/Ants and General Pest Control support AMC
      const oneTimeOnlyServices = [
        'Mosquito Control', 
        'Termite Control', 
        'Bed Bug Control', 
        'Rodent Control',
        'Other'
      ];
      
      if (name === 'service' && oneTimeOnlyServices.includes(value)) {
        nextData.serviceType = 'one-time';
      }

      return nextData;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Submit to both CRM and existing email system
      const [crmResponse, emailResponse] = await Promise.allSettled([
        // Submit to CRM
        (async () => {
          const { crmApi } = await import('@/services/crmApi');
          const inquiryData = crmApi.mapFormDataToInquiry(formData, 'quote');
          return crmApi.submitInquiry(inquiryData);
        })(),
        // Submit to existing email system (if available)
        fetch('/api/send-quote', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }).then(res => res.json()).catch(() => ({ success: false }))
      ]);

      // Check CRM submission result
      let crmSuccess = false;
      if (crmResponse.status === 'fulfilled' && crmResponse.value.success) {
        crmSuccess = true;
        console.log('✅ CRM submission successful:', crmResponse.value.data);
      } else {
        console.error('❌ CRM submission failed:', crmResponse.status === 'fulfilled' ? crmResponse.value.error : crmResponse.reason);
      }

      // Check email submission result
      let emailSuccess = false;
      if (emailResponse.status === 'fulfilled' && emailResponse.value.success !== false) {
        emailSuccess = true;
        console.log('✅ Email submission successful');
      } else {
        console.error('❌ Email submission failed:', emailResponse.status === 'rejected' ? emailResponse.reason : 'Unknown error');
      }

      // Show success if at least one submission succeeded
      if (crmSuccess || emailSuccess) {
        setIsSubmitted(true);
        router.push('/thank-you');
      } else {
        // Both submissions failed
        throw new Error('Failed to submit quote request');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      // You might want to show an error state here instead of just logging
      alert('Failed to submit quote request. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className={`bg-green-50 border border-green-200 rounded-2xl p-8 text-center ${className}`}>
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-green-800 mb-2">Thank You!</h3>
        <p className="text-green-700">
          We&apos;ve received your request. Our team will contact you shortly with your personalized quote.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`bg-white rounded-2xl shadow-lg border border-gray-100 p-8 ${className}`}>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Enter your full name"
          />
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Enter your phone number"
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Enter your email address"
          />
        </div>
        
        <div>
          <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
            Service Required *
          </label>
          <select
            id="service"
            name="service"
            required
            value={formData.service}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">Select a service</option>
            <option value="Cockroach / Ants">Cockroach / Ants Control</option>
            <option value="Bed Bug Control">Bed Bug Control</option>
            <option value="Termite Control">Termite Control</option>
            <option value="Rodent Control">Rodent Control</option>
            <option value="Mosquito Control">Mosquito Control</option>
            <option value="General Pest Control">General Pest Control</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 mb-2">
            Select Type *
          </label>
          <select
            id="serviceType"
            name="serviceType"
            required
            value={formData.serviceType}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none cursor-pointer"
          >
            <option value="" disabled>Select Type</option>
            <option value="one-time">One Time Service</option>
            {!['Mosquito Control', 'Termite Control', 'Bed Bug Control', 'Rodent Control', 'Other'].includes(formData.service) && (
              <option value="amc">AMC 3 Services</option>
            )}
          </select>
          {['Mosquito Control', 'Termite Control', 'Bed Bug Control', 'Rodent Control', 'Other'].includes(formData.service) && (
            <p className="mt-1 text-[10px] text-orange-600 font-bold italic">* Selected service available only as One-Time treatment</p>
          )}
        </div>
      </div>
      
      <div className="mt-6">
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
          Property Address *
        </label>
        <input
          type="text"
          id="address"
          name="address"
          required
          value={formData.address}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="Enter your property address"
        />
      </div>
      
      <div className="mt-6">
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          Additional Details
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="Tell us more about your pest problem..."
        />
      </div>
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full mt-8 bg-green-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Submitting...' : 'Get My Free Quote'}
      </button>
      
      <p className="text-xs text-gray-500 text-center mt-4">
        * Required fields. Our team will contact you shortly during business hours.
      </p>
    </form>
  );
}