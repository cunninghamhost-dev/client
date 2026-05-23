'use client';

import React, { useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface ItineraryStop {
  id: string;
  title: string;
  duration: string;
  timeAtLocation: string;
  description: string;
  freeAdmission: boolean;
  coordinates: [number, number];
}

interface LocationPoint {
  title: string;
  address: string;
  instructions: string;
  coordinates: [number, number];
}

interface MapComponentProps {
  coordinates: [number, number][];
  stops: ItineraryStop[];
  departurePoint: LocationPoint;
  endPoint: LocationPoint;
  hoveredStop: string | null;
}

const defaultIconProto = L.Icon.Default.prototype as unknown;

if (typeof defaultIconProto === 'object' && defaultIconProto !== null && '_getIconUrl' in defaultIconProto) {
  delete (defaultIconProto as { _getIconUrl?: unknown })._getIconUrl;
}
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icons
const createIcon = (color: string, isHighlighted: boolean = false) => {
  const size = isHighlighted ? 40 : 32;
  return new L.DivIcon({
    html: `
      <div style="
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border: 3px solid white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        transition: all 0.2s ease;
        ${isHighlighted ? 'transform: scale(1.2); z-index: 1000;' : ''}
      ">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      </div>
    `,
    className: 'custom-marker',
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
  });
};

const MapComponent: React.FC<MapComponentProps> = ({ coordinates, stops, departurePoint, endPoint, hoveredStop }) => {
  const center = useMemo(() => {
    if (coordinates.length === 0) return [51.505, -0.09] as [number, number];

    const lats = coordinates.map((coord) => coord[0]);
    const lngs = coordinates.map((coord) => coord[1]);

    return [(Math.max(...lats) + Math.min(...lats)) / 2, (Math.max(...lngs) + Math.min(...lngs)) / 2] as [
      number,
      number
    ];
  }, [coordinates]);

  const bounds = useMemo(() => {
    if (coordinates.length === 0) return undefined;
    return coordinates as [number, number][];
  }, [coordinates]);

  return (
    <div className='h-64 w-full relative z-0'>
      <MapContainer
        center={center}
        zoom={12}
        style={{ height: '100%', width: '100%' }}
        bounds={bounds}
        boundsOptions={{ padding: [20, 20] }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        {/* Route polyline */}
        {coordinates.length > 1 && (
          <Polyline positions={coordinates} color='#3B82F6' weight={4} opacity={0.8} dashArray='10, 10' />
        )}

        {/* Departure point marker */}
        <Marker position={departurePoint.coordinates} icon={createIcon('#10B981')}>
          <Popup>
            <div className='p-2'>
              <h3 className='font-semibold text-green-700 mb-1'>Departure Point</h3>
              <p className='text-sm font-medium mb-1'>{departurePoint.address}</p>
              <p className='text-xs text-gray-600'>{departurePoint.instructions}</p>
            </div>
          </Popup>
        </Marker>

        {/* Stop markers */}
        {stops.map((stop) => (
          <Marker key={stop.id} position={stop.coordinates} icon={createIcon('#3B82F6', hoveredStop === stop.id)}>
            <Popup>
              <div className='p-2 max-w-xs'>
                <h3 className='font-semibold text-blue-700 mb-1'>{stop.title}</h3>
                <p className='text-xs text-gray-600 mb-2'>{stop.description}</p>
                <div className='flex justify-between items-center text-xs text-gray-500'>
                  <span>Duration: {stop.duration}</span>
                  {stop.freeAdmission && (
                    <span className='bg-green-100 text-green-700 px-1.5 py-0.5 rounded text-xs'>Free</span>
                  )}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* End point marker */}
        <Marker position={endPoint.coordinates} icon={createIcon('#EF4444')}>
          <Popup>
            <div className='p-2'>
              <h3 className='font-semibold text-red-700 mb-1'>End Point</h3>
              <p className='text-sm font-medium'>{endPoint.address}</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
