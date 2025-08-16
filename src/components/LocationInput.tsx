'use client';

import { useState, useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

interface LocationInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  error?: string;
  label?: string;
  required?: boolean;
}

export default function LocationInput({
  value,
  onChange,
  placeholder = "Enter your street address",
  className = "",
  error,
  label = "Street Address",
  required = false
}: LocationInputProps) {
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [isMapLoading, setIsMapLoading] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [markerPosition, setMarkerPosition] = useState({ lat: 18.5204, lng: 73.8567 }); // Pune coordinates
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  // Load Google Maps script
  const loadGoogleMapsScript = () => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      console.error('Google Maps API key is not set. Please set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in your environment.');
      return;
    }

    if (window.google?.maps?.places?.Autocomplete) {
      setIsMapLoaded(true);
      return;
    }

    if (isMapLoading) return; // Prevent multiple loading attempts

    setIsMapLoading(true);

    const loader = new Loader({
      apiKey,
      version: "weekly",
      libraries: ["places"],
    });

    loader.load().then(() => {
      // Add a small delay to ensure all libraries are fully loaded
      setTimeout(() => {
        setIsMapLoaded(true);
        setIsMapLoading(false);
      }, 100);
    }).catch((error) => {
      console.error('Error loading Google Maps:', error);
      setIsMapLoading(false);
    });
  };

  // Initialize autocomplete when maps is loaded
  useEffect(() => {
    if (isMapLoaded && inputRef.current && !autocomplete && window.google?.maps?.places?.Autocomplete) {
      try {
        const autocompleteInstance = new window.google.maps.places.Autocomplete(inputRef.current, {
          types: ['address'],
          componentRestrictions: { country: 'IN' }, // Restrict to India
          fields: ['formatted_address', 'geometry', 'address_components']
        });

        autocompleteInstance.addListener('place_changed', () => {
          const place = autocompleteInstance.getPlace();
          if (place.formatted_address) {
            onChange(place.formatted_address);
            if (place.geometry?.location) {
              setMarkerPosition({
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
              });
            }
          }
        });

        setAutocomplete(autocompleteInstance);
      } catch (error) {
        console.error('Error initializing autocomplete:', error);
      }
    }
  }, [isMapLoaded, onChange, autocomplete]);

  // Get user's current location
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser.');
      return;
    }

    setIsGettingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setMarkerPosition({ lat: latitude, lng: longitude });

        // Reverse geocode to get address
        try {
          const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
          );
          const data = await response.json();

          if (data.results && data.results[0]) {
            onChange(data.results[0].formatted_address);
          }
        } catch (error) {
          console.error('Error getting address:', error);
        } finally {
          setIsGettingLocation(false);
        }
      },
      (error) => {
        console.error('Error getting location:', error);
        setIsGettingLocation(false);
        
        let errorMessage = 'Unable to get your location. ';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage += 'Please allow location access and try again.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage += 'Location information is unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage += 'Location request timed out.';
            break;
          default:
            errorMessage += 'An unknown error occurred.';
            break;
        }
        alert(errorMessage);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  // Open map modal and load script if needed
  const handleOpenMapModal = () => {
    setShowMapModal(true);
    if (!isMapLoaded) loadGoogleMapsScript();
  };

  // Close map modal
  const handleCloseMapModal = () => {
    setShowMapModal(false);
  };

  // Initialize map and marker when modal opens
  useEffect(() => {
    if (showMapModal && isMapLoaded && mapRef.current && window.google?.maps?.Map) {
      try {
        const map = new window.google.maps.Map(mapRef.current, {
          center: markerPosition,
          zoom: 16,
        });

        const marker = new window.google.maps.Marker({
          position: markerPosition,
          map,
          draggable: true,
        });

        marker.addListener("dragend", async (e: google.maps.MapMouseEvent) => {
          if (e.latLng) {
            const lat = e.latLng.lat();
            const lng = e.latLng.lng();
            setMarkerPosition({ lat, lng });

            // Reverse geocode
            try {
              const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
              const res = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
              );
              const data = await res.json();
              if (data.results && data.results[0]) {
                onChange(data.results[0].formatted_address);
              }
            } catch (error) {
              console.error('Error reverse geocoding:', error);
            }
          }
        });
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    }
  }, [showMapModal, isMapLoaded, markerPosition, onChange]);

  // Load Google Maps on component mount
  useEffect(() => {
    loadGoogleMapsScript();
  }, []);

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label} {required && '*'}
        </label>
      )}
      
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full p-3 pr-24 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm sm:text-base ${
            error ? 'border-red-300' : 'border-gray-300'
          } ${className}`}
        />
        
        {/* Location buttons */}
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
          <button
            type="button"
            onClick={getCurrentLocation}
            disabled={isGettingLocation}
            className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors disabled:opacity-50"
            title="Use my current location"
          >
            {isGettingLocation ? (
              <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            )}
          </button>
          
          <button
            type="button"
            onClick={handleOpenMapModal}
            className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-md transition-colors"
            title="Select on map"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
          </button>
        </div>
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}

      {/* Map Modal */}
      {showMapModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full mx-4 relative">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Select Your Location</h3>
              <button
                onClick={handleCloseMapModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div 
              ref={mapRef} 
              className="w-full h-96 rounded-lg border border-gray-300"
            />
            
            <p className="text-sm text-gray-600 mt-3">
              Drag the marker to adjust your exact location
            </p>
            
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={handleCloseMapModal}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCloseMapModal}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Confirm Location
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}