import { getCrmSubmitBases } from '@/config/env';

export interface InquiryData {
  name: string;
  mobile: string;
  email?: string;
  city: string;
  state?: string;
  service_interest: string;
  message: string;
  premise_type?: string;
  premise_size?: string;
  pest_problems?: string;
  estimated_price?: number;
  is_inspection_required?: boolean;
  service_frequency?: string;
  /** Website lead status — inspection forms send "Inspection Requested" */
  status?: string;
  /** Stored as website-lead remark in CRM when provided */
  remark?: string;
  booking_session_id?: string;
  page_url?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

export type InquiryTrackingOptions = {
  leadSource?: string;
  defaultCity?: string;
  defaultState?: string;
};

export interface InquiryResponse {
  id: number;
  name: string;
  mobile: string;
  email?: string;
  city: string;
  service_interest: string;
  message: string;
  status: string;
  premise_type?: string;
  premise_size?: string;
  pest_problems?: string;
  estimated_price?: number;
  is_inspection_required?: boolean;
  service_frequency?: string;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  errors?: Record<string, string[]>;
}

class CRMApiService {
  private apiPath(baseUrl: string, path: string): string {
    if (!baseUrl) {
      return path;
    }
    return `${baseUrl}${path}`;
  }

  private getAuthHeaders(): Record<string, string> {
    return {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
  }

  private formatApiError(result: unknown, status: number): string {
    const errorResult = result as {
      message?: string;
      detail?: string;
      error?: string;
      details?: string;
      errors?: Record<string, string[] | string>;
    };

    if (errorResult.errors && typeof errorResult.errors === 'object') {
      const first = Object.values(errorResult.errors)[0];
      if (Array.isArray(first) && first[0]) {
        return first[0];
      }
      if (typeof first === 'string') {
        return first;
      }
    }

    return (
      errorResult.message ||
      errorResult.detail ||
      errorResult.error ||
      errorResult.details ||
      `Failed to submit inquiry (HTTP ${status})`
    );
  }

  private async postInquiry(
    baseUrl: string,
    inquiryData: InquiryData,
    path = '/api/inquiries/',
  ): Promise<ApiResponse<InquiryResponse>> {
    const controller =
      typeof AbortController !== 'undefined' ? new AbortController() : null;
    const timer =
      controller && typeof window !== 'undefined'
        ? window.setTimeout(() => controller.abort(), 12000)
        : null;
    try {
      const response = await fetch(this.apiPath(baseUrl, path), {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(inquiryData),
        signal: controller?.signal,
      });

      let result: unknown = null;
      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        result = await response.json();
      } else {
        const text = await response.text();
        try {
          result = JSON.parse(text);
        } catch {
          result = { message: text };
        }
      }

      if (response.ok) {
        return {
          success: true,
          data: result as InquiryResponse,
        };
      }

      return {
        success: false,
        error: this.formatApiError(result, response.status),
        errors: (result as { errors?: Record<string, string[]> }).errors,
      };
    } catch (error) {
      const aborted =
        (error instanceof DOMException && error.name === 'AbortError') ||
        (error instanceof Error && /aborted|timeout/i.test(error.message));
      return {
        success: false,
        error: aborted
          ? 'Inquiry request timed out. Please try again.'
          : 'Network error occurred.',
      };
    } finally {
      if (timer) window.clearTimeout(timer);
    }
  }

  async submitInquiry(inquiryData: InquiryData): Promise<ApiResponse<InquiryResponse>> {
    const bases = getCrmSubmitBases();
    let lastError = 'Failed to submit inquiry';

    for (const baseUrl of bases) {
      try {
        const result = await this.postInquiry(baseUrl, inquiryData);
        if (result.success) {
          return result;
        }
        lastError = result.error || lastError;
        if (import.meta.env.DEV) {
          console.warn(`[CRM] Submit failed via ${baseUrl || 'vite-proxy'}:`, lastError);
        }
      } catch (error) {
        console.error(`[CRM] Network error via ${baseUrl || 'vite-proxy'}:`, error);
        lastError = 'Network error occurred. Please check your connection and try again.';
      }
    }

    return {
      success: false,
      error: lastError,
    };
  }

