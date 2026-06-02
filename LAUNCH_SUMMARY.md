# WashDealers.com — Launch Summary

**Built:** 2026-06-01  
**Status:** LIVE  
**URL:** https://car-wash-marketplace.vercel.app

---

## What Was Built

**WashDealers.com** — a Zillow-quality marketplace for car wash business acquisitions. Dark navy + gold premium design targeting PE firms, regional operators, and individual buyers actively seeking car wash M&A opportunities.

---

## Live URLs

| Page | URL |
|------|-----|
| Homepage | https://car-wash-marketplace.vercel.app |
| All Listings | https://car-wash-marketplace.vercel.app/listings |
| Buyer's Guide | https://car-wash-marketplace.vercel.app/buyers-guide |
| List Your Business | https://car-wash-marketplace.vercel.app/list-your-business |
| Sitemap | https://car-wash-marketplace.vercel.app/sitemap.xml |

Sample listings (12 total):
- https://car-wash-marketplace.vercel.app/listings/express-tunnel-car-wash-high-traffic-interstate
- https://car-wash-marketplace.vercel.app/listings/5-location-tunnel-portfolio-southeast-florida
- https://car-wash-marketplace.vercel.app/listings/high-volume-express-tunnel-dallas

---

## Tech Stack

- **Framework:** Next.js 16 (App Router, TypeScript)
- **Styling:** Tailwind CSS + custom CSS variables (dark navy + gold theme)
- **Hosting:** Vercel (free tier)
- **Payments:** Stripe
- **Repo:** https://github.com/BubbaB10/car-wash-marketplace

---

## Revenue Model

### 1. Featured Listings — $99/month
- Stripe Product: `prod_Ucz6PO0QygYquN`
- Stripe Price ID: `price_1Tdj8E0WIc6TWTSy634MdNRV`
- Payment flow: `/list-your-business` → 4-step form → `/api/checkout` → Stripe → `/success`
- Monthly recurring subscription, cancel anytime

### 2. Referral Fee — 0.5% at Closing
- Disclosed on listing page and /list-your-business
- Collected when WashDealers directly connects buyer and seller who close

### Revenue Math (Scale Target):
| Listings | Monthly Revenue | Annual |
|----------|----------------|--------|
| 10 | $990 | $11,880 |
| 50 | $4,950 | $59,400 |
| 100 | $9,900 | $118,800 |
| 500 | $49,500 | $594,000 |

**Plus referral:** A single $3M deal at 0.5% = **$15,000**. Five deals/year at avg $5M = **$125,000**.

---

## Site Features

### Homepage
- Hero with live stats (listing count, avg price, states covered)
- Search bar (filter by state, type, price)
- Browse by wash type (Express Tunnel, Full Service, Self-Serve, IBA, Mobile)
- Featured listings grid (6 cards)
- Industry consolidation stats banner ($2B PE capital, 7-9x multiples, 62% deal growth)
- CTA to list your business

### Listings Directory (/listings)
- Full grid of all listings
- Sidebar filters: state, wash type, max price
- Featured-first sort
- Active filter state reflected in UI

### Individual Listing Pages (/listings/[slug])
- Hero image placeholder with location
- 4 key metrics (asking price, revenue, cash flow, multiple)
- Business overview + key highlights
- Full details table (equipment, real estate, employees, etc.)
- Contact Seller form (NDA/financials request)
- Broker info sidebar

### List Your Business (/list-your-business)
- 4-step listing submission form (business → financials → details → contact)
- Stripe $99/mo checkout integration
- Features grid + FAQ + industry stats
- Success page post-payment

### Buyer's Guide (/buyers-guide)
- Why car washes are hot right now
- Valuation methods by wash type
- Due diligence checklist (financials, operations, revenue quality, property)
- Financing options (SBA 7a, SBA 504, seller financing, conventional, PE)

### SEO
- Title + description meta tags on every page
- Dynamic Open Graph tags
- XML sitemap at /sitemap.xml (22 URLs)
- Semantic HTML structure

---

## Seed Data (listings.json)

12 realistic listings covering:
- Single-site express tunnels ($1.95M–$4.1M)
- Multi-location portfolios (3-site at $8.2M, 5-site at $18.5M)
- Full-service operations ($950K–$1.65M)
- Self-serve ($380K)
- In-bay automatic combos ($1.2M–$2.2M)
- Mobile ($285K)

States covered: TN, TX, NC, OH, CO, AZ, NY, FL, MN, GA

---

## Infrastructure

| Resource | Value |
|----------|-------|
| GitHub Repo | github.com/BubbaB10/car-wash-marketplace |
| Vercel Project | prj_VBFo2DWPYXwxlKMwFDVsiPiFLjA8 |
| Vercel Deployment | dpl_EqUUptFru38a8SwdqUojuHjvfnJA |
| Stripe Product | prod_Ucz6PO0QygYquN |
| Stripe Price | price_1Tdj8E0WIc6TWTSy634MdNRV |
| Build | 22 pages, 0 errors, all static-rendered except /listings and /api/checkout |

---

## Immediate Next Steps (Not Done Tonight)

1. **Get real listings** — Email/call business brokers (Murphy Business, Sunbelt, IBBA members) and offer free listings to build inventory
2. **Custom domain** — Register `washd ealers.com` or similar and point to Vercel
3. **Email capture** — Add "Get notified of new listings" newsletter signup (ConvertKit or Mailchimp)
4. **Buyer registry** — Let PE firms and serious buyers create profiles so you can ping them when new listings hit
5. **Google Analytics** — Install GA4 for traffic tracking
6. **Industry outreach** — Car Wash Magazine, SONNY's dealer network, ICA (International Carwash Association) community

---

## BizBuySell Scraping

Direct scraping was blocked by BizBuySell's WAF (Akamai). Options for real listing data:
1. **Manual outreach** to brokers specializing in car washes — many will list free if they see buyer traffic
2. **Apify scraper** — the `apify/web-scraper` actor needs full account permission approval; request via: https://console.apify.com/actors/moJRLRc85AitArpNN?approvePermissions=true
3. **BizBuySell API** — they don't offer one, but XML syndication feeds are available to partners
4. **Build broker relationships** — car wash brokers like Southeast Car Wash Advisors, Texas Wash Advisors, etc. are small shops happy to get digital exposure

---

## Total Cost Tonight

- Vercel: $0 (free tier)
- GitHub: $0
- Stripe: $0 (no transactions yet; 2.9% + 30¢ per payment when they come)
- Time: ~1 build session

**This is a zero-cost-to-launch business.**
