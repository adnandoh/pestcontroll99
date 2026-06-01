import { crmApi } from '@/services/crmApi';

export async function submitContactForm(formData: {
  name: string;
  email: string;
  phone: string;
  service?: string;
  message: string;
}) {
  const cleanPhone = formData.phone.replace(/\D/g, '');
  if (cleanPhone.length !== 10) {
    return { ok: false, error: 'Phone number must be exactly 10 digits' };
  }

  const crmData = {
    name: formData.name,
    mobile: cleanPhone,
    email: formData.email,
    city: 'Mumbai',
    service_interest: formData.service || 'General Inquiry',
    message: formData.message,
  };

  const crmResponse = await crmApi.submitInquiry(crmData);
  if (crmResponse.success) {
    return {
      ok: true,
      message: 'Contact form submitted successfully! We will get back to you soon.',
    };
  }

  return {
    ok: false,
    error: crmResponse.error || 'Failed to submit contact form',
  };
}

export async function submitHomeQuoteForm(formData: Record<string, unknown>) {
  if (
    !formData.pestTypes ||
    !(formData.pestTypes as string[]).length ||
    !formData.phone ||
    !formData.streetAddress
  ) {
    return { ok: false, error: 'Missing required fields' };
  }

  const cleanPhone = String(formData.phone).replace(/\D/g, '');
  if (cleanPhone.length !== 10) {
    return { ok: false, error: 'Phone number must be exactly 10 digits' };
  }

  const inquiryData = crmApi.mapFormDataToInquiry(
    formData as Parameters<typeof crmApi.mapFormDataToInquiry>[0],
    'home',
  );
  const crmResult = await crmApi.submitInquiry(inquiryData);

  if (crmResult.success) {
    return {
      ok: true,
      message: 'Quote request submitted successfully! We will contact you soon.',
    };
  }

  return {
    ok: false,
    error: crmResult.error || 'Failed to submit quote request',
  };
}

export async function submitQuoteForm(formData: Record<string, unknown>) {
  const inquiryData = crmApi.mapFormDataToInquiry(
    formData as Parameters<typeof crmApi.mapFormDataToInquiry>[0],
    'quote',
  );
  const validation = crmApi.validateInquiryData(inquiryData);
  if (!validation.isValid) {
    const firstError = Object.values(validation.errors)[0];
    return { ok: false, error: firstError || 'Please check your form' };
  }

  const crmResult = await crmApi.submitInquiry(inquiryData);
  if (crmResult.success) {
    return {
      ok: true,
      message: 'Quote request submitted successfully! We will contact you soon.',
    };
  }

  return {
    ok: false,
    error: crmResult.error || 'Failed to submit quote request',
  };
}
