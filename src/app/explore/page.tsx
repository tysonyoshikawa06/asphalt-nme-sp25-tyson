"use client";
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import PlacesAutocomplete from './PlacesAutocomplete';
import Navbar from '../components/Navbar';
import Link from 'next/link';

// Dynamically import the map component with no SSR
const MapView = dynamic(() => import("./MapView"), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-50">
      <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
    </div>
  )
});

const ExplorePage = () => {
  const [formData, setFormData] = useState({
    stops: [
      { location: '', coords: null }, // Start
      { location: '', coords: null }  // End
    ],
    maintainOrder: false,
    currentFuel: '',
    time: '',
    vehicleNumber: ''
  });

  const [route, setRoute] = useState(null);
  const [isMapView, setIsMapView] = useState(false);

  // Add these computed values
  const startCoords = formData.stops[0]?.coords || null;
  const endCoords = formData.stops[formData.stops.length - 1]?.coords || null;

  interface FormData {
    stops: Stop[];
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

  const handleStopSelect = (place: Place, index: number) => {
    const newStops = [...formData.stops];
    newStops[index] = {
      location: place.formatted_address,
      coords: place.geometry.location
    };
    setFormData(prev => ({ ...prev, stops: newStops }));
  };

  const addStop = () => {
    setFormData(prev => ({
      ...prev,
      stops: [...prev.stops.slice(0, -1), { location: '', coords: null }, prev.stops[prev.stops.length - 1]]
    }));
  };

  const removeStop = (index: number) => {
    if (formData.stops.length <= 2) return; // Keep at least start and end
    setFormData(prev => ({
      ...prev,
      stops: prev.stops.filter((_, i) => i !== index)
    }));
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

  const getMultiStopRoute = async (stops: Stop[]) => {
    try {
      const coordinates = stops.map(stop =>
        `${stop.coords.lng},${stop.coords.lat}`
      ).join(';');

      const response = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${coordinates}?overview=full&geometries=geojson`
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
    const validStops = formData.stops.every(stop => stop.coords);
    if (validStops) {
      const routeData = await getMultiStopRoute(formData.stops);
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
            <Link
              href="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back
            </Link>
            <h1 className="text-3xl text-black font-bold mb-8">Explore Routes</h1>
            <div className="bg-white rounded-lg shadow-md p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Stops Section */}
                <div className="space-y-4 text-black">
                  {formData.stops.map((stop, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="flex-grow relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {index === 0 ? 'Start Location' :
                            index === formData.stops.length - 1 ? 'End Location' :
                              `Stop ${index}`}
                        </label>
                        <PlacesAutocomplete
                          value={stop.location}
                          onChange={(value) => {
                            const newStops = [...formData.stops];
                            newStops[index].location = value;
                            setFormData(prev => ({ ...prev, stops: newStops }));
                          }}
                          onSelect={(place) => handleStopSelect(place, index)}
                        />
                      </div>
                      {formData.stops.length > 2 && index !== 0 && index !== formData.stops.length - 1 && (
                        <button
                          type="button"
                          onClick={() => removeStop(index)}
                          className="mt-6 p-2 text-gray-400 hover:text-red-500"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      )}
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addStop}
                    className="mt-2 flex items-center text-blue-600 hover:text-blue-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Add stop
                  </button>
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
        <MapView
          formData={formData}
          route={route}
          startCoords={startCoords}
          endCoords={endCoords}
          onBack={() => setIsMapView(false)}
        />
      )}
    </div>
  );
};

export default ExplorePage;