import { getApiBase } from '@/config/env';

export interface InquiryData {
  name: string;
  mobile: string;
  email?: string;
  city: string;
  service_interest: string;
  message: string;
  premise_type?: string;
  premise_size?: string;
  pest_problems?: string;
  estimated_price?: number;
  is_inspection_required?: boolean;
  service_frequency?: string;
}

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
  private baseUrl: string;

  constructor() {
    const envUrl = import.meta.env.VITE_CRM_API_URL;
    if (envUrl) {
      this.baseUrl = envUrl.replace(/\/$/, '');
    } else if (import.meta.env.DEV) {
      this.baseUrl = '';
    } else {
      this.baseUrl = 'https://api.vacationbna.site';
    }
  }

  private apiPath(path: string): string {
    if (!this.baseUrl) {
      return path;
    }
    return `${this.baseUrl}${path}`;
  }

  private getAuthHeaders(): Record<string, string> {
    return {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
  }

  async submitInquiry(inquiryData: InquiryData): Promise<ApiResponse<InquiryResponse>> {
    try {
      const response = await fetch(this.apiPath('/api/inquiries/'), {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(inquiryData),
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

      const errorResult = result as {
        message?: string;
        detail?: string;
        errors?: Record<string, string[]>;
      };
      return {
        success: false,
        error: errorResult.message || errorResult.detail || 'Failed to submit inquiry',
        errors: errorResult.errors,
      };
    } catch (error) {
      console.error('CRM API Error:', error);

      if (import.meta.env.DEV && !this.baseUrl) {
        try {
          const fallbackResponse = await fetch('https://api.vacationbna.site/api/inquiries/', {
            method: 'POST',
            headers: this.getAuthHeaders(),
            body: JSON.stringify(inquiryData),
          });

          if (fallbackResponse.ok) {
            const fallbackResult = await fallbackResponse.json();
            return {
              success: true,
              data: fallbackResult as InquiryResponse,
            };
          }
        } catch (fallbackError) {
          console.error('Fallback to production backend also failed:', fallbackError);
        }
      }

      return {
        success: false,
        error: 'Network error occurred. Please check your connection and try again.',
      };
    }
  }

  validateInquiryData(data: Partial<InquiryData>): { isValid: boolean; errors: Record<string, string> } {
    const errors: Record<string, string> = {};

    if (!data.name || data.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters long';
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
      premiseSize?: string;
      estimatedPrice?: number;
      serviceType?: string;
    },
    formType: 'home' | 'quote',
  ): InquiryData {
    const oneTimeOnlyPests = ['rodent', 'bedbugs', 'termite', 'mosquito'];
    const oneTimeOnlyServices = [
      'Rodent Control',
      'Bed Bug Control',
      'Termite Control',
      'Mosquito Control',
      'Other',
    ];
    const forcedOneTime =
      formData.pestTypes?.some((p: string) => oneTimeOnlyPests.includes(p)) ||
      oneTimeOnlyServices.includes(formData.service || '');
    const serviceFrequency = forcedOneTime ? 'one-time' : formData.serviceType || 'one-time';

    return {
      name: formData.name || '',
      mobile: formData.phone || '',
      email: formData.email || '',
      city: this.extractCityFromAddress(formData.streetAddress || formData.address || ''),
      service_interest:
        formType === 'quote' && formData.service
          ? this.formatServiceType(formData.service)
          : this.formatPestTypes(formData.pestTypes || []),
      message: this.generateMessage(formData, formType, serviceFrequency),
      premise_type: formData.premiseType || 'residential',
      premise_size: formData.premiseSize || '',
      pest_problems: (formData.pestTypes || []).join(', '),
      estimated_price: formData.estimatedPrice || 0,
      is_inspection_required:
        formData.premiseType === 'commercial' || formData.estimatedPrice === 0,
      service_frequency: serviceFrequency,
    };
  }

  private extractCityFromAddress(address: string): string {
    if (!address) return 'Mumbai';

    const addressLower = address.toLowerCase();
    if (addressLower.includes('mumbai') || addressLower.includes('bombay')) return 'Mumbai';
    if (addressLower.includes('pune')) return 'Pune';
    if (addressLower.includes('navi mumbai') || addressLower.includes('new mumbai')) return 'Navi Mumbai';
    if (addressLower.includes('thane')) return 'Thane';

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
      termites: '🐛 Termites',
      rodents: '🐭 Rodents (Mice/Rats)',
      spiders: '🕷️ Spiders',
      wasps: '🐝 Wasps/Bees',
      'bed-bugs': '🛏️ Bed Bugs',
      fleas: '🦟 Fleas',
      mosquitoes: '🦟 Mosquitoes',
      flies: '🪰 House Flies',
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
      premiseSize?: string;
      estimatedPrice?: number;
    },
    formType: 'home' | 'quote',
    serviceFrequency?: string,
  ): string {
    const parts: string[] = [];

    parts.push(
      `Quote request from website ${formType === 'home' ? 'home page' : 'quote page'}.`,
    );

    if (formData.pestTypes && formData.pestTypes.length > 0) {
      parts.push(`Pest problems: ${formData.pestTypes.join(', ')}.`);
    } else if (formData.service) {
      parts.push(`Service: ${formData.service}.`);
    }

    if (serviceFrequency) {
      const label = serviceFrequency === 'amc' ? 'AMC 3 Services' : 'One-Time Service';
      parts.push(`Service type: ${label}.`);
    }

    if (formData.premiseType) {
      parts.push(
        `Premise: ${formData.premiseType}${formData.premiseSize ? ` (${formData.premiseSize.toUpperCase()})` : ''}.`,
      );
    }

    if (formData.estimatedPrice && formData.estimatedPrice > 0) {
      parts.push(`Estimated price: ₹${formData.estimatedPrice}.`);
    }

    const address = formData.streetAddress || formData.address;
    if (address) {
      parts.push(`Property address: ${address}.`);
    }

    parts.push('Customer requested same-day quotation.');

    return parts.join(' ');
  }
}

export const crmApi = new CRMApiService();
