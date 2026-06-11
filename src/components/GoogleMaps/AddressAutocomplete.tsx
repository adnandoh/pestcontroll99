// Note: Google Maps Places API AutocompleteService is deprecated as of March 2025
// The use-places-autocomplete library still uses the deprecated API
// This will continue to work but should be updated when the library supports the new API
// See: https://developers.google.com/maps/documentation/javascript/places-migration-overview

import { useState, useEffect, useRef, KeyboardEvent } from 'react';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
  Suggestion,
} from 'use-places-autocomplete';

/** Minimum typed characters before Places autocomplete API is called */
const MIN_SEARCH_LENGTH = 3;

interface AddressAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onSelect?: (address: string, lat: number, lng: number) => void;
  placeholder?: string;
  className?: string;
  error?: string;
}

function shouldFetchSuggestions(text: string): boolean {
  return text.trim().length >= MIN_SEARCH_LENGTH;
}

function InnerAutocomplete({
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
      setValue(value, shouldFetchSuggestions(value));
      if (!shouldFetchSuggestions(value)) {
        clearSuggestions();
      }
    }
  }, [value, setValue, inputValue, clearSuggestions]);

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
    const next = e.target.value;
    onChange(next);
    setIsFocused(true);
    setSelectedIndex(-1);

    if (!next.trim() || !shouldFetchSuggestions(next)) {
      setValue(next, false);
      clearSuggestions();
      return;
    }

    setValue(next, true);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // Only handle keyboard navigation when suggestions are visible
    if (!isFocused || !shouldFetchSuggestions(inputValue) || status !== 'OK' || !data.length) return;

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
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`${className} pr-10`}
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 z-10"
            aria-label="Clear input"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          placeholder={placeholder}
          className={`${className} pr-10`}
        />
        {inputValue && (
          <button
            type="button"
            onClick={() => {
              setValue("", false);
              onChange("");
              clearSuggestions();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 z-10"
            aria-label="Clear input"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}

      {isFocused && inputValue && !shouldFetchSuggestions(inputValue) && (
        <p className="mt-1 text-xs text-gray-500">
          Type at least {MIN_SEARCH_LENGTH} characters for address suggestions.
        </p>
      )}

      {/* Suggestions dropdown */}
      {isFocused && shouldFetchSuggestions(inputValue) && status === 'OK' && (
        <div className="absolute z-40 mt-2 w-full bg-white shadow-2xl rounded-xl border border-gray-100 max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-2">
          {data.map((suggestion, index) => (
            <div
              key={suggestion.place_id}
              ref={(el: HTMLDivElement | null) => { suggestionsRef.current[index] = el; }}
              onClick={handleSelect(suggestion)}
              className={`px-4 py-3 cursor-pointer text-gray-700 text-sm flex items-center transition-colors duration-150 ${selectedIndex === index ? 'bg-green-50 text-green-900' : 'hover:bg-gray-50'}`}
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
      {isFocused && shouldFetchSuggestions(inputValue) && status === 'ZERO_RESULTS' && (
        <div className="absolute z-40 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 p-3 text-sm text-gray-500">
          No results found for this search. Try a different address.
        </div>
      )}
    </div>
  );
}

export default function AddressAutocomplete(props: AddressAutocompleteProps) {
  const { value, onChange, placeholder = 'Enter your address', className = '', error } = props;

  const [mapsReady, setMapsReady] = useState(false);

  useEffect(() => {
    const onReady = () => setMapsReady(true);

    // If already available, mark ready immediately
    if (typeof window !== 'undefined' && (window as Window & { google?: { maps?: { places?: unknown } } }).google?.maps?.places) {
      setMapsReady(true);
    } else {
      // Listen for our global ready event if provided
      if (typeof window !== 'undefined') {
        window.addEventListener('gmaps:ready', onReady);
      }
      // Poll as a fallback in case the event is missed
      let isActive = true;
      const poll = () => {
        if (!isActive) return;
        if (typeof window !== 'undefined' && (window as Window & { google?: { maps?: { places?: unknown } } }).google?.maps?.places) {
          setMapsReady(true);
        } else {
          setTimeout(poll, 100);
        }
      };
      poll();
      return () => {
        isActive = false;
        if (typeof window !== 'undefined') {
          window.removeEventListener('gmaps:ready', onReady);
        }
      };
    }
  }, []);

  if (!mapsReady) {
    return (
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`${className} pr-10`}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }

  return <InnerAutocomplete {...props} />;
}
