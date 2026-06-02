import { getAllListings, filterListings, WASH_TYPES } from "@/lib/listings";
import ListingCard from "@/components/ListingCard";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Car Wash Businesses For Sale | WashDealers.com",
  description: "Browse all car wash businesses for sale. Filter by state, type, and price range. Express tunnels, full-service, self-serve, and portfolios.",
};

export default async function ListingsPage({
  searchParams,
}: {
  searchParams: Promise<{ state?: string; type?: string; minPrice?: string; maxPrice?: string }>;
}) {
  const sp = await searchParams;
  const filtered = filterListings({
    state: sp.state,
    type: sp.type,
    minPrice: sp.minPrice ? Number(sp.minPrice) : undefined,
    maxPrice: sp.maxPrice ? Number(sp.maxPrice) : undefined,
  });

  const allListings = getAllListings();
  const hasFilters = !!(sp.state || sp.type || sp.minPrice || sp.maxPrice);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white mb-2">
          Car Wash Businesses For Sale
        </h1>
        <p className="text-slate-400">
          {filtered.length} listing{filtered.length !== 1 ? 's' : ''} found
          {hasFilters ? ' matching your filters' : ''}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* SIDEBAR FILTERS */}
        <aside className="lg:w-64 shrink-0">
          <div className="card-navy rounded-xl p-5 sticky top-20">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-white">Filters</h2>
              {hasFilters && (
                <Link href="/listings" className="text-xs text-yellow-400 hover:text-yellow-300">
                  Clear all
                </Link>
              )}
            </div>

            {/* State filter */}
            <div className="mb-5">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">State</label>
              <div className="flex flex-wrap gap-1">
                {Array.from(new Set(allListings.map(l => l.location.stateCode))).sort().map(code => {
                  const isActive = sp.state === code;
                  const params = new URLSearchParams(sp as Record<string, string>);
                  if (isActive) { params.delete('state'); } else { params.set('state', code); }
                  return (
                    <Link key={code} href={`/listings?${params.toString()}`}
                      className={`text-xs px-2 py-1 rounded font-medium transition-colors ${isActive
                        ? 'bg-yellow-500 text-black font-bold' : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                        }`}>
                      {code}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Type filter */}
            <div className="mb-5">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Wash Type</label>
              <div className="space-y-1">
                {WASH_TYPES.map(t => {
                  const isActive = sp.type === t;
                  const params = new URLSearchParams(sp as Record<string, string>);
                  if (isActive) { params.delete('type'); } else { params.set('type', t); }
                  return (
                    <Link key={t} href={`/listings?${params.toString()}`}
                      className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm transition-colors ${isActive
                        ? 'bg-yellow-500 text-black font-semibold' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                        }`}>
                      <span>{t}</span>
                      <span className="text-xs opacity-60">{allListings.filter(l => l.type === t).length}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Price filter */}
            <div className="mb-5">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Max Price</label>
              <div className="space-y-1">
                {[
                  { label: 'Under $500K', value: '500000' },
                  { label: 'Under $1M', value: '1000000' },
                  { label: 'Under $2.5M', value: '2500000' },
                  { label: 'Under $5M', value: '5000000' },
                  { label: 'Under $10M', value: '10000000' },
                ].map(opt => {
                  const isActive = sp.maxPrice === opt.value;
                  const params = new URLSearchParams(sp as Record<string, string>);
                  if (isActive) { params.delete('maxPrice'); } else { params.set('maxPrice', opt.value); }
                  return (
                    <Link key={opt.value} href={`/listings?${params.toString()}`}
                      className={`flex w-full px-3 py-2 rounded-lg text-sm transition-colors ${isActive
                        ? 'bg-yellow-500 text-black font-semibold' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                        }`}>
                      {opt.label}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t" style={{ borderColor: 'rgba(201,168,76,0.1)' }}>
              <Link href="/list-your-business" className="btn-gold w-full py-2.5 rounded-lg text-sm font-bold text-center block">
                + List Your Business
              </Link>
            </div>
          </div>
        </aside>

        {/* LISTINGS GRID */}
        <div className="flex-1">
          {filtered.length === 0 ? (
            <div className="card-navy rounded-xl p-12 text-center">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-white font-bold text-lg mb-2">No listings found</h3>
              <p className="text-slate-400 mb-6">Try adjusting your filters or browse all listings.</p>
              <Link href="/listings" className="btn-gold px-6 py-2.5 rounded-lg text-sm font-bold inline-block">
                View All Listings
              </Link>
            </div>
          ) : (
            <>
              {/* Sort bar */}
              <div className="flex items-center justify-between mb-5 text-sm">
                <span className="text-slate-400">
                  Showing <strong className="text-white">{filtered.length}</strong> listing{filtered.length !== 1 ? 's' : ''}
                </span>
                <span className="text-slate-500">Sorted: Featured first</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {[...filtered].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)).map(listing => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
