import { VesselSpecs, Experience, Destination } from './types';

export const VESSEL: VesselSpecs = {
  name: 'SEA SEVEN',
  model: 'Admiral 27m (Cantieri Navali Lavagna)',
  loa: '27.00 m / 88 ft 7 in',
  beam: '5.90 m / 19 ft 4 in',
  draft: '1.90 m / 6 ft 3 in',
  guests: 16,
  cabins: 4,
  crew: 3,
  features: [
    'Comprehensive 2021 full refit',
    'Spacious flybridge with forward bar',
    'Al-fresco dining on main deck aft',
    'Large foredeck sunbeds',
    'Shallow 1.9m draft for coastal access',
    'Air conditioning throughout'
  ],
  detailedFeatures: [
    {
      title: 'CLASSIC ITALIAN CHARACTER',
      description: 'SEA SEVEN is a masterpiece of Italian maritime heritage. Reborn through a total 2021 refit, she combines the warmth of her mahogany hull with modernised systems and a laid-back, family-friendly atmosphere.',
      image: 'https://www.charterworld.com/images/yachts-1/motor%20yacht%20SEA%20SEVEN.jpg'
    },
    {
      title: 'LUXURIOUS SALON',
      description: 'The main deck salon features plush seating, a wide-screen TV, and formal dining. It is the perfect heart for the vessel—a sophisticated sanctuary for relaxation after a day of swimming in the Bay.',
      image: 'https://www.charterworld.com/images/yachts-1/%5BMY-SEA-SEVEN%5D-10140-1.jpg'
    },
    {
      title: 'SUNDECK & FLYBRIDGE',
      description: 'The expansive flybridge offers a forward bar, multiple lounging zones under a hardtop, and an open stern for sun loungers. Experience the breeze as you cruise between Sopot and Gdynia.',
      image: 'https://www.charterworld.com/images/yachts-1/%5BMY-SEA-SEVEN%5D-10140-3.jpg'
    },
    {
      title: 'MASTER SUITE',
      description: 'The master suite is a private retreat featuring a double berth, widescreen TV, personal desk/vanity, and an en-suite bathroom. Total comfort, even far from shore.',
      image: 'https://www.charterworld.com/images/yachts-1/%5BMY-SEA-SEVEN%5D-10140-4.jpg'
    },
    {
      title: 'FOREDECK RELAXATION',
      description: 'Broad sunbeds on the foredeck provide the ultimate spot for sunbathing or morning yoga, offering panoramic views of the Polish coast.',
      image: 'https://www.charterworld.com/images/yachts-1/%5BMY-SEA-SEVEN%5D-10140-2.jpg'
    }
  ],
  toys: [
    'RIB Tender for shore transfers',
    '2× i-AQUA underwater scooters',
    '2× Stand-up paddleboards (SUP)',
    '1× Kayak',
    '5 sets of Snorkeling gear',
    'Waterski & Wakeboard capability'
  ]
};

export const TECHNICAL_SPECS = {
  designer: 'Cantieri Navali Lavagna (CNL)',
  engines: '2 × MTU 12V 331 TC, 1,350 hp ea.',
  maxSpeed: '24 knots',
  cruiseSpeed: '15 knots',
  fuelCapacity: 'Range ~400 nm at cruise',
  waterCapacity: '3,500 L',
  hull: 'Mahogany',
  displacement: '75 t',
  built: '1978 / Refit 2021'
};

