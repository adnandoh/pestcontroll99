import Link from 'next/link';
import OptimizedImage from '@/components/OptimizedImage';
import Breadcrumb from '@/components/Breadcrumb';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About pestcontrol99 | Mumbai's Trusted Pest Experts",
  description: "Same-day, low-odour pest control in Mumbai. Clear prices, written assurance, trained local technicians, and GST invoice provided. Learn more about PestControl99.",
  keywords: "about pestcontrol99, Mumbai pest control, same day pest control, low odour pest control, trained technicians, written warranty",
  openGraph: {
    title: "About pestcontrol99 | Mumbai's Trusted Pest Experts",
    description: "Same-day, low-odour pest control in Mumbai. Clear prices, written assurance, trained local technicians, and GST invoice provided.",
    type: "website",
  },
  alternates: {
    canonical: "https://www.pestcontrol99.com/about",
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-green-100 selection:text-green-900">
      {/* Breadcrumb */}
      <div className="bg-gray-50/50 border-b border-gray-100 backdrop-blur-sm sticky top-0 z-30">
        <div className="container mx-auto px-4 py-3">
          <Breadcrumb items={[{ label: 'About Us' }]} />
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-32">
        {/* Background Decor */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-green-100/50 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-100 text-green-700 text-sm font-semibold mb-8 shadow-sm hover:shadow-md transition-shadow cursor-default">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                </span>
                Serving Mumbai, Thane & Navi Mumbai
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6 leading-[1.15]">
                Mumbai&apos;s Local <br className="hidden lg:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">Pest Experts</span>.
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-lg">
                Clear talk. Clean work. Real results. We keep it simple—same-day help, clear prices, and service notes you can actually understand.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/quote"
                  className="group inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white transition-all duration-300 bg-green-600 rounded-xl hover:bg-green-700 hover:shadow-lg hover:shadow-green-200 hover:-translate-y-1"
                >
                  Get Free Quote
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <a
                  href="https://wa.me/7710032627?text=Hello%20PestControl99,%20can%20you%20share%20details%20and%20pricing%20for%20your%20pest%20control%20services?"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-gray-700 transition-all duration-300 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:text-green-600 hover:border-green-200 hover:shadow-lg hover:-translate-y-1"
                >
                  <svg className="w-5 h-5 mr-2 text-green-500 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                  </svg>
                  WhatsApp Us
                </a>
              </div>
            </div>

            <div className="order-1 lg:order-2 relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-green-200 to-blue-200 rounded-[2rem] blur-2xl opacity-40 animate-pulse"></div>
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white/50 backdrop-blur-sm">
                <OptimizedImage
                  src="/images/heroimage.webp"
                  alt="Professional pest control expert treating a Mumbai home"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 800px"
                />

                {/* Floating Stats Card */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/20 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Satisfaction</p>
                      <p className="text-sm font-bold text-gray-900">100% Guaranteed</p>
                    </div>
                  </div>
                  <div className="h-8 w-px bg-gray-200"></div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Service</p>
                      <p className="text-sm font-bold text-gray-900">Same Day</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Believe Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What We Believe</h2>
            <p className="text-lg text-gray-600">Core values that drive every service we provide to your home and business.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Safety first",
                desc: "We use CIB&RC-approved products and give clear kid- and pet-safe guidance for every visit.",
                icon: (
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                color: "bg-green-50 border-green-100"
              },
              {
                title: "Clarity over jargon",
                desc: "We show what we'll do, why it works, and when you can use each room again—step by step.",
                icon: (
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                ),
                color: "bg-blue-50 border-blue-100"
              },
              {
                title: "Fix the root cause",
                desc: "We treat the source and seal entries, then back the work with a written assurance.",
                icon: (
                  <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                ),
                color: "bg-orange-50 border-orange-100"
              }
            ].map((item, idx) => (
              <div key={idx} className={`group p-8 rounded-2xl border ${item.color} hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white`}>
                <div className="w-16 h-16 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do Section - Typography Focus */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">What We Do</h2>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-light">
              From <span className="font-semibold text-green-600">Bandra kitchens</span> to <span className="font-semibold text-blue-600">Thane offices</span>, we protect your space.
              Specializing in cockroach control, termite protection, mosquito relief, and rodent proofing for homes and businesses across Mumbai.
            </p>
          </div>
        </div>
      </section>

      {/* How We Work Section - Timeline Style */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How We Work</h2>
            <p className="text-lg text-gray-600">A simple, transparent process designed for your peace of mind.</p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              {/* Connecting Line (Desktop) */}
              <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-gray-200 -z-10"></div>

              {[
                { step: "1", title: "Inspect", desc: "We spot entry points, nests, and trails.", color: "bg-green-500" },
                { step: "2", title: "Treat", desc: "Targeted gels & mists where pests live.", color: "bg-blue-500" },
                { step: "3", title: "Proof", desc: "Seal gaps to block return paths.", color: "bg-orange-500" },
                { step: "4", title: "Report", desc: "Digital invoice & clear service notes.", color: "bg-purple-500" }
              ].map((item, idx) => (
                <div key={idx} className="relative flex flex-col items-center text-center group">
                  <div className={`${item.color} w-16 h-16 rounded-2xl text-white flex items-center justify-center text-2xl font-bold shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10 border-4 border-gray-50`}>
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed px-4">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Follow Up Box */}
            <div className="mt-16 text-center">
              <div className="inline-block bg-white rounded-2xl p-8 shadow-lg border border-gray-100 max-w-2xl mx-auto transform hover:-translate-y-1 transition-transform duration-300">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center justify-center gap-2">
                  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  The Follow Up
                </h3>
                <p className="text-gray-600">
                  We check results after service. If pests return within warranty, we come back and fix it at no extra cost.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Bento Grid Style */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">Why Choose PestControl99</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: "Mumbai-fast",
                desc: "Same-day slots most days. Live updates until we reach you.",
                icon: "M13 10V3L4 14h7v7l9-11h-7z",
                color: "text-green-600",
                bg: "bg-green-50"
              },
              {
                title: "Low odour, no stains",
                desc: "Water-based treatments dry fast. Safe for family & pets.",
                icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",
                color: "text-blue-600",
                bg: "bg-blue-50"
              },
              {
                title: "Written cover",
                desc: "Clear warranty. If they return, so do we—for free.",
                icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
                color: "text-orange-600",
                bg: "bg-orange-50"
              },
              {
                title: "No surprises",
                desc: "One fair quote. No hidden fees. GST invoice provided.",
                icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1",
                color: "text-purple-600",
                bg: "bg-purple-50"
              },
              {
                title: "Real people, real care",
                desc: "Trained technicians who respect your home and explain the process.",
                icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
                color: "text-red-600",
                bg: "bg-red-50"
              },
              {
                title: "Safety & compliance",
                desc: "We operate by the book. Licensed, safe, and professional.",
                icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                color: "text-teal-600",
                bg: "bg-teal-50"
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-gray-50 rounded-2xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100 group">
                <div className={`w-12 h-12 ${item.bg} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <svg className={`w-6 h-6 ${item.color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas - Clean List */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Where We Serve</h2>
            <p className="text-gray-400 text-lg">
              Mumbai, Thane, and Navi Mumbai—from Chembur to Andheri, Bandra to Borivali, Powai to Panvel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Mumbai */}
            <div>
              <h3 className="text-xl font-bold text-green-400 mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span> Mumbai
              </h3>
              <ul className="space-y-2 text-gray-300 text-sm columns-2">
                {["Andheri East", "Andheri West", "Bandra East", "Bandra West", "Borivali East", "Borivali West", "Chembur", "Dadar", "Goregaon East", "Goregaon West", "Juhu", "Kandivali East", "Kandivali West", "Khar", "Kurla", "Malad East", "Malad West", "Mulund East", "Mulund West", "Powai", "Santacruz East", "Santacruz West", "Versova", "Vikhroli", "Vile Parle East", "Vile Parle West", "Worli", "Lower Parel"].map(area => (
                  <li key={area} className="hover:text-white transition-colors cursor-default">{area}</li>
                ))}
              </ul>
            </div>

            {/* Thane */}
            <div>
              <h3 className="text-xl font-bold text-blue-400 mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span> Thane
              </h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                {["Thane West", "Thane East", "Ghodbunder Road", "Hiranandani Estate", "Kasarvadavali", "Majiwada", "Naupada", "Vartak Nagar", "Wagle Estate", "Dombivli East", "Dombivli West", "Kalyan East", "Kalyan West", "Bhiwandi", "Ulhasnagar", "Ambernath"].map(area => (
                  <li key={area} className="hover:text-white transition-colors cursor-default">{area}</li>
                ))}
              </ul>
            </div>

            {/* Navi Mumbai */}
            <div>
              <h3 className="text-xl font-bold text-orange-400 mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-orange-400 rounded-full"></span> Navi Mumbai
              </h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                {["Vashi", "Nerul", "Belapur", "Kharghar", "Panvel", "Kamothe", "Airoli", "Ghansoli", "Kopar Khairane"].map(area => (
                  <li key={area} className="hover:text-white transition-colors cursor-default">{area}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-gray-400 mb-6">Don&apos;t see your area? We likely cover it.</p>
            <a
              href="https://wa.me/7710032627"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg backdrop-blur-sm transition-all duration-300"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" /></svg>
              Check Availability on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}