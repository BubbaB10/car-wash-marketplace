import { Metadata } from "next";
import Link from "next/link";
import ListingForm from "@/components/ListingForm";

export const metadata: Metadata = {
  title: "List Your Car Wash For Sale | WashDealers.com",
  description: "Sell your car wash business fast. Featured listings reach qualified PE firms and operators. $99/month, cancel anytime.",
};

const FEATURES = [
  { icon: "🎯", title: "PE & Operator Reach", desc: "Your listing reaches private equity funds, regional operators, and individual buyers actively seeking car wash acquisitions." },
  { icon: "📊", title: "Full Financial Showcase", desc: "Display revenue, EBITDA, multiples, equipment, and real estate details in a professional format that sophisticated buyers expect." },
  { icon: "🔒", title: "Confidential Process", desc: "Control what's visible publicly. Request NDA before sharing financials. Employees and competitors stay in the dark." },
  { icon: "⚡", title: "Live in 24 Hours", desc: "Submit your listing, our team reviews for accuracy, and you're live within one business day." },
  { icon: "💬", title: "Qualified Leads", desc: "Buyers identify themselves (PE, individual, strategic) before contacting. No tire-kickers wasting your time." },
  { icon: "📈", title: "Market Exposure", desc: "Listed across Google, SEO-optimized pages, and our growing buyer network. Industry newsletter placement available." },
];

const FAQ = [
  {
    q: "How much does it cost?",
    a: "Featured listings are $99/month, billed monthly. Cancel anytime — no contracts. Basic (non-featured) listings coming soon at a lower tier."
  },
  {
    q: "What does 'featured' mean?",
    a: "Featured listings appear first in search results, on the homepage, and carry a visual badge. They get significantly more visibility than standard listings."
  },
  {
    q: "Do I need a broker?",
    a: "No. You can list as an FSBO (for-sale-by-owner) or through a broker. Both are welcome. Broker-assisted listings may get additional verification badges."
  },
  {
    q: "Can I stay anonymous?",
    a: "Yes. We list by business type and location — not by owner name. Interested buyers are screened before any contact details are shared."
  },
  {
    q: "What's the 0.5% referral fee?",
    a: "If WashDealers.com directly connects a buyer and seller who close a transaction, we collect a 0.5% referral fee from the seller at closing. This is separate from the monthly listing fee."
  },
  {
    q: "How long does it take to get listed?",
    a: "Submit the form, complete payment, and we'll have you live within 1 business day. Rush listings available by request."
  },
];

export default function ListYourBusinessPage() {
  return (
    <div>
      {/* HERO */}
      <section className="py-16 sm:py-24 relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #0a1628 0%, #112240 50%, #0a1628 100%)' }}>
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(201,168,76,0.8) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6 border" style={{ borderColor: 'rgba(201,168,76,0.3)', background: 'rgba(201,168,76,0.08)', color: '#e8c96a' }}>
            <span>💰</span> Sell to the right buyer, at the right price
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 leading-tight">
            List Your Car Wash{' '}
            <span className="gradient-gold">For Sale</span>
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Reach private equity firms, regional operators, and motivated buyers who are actively acquiring car washes. The market has never been hotter.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#get-listed" className="btn-gold px-8 py-4 rounded-xl text-base font-bold">
              Get Listed for $99/mo →
            </a>
            <div className="text-slate-400 text-sm">No contracts · Cancel anytime</div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ background: '#0d1c35' }} className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "$2B+", label: "PE Capital Hunting for Car Washes" },
              { value: "7-9x", label: "Typical EBITDA Multiples" },
              { value: "62%", label: "YoY Increase in Transactions" },
              { value: "30 Days", label: "Avg. Time to First LOI" },
            ].map(s => (
              <div key={s.label}>
                <div className="text-3xl font-extrabold mb-1" style={{ color: '#e8c96a' }}>{s.value}</div>
                <div className="text-slate-400 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-white text-center mb-10">Why WashDealers.com?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map(f => (
            <div key={f.title} className="card-navy rounded-xl p-6">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="text-white font-bold mb-2">{f.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-16" style={{ background: '#0d1c35' }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Simple, Transparent Pricing</h2>
          <p className="text-slate-400 mb-10">One plan. No surprises.</p>

          <div className="rounded-2xl overflow-hidden border" style={{ borderColor: 'rgba(201,168,76,0.4)' }}>
            <div className="p-8" style={{ background: 'linear-gradient(135deg, #112240, #1a2e4a)' }}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-4" style={{ background: 'linear-gradient(135deg, #c9a84c, #e8c96a)', color: '#0a1628' }}>
                FEATURED LISTING
              </div>
              <div className="text-5xl font-extrabold text-white mb-1">$99</div>
              <div className="text-slate-400 mb-6">per month · cancel anytime</div>

              <ul className="text-left space-y-3 mb-8">
                {[
                  "Featured placement in search results",
                  "Homepage and newsletter exposure",
                  "Full financial details display",
                  "Confidential buyer screening",
                  "Direct inquiry routing",
                  "SEO-optimized listing page",
                  "Unlimited listing updates",
                ].map(item => (
                  <li key={item} className="flex items-center gap-2 text-slate-300 text-sm">
                    <span className="text-yellow-500 font-bold">✓</span>
                    {item}
                  </li>
                ))}
              </ul>

              <a href="#get-listed" className="btn-gold w-full py-4 rounded-xl text-base font-bold block text-center">
                Start Your Listing →
              </a>
              <p className="text-slate-500 text-xs mt-3">
                + 0.5% referral fee at closing if WashDealers connects buyer and seller
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LISTING FORM */}
      <section id="get-listed" className="py-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-3">Submit Your Listing</h2>
          <p className="text-slate-400">Complete the form below. We review within 1 business day.</p>
        </div>
        <ListingForm />
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16" style={{ background: '#0d1c35' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white text-center mb-10">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {FAQ.map(item => (
              <div key={item.q} className="card-navy rounded-xl p-5">
                <h3 className="text-white font-semibold mb-2">{item.q}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