  /** Silent upsert for home booking form — POST /api/inquiries/upsert/ */
  async upsertWebsiteInquiry(inquiryData: InquiryData): Promise<ApiResponse<InquiryResponse>> {
    const bases = getCrmSubmitBases();
    let lastError = 'Failed to upsert inquiry';

    for (const baseUrl of bases) {
      try {
        const result = await this.postInquiry(baseUrl, inquiryData, '/api/inquiries/upsert/');
        if (result.success) {
          return result;
        }
        lastError = result.error || lastError;
        if (import.meta.env.DEV) {
          console.warn(`[CRM] Upsert failed via ${baseUrl || 'vite-proxy'}:`, lastError);
        }
      } catch (error) {
        if (import.meta.env.DEV) {
          console.warn(`[CRM] Upsert network error via ${baseUrl || 'vite-proxy'}:`, error);
        }
        lastError = 'Network error occurred.';
      }
    }

    return {
      success: false,
      error: lastError,
    };
  }

  validateInquiryData(data: Partial<InquiryData>): { isValid: boolean; errors: Record<string, string> } {
    const errors: Record<string, string> = {};
    const name = (data.name || '').trim();

    if (!name || name.length < 2) {
      errors.name = 'Name must be at least 2 characters long';
    } else if (/\d/.test(name) || !/^[\p{L}\s]+$/u.test(name)) {
      errors.name = 'Name can only contain letters and spaces';
    }

    if (!data.mobile || !/^\d{10}$/.test(data.mobile.replace(/\D/g, ''))) {
      errors.mobile = 'Mobile number must be exactly 10 digits';
    }

    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!data.city || data.city.trim().length < 2) {
      errors.city = 'City is required';
    }

    if (!data.service_interest) {
      errors.service_interest = 'Please select a service type';
    }