export const EXPERIENCES: Experience[] = [
  {
    id: 'sopot-sunset',
    title: 'Sopot Sunset Cruise',
    description: "Experience the magic of the Sopot Pier and Grand Hotel from the sea. As the sun sets over the Bay of Gdańsk, enjoy chilled champagne and gourmet appetizers on the flybridge. The lights of the Tri-City at dusk create a backdrop that is simply unforgettable.",
    image: 'https://www.charterworld.com/images/yachts-1/%5BMY-SEA-SEVEN%5D-10140-3.jpg',
    type: 'day',
    priceFrom: '€1,800',
    duration: '4 Hours',
    routes: [
      '18:00 - Departure from Gdynia/Sopot',
      '19:00 - Anchor off Sopot Pier',
      '20:00 - Sunset drinks on the Sundeck',
      '21:30 - Return to port under the stars'
    ],
    itinerary: [
      {
        location: 'Marina Gdynia',
        highlight: 'Welcome aboard with chilled champagne.',
        tags: ['Luxury', 'Welcome'],
        image: 'https://www.charterworld.com/images/yachts-1/motor%20yacht%20SEA%20SEVEN.jpg',
        extendedDescription: 'Start your evening in the largest marina in Poland. Our crew will welcome you with premium service as we glide out into the calm evening waters of the bay.'
      },
      {
        location: 'Sopot Pier',
        highlight: 'Anchor off Europe\'s longest wooden pier.',
        tags: ['Iconic', 'Views'],
        image: 'https://www.charterworld.com/images/yachts-1/%5BMY-SEA-SEVEN%5D-10140-2.jpg',
        extendedDescription: 'We anchor near the famous Molo, offering a front-row seat to the elegance of Sopot. Perfect for photographs and soaking in the atmosphere of Poland\'s most famous seaside resort.'
      }
    ]
  },
  {
    id: 'hel-adventure',
    title: 'Hel Peninsula Escape',
    description: "A journey to the 'Beginning of Poland'. Cross the bay to the sandy shores of Hel. Explore the seal sanctuary, enjoy the freshest seafood, and swim in the shallow, turquoise-tinted waters of the peninsula's wild beaches.",
    image: 'https://www.charterworld.com/images/yachts-1/%5BMY-SEA-SEVEN%5D-10140-2.jpg',
    type: 'day',
    priceFrom: '€3,200',
    duration: '8 Hours',
    routes: [
      '10:00 - Departure from Tri-City',
      '11:30 - Arrival at Hel Peninsula',
      '13:00 - Fresh seafood lunch in Hel',
      '15:00 - Beach day & water toys at Jurata',
      '18:00 - Return journey'
    ]
  }
];

export const DESTINATIONS: Destination[] = [
  {
    id: 'sopot',
    name: 'Sopot',
    description: 'The pearl of the Baltic. Sopot is synonymous with elegance, featuring the longest wooden pier in Europe and the iconic Grand Hotel. Anchor off the shore for a sophisticated day of SPA treatments or high-end dining.',
    image: 'https://images.unsplash.com/photo-1590273466070-40c466b4432c?auto=format&fit=crop&q=80&w=1920',
    highlights: ['Sopot Pier (Molo)', 'Grand Hotel', 'Monte Cassino St.']
  },
  {
    id: 'gdansk',
    name: 'Gdańsk',
    description: 'A city of history and amber. Enter the heart of the Old Town via the Motława river, passing the historic Crane and medieval architecture. Experience a cultural voyage through Poland\'s maritime capital.',
    image: 'https://images.unsplash.com/photo-1565018900183-9e45f5164d7d?auto=format&fit=crop&q=80&w=1920',
    highlights: ['Old Town / Motława', 'The Crane (Żuraw)', 'Westerplatte']
  },
  {
    id: 'gdynia',
    name: 'Gdynia',
    description: 'Modern, vibrant, and deep-water oriented. Gdynia is the perfect home base for Sea Seven, offering world-class marina facilities and a sleek, contemporary atmosphere.',
    image: 'https://images.unsplash.com/photo-1549413203-04987f62fac6?auto=format&fit=crop&q=80&w=1920',
    highlights: ['Kościuszko Square', 'Orłowo Cliffs', 'Marina Gdynia']
  },
  {
    id: 'hel',
    name: 'Hel Peninsula',
    description: 'A thin strip of sand separating the bay from the open Baltic. Hel is nature at its rawest—pine forests, wide beaches, and a unique fishing-village charm.',
    image: 'https://images.unsplash.com/photo-1572520336214-7265a6c11b0e?auto=format&fit=crop&q=80&w=1920',
    highlights: ['Seal Sanctuary', 'Hel Lighthouse', 'White Sand Beaches']
  }
];
