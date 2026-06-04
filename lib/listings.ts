import staticListingsData from '../listings.json';

// Load real scraped listings when available, fallback to static data
function loadListingsData() {
  // In server contexts (Node.js / Next.js SSR), try to load real-listings.json
  if (typeof window === 'undefined') {
    try {
      // Dynamic require for runtime loading (avoids build-time bundling issues)
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const fs = require('fs') as typeof import('fs');
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const pathMod = require('path') as typeof import('path');
      const realListingsPath = pathMod.join(process.cwd(), 'real-listings.json');
      if (fs.existsSync(realListingsPath)) {
        const raw = fs.readFileSync(realListingsPath, 'utf8');
        const scraped = JSON.parse(raw) as ScrapedListing[];
        if (scraped.length > 0) {
          // Convert scraped format to Listing format and merge with static
          const converted = scraped
            .filter(s => s.name && s.askingPrice > 0)
            .map(s => scrapedToListing(s));
          if (converted.length > 0) {
            return [...(staticListingsData as unknown as Listing[]), ...converted];
          }
        }
      }
    } catch {
      // Silently fall back to static data
    }
  }
  return staticListingsData as unknown as Listing[];
}

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

// Scraped listing shape from scrape-listings.cjs output
interface ScrapedListing {
  id: string;
  name: string;
  source: string;
  askingPrice: number;
  annualRevenue: number;
  cashFlow: number;
  location: {
    raw: string;
    city: string;
    state: string;
    stateCode: string;
    zip: string;
  };
  description: string;
  listingUrl: string;
  scrapedAt: string;
}

function scrapedToListing(s: ScrapedListing): Listing {
  return {
    id: s.id,
    name: s.name,
    slug: s.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
    type: detectWashType(s.name + ' ' + s.description),
    askingPrice: s.askingPrice,
    annualRevenue: s.annualRevenue,
    annualCashFlow: s.cashFlow,
    ebitda: Math.round(s.cashFlow * 0.85),
    multiple: s.annualRevenue > 0 ? Math.round((s.askingPrice / s.annualRevenue) * 10) / 10 : 0,
    location: {
      city: s.location.city,
      state: s.location.state,
      stateCode: s.location.stateCode,
      zip: s.location.zip,
    },
    description: s.description,
    highlights: [],
    equipment: '',
    realEstate: '',
    employees: 0,
    yearEstablished: 0,
    listed: s.scrapedAt ? s.scrapedAt.slice(0, 10) : new Date().toISOString().slice(0, 10),
    featured: false,
    images: [],
    contactName: '',
    contactEmail: '',
    brokerFirm: s.source || '',
  };
}

function detectWashType(text: string): string {
  const t = text.toLowerCase();
  if (t.includes('express tunnel') || t.includes('tunnel')) return 'Express Tunnel';
  if (t.includes('full service') || t.includes('full-service')) return 'Full Service';
  if (t.includes('self-serve') || t.includes('self serve') || t.includes('coin')) return 'Self-Serve';
  if (t.includes('in-bay') || t.includes('automatic') || t.includes('rollover')) return 'In-Bay Automatic';
  if (t.includes('mobile')) return 'Mobile';
  return 'Express Tunnel'; // default
}

export const listings: Listing[] = loadListingsData();

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
