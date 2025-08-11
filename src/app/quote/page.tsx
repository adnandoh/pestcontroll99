'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { decodeFormDataFromURL, getFormData, clearFormData } from '@/utils/formStorage';
import MultiSelectPest from '@/components/MultiSelectPest';
import SuccessModal from '@/components/SuccessModal';
import Breadcrumb from '@/components/Breadcrumb';

function QuoteForm() {
  const searchParams = useSearchParams();
  
  const [formData, setFormData] = useState({
    phone: '',
    email: '',
    address: '',
    propertyType: '1bhk',
    propertySize: '',
    pestTypes: [] as string[],
    additionalDetails: ''
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // Load pre-filled data on component mount
  useEffect(() => {
    // First try to get data from URL parameters
    const urlData = decodeFormDataFromURL(searchParams);
    
    // Then try to get data from localStorage
    const storageData = getFormData();
    
    // Only update if we have data to load
    if (Object.keys(urlData).length > 0 || storageData) {
      // Merge data with URL taking precedence
      const prefilledData = {
        phone: '',
        email: '',
        address: '',
        propertyType: '1bhk',
        propertySize: '',
        pestTypes: [] as string[],
        additionalDetails: '',
        ...storageData,
        ...urlData
      };

      setFormData(prefilledData);
    }
    
    // Clear localStorage after loading
    if (storageData) {
      clearFormData();
    }
    
    setIsDataLoaded(true);
  }, [searchParams]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.propertyType) {
      newErrors.propertyType = 'Property type is required';
    }

    if (!formData.propertySize) {
      newErrors.propertySize = 'Property size is required';
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
      const response = await fetch('/api/send-quote/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          pestType: formData.pestTypes.join(', ') // Convert array to string for API compatibility
        }),
      });

      if (response.ok) {
        setShowSuccessModal(true);
        // Reset form after successful submission
        setFormData({
          phone: '',
          email: '',
          address: '',
          propertyType: 'residential',
          propertySize: '',
          pestTypes: [],
          additionalDetails: ''
        });
      } else {
        const errorData = await response.json();
        alert(`Failed to send quote request: ${errorData.error || 'Please try again.'}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to send quote request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handlePestTypesChange = (pestTypes: string[]) => {
    setFormData(prev => ({
      ...prev,
      pestTypes
    }));
  };



  // Show loading state until data is loaded to prevent hydration mismatch
  if (!isDataLoaded) {
    return (
      <div className="py-8 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Get Your Personalized Quote
              </h1>
              <div className="animate-pulse">
                <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
              <div className="animate-pulse space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="h-12 bg-gray-300 rounded"></div>
                  <div className="h-12 bg-gray-300 rounded"></div>
                </div>
                <div className="h-12 bg-gray-300 rounded"></div>
                <div className="h-32 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Breadcrumb items={[{ label: 'Get Quote' }]} />
      <div className="py-6 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Get Your Personalized Quote
              </h1>
              <p className="text-lg text-gray-600">
                Fill out the details below and we&apos;ll provide you with a customized quote within 24 hours
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      placeholder="Your 10-digit mobile number"
                      className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                        errors.phone ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                    )}
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
                      placeholder="your.email@example.com (optional)"
                      className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                        errors.email ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Property Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-2">
                      Property Type *
                    </label>
                    <select
                      id="propertyType"
                      name="propertyType"
                      required
                      value={formData.propertyType}
                      onChange={handleChange}
                      className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
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
                    <label htmlFor="propertySize" className="block text-sm font-medium text-gray-700 mb-2">
                      Property Size *
                    </label>
                    <select
                      id="propertySize"
                      name="propertySize"
                      required
                      value={formData.propertySize}
                      onChange={handleChange}
                      className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                        errors.propertySize ? 'border-red-300' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select property size</option>
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

                {/* Property Address */}
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="House/Flat No., Building Name, Street, Area, City"
                    className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                      errors.address ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                  )}
                </div>

                {/* Pest Information */}
                <div>
                  <MultiSelectPest
                    selectedPests={formData.pestTypes}
                    onChange={handlePestTypesChange}
                  />
                </div>

                {/* Additional Details */}
                <div>
                  <label htmlFor="additionalDetails" className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Details
                  </label>
                  <textarea
                    id="additionalDetails"
                    name="additionalDetails"
                    rows={4}
                    value={formData.additionalDetails}
                    onChange={handleChange}
                    placeholder="Tell us more about your pest problem, preferred timing, or any specific requirements..."
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                {/* Submit Button */}
                <div className="text-center pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-green-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-600 transition-colors w-full md:w-auto text-lg shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed min-w-[200px] flex items-center justify-center gap-2 mx-auto"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending Request...
                      </>
                    ) : (
                      'Get My Free Quote'
                    )}
                  </button>
                  <p className="text-sm text-gray-500 mt-3">
                    * We respect your privacy. Your information will never be shared with third parties.
                  </p>
                </div>
              </form>
            </div>

            {/* Contact Information */}
            <div className="mt-12 text-center">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Need Immediate Assistance?
              </h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+919594966921"
                  className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Call +91 95949 66921
                </a>
                <a
                  href="mailto:info@pestcontrol99.com"
                  className="border-2 border-green-600 text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-600 hover:text-white transition-colors"
                >
                  Email Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
    </>
  );
}
export 
default function QuotePage() {
  return (
    <Suspense fallback={
      <div className="py-8 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Get Your Personalized Quote
              </h1>
              <div className="animate-pulse">
                <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
              <div className="animate-pulse space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="h-12 bg-gray-300 rounded"></div>
                  <div className="h-12 bg-gray-300 rounded"></div>
                </div>
                <div className="h-12 bg-gray-300 rounded"></div>
                <div className="h-32 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    }>
      <QuoteForm />
    </Suspense>
  );
}