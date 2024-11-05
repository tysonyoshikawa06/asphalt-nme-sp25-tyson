"use client";
import React, { useState } from 'react';
import { Search } from 'lucide-react';

const ExplorePage = () => {
  const [formData, setFormData] = useState({
    startLocation: '',
    endLocation: '',
    maintainOrder: false,
    currentFuel: '',
    time: '',
    vehicleNumber: ''
  });
  
  const [showMap, setShowMap] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowMap(true);
    // Here you would typically make API calls to handle the route optimization
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 text-black">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Explore Routes</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Location Inputs */}
            <div className="space-y-4">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Location
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="startLocation"
                    value={formData.startLocation}
                    onChange={handleInputChange}
                    className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter start location"
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
              
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Location
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="endLocation"
                    value={formData.endLocation}
                    onChange={handleInputChange}
                    className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter end location"
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
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
            <div className="grid grid-cols-3 gap-4">
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

            {/* Generate Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Generate Route
            </button>
          </form>
        </div>

        {/* Map Display Area */}
        {showMap && (
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Map will be displayed here</p>
              {/* Insert your Google Maps component here */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExplorePage;