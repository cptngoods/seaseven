import React from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Line,
  Marker,
  createCoordinates,
} from '@vnedyalk0v/react19-simple-maps';
import countryAtlas from 'world-atlas/countries-50m.json';

interface GdanskBayMapProps {
  activeIsland: string | null;
}

const MAP_WIDTH = 1200;
const MAP_HEIGHT = 560;
const MAP_CENTER = createCoordinates(18.71, 54.48);
const PROJECTION_SCALE = 10000;
const VISUAL_ZOOM = 4.9;
const MAP_TRANSFORM = `translate(${MAP_WIDTH / 2} ${MAP_HEIGHT / 2}) scale(${VISUAL_ZOOM}) translate(${-MAP_WIDTH / 2} ${-MAP_HEIGHT / 2})`;
const MARKER_SCALE = 1 / VISUAL_ZOOM;

const routeStops = [
  {
    id: 'gdynia',
    name: 'Gdynia',
    coordinates: createCoordinates(18.544, 54.518),
    labelDx: 26,
    labelDy: -10,
    anchor: 'start',
  },
  {
    id: 'sopot',
    name: 'Sopot',
    coordinates: createCoordinates(18.571, 54.444),
    labelDx: 26,
    labelDy: -10,
    anchor: 'start',
  },
  {
    id: 'gdansk',
    name: 'Gdansk',
    coordinates: createCoordinates(18.667, 54.348),
    labelDx: 24,
    labelDy: 30,
    anchor: 'start',
  },
  {
    id: 'hel',
    name: 'Hel Peninsula',
    coordinates: createCoordinates(18.801, 54.608),
    labelDx: -26,
    labelDy: -12,
    anchor: 'end',
  },
] as const;

const routeCoordinates = [
  createCoordinates(18.544, 54.518),
  createCoordinates(18.571, 54.444),
  createCoordinates(18.62, 54.385),
  createCoordinates(18.667, 54.348),
  createCoordinates(18.735, 54.455),
  createCoordinates(18.801, 54.608),
];

const geographyStyle = {
  default: { fill: '#263f39', stroke: '#d6c1a1', strokeOpacity: 0.36, strokeWidth: 0.62, outline: 'none' },
  hover: { fill: '#263f39', stroke: '#d6c1a1', strokeOpacity: 0.36, strokeWidth: 0.62, outline: 'none' },
  pressed: { fill: '#263f39', stroke: '#d6c1a1', strokeOpacity: 0.36, strokeWidth: 0.62, outline: 'none' },
};

const coastlineStyle = {
  default: { fill: 'transparent', stroke: '#07161d', strokeOpacity: 0.34, strokeWidth: 2.8, outline: 'none' },
  hover: { fill: 'transparent', stroke: '#07161d', strokeOpacity: 0.34, strokeWidth: 2.8, outline: 'none' },
  pressed: { fill: 'transparent', stroke: '#07161d', strokeOpacity: 0.34, strokeWidth: 2.8, outline: 'none' },
};

const balticCountryIds = new Set(['208', '233', '276', '428', '440', '616', '643', '752']);

const parseBalticGeographies = (geographies: any[]) =>
  geographies.filter((geo) => balticCountryIds.has(String(geo.id)));

