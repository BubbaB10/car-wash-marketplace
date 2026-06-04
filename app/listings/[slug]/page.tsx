import { getAllListings, getListingBySlug, filterListings, formatCurrency } from "@/lib/listings";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import ListingCard from "@/components/ListingCard";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllListings().map(l => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const listing = getListingBySlug(slug);
  if (!listing) return { title: "Listing Not Found" };
  return {
    title: `${listing.name} | WashDealers.com`,
    description: `${listing.type} in ${listing.location.city}, ${listing.location.state}. Asking ${formatCurrency(listing.askingPrice)}, ${formatCurrency(listing.annualRevenue)} annual revenue. ${listing.description.slice(0, 150)}`,
  };
}

const WASH_TYPE_STYLES: Record<string, { bg: string; color: string }> = {
  "Express Tunnel":   { bg: "rgba(59,130,246,0.2)",  color: "#93c5fd" },
  "Full Service":     { bg: "rgba(139,92,246,0.2)",  color: "#c4b5fd" },
  "Self-Serve":       { bg: "rgba(16,185,129,0.2)",  color: "#6ee7b7" },
  "Self Serve":       { bg: "rgba(16,185,129,0.2)",  color: "#6ee7b7" },
  "In-Bay Automatic": { bg: "rgba(251,146,60,0.2)",  color: "#fed7aa" },
  "Mobile":           { bg: "rgba(236,72,153,0.2)",  color: "#f9a8d4" },
};

function getWashTypeStyle(type: string) {
  return WASH_TYPE_STYLES[type] || { bg: "rgba(201,168,76,0.2)", color: "#e8c96a" };
}

function getWhyThisDeal(type: string): string[] {
  const t = type.toLowerCase();
  if (t.includes("express tunnel")) return [
    "Express tunnels command 7-10x EBITDA multiples — the premium segment of car wash M&A",
    "High throughput, low labor, and membership-based revenue create predictable monthly cash flow",
    "Fragmented ownership creates consolidation upside — scale multiple sites under one platform",
  ];
  if (t.includes("full service")) return [
    "Full-service washes attract loyal, high-ticket customers willing to pay premium prices",
    "Diversified revenue streams: interior detailing, exterior wash, and add-on services",
    "Strong brand differentiation in markets where express tunnels haven't taken over",
  ];
  if (t.includes("self")) return [
    "Self-serve washes are low-labor, recession-resilient businesses with minimal staffing overhead",
    "Real estate often included — land ownership dramatically improves long-term return profile",
    "Simple operations make these ideal for semi-absentee or portfolio add-on acquisitions",
  ];
  if (t.includes("in-bay") || t.includes("automatic")) return [
    "In-bay automatics generate consistent revenue 24/7 with minimal labor requirements",
    "Compact footprint means lower real estate costs and easier site licensing",
    "Add-on revenue from vacuums, vending, and detail products boosts per-car yield",
  ];
  return [
    "Car wash businesses offer recession-resilient, recurring revenue with strong cash flow",
    "Industry tailwinds: PE consolidation driving premium valuations for quality operators",
    "Semi-absentee operation possible with proper management in place",
  ];
}

