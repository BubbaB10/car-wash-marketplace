import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "WashDealers.com — Car Wash Businesses For Sale",
  description: "The #1 marketplace to buy and sell car wash businesses. Browse express tunnels, full-service washes, self-serve, and portfolio acquisitions across the United States.",
  keywords: "car wash for sale, car wash business, buy car wash, sell car wash, car wash acquisition, express tunnel for sale, car wash marketplace",
  openGraph: {
    title: "WashDealers.com — Car Wash Businesses For Sale",
    description: "The #1 marketplace to buy and sell car wash businesses. Express tunnels, full-service, self-serve, and portfolios across the USA.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        {/* NAV */}
        <nav style={{ background: 'rgba(10,22,40,0.95)', borderBottom: '1px solid rgba(201,168,76,0.2)' }} className="sticky top-0 z-50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #c9a84c, #e8c96a)' }}>
                  <span className="text-sm font-black" style={{ color: '#0a1628' }}>W</span>
                </div>
                <span className="font-bold text-lg tracking-tight" style={{ color: '#e8c96a' }}>WashDealers</span>
                <span className="text-slate-400 text-sm hidden sm:inline">.com</span>
              </Link>
              <div className="flex items-center gap-2 sm:gap-4">
                <Link href="/listings" className="text-slate-300 hover:text-yellow-400 transition-colors text-sm font-medium hidden sm:block">
                  Browse Listings
                </Link>
                <Link href="/buyers-guide" className="text-slate-300 hover:text-yellow-400 transition-colors text-sm font-medium hidden md:block">
                  Buyer&apos;s Guide
                </Link>
                <Link href="/list-your-business" className="btn-gold px-4 py-2 rounded-lg text-sm font-bold">
                  List Your Business
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* MAIN */}
        <main>{children}</main>

        {/* FOOTER */}
        <footer style={{ background: '#060e1a', borderTop: '1px solid rgba(201,168,76,0.15)' }} className="mt-24 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
              <div className="md:col-span-2">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #c9a84c, #e8c96a)' }}>
                    <span className="text-xs font-black" style={{ color: '#0a1628' }}>W</span>
                  </div>
                  <span className="font-bold" style={{ color: '#e8c96a' }}>WashDealers.com</span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                  The dedicated marketplace for car wash business acquisitions. Connecting motivated sellers with qualified buyers and PE firms.
                </p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-3 text-sm">Buyers</h4>
                <ul className="space-y-2">
                  <li><Link href="/listings" className="text-slate-400 hover:text-yellow-400 text-sm transition-colors">Browse Listings</Link></li>
                  <li><Link href="/buyers-guide" className="text-slate-400 hover:text-yellow-400 text-sm transition-colors">Buyer&apos;s Guide</Link></li>
                  <li><Link href="/listings?type=Express+Tunnel" className="text-slate-400 hover:text-yellow-400 text-sm transition-colors">Express Tunnels</Link></li>
                  <li><Link href="/listings?minPrice=5000000" className="text-slate-400 hover:text-yellow-400 text-sm transition-colors">Portfolio Deals</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-3 text-sm">Sellers</h4>
                <ul className="space-y-2">
                  <li><Link href="/list-your-business" className="text-slate-400 hover:text-yellow-400 text-sm transition-colors">List Your Business</Link></li>
                  <li><Link href="/list-your-business#pricing" className="text-slate-400 hover:text-yellow-400 text-sm transition-colors">Pricing</Link></li>
                  <li><Link href="/list-your-business#faq" className="text-slate-400 hover:text-yellow-400 text-sm transition-colors">FAQ</Link></li>
                </ul>
              </div>
            </div>
            <div className="border-t pt-8" style={{ borderColor: 'rgba(212,160,23,0.12)' }}>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <p className="text-slate-500 text-xs mb-1">
                    &copy; 2026 WashDealers.com — All Rights Reserved
                  </p>
                  <p className="text-slate-600 text-xs">
                    WashDealers is a <span style={{ color: '#e8c96a' }}>Micro Titan LLC</span> platform &nbsp;&bull;&nbsp;
                    <a href="mailto:hello@micro-titan.com" className="hover:text-yellow-400 transition-colors" style={{ color: '#e8c96a' }}>hello@micro-titan.com</a>
                  </p>
                </div>
                <p className="text-slate-600 text-xs">
                  Not a broker or dealer. All listings are provided for informational purposes.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
