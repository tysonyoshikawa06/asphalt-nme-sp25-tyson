"use client";
import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { LoadScript, GoogleMap, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import PlacesAutocomplete from './PlacesAutocomplete';

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY; // Replace with your API key

const ExplorePage = () => {
  const [formData, setFormData] = useState({
    startLocation: '',
    endLocation: '',
    maintainOrder: false,
    currentFuel: '',
    time: '',
    vehicleNumber: ''
  });

  const [directions, setDirections] = useState(null);
  const [map, setMap] = useState(null);
  const [startPlace, setStartPlace] = useState(null);
  const [endPlace, setEndPlace] = useState(null);
  const [isMapView, setIsMapView] = useState(false);

  const handleStartSelect = (place) => {
    setStartPlace(place);
    setFormData(prev => ({ ...prev, startLocation: place.formatted_address }));
  };

  const handleEndSelect = (place) => {
    setEndPlace(place);
    setFormData(prev => ({ ...prev, endLocation: place.formatted_address }));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (startPlace && endPlace) {
      const directionsService = new google.maps.DirectionsService();
      directionsService.route(
        {
          origin: startPlace.geometry.location,
          destination: endPlace.geometry.location,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            setDirections(result);
            setIsMapView(true); // Switch to map view after getting directions
          }
        }
      );
    }
  };

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={["places"]}>
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
            <div className="w-full h-full">
              <GoogleMap
                mapContainerStyle={{ width: '100%', height: '100%' }}
                center={{ lat: 20.5937, lng: 78.9629 }}
                zoom={5}
                onLoad={(map) => setMap(map)}
              >
                {directions && <DirectionsRenderer directions={directions} />}
              </GoogleMap>
            </div>
          </div>
        )}
      </div>
    </LoadScript>
  );
};

export default ExplorePage;