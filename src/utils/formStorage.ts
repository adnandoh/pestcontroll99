// Utility functions for storing and retrieving form data

import { getDefaultPreferredSchedule } from '@/utils/clockTime';

export interface HomeFormData {
  pestTypes: string[];
  phone: string;
  address?: string;
  streetAddress: string;
  name: string;
  /** Defaults to Residential on the home booking form */
  premiseType?: 'residential' | 'commercial' | '';
  premiseSize?: string;
  serviceType?: 'amc' | 'one-time' | '';
  /** Standard (gel+spray) vs Premium (no-smell) — maps to booking package_tier */
  treatmentQuality?: 'standard' | 'premium' | '';
  preferredDate?: string;
  preferredTime?: string;
  estimatedPrice?: number;
}

/**
 * Fresh home booking defaults (Residential + Cockroach / Ants).
 * Preferred date/time are computed at call time (today; early morning → 8:00 AM,
 * otherwise now+1h).
 */
export function createEmptyHomeFormData(): HomeFormData {
  const { preferredDate, preferredTime } = getDefaultPreferredSchedule();
  return {
    pestTypes: ['cockroach-ants'],
    phone: '',
    address: '',
    streetAddress: '',
    name: '',
    premiseType: 'residential',
    premiseSize: '',
    serviceType: '',
    treatmentQuality: '',
    preferredDate,
    preferredTime,
    estimatedPrice: 0,
  };
}

/** Structural empty shape — use createEmptyHomeFormData() for mount defaults */
export const EMPTY_HOME_FORM_DATA: HomeFormData = {
  pestTypes: ['cockroach-ants'],
  phone: '',
  address: '',
  streetAddress: '',
  name: '',
  premiseType: 'residential',
  premiseSize: '',
  serviceType: '',
  treatmentQuality: '',
  preferredDate: '',
  preferredTime: '',
  estimatedPrice: 0,
};

export interface QuoteFormData {
  name?: string;
  phone: string;
  address: string;
  streetAddress?: string;
  pestTypes: string[];
}

const STORAGE_KEY = 'pestcontrol_form_data';

export const saveFormData = (data: HomeFormData): void => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.warn('Failed to save form data to localStorage:', error);
    }
  }
};

export const getFormData = (): HomeFormData | null => {
  if (typeof window !== 'undefined') {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.warn('Failed to retrieve form data from localStorage:', error);
      return null;
    }
  }
  return null;
};

export const clearFormData = (): void => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.warn('Failed to clear form data from localStorage:', error);
    }
  }
};

// URL parameter utilities for passing data between pages
export const encodeFormDataToURL = (data: HomeFormData): string => {
  const params = new URLSearchParams();

  if (data.pestTypes.length > 0) {
    params.set('pests', data.pestTypes.join(','));
  }
  if (data.phone) {
    params.set('phone', data.phone);
  }
  if (data.address) {
    params.set('address', data.address);
  }
  if (data.streetAddress) {
    params.set('streetAddress', data.streetAddress);
  }
  if (data.name) {
    params.set('name', data.name);
  }

  return params.toString();
};

export const decodeFormDataFromURL = (searchParams: URLSearchParams): Partial<QuoteFormData> => {
  const data: Partial<QuoteFormData> = {};

  const pests = searchParams.get('pests');
  if (pests) {
    data.pestTypes = pests.split(',').filter(Boolean);
  }

  const phone = searchParams.get('phone');
  if (phone) {
    data.phone = phone;
  }

  const address = searchParams.get('address');
  if (address) {
    data.address = address;
  }

  const streetAddress = searchParams.get('streetAddress');
  if (streetAddress) {
    data.streetAddress = streetAddress; // Keep streetAddress separate for quote form
    data.address = streetAddress; // Also map to address for backward compatibility
  }

  const name = searchParams.get('name');
  if (name) {
    data.name = name;
  }

  return data;
};