    if (!data.message || data.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters long';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }

  mapFormDataToInquiry(
    formData: {
      name?: string;
      phone?: string;
      email?: string;
      streetAddress?: string;
      address?: string;
      pestTypes?: string[];
      service?: string;
      premiseType?: string;
      societyProgram?: string;
      propertyName?: string;
      commercialPropertyType?: string;
      approxSqFt?: string;
      premiseSize?: string;
      estimatedPrice?: number;
      serviceType?: string;
      treatmentQuality?: string;
      preferredDate?: string;
      preferredTime?: string;
      message?: string;
    },
    formType: 'home' | 'quote',
    tracking?: InquiryTrackingOptions,
  ): InquiryData {
    const oneTimeOnlyPests = ['rodent', 'bedbugs', 'termite', 'mosquito', 'wood-borer'];
    const oneTimeOnlyServices = [
      'Rodent Control',
      'Bed Bug Control',
      'Termite Control',
      'Mosquito Control',
      'Wood Borer Control',
      'Wood Borer',
      'Other',
    ];
    const forcedOneTime =
      formData.pestTypes?.some((p: string) => oneTimeOnlyPests.includes(p)) ||
      oneTimeOnlyServices.includes(formData.service || '');
    const serviceFrequency = forcedOneTime ? 'one-time' : formData.serviceType || 'one-time';
    const address = formData.streetAddress || formData.address || '';
    const city = this.resolveCity(address, tracking?.defaultCity);
    const category = this.resolveLeadCategory(formData);
    const isInspectionLead =
      category === 'commercial' ||
      category === 'society-free' ||
      category === 'society-paid';

    const inquiry: InquiryData = {
      name: formData.name || '',
      mobile: formData.phone || '',
      email: formData.email || '',
      city,
      state: tracking?.defaultState,
      service_interest:
        formType === 'quote' && formData.service
          ? this.formatServiceType(formData.service)
          : category === 'society-free'
            ? 'FREE Society Programme — General Pest + Rodent'
            : this.formatPestTypes(formData.pestTypes || []),
      message: this.generateMessage(formData, formType, serviceFrequency, tracking?.leadSource),
      premise_type: category,
      premise_size:
        formData.premiseSize ||
        (formData.approxSqFt ? `${formData.approxSqFt} sqft` : '') ||
        formData.commercialPropertyType ||
        '',
      pest_problems:
        category === 'society-free'
          ? 'cockroach-ants, rodent'
          : (formData.pestTypes || []).join(', '),
      estimated_price: isInspectionLead ? 0 : formData.estimatedPrice || 0,
      is_inspection_required: isInspectionLead || formData.estimatedPrice === 0,
      service_frequency: serviceFrequency,
    };

    if (tracking?.leadSource) {
      inquiry.remark = `Lead source: ${tracking.leadSource}`;
    }

    return inquiry;
  }

  /** CRM category: residential | society-free | society-paid | commercial */
  resolveLeadCategory(formData: {
    premiseType?: string;
    societyProgram?: string;
  }): string {
    const premise = (formData.premiseType || '').toLowerCase();
    if (premise === 'society') {
      return formData.societyProgram === 'paid' ? 'society-paid' : 'society-free';
    }
    if (premise === 'commercial') return 'commercial';
    return 'residential';
  }

  private resolveCity(address: string, defaultCity?: string): string {
    const addressLower = address.toLowerCase();
    if (addressLower.includes('lonavala')) return 'Lonavala';
    if (addressLower.includes('khandala')) return 'Khandala';
    if (addressLower.includes('karjat')) return 'Karjat';
    if (defaultCity) return defaultCity;
    return this.extractCityFromAddress(address);
  }

  private extractCityFromAddress(address: string): string {
    if (!address) return 'Mumbai';

    const addressLower = address.toLowerCase();
    if (addressLower.includes('mumbai') || addressLower.includes('bombay')) return 'Mumbai';
    if (addressLower.includes('pune')) return 'Pune';
    if (addressLower.includes('navi mumbai') || addressLower.includes('new mumbai')) return 'Navi Mumbai';
    if (addressLower.includes('thane')) return 'Thane';
    if (addressLower.includes('lonavala')) return 'Lonavala';

    const parts = address.split(',').map((part) => part.trim());
    if (parts.length > 1) {
      return parts[parts.length - 1] || 'Mumbai';
    }

    return 'Mumbai';
  }

  private formatPestTypes(pestTypes: string[]): string {
    if (!pestTypes || pestTypes.length === 0) {
      return 'General Pest Control';
    }

    const pestMap: Record<string, string> = {
      ants: '🐜 Ants',
      cockroaches: '🪳 Cockroaches',
      cockroachants: '🪳 Cockroach / Ants',
      termites: '🐛 Termites',
      termite: '🐛 Termites',
      rodents: '🐭 Rodents (Mice/Rats)',
      rodent: '🐭 Rodents',
      spiders: '🕷️ Spiders',
      wasps: '🐝 Wasps/Bees',
      honeybee: '🐝 Honey Bee',
      'bed-bugs': '🛏️ Bed Bugs',
      bedbugs: '🛏️ Bed Bugs',
      fleas: '🦟 Fleas',
      mosquitoes: '🦟 Mosquitoes',
      mosquito: '🦟 Mosquitoes',
      flies: '🪰 House Flies',
      housefly: '🪰 House Flies',
      woodborer: '🪵 Wood Borer',
      hotelcommercial: '🏨 Hotel / Commercial',
      other: '🔍 Other',
    };

    const mappedPests = pestTypes.map((pest) => {
      const key = pest.toLowerCase().replace(/[^a-z]/g, '');
      return pestMap[key] || pest;
    });

    return mappedPests.length > 1
      ? `Multiple Pests: ${mappedPests.join(', ')}`
      : mappedPests[0];
  }

  private formatServiceType(service: string): string {
    const serviceMap: Record<string, string> = {
      'mosquito-control': '🦟 Mosquitoes',
      'cockroach-control': '🪳 Cockroaches',
      'termite-control': '🐛 Termites',
      'bed-bug-control': '🛏️ Bed Bugs',
      'general-pest-control': 'General Pest Control',
      other: '🔍 Other',
    };

    return serviceMap[service] || service || 'General Pest Control';
  }

  private generateMessage(
    formData: {
      name?: string;
      phone?: string;
      email?: string;
      streetAddress?: string;
      address?: string;
      pestTypes?: string[];
      service?: string;
      premiseType?: string;
      societyProgram?: string;
      propertyName?: string;
      commercialPropertyType?: string;
      approxSqFt?: string;
      premiseSize?: string;
      estimatedPrice?: number;
      treatmentQuality?: string;
      preferredDate?: string;
      preferredTime?: string;
      message?: string;
    },
    formType: 'home' | 'quote',
    serviceFrequency?: string,
    leadSource?: string,
  ): string {
    const parts: string[] = [];
    const category = this.resolveLeadCategory(formData);

    if (leadSource) {
      parts.push(`Lead source: ${leadSource}.`);
    }

    const pageLabel = leadSource
      ? 'campaign landing page'
      : formType === 'home'
        ? 'home page'
        : 'quote page';
    parts.push(`Quote request from website ${pageLabel}.`);
    parts.push(`Category: ${category}.`);
    parts.push('Source: Website.');

    if (formData.propertyName) {
      const label =
        category === 'commercial'
          ? 'Business / property'
          : category.startsWith('society')
            ? 'Society'
            : 'Property';
      parts.push(`${label}: ${formData.propertyName}.`);
    }

    if (formData.commercialPropertyType) {
      parts.push(`Commercial property type: ${formData.commercialPropertyType}.`);
    }

    if (formData.approxSqFt) {
      parts.push(`Approx. area: ${formData.approxSqFt} sq. ft.`);
    }

    if (category === 'society-free') {
      parts.push(
        'FREE Society Programme — General Pest Control (Cockroach & Ants) + Rodent Control for approved common areas. 4 services / 12 months / ₹0 society cost.',
      );
    } else if (formData.pestTypes && formData.pestTypes.length > 0) {
      parts.push(`Pest problems: ${formData.pestTypes.join(', ')}.`);
    } else if (formData.service) {
      parts.push(`Service: ${formData.service}.`);
    }

    if (serviceFrequency && category === 'residential') {
      const label = serviceFrequency === 'amc' ? 'AMC 3 Services' : 'One-Time Service';
      parts.push(`Service type: ${label}.`);
    }

    if (formData.treatmentQuality && category === 'residential') {
      const quality =
        formData.treatmentQuality === 'premium'
          ? 'Premium (no-smell treatment)'
          : 'Standard (gel + spray)';
      parts.push(`Treatment quality: ${quality}.`);
    }

    if (formData.premiseType === 'residential' && formData.premiseSize) {
      parts.push(`Premise: residential (${formData.premiseSize.toUpperCase()}).`);
    }

    if (formData.preferredDate || formData.preferredTime) {
      const when = [formData.preferredDate, formData.preferredTime].filter(Boolean).join(' ');
      parts.push(`Preferred schedule: ${when}.`);
    }

    if (formData.estimatedPrice && formData.estimatedPrice > 0) {
      parts.push(`Estimated price: ₹${formData.estimatedPrice}.`);
    }

    const address = formData.streetAddress || formData.address;
    if (address) {
      parts.push(
        category.startsWith('society') || category === 'commercial'
          ? `Area / pincode: ${address}.`
          : `Property address: ${address}.`,
      );
    }

    if (category === 'society-free' || category === 'society-paid' || category === 'commercial') {
      parts.push('Customer requested free inspection / quotation.');
    } else {
      parts.push('Customer requested same-day quotation.');
    }

    return parts.join(' ');
  }
}

export const crmApi = new CRMApiService();
