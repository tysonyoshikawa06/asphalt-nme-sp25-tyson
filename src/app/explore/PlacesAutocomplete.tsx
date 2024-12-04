import React, { useState, useEffect, useRef, useCallback } from 'react';
import { debounce } from 'lodash';

// Add cache interface
interface Cache {
  [key: string]: Place[];
}

interface Place {
  display_name: string;
  lat: string;
  lon: string;
}

interface PlacesAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onSelect: (place: {
    formatted_address: string;
    geometry: { location: { lat: number; lng: number } };
  }) => void;
}

const PlacesAutocomplete: React.FC<PlacesAutocompleteProps> = ({
  value,
  onChange,
  onSelect,
}) => {
  const [suggestions, setSuggestions] = useState<Place[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cache = useRef<Cache>({});

  // Improved search function with caching
  const searchPlaces = useCallback(
    debounce(async (query: string) => {
      if (!query || query.length < 3) {
        setSuggestions([]);
        setIsLoading(false);
        return;
      }

      // Check cache first
      if (cache.current[query]) {
        setSuggestions(cache.current[query]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout

        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`,
          { signal: controller.signal }
        );

        clearTimeout(timeoutId);

        if (!response.ok) throw new Error('Search failed');

        const data = await response.json();
        cache.current[query] = data; // Cache the results
        setSuggestions(data);
      } catch (error) {
        if ((error as Error).name === 'AbortError') {
          console.log('Search request timed out');
        } else {
          console.error('Error fetching places:', error);
        }
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    }, 200), // Reduced debounce time from 300ms to 200ms
    []
  );

  useEffect(() => {
    searchPlaces(value);
  }, [value]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSuggestionClick = (place: Place) => {
    onChange(place.display_name);
    onSelect({
      formatted_address: place.display_name,
      geometry: {
        location: {
          lat: parseFloat(place.lat),
          lng: parseFloat(place.lon),
        },
      },
    });
    setIsOpen(false);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev > -1 ? prev - 1 : prev));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex > -1) {
          handleSuggestionClick(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  return (
    <div ref={wrapperRef} className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setIsOpen(true);
          setSelectedIndex(-1);
        }}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsOpen(true)}
        className={`w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
          isLoading ? 'pr-10' : ''
        }`}
        placeholder="Search locations..."
      />

      {isLoading && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
        </div>
      )}

      {isOpen && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-auto shadow-lg">
          {suggestions.map((place, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(place)}
              className={`px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm ${
                index === selectedIndex ? 'bg-blue-50' : ''
              }`}
            >
              {place.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PlacesAutocomplete;
