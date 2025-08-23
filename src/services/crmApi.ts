// CRM API Integration Service
// This service handles all communication with your CRM inquiry system

export interface InquiryData {
    name: string;
    mobile: string;
    email?: string;
    city: string;
    service_interest: string;
    message: string;
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
        // Use environment variable for API URL, with smart fallback based on environment
        const envUrl = process.env.NEXT_PUBLIC_CRM_API_URL;
        
        if (envUrl) {
            // If environment variable is set, use it (highest priority)
            this.baseUrl = envUrl;
        } else if (process.env.NODE_ENV === 'development') {
            // In development, use local backend
            this.baseUrl = 'http://localhost:8000';
        } else {
            // In production, use Railway backend
            this.baseUrl = 'https://pestcontrol-backend-production.up.railway.app';
        }
        
        console.log(`🔗 CRM API configured for ${process.env.NODE_ENV}: ${this.baseUrl}`);
    }

    /**
     * Get authentication headers
     */
    private getAuthHeaders(): Record<string, string> {
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };

        return headers;
    }

    /**
     * Submit inquiry to CRM system
     */
    async submitInquiry(inquiryData: InquiryData): Promise<ApiResponse<InquiryResponse>> {
        try {
            const response = await fetch(`${this.baseUrl}/api/inquiries/`, {
                method: 'POST',
                headers: this.getAuthHeaders(),
                body: JSON.stringify(inquiryData),
            });

            // Try to parse JSON; if HTML is returned (e.g., error page), handle gracefully
            let result: any = null;
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
                    data: result,
                };
            } else {
                return {
                    success: false,
                    error: result.message || result.detail || 'Failed to submit inquiry',
                    errors: result.errors || result,
                };
            }
        } catch (error) {
            console.error('CRM API Error:', error);
            return {
                success: false,
                error: 'Network error occurred. Please check your connection and try again.',
            };
        }
    }

    /**
     * Validate inquiry data before submission
     */
    validateInquiryData(data: Partial<InquiryData>): { isValid: boolean; errors: Record<string, string> } {
        const errors: Record<string, string> = {};

        // Name validation
        if (!data.name || data.name.trim().length < 2) {
            errors.name = 'Name must be at least 2 characters long';
        }

        // Mobile validation
        if (!data.mobile || !/^\d{10}$/.test(data.mobile.replace(/\D/g, ''))) {
            errors.mobile = 'Mobile number must be exactly 10 digits';
        }

        // Email validation (optional)
        if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            errors.email = 'Please enter a valid email address';
        }

        // City validation
        if (!data.city || data.city.trim().length < 2) {
            errors.city = 'City is required';
        }

        // Service interest validation
        if (!data.service_interest) {
            errors.service_interest = 'Please select a service type';
        }

        // Message validation
        if (!data.message || data.message.trim().length < 10) {
            errors.message = 'Message must be at least 10 characters long';
        }

        return {
            isValid: Object.keys(errors).length === 0,
            errors,
        };
    }

    /**
     * Map form data to CRM inquiry format
     */
    mapFormDataToInquiry(formData: any, formType: 'home' | 'quote'): InquiryData {
        if (formType === 'home') {
            // Map HomeQuoteForm data
            return {
                name: formData.name || '',
                mobile: formData.phone || '',
                email: formData.email || '',
                city: this.extractCityFromAddress(formData.streetAddress || formData.address || ''),
                service_interest: this.formatPestTypes(formData.pestTypes || []),
                message: this.generateMessage(formData, 'home'),
            };
        } else {
            // Map QuoteForm data (same structure as home form in our UI)
            return {
                name: formData.name || '',
                mobile: formData.phone || '',
                email: formData.email || '',
                city: this.extractCityFromAddress(formData.streetAddress || formData.address || ''),
                service_interest: this.formatPestTypes(formData.pestTypes || []),
                message: this.generateMessage(formData, 'quote'),
            };
        }
    }

    /**
     * Extract city from address string
     */
    private extractCityFromAddress(address: string): string {
        if (!address) return 'Mumbai'; // Default city

        const addressLower = address.toLowerCase();

        // Check for major cities
        if (addressLower.includes('mumbai') || addressLower.includes('bombay')) return 'Mumbai';
        if (addressLower.includes('pune')) return 'Pune';
        if (addressLower.includes('navi mumbai') || addressLower.includes('new mumbai')) return 'Navi Mumbai';
        if (addressLower.includes('thane')) return 'Thane';

        // Extract potential city from address parts
        const parts = address.split(',').map(part => part.trim());
        if (parts.length > 1) {
            return parts[parts.length - 1] || 'Mumbai';
        }

        return 'Mumbai'; // Default fallback
    }

    /**
     * Format pest types array to service interest string
     */
    private formatPestTypes(pestTypes: string[]): string {
        if (!pestTypes || pestTypes.length === 0) {
            return 'General Pest Control';
        }

        // Map pest types to CRM format
        const pestMap: Record<string, string> = {
            'ants': '🐜 Ants',
            'cockroaches': '🪳 Cockroaches',
            'termites': '🐛 Termites',
            'rodents': '🐭 Rodents (Mice/Rats)',
            'spiders': '🕷️ Spiders',
            'wasps': '🐝 Wasps/Bees',
            'bed-bugs': '🛏️ Bed Bugs',
            'fleas': '🦟 Fleas',
            'mosquitoes': '🦟 Mosquitoes',
            'flies': '🪰 House Flies',
        };

        const mappedPests = pestTypes.map(pest => {
            const key = pest.toLowerCase().replace(/[^a-z]/g, '');
            return pestMap[key] || pest;
        });

        return mappedPests.length > 1
            ? `Multiple Pests: ${mappedPests.join(', ')}`
            : mappedPests[0];
    }

    /**
     * Format service type to CRM format
     */
    private formatServiceType(service: string): string {
        const serviceMap: Record<string, string> = {
            'mosquito-control': '🦟 Mosquitoes',
            'cockroach-control': '🪳 Cockroaches',
            'termite-control': '🐛 Termites',
            'bed-bug-control': '🛏️ Bed Bugs',
            'general-pest-control': 'General Pest Control',
            'other': '🔍 Other',
        };

        return serviceMap[service] || service || 'General Pest Control';
    }

    /**
     * Generate message for home form
     */
    private generateMessage(formData: any, formType: 'home' | 'quote'): string {
        const parts = [] as string[];

        parts.push(`Quote request from website ${formType === 'home' ? 'home page' : 'quote page'}.`);

        if (formData.pestTypes && formData.pestTypes.length > 0) {
            parts.push(`Pest problems: ${formData.pestTypes.join(', ')}`);
        }

        const address = formData.streetAddress || formData.address;
        if (address) {
            parts.push(`Property address: ${address}`);
        }

        parts.push('Customer requested same-day quotation.');

        return parts.join(' ');
    }
}

// Export singleton instance
export const crmApi = new CRMApiService();