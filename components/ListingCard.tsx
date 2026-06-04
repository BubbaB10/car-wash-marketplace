"use client";

import Link from "next/link";
import { Listing, formatCurrency } from "@/lib/listings";

function detectWashType(name: string, type?: string): string {
  if (type) return type;
  const t = name.toLowerCase();
  if (t.includes('express') || t.includes('tunnel')) return 'Express Tunnel';
  if (t.includes('full service') || t.includes('full-service') || t.includes('luxury') || t.includes('detailing') || t.includes('hand wash')) return 'Full Service';
  if (t.includes('self serve') || t.includes('self-serve') || t.includes('coin')) return 'Self Serve';
  if (t.includes('mobile')) return 'Mobile';
  return 'Car Wash';
}

const WASH_TYPE_STYLES: Record<string, { bg: string; color: string }> = {
  'Express Tunnel': { bg: 'rgba(59,130,246,0.15)', color: '#93c5fd' },
  'Full Service':   { bg: 'rgba(139,92,246,0.15)', color: '#c4b5fd' },
  'Self Serve':     { bg: 'rgba(16,185,129,0.15)', color: '#6ee7b7' },
  'Mobile':         { bg: 'rgba(236,72,153,0.15)', color: '#f9a8d4' },
  'In-Bay Automatic': { bg: 'rgba(251,146,60,0.15)', color: '#fed7aa' },
  'Car Wash':       { bg: 'rgba(212,160,23,0.15)', color: '#e8c96a' },
};

function getSourceLabel(source: string): string {
  if (!source) return '';
  const s = source.toLowerCase();
  if (s.includes('businessesforsale')) return 'BusinessesForSale';
  if (s.includes('bizbuysell')) return 'BizBuySell';
  if (s.includes('loopnet')) return 'LoopNet';
  return source;
}

export default function ListingCard({ listing }: { listing: Listing }) {
  const washType = detectWashType(listing.name, listing.type);
  const typeStyle = WASH_TYPE_STYLES[washType] || WASH_TYPE_STYLES['Car Wash'];
  const sourceLabel = getSourceLabel(listing.brokerFirm || '');

  // Determine link — if listing has a URL in description, link to slug page
  const cardHref = `/listings/${listing.slug}`;

  const hasCashFlow = listing.annualCashFlow > 0;
  const hasRevenue = listing.annualRevenue > 0;

  return (
    <Link href={cardHref} style={{ textDecoration: 'none', display: 'block' }}>
      <div style={{
        background: '#ffffff',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)',
        border: '1px solid #f1f5f9',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
          (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(0,0,0,0.12), 0 0 0 2px rgba(212,160,23,0.35)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
          (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)';
        }}
      >
        {/* Card top color bar */}
        <div style={{ height: '4px', background: 'linear-gradient(90deg, #c9a84c, #e8c96a)' }} />

        <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Header row: badges */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.875rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <span style={{
              fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.05em',
              padding: '4px 10px', borderRadius: '100px',
              background: typeStyle.bg, color: typeStyle.color,
              display: 'inline-block'
            }}>
              {washType.toUpperCase()}
            </span>
            {listing.featured && (
              <span style={{
                fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.07em',
                padding: '3px 10px', borderRadius: '100px',
                background: 'linear-gradient(135deg, #c9a84c, #e8c96a)',
                color: '#0a0f1e',
              }}>
                FEATURED
              </span>
            )}
          </div>

          {/* Business name */}
          <h3 style={{
            fontSize: '1rem', fontWeight: 800, color: '#0f172a',
            lineHeight: 1.35, marginBottom: '0.35rem',
            display: '-webkit-box', WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical', overflow: 'hidden'
          }}>
            {listing.name}
          </h3>

          {/* Location */}
          <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>&#128205;</span>
            {listing.location.city}, {listing.location.stateCode || listing.location.state}
          </p>

          {/* Asking Price — hero number */}
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 600, letterSpacing: '0.05em', marginBottom: '2px' }}>ASKING PRICE</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#d4a017', lineHeight: 1 }}>
              {listing.askingPrice > 0 ? formatCurrency(listing.askingPrice) : 'Call for Price'}
            </div>
          </div>

          {/* Revenue & Cash Flow grid */}
          {(hasRevenue || hasCashFlow) && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem', padding: '0.875rem', background: '#f8fafc', borderRadius: '8px' }}>
              {hasRevenue && (
                <div>
                  <div style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: 600, letterSpacing: '0.04em', marginBottom: '2px' }}>REVENUE</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1e293b' }}>{formatCurrency(listing.annualRevenue)}</div>
                </div>
              )}
              {hasCashFlow && (
                <div>
                  <div style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: 600, letterSpacing: '0.04em', marginBottom: '2px' }}>CASH FLOW</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#16a34a' }}>{formatCurrency(listing.annualCashFlow)}</div>
                </div>
              )}
            </div>
          )}

          {/* Push CTA to bottom */}
          <div style={{ flex: 1 }} />

          {/* Footer row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid #f1f5f9', marginTop: '0.5rem' }}>
            {sourceLabel ? (
              <span style={{ fontSize: '0.7rem', color: '#cbd5e1', fontWeight: 500 }}>{sourceLabel}</span>
            ) : (
              <span />
            )}
            <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#d4a017', display: 'flex', alignItems: 'center', gap: '4px' }}>
              View Listing &rarr;
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
