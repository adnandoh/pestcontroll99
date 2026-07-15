import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import AppImage from '@/components/AppImage';
import PageMeta from '@/components/PageMeta';
import { BUSINESS, whatsAppUrl } from '@/config/business';
import {
  ECARD_ABOUT,
  ECARD_GALLERY,
  ECARD_SERVICES,
  ECARD_SOCIAL,
  ECARD_URL,
  buildECardVcf,
  type ECardService,
} from '@/config/eCard';
import { submitContactForm } from '@/services/formSubmit';

function downloadBlob(filename: string, blob: Blob) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/** Filled white-on-color icons (Flaticon-style colored rounds) */
function IconPhone({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#FFFFFF"
        d="M6.62 10.79a15.15 15.15 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.25 1.02l-2.2 2.19z"
      />
    </svg>
  );
}

function IconWhatsApp({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#FFFFFF"
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
      />
    </svg>
  );
}

function IconMail({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#FFFFFF"
        d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
      />
    </svg>
  );
}

function IconGlobe({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#FFFFFF"
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
      />
    </svg>
  );
}

function IconPin({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#FFFFFF"
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z"
      />
    </svg>
  );
}

function IconShare({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"
      />
    </svg>
  );
}

function IconContact({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
      />
    </svg>
  );
}

export default function ECardPage() {
  const enquiryRef = useRef<HTMLElement>(null);
  const [shareStatus, setShareStatus] = useState<'idle' | 'copied' | 'shared'>('idle');
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [prefillMessage, setPrefillMessage] = useState('');
  const [form, setForm] = useState({ name: '', email: '', mobile: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox]);

  const phoneDisplay = useMemo(
    () => BUSINESS.phoneDisplay.replace('+91 ', '').replace(/(\d{4})(\d{2})(\d{4})/, '$1 $2 $3'),
    [],
  );

  const handleSaveContact = () => {
    const vcf = buildECardVcf();
    downloadBlob(
      'PestControl99.vcf',
      new Blob([vcf], { type: 'text/vcard;charset=utf-8' }),
    );
  };

  const handleShare = async () => {
    const shareData = {
      title: `${BUSINESS.brandName} — Digital Business Card`,
      text: 'Government licensed pest control — Mumbai, Navi Mumbai, Thane, Lonavala & Pune',
      url: ECARD_URL,
    };
    try {
      if (typeof navigator.share === 'function') {
        await navigator.share(shareData);
        setShareStatus('shared');
        setTimeout(() => setShareStatus('idle'), 2000);
        return;
      }
    } catch {
      /* user cancelled or share failed — fall through to clipboard */
    }
    try {
      await navigator.clipboard.writeText(ECARD_URL);
      setShareStatus('copied');
      setTimeout(() => setShareStatus('idle'), 2000);
    } catch {
      setShareStatus('idle');
    }
  };

  const enquireAbout = (service: ECardService) => {
    const msg = `I am interested in ${service.name}. Please share a quote.`;
    setPrefillMessage(msg);
    setForm((prev) => ({ ...prev, message: msg }));
    enquiryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError('');
    setSubmitting(true);
    try {
      const result = await submitContactForm({
        name: form.name,
        email: form.email,
        phone: form.mobile,
        service: prefillMessage.includes('interested in')
          ? prefillMessage.replace(/^I am interested in /, '').replace(/\. Please share a quote\.$/, '')
          : 'E-Card Enquiry',
        message:
          form.message.trim().length >= 10
            ? `[E-Card] ${form.message.trim()}`
            : `[E-Card] Enquiry from digital business card. ${form.message.trim()}`.trim(),
      });
      if (result.ok) {
        setFormSuccess(true);
        setForm({ name: '', email: '', mobile: '', message: '' });
        setPrefillMessage('');
      } else {
        setFormError(result.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setFormError('Network error. Please call us or try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const contacts = [
    {
      icon: <IconPhone className="h-[22px] w-[22px]" />,
      iconBg: 'bg-[#1E7E34]',
      label: '24×7 Customer Care',
      value: phoneDisplay,
      href: `tel:${BUSINESS.phoneTel}`,
    },
    {
      icon: <IconWhatsApp className="h-[22px] w-[22px]" />,
      iconBg: 'bg-[#25D366]',
      label: 'WhatsApp Booking',
      value: phoneDisplay,
      href: whatsAppUrl('Hi Pest Control 99, I found you via your digital visiting card.'),
    },
    {
      icon: <IconMail className="h-[22px] w-[22px]" />,
      iconBg: 'bg-[#EA4335]',
      label: 'Customer Support Email',
      value: BUSINESS.email,
      href: `mailto:${BUSINESS.email}`,
    },
    {
      icon: <IconGlobe className="h-[22px] w-[22px]" />,
      iconBg: 'bg-[#1B2A6B]',
      label: 'Official Website',
      value: BUSINESS.websiteDisplay,
      href: BUSINESS.website,
    },
    {
      icon: <IconPin className="h-[22px] w-[22px]" />,
      iconBg: 'bg-[#E11D48]',
      label: 'Service Locations',
      value: 'Mumbai • Navi Mumbai • Thane • Lonavala • Pune',
      href: null as string | null,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F3F4F7] text-navy-dark">
      <PageMeta
        title="PestControl99 — Digital Business Card"
        description="Official Pest Control 99 digital visiting card — call, WhatsApp, save contact, view services & enquire. Government licensed pest control in Mumbai, Navi Mumbai, Thane, Lonavala & Pune."
        keywords="pest control 99 e-card, digital visiting card, pest control mumbai contact"
        canonical={ECARD_URL}
        ogUrl={ECARD_URL}
        ogImage="https://www.pestcontrol99.com/images/pestcontrol99-logo-v5.webp"
      />

      <div className="mx-auto max-w-[440px] bg-white shadow-[0_0_40px_rgba(17,28,78,0.08)] sm:my-0 sm:min-h-screen">
        {/* Brand banner */}
        <header className="w-full overflow-hidden bg-white">
          <AppImage
            src="/images/ecard/banner-brand.webp"
            alt="PestControl99.com — Complete pest control. Safe. Effective. Reliable. Call 80807 48282"
            width={1600}
            height={640}
            priority
            className="h-auto w-full object-cover"
          />
        </header>

        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-3 border-b border-gray-100 px-5 py-4">
          <button
            type="button"
            onClick={handleSaveContact}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-navy-dark px-3 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-base"
          >
            <IconContact className="h-4 w-4" />
            Save Contact
          </button>
          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center justify-center gap-2 rounded-md border border-navy-dark/20 bg-white px-3 py-3 text-sm font-semibold text-navy-dark transition-colors hover:bg-navy-pale"
          >
            <IconShare className="h-4 w-4" />
            {shareStatus === 'copied' ? 'Link Copied!' : shareStatus === 'shared' ? 'Shared' : 'Share'}
          </button>
        </div>

        {/* Quick contact */}
        <section className="border-b border-gray-100 px-5 py-5">
          <ul className="divide-y divide-gray-100">
            {contacts.map((row) => {
              const inner = (
                <>
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full shadow-sm ${row.iconBg}`}
                  >
                    {row.icon}
                  </span>
                  <span className="min-w-0 flex-1 text-left">
                    <span className="block text-[11px] font-medium uppercase tracking-wide text-gray-500">
                      {row.label}
                    </span>
                    <span className="mt-0.5 block text-sm font-semibold text-navy-dark break-words">
                      {row.value}
                    </span>
                  </span>
                </>
              );
              return (
                <li key={row.label}>
                  {row.href ? (
                    <a
                      href={row.href}
                      target={row.href.startsWith('http') ? '_blank' : undefined}
                      rel={row.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="flex items-center gap-3 py-3 transition-colors hover:bg-slate-50 -mx-2 px-2 rounded-md"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className="flex items-center gap-3 py-3">{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="mt-4 flex items-center justify-center gap-4">
            <a
              href={ECARD_SOCIAL.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1877F2] !text-white hover:opacity-90"
            >
              {/* Official Facebook logo glyph */}
              <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden>
                <path
                  fill="#FFFFFF"
                  d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"
                />
              </svg>
            </a>
            <a
              href={ECARD_SOCIAL.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-11 w-11 items-center justify-center rounded-full !text-white hover:opacity-90"
              style={{
                background:
                  'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)',
              }}
            >
              {/* Official Instagram logo glyph */}
              <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden>
                <path
                  fill="#FFFFFF"
                  d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
                />
              </svg>
            </a>
            <a
              href={ECARD_SOCIAL.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FF0000] !text-white hover:opacity-90"
            >
              {/* Official YouTube logo glyph */}
              <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden>
                <path
                  fill="#FFFFFF"
                  d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186 31.247 31.247 0 000 12.017a31.25 31.25 0 00.502 5.831 3.016 3.016 0 002.121 2.136c1.871.505 9.377.505 9.377.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136A31.25 31.25 0 0024 12.017a31.247 31.247 0 00-.502-5.831zM9.545 15.568V8.466l6.273 3.551-6.273 3.551z"
                />
              </svg>
            </a>
          </div>
        </section>

        {/* About */}
        <section className="border-b border-gray-100 px-5 py-6">
          <h2 className="text-lg font-bold uppercase tracking-wide text-navy-dark !text-[1.15rem]">
            About Us
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-700">{ECARD_ABOUT}</p>
        </section>

        {/* Services */}
        <section className="border-b border-gray-100 px-5 py-6">
          <h2 className="text-lg font-bold uppercase tracking-wide text-navy-dark !text-[1.15rem]">
            Products and Services
          </h2>
          <div className="mt-4 space-y-4">
            {ECARD_SERVICES.map((service) => (
              <article
                key={service.id}
                className="overflow-hidden rounded-lg border border-gray-200 bg-white"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-white">
                  <AppImage
                    src={service.image}
                    alt={service.imageAlt}
                    width={640}
                    height={480}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="px-4 py-3.5">
                  <p className="text-xs font-bold uppercase tracking-wide text-green-700">
                    {service.price}
                  </p>
                  <h3 className="mt-1 text-base font-bold text-navy-dark leading-snug !text-[1rem]">
                    {service.name}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-gray-600">{service.description}</p>
                  <button
                    type="button"
                    onClick={() => enquireAbout(service)}
                    className="mt-3 text-xs font-bold uppercase tracking-wide text-green-700 hover:text-green-dark"
                  >
                    Enquiry →
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Gallery */}
        <section className="border-b border-gray-100 px-5 py-6">
          <h2 className="text-lg font-bold uppercase tracking-wide text-navy-dark !text-[1.15rem]">
            Gallery
          </h2>
          <div className="mt-4 grid grid-cols-2 gap-2.5">
            {ECARD_GALLERY.map((item) => (
              <button
                key={item.src}
                type="button"
                onClick={() => setLightbox(item.src)}
                className="group relative aspect-[4/3] overflow-hidden rounded-md bg-navy-pale"
              >
                <AppImage
                  src={item.src}
                  alt={item.alt}
                  width={400}
                  height={300}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </button>
            ))}
          </div>
        </section>

        {/* Enquiry form */}
        <section ref={enquiryRef} id="enquiry" className="px-5 py-6">
          <h2 className="text-lg font-bold uppercase tracking-wide text-navy-dark !text-[1.15rem]">
            Enquiry Form
          </h2>

          {formSuccess ? (
            <div className="mt-4 rounded-md border border-green-200 bg-green-50 px-4 py-5 text-center">
              <p className="text-sm font-bold text-green-800">Thank you — enquiry received!</p>
              <p className="mt-1 text-xs text-green-700">
                Our team will contact you shortly on your mobile or email.
              </p>
              <button
                type="button"
                onClick={() => setFormSuccess(false)}
                className="mt-3 text-xs font-semibold text-green-800 underline"
              >
                Send another enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-4 space-y-3">
              <div>
                <label htmlFor="ec-name" className="mb-1 block text-xs font-semibold text-gray-700">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="ec-name"
                  required
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  className="w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
                  autoComplete="name"
                />
              </div>
              <div>
                <label htmlFor="ec-email" className="mb-1 block text-xs font-semibold text-gray-700">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="ec-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                  className="w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
                  autoComplete="email"
                />
              </div>
              <div>
                <label htmlFor="ec-mobile" className="mb-1 block text-xs font-semibold text-gray-700">
                  Mobile <span className="text-red-500">*</span>
                </label>
                <input
                  id="ec-mobile"
                  type="tel"
                  required
                  inputMode="numeric"
                  pattern="[0-9]{10}"
                  maxLength={10}
                  placeholder="10-digit mobile number"
                  value={form.mobile}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, mobile: e.target.value.replace(/\D/g, '').slice(0, 10) }))
                  }
                  className="w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
                  autoComplete="tel"
                />
              </div>
              <div>
                <label htmlFor="ec-message" className="mb-1 block text-xs font-semibold text-gray-700">
                  Message
                </label>
                <textarea
                  id="ec-message"
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                  className="w-full resize-y rounded-md border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
                  placeholder="Tell us about your pest problem…"
                />
              </div>
              {formError && (
                <p className="rounded-md bg-red-50 px-3 py-2 text-xs font-medium text-red-700">{formError}</p>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-md bg-green-600 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-green-dark disabled:opacity-60"
              >
                {submitting ? 'Sending…' : 'Send'}
              </button>
            </form>
          )}
        </section>

        <footer className="border-t border-gray-100 bg-navy-dark px-5 py-5 text-center text-white">
          <p className="text-sm font-bold">{BUSINESS.brandName}</p>
          <p className="mt-0.5 text-[11px] text-white/65">A brand of {BUSINESS.legalName}</p>
          <a
            href={`tel:${BUSINESS.phoneTel}`}
            className="mt-2 inline-block text-sm font-semibold text-green-300"
          >
            {BUSINESS.phoneDisplay}
          </a>
          <p className="mt-3 text-[10px] text-white/45">
            © {BUSINESS.legalName}. All rights reserved.
          </p>
        </footer>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Gallery image"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            className="absolute right-4 top-4 rounded-full bg-white/15 px-3 py-1.5 text-sm font-semibold text-white"
            onClick={() => setLightbox(null)}
          >
            Close
          </button>
          <img
            src={lightbox}
            alt=""
            className="max-h-[90vh] max-w-full rounded-md object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
