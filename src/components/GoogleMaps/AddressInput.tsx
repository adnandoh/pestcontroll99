
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
  const handleAddressSelect = (address: string) => {
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
          className={`w-full px-4 py-3 quote-field transition-all duration-200 ${error ? 'quote-field-error' : ''} ${className}`}
          error={error}
        />
        <div className="flex justify-end">
          <LocationDetector onLocationDetected={handleLocationDetected} />
        </div>
      </div>
    </div>
  );
}
