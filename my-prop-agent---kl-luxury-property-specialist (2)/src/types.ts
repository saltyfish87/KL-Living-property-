export interface ProjectLayout {
  id: string;
  name: string;
  size: string;
  rooms: string;
  description?: string;
  imageUrl: string;
  price?: string;
}

export interface ProjectGalleryItem {
  url: string;
  description: string;
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  developer: string;
  location: string;
  state: string;
  area: string;
  minPrice: number;
  priceRange: string;
  thumbnail: string;
  status: 'New Launch' | 'Under Construction' | 'Completed' | 'Pre-Launch' | 'Selling Fast' | 'Early Bird';
  tenure: 'Freehold' | 'Leasehold';
  propertyType: string;
  tagline: string;
  completionDate: string;
  completionYear: number;
  totalUnits: number;
  sizeSqft: string | number;
  rooms: string | number;
  overview: string;
  keyFeatures: string[];
  locationAdvantage: string[];
  investmentHighlights: string[];
  nearbyAmenities: { name: string; distance: string }[];
  droneViewUrl?: string;
  virtualTourUrl?: string;
  salesKitUrl?: string;
  brochureUrl?: string;
  summaryUrl?: string;
  mapImageUrl?: string;
  masterPlanImageUrl?: string;
  layouts?: ProjectLayout[];
  gallery?: string[];
  galleryItems?: ProjectGalleryItem[];
  landSize?: string;
  towerCount?: string | number;
  floorCount?: string | number;
  maintenanceFee?: string;
  commercialTitle?: boolean;
}

export interface Area {
  id: string;
  slug: string;
  name: string;
  description: string;
  whyInvest: string[];
  priceTrend: string;
  rentalDemand: string;
  recommendedProjectIds: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
}

export interface ContactInquiry {
  id?: string;
  name: string;
  email: string;
  phone: string;
  inquiryType: string;
  message: string;
  createdAt: any;
}
