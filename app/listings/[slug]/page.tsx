import { getAllListings, getListingBySlug, formatCurrency } from "@/lib/listings";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

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

export default async function ListingDetailPage({ params }: Props) {
  const { slug } = await params;
  const listing = getListingBySlug(slug);
  if (!listing) notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link href="/" className="hover:text-yellow-400 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/listings" className="hover:text-yellow-400 transition-colors">Listings</Link>
        <span>/</span>
        <span className="text-slate-300 truncate max-w-xs">{listing.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* MAIN CONTENT */}
        <div className="lg:col-span-2 space-y-6">
          {/* Hero image placeholder */}
          <div className="rounded-xl overflow-hidden h-64 sm:h-80 relative" style={{ background: 'linear-gradient(135deg, #112240 0%, #1a2e4a 50%, #0d1c35 100%)' }}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center opacity-20">
                <div className="text-8xl mb-3">🚗</div>
                <div className="text-slate-400 text-sm">{listing.location.city}, {listing.location.stateCode}</div>
              </div>
            </div>
            {listing.featured && (
              <div className="absolute top-4 left-4">
                <span className="featured-badge text-sm font-bold px-3 py-1.5 rounded-full">FEATURED LISTING</span>
              </div>
            )}
          </div>

          {/* Title & type */}
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="text-xs bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full">{listing.type}</span>
              <span className="text-slate-500 text-sm">📍 {listing.location.city}, {listing.location.state}</span>
              <span className="text-slate-500 text-sm">Est. {listing.yearEstablished}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              {listing.name}
            </h1>
          </div>

          {/* Key metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Asking Price', value: formatCurrency(listing.askingPrice), color: 'text-yellow-400' },
              { label: 'Annual Revenue', value: formatCurrency(listing.annualRevenue), color: 'text-white' },
              { label: 'Cash Flow', value: formatCurrency(listing.annualCashFlow), color: 'text-green-400' },
              { label: 'EBITDA Multiple', value: `${listing.multiple}x`, color: 'text-blue-400' },
            ].map(m => (
              <div key={m.label} className="card-navy rounded-xl p-4 text-center">
                <div className={`text-xl font-bold mb-1 ${m.color}`}>{m.value}</div>
                <div className="text-slate-500 text-xs">{m.label}</div>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="card-navy rounded-xl p-6">
            <h2 className="text-white font-bold text-lg mb-3">Business Overview</h2>
            <p className="text-slate-300 leading-relaxed">{listing.description}</p>
          </div>

          {/* Highlights */}
          <div className="card-navy rounded-xl p-6">
            <h2 className="text-white font-bold text-lg mb-4">Key Highlights</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {listing.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-yellow-500 mt-0.5 font-bold shrink-0">✓</span>
                  <span className="text-slate-300 text-sm">{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Details table */}
          <div className="card-navy rounded-xl p-6">
            <h2 className="text-white font-bold text-lg mb-4">Listing Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: 'Business Type', value: listing.type },
                { label: 'Year Established', value: listing.yearEstablished.toString() },
                { label: 'Employees', value: listing.employees.toString() },
                { label: 'EBITDA', value: formatCurrency(listing.ebitda) },
                { label: 'Equipment', value: listing.equipment },
                { label: 'Real Estate', value: listing.realEstate },
                { label: 'Listed', value: new Date(listing.listed).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) },
              ].map(item => (
                <div key={item.label} className="flex flex-col gap-0.5">
                  <span className="text-xs text-slate-500 uppercase tracking-wide">{item.label}</span>
                  <span className="text-slate-200 text-sm">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-slate-600 text-xs leading-relaxed">
            This listing is provided for informational purposes only. WashDealers.com is not a licensed broker. All financial figures are unverified and provided by the listing broker or seller. Always conduct independent due diligence before any acquisition.
          </p>
        </div>

        {/* SIDEBAR */}
        <div className="space-y-5">
          {/* Price card */}
          <div className="card-navy rounded-xl p-5">
            <div className="mb-4">
              <div className="text-xs text-slate-500 mb-1">Asking Price</div>
              <div className="text-3xl font-extrabold" style={{ color: '#e8c96a' }}>{formatCurrency(listing.askingPrice)}</div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-center py-3 border-y mb-4" style={{ borderColor: 'rgba(201,168,76,0.1)' }}>
              <div>
                <div className="text-green-400 font-bold">{formatCurrency(listing.annualCashFlow)}</div>
                <div className="text-slate-500 text-xs">Cash Flow</div>
              </div>
              <div>
                <div className="text-blue-400 font-bold">{listing.multiple}x</div>
                <div className="text-slate-500 text-xs">EBITDA Multiple</div>
              </div>
            </div>
            <div className="text-xs text-slate-500 mb-4">
              <strong className="text-slate-300">Listing Broker:</strong> {listing.brokerFirm}
            </div>
          </div>

          {/* Contact form */}
          <ContactForm listingId={listing.id} listingName={listing.name} contactEmail={listing.contactEmail} />

          {/* Sticky CTA for mobile */}
          <div className="card-navy rounded-xl p-5">
            <h3 className="text-white font-bold mb-2">Selling a Car Wash?</h3>
            <p className="text-slate-400 text-sm mb-4">Get your listing in front of qualified buyers and PE firms for just $99/month.</p>
            <Link href="/list-your-business" className="btn-gold w-full py-3 rounded-lg text-sm font-bold text-center block">
              List Your Business
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
