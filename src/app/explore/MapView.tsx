import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
});

const convertUnits = {
    distance: {
        kmToMiles: (km: number) => (km * 0.621371).toFixed(1),
        milesToKm: (miles: number) => (miles / 0.621371).toFixed(1)
    },
    emissions: {
        kgToTrees: (kg: number) => (kg * 0.0834).toFixed(1), // Approximate: 1 tree absorbs ~12kg CO2 per year
        treesToKg: (trees: number) => (trees / 0.0834).toFixed(1)
    }
};

const MapController = ({ startCoords, endCoords, route }: any) => {
    const map = useMap();

    React.useEffect(() => {
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

const Legend = () => {
    return (
        <div className="absolute bottom-5 right-5 bg-white p-4 rounded-lg shadow-lg z-[1000] text-sm text-black">
            <h4 className="font-semibold mb-2">Legend</h4>
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                    <span>Start Point</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                    <span>End Point</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                    <span>Intermediate Stop</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-1 bg-blue-500"></div>
                    <span>Route</span>
                </div>
            </div>
        </div>
    );
};

const ZoomControls = () => {
    const map = useMap();

    return (
        <div className="absolute left-5 bottom-20 flex flex-col gap-2 z-[1000] text-black">
            <button
                onClick={() => map.zoomIn()}
                className="bg-white rounded-lg p-2 shadow-lg hover:bg-gray-50"
                aria-label="Zoom in"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
            </button>
            <button
                onClick={() => map.zoomOut()}
                className="bg-white rounded-lg p-2 shadow-lg hover:bg-gray-50"
                aria-label="Zoom out"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
            </button>
        </div>
    );
};

const AnalyticsPanel = ({ isOpen, onClose, route, formData }: any) => {
    const [distanceUnit, setDistanceUnit] = useState<'km' | 'mi'>('km');
    const [emissionsUnit, setEmissionsUnit] = useState<'co2' | 'trees'>('co2');

    const mockEmissionsData = [
        { time: '0h', emissions: 2.1, distance: 50 },
        { time: '1h', emissions: 3.4, distance: 120 },
        { time: '2h', emissions: 2.8, distance: 180 },
        { time: '3h', emissions: 4.2, distance: 270 },
        { time: '4h', emissions: 3.1, distance: 350 },
        { time: '5h', emissions: 2.9, distance: 437 }
    ];

    const totalEmissions = 13.1; // kg CO2
    const emissionsSaved = 2.4; // kg CO2
    const savingsPercentage = 15.5;

    // Calculate optimized values (mock data - replace with actual calculations)
    const originalDistance = 500; // km
    const optimizedDistance = 437; // km
    const originalTime = formData.time || "6h 30m";
    const optimizedTime = "5h 23m";
    
    const distanceSaved = originalDistance - optimizedDistance;
    const distanceSavedPercent = ((distanceSaved / originalDistance) * 100).toFixed(1);

    const formatDistance = (km: number) => {
        return distanceUnit === 'km' ? 
            `${km} km` : 
            `${convertUnits.distance.kmToMiles(km)} mi`;
    };

    const formatEmissions = (kgCO2: number) => {
        return emissionsUnit === 'co2' ? 
            `${kgCO2} kg CO₂` : 
            `${convertUnits.emissions.kgToTrees(kgCO2)} trees/year`;
    };

    const UnitToggle = ({ unit, onChange, options }: { 
        unit: string; 
        onChange: (value: any) => void; 
        options: { value: string; label: string; }[] 
    }) => (
        <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
            {options.map(option => (
                <button
                    key={option.value}
                    onClick={() => onChange(option.value)}
                    className={`px-3 py-1 rounded-md text-sm ${
                        unit === option.value 
                            ? 'bg-white shadow text-blue-600' 
                            : 'text-gray-600 hover:bg-gray-200'
                    }`}
                >
                    {option.label}
                </button>
            ))}
        </div>
    );

    return (
        <div className={`fixed right-0 top-0 h-full w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-[1001] flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            {/* Fixed Header */}
            <div className="p-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-black">Route Analytics</h2>
                    <button onClick={onClose} className="p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-6 text-black">
                    {/* Unit Controls */}
                    <div className="flex justify-between gap-4 pb-2 border-b border-gray-200">
                        <UnitToggle
                            unit={distanceUnit}
                            onChange={setDistanceUnit}
                            options={[
                                { value: 'km', label: 'KM' },
                                { value: 'mi', label: 'MI' }
                            ]}
                        />
                        <UnitToggle
                            unit={emissionsUnit}
                            onChange={setEmissionsUnit}
                            options={[
                                { value: 'co2', label: 'CO₂' },
                                { value: 'trees', label: 'Trees' }
                            ]}
                        />
                    </div>

                    {/* Enhanced Emissions Summary */}
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-semibold text-green-800">Emissions Impact</h3>
                            <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                            </svg>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="bg-white bg-opacity-50 rounded-lg p-3">
                                <p className="text-sm text-green-600 mb-1">Total Emissions</p>
                                <p className="text-2xl font-bold text-green-700">
                                    {formatEmissions(totalEmissions)}
                                </p>
                            </div>
                            <div className="bg-white bg-opacity-50 rounded-lg p-3">
                                <p className="text-sm text-green-600 mb-1">Savings</p>
                                <p className="text-2xl font-bold text-green-700">
                                    {formatEmissions(emissionsSaved)}
                                </p>
                            </div>
                        </div>
                        <div className="bg-green-100 rounded-lg p-3">
                            <div className="flex items-center justify-between">
                                <span className="text-green-700">Reduction from optimal routing</span>
                                <span className="font-bold text-green-800">{savingsPercentage}%</span>
                            </div>
                            <div className="w-full bg-green-200 rounded-full h-2 mt-2">
                                <div
                                    className="bg-green-500 h-2 rounded-full transition-all duration-500"
                                    style={{ width: `${savingsPercentage}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>

                    {/* Updated Route Metrics */}
                    <div className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-semibold mb-3">Distance</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-600">Original</p>
                                    <p className="text-xl">{formatDistance(originalDistance)}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-green-600">Optimized</p>
                                    <p className="text-xl text-green-700">{formatDistance(optimizedDistance)}</p>
                                </div>
                            </div>
                            <div className="mt-2 text-sm text-green-600">
                                Saved {formatDistance(distanceSaved)} ({distanceSavedPercent}%)
                            </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-semibold mb-3">Time</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-600">Original</p>
                                    <p className="text-xl">{originalTime}h</p>
                                </div>
                                <div>
                                    <p className="text-sm text-green-600">Optimized</p>
                                    <p className="text-xl text-green-700">{optimizedTime}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Emissions Chart */}
                    <div className="bg-white p-4 rounded-lg border">
                        <h4 className="font-semibold mb-4">Emissions Over Journey</h4>
                        <AreaChart
                            width={300}
                            height={200}
                            data={mockEmissionsData}
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                            <defs>
                                <linearGradient id="colorEmissions" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="time" />
                            <YAxis />
                            <Tooltip />
                            <Area
                                type="monotone"
                                dataKey="emissions"
                                stroke="#8884d8"
                                fillOpacity={1}
                                fill="url(#colorEmissions)"
                            />
                        </AreaChart>
                    </div>

                    {/* Export Button */}
                    <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
                        Export Report
                    </button>
                </div>
            </div>
        </div>
    );
};

const MapView = ({ formData, route, startCoords, endCoords, onBack }: any) => {
    const [isAnalyticsPanelOpen, setIsAnalyticsPanelOpen] = useState(false);

    const getMarkerColor = (index: number, total: number) => {
        if (index === 0) return 'blue';
        if (index === total - 1) return 'red';
        return 'orange';
    };

    return (
        <div className="fixed inset-0 flex">
            <div className="absolute inset-0">
                <MapContainer
                    center={[20.5937, 78.9629]}
                    zoom={5}
                    zoomControl={false}
                    style={{ width: '100%', height: '100%' }}
                >
                    <TileLayer
                        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                        attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
                    />
                    <MapController startCoords={startCoords} endCoords={endCoords} route={route} />
                    {formData.stops.map((stop: { coords: { lat: number; lng: number; }; }, index: React.Key | null | undefined) => (
                        stop.coords && (
                            <Marker
                                key={index}
                                position={[stop.coords.lat, stop.coords.lng]}
                                icon={new L.Icon({
                                    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${getMarkerColor(index, formData.stops.length)}.png`,
                                    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
                                    iconSize: [25, 41],
                                    iconAnchor: [12, 41],
                                    popupAnchor: [1, -34],
                                    shadowSize: [41, 41]
                                })}
                            >
                                <Popup>
                                    {index === 0 ? 'Start' :
                                        index === formData.stops.length - 1 ? 'End' :
                                            `Stop ${index}`}
                                </Popup>
                            </Marker>
                        )
                    ))}
                    {route && <Polyline positions={route} color="blue" weight={4} />}
                    <ZoomControls />
                </MapContainer>
            </div>
            <div className="absolute top-0 w-full p-4 z-[1000] flex justify-between items-center text-black">
                <button
                    onClick={onBack}
                    className="bg-white rounded-lg px-4 py-2 shadow-lg hover:bg-gray-50 flex items-center gap-2"
                >
                    <span>Back</span>
                </button>
                <button
                    onClick={() => setIsAnalyticsPanelOpen(true)}
                    className="bg-white rounded-lg px-4 py-2 shadow-lg hover:bg-gray-50 flex items-center gap-2"
                >
                    <span>Analytics</span>
                </button>
            </div>
            <Legend />
            <AnalyticsPanel
                isOpen={isAnalyticsPanelOpen}
                onClose={() => setIsAnalyticsPanelOpen(false)}
                route={route}
                formData={formData}
            />
        </div>
    );
};

export default MapView;