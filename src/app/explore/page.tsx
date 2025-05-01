'use client';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import PlacesAutocomplete from './PlacesAutocomplete';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Dynamically import the map component with no SSR
const MapView = dynamic(() => import('./MapView'), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-50">
      <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
    </div>
  ),
});

// Add preset route data
const presetRoute = {
  stops: [
    {
      location: 'TST BOCES, 555 Warren Road, Northeast Ithaca, NY 14850',
      coords: { lat: 42.4808, lng: -76.457 },
    },
    {
      location: 'Dewitt Middle School, 560 Warren Road, Ithaca, NY 14850',
      coords: { lat: 42.4803, lng: -76.4566 },
    },
    {
      location:
        'Northeast Elementary School, 425 Winthrop Dr, Ithaca, NY 14850',
      coords: { lat: 42.4775, lng: -76.4647 },
    },
    {
      location:
        'Cayuga Heights Elementary School, 110 E Upland Rd, Ithaca, NY 14850',
      coords: { lat: 42.4697, lng: -76.4791 },
    },
    {
      location:
        'Belle Sherman Elementary School, Valley Road, Ithaca, NY 14853',
      coords: { lat: 42.4478, lng: -76.4766 },
    },
    {
      location:
        'Caroline Elementary School, Slaterville Road, Besemer, NY 14881',
      coords: { lat: 42.3839, lng: -76.4165 },
    },
    {
      location:
        'South Hill Elementary School, 520 Hudson Street, Ithaca, NY 14850',
      coords: { lat: 42.4336, lng: -76.495 },
    },
    {
      location:
        'Beverly J. Martin Elementary School, 302 West Buffalo Street, Ithaca, NY',
      coords: { lat: 42.4422, lng: -76.4976 },
    },
    {
      location: 'Fall Creek School, Linn Street, Ithaca, NY 14850',
      coords: { lat: 42.4527, lng: -76.4869 },
    },
    {
      location:
        'Boynton Middle School, 1601 North Cayuga Street, Ithaca, NY 14850',
      coords: { lat: 42.4624, lng: -76.4921 },
    },
    {
      location: 'TST BOCES, 555 Warren Road, Ithaca, NY 14850',
      coords: { lat: 42.4808, lng: -76.457 },
    },
    {
      location: '602 Hancock Street, Ithaca, NY 14850',
      coords: { lat: 42.4445, lng: -76.5097 },
    },
    {
      location: 'Enfield School, 20 Enfield Main Road, Ithaca, NY 14850',
      coords: { lat: 42.4436, lng: -76.5491 },
    },
    {
      location:
        'Lehmann Alternative Community School, 111 Chestnut Street, Ithaca, NY',
      coords: { lat: 42.4506, lng: -76.515 },
    },
    {
      location:
        'Recycling and Solid Waste Center, 160 Commercial Avenue, Ithaca, NY',
      coords: { lat: 42.4461, lng: -76.5138 },
    },
  ],
  maintainOrder: true,
  currentFuel: 'Full',
  time: '8h 00m',
  vehicleNumber: 'BUS-001',
};

