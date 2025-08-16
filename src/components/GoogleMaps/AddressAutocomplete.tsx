'use client';

import { useState, useEffect, useRef, KeyboardEvent } from 'react';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
  Suggestion,
} from 'use-places-autocomplete';

interface AddressAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onSelect?: (address: string, lat: number, lng: number) => void;
  placeholder?: string;
  className?: string;
  error?: string;
}

export default function AddressAutocomplete({
  value,
  onChange,
  onSelect,
  placeholder = 'Enter your address',
  className = '',
  error,
}: AddressAutocompleteProps) {

  const [isFocused, setIsFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const suggestionsRef = useRef<(HTMLDivElement | null)[]>([]);

  const {
    ready,
    value: inputValue,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: { country: 'in' }, // Restrict to India
    },
    debounce: 300,
    defaultValue: value,
    cache: false, // Disable cache to ensure fresh results
  });

  // Update the internal value when the external value changes
  useEffect(() => {
    if (value !== inputValue) {
      setValue(value, false);
    }
  }, [value, setValue, inputValue]);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(value);
    onChange(value);
    setIsFocused(true); // Ensure dropdown stays open while typing
    setSelectedIndex(-1); // Reset selected index when typing
    
    // If the input is empty, clear suggestions
    if (!value.trim()) {
      clearSuggestions();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // Only handle keyboard navigation when suggestions are visible
    if (!isFocused || !inputValue || status !== 'OK' || !data.length) return;

    // Handle arrow down (select next suggestion)
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prevIndex => {
        const newIndex = prevIndex < data.length - 1 ? prevIndex + 1 : 0;
        // Scroll the selected item into view if needed
        if (suggestionsRef.current[newIndex]) {
          suggestionsRef.current[newIndex]?.scrollIntoView({ block: 'nearest' });
        }
        return newIndex;
      });
    }
    
    // Handle arrow up (select previous suggestion)
    else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prevIndex => {
        const newIndex = prevIndex > 0 ? prevIndex - 1 : data.length - 1;
        // Scroll the selected item into view if needed
        if (suggestionsRef.current[newIndex]) {
          suggestionsRef.current[newIndex]?.scrollIntoView({ block: 'nearest' });
        }
        return newIndex;
      });
    }
    
    // Handle Enter key (select the currently highlighted suggestion)
    else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      handleSelect(data[selectedIndex])();
    }
    
    // Handle Escape key (close suggestions)
    else if (e.key === 'Escape') {
      setIsFocused(false);
    }
  };

  const handleSelect = (suggestion: Suggestion) => () => {
    setValue(suggestion.description, false);
    onChange(suggestion.description);
    clearSuggestions();
    setIsFocused(false);

    // Get latitude and longitude for the selected address
    getGeocode({ address: suggestion.description }).then((results) => {
      const { lat, lng } = getLatLng(results[0]);
      if (onSelect) {
        onSelect(suggestion.description, lat, lng);
      }
    });
  };

  if (!ready) {
    return (
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={className}
        disabled
      />
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        placeholder={placeholder}
        className={className}
        disabled={!ready}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      
      {/* Suggestions dropdown */}
      {isFocused && inputValue && status === 'OK' && (
        <div className="absolute z-40 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 max-h-60 overflow-y-auto">
          {data.map((suggestion, index) => (
            <div
              key={suggestion.place_id}
              ref={(el: HTMLDivElement | null) => { suggestionsRef.current[index] = el; }}
              onClick={handleSelect(suggestion)}
              className={`px-4 py-2 cursor-pointer text-gray-700 text-sm flex items-center ${selectedIndex === index ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
            >
              <svg 
                className="w-4 h-4 mr-2 text-gray-500 flex-shrink-0" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
                />
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
                />
              </svg>
              <span>{suggestion.description}</span>
            </div>
          ))}
        </div>
      )}
      {isFocused && inputValue && status === 'ZERO_RESULTS' && (
        <div className="absolute z-40 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 p-3 text-sm text-gray-500">
          No results found for this search. Try a different address.
        </div>
      )}
    </div>
  );
}