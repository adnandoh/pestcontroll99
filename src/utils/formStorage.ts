// Utility functions for storing and retrieving form data

export interface HomeFormData {
  pestTypes: string[];
  propertyType: string;
  propertySize: string;
  name?: string;
  phone?: string;
  email?: string;
}

export interface QuoteFormData {
  phone: string;
  email: string;
  address: string;
  propertyType: string;
  propertySize: string;
  pestTypes: string[];
  additionalDetails?: string;
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
  if (data.propertyType) {
    params.set('propertyType', data.propertyType);
  }
  if (data.propertySize) {
    params.set('propertySize', data.propertySize);
  }
  if (data.name) {
    params.set('name', data.name);
  }
  if (data.phone) {
    params.set('phone', data.phone);
  }
  if (data.email) {
    params.set('email', data.email);
  }
  
  return params.toString();
};

export const decodeFormDataFromURL = (searchParams: URLSearchParams): Partial<QuoteFormData> => {
  const data: Partial<QuoteFormData> = {};
  
  const pests = searchParams.get('pests');
  if (pests) {
    data.pestTypes = pests.split(',').filter(Boolean);
  }
  
  const propertyType = searchParams.get('propertyType');
  if (propertyType) {
    data.propertyType = propertyType;
  }
  
  const propertySize = searchParams.get('propertySize');
  if (propertySize) {
    data.propertySize = propertySize;
  }
  
  const phone = searchParams.get('phone');
  if (phone) {
    data.phone = phone;
  }
  
  const email = searchParams.get('email');
  if (email) {
    data.email = email;
  }
  
  return data;
};