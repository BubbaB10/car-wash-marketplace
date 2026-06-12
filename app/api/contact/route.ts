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
    const { name, email, phone, message, buyerType, listingId, listingName } = await request.json();

    if (!name || !email || !buyerType) {
      return NextResponse.json({ error: 'Name, email, and buyer type are required' }, { status: 400 });
    }

    const buyerTypeLabels: Record<string, string> = {
      individual: 'Individual / Owner-Operator',
      pe: 'Private Equity / Fund',
      strategic: 'Strategic Acquirer',
      investor: 'Real Estate Investor',
      broker: 'Business Broker',
    };

    const emailBody = `
BUYER INQUIRY — WashDealers.com
================================

Listing: ${listingName || listingId || 'Unknown'}
Listing ID: ${listingId || 'N/A'}

BUYER INFO
Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Buyer Type: ${buyerTypeLabels[buyerType] || buyerType}

MESSAGE
${message || '(No message provided)'}

Submitted: ${new Date().toISOString()}

Reply directly to this email to contact the buyer.
    `.trim();

    await transporter.sendMail({
      from: '"WashDealers Buyer Inquiry" <hello@micro-titan.com>',
      to: 'hello@micro-titan.com',
      replyTo: email,
      subject: `Buyer Inquiry: ${listingName || listingId} — ${buyerTypeLabels[buyerType] || buyerType}`,
      text: emailBody,
    });

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error('[contact] Error:', err);
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
