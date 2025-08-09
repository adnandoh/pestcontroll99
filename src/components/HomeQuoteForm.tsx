'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { saveFormData, encodeFormDataToURL, HomeFormData } from '@/utils/formStorage';
import MultiSelectPest from './MultiSelectPest';

export default function HomeQuoteForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<HomeFormData>({
    pestTypes: [],
    propertyType: '1bhk',
    propertySize: '500',
    name: '',
    phone: '',
    email: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (formData.pestTypes.length === 0) {
      newErrors.pestTypes = 'Please select at least one pest type';
    }

    if (!formData.propertyType) {
      newErrors.propertyType = 'Please select a property type';
    }

    if (!formData.propertySize) {
      newErrors.propertySize = 'Please select a property size';
    }

    // Optional fields validation (if provided)
    if (formData.phone && !/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Save form data to localStorage
      saveFormData(formData);
      
      // Create URL with form data
      const urlParams = encodeFormDataToURL(formData);
      
      // Navigate to quote page with pre-filled data
      router.push(`/quote?${urlParams}`);
    } catch (error) {
      console.error('Error processing form:', error);
      // Fallback: navigate without parameters
      router.push('/quote');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof HomeFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Choose Your Pest & Property – Get Quotation the Same Day
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Fill out this quick form and we'll redirect you to get your detailed quote instantly
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg sm:shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Pest Type Selection */}
            <div>
              <MultiSelectPest
                selectedPests={formData.pestTypes}
                onChange={(pests) => handleChange('pestTypes', pests)}
              />
              {errors.pestTypes && (
                <p className="mt-1 text-sm text-red-600">{errors.pestTypes}</p>
              )}
            </div>

            {/* Property Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Type *
                </label>
                <select 
                  value={formData.propertyType}
                  onChange={(e) => handleChange('propertyType', e.target.value)}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm sm:text-base ${
                    errors.propertyType ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <option value="1bhk">1BHK Apartment</option>
                  <option value="2bhk">2BHK Apartment</option>
                  <option value="3bhk">3BHK Apartment</option>
                  <option value="villa">Villa/Independent House</option>
                  <option value="office">Office Space</option>
                  <option value="restaurant">Restaurant</option>
                  <option value="warehouse">Warehouse</option>
                  <option value="other">Other</option>
                </select>
                {errors.propertyType && (
                  <p className="mt-1 text-sm text-red-600">{errors.propertyType}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Size *
                </label>
                <select 
                  value={formData.propertySize}
                  onChange={(e) => handleChange('propertySize', e.target.value)}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm sm:text-base ${
                    errors.propertySize ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <option value="500">Up to 500 sq.ft</option>
                  <option value="1000">500 - 1000 sq.ft</option>
                  <option value="1500">1000 - 1500 sq.ft</option>
                  <option value="2000">1500 - 2000 sq.ft</option>
                  <option value="3000">2000 - 3000 sq.ft</option>
                  <option value="3000+">3000+ sq.ft</option>
                </select>
                {errors.propertySize && (
                  <p className="mt-1 text-sm text-red-600">{errors.propertySize}</p>
                )}
              </div>
            </div>

            {/* Optional Contact Information */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Contact Information (Optional - for faster service)
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="10-digit mobile number"
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm sm:text-base ${
                      errors.phone ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="your.email@example.com"
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm sm:text-base ${
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-green-500 text-white py-4 px-8 rounded-lg font-semibold hover:bg-green-600 transition-colors shadow-md hover:shadow-lg text-sm sm:text-base disabled:bg-gray-400 disabled:cursor-not-allowed min-w-[200px] flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    Get Detailed Quote
                    <svg className="ml-2 w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>
            </div>

            <p className="text-xs text-gray-500 text-center">
              * Required fields. Optional contact info helps us serve you faster.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}