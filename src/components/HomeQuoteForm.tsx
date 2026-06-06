import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { saveFormData, HomeFormData, decodeFormDataFromURL, getFormData, clearFormData } from '@/utils/formStorage';
import { submitHomeQuoteForm } from '@/services/formSubmit';
import MultiSelectPest from './MultiSelectPest';
import { AddressInput } from './GoogleMaps';

type HomeQuoteFormProps = {
  /** Tighter layout (~30% less vertical footprint) for home hero pairing */
  compact?: boolean;
  /** CRM remark + message tag for campaign landing pages */
  leadSource?: string;
  thankYouPath?: string;
  defaultCity?: string;
  defaultState?: string;
  formTitle?: string;
  formSubtitle?: string;
};

export default function HomeQuoteForm({
  compact = false,
  leadSource,
  thankYouPath = '/thank-you/',
  defaultCity,
  defaultState,
  formTitle,
  formSubtitle,
}: HomeQuoteFormProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState<HomeFormData>({
    pestTypes: [],
    phone: '',
    address: '',
    streetAddress: '',
    name: '',
    premiseType: 'residential',
    premiseSize: '1bhk',
    serviceType: 'one-time',
    estimatedPrice: 0
  });

  // Load pre-filled data on component mount
  useEffect(() => {
    const urlData = decodeFormDataFromURL(searchParams);
    const storageData = getFormData();
    
    if (Object.keys(urlData).length > 0 || storageData) {
      setFormData(prev => {
        const nextData = {
          ...prev,
          ...storageData,
          ...urlData
        };
        // Re-calculate price for pre-filled data
        nextData.estimatedPrice = calculatePrice(nextData);
        return nextData;
      });
    }
    
    if (storageData) {
      clearFormData();
    }
  }, [searchParams]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // Rate card data
  const RATES: any = {
    'cockroach-ants': {
      'amc': { '1rk': 1800, '1bhk': 2200, '2bhk': 2500, '3bhk': 3000, '4bhk': 3500 },
      'one-time': { '1rk': 1000, '1bhk': 1200, '2bhk': 1500, '3bhk': 1800, '4bhk': 2000 }
    },
    'bedbugs': { '1rk': 2000, '1bhk': 2500, '2bhk': 3000, '3bhk': 3500, '4bhk': 4000 },
    'termite': { '1rk': 2000, '1bhk': 2500, '2bhk': 3000, '3bhk': 3500, '4bhk': 4000 },
    'rodent': { 'fixed': 1000 },
    'mosquito': { '1rk': 800, '1bhk': 1000, '2bhk': 1500, '3bhk': 1800, '4bhk': 2000 }
  };

  const calculatePrice = (data: HomeFormData) => {
    if (data.premiseType === 'commercial' || data.pestTypes.includes('hotel-commercial')) {
      return 0; // Inspection required
    }

    if (data.pestTypes.length === 0) return 0;

    let totalPrice = 0;
    data.pestTypes.forEach(pest => {
      const rate = RATES[pest];
      if (!rate) return;

      if (pest === 'cockroach-ants') {
        const typeRate = rate[data.serviceType || 'one-time'];
        totalPrice += typeRate[data.premiseSize || '1bhk'] || 0;
      } else if (pest === 'rodent') {
        totalPrice += rate.fixed;
      } else if (rate[data.premiseSize || '1bhk']) {
        totalPrice += rate[data.premiseSize || '1bhk'];
      }
    });

    return totalPrice;
  };

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

    if (!formData.name || !formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (formData.premiseType === 'residential' && !formData.serviceType) {
      newErrors.serviceType = 'Please select a service type';
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
      // Submit to the backend API which handles both CRM and Email
      const result = await submitHomeQuoteForm(formData as unknown as Record<string, unknown>, {
        leadSource,
        defaultCity,
        defaultState,
      });

      if (result.ok) {
        clearFormData();
        setErrors({});
        navigate(thankYouPath, { replace: true });
        return;
      } else {
        setShowSuccessPopup(false);
        setSubmitMessage(result.error || 'Failed to submit quote request. Please try again or contact us directly.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setShowSuccessPopup(false);
      setSubmitMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof HomeFormData, value: any) => {
    setFormData(prev => {
      const nextData = {
        ...prev,
        [field]: value
      };

      // Check if any selected pest restricts the service to One-Time
      // Only 'cockroach-ants' currently supports AMC in the CRM pricing
      const hasAmcSupport = nextData.pestTypes.length > 0 && 
                           nextData.pestTypes.every(p => p === 'cockroach-ants');
      
      if (!hasAmcSupport && nextData.serviceType === 'amc') {
        nextData.serviceType = 'one-time';
      }

      // If specific pests are selected that are known to be One-Time only
      const oneTimeOnlyPests = ['rodent', 'bedbugs', 'termite', 'mosquito'];
      const isForcedOneTime = nextData.pestTypes.some(p => oneTimeOnlyPests.includes(p));
      
      if (isForcedOneTime) {
        nextData.serviceType = 'one-time';
      }
      
      // Re-calculate price on any relevant change
      nextData.estimatedPrice = calculatePrice(nextData);
      
      return nextData;
    });

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
    <section
      className={`pt-0 bg-transparent relative overflow-hidden ${compact ? 'pb-8 sm:pb-10 md:pb-12' : 'pb-12 sm:pb-16 md:pb-20'}`}
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] bg-green-50 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute top-[40%] -left-[10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-3xl opacity-60"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className={`mx-auto ${compact ? 'max-w-2xl' : 'max-w-3xl'}`}>
          <div
            className={`bg-white shadow-xl border border-gray-100 relative overflow-hidden ${compact ? 'p-4 sm:p-6 rounded-xl' : 'p-6 sm:p-10 rounded-2xl'}`}
          >
            {/* Header moved inside the card for better readability when overlapping hero */}
            <div className={`text-center ${compact ? 'mb-4 sm:mb-5' : 'mb-6 sm:mb-8'}`}>
              <h2
                className={`font-bold text-gray-900 mb-2 sm:mb-3 leading-tight ${compact ? 'text-xl sm:text-2xl md:text-3xl' : 'text-2xl sm:text-3xl md:text-4xl'}`}
              >
                {formTitle ? (
                  formTitle
                ) : (
                  <>
                    Get Your{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">
                      Free Quote
                    </span>{' '}
                    Today
                  </>
                )}
              </h2>
              <p className={`text-gray-600 max-w-xl mx-auto ${compact ? 'text-xs sm:text-sm' : 'text-sm sm:text-base'}`}>
                {formSubtitle ??
                  "Tell us about your pest problem, and we'll provide a fast, accurate solution."}
              </p>
            </div>

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

            <form onSubmit={handleSubmit} className={compact ? 'space-y-3.5' : 'space-y-5'}>
              {/* 1. Premise Type Toggle - HiCare Style */}
              <div>
                <label className={`block font-bold text-[#1a1a1a] ${compact ? 'text-[13px] mb-2' : 'text-[15px] mb-2.5'}`}>
                  Premise Type *
                </label>
                <div className="flex border border-[#00C950] rounded-xl overflow-hidden shadow-sm">
                  <button
                    type="button"
                    onClick={() => handleChange('premiseType', 'residential')}
                    className={`flex-1 flex items-center justify-center gap-1.5 transition-all duration-200 ${compact ? 'py-2 px-3' : 'py-3 px-4'} ${formData.premiseType === 'residential'
                        ? 'bg-[#00C950] text-white'
                        : 'bg-white text-[#00C950]'
                      }`}
                  >
                    <svg className={compact ? 'w-4 h-4' : 'w-5 h-5'} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span className={`font-bold ${compact ? 'text-sm' : 'text-[15px]'}`}>Residential</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleChange('premiseType', 'commercial')}
                    className={`flex-1 flex items-center justify-center gap-1.5 transition-all duration-200 ${compact ? 'py-2 px-3' : 'py-3 px-4'} ${formData.premiseType === 'commercial'
                        ? 'bg-[#00C950] text-white'
                        : 'bg-white text-[#00C950]'
                      }`}
                  >
                    <svg className={compact ? 'w-4 h-4' : 'w-5 h-5'} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <span className={`font-bold ${compact ? 'text-sm' : 'text-[15px]'}`}>Commercial</span>
                  </button>
                </div>
              </div>

              {/* 2. Type of Pest Problem */}
              <div className="relative">
                <MultiSelectPest
                  selectedPests={formData.pestTypes}
                  onChange={(pests) => handleChange('pestTypes', pests)}
                  compact={compact}
                />
                {errors.pestTypes && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    {errors.pestTypes}
                  </p>
                )}
              </div>

              {/* 3. Price Display - Fixed Layout */}
              <div className={`bg-[#fcfdfd] rounded-2xl border border-[#00C950] shadow-sm ${compact ? 'p-4 rounded-xl' : 'p-6'}`}>
                <div className="flex flex-col gap-1">
                  <span className={`font-bold text-gray-400 uppercase tracking-wide ${compact ? 'text-[11px]' : 'text-[13px]'}`}>Estimated Price</span>
                  {formData.premiseType === 'commercial' || formData.pestTypes.includes('hotel-commercial') ? (
                    <div className="mt-1">
                      <span className={`font-semibold text-[#111827] ${compact ? 'text-lg' : 'text-xl'}`}>Inspection Required</span>
                      <p className="text-[11px] text-[#00C950] font-bold mt-1 uppercase tracking-widest">Free Consultation & Site Visit</p>
                    </div>
                  ) : (
                    <div className="mt-1">
                      <span className={`font-semibold text-[#111827] tracking-tight whitespace-nowrap ${compact ? 'text-xl' : 'text-2xl'}`}>
                        Rs. {formData.estimatedPrice?.toLocaleString('en-IN')}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* 4. Residential Specific Options (Size & Type) */}
              {formData.premiseType === 'residential' && formData.pestTypes.length > 0 && !formData.pestTypes.includes('hotel-commercial') && (
                <div className={`grid grid-cols-1 md:grid-cols-2 py-2 animate-in fade-in slide-in-from-top-2 ${compact ? 'gap-3.5' : 'gap-5'}`}>
                  {/* Premise Size Section */}
                  <div className="flex flex-col">
                    <label className={`block font-bold text-[#1a1a1a] mb-2 ${compact ? 'text-[13px]' : 'text-[15px]'}`}>
                      Premise Size *
                    </label>
                    <select
                      value={formData.premiseSize || '1bhk'}
                      onChange={(e) => handleChange('premiseSize', e.target.value)}
                      className={`w-full px-4 border border-[#00C950] rounded-xl focus:border-[#00C950] focus:ring-0 outline-none bg-white font-bold text-gray-700 transition-all cursor-pointer appearance-none shadow-sm ${compact ? 'py-2.5 text-sm' : 'py-3'}`}
                      style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%2300C950\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2.5\' d=\'M19 9l-7 7-7-7\' /%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.2rem' }}
                    >
                      <option value="1rk">1 RK</option>
                      <option value="1bhk">1 BHK</option>
                      <option value="2bhk">2 BHK</option>
                      <option value="3bhk">3 BHK</option>
                      <option value="4bhk">4 BHK</option>
                    </select>
                  </div>

                  {/* Select Type Section (One-Time / AMC) */}
                  <div className="flex flex-col">
                    <label className={`block font-bold text-[#1a1a1a] mb-2 ${compact ? 'text-[13px]' : 'text-[15px]'}`}>
                      Select Type *
                    </label>
                    <select
                      value={formData.serviceType || ''}
                      onChange={(e) => handleChange('serviceType', e.target.value)}
                      className={`w-full px-4 border rounded-xl focus:border-[#00C950] focus:ring-0 outline-none bg-white font-bold text-gray-700 transition-all cursor-pointer appearance-none shadow-sm ${compact ? 'py-2.5 text-sm' : 'py-3'} ${errors.serviceType ? 'border-red-500' : 'border-[#00C950]'}`}
                      style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%2300C950\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2.5\' d=\'M19 9l-7 7-7-7\' /%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.2rem' }}
                    >
                      <option value="" disabled>Select Type</option>
                      <option value="one-time">One Time Service</option>
                      {formData.pestTypes.length > 0 && formData.pestTypes.every(p => p === 'cockroach-ants') && (
                        <option value="amc">AMC 3 Services</option>
                      )}
                    </select>
                    {formData.pestTypes.some(p => ['rodent', 'bedbugs', 'termite', 'mosquito'].includes(p)) && (
                      <p className="mt-1 text-[10px] text-orange-600 font-bold italic">* Selected service(s) available only as One-Time treatment</p>
                    )}
                    {errors.serviceType && (
                      <p className="mt-1 text-xs text-red-600 font-bold">{errors.serviceType}</p>
                    )}
                  </div>
                </div>
              )}

              <div className={`grid grid-cols-1 md:grid-cols-2 ${compact ? 'gap-3.5' : 'gap-5'}`}>
                {/* 5. Your Name */}
                <div>
                  <label className={`block font-bold text-[#1a1a1a] mb-2 ${compact ? 'text-[13px]' : 'text-[15px]'}`}>
                    Your Name *
                  </label>
                  <div className="relative group">
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      placeholder="Enter your full name"
                      className={`w-full px-4 border rounded-xl focus:border-[#00C950] focus:ring-0 outline-none transition-all duration-200 bg-white font-medium shadow-sm ${compact ? 'py-2.5 text-sm' : 'py-3'} ${errors.name ? 'border-red-300' : 'border-[#00C950] hover:border-[#00C950]'
                        }`}
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-600 font-bold">{errors.name}</p>
                  )}
                </div>

                {/* 6. Phone Number */}
                <div>
                  <label className={`block font-bold text-[#1a1a1a] mb-2 ${compact ? 'text-[13px]' : 'text-[15px]'}`}>
                    Phone Number *
                  </label>
                  <div className="relative group">
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                        handleChange('phone', value);
                      }}
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      className={`w-full px-4 border rounded-xl focus:border-[#00C950] focus:ring-0 outline-none transition-all duration-200 bg-white font-medium shadow-sm ${compact ? 'py-2.5 text-sm' : 'py-3'} ${errors.phone ? 'border-red-300' : 'border-[#00C950] hover:border-[#00C950]'
                        }`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-600 font-bold">{errors.phone}</p>
                  )}
                </div>
              </div>

              {/* 7. Street Address (optional) — Google Places autocomplete + current location */}
              <div>
                <label
                  htmlFor="streetAddress"
                  className={`block font-bold text-[#1a1a1a] mb-2 ${compact ? 'text-[13px]' : 'text-[15px]'}`}
                >
                  Street Address <span className="font-normal text-gray-500">(optional)</span>
                </label>
                <AddressInput
                  label=""
                  value={formData.streetAddress}
                  onChange={(value) => handleChange('streetAddress', value)}
                  placeholder="Enter your street address (optional)"
                  className={`border-[#00C950] focus:ring-0 font-medium shadow-sm ${compact ? 'py-2.5 text-sm' : 'py-3'}`}
                  error={errors.streetAddress}
                />
              </div>

              {/* Submit Button */}
              <div className={compact ? 'pt-2' : 'pt-4'}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold hover:from-green-700 hover:to-emerald-800 transition-all duration-300 shadow-lg hover:shadow-green-200 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center group ${compact ? 'py-3 px-5 text-sm' : 'py-4 px-8'}`}
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
                      {formData.premiseType === 'commercial' || formData.pestTypes.includes('hotel-commercial') ? 'Request Free Inspection' : 'Get My Free Quote'}
                      <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </>
                  )}
                </button>
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
                  href="https://wa.me/918080748282?text=Hi%2C%20I%20just%20submitted%20a%20quote%20request%20on%20your%20website.%20Can%20you%20please%20provide%20me%20with%20a%20detailed%20quote%3F"
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
                  href="tel:+918080748282"
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