export default async function ListingDetailPage({ params }: Props) {
  const { slug } = await params;
  const listing = getListingBySlug(slug);
  if (!listing) notFound();

  const typeStyle = getWashTypeStyle(listing.type);
  const whyThisDeal = listing.highlights?.length >= 3
    ? listing.highlights.slice(0, 3)
    : getWhyThisDeal(listing.type);

  const emailSubject = `Interest: ${listing.name}`;
  const ndaSubject = `NDA Request: ${listing.name}`;
  const callSubject = `Schedule a Call: ${listing.name}`;
  const emailTo = "hello@micro-titan.com";

  // Similar listings: same state first, then same type
  const allListings = getAllListings();
  const similarByState = allListings.filter(
    l => l.slug !== listing.slug && l.location.stateCode === listing.location.stateCode
  ).slice(0, 2);
  const similarByType = allListings.filter(
    l => l.slug !== listing.slug && l.type === listing.type && !similarByState.find(s => s.slug === l.slug)
  ).slice(0, 3 - similarByState.length);
  const similarListings = [...similarByState, ...similarByType].slice(0, 3);

  const hasRevenue = listing.annualRevenue > 0;
  const hasCashFlow = listing.annualCashFlow > 0;
  const revenueMultiple = hasRevenue && listing.askingPrice > 0
    ? (listing.askingPrice / listing.annualRevenue).toFixed(1)
    : null;

  const description = listing.description && listing.description.length > 20
    ? listing.description
    : `This ${listing.type.toLowerCase()} car wash is located in ${listing.location.city}, ${listing.location.state}. Contact us for full details under NDA.`;

  return (
    <div style={{ background: "var(--navy)" }}>
      {/* BREADCRUMB */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-yellow-400 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/listings" className="hover:text-yellow-400 transition-colors">Listings</Link>
          <span>/</span>
          <span className="text-slate-300 truncate max-w-xs">{listing.name}</span>
        </div>
      </div>

      {/* HERO SECTION */}
      <section
        className="py-12 sm:py-16 relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #060e1a 0%, #0a1628 40%, #112240 100%)" }}
      >
        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, rgba(201,168,76,0.8) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Badges row */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span
              style={{
                fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.06em",
                padding: "5px 14px", borderRadius: "100px",
                background: typeStyle.bg, color: typeStyle.color,
                border: `1px solid ${typeStyle.color}30`,
              }}
            >
              {listing.type.toUpperCase()}
            </span>
            {listing.featured && (
              <span
                style={{
                  fontSize: "0.65rem", fontWeight: 800, letterSpacing: "0.08em",
                  padding: "5px 12px", borderRadius: "100px",
                  background: "linear-gradient(135deg, #c9a84c, #e8c96a)",
                  color: "#0a0f1e",
                }}
              >
                FEATURED LISTING
              </span>
            )}
          </div>

          {/* Business name */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
            {listing.name}
          </h1>

          {/* Location + listed on */}
          <div className="flex flex-wrap items-center gap-4 mb-8 text-slate-400">
            <span className="flex items-center gap-1.5 text-sm">
              <span>&#128205;</span>
              {listing.location.city}, {listing.location.state}
            </span>
            <span className="text-slate-600 hidden sm:inline">&#8226;</span>
            <span className="text-sm">Listed on WashDealers.com</span>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={`mailto:${emailTo}?subject=${encodeURIComponent(ndaSubject)}`}
              className="btn-gold px-7 py-3.5 rounded-xl text-sm font-bold text-center inline-block"
            >
              Request NDA &amp; Info Package
            </a>
            <a
              href={`mailto:${emailTo}?subject=${encodeURIComponent(callSubject)}`}
              className="px-7 py-3.5 rounded-xl text-sm font-bold text-center inline-block transition-all hover:bg-white hover:text-navy"
              style={{
                border: "1.5px solid rgba(201,168,76,0.6)",
                color: "#e8c96a",
              }}
            >
              Schedule a Call
            </a>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* LEFT COLUMN — 2/3 */}
          <div className="flex-1 space-y-6">

            {/* FINANCIAL OVERVIEW */}
            <div className="card-navy rounded-2xl p-7">
              <h2 className="text-white font-bold text-xl mb-6 flex items-center gap-2">
                <span style={{ color: "#e8c96a" }}>&#36;</span>
                Financial Overview
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 mb-6">
                {/* Asking Price */}
                <div className="col-span-2 sm:col-span-1">
                  <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Asking Price</div>
                  <div className="text-3xl font-extrabold" style={{ color: "#e8c96a" }}>
                    {listing.askingPrice > 0 ? formatCurrency(listing.askingPrice) : "Call"}
                  </div>
                </div>

                {hasRevenue && (
                  <div>
                    <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Annual Revenue</div>
                    <div className="text-2xl font-bold text-white">{formatCurrency(listing.annualRevenue)}</div>
                  </div>
                )}

                {hasCashFlow && (
                  <div>
                    <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Annual Cash Flow</div>
                    <div className="text-2xl font-bold text-green-400">{formatCurrency(listing.annualCashFlow)}</div>
                  </div>
                )}

                {revenueMultiple && (
                  <div>
                    <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Revenue Multiple</div>
                    <div className="text-2xl font-bold text-blue-400">{revenueMultiple}x</div>
                  </div>
                )}
              </div>

              <p className="text-slate-600 text-xs border-t pt-4" style={{ borderColor: "rgba(201,168,76,0.1)" }}>
                Financials provided by seller. Verify independently before making any acquisition decisions.
              </p>
            </div>

            {/* ABOUT THIS BUSINESS */}
            <div className="card-navy rounded-2xl p-7">
              <h2 className="text-white font-bold text-xl mb-4">About This Business</h2>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">{description}</p>
              {listing.equipment && (
                <div className="mt-4 pt-4 border-t" style={{ borderColor: "rgba(201,168,76,0.1)" }}>
                  <span className="text-xs text-slate-500 uppercase tracking-wide">Equipment: </span>
                  <span className="text-slate-300 text-sm">{listing.equipment}</span>
                </div>
              )}
            </div>

            {/* WHY THIS DEAL */}
            <div className="card-navy rounded-2xl p-7">
              <h2 className="text-white font-bold text-xl mb-5">Why This Deal</h2>
              <div className="space-y-4">
                {whyThisDeal.map((point, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div
                      className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5"
                      style={{ background: "rgba(201,168,76,0.15)", color: "#e8c96a" }}
                    >
                      {i + 1}
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Disclaimer */}
            <p className="text-slate-600 text-xs leading-relaxed px-1">
              This listing is provided for informational purposes only. WashDealers.com is not a licensed broker. All financial figures are unverified and provided by the listing broker or seller. Always conduct independent due diligence before any acquisition.
            </p>
          </div>

          {/* RIGHT COLUMN — 1/3 */}
          <div className="lg:w-80 xl:w-96 shrink-0 space-y-5">

            {/* DEAL INFO CARD */}
            <div className="rounded-2xl p-6" style={{ background: "#112240", border: "1px solid rgba(201,168,76,0.2)" }}>
              <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Deal Info</h3>
              <div className="space-y-3">
                {[
                  { label: "Business Type", value: listing.type },
                  { label: "Location", value: `${listing.location.city}, ${listing.location.state}` },
                  { label: "Listing Status", value: "Active" },
                  { label: "Source", value: listing.brokerFirm || "WashDealers.com" },
                  { label: "Listed", value: "2026" },
                  ...(listing.yearEstablished ? [{ label: "Est.", value: listing.yearEstablished.toString() }] : []),
                ].map(item => (
                  <div key={item.label} className="flex items-start justify-between gap-2 text-sm">
                    <span className="text-slate-500 shrink-0">{item.label}</span>
                    <span className="text-slate-200 text-right font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA CARD */}
            <div
              className="rounded-2xl p-6"
              style={{ background: "linear-gradient(135deg, #b8922a 0%, #c9a84c 40%, #e8c96a 100%)" }}
            >
              <h3 className="font-extrabold text-lg mb-2" style={{ color: "#0a1628" }}>
                Interested in this listing?
              </h3>
              <p className="text-sm mb-5 leading-relaxed" style={{ color: "rgba(10,22,40,0.75)" }}>
                Get the full info package including financials, photos, and seller contact under NDA.
              </p>
              <a
                href={`mailto:${emailTo}?subject=${encodeURIComponent(emailSubject)}`}
                className="block w-full text-center py-3 rounded-xl text-sm font-bold transition-all hover:opacity-90"
                style={{ background: "#0a1628", color: "#e8c96a" }}
              >
                Request Info Package &#8594;
              </a>
            </div>

            {/* SIMILAR LISTINGS */}
            {similarListings.length > 0 && (
              <div>
                <h3 className="text-slate-400 text-xs uppercase tracking-wider font-semibold mb-3 px-1">
                  Similar Listings
                </h3>
                <div className="space-y-4">
                  {similarListings.map(l => (
                    <ListingCard key={l.id} listing={l} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
