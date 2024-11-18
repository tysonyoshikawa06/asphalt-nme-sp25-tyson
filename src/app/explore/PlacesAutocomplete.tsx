import React, { useState, useEffect, useRef } from 'react';
import { debounce } from 'lodash';

interface Place {
  display_name: string;
  lat: string;
  lon: string;
}

interface PlacesAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onSelect: (place: { formatted_address: string; geometry: { location: { lat: number; lng: number } } }) => void;
}

const PlacesAutocomplete: React.FC<PlacesAutocompleteProps> = ({ value, onChange, onSelect }) => {
  const [suggestions, setSuggestions] = useState<Place[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Debounced search function
  const searchPlaces = debounce(async (query: string) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`
      );
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error('Error fetching places:', error);
      setSuggestions([]);
    }
  }, 300);

  useEffect(() => {
    searchPlaces(value);
  }, [value]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
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
          lng: parseFloat(place.lon)
        }
      }
    });
    setIsOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Search locations..."
      />

      {isOpen && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-auto shadow-lg">
          {suggestions.map((place, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(place)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
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