'use client';

import { useState } from 'react';

export default function QuotePage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    propertyType: 'residential',
    propertySize: '',
    pestType: '',
    severity: 'mild',
    preferredDate: '',
    preferredTime: '',
    hearAboutUs: '',
    message: ''
  });
  
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Instead of alert, set form submitted state to true
    setFormSubmitted(true);
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      pincode: '',
      propertyType: 'residential',
      propertySize: '',
      pestType: '',
      severity: 'mild',
      preferredDate: '',
      preferredTime: '',
      hearAboutUs: '',
      message: ''
    });
    // Scroll to top of page
    window.scrollTo(0, 0);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Get Your Free Quote
            </h1>
            <p className="text-lg text-gray-600">
              Fill out the form below and we&apos;ll provide you with a customized pest control solution
            </p>
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

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
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                    City/Town *
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Mumbai"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-2">
                    PIN Code *
                  </label>
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    required
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="400001"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Pest Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="pestType" className="block text-sm font-medium text-gray-700 mb-2">
                    Type of Pest Issue
                  </label>
                  <select
                    id="pestType"
                    name="pestType"
                    value={formData.pestType}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Select pest type</option>
                    <option value="ants">Ants</option>
                    <option value="cockroaches">Cockroaches</option>
                    <option value="termites">Termites</option>
                    <option value="rodents">Rodents (Mice/Rats)</option>
                    <option value="spiders">Spiders</option>
                    <option value="wasps">Wasps/Bees</option>
                    <option value="bedbugs">Bed Bugs</option>
                    <option value="fleas">Fleas</option>
                    <option value="other">Other</option>
                    <option value="prevention">General Prevention</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="severity" className="block text-sm font-medium text-gray-700 mb-2">
                    Severity Level
                  </label>
                  <select
                    id="severity"
                    name="severity"
                    value={formData.severity}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="mild">Mild - Occasional sightings</option>
                    <option value="moderate">Moderate - Regular sightings</option>
                    <option value="severe">Severe - Heavy infestation</option>
                    <option value="emergency">Emergency - Immediate attention needed</option>
                  </select>
                </div>
              </div>

              {/* Preferred Date and Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Inspection Date *
                  </label>
                  <input
                    type="date"
                    id="preferredDate"
                    name="preferredDate"
                    required
                    value={formData.preferredDate}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Time *
                  </label>
                  <select
                    id="preferredTime"
                    name="preferredTime"
                    required
                    value={formData.preferredTime}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Select preferred time</option>
                    <option value="morning">Morning (8:00 AM - 12:00 PM)</option>
                    <option value="afternoon">Afternoon (12:00 PM - 4:00 PM)</option>
                    <option value="evening">Evening (4:00 PM - 8:00 PM)</option>
                  </select>
                </div>
              </div>
              
              {/* How did you hear about us */}
              <div>
                <label htmlFor="hearAboutUs" className="block text-sm font-medium text-gray-700 mb-2">
                  How did you hear about us?
                </label>
                <select
                  id="hearAboutUs"
                  name="hearAboutUs"
                  value={formData.hearAboutUs}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Select an option</option>
                  <option value="google">Google Search</option>
                  <option value="social-media">Social Media</option>
                  <option value="friend">Friend or Family</option>
                  <option value="advertisement">Advertisement</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Additional Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Details
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Please describe your pest problem in detail, including locations where you've seen pests, any previous treatments, etc."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Submit Button */}
              <div className="text-center pt-4">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-600 transition-colors w-full md:w-auto text-lg shadow-lg"
                >
                  Get My Free Quote
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
                Call +91 98123 45678
              </a>
              <a 
                href="mailto:info@pestcontrol99.com" 
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