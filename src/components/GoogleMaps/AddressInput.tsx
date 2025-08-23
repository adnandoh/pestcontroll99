'use client';


import AddressAutocomplete from './AddressAutocomplete';
import LocationDetector from './LocationDetector';

interface AddressInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  error?: string;
  label?: string;
  required?: boolean;
}

export default function AddressInput({
  value,
  onChange,
  placeholder = 'Enter your street address',
  className = '',
  error,
  label = 'Street Address',
  required = false,
}: AddressInputProps) {
  const handleAddressSelect = (address: string, _lat: number, _lng: number) => {
    onChange(address);
    // Coordinates are received but not used in this component
  };

  const handleLocationDetected = (address: string) => {
    onChange(address);
  };

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
          className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
            error ? 'border-red-300' : 'border-gray-300'
          } ${className}`}
          error={error}
        />
        <div className="flex justify-end">
          <LocationDetector onLocationDetected={handleLocationDetected} />
        </div>
      </div>
    </div>
  );
}