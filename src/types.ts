export interface DetailedFeature {
  title: string;
  description: string;
  image?: string;
  items?: string[];
}

export interface VesselSpecs {
  name: string;
  model: string;
  loa: string;
  beam: string;
  draft: string;
  guests: number;
  cabins: number;
  crew: number;
  features: string[];
  detailedFeatures?: DetailedFeature[];
  toys: string[];
  amenities?: {
    entertainment: string[];
    galley: string[];
    sleeping: string[];
  };
}

export interface ItineraryStep {
  location: string;
  highlight: string;
  tags?: string[];
  image?: string;
  extendedDescription?: string;
}

export interface Experience {
  id: string;
  title: string;
  description: string;
  image: string;
  type: 'day' | 'liveaboard' | 'special';
  priceFrom: string;
  duration?: string;
  routes?: string[];
  itinerary?: ItineraryStep[];
  tripAdvisorUrl?: string;
}

export interface Destination {
  id: string;
  name: string;
  description: string;
  image: string;
  highlights: string[];
}

export interface Extra {
  id: string;
  name: string;
  description: string;
  icon: string;
  priceFrom: string;
}
