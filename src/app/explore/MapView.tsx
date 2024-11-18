import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

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

const MapView = ({ formData, route, startCoords, endCoords, onBack }) => {
    const getMarkerColor = (index: number, total: number) => {
        if (index === 0) return 'blue';
        if (index === total - 1) return 'red';
        return 'yellow';
    };

    return (
        <div className="fixed inset-0 flex">
            <div className="absolute inset-0">
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
                </MapContainer>
            </div>
            <div className="absolute top-0 w-full p-12 z-[1000] text-black">
                <button
                    onClick={onBack}
                    className="bg-white rounded-lg px-4 py-2 shadow-lg hover:bg-gray-50 flex items-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span>Back</span>
                </button>
            </div>
            <Legend />
        </div>
    );
};

export default MapView;