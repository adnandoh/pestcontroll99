'use client';

import { useState, useRef, useEffect } from 'react';

interface PestOption {
  value: string;
  label: string;
  icon: string;
}

interface MultiSelectPestProps {
  selectedPests: string[];
  onChange: (selectedPests: string[]) => void;
  className?: string;
}

const pestOptions: PestOption[] = [
  { value: 'ants', label: 'Ants', icon: '🐜' },
  { value: 'cockroaches', label: 'Cockroaches', icon: '🪳' },
  { value: 'termites', label: 'Termites', icon: '🐛' },
  { value: 'rodents', label: 'Rodents (Mice/Rats)', icon: '🐭' },
  { value: 'spiders', label: 'Spiders', icon: '🕷️' },
  { value: 'wasps', label: 'Wasps/Bees', icon: '🐝' },
  { value: 'bedbugs', label: 'Bed Bugs', icon: '🛏️' },
  { value: 'fleas', label: 'Fleas', icon: '🦟' },
  { value: 'mosquitoes', label: 'Mosquitoes', icon: '🦟' },
  { value: 'flies', label: 'House Flies', icon: '🪰' },
  { value: 'other', label: 'Other', icon: '🔍' }
];

export default function MultiSelectPest({ selectedPests, onChange, className = '' }: MultiSelectPestProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleTogglePest = (pestValue: string) => {
    const newSelected = selectedPests.includes(pestValue)
      ? selectedPests.filter(p => p !== pestValue)
      : [...selectedPests, pestValue];
    onChange(newSelected);
  };

  const getDisplayText = () => {
    if (selectedPests.length === 0) return 'Select pest types';
    if (selectedPests.length === 1) {
      const pest = pestOptions.find(p => p.value === selectedPests[0]);
      return pest ? pest.label : selectedPests[0];
    }
    return `${selectedPests.length} pest types selected`;
  };

  const getSelectedIcons = () => {
    return selectedPests
      .map(pestValue => pestOptions.find(p => p.value === pestValue))
      .filter(Boolean)
      .slice(0, 3) // Show max 3 icons
      .map(pest => pest!.icon);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Type of Pest Issues *
      </label>
      
      {/* Dropdown Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-left flex items-center justify-between ${
          selectedPests.length > 0 ? 'border-green-300 bg-green-50' : 'border-gray-300 bg-white'
        }`}
      >
        <div className="flex items-center gap-2">
          {/* Show selected pest icons */}
          {getSelectedIcons().map((icon, index) => (
            <span key={index} className="text-lg">{icon}</span>
          ))}
          <span className={selectedPests.length > 0 ? 'text-green-700 font-medium' : 'text-gray-500'}>
            {getDisplayText()}
          </span>
        </div>
        
        <svg 
          className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-y-auto">
          <div className="p-2">
            <div className="text-xs text-gray-500 mb-2 px-2">Select all that apply:</div>
            {pestOptions.map((pest) => (
              <label
                key={pest.value}
                className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer transition-colors duration-150"
              >
                <input
                  type="checkbox"
                  checked={selectedPests.includes(pest.value)}
                  onChange={() => handleTogglePest(pest.value)}
                  className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                />
                <span className="ml-3 text-lg">{pest.icon}</span>
                <span className="ml-2 text-sm text-gray-700">{pest.label}</span>
              </label>
            ))}
          </div>
          
          {/* Quick Actions */}
          <div className="border-t border-gray-200 p-2 bg-gray-50">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => onChange(pestOptions.map(p => p.value))}
                className="text-xs text-green-600 hover:text-green-700 font-medium"
              >
                Select All
              </button>
              <span className="text-xs text-gray-300">|</span>
              <button
                type="button"
                onClick={() => onChange([])}
                className="text-xs text-gray-500 hover:text-gray-700 font-medium"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Selected Count Badge */}
      {selectedPests.length > 0 && (
        <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
          {selectedPests.length}
        </div>
      )}
    </div>
  );
}