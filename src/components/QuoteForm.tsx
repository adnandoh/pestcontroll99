import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitQuoteForm } from '@/services/formSubmit';

interface QuoteFormProps {
  service?: string;
  className?: string;
}

export default function QuoteForm({ service, className = '' }: QuoteFormProps) {
  const navigate = useNavigate();
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
  const [submitError, setSubmitError] = useState('');

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
    setSubmitError('');

    try {
      const result = await submitQuoteForm({
        ...formData,
        phone: formData.phone.replace(/\D/g, '').slice(0, 10),
      });

      if (result.ok) {
        navigate('/thank-you/', { replace: true });
        return;
      }
      setSubmitError(result.error || 'Failed to submit quote request. Please try again or contact us directly.');
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`bg-white rounded-2xl shadow-lg border border-gray-100 p-8 ${className}`}>
      {submitError && (
        <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-800 text-sm">
          {submitError}
        </div>
      )}

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
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '').slice(0, 10);
              setFormData((prev) => ({ ...prev, phone: value }));
            }}
            maxLength={10}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="10-digit mobile number"
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
