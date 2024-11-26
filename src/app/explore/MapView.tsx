import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { AreaChart, Area, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
});

const MapController = ({ startCoords, endCoords, route }) => {
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

const AnalyticsPanel = ({ isOpen, onClose, route, formData }) => {
    const mockEmissionsData = [
        { name: 'Segment 1', emissions: 5.2 },
        { name: 'Segment 2', emissions: 3.8 },
        { name: 'Segment 3', emissions: 4.1 }
    ];

    const totalEmissions = 13.1; // kg CO2
    const emissionsSaved = 2.4; // kg CO2
    const savingsPercentage = 15.5;

    return (
        <div className={`fixed right-0 top-0 h-full w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-[1001] ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="p-4 text-black">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Route Analytics</h2>
                    <button onClick={onClose} className="p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="space-y-6 text-black">
                    {/* Emissions Summary */}
                    <div className="bg-green-50 p-4 rounded-lg">
                        <h3 className="text-2xl font-bold text-green-700">{totalEmissions} kg CO₂</h3>
                        <p className="text-green-600">Total Route Emissions</p>
                        <div className="mt-2 text-sm">
                            <p className="text-green-600">Saved {emissionsSaved} kg CO₂ ({savingsPercentage}%)</p>
                        </div>
                    </div>

                    {/* Route Metrics */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-semibold">Distance</h4>
                            <p className="text-xl">437 km</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-semibold">Time</h4>
                            <p className="text-xl">5h 23m</p>
                        </div>
                    </div>

                    {/* Emissions Chart */}
                    <div className="bg-white p-4 rounded-lg border">
                        <h4 className="font-semibold mb-4">Emissions by Segment</h4>
                        <PieChart width={300} height={200}>
                            <Pie
                                data={mockEmissionsData}
                                dataKey="emissions"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                fill="#8884d8"
                            >
                                {mockEmissionsData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={`hsl(${index * 40}, 70%, 50%)`} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
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

const MapView = ({ formData, route, startCoords, endCoords, onBack }) => {
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
                    {formData.stops.map((stop, index) => (
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