const ExplorePage = () => {
  interface Coords {
    lat: number;
    lng: number;
  }

  const [formData, setFormData] = useState({
    stops: [
      { location: '', coords: null as Coords | null }, // Start
      { location: '', coords: null as Coords | null }, // End
    ],
    maintainOrder: false,
    currentFuel: '',
    time: '',
    vehicleNumber: '',
  });

  const [route, setRoute] = useState(null);
  const [isMapView, setIsMapView] = useState(false);

  // Add these computed values
  const startCoords = formData.stops[0]?.coords || null;
  const endCoords = formData.stops[formData.stops.length - 1]?.coords || null;

  interface Place {
    formatted_address: string;
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
  }

  const handleStopSelect = (place: Place, index: number) => {
    const newStops = [...formData.stops];
    newStops[index] = {
      location: place.formatted_address,
      coords: place.geometry.location,
    };
    setFormData((prev) => ({ ...prev, stops: newStops }));
  };

  const addStop = () => {
    setFormData((prev) => ({
      ...prev,
      stops: [
        ...prev.stops.slice(0, -1),
        { location: '', coords: null },
        prev.stops[prev.stops.length - 1],
      ],
    }));
  };

  const removeStop = (index: number) => {
    if (formData.stops.length <= 2) return; // Keep at least start and end
    setFormData((prev) => ({
      ...prev,
      stops: prev.stops.filter((_, i) => i !== index),
    }));
  };

  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  interface Stop {
    location: string;
    coords: Coords | null;
  }

  const getMultiStopRoute = async (stops: Stop[]) => {
    try {
      const coordinates = stops
        .map((stop) =>
          stop.coords ? `${stop.coords.lng},${stop.coords.lat}` : ''
        )
        .join(';');

      const response = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${coordinates}?overview=full&geometries=geojson`
      );
      const data = await response.json();
      if (data.routes && data.routes.length > 0) {
        return data.routes[0].geometry.coordinates.map((coord: any) => [
          coord[1],
          coord[0],
        ]);
      }
      return null;
    } catch (error) {
      console.error('Error getting route:', error);
      return null;
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const validStops = formData.stops.every((stop) => stop.coords);
    if (validStops) {
      const routeData = await getMultiStopRoute(formData.stops);
      setRoute(routeData);
      setIsMapView(true);
    }
  };

  const loadPresetRoute = () => {
    setFormData(presetRoute);
    // Since we have all coordinates, we can immediately get the route
    getMultiStopRoute(presetRoute.stops).then((routeData) => {
      setRoute(routeData);
      setIsMapView(true);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex flex-col">
      {!isMapView && <Navbar />}
      <div className="relative flex-1 flex flex-col justify-center items-center">
        {/* Decorative Leaves */}
        <img src="/images/leaf.png" alt="Leaf" className="hidden md:block absolute left-16 top-[23%] w-24 rotate-[-26deg] scale-x-[-1] z-0" />
        <img src="/images/leaf.png" alt="Leaf" className="hidden md:block absolute left-24 top-[44%] w-20 rotate-[14deg] z-0" />
        <img src="/images/leaf.png" alt="Leaf" className="hidden md:block absolute left-20 top-[66%] w-24 rotate-[-21deg] scale-x-[-1] z-0" />
        <img src="/images/leaf.png" alt="Leaf" className="hidden md:block absolute right-16 top-[26%] w-24 rotate-[24deg] z-0" />
        <img src="/images/leaf.png" alt="Leaf" className="hidden md:block absolute right-24 top-[46%] w-20 rotate-[-16deg] scale-x-[-1] z-0" />
        <img src="/images/leaf.png" alt="Leaf" className="hidden md:block absolute right-20 top-[64%] w-24 rotate-[19deg] z-0" />
        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full py-8 pb-24">
          {!isMapView ? (
            <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
              <h1 className="text-5xl font-extrabold text-center mb-0 leading-tight">
                <span className="asphalt-green">Explore</span> <span className="text-black">Your New Route to</span>
              </h1>
              <h2 className="text-5xl font-extrabold text-center mb-10 asphalt-green">Sustainability</h2>
              <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-8">
                {/* Stops Section */}
                <div className="w-full flex flex-col gap-4">
                  {formData.stops.map((stop, index) => (
                    <div key={index} className="flex items-center gap-2 w-full">
                      <div className="flex-grow relative">
                        <label className="block text-base font-semibold text-black mb-1">
                          {index === 0
                            ? 'Start Location'
                            : index === formData.stops.length - 1
                              ? 'End Location'
                              : `Stop ${index}`}
                        </label>
                        <PlacesAutocomplete
                          value={stop.location}
                          onChange={(value) => {
                            const newStops = [...formData.stops];
                            newStops[index].location = value;
                            newStops[index].coords = null;
                            setFormData((prev) => ({ ...prev, stops: newStops }));
                          }}
                          onSelect={(place) => handleStopSelect(place, index)}
                          inputClassName="text-black"
                        />
                      </div>
                      {formData.stops.length > 2 &&
                        index !== 0 &&
                        index !== formData.stops.length - 1 && (
                          <button
                            type="button"
                            onClick={() => removeStop(index)}
                            className="p-2 text-gray-400 hover:text-red-500"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        )}
                    </div>
                  ))}
                  <div className="flex gap-3 mt-1">
                    <button
                      type="button"
                      onClick={addStop}
                      className="asphalt-green-bg text-white font-semibold px-5 py-2 rounded hover:brightness-90 transition-colors border"
                      style={{ backgroundColor: '#034626', borderColor: '#034626' }}
                    >
                      + Add stop
                    </button>
                    <button
                      type="button"
                      onClick={loadPresetRoute}
                      className="bg-white asphalt-green font-semibold px-5 py-2 rounded border hover:bg-green-50 transition-colors"
                      style={{ borderColor: '#034626' }}
                    >
                      Load sample schools route
                    </button>
                  </div>
                  <div className="flex items-center mt-1">
                    <input
                      type="checkbox"
                      name="maintainOrder"
                      checked={formData.maintainOrder}
                      onChange={handleInputChange}
                      className="h-4 w-4 asphalt-green focus:ring-[#034626] border-gray-300 rounded"
                    />
                    <label className="ml-2 text-base text-black">
                      The stops are in the order they are currently operating
                    </label>
                  </div>
                </div>
                <div className="w-full flex flex-col gap-2">
                  <h3 className="text-2xl font-extrabold text-center mb-2">
                    <span className="text-black">Tell Us About Your </span><span className="asphalt-green">Vehicle</span>
                  </h3>
                  <div className="grid grid-cols-3 gap-4 w-full">
                    <div className="flex flex-col">
                      <label className="block text-base font-semibold text-black mb-1">Current Fuel Per Trip</label>
                      <input
                        type="text"
                        name="currentFuel"
                        value={formData.currentFuel}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-400 rounded-md focus:ring-2 focus:ring-[#034626] focus:border-[#034626] text-lg text-black"
                        placeholder="gal"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="block text-base font-semibold text-black mb-1">Trip Duration</label>
                      <input
                        type="text"
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-400 rounded-md focus:ring-2 focus:ring-[#034626] focus:border-[#034626] text-lg text-black"
                        placeholder="hh:mm"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="block text-base font-semibold text-black mb-1">User Input</label>
                      <input
                        type="text"
                        name="vehicleNumber"
                        value={formData.vehicleNumber}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-400 rounded-md focus:ring-2 focus:ring-[#034626] focus:border-[#034626] text-lg text-black"
                        placeholder=""
                      />
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full text-white py-4 px-4 rounded-md font-bold text-2xl hover:brightness-90 transition-colors mt-2 asphalt-green-bg"
                  style={{ backgroundColor: '#034626' }}
                >
                  Optimize Route
                </button>
              </form>
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
      </div>
      <div className="mt-32">
        <Footer />
      </div>
    </div>
  );
};

export default ExplorePage;
