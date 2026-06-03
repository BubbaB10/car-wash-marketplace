import Link from "next/link";
import { getAllListings, getFeaturedListings, formatCurrency } from "@/lib/listings";
import ListingCard from "@/components/ListingCard";
import SearchBar from "@/components/SearchBar";

export default function HomePage() {
  const featured = getFeaturedListings().slice(0, 6);
  const allListings = getAllListings();
  const totalListings = allListings.length;
  const avgPrice = Math.round(allListings.reduce((s, l) => s + l.askingPrice, 0) / allListings.length);
  const states = new Set(allListings.map(l => l.location.stateCode)).size;

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #0d1117 0%, #111827 50%, #0d1117 100%)' }}>
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `linear-gradient(rgba(212,160,23,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(212,160,23,0.8) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10" style={{
          background: 'radial-gradient(ellipse at top right, #d4a017, transparent 70%)'
        }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-8 border" style={{ borderColor: 'rgba(212,160,23,0.35)', background: 'rgba(212,160,23,0.07)', color: '#e8c96a' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              20+ Active Listings &nbsp;&bull;&nbsp; Connecting buyers &amp; sellers across TX, FL, CA
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              The Only Marketplace<br/>
              <span className="gradient-gold">Built for Car Wash</span><br/>
              Acquisitions.
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 mb-8 leading-relaxed max-w-2xl">
              Find buyers, sellers, and brokers who know the industry.
              No noise. Just deals. PE firms, regional operators, and motivated owner-operators —
              all in one dedicated marketplace.
            </p>

            <SearchBar />

            <div className="flex flex-wrap gap-6 mt-10">
              <div>
                <div className="text-2xl font-bold" style={{ color: '#e8c96a' }}>20+</div>
                <div className="text-slate-400 text-sm">Active Listings</div>
              </div>
              <div className="w-px" style={{ background: 'rgba(212,160,23,0.2)' }} />
              <div>
                <div className="text-2xl font-bold" style={{ color: '#e8c96a' }}>{formatCurrency(avgPrice)}</div>
                <div className="text-slate-400 text-sm">Avg. Asking Price</div>
              </div>
              <div className="w-px" style={{ background: 'rgba(212,160,23,0.2)' }} />
              <div>
                <div className="text-2xl font-bold" style={{ color: '#e8c96a' }}>TX, FL, CA</div>
                <div className="text-slate-400 text-sm">Top Markets</div>
              </div>
              <div className="w-px hidden sm:block" style={{ background: 'rgba(212,160,23,0.2)' }} />
              <div className="hidden sm:block">
                <div className="text-2xl font-bold" style={{ color: '#e8c96a' }}>0.5%</div>
                <div className="text-slate-400 text-sm">Referral on Closed Deals</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY WASHDEALERS */}
      <section className="py-16" style={{ background: '#0d1c35' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-bold tracking-widest mb-3" style={{ color: '#d4a017' }}>WHY WASHDEALERS?</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              A dedicated marketplace beats a generic broker. Every time.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="14" cy="14" r="14" fill="rgba(212,160,23,0.15)"/>
                    <path d="M8 14.5L12 18.5L20 10" stroke="#d4a017" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ),
                title: 'Industry-Only Buyers',
                desc: 'Every buyer on WashDealers knows car wash economics: EBITDA multiples, membership revenue, unit-level costs. No educating required — they already speak your language.',
              },
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="14" cy="14" r="14" fill="rgba(212,160,23,0.15)"/>
                    <rect x="8" y="9" width="12" height="10" rx="2" stroke="#d4a017" strokeWidth="2"/>
                    <path d="M11 9V7M17 9V7" stroke="#d4a017" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                ),
                title: 'PE & Institutional Ready',
                desc: 'Portfolio listings, normalized financials, EBITDA multiples. Built for aggregators and private equity — not casual browsers who\'ve never seen a P&L.',
              },
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="14" cy="14" r="14" fill="rgba(212,160,23,0.15)"/>
                    <path d="M14 8V14L18 16" stroke="#d4a017" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ),
                title: 'Confidential & Fast',
                desc: 'List without broadcasting to employees or competitors. Connect with qualified buyers under NDA. Most listings find serious interest within 30 days.',
              },
            ].map((item, i) => (
              <div key={i} className="card-navy rounded-xl p-7">
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-white font-bold text-lg mb-3">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BROWSE BY TYPE */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-white mb-8">Browse by Wash Type</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { type: 'Express Tunnel', icon: '🚗', count: allListings.filter(l => l.type === 'Express Tunnel').length },
            { type: 'Full Service', icon: '✨', count: allListings.filter(l => l.type === 'Full Service').length },
            { type: 'Self-Serve', icon: '🪣', count: allListings.filter(l => l.type === 'Self-Serve').length },
            { type: 'In-Bay Automatic', icon: '🤖', count: allListings.filter(l => l.type === 'In-Bay Automatic').length },
            { type: 'Mobile', icon: '🚐', count: allListings.filter(l => l.type === 'Mobile').length },
          ].map(item => (
            <Link key={item.type} href={`/listings?type=${encodeURIComponent(item.type)}`}
              className="card-navy rounded-xl p-4 text-center group">
              <div className="text-3xl mb-2">{item.icon}</div>
              <div className="text-white font-semibold text-sm mb-1 group-hover:text-yellow-400 transition-colors">{item.type}</div>
              <div className="text-slate-500 text-xs">{item.count} listing{item.count !== 1 ? 's' : ''}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED LISTINGS */}
      <section className="py-4 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">Featured Listings</h2>
            <p className="text-slate-400 text-sm mt-1">Premium, broker-verified opportunities</p>
          </div>
          <Link href="/listings" className="text-yellow-400 hover:text-yellow-300 text-sm font-semibold transition-colors">
            View all {totalListings} listings →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map(listing => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </section>

      {/* MARKET INSIGHT BANNER */}
      <section style={{ background: 'linear-gradient(135deg, #111827, #1a2e4a)', borderTop: '1px solid rgba(212,160,23,0.2)', borderBottom: '1px solid rgba(212,160,23,0.2)' }} className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">The Car Wash Industry is Consolidating</h2>
              <p className="text-slate-300 max-w-xl leading-relaxed">
                PE-backed aggregators raised over $2B in the last 3 years specifically for car wash acquisitions. Express tunnel multiples average 7-9x EBITDA. Now is an excellent time for owner-operators to exit.
              </p>
            </div>
            <div className="flex gap-8 text-center shrink-0">
              <div>
                <div className="text-3xl font-extrabold" style={{ color: '#e8c96a' }}>$2B+</div>
                <div className="text-slate-400 text-sm">PE Capital Raised</div>
              </div>
              <div>
                <div className="text-3xl font-extrabold" style={{ color: '#e8c96a' }}>7-9x</div>
                <div className="text-slate-400 text-sm">EBITDA Multiples</div>
              </div>
              <div>
                <div className="text-3xl font-extrabold" style={{ color: '#e8c96a' }}>62%</div>
                <div className="text-slate-400 text-sm">YoY Deal Growth</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs font-bold tracking-widest mb-3" style={{ color: '#d4a017' }}>TRANSPARENT PRICING</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Simple. Fair. Aligned with your success.</h2>
          <p className="text-slate-400 max-w-xl mx-auto">List your business in minutes. Pay only when you get results.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card-navy rounded-2xl p-8 border-2" style={{ borderColor: 'rgba(212,160,23,0.4)' }}>
            <div className="text-xs font-bold tracking-widest text-slate-400 mb-2">FEATURED LISTING</div>
            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-5xl font-black text-white">$99</span>
              <span className="text-slate-400 text-lg">/mo</span>
            </div>
            <p className="text-slate-300 text-sm mb-6 leading-relaxed">
              Your listing promoted to the top of search results. Exposure to qualified PE buyers, regional operators, and commercial brokers actively looking.
            </p>
            <ul className="space-y-3 mb-8 text-sm text-slate-300">
              <li className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="8" fill="#d4a017"/><path d="M4.5 8L6.5 10L11.5 5.5" stroke="#0a1628" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Featured placement in search results
              </li>
              <li className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="8" fill="#d4a017"/><path d="M4.5 8L6.5 10L11.5 5.5" stroke="#0a1628" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Confidential listing — NDA gated
              </li>
              <li className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="8" fill="#d4a017"/><path d="M4.5 8L6.5 10L11.5 5.5" stroke="#0a1628" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Buyer inquiry routing
              </li>
              <li className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="8" fill="#d4a017"/><path d="M4.5 8L6.5 10L11.5 5.5" stroke="#0a1628" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Cancel anytime
              </li>
            </ul>
            <Link href="/list-your-business" className="btn-gold px-6 py-3.5 rounded-xl text-sm font-bold inline-block w-full text-center">
              List Your Business
            </Link>
          </div>
          <div className="card-navy rounded-2xl p-8">
            <div className="text-xs font-bold tracking-widest text-slate-400 mb-2">SUCCESS FEE</div>
            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-5xl font-black text-white">0.5%</span>
            </div>
            <p className="text-slate-300 text-sm mb-6 leading-relaxed">
              Referral on closed deals introduced through WashDealers. We only win when you do. No deal, no fee.
            </p>
            <ul className="space-y-3 mb-8 text-sm text-slate-300">
              <li className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="8" fill="#d4a017"/><path d="M4.5 8L6.5 10L11.5 5.5" stroke="#0a1628" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Only charged on verified closed deals
              </li>
              <li className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="8" fill="#d4a017"/><path d="M4.5 8L6.5 10L11.5 5.5" stroke="#0a1628" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                No hidden brokerage markup
              </li>
              <li className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="8" fill="#d4a017"/><path d="M4.5 8L6.5 10L11.5 5.5" stroke="#0a1628" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Fraction of traditional broker fees
              </li>
              <li className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="8" fill="#d4a017"/><path d="M4.5 8L6.5 10L11.5 5.5" stroke="#0a1628" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Contact hello@micro-titan.com to discuss
              </li>
            </ul>
            <a href="mailto:hello@micro-titan.com" className="block px-6 py-3.5 rounded-xl text-sm font-bold text-center transition-colors" style={{ border: '1px solid rgba(212,160,23,0.35)', color: '#e8c96a' }}>
              Talk to a Human
            </a>
          </div>
        </div>
      </section>

      {/* SELL YOUR WASH CTA */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="w-14 h-14 rounded-2xl mx-auto mb-6 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #c9a84c, #e8c96a)' }}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M14 4L17.5 11.5H25L19 16.5L21.5 24L14 19.5L6.5 24L9 16.5L3 11.5H10.5L14 4Z" fill="#0a1628"/></svg>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
          Ready to Sell Your Car Wash?
        </h2>
        <p className="text-slate-300 text-lg mb-2 max-w-2xl mx-auto">
          List in minutes. Get exposure to qualified PE firms, regional operators, and motivated owner-operators. Featured listings start at $99/month.
        </p>
        <p className="text-slate-500 text-sm mb-8">Questions? Email <a href="mailto:hello@micro-titan.com" className="hover:text-yellow-400 transition-colors" style={{ color: '#e8c96a' }}>hello@micro-titan.com</a></p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/list-your-business" className="btn-gold px-8 py-3.5 rounded-xl text-base font-bold inline-block">
            List Your Business — $99/mo
          </Link>
          <Link href="/listings" className="px-8 py-3.5 rounded-xl text-base font-semibold border transition-colors inline-block" style={{ borderColor: 'rgba(212,160,23,0.3)', color: '#e8c96a' }}>
            Browse Listings
          </Link>
        </div>
      </section>
    </div>
  );
}
