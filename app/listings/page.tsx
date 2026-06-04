import { getAllListings, filterListings, WASH_TYPES, US_STATES } from "@/lib/listings";
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

  // Build state label for filter display
  const stateLabel = sp.state
    ? US_STATES.find(s => s.code === sp.state)?.name ?? sp.state
    : null;

  return (
    <div style={{ background: "var(--navy)", minHeight: "100vh" }}>

      {/* DARK HERO HEADER */}
      <section
        className="py-12 sm:py-16 relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #060e1a 0%, #0a1628 50%, #112240 100%)" }}
      >
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, rgba(201,168,76,0.8) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-2xl">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4 border"
              style={{ borderColor: "rgba(201,168,76,0.3)", background: "rgba(201,168,76,0.08)", color: "#e8c96a" }}
            >
              <span>&#128269;</span> Active Listings
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
              Car Wash Businesses{" "}
              <span className="gradient-gold">For Sale</span>
            </h1>
            <p className="text-slate-400 text-lg mb-2">
              {hasFilters ? (
                <>
                  <span className="text-white font-semibold">{filtered.length}</span> listing{filtered.length !== 1 ? "s" : ""} matching your filters
                  {stateLabel && <span className="text-slate-400"> in <span className="text-yellow-400">{stateLabel}</span></span>}
                  {sp.type && <span className="text-slate-400"> &mdash; <span className="text-yellow-400">{sp.type}</span></span>}
                </>
              ) : (
                <>
                  <span className="text-white font-semibold">{allListings.length}</span> active listings across the United States
                </>
              )}
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* SIDEBAR FILTERS */}
          <aside className="lg:w-72 shrink-0">
            <div
              className="rounded-2xl p-6 sticky top-20"
              style={{ background: "#112240", border: "1px solid rgba(201,168,76,0.15)" }}
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-bold text-white">Filters</h2>
                {hasFilters && (
                  <Link href="/listings" className="text-xs font-semibold transition-colors" style={{ color: "#e8c96a" }}>
                    Clear all
                  </Link>
                )}
              </div>

              {/* State filter */}
              <div className="mb-6">
                <label className="block text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "#e8c96a" }}>
                  State
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {Array.from(new Set(allListings.map(l => l.location.stateCode))).sort().map(code => {
                    const isActive = sp.state === code;
                    const params = new URLSearchParams(sp as Record<string, string>);
                    if (isActive) { params.delete("state"); } else { params.set("state", code); }
                    return (
                      <Link
                        key={code}
                        href={`/listings?${params.toString()}`}
                        className="text-xs px-2.5 py-1 rounded-lg font-semibold transition-all"
                        style={
                          isActive
                            ? { background: "linear-gradient(135deg, #c9a84c, #e8c96a)", color: "#0a1628" }
                            : { background: "rgba(255,255,255,0.04)", color: "#94a3b8", border: "1px solid rgba(255,255,255,0.06)" }
                        }
                      >
                        {code}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Type filter */}
              <div className="mb-6">
                <label className="block text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "#e8c96a" }}>
                  Wash Type
                </label>
                <div className="space-y-1.5">
                  {WASH_TYPES.map(t => {
                    const isActive = sp.type === t;
                    const params = new URLSearchParams(sp as Record<string, string>);
                    if (isActive) { params.delete("type"); } else { params.set("type", t); }
                    const count = allListings.filter(l => l.type === t).length;
                    return (
                      <Link
                        key={t}
                        href={`/listings?${params.toString()}`}
                        className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm transition-all"
                        style={
                          isActive
                            ? { background: "rgba(201,168,76,0.15)", color: "#e8c96a", border: "1px solid rgba(201,168,76,0.4)" }
                            : { color: "#94a3b8", border: "1px solid transparent" }
                        }
                      >
                        <span className={isActive ? "font-semibold" : ""}>{t}</span>
                        <span
                          className="text-xs px-1.5 py-0.5 rounded-full"
                          style={{ background: "rgba(255,255,255,0.06)", color: "#64748b" }}
                        >
                          {count}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Price filter */}
              <div className="mb-6">
                <label className="block text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "#e8c96a" }}>
                  Max Price
                </label>
                <div className="space-y-1.5">
                  {[
                    { label: "Under $500K",  value: "500000" },
                    { label: "Under $1M",    value: "1000000" },
                    { label: "Under $2.5M",  value: "2500000" },
                    { label: "Under $5M",    value: "5000000" },
                    { label: "Under $10M",   value: "10000000" },
                  ].map(opt => {
                    const isActive = sp.maxPrice === opt.value;
                    const params = new URLSearchParams(sp as Record<string, string>);
                    if (isActive) { params.delete("maxPrice"); } else { params.set("maxPrice", opt.value); }
                    return (
                      <Link
                        key={opt.value}
                        href={`/listings?${params.toString()}`}
                        className="flex w-full px-3 py-2.5 rounded-lg text-sm transition-all"
                        style={
                          isActive
                            ? { background: "rgba(201,168,76,0.15)", color: "#e8c96a", border: "1px solid rgba(201,168,76,0.4)" }
                            : { color: "#94a3b8", border: "1px solid transparent" }
                        }
                      >
                        <span className={isActive ? "font-semibold" : ""}>{opt.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t" style={{ borderColor: "rgba(201,168,76,0.1)" }}>
                <Link
                  href="/list-your-business"
                  className="btn-gold w-full py-3 rounded-xl text-sm font-bold text-center block"
                >
                  + List Your Business
                </Link>
              </div>
            </div>
          </aside>

          {/* LISTINGS GRID */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div
                className="rounded-2xl p-12 text-center"
                style={{ background: "#112240", border: "1px solid rgba(201,168,76,0.15)" }}
              >
                <div className="text-4xl mb-4">&#128269;</div>
                <h3 className="text-white font-bold text-lg mb-2">No listings found</h3>
                <p className="text-slate-400 mb-6">Try adjusting your filters or browse all listings.</p>
                <Link href="/listings" className="btn-gold px-6 py-2.5 rounded-xl text-sm font-bold inline-block">
                  View All Listings
                </Link>
              </div>
            ) : (
              <>
                {/* Sort bar */}
                <div className="flex items-center justify-between mb-6 text-sm">
                  <span className="text-slate-400">
                    Showing{" "}
                    <strong className="text-white">{filtered.length}</strong>{" "}
                    listing{filtered.length !== 1 ? "s" : ""}
                  </span>
                  <span className="text-slate-600 text-xs">Featured first</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {[...filtered]
                    .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
                    .map(listing => (
                      <ListingCard key={listing.id} listing={listing} />
                    ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
