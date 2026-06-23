import React, { useState } from 'react';
import AppImage from '@/components/AppImage';
import { SITE_LOGO } from '@/config/business';
import PageMeta from '@/components/PageMeta';

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg
    className={`w-12 h-12 cursor-pointer transition-colors ${
      filled ? 'text-[#FFC107] fill-[#FFC107]' : 'text-gray-300'
    }`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.921-.755 1.688-1.54 1.118l-3.976-2.888a1 1 0 00-1.175 0l-3.976 2.888c-.784.57-1.838-.197-1.539-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);

export default function FeedbackPage() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [remark, setRemark] = useState('');
  const [service, setService] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0 || !service) return;
    setIsSubmitting(true);
    // General feedback currently just simulates submission as there's no booking link
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const services = [
    'Cockroach Control',
    'Termite Control',
    'Rodent Control',
    'Bed Bug Treatment',
    'General Pest Control',
    'Mosquito Control'
  ];

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-[#fcfcfc]">
        <div className="max-w-md w-full bg-white rounded-[3rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] p-12 text-center border border-gray-100 animate-modal-enter">
          <div className="bg-emerald-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
            <svg className="w-12 h-12 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-4xl font-black text-gray-900 mb-3 tracking-tighter uppercase">Success!</h2>
          <p className="text-gray-500 mb-10 font-bold leading-relaxed">Your feedback has been recorded. Thank you for choosing <span className="text-[#FFC107]">Multi Pest Care</span>.</p>
          <button
            onClick={() => window.location.href = '/'}
            className="w-full bg-[#FFC107] hover:bg-[#e6af06] text-black font-black py-5 rounded-2xl transition-all shadow-xl shadow-[#FFC107]/20 active:scale-95 tracking-[0.2em] uppercase text-sm"
          >
            DONE
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] py-10 sm:py-24 px-4 font-sans text-gray-900">
      <PageMeta
        title="Share Your Feedback | Pest Control 99"
        description="Tell us about your pest control experience with Pest Control 99. Your feedback helps us improve our service across Mumbai, Thane and Navi Mumbai."
        noindex
      />
      <div className="fixed top-0 left-0 w-full h-1 bg-[#FFC107] z-50"></div>

      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-[2.5rem] sm:rounded-[3.5rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden relative">
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFC107]/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full -ml-32 -mb-32 blur-3xl"></div>

          <div className="p-8 sm:p-14 md:p-20 relative z-10">
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 sm:mb-16 gap-8">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-full border border-gray-100">
                  <div className="w-1.5 h-1.5 bg-[#FFC107] rounded-full animate-pulse"></div>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Customer Voice</span>
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-none">Give feedback</h1>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-[0.1em] mt-4 max-w-xs leading-relaxed">
                  Your thoughts help us maintain the highest standards of pest control in Mumbai.
                </p>
              </div>
              <div className="flex-shrink-0 self-start sm:self-center">
                <AppImage
                  src={SITE_LOGO.src}
                  alt={SITE_LOGO.alt}
                  width={SITE_LOGO.width}
                  height={SITE_LOGO.height}
                  className="h-auto w-36 sm:w-40 lg:w-44 max-w-full object-contain object-left"
                />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-10 sm:space-y-14">
              
              {/* Service Selection */}
              <div className="space-y-4">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Select Your Service</label>
                <div className="relative group">
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-8 py-6 bg-gray-50 rounded-[1.5rem] sm:rounded-[2rem] border-2 border-transparent focus:border-[#FFC107] focus:bg-white outline-none transition-all appearance-none font-black text-gray-800 cursor-pointer shadow-inner text-sm sm:text-base tracking-tight"
                    required
                  >
                    <option value="" disabled>Choose service...</option>
                    {services.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-[#FFC107]">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Star Rating */}
              <div className="py-2">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1 block mb-6">Overall Satisfaction</label>
                <div className="flex items-center gap-3 sm:gap-5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="transition-all active:scale-90 hover:scale-125"
                    >
                      <StarIcon filled={star <= (hoverRating || rating)} />
                    </button>
                  ))}
                </div>
                {rating > 0 && (
                  <p className="text-[#FFC107] font-black text-[11px] mt-6 ml-1 tracking-[0.2em] uppercase flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#FFC107] rounded-full animate-ping"></span>
                    {rating} Star Experience
                  </p>
                )}
              </div>

              {/* Remarks Area */}
              <div className="space-y-6">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1 block">Detailed Feedback</label>
                <div className="relative group">
                  <textarea
                    value={remark}
                    onChange={(e) => setRemark(e.target.value)}
                    placeholder="Tell us about your experience...."
                    className="w-full px-8 py-7 rounded-[2.5rem] border-2 border-gray-50 focus:border-[#FFC107] focus:bg-white outline-none transition-all resize-none min-h-[160px] sm:min-h-[220px] bg-gray-50 text-gray-800 font-bold placeholder-gray-300 shadow-inner group-hover:border-gray-100"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 pb-4">
                <button
                  type="submit"
                  disabled={rating === 0 || !service || isSubmitting}
                  className={`w-full py-6 sm:py-8 rounded-[1.5rem] sm:rounded-[2.5rem] font-black text-base sm:text-xl transition-all shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] flex items-center justify-center tracking-[0.3em] uppercase group ${
                    rating === 0 || !service || isSubmitting
                      ? 'bg-gray-100 text-gray-300 cursor-not-allowed shadow-none'
                      : 'bg-[#FFC107] hover:bg-black hover:text-[#FFC107] text-black active:scale-[0.98] hover:shadow-black/20'
                  }`}
                >
                  {isSubmitting ? (
                     <div className="flex items-center space-x-4">
                      <div className="w-6 h-6 border-4 border-black/10 border-t-black rounded-full animate-spin"></div>
                      <span>SENDING...</span>
                    </div>
                  ) : (
                    <span className="flex items-center gap-3">
                      SEND FEEDBACK
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 transform group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  )}
                </button>
                {(rating === 0 || !service) && (
                  <p className="text-center mt-6 text-[10px] font-black text-red-400 uppercase tracking-[0.2em]">
                    {!service ? 'Select a service' : 'Rate with stars'} to enable button
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
        
        <p className="text-center mt-12 text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] opacity-50">
          Official Feedback Portal ? Multi Pest Care LLP
        </p>
      </div>
    </div>
  );
}
