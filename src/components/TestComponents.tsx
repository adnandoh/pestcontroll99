'use client';

import { useState } from 'react';
import MultiSelectPest from './MultiSelectPest';
import SuccessModal from './SuccessModal';

export default function TestComponents() {
  const [selectedPests, setSelectedPests] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="p-8 max-w-2xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold">Component Tests</h1>
      
      {/* Multi-Select Pest Test */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Multi-Select Pest Component</h2>
        <MultiSelectPest
          selectedPests={selectedPests}
          onChange={setSelectedPests}
        />
        <div className="mt-4 text-sm text-gray-600">
          Selected: {selectedPests.join(', ') || 'None'}
        </div>
      </div>

      {/* Success Modal Test */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Success Modal Component</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Show Success Modal
        </button>
      </div>

      <SuccessModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
}