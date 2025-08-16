'use client';

import { useState } from 'react';
import LocationInput from '@/components/LocationInput';

export default function TestLocationInput() {
  const [address, setAddress] = useState('');

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Test Location Input Component
        </h1>
        
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <LocationInput
            value={address}
            onChange={setAddress}
            placeholder="Enter your address or use location features"
            label="Test Address Input"
            required={true}
          />
          
          {address && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">Selected Address:</h3>
              <p className="text-green-700">{address}</p>
            </div>
          )}
          
          <div className="mt-8 text-sm text-gray-600">
            <h3 className="font-semibold mb-2">Features to test:</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Type to get autocomplete suggestions</li>
              <li>Click the location icon to use your current location</li>
              <li>Click the map icon to select location on map</li>
              <li>Drag the marker on the map to fine-tune location</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}