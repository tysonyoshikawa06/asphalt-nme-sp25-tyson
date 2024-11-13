import React, { useRef } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { Search } from 'lucide-react';

interface PlacesAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onSelect: (place: google.maps.places.PlaceResult) => void;
}

const PlacesAutocomplete: React.FC<PlacesAutocompleteProps> = ({ value, onChange, onSelect }) => {
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  return (
    <div className="relative">
      <Autocomplete
        onLoad={(autocomplete) => {
          autocompleteRef.current = autocomplete;
        }}
        onPlaceChanged={() => {
          const place = autocompleteRef.current?.getPlace();
          if (place) {
            onSelect(place);
          }
        }}
      >
        <div className="relative">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter location"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </Autocomplete>
    </div>
  );
};

export default PlacesAutocomplete;