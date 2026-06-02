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
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #0a1628 0%, #112240 50%, #0a1628 100%)' }}>
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(201,168,76,0.8) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10" style={{
          background: 'radial-gradient(ellipse at top right, #c9a84c, transparent 70%)'
        }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6 border" style={{ borderColor: 'rgba(201,168,76,0.3)', background: 'rgba(201,168,76,0.08)', color: '#e8c96a' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              {totalListings} Active Listings · {states} States
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              The Car Wash{' '}
              <span className="gradient-gold">Acquisition</span>{' '}
              Marketplace
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 mb-8 leading-relaxed max-w-2xl">
              Dedicated to car wash M&amp;A. Find express tunnels, full-service operations, portfolios, and more — vetted listings from serious sellers across the United States.
            </p>

            <SearchBar />

            <div className="flex flex-wrap gap-6 mt-8">
              <div>
                <div className="text-2xl font-bold" style={{ color: '#e8c96a' }}>{totalListings}+</div>
                <div className="text-slate-400 text-sm">Active Listings</div>
              </div>
              <div className="w-px" style={{ background: 'rgba(201,168,76,0.2)' }} />
              <div>
                <div className="text-2xl font-bold" style={{ color: '#e8c96a' }}>{formatCurrency(avgPrice)}</div>
                <div className="text-slate-400 text-sm">Avg. Asking Price</div>
              </div>
              <div className="w-px" style={{ background: 'rgba(201,168,76,0.2)' }} />
              <div>
                <div className="text-2xl font-bold" style={{ color: '#e8c96a' }}>{states}</div>
                <div className="text-slate-400 text-sm">States Covered</div>
              </div>
              <div className="w-px hidden sm:block" style={{ background: 'rgba(201,168,76,0.2)' }} />
              <div className="hidden sm:block">
                <div className="text-2xl font-bold" style={{ color: '#e8c96a' }}>0.5%</div>
                <div className="text-slate-400 text-sm">Referral Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY WASHDEALERS */}
      <section className="py-16" style={{ background: '#0d1c35' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: '🎯',
                title: 'Car Wash Focused',
                desc: 'The only marketplace dedicated exclusively to car wash businesses. No noise — just serious buyers and sellers.'
              },
              {
                icon: '🏦',
                title: 'PE & Institutional Ready',
                desc: 'Portfolio listings, EBITDA multiples, normalized financials. Built for operators, aggregators, and private equity.'
              },
              {
                icon: '⚡',
                title: 'Fast & Discreet',
                desc: 'Confidential listing process. Connect with qualified buyers without broadcasting to employees or competitors.'
              },
            ].map((item) => (
              <div key={item.title} className="card-navy rounded-xl p-6">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
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
      <section style={{ background: 'linear-gradient(135deg, #112240, #1a2e4a)', borderTop: '1px solid rgba(201,168,76,0.2)', borderBottom: '1px solid rgba(201,168,76,0.2)' }} className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">The Car Wash Industry is Consolidating</h2>
              <p className="text-slate-300 max-w-xl leading-relaxed">
                PE-backed aggregators raised over $2B in the last 3 years specifically for car wash acquisitions. Express tunnel multiples average 7-9x EBITDA. Now is an excellent time for owner-operators to exit.
              </p>
            </div>
            <div className="flex gap-6 text-center shrink-0">
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

      {/* SELL YOUR WASH CTA */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="w-14 h-14 rounded-2xl mx-auto mb-6 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #c9a84c, #e8c96a)' }}>
          <span className="text-2xl">💰</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
          Ready to Sell Your Car Wash?
        </h2>
        <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
          List in minutes. Get exposure to qualified PE firms, regional operators, and motivated owner-operators. Featured listings start at $99/month.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/list-your-business" className="btn-gold px-8 py-3.5 rounded-xl text-base font-bold inline-block">
            List Your Business — $99/mo
          </Link>
          <Link href="/listings" className="px-8 py-3.5 rounded-xl text-base font-semibold border transition-colors inline-block" style={{ borderColor: 'rgba(201,168,76,0.3)', color: '#e8c96a' }}>
            Browse Listings
          </Link>
        </div>
      </section>
    </div>
  );
}
