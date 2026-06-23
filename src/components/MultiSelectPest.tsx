import { useState, useRef, useEffect } from 'react';

interface PestOption {
  value: string;
  label: string;
}

interface MultiSelectPestProps {
  selectedPests: string[];
  onChange: (selectedPests: string[]) => void;
  className?: string;
  /** Tighter label/spacing for compact home hero form */
  compact?: boolean;
}

const pestOptions: PestOption[] = [
  { value: 'cockroach-ants', label: 'Cockroach / Ants' },
  { value: 'bedbugs', label: 'Bed Bugs' },
  { value: 'termite', label: 'Termite' },
  { value: 'rodent', label: 'Rodent' },
  { value: 'mosquito', label: 'Mosquito' },
  { value: 'hotel-commercial', label: 'Hotel / Commercial' },
  { value: 'other', label: 'Other' },
];

export default function MultiSelectPest({
  selectedPests,
  onChange,
  className = '',
  compact = false,
}: MultiSelectPestProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (dropdownRef.current?.contains(event.target as Node)) {
        return;
      }
      setIsOpen(false);
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleTogglePest = (pestValue: string) => {
    const newSelected = selectedPests.includes(pestValue)
      ? selectedPests.filter((p) => p !== pestValue)
      : [...selectedPests, pestValue];
    onChange(newSelected);
  };

  const getDisplayText = () => {
    if (selectedPests.length === 0) return 'Select one or more services';
    if (selectedPests.length === 1) {
      const pest = pestOptions.find((p) => p.value === selectedPests[0]);
      return pest ? pest.label : selectedPests[0];
    }
    return `${selectedPests.length} services selected`;
  };

  const labelClass = compact
    ? 'block text-[13px] font-bold text-[#1a1a1a] mb-2'
    : 'block text-[15px] font-bold text-[#1a1a1a] mb-2.5';

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <label className={labelClass} id="pest-select-label">
        Select Service *
      </label>

      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-labelledby="pest-select-label"
        className={`quote-field w-full px-4 text-left flex items-center justify-between ${
          compact ? 'py-2.5 text-sm' : 'py-3 text-base'
        }`}
      >
        <span className={`truncate ${selectedPests.length > 0 ? 'font-bold text-gray-900' : 'text-gray-400'}`}>
          {getDisplayText()}
        </span>
        <svg
          className={`w-5 h-5 text-green-base shrink-0 ml-2 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute z-30 w-full mt-1 bg-white border border-green-base/40 rounded-lg shadow-lg overflow-hidden animate-in fade-in zoom-in-95 duration-100"
          role="listbox"
          aria-multiselectable="true"
          aria-labelledby="pest-select-label"
          onPointerDown={(event) => event.stopPropagation()}
        >
          <div className="flex justify-between items-center px-4 py-2 border-b border-gray-100 bg-gray-50">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
              Select multiple (checkboxes)
            </span>
            {selectedPests.length > 0 && (
              <button
                type="button"
                onClick={() => onChange([])}
                className="text-[10px] text-green-base hover:underline font-bold uppercase"
              >
                Clear all
              </button>
            )}
          </div>

          <p className="px-4 py-1.5 text-[11px] text-gray-500 bg-white border-b border-gray-100">
            Tap each service you need. The list stays open until you tap Done.
          </p>

          <ul className="max-h-60 overflow-y-auto py-1">
            {pestOptions.map((pest) => {
              const isSelected = selectedPests.includes(pest.value);
              const id = `pest-option-${pest.value}`;
              return (
                <li key={pest.value}>
                  <label
                    htmlFor={id}
                    className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors ${
                      isSelected ? 'bg-green-50' : 'hover:bg-gray-50'
                    }`}
                    onPointerDown={(event) => event.stopPropagation()}
                  >
                    <input
                      id={id}
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleTogglePest(pest.value)}
                      className="h-4 w-4 rounded border-gray-300 text-green-base focus:ring-green-base focus:ring-offset-0 cursor-pointer"
                    />
                    <span className={`text-base flex-1 ${isSelected ? 'font-semibold text-gray-900' : 'text-gray-800'}`}>
                      {pest.label}
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>

          <div className="border-t border-gray-100 px-4 py-2 bg-gray-50">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-full py-2.5 text-sm font-bold text-white bg-green-base rounded-lg hover:bg-green-dark transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {selectedPests.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2">
          {selectedPests.map((value) => {
            const pest = pestOptions.find((p) => p.value === value);
            return (
              <span
                key={value}
                className="inline-flex items-center gap-1 rounded-full bg-green-pale border border-green-base/30 px-2.5 py-0.5 text-xs font-semibold text-green-dark"
              >
                {pest?.label ?? value}
                <button
                  type="button"
                  onClick={() => handleTogglePest(value)}
                  className="text-green-base hover:text-green-dark leading-none"
                  aria-label={`Remove ${pest?.label ?? value}`}
                >
                  ×
                </button>
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
