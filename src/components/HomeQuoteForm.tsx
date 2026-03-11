'use client';

import { useState } from 'react';
import { saveFormData, HomeFormData } from '@/utils/formStorage';
import MultiSelectPest from './MultiSelectPest';
import { AddressInput } from './GoogleMaps';

export default function HomeQuoteForm() {
  const [formData, setFormData] = useState<HomeFormData>({
    pestTypes: [],
    phone: '',
    address: '',
    streetAddress: '',
    name: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (formData.pestTypes.length === 0) {
      newErrors.pestTypes = 'Please select at least one pest type';
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.streetAddress) {
      newErrors.streetAddress = 'Street address is required';
    }

    if (!formData.name || !formData.name.trim()) {
      newErrors.name = 'Name is required';
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
    setShowSuccessPopup(false);
    setSubmitMessage('');

    try {
      // Submit to both CRM and existing email system
      const [crmResponse, emailResponse] = await Promise.allSettled([
        // Submit to CRM
        (async () => {
          const { crmApi } = await import('@/services/crmApi');
          const inquiryData = crmApi.mapFormDataToInquiry(formData, 'home');
          return crmApi.submitInquiry(inquiryData);
        })(),
        // Submit to existing email system
        fetch('/api/home-quote', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }).then(res => res.json())
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
      if (emailResponse.status === 'fulfilled') {
        emailSuccess = true;
        console.log('✅ Email submission successful');
      } else {
        console.error('❌ Email submission failed:', emailResponse.reason);
      }

      // Show success if at least one submission succeeded
      if (crmSuccess || emailSuccess) {
        setShowSuccessPopup(true);
        let successMessage = 'Quote request submitted successfully! We will contact you soon.';

        if (crmSuccess && emailSuccess) {
          successMessage += ' Your inquiry has been recorded in our system.';
        } else if (crmSuccess) {
          successMessage += ' Your inquiry has been recorded in our CRM system.';
        } else {
          successMessage += ' Your inquiry has been sent via email.';
        }

        setSubmitMessage(successMessage);

        // Clear form after successful submission
        setFormData({
          pestTypes: [],
          phone: '',
          address: '',
          streetAddress: '',
          name: ''
        });

        // Clear any existing errors
        setErrors({});

        // Save to localStorage for backup
        saveFormData(formData);
      } else {
        // Both submissions failed
        setShowSuccessPopup(false);
        setSubmitMessage('Failed to submit quote request. Please try again or contact us directly.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setShowSuccessPopup(false);
      setSubmitMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof HomeFormData, value: string | string[]) => {
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

    // Clear success popup when user starts editing
    if (showSuccessPopup) {
      setShowSuccessPopup(false);
      setSubmitMessage('');
    }
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] bg-green-50 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute top-[40%] -left-[10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-3xl opacity-60"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-10 sm:mb-12">
          <span className="inline-block py-1 px-3 rounded-full bg-green-100 text-green-700 text-sm font-semibold mb-4">
            Same-Day Service Available
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Get Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">Free Quote</span> Today
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tell us about your pest problem, and we&apos;ll provide a fast, accurate solution.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-10 relative overflow-hidden">
            {/* Top Gradient Line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500"></div>

            {/* Error Message (inline) */}
            {submitMessage && !showSuccessPopup && (
              <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-800 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-red-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">{submitMessage}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 1. Type of Pest Problem */}
              <div className="relative">
                <MultiSelectPest
                  selectedPests={formData.pestTypes}
                  onChange={(pests) => handleChange('pestTypes', pests)}
                />
                {errors.pestTypes && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    {errors.pestTypes}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 2. Your Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      placeholder="Enter your full name"
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white ${errors.name ? 'border-red-300 focus:ring-red-200' : 'border-gray-200 hover:border-green-300'
                        }`}
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* 3. Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                        handleChange('phone', value);
                      }}
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white ${errors.phone ? 'border-red-300 focus:ring-red-200' : 'border-gray-200 hover:border-green-300'
                        }`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* 4. Street Address */}
              <div>
                <AddressInput
                  value={formData.streetAddress}
                  onChange={(value) => handleChange('streetAddress', value)}
                  error={errors.streetAddress}
                  required
                  className="bg-gray-50 focus:bg-white border-gray-200 hover:border-green-300 rounded-xl transition-all duration-200"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 px-8 rounded-xl font-bold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-green-200 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center group"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing Request...
                    </>
                  ) : (
                    <>
                      Get My Free Quote
                      <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </>
                  )}
                </button>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap justify-center gap-4 sm:gap-8 pt-4 border-t border-gray-100">
                <div className="flex items-center text-gray-500 text-sm">
                  <svg className="w-4 h-4 mr-1.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  No Spam Promise
                </div>
                <div className="flex items-center text-gray-500 text-sm">
                  <svg className="w-4 h-4 mr-1.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Secure & Confidential
                </div>
                <div className="flex items-center text-gray-500 text-sm">
                  <svg className="w-4 h-4 mr-1.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Fast Response
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Success Popup Modal */}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full mx-4 relative transform transition-all duration-300 scale-100 shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => {
                setShowSuccessPopup(false);
                setSubmitMessage('');
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors bg-gray-100 rounded-full p-1"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Success Icon */}
            <div className="text-center mb-6">
              <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4 relative">
                <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-25"></div>
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Request Received!</h3>
              <p className="text-gray-600 leading-relaxed">{submitMessage}</p>
            </div>

            {/* Contact Options */}
            <div className="space-y-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
              <p className="text-center text-sm text-gray-500 mb-3 font-medium">
                Want a faster response?
              </p>

              <div className="grid grid-cols-2 gap-3">
                {/* WhatsApp Button */}
                <a
                  href="https://wa.me/917710032627?text=Hi%2C%20I%20just%20submitted%20a%20quote%20request%20on%20your%20website.%20Can%20you%20please%20provide%20me%20with%20a%20detailed%20quote%3F"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] text-white py-2.5 px-4 rounded-lg font-semibold hover:bg-[#20bd5a] transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.382" />
                  </svg>
                  WhatsApp
                </a>

                {/* Call Button */}
                <a
                  href="tel:+917710032627"
                  className="bg-blue-600 text-white py-2.5 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}