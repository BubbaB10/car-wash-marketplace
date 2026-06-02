import listingsData from '../listings.json';

export interface Listing {
  id: string;
  name: string;
  slug: string;
  type: string;
  askingPrice: number;
  annualRevenue: number;
  annualCashFlow: number;
  ebitda: number;
  multiple: number;
  location: {
    city: string;
    state: string;
    stateCode: string;
    zip: string;
  };
  description: string;
  highlights: string[];
  equipment: string;
  realEstate: string;
  employees: number;
  yearEstablished: number;
  listed: string;
  featured: boolean;
  images: string[];
  contactName: string;
  contactEmail: string;
  brokerFirm: string;
}

export const listings: Listing[] = listingsData as Listing[];

export function getAllListings(): Listing[] {
  return listings;
}

export function getFeaturedListings(): Listing[] {
  return listings.filter(l => l.featured);
}

export function getListingBySlug(slug: string): Listing | undefined {
  return listings.find(l => l.slug === slug);
}

export function filterListings(params: {
  state?: string;
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  minRevenue?: number;
  maxRevenue?: number;
}): Listing[] {
  return listings.filter(l => {
    if (params.state && l.location.stateCode !== params.state) return false;
    if (params.type && l.type !== params.type) return false;
    if (params.minPrice && l.askingPrice < params.minPrice) return false;
    if (params.maxPrice && l.askingPrice > params.maxPrice) return false;
    if (params.minRevenue && l.annualRevenue < params.minRevenue) return false;
    if (params.maxRevenue && l.annualRevenue > params.maxRevenue) return false;
    return true;
  });
}

export function formatCurrency(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n}`;
}

export const US_STATES = [
  { code: 'AL', name: 'Alabama' }, { code: 'AK', name: 'Alaska' },
  { code: 'AZ', name: 'Arizona' }, { code: 'AR', name: 'Arkansas' },
  { code: 'CA', name: 'California' }, { code: 'CO', name: 'Colorado' },
  { code: 'CT', name: 'Connecticut' }, { code: 'DE', name: 'Delaware' },
  { code: 'FL', name: 'Florida' }, { code: 'GA', name: 'Georgia' },
  { code: 'HI', name: 'Hawaii' }, { code: 'ID', name: 'Idaho' },
  { code: 'IL', name: 'Illinois' }, { code: 'IN', name: 'Indiana' },
  { code: 'IA', name: 'Iowa' }, { code: 'KS', name: 'Kansas' },
  { code: 'KY', name: 'Kentucky' }, { code: 'LA', name: 'Louisiana' },
  { code: 'ME', name: 'Maine' }, { code: 'MD', name: 'Maryland' },
  { code: 'MA', name: 'Massachusetts' }, { code: 'MI', name: 'Michigan' },
  { code: 'MN', name: 'Minnesota' }, { code: 'MS', name: 'Mississippi' },
  { code: 'MO', name: 'Missouri' }, { code: 'MT', name: 'Montana' },
  { code: 'NE', name: 'Nebraska' }, { code: 'NV', name: 'Nevada' },
  { code: 'NH', name: 'New Hampshire' }, { code: 'NJ', name: 'New Jersey' },
  { code: 'NM', name: 'New Mexico' }, { code: 'NY', name: 'New York' },
  { code: 'NC', name: 'North Carolina' }, { code: 'ND', name: 'North Dakota' },
  { code: 'OH', name: 'Ohio' }, { code: 'OK', name: 'Oklahoma' },
  { code: 'OR', name: 'Oregon' }, { code: 'PA', name: 'Pennsylvania' },
  { code: 'RI', name: 'Rhode Island' }, { code: 'SC', name: 'South Carolina' },
  { code: 'SD', name: 'South Dakota' }, { code: 'TN', name: 'Tennessee' },
  { code: 'TX', name: 'Texas' }, { code: 'UT', name: 'Utah' },
  { code: 'VT', name: 'Vermont' }, { code: 'VA', name: 'Virginia' },
  { code: 'WA', name: 'Washington' }, { code: 'WV', name: 'West Virginia' },
  { code: 'WI', name: 'Wisconsin' }, { code: 'WY', name: 'Wyoming' },
];

export const WASH_TYPES = [
  'Express Tunnel',
  'Full Service',
  'Self-Serve',
  'In-Bay Automatic',
  'Mobile',
];
