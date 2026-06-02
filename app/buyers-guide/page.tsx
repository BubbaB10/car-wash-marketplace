import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Car Wash Buyer's Guide | WashDealers.com",
  description: "How to buy a car wash business. Valuation methods, due diligence checklist, financing options, and what PE firms look for.",
};

export default function BuyersGuidePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <Link href="/" className="text-slate-500 hover:text-yellow-400 text-sm transition-colors">← Back to Home</Link>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3">
          Car Wash Buyer&apos;s Guide
        </h1>
        <p className="text-slate-400 text-lg">Everything you need to know before acquiring a car wash business.</p>
      </div>

      <div className="space-y-10">
        {/* Section 1 */}
        <section className="card-navy rounded-xl p-8">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span style={{ color: '#e8c96a' }}>01</span> Why Car Washes?
          </h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            Car washes have become one of the most coveted asset classes in small business M&A. Here&apos;s why:
          </p>
          <ul className="space-y-2">
            {[
              "Recurring revenue via unlimited wash club memberships (5-40% of revenue is predictable MRR)",
              "Weather-resistant demand — cars get dirty in all seasons",
              "Semi-absentee operation possible with proper management",
              "High cash-on-cash returns, often 20-35% for well-run sites",
              "PE consolidation driving premium multiples (7-10x EBITDA for express tunnels)",
              "Fragmented market — most operators own 1-3 sites, ripe for aggregation",
            ].map(item => (
              <li key={item} className="flex items-start gap-2 text-slate-300 text-sm">
                <span className="text-yellow-500 mt-0.5 shrink-0">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Section 2 */}
        <section className="card-navy rounded-xl p-8">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span style={{ color: '#e8c96a' }}>02</span> Valuation Methods
          </h2>
          <p className="text-slate-300 mb-4 leading-relaxed">
            Car wash valuations are primarily EBITDA-based, though real estate, membership count, and equipment age all factor in.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            {[
              { type: "Express Tunnel", multiple: "7-10x", note: "Premium for membership base" },
              { type: "Full Service", multiple: "4-6x", note: "Labor-intensive, lower mult." },
              { type: "Self-Serve / IBA", multiple: "3-5x", note: "Lower; real estate matters" },
            ].map(row => (
              <div key={row.type} className="rounded-lg p-4 text-center" style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)' }}>
                <div className="text-sm text-slate-400 mb-1">{row.type}</div>
                <div className="text-2xl font-bold" style={{ color: '#e8c96a' }}>{row.multiple}</div>
                <div className="text-xs text-slate-500 mt-1">{row.note}</div>
              </div>
            ))}
          </div>
          <p className="text-slate-400 text-sm">
            EBITDA = Earnings Before Interest, Taxes, Depreciation, and Amortization. Always normalize for owner salary, one-time expenses, and deferred capital.
          </p>
        </section>

        {/* Section 3 */}
        <section className="card-navy rounded-xl p-8">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span style={{ color: '#e8c96a' }}>03</span> Due Diligence Checklist
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                category: "Financials",
                items: ["3 years P&L statements", "Merchant processing statements (12 months)", "Membership subscription data (MRR, churn)", "Tax returns (3 years)", "Utilities and chemical costs"]
              },
              {
                category: "Operations",
                items: ["Equipment age and maintenance logs", "Employee count + wage structure", "Lease terms and options", "Water/sewer rates and usage", "Environmental compliance records"]
              },
              {
                category: "Revenue Quality",
                items: ["% membership vs. a-la-carte revenue", "Monthly member count trend", "Average ticket price", "Car count data (daily/monthly)", "Seasonal variation analysis"]
              },
              {
                category: "Property",
                items: ["Real estate appraisal (if purchasing)", "Phase I environmental assessment", "Traffic count data", "Zoning confirmation", "Lease assignability clause"]
              },
            ].map(cat => (
              <div key={cat.category}>
                <h3 className="font-semibold text-yellow-400 mb-2 text-sm uppercase tracking-wide">{cat.category}</h3>
                <ul className="space-y-1.5">
                  {cat.items.map(item => (
                    <li key={item} className="flex items-start gap-1.5 text-slate-300 text-sm">
                      <span className="text-slate-500 mt-0.5 shrink-0">□</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4 */}
        <section className="card-navy rounded-xl p-8">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span style={{ color: '#e8c96a' }}>04</span> Financing Options
          </h2>
          <div className="space-y-4">
            {[
              { name: "SBA 7(a) Loan", desc: "Most common for car washes under $5M. 10-25 year terms, low down payment (10-20%). Requires good credit and industry experience." },
              { name: "SBA 504 Loan", desc: "For real estate-included transactions. Pairs conventional lender with SBA. Excellent for locking in long-term fixed rates on property." },
              { name: "Seller Financing", desc: "Seller carries 10-30% of the note. Signals seller confidence. Reduces buyer capital needed and often gets deals done when bank financing falls short." },
              { name: "Conventional Bank Loan", desc: "Faster than SBA. Larger down payment required (20-30%). Best for buyers with strong balance sheets and prior operating history." },
              { name: "PE / Equity Partner", desc: "Bring in a private equity partner or family office for larger deals. Trade equity for capital. Common in portfolio acquisitions." },
            ].map(item => (
              <div key={item.name} className="flex gap-4">
                <span className="text-yellow-500 font-bold mt-0.5 shrink-0">→</span>
                <div>
                  <span className="text-white font-semibold text-sm">{item.name}: </span>
                  <span className="text-slate-400 text-sm">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="text-center py-6">
          <h3 className="text-2xl font-bold text-white mb-4">Ready to Find Your Car Wash?</h3>
          <Link href="/listings" className="btn-gold px-8 py-4 rounded-xl font-bold inline-block">
            Browse All Listings →
          </Link>
        </div>
      </div>
    </div>
  );
}
