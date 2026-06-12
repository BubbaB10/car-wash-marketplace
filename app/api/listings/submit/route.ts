import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'mail.privateemail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'hello@micro-titan.com',
    pass: process.env.PRIVATE_EMAIL_PASSWORD || 'Password.3',
  },
});

export async function POST(request: Request) {
  try {
    const form = await request.json();

    // Build a readable summary of the listing
    const listingSummary = `
NEW LISTING SUBMISSION — WashDealers.com
========================================

BUSINESS INFO
Business Name: ${form.businessName || '(Confidential)'}
Wash Type: ${form.washType}
Location: ${form.city}, ${form.state} ${form.zip}
Year Established: ${form.yearEstablished || 'N/A'}
Employees: ${form.employees || 'N/A'}

FINANCIALS
Asking Price: $${Number(form.askingPrice || 0).toLocaleString()}
Annual Revenue: $${Number(form.annualRevenue || 0).toLocaleString()}
Cash Flow: $${Number(form.cashFlow || 0).toLocaleString()}
EBITDA: $${Number(form.ebitda || 0).toLocaleString()}

DETAILS
Description: ${form.description}
Highlights: ${form.highlights || 'N/A'}
Equipment: ${form.equipment || 'N/A'}
Real Estate: ${form.realEstate || 'N/A'}

CONTACT (PRIVATE)
Name: ${form.contactName}
Email: ${form.contactEmail}
Phone: ${form.contactPhone || 'N/A'}
Broker/Firm: ${form.brokerFirm || 'N/A'}
Is Broker: ${form.isBroker ? 'Yes' : 'No'}

Submitted: ${new Date().toISOString()}
    `.trim();

    await transporter.sendMail({
      from: '"WashDealers Listings" <hello@micro-titan.com>',
      to: 'hello@micro-titan.com',
      subject: `New Listing: ${form.businessName || 'Confidential'} — ${form.city}, ${form.state} — $${Number(form.askingPrice || 0).toLocaleString()}`,
      text: listingSummary,
    });

    return NextResponse.json({ success: true, listingId: `LD-${Date.now()}` });
  } catch (err: unknown) {
    console.error('[listings/submit] Error:', err);
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
