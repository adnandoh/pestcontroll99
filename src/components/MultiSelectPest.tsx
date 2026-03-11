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
        Type of Pest Problem *
      </label>

      {/* Dropdown Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full pl-4 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-left flex items-center justify-between transition-all duration-200 ${selectedPests.length > 0
            ? 'border-green-300 bg-green-50/50 text-green-900'
            : 'border-gray-200 bg-gray-50 hover:border-green-300 focus:bg-white'
          }`}
      >
        <div className="flex items-center gap-2 overflow-hidden">
          {/* Show selected pest icons */}
          {selectedPests.length > 0 && (
            <div className="flex -space-x-2 mr-2">
              {getSelectedIcons().map((icon, index) => (
                <span key={index} className="w-8 h-8 rounded-full bg-white border border-green-100 flex items-center justify-center text-sm shadow-sm relative z-10">
                  {icon}
                </span>
              ))}
            </div>
          )}
          <span className={`truncate ${selectedPests.length > 0 ? 'font-medium' : 'text-gray-500'}`}>
            {getDisplayText()}
          </span>
        </div>

        <svg
          className={`w-5 h-5 text-gray-400 transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180 text-green-500' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-20 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-2xl max-h-80 overflow-y-auto animate-in fade-in slide-in-from-top-2">
          <div className="p-2 sticky top-0 bg-white z-10 border-b border-gray-100">
            <div className="flex justify-between items-center px-2 py-1">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Select Pests</span>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => onChange(pestOptions.map(p => p.value))}
                  className="text-xs text-green-600 hover:text-green-700 font-medium hover:underline"
                >
                  All
                </button>
                <button
                  type="button"
                  onClick={() => onChange([])}
                  className="text-xs text-red-500 hover:text-red-600 font-medium hover:underline"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>

          <div className="p-2 grid grid-cols-1 sm:grid-cols-2 gap-1">
            {pestOptions.map((pest) => (
              <label
                key={pest.value}
                className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 group ${selectedPests.includes(pest.value)
                    ? 'bg-green-50 border border-green-100'
                    : 'hover:bg-gray-50 border border-transparent'
                  }`}
              >
                <div className={`w-5 h-5 rounded border flex items-center justify-center mr-3 transition-colors ${selectedPests.includes(pest.value)
                    ? 'bg-green-500 border-green-500 text-white'
                    : 'border-gray-300 group-hover:border-green-400 bg-white'
                  }`}>
                  {selectedPests.includes(pest.value) && (
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={selectedPests.includes(pest.value)}
                    onChange={() => handleTogglePest(pest.value)}
                  />
                </div>
                <span className="text-xl mr-2 group-hover:scale-110 transition-transform">{pest.icon}</span>
                <span className={`text-sm ${selectedPests.includes(pest.value) ? 'text-green-900 font-medium' : 'text-gray-700'}`}>
                  {pest.label}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}