import Link from "next/link";
import Image from "next/image";
import { getAllListings, getFeaturedListings, formatCurrency } from "@/lib/listings";
import ListingCard from "@/components/ListingCard";

export default function HomePage() {
  const featured = getFeaturedListings().slice(0, 6);
  const allListings = getAllListings();
  const totalListings = allListings.length;
  const priceListings = allListings.filter(l => l.askingPrice > 0);
  const avgPrice = priceListings.length > 0
    ? Math.round(priceListings.reduce((s, l) => s + l.askingPrice, 0) / priceListings.length)
    : 0;
  const states = new Set(allListings.map(l => l.location.stateCode)).size;

  return (
    <div style={{ background: '#0a0f1e', color: '#e2e8f0' }}>

      {/* ========= HERO ========= */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {/* Background photo */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
          <Image
            src="/carwash-hero.png"
            alt="Modern express tunnel car wash"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            priority
          />
          {/* Dark overlay */}
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.58)' }} />
          {/* Gradient vignette bottom */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(to top, #0a0f1e, transparent)' }} />
        </div>

        {/* Hero content */}
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem', paddingTop: '5rem', paddingBottom: '6rem' }}>
          <div style={{ maxWidth: '780px' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(212,160,23,0.12)', border: '1px solid rgba(212,160,23,0.35)',
              borderRadius: '100px', padding: '6px 16px', marginBottom: '2rem'
            }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ade80', display: 'inline-block', animation: 'pulse 2s infinite' }} />
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#e8c96a', letterSpacing: '0.05em' }}>
                {totalListings} ACTIVE LISTINGS &nbsp;&bull;&nbsp; PE &amp; INSTITUTIONAL READY
              </span>
            </div>

            <h1 style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)', fontWeight: 900, lineHeight: 1.1, color: '#ffffff', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
              The Only Marketplace<br />
              <span style={{ background: 'linear-gradient(135deg, #c9a84c, #f0d680)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Built for Car Wash
              </span>
              <br />Acquisitions.
            </h1>

            <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.78)', lineHeight: 1.7, maxWidth: '620px', marginBottom: '2.5rem' }}>
              Connect with PE firms, regional operators, and motivated sellers who know the industry.
              No noise. Just deals.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '4rem' }}>
              <Link href="/listings"
                style={{ background: 'linear-gradient(135deg, #c9a84c, #e8c96a)', color: '#0a0f1e', padding: '1rem 2rem', borderRadius: '10px', fontWeight: 800, fontSize: '1rem', textDecoration: 'none', display: 'inline-block', boxShadow: '0 4px 24px rgba(212,160,23,0.35)' }}>
                Browse Listings
              </Link>
              <Link href="/list-your-business"
                style={{ background: 'transparent', color: '#ffffff', padding: '1rem 2rem', borderRadius: '10px', fontWeight: 700, fontSize: '1rem', textDecoration: 'none', display: 'inline-block', border: '2px solid rgba(255,255,255,0.55)' }}>
                List Your Business
              </Link>
            </div>

            {/* Stats bar */}
            <div style={{
              display: 'flex', flexWrap: 'wrap', gap: '2.5rem',
              padding: '1.5rem 2rem',
              background: 'rgba(10,15,30,0.7)',
              backdropFilter: 'blur(12px)',
              borderRadius: '12px',
              border: '1px solid rgba(212,160,23,0.2)',
              maxWidth: '640px'
            }}>
              {[
                { value: `${totalListings}`, label: 'Active Listings' },
                { value: avgPrice > 0 ? `${(avgPrice / 1000000).toFixed(1)}M` : 'Call', label: 'Avg Asking Price' },
                { value: `${states}`, label: 'States' },
                { value: '0.5%', label: 'Success Fee Only' },
              ].map((stat, i) => (
                <div key={i}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#e8c96a', lineHeight: 1 }}>{stat.value}</div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', marginTop: '4px' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========= TRUST BAR ========= */}
      <div style={{ background: '#101828', borderTop: '1px solid rgba(212,160,23,0.15)', borderBottom: '1px solid rgba(212,160,23,0.15)', padding: '1rem 1.5rem', textAlign: 'center' }}>
        <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em', margin: 0 }}>
          TRUSTED BY OPERATORS, BROKERS, AND PE BUYERS ACROSS TX, FL, CA, NY, NJ, CT &amp; MORE
        </p>
      </div>

      {/* ========= FEATURED LISTINGS ========= */}
      <section style={{ padding: '5rem 1.5rem', maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', color: '#d4a017', marginBottom: '0.5rem' }}>AVAILABLE NOW</p>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 900, color: '#ffffff', margin: 0 }}>Featured Listings</h2>
          </div>
          <Link href="/listings"
            style={{ color: '#e8c96a', fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
            View All {totalListings} Listings &rarr;
          </Link>
        </div>

        {featured.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {featured.map(listing => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {allListings.slice(0, 6).map(listing => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link href="/listings"
            style={{ display: 'inline-block', padding: '0.875rem 2.5rem', borderRadius: '10px', border: '2px solid rgba(212,160,23,0.4)', color: '#e8c96a', fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none' }}>
            View All Listings &rarr;
          </Link>
        </div>
      </section>

      {/* ========= WHY WASHDEALERS ========= */}
      <section style={{ background: '#080d1a', padding: '5rem 1.5rem', borderTop: '1px solid rgba(212,160,23,0.1)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', color: '#d4a017', marginBottom: '0.75rem' }}>THE DIFFERENCE</p>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 900, color: '#ffffff', maxWidth: '600px', margin: '0 auto' }}>
              A dedicated marketplace beats a generic broker. Every time.
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {[
              {
                icon: '🏦',
                title: 'Industry-Only Buyers',
                desc: "Every buyer on WashDealers knows car wash economics: EBITDA multiples, membership revenue, tunnel throughput. No educating required — they already speak your language.",
              },
              {
                icon: '🔒',
                title: 'Confidential & Fast',
                desc: "List without broadcasting to your staff or competitors. Connect under NDA. Most listings see serious interest within 30 days.",
              },
              {
                icon: '📊',
                title: 'PE & Institutional Ready',
                desc: "Normalized financials, EBITDA multiples, portfolio-ready data rooms. Built for aggregators who are actively deploying capital — not casual browsers.",
              },
            ].map((item, i) => (
              <div key={i} style={{
                background: '#0d1525', border: '1px solid rgba(212,160,23,0.15)',
                borderRadius: '16px', padding: '2.5rem 2rem', transition: 'all 0.2s ease'
              }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1.25rem' }}>{item.icon}</div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#ffffff', marginBottom: '1rem' }}>{item.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========= INDUSTRY STATS ========= */}
      <section style={{ position: 'relative', padding: '6rem 1.5rem', overflow: 'hidden' }}>
        {/* Background */}
        <div style={{ position: 'absolute', inset: 0 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #0a1628 0%, #112240 50%, #0d1c35 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', color: '#d4a017', marginBottom: '0.75rem' }}>MARKET INTELLIGENCE</p>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 900, color: '#ffffff', marginBottom: '1rem', maxWidth: '700px', margin: '0 auto 1rem' }}>
              The Car Wash Industry is Consolidating Fast
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '580px', margin: '1rem auto 0', lineHeight: 1.7 }}>
              Now is an excellent time for owner-operators to exit or acquire. WashDealers connects you with the buyers who are actively deploying capital.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem', maxWidth: '900px', margin: '0 auto' }}>
            {[
              { value: '$2B+', label: 'PE capital raised for acquisitions in 3 years', sub: 'Aggregators are actively deploying' },
              { value: '7-9x', label: 'EBITDA multiples for express tunnels', sub: 'Premium assets command premium prices' },
              { value: '23%', label: 'YoY deal volume growth', sub: 'Fastest-growing M&A segment in retail' },
            ].map((stat, i) => (
              <div key={i} style={{
                textAlign: 'center', padding: '2.5rem 1.5rem',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(212,160,23,0.2)',
                borderRadius: '16px',
                backdropFilter: 'blur(8px)'
              }}>
                <div style={{ fontSize: '3rem', fontWeight: 900, color: '#e8c96a', lineHeight: 1, marginBottom: '0.75rem' }}>{stat.value}</div>
                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#ffffff', marginBottom: '0.5rem' }}>{stat.label}</div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========= PRICING ========= */}
      <section style={{ padding: '5rem 1.5rem', background: '#ffffff' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', color: '#d4a017', marginBottom: '0.75rem' }}>SIMPLE PRICING</p>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 900, color: '#0a0f1e', marginBottom: '0.75rem' }}>
              Simple, Transparent Pricing
            </h2>
            <p style={{ color: '#64748b', maxWidth: '480px', margin: '0 auto' }}>
              List in minutes. Pay only when you get results.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {/* Featured Listing Card */}
            <div style={{
              background: '#0a0f1e', borderRadius: '16px', padding: '2.5rem',
              border: '2px solid #d4a017', position: 'relative', overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute', top: 0, right: 0,
                background: 'linear-gradient(135deg, #c9a84c, #e8c96a)',
                padding: '6px 16px', borderBottomLeftRadius: '12px',
                fontSize: '0.7rem', fontWeight: 800, color: '#0a0f1e', letterSpacing: '0.05em'
              }}>MOST POPULAR</div>
              <div style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.1em', color: '#d4a017', marginBottom: '0.75rem' }}>FEATURED LISTING</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '3.5rem', fontWeight: 900, color: '#ffffff', lineHeight: 1 }}>$99</span>
                <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '1rem' }}>/mo</span>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.875rem', marginBottom: '2rem', lineHeight: 1.6 }}>
                Top of search results. NDA-gated inquiries. Buyer routing. Cancel anytime.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {['Featured placement in search results', 'Confidential listing — NDA gated', 'Buyer inquiry routing', 'Cancel anytime'].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.875rem', color: 'rgba(255,255,255,0.75)' }}>
                    <span style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#d4a017', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '0.6rem', color: '#0a0f1e', fontWeight: 900 }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/list-your-business"
                style={{ display: 'block', textAlign: 'center', padding: '1rem', borderRadius: '10px', background: 'linear-gradient(135deg, #c9a84c, #e8c96a)', color: '#0a0f1e', fontWeight: 800, fontSize: '0.95rem', textDecoration: 'none' }}>
                List Your Business
              </Link>
            </div>

            {/* Success Fee Card */}
            <div style={{ background: '#f8fafc', borderRadius: '16px', padding: '2.5rem', border: '2px solid #e2e8f0' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.1em', color: '#64748b', marginBottom: '0.75rem' }}>SUCCESS FEE</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '3.5rem', fontWeight: 900, color: '#0a0f1e', lineHeight: 1 }}>0.5%</span>
              </div>
              <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '2rem', lineHeight: 1.6 }}>
                Only on verified closed deals. No hidden markup. Fraction of traditional broker fees.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {['Only charged on verified closed deals', 'No hidden brokerage markup', 'Fraction of traditional 5-8% fees', 'Contact us to discuss your deal'].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.875rem', color: '#475569' }}>
                    <span style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '0.6rem', color: '#64748b', fontWeight: 900 }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <a href="mailto:hello@micro-titan.com"
                style={{ display: 'block', textAlign: 'center', padding: '1rem', borderRadius: '10px', border: '2px solid #d4a017', color: '#d4a017', fontWeight: 800, fontSize: '0.95rem', textDecoration: 'none', background: 'transparent' }}>
                Talk to Us
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
