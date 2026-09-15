import AddressAutocomplete from './AddressAutocomplete';
import { useState } from 'react';
import { getGeocode } from 'use-places-autocomplete';
import { getGoogleMapsApiKey, isGoogleMapsReady } from '@/config/env';

interface AddressInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  error?: string;
  label?: string;
  required?: boolean;
  /** Put GPS control inside the input (booking form design) */
  inlineLocate?: boolean;
}

export default function AddressInput({
  value,
  onChange,
  placeholder = 'Enter your street address',
  className = '',
  error,
  label = 'Street Address',
  required = false,
  inlineLocate = false,
}: AddressInputProps) {
  const [isLocating, setIsLocating] = useState(false);

  const handleAddressSelect = (address: string) => {
    onChange(address);
  };

  const handleLocationDetected = (address: string) => {
    onChange(address);
  };

  const detectLocation = async () => {
    setIsLocating(true);
    try {
      if (!getGoogleMapsApiKey() || !isGoogleMapsReady() || !navigator.geolocation) {
        return;
      }
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        });
      });
      const results = await getGeocode({
        location: { lat: position.coords.latitude, lng: position.coords.longitude },
      });
      if (results?.[0]?.formatted_address) {
        handleLocationDetected(results[0].formatted_address);
      }
    } catch {
      // Silent — user can type address
    } finally {
      setIsLocating(false);
    }
  };

  if (inlineLocate) {
    return (
      <div>
        {label ? (
          <label htmlFor="booking-address" className="booking-field-label">
            {label} {required ? <span className="text-[#0E8345]">*</span> : null}
          </label>
        ) : null}
        <div className={`booking-address-wrap${error ? ' booking-address-wrap-error' : ''}`}>
          <AddressAutocomplete
            value={value}
            onChange={onChange}
            onSelect={handleAddressSelect}
            placeholder={placeholder}
            className={`booking-address-input ${className}`}
            error={error}
          />
          <button
            type="button"
            className="booking-gps-btn"
            onClick={detectLocation}
            disabled={isLocating}
            aria-label="Use current location"
            title="Use current location"
          >
            {isLocating ? (
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
            ) : (
              <span className="booking-locate-glyph" aria-hidden>
                ⌖
              </span>
            )}
          </button>
        </div>
        {error ? <p className="mt-1 text-xs font-semibold text-red-600">{error}</p> : null}
      </div>
    );
  }

  return (
    <div>
      {label && (
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
          {label} {required && '*'}
        </label>
      )}
      <div className="flex flex-col gap-2">
        <AddressAutocomplete
          value={value}
          onChange={onChange}
          onSelect={handleAddressSelect}
          placeholder={placeholder}
          className={`w-full px-4 py-3 quote-field transition-all duration-200 ${error ? 'quote-field-error' : ''} ${className}`}
          error={error}
        />
        <div className="flex justify-end">
          <button
            type="button"
            onClick={detectLocation}
            disabled={isLocating}
            className="flex items-center justify-center text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 py-1 px-2 rounded"
          >
            {isLocating ? 'Detecting…' : 'Use Current Location'}
          </button>
        </div>
      </div>
    </div>
  );
}