export const GdanskBayMap: React.FC<GdanskBayMapProps> = ({ activeIsland }) => {
  const activeStop = routeStops.find((stop) => stop.id === activeIsland) ?? routeStops[1];

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#061720]">
      <ComposableMap
        width={MAP_WIDTH}
        height={MAP_HEIGHT}
        projection="geoMercator"
        projectionConfig={{
          center: MAP_CENTER,
          scale: PROJECTION_SCALE,
        }}
        className="absolute inset-0 h-full w-full pointer-events-none"
      >
        <defs>
          <linearGradient id="baySea" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#061720" />
            <stop offset="44%" stopColor="#0b3240" />
            <stop offset="72%" stopColor="#0b2531" />
            <stop offset="100%" stopColor="#041016" />
          </linearGradient>
          <radialGradient id="bayDepth" cx="55%" cy="46%" r="62%">
            <stop offset="0%" stopColor="#4e9294" stopOpacity="0.22" />
            <stop offset="58%" stopColor="#0a2a35" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#061720" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width={MAP_WIDTH} height={MAP_HEIGHT} fill="url(#baySea)" />
        <rect width={MAP_WIDTH} height={MAP_HEIGHT} fill="url(#bayDepth)" />
        <g transform={MAP_TRANSFORM}>
          <Geographies geography={countryAtlas as any} parseGeographies={parseBalticGeographies}>
            {({ geographies }) =>
              geographies.map((geo, index) => (
                <React.Fragment key={geo.id ?? index}>
                  <Geography
                    geography={geo}
                    style={coastlineStyle}
                    vectorEffect="non-scaling-stroke"
                    pointerEvents="none"
                    tabIndex={-1}
                  />
                  <Geography
                    geography={geo}
                    style={geographyStyle}
                    vectorEffect="non-scaling-stroke"
                    pointerEvents="none"
                    tabIndex={-1}
                  />
                </React.Fragment>
              ))
            }
          </Geographies>

          <Line
            from={routeCoordinates[0]}
            to={routeCoordinates[routeCoordinates.length - 1]}
            coordinates={routeCoordinates}
            stroke="#07161d"
            strokeWidth={8}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="1 17"
            opacity={0.55}
            vectorEffect="non-scaling-stroke"
          />
          <Line
            from={routeCoordinates[0]}
            to={routeCoordinates[routeCoordinates.length - 1]}
            coordinates={routeCoordinates}
            stroke="#bfa888"
            strokeWidth={2.1}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="7 10"
            opacity={0.95}
            vectorEffect="non-scaling-stroke"
          />

          {routeStops.map((stop) => {
            const isActive = activeIsland === stop.id;

            return (
              <Marker key={stop.id} coordinates={stop.coordinates}>
                <g transform={`scale(${MARKER_SCALE})`}>
                  <circle r={isActive ? 34 : 22} fill="#bfa888" opacity={isActive ? 0.22 : 0.08} />
                  <circle r={8} fill={isActive ? '#bfa888' : '#f4efe7'} stroke="#07161d" strokeWidth={3} />
                  <circle r={15} fill="transparent" stroke="#bfa888" strokeOpacity={isActive ? 0.75 : 0.28} strokeWidth={1} />
                  <line
                    x1={stop.anchor === 'end' ? -13 : 13}
                    y1={0}
                    x2={stop.labelDx}
                    y2={stop.labelDy}
                    stroke="#bfa888"
                    strokeOpacity={isActive ? 0.85 : 0.45}
                    strokeWidth={1}
                  />
                  <text
                    x={stop.labelDx}
                    y={stop.labelDy - 8}
                    textAnchor={stop.anchor}
                    fill="#f4efe7"
                    opacity={isActive ? 1 : 0.78}
                    fontSize={isActive ? 23 : 18}
                    fontFamily="Cormorant Upright, Georgia, serif"
                    fontStyle="italic"
                    pointerEvents="none"
                  >
                    {stop.name}
                  </text>
                  <text
                    x={stop.labelDx}
                    y={stop.labelDy + 11}
                    textAnchor={stop.anchor}
                    fill="#bfa888"
                    opacity={isActive ? 0.9 : 0.58}
                    fontSize={8}
                    fontFamily="Inconsolata, monospace"
                    letterSpacing={5}
                    pointerEvents="none"
                  >
                    BAY STOP
                  </text>
                </g>
              </Marker>
            );
          })}
        </g>
      </ComposableMap>

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.13]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(244,239,231,0.22) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(244,239,231,0.22) 1px, transparent 1px)
          `,
          backgroundSize: '96px 96px',
        }}
      />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_45%,transparent_0%,rgba(7,22,29,0.12)_52%,rgba(7,22,29,0.72)_100%)]" />

      <div className="absolute left-5 top-5 z-20 max-w-[calc(100%-2.5rem)] border border-linen/10 bg-ocean/54 px-5 py-4 backdrop-blur-sm md:left-8 md:top-8 md:px-7 md:py-5">
        <div className="flex items-center gap-4">
          <span className="h-2 w-2 rounded-full bg-rose" />
          <span className="text-[10px] uppercase tracking-[0.72em] font-display font-bold text-linen/80">
            Route Chart
          </span>
        </div>
        <div className="mt-4 text-[10px] uppercase tracking-[0.42em] font-display text-linen/35">
          54.4 N, 18.6 E / Bay of Gdansk
        </div>
      </div>

      <div className="absolute left-5 right-5 bottom-5 z-20 flex flex-col gap-4 md:left-8 md:right-8 md:bottom-8 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mb-2 text-[9px] uppercase tracking-[0.5em] font-display font-bold text-rose">
            Active Route
          </div>
          <div className="text-3xl md:text-4xl font-serif italic leading-none text-linen">
            {activeStop.name}
          </div>
        </div>
        <div className="hidden h-px flex-1 bg-linen/10 md:block" />
        <div className="max-w-full text-[9px] uppercase tracking-[0.36em] font-display leading-relaxed text-linen/42 md:text-right">
          Marina Gdynia / Sopot / Gdansk / Hel
        </div>
      </div>
    </div>
  );
};
