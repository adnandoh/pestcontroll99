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
  { value: 'cockroach-ants', label: 'Cockroach / Ants', icon: '🪳' },
  { value: 'bedbugs', label: 'Bed Bugs', icon: '🛏️' },
  { value: 'termite', label: 'Termite', icon: '🐛' },
  { value: 'rodent', label: 'Rodent', icon: '🐭' },
  { value: 'mosquito', label: 'Mosquito', icon: '🦟' },
  { value: 'hotel-commercial', label: 'Hotel / Commercial', icon: '🏢' },
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
    setIsOpen(false); // Automatically close after selection
  };

  const getDisplayText = () => {
    if (selectedPests.length === 0) return 'Select Service';
    if (selectedPests.length === 1) {
      const pest = pestOptions.find(p => p.value === selectedPests[0]);
      return pest ? pest.label : selectedPests[0];
    }
    return `${selectedPests.length} services selected`;
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <label className="block text-[15px] font-bold text-[#1a1a1a] mb-2.5">
        Select Service *
      </label>

      {/* Dropdown Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-3 border rounded-xl focus:outline-none transition-all duration-200 text-left flex items-center justify-between group shadow-sm ${isOpen 
            ? 'border-[#00C950] ring-0' 
            : 'border-[#00C950] hover:border-[#00C950]'
          } bg-white text-gray-900`}
      >
        <span className={`truncate text-base ${selectedPests.length > 0 ? 'font-bold' : 'text-gray-400'}`}>
          {getDisplayText()}
        </span>
        <svg
          className={`w-5 h-5 text-[#00C950] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg overflow-hidden animate-in fade-in zoom-in-95 duration-100">
          <div className="max-h-60 overflow-y-auto">
            {/* Header for multi-select */}
            <div className="flex justify-between items-center px-4 py-2 border-b border-gray-100 bg-gray-50">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Available Services</span>
              <button
                type="button"
                onClick={() => onChange([])}
                className="text-[10px] text-blue-600 hover:underline font-bold uppercase"
              >
                Clear
              </button>
            </div>

            <div className="py-1">
              {pestOptions.map((pest) => {
                const isSelected = selectedPests.includes(pest.value);
                return (
                  <div
                    key={pest.value}
                    onClick={() => handleTogglePest(pest.value)}
                    className={`px-4 py-2.5 cursor-pointer text-base transition-colors ${isSelected
                        ? 'bg-blue-600 text-white font-medium'
                        : 'text-gray-900 hover:bg-blue-50'
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{pest.label}</span>
                      {isSelected && (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}