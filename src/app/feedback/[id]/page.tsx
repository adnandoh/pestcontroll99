'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg
    className={`w-10 h-10 sm:w-12 sm:h-12 cursor-pointer transition-colors ${
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

  const API_BASE = process.env.NEXT_PUBLIC_API_URL 
    ? `${process.env.NEXT_PUBLIC_API_URL}/feedbacks/`
    : 'http://localhost:8000/api/v1/feedbacks/';

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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-6">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-100 border-t-[#FFC107]" />
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Authenticating...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 text-center">
        <div className="bg-white p-10 rounded-[2rem] shadow-2xl max-w-md w-full border border-gray-100 animate-fade-up">
          <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-black text-gray-800 uppercase mb-4 tracking-tight">Expired Link</h2>
          <p className="text-gray-500 font-bold mb-8 leading-relaxed px-4">{error}</p>
          <button
            onClick={() => window.location.href = '/'}
            className="w-full bg-gray-900 text-white font-black py-5 rounded-2xl shadow-xl active:scale-95 transition-transform tracking-widest uppercase text-xs"
          >
            Back to Safety
          </button>
        </div>
      </div>
    );
  }

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
    <div className="min-h-screen bg-[#fafafa] py-10 sm:py-24 px-4 font-sans">
      {/* Background decoration */}
      <div className="fixed top-0 left-0 w-full h-1 bg-[#FFC107] z-50"></div>
      
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-[2.5rem] sm:rounded-[3.5rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden relative">
          
          {/* Glassmorphism pattern overlay */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFC107]/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full -ml-32 -mb-32 blur-3xl"></div>

          <div className="p-8 sm:p-14 md:p-20 relative z-10">
            
            {/* Header with Logo */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 sm:mb-16 gap-8">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-full border border-gray-100">
                  <div className="w-1.5 h-1.5 bg-[#FFC107] rounded-full animate-pulse"></div>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Service Feedback</span>
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 tracking-tighter leading-none">Give feedback</h1>
                <div className="flex flex-col gap-1.5 mt-4">
                  <p className="text-xs font-bold text-gray-300 uppercase tracking-[0.2em]">
                    Booking Reference <span className="text-gray-900 ml-2">#{bookingInfo?.booking_id}</span>
                  </p>
                  <p className="text-sm font-black text-[#FFC107] uppercase tracking-widest bg-[#FFC107]/5 px-3 py-1 rounded-lg inline-block self-start">
                    {bookingInfo?.service_name}
                  </p>
                </div>
              </div>
              <div className="flex-shrink-0 bg-white p-4 rounded-3xl border border-gray-100 shadow-sm self-start sm:self-center transform hover:rotate-3 transition-transform">
                <Image
                  src="/images/logo.svg"
                  alt="Multi pest care LLP Logo"
                  width={140}
                  height={50}
                  className="h-auto w-36 sm:w-40 lg:w-44"
                />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-10 sm:space-y-14">
              
              {/* Technician Info & Behavior */}
              <div className="space-y-8">
                <div className="flex items-center justify-between border-b border-gray-50 pb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-900 rounded-2xl flex items-center justify-center text-[#FFC107] font-black text-xl shadow-lg">
                      {bookingInfo?.technician_name?.charAt(0) || 'T'}
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Technician Assigned</p>
                      <p className="text-base font-black text-gray-900 uppercase tracking-tight">{bookingInfo?.technician_name}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Technician Behavior</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                    {['excellent', 'good', 'average', 'poor'].map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setBehavior(b as any)}
                        className={`py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.15em] transition-all border-2 ${
                          behavior === b 
                            ? 'bg-[#FFC107] border-[#FFC107] text-black shadow-xl shadow-[#FFC107]/30 scale-105 z-20' 
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
              <div className="py-2">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1 block mb-6">Overall Experience</label>
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
                    <span className="w-2 h-2 bg-[#FFC107] rounded-full"></span>
                    {rating} Star{rating > 1 ? 's' : ''} Excellence Level
                  </p>
                )}
              </div>

              {/* Remarks Area */}
              <div className="space-y-6">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1 block">Your Comments</label>
                <div className="relative group">
                  <textarea
                    value={remark}
                    onChange={(e) => setRemark(e.target.value)}
                    placeholder="Tell us about your experience...."
                    className="w-full px-8 py-7 rounded-[2.5rem] border-2 border-gray-50 focus:border-[#FFC107] focus:bg-white outline-none transition-all resize-none min-h-[160px] sm:min-h-[220px] bg-gray-50 text-gray-800 font-bold placeholder-gray-300 shadow-inner group-hover:border-gray-100"
                  />
                  <div className="absolute bottom-6 right-8 text-gray-200 font-black text-2xl pointer-events-none opacity-20">
                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C14.9124 8 14.017 7.10457 14.017 6V5C14.017 4.44772 14.4647 4 15.017 4H21.017C21.5693 4 22.017 4.44772 22.017 5V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM2.017 21L2.017 18C2.017 16.8954 2.91238 16 4.017 16H7.017C7.56928 16 8.017 15.5523 8.017 15V9C8.017 8.44772 7.56928 8 7.017 8H4.017C2.91238 8 2.017 7.10457 2.017 6V5C2.017 4.44772 2.46472 4 3.017 4H9.017C9.56928 4 10.017 4.44772 10.017 5V15C10.017 18.3137 7.33072 21 4.017 21H2.017Z" /></svg>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 sm:pt-6 pb-4">
                <button
                  type="submit"
                  disabled={rating === 0 || isSubmitting}
                  className={`w-full py-6 sm:py-8 rounded-[1.5rem] sm:rounded-[2.5rem] font-black text-base sm:text-xl transition-all shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] flex items-center justify-center tracking-[0.3em] uppercase group ${
                    rating === 0 || isSubmitting
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
                {rating === 0 && (
                  <p className="text-center mt-6 text-[10px] font-black text-red-400 uppercase tracking-[0.2em] animate-bounce">
                    Please select stars to activate button
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
        
        <p className="text-center mt-12 text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] opacity-50">
          Powered by PestControl99 Secure Protocol
        </p>
      </div>
    </div>
  );
}
