import React, { useState, useEffect } from 'react';
import AppImage from '@/components/AppImage';
import { SITE_LOGO } from '@/config/business';
import { useParams } from 'react-router-dom';
import { getApiBase } from '@/config/env';
import PageMeta from '@/components/PageMeta';

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg
    className={`w-8 h-8 sm:w-10 sm:h-10 cursor-pointer transition-all duration-300 ${
      filled ? 'text-[#FFC107] fill-[#FFC107] scale-110' : 'text-gray-200'
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
  const params = useParams();
  const id = params.id as string;
  
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [remark, setRemark] = useState('');
  const [behavior, setBehavior] = useState<'excellent' | 'good' | 'average' | 'poor'>('excellent');
  
  const [bookingInfo, setBookingInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiRoot = getApiBase();
  const API_BASE = apiRoot
    ? `${apiRoot}/api/v1/feedbacks/`
    : '/api/v1/feedbacks/';

  useEffect(() => {
    if (!id) return;
    
    const fetchBookingInfo = async () => {
      try {
        const response = await fetch(`${API_BASE}booking-info/${id}/`);
        if (!response.ok) throw new Error('Invalid link');
        const data = await response.json();
        setBookingInfo(data);
        if (data.is_submitted) setSubmitted(true);
      } catch (err) {
        setError('Invalid feedback link or booking not found.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookingInfo();
  }, [id, API_BASE]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${API_BASE}submit/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          booking_id: id,
          rating,
          remark,
          technician_behavior: behavior
        })
      });

      if (!response.ok) throw new Error('Submission failed');
      setSubmitted(true);
    } catch (err) {
      alert('Failed to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const feedbackMeta = (
    <PageMeta
      title="Service Feedback | Pest Control 99"
      description="Share feedback about your recent pest control service with Pest Control 99."
      noindex
    />
  );

  if (loading) {
    return (
      <>
        {feedbackMeta}
        <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-100 border-t-[#FFC107]" />
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-[0.2em]">Authenticating...</p>
        </div>
      </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        {feedbackMeta}
        <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-6 text-center">
        <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-xl max-w-md w-full border border-gray-100">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 uppercase mb-3 tracking-tight">Expired Link</h2>
          <p className="text-gray-500 font-medium mb-8 leading-relaxed px-4">{error}</p>
          <button
            onClick={() => window.location.href = '/'}
            className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl shadow-lg active:scale-95 transition-all tracking-widest uppercase text-xs"
          >
            Back to Safety
          </button>
        </div>
      </div>
      </>
    );
  }

  if (submitted) {
    return (
      <>
        {feedbackMeta}
        <div className="min-h-screen flex items-center justify-center px-4 bg-[#fafafa]">
        {/* Decorative elements */}
        <div className="fixed top-0 left-0 w-full h-1 bg-[#FFC107] z-50"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFC107]/5 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl opacity-50"></div>

        <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-10 sm:p-14 text-center border border-gray-100 relative z-10 overflow-hidden">
          {/* Subtle success background pattern */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-50/50 rounded-full blur-2xl"></div>
          
          <div className="bg-emerald-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm border border-emerald-100/50">
            <svg className="w-10 h-10 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">Thank You!</h2>
          
          <div className="space-y-4 mb-10">
            <p className="text-gray-500 font-medium leading-relaxed">
              Your feedback has been successfully submitted. We truly appreciate you taking the time to share your experience with us.
            </p>
            <p className="text-sm font-semibold text-gray-400">
              Choosing <span className="text-gray-900 font-bold">Multi Pest Care</span> makes us proud.
            </p>
          </div>

          <button
            onClick={() => window.location.href = '/'}
            className="w-full bg-[#FFC107] hover:bg-black hover:text-[#FFC107] text-black font-bold py-5 rounded-2xl transition-all shadow-xl shadow-[#FFC107]/10 active:scale-[0.98] tracking-[0.2em] uppercase text-xs"
          >
            Return to Home
          </button>
        </div>
      </div>
      </>
    );
  }

  return (
    <>
      {feedbackMeta}
      <div className="min-h-screen bg-[#fafafa] py-8 sm:py-16 px-4 font-sans">
      {/* Background decoration */}
      <div className="fixed top-0 left-0 w-full h-1 bg-[#FFC107] z-50"></div>
      
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden relative">
          
          {/* Subtle decoration */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#FFC107]/5 rounded-full -mr-24 -mt-24 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/5 rounded-full -ml-24 -mb-24 blur-3xl"></div>

          <div className="p-6 sm:p-10 md:p-14 relative z-10">
            
            {/* Header with Logo */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 sm:mb-12 gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-gray-50 rounded-full border border-gray-100">
                  <div className="w-1.5 h-1.5 bg-[#FFC107] rounded-full animate-pulse"></div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Service Feedback</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight leading-tight">Give feedback</h1>
                <div className="flex flex-col gap-1 mt-2">
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-[0.15em]">
                    Booking Reference <span className="text-gray-900 ml-1">#{bookingInfo?.booking_id}</span>
                  </p>
                  <p className="text-[10px] font-bold text-[#FFC107] uppercase tracking-widest bg-[#FFC107]/5 px-2 py-0.5 rounded-md inline-block self-start">
                    {bookingInfo?.service_name}
                  </p>
                </div>
              </div>
              <div className="flex-shrink-0 self-start sm:self-center">
                <AppImage
                  src={SITE_LOGO.src}
                  alt={SITE_LOGO.alt}
                  width={SITE_LOGO.width}
                  height={SITE_LOGO.height}
                  className="h-auto w-32 sm:w-36 max-w-full object-contain object-left"
                />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 sm:space-y-10">
              
              {/* Technician Info & Behavior */}
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-gray-50 pb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center text-[#FFC107] font-bold text-lg shadow-md">
                      {bookingInfo?.technician_name?.charAt(0) || 'T'}
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Technician Assigned</p>
                      <p className="text-sm font-bold text-gray-900 uppercase tracking-tight">{bookingInfo?.technician_name}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] ml-1">Technician Behavior</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {['excellent', 'good', 'average', 'poor'].map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setBehavior(b as any)}
                        className={`py-3.5 rounded-xl text-[10px] font-bold uppercase tracking-[0.1em] transition-all border ${
                          behavior === b 
                            ? 'bg-[#FFC107] border-[#FFC107] text-black shadow-md scale-[1.02] z-10' 
                            : 'bg-gray-50 border-transparent text-gray-400 hover:border-gray-200 hover:bg-white'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Star Rating */}
              <div className="py-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] ml-1 block mb-4">Overall Experience</label>
                <div className="flex items-center gap-2.5 sm:gap-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="transition-all active:scale-90"
                    >
                      <StarIcon filled={star <= (hoverRating || rating)} />
                    </button>
                  ))}
                </div>
                {rating > 0 && (
                  <p className="text-[#FFC107] font-bold text-[10px] mt-4 ml-1 tracking-[0.15em] uppercase flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#FFC107] rounded-full"></span>
                    {rating} Star{rating > 1 ? 's' : ''} Experience
                  </p>
                )}
              </div>

              {/* Remarks Area */}
              <div className="space-y-4">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] ml-1 block">Your Comments</label>
                <div className="relative group">
                  <textarea
                    value={remark}
                    onChange={(e) => setRemark(e.target.value)}
                    placeholder="Tell us about your experience..."
                    className="w-full px-6 py-5 rounded-2xl border border-gray-100 focus:border-[#FFC107] focus:bg-white outline-none transition-all resize-none min-h-[140px] bg-gray-50 text-gray-800 font-medium placeholder-gray-300 group-hover:border-gray-200"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2 pb-2">
                <button
                  type="submit"
                  disabled={rating === 0 || isSubmitting}
                  className={`w-full py-4 sm:py-5 rounded-xl font-bold text-sm sm:text-base transition-all shadow-md flex items-center justify-center tracking-[0.2em] uppercase group ${
                    rating === 0 || isSubmitting
                      ? 'bg-gray-100 text-gray-300 cursor-not-allowed shadow-none'
                      : 'bg-[#FFC107] hover:bg-black hover:text-[#FFC107] text-black active:scale-[0.98]'
                  }`}
                >
                  {isSubmitting ? (
                     <div className="flex items-center space-x-3">
                      <div className="w-5 h-5 border-3 border-black/10 border-t-black rounded-full animate-spin"></div>
                      <span>SENDING...</span>
                    </div>
                  ) : (
                    <span className="flex items-center gap-2">
                      SEND FEEDBACK
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  )}
                </button>
                {rating === 0 && (
                  <p className="text-center mt-4 text-[10px] font-bold text-red-400 uppercase tracking-[0.1em] opacity-80">
                    Select stars to activate button
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
        
        <p className="text-center mt-10 text-[9px] font-semibold text-gray-300 uppercase tracking-[0.2em] opacity-60">
          Powered by Multi Pest Care Secure Protocol
        </p>
      </div>
    </div>
    </>
  );
}
