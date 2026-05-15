import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { MapContainer, TileLayer, Marker, useMap, ZoomControl } from 'react-leaflet';
import L from 'leaflet';

// Fix for default marker icons in React-Leaflet
import 'leaflet/dist/leaflet.css';

interface GdanskBayMapProps {
  activeIsland: string | null;
  onIslandClick: (id: string) => void;
}

const destinations = [
  {
    id: 'gdansk',
    name: 'Gdańsk',
    coords: [54.348, 18.667] as [number, number],
  },
  {
    id: 'sopot',
    name: 'Sopot',
    coords: [54.444, 18.571] as [number, number],
  },
  {
    id: 'gdynia',
    name: 'Gdynia',
    coords: [54.518, 18.544] as [number, number],
  },
  {
    id: 'hel',
    name: 'Hel',
    coords: [54.608, 18.801] as [number, number],
  },
  {
    id: 'jastarnia',
    name: 'Jastarnia',
    coords: [54.699, 18.675] as [number, number],
  },
  {
    id: 'rewa',
    name: 'Rewa',
    coords: [54.634, 18.513] as [number, number],
  }
];

// Component to handle map view changes when activeIsland changes
const MapController = ({ activeIsland }: { activeIsland: string | null }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    try {
      if (activeIsland) {
        const dest = destinations.find(i => i.id === activeIsland);
        if (dest && dest.coords && !isNaN(dest.coords[0]) && !isNaN(dest.coords[1])) {
          map.flyTo(dest.coords, 12, {
            duration: 2,
            easeLinearity: 0.25
          });
        }
      } else {
        const defaultCenter: [number, number] = [54.45, 18.6];
        if (!isNaN(defaultCenter[0]) && !isNaN(defaultCenter[1])) {
          map.flyTo(defaultCenter, 10, {
            duration: 2
          });
        }
      }
    } catch (err) {
      console.warn('Map navigation error:', err);
    }
  }, [activeIsland, map]);

  return null;
};

const createCustomIcon = (isActive: boolean) => {
  return L.divIcon({
    className: 'custom-map-marker',
    html: `
      <div class="relative flex items-center justify-center">
        <div class="absolute w-12 h-12 rounded-full opacity-10 ${isActive ? 'bg-seafoam scale-110' : 'bg-linen scale-75'} transition-all duration-700"></div>
        <div class="w-3.5 h-3.5 rounded-full border-2 border-white shadow-lg transition-all duration-500 ${isActive ? 'bg-seafoam scale-125' : 'bg-ocean'}"></div>
      </div>
    `,
    iconSize: [48, 48],
    iconAnchor: [24, 24]
  });
};

export const GdanskBayMap: React.FC<GdanskBayMapProps> = ({ activeIsland, onIslandClick }) => {
  return (
    <div className="relative w-full h-full overflow-hidden group bg-ocean">
      <MapContainer 
        center={[54.45, 18.6]} 
        zoom={10} 
        scrollWheelZoom={false}
        zoomControl={false}
        className="w-full h-full z-0 map-blue-tones"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png"
        />
        
        <MapController activeIsland={activeIsland} />
        <ZoomControl position="topright" />

        {destinations.map((dest) => (
          <Marker
            key={dest.id}
            position={dest.coords}
            icon={createCustomIcon(activeIsland === dest.id)}
            eventHandlers={{
              click: () => onIslandClick(dest.id),
            }}
          />
        ))}
      </MapContainer>

      {/* Vignette Overlay for Depth */}
      <div className="absolute inset-0 pointer-events-none z-10 leaflet-vignette" />

      {/* Chart Grid Overlay - Subtle */}
      <div className="absolute inset-0 opacity-10 pointer-events-none z-10" 
           style={{ 
             backgroundImage: `
               linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
               linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
             `,
             backgroundSize: '100px 100px'
           }} 
      />

      {/* Coordinate Labels */}
      <div className="absolute inset-0 pointer-events-none opacity-30 font-mono text-[8px] text-linen/50 p-4 z-20">
        <div className="absolute top-4 left-1/2 -translate-x-1/2">54° 30' N</div>
        <div className="absolute left-4 top-1/2 -translate-y-1/2 -rotate-90">18° 30' E</div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90">18° 50' E</div>
      </div>

      {/* Map Overlay Details */}
      <div className="absolute bottom-12 left-12 z-20 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-rose animate-pulse" />
          <h4 className="text-linen font-display font-bold text-xs uppercase tracking-[0.5em] opacity-80">Live Chart Active</h4>
        </div>
        <p className="text-linen/40 font-mono text-[10px] tracking-widest">54.4° N, 18.6° E · BAY OF GDAŃSK</p>
      </div>
    </div>
  );
};
