"use client";

import Link from "next/link";
import { Listing, formatCurrency } from "@/lib/listings";

const TYPE_COLORS: Record<string, string> = {
  'Express Tunnel': 'bg-blue-900 text-blue-300',
  'Full Service': 'bg-purple-900 text-purple-300',
  'Self-Serve': 'bg-green-900 text-green-300',
  'In-Bay Automatic': 'bg-orange-900 text-orange-300',
  'Mobile': 'bg-pink-900 text-pink-300',
};

export default function ListingCard({ listing }: { listing: Listing }) {
  const typeColor = TYPE_COLORS[listing.type] || 'bg-gray-800 text-gray-300';

  return (
    <Link href={`/listings/${listing.slug}`} className="block">
      <div className="card-navy rounded-xl overflow-hidden fade-in">
        {/* Image placeholder */}
        <div className="relative h-44 overflow-hidden" style={{ background: 'linear-gradient(135deg, #112240 0%, #1a2e4a 50%, #0d1c35 100%)' }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center opacity-30">
              <div className="text-5xl mb-2">🚗</div>
              <div className="text-slate-500 text-xs">{listing.location.city}, {listing.location.stateCode}</div>
            </div>
          </div>
          {/* Map pin overlay */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded-full text-xs" style={{ background: 'rgba(10,22,40,0.8)', color: '#94a3b8' }}>
            <span>📍</span>
            <span>{listing.location.city}, {listing.location.stateCode}</span>
          </div>
          {/* Featured badge */}
          {listing.featured && (
            <div className="absolute top-3 right-3">
              <span className="featured-badge text-xs font-bold px-2 py-1 rounded-full">FEATURED</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-start justify-between gap-2 mb-3">
            <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded ${typeColor}`}>
              {listing.type}
            </span>
            <span className="text-slate-500 text-xs">{listing.location.state}</span>
          </div>

          <h3 className="text-white font-semibold text-sm leading-snug mb-3 line-clamp-2">
            {listing.name}
          </h3>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <div className="text-xs text-slate-500 mb-0.5">Asking Price</div>
              <div className="text-yellow-400 font-bold text-base">{formatCurrency(listing.askingPrice)}</div>
            </div>
            <div>
              <div className="text-xs text-slate-500 mb-0.5">Annual Revenue</div>
              <div className="text-white font-semibold text-base">{formatCurrency(listing.annualRevenue)}</div>
            </div>
            <div>
              <div className="text-xs text-slate-500 mb-0.5">Cash Flow</div>
              <div className="text-green-400 font-semibold">{formatCurrency(listing.annualCashFlow)}</div>
            </div>
            <div>
              <div className="text-xs text-slate-500 mb-0.5">Multiple</div>
              <div className="text-white font-semibold">{listing.multiple}x EBITDA</div>
            </div>
          </div>

          {/* Highlights */}
          {listing.highlights.slice(0, 2).map((h, i) => (
            <div key={i} className="flex items-start gap-1.5 text-xs text-slate-400 mb-1">
              <span className="text-yellow-500 mt-0.5 shrink-0">✓</span>
              <span>{h}</span>
            </div>
          ))}

          <div className="mt-4 pt-4 border-t flex items-center justify-between" style={{ borderColor: 'rgba(201,168,76,0.1)' }}>
            <span className="text-slate-500 text-xs">{listing.brokerFirm}</span>
            <span className="text-yellow-400 text-sm font-semibold">View Details →</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
