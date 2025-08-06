'use client';

import { useState } from 'react';

export default function QuotePage() {
  const [formData, setFormData] = useState({
    phone: '',
    address: '',
    propertyType: 'residential',
    propertySize: '',
    pestTypes: [] as string[]
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/send-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormSubmitted(true);
        // Reset form after successful submission
        setFormData({
          phone: '',
          address: '',
          propertyType: 'residential',
          propertySize: '',
          pestTypes: []
        });
        // Scroll to top of page
        window.scrollTo(0, 0);
      } else {
        alert('Failed to send quote request. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to send quote request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePestTypeChange = (pestType: string) => {
    setFormData(prev => ({
      ...prev,
      pestTypes: prev.pestTypes.includes(pestType)
        ? prev.pestTypes.filter(type => type !== pestType)
        : [...prev.pestTypes, pestType]
    }));
  };

  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Get Your Free Quote
            </h1>

          </div>

          {formSubmitted && (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-8 rounded-md">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-green-800">Quote Request Submitted!</h3>
                  <div className="mt-2 text-green-700">
                    <p>Thank you for your request. Our team will contact you within 24 hours with your customized quote.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white rounded-lg shadow-lg p-8">
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="industrial">Industrial</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="propertySize" className="block text-sm font-medium text-gray-700 mb-2">
                  Property Size (in sq. ft.) *
                </label>
                <select
                  id="propertySize"
                  name="propertySize"
                  required
                  value={formData.propertySize}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Select property size</option>
                  <option value="less-than-500">Less than 500 sq. ft.</option>
                  <option value="500-1000">500 - 1000 sq. ft.</option>
                  <option value="1000-1500">1000 - 1500 sq. ft.</option>
                  <option value="1500-2000">1500 - 2000 sq. ft.</option>
                  <option value="2000-3000">2000 - 3000 sq. ft.</option>
                  <option value="more-than-3000">More than 3000 sq. ft.</option>
                </select>
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
                  placeholder="House/Flat No., Building Name, Street"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Pest Information */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Type of Pest Issues (Select all that apply)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { value: 'ants', label: 'Ants' },
                    { value: 'cockroaches', label: 'Cockroaches' },
                    { value: 'termites', label: 'Termites' },
                    { value: 'rodents', label: 'Rodents (Mice/Rats)' },
                    { value: 'spiders', label: 'Spiders' },
                    { value: 'wasps', label: 'Wasps/Bees' },
                    { value: 'bedbugs', label: 'Bed Bugs' },
                    { value: 'fleas', label: 'Fleas' },
                    { value: 'other', label: 'Other' },
                    { value: 'prevention', label: 'General Prevention' }
                  ].map((pest) => (
                    <label
                      key={pest.value}
                      className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={formData.pestTypes.includes(pest.value)}
                        onChange={() => handlePestTypeChange(pest.value)}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      />
                      <span className="ml-3 text-sm font-medium text-gray-700">
                        {pest.label}
                      </span>
                    </label>
                  ))}
                </div>
                {formData.pestTypes.length > 0 && (
                  <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-800 font-medium mb-2">Selected pest issues:</p>
                    <div className="flex flex-wrap gap-2">
                      {formData.pestTypes.map((pestType) => {
                        const pestLabel = [
                          { value: 'ants', label: 'Ants' },
                          { value: 'cockroaches', label: 'Cockroaches' },
                          { value: 'termites', label: 'Termites' },
                          { value: 'rodents', label: 'Rodents (Mice/Rats)' },
                          { value: 'spiders', label: 'Spiders' },
                          { value: 'wasps', label: 'Wasps/Bees' },
                          { value: 'bedbugs', label: 'Bed Bugs' },
                          { value: 'fleas', label: 'Fleas' },
                          { value: 'other', label: 'Other' },
                          { value: 'prevention', label: 'General Prevention' }
                        ].find(p => p.value === pestType)?.label || pestType;

                        return (
                          <span
                            key={pestType}
                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
                          >
                            {pestLabel}
                            <button
                              type="button"
                              onClick={() => handlePestTypeChange(pestType)}
                              className="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full text-green-400 hover:bg-green-200 hover:text-green-600 focus:outline-none focus:bg-green-200 focus:text-green-600"
                            >
                              <span className="sr-only">Remove {pestLabel}</span>
                              <svg className="w-2 h-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                                <path strokeLinecap="round" strokeWidth="1.5" d="m1 1 6 6m0-6L1 7" />
                              </svg>
                            </button>
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>



              {/* Submit Button */}
              <div className="text-center pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-green-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-600 transition-colors w-full md:w-auto text-lg shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Get My Free Quote'}
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
                href="tel:5551234567"
                className="bg-primary-600 text- px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                Call +91 98949 66921
              </a>
              <a
                href="pestcontrol99official@gmail.com"
                className="border-2 border-primary-600 text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-600 hover:text-white transition-colors"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}