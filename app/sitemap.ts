import { MetadataRoute } from 'next';
import { getAllListings } from '@/lib/listings';

export default function sitemap(): MetadataRoute.Sitemap {
  const listings = getAllListings();
  const baseUrl = 'https://car-wash-marketplace.vercel.app';

  const listingUrls = listings.map(l => ({
    url: `${baseUrl}/listings/${l.slug}`,
    lastModified: new Date(l.listed),
    changeFrequency: 'weekly' as const,
    priority: l.featured ? 0.9 : 0.7,
  }));

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/listings`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/list-your-business`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/buyers-guide`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    ...listingUrls,
  ];
}
