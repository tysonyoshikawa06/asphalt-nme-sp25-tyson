"use client";
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import PlacesAutocomplete from './PlacesAutocomplete';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
});

// Add this new component for map bounds control
const MapController = ({ startCoords, endCoords, route }) => {
  const map = useMap();
  
  useEffect(() => {
    if (route && route.length > 0) {
      const bounds = L.latLngBounds(route);
      map.fitBounds(bounds, { padding: [50, 50] });
    } else if (startCoords && endCoords) {
      const bounds = L.latLngBounds(
        [startCoords.lat, startCoords.lng],
        [endCoords.lat, endCoords.lng]
      );
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [map, route, startCoords, endCoords]);

  return null;
};

const ExplorePage = () => {
  const [formData, setFormData] = useState({
    startLocation: '',
    endLocation: '',
    maintainOrder: false,
    currentFuel: '',
    time: '',
    vehicleNumber: ''
  });

  const [route, setRoute] = useState(null);
  const [startCoords, setStartCoords] = useState(null);
  const [endCoords, setEndCoords] = useState(null);
  const [isMapView, setIsMapView] = useState(false);

  interface FormData {
    startLocation: string;
    endLocation: string;
    maintainOrder: boolean;
    currentFuel: string;
    time: string;
    vehicleNumber: string;
  }

  interface Place {
    formatted_address: string;
    geometry: {
      location: {
        lat: number;
        lng: number;
      }
    };
  }

  const handleStartSelect = (place: Place) => {
    setStartCoords(place.geometry.location);
    setFormData(prev => ({ ...prev, startLocation: place.formatted_address }));
  };

  const handleEndSelect = (place: Place) => {
    setEndCoords(place.geometry.location);
    setFormData(prev => ({ ...prev, endLocation: place.formatted_address }));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const searchLocation = async (query) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      return data.length > 0 ? { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) } : null;
    } catch (error) {
      console.error('Error searching location:', error);
      return null;
    }
  };

  const getRoute = async (start, end) => {
    try {
      const response = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=geojson`
      );
      const data = await response.json();
      if (data.routes && data.routes.length > 0) {
        return data.routes[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
      }
      return null;
    } catch (error) {
      console.error('Error getting route:', error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const startCoords = await searchLocation(formData.startLocation);
    const endCoords = await searchLocation(formData.endLocation);
    
    if (startCoords && endCoords) {
      setStartCoords(startCoords);
      setEndCoords(endCoords);
      const routeData = await getRoute(startCoords, endCoords);
      setRoute(routeData);
      setIsMapView(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {!isMapView ? (
        // Form View
        <div className="p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Explore Routes</h1>
            <div className="bg-white rounded-lg shadow-md p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4 text-black">
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Location
                    </label>
                    <PlacesAutocomplete
                      value={formData.startLocation}
                      onChange={(value) => setFormData(prev => ({ ...prev, startLocation: value }))}
                      onSelect={handleStartSelect}
                    />
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Location
                    </label>
                    <PlacesAutocomplete
                      value={formData.endLocation}
                      onChange={(value) => setFormData(prev => ({ ...prev, endLocation: value }))}
                      onSelect={handleEndSelect}
                    />
                  </div>
                </div>

                {/* Order Checkbox */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="maintainOrder"
                    checked={formData.maintainOrder}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-700">
                    Stops are in the order as they are now
                  </label>
                </div>

                {/* Additional Fields */}
                <div className="grid grid-cols-3 gap-4 text-black">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Current Fuel
                    </label>
                    <input
                      type="text"
                      name="currentFuel"
                      value={formData.currentFuel}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter fuel amount"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Time
                    </label>
                    <input
                      type="text"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter time"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Vehicle Number
                    </label>
                    <input
                      type="text"
                      name="vehicleNumber"
                      value={formData.vehicleNumber}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter vehicle number"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Generate Route
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        // Map View
        <div className="fixed inset-0 bg-white">
          <button
            onClick={() => setIsMapView(false)}
            className="absolute top-4 left-4 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <MapContainer
            center={[20.5937, 78.9629]}
            zoom={5}
            style={{ width: '100%', height: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <MapController startCoords={startCoords} endCoords={endCoords} route={route} />
            {startCoords && <Marker position={[startCoords.lat, startCoords.lng]}>
              <Popup>Start Location</Popup>
            </Marker>}
            {endCoords && <Marker position={[endCoords.lat, endCoords.lng]}>
              <Popup>End Location</Popup>
            </Marker>}
            {route && <Polyline positions={route} color="blue" weight={4} />}
          </MapContainer>
        </div>
      )}
    </div>
  );
};

export default ExplorePage;