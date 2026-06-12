"use client";

import { useState } from "react";

interface Props {
  listingId: string;
  listingName: string;
  contactEmail: string;
}

export default function ContactForm({ listingId, listingName, contactEmail }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    buyerType: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, listingId, listingName }),
      });
      if (!res.ok) throw new Error('Request failed');
      setSubmitted(true);
    } catch {
      alert('Unable to send request. Please email hello@micro-titan.com directly.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="card-navy rounded-xl p-6 text-center">
        <div className="text-4xl mb-3">✅</div>
        <h3 className="text-white font-bold text-lg mb-2">Request Sent!</h3>
        <p className="text-slate-400 text-sm">
          The listing broker has been notified. Expect a response within 1-2 business days.
        </p>
      </div>
    );
  }

  return (
    <div className="card-navy rounded-xl p-5">
      <h3 className="text-white font-bold mb-1">Contact Seller</h3>
      <p className="text-slate-400 text-xs mb-4">Request an NDA, financials, or schedule a call</p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Your Name"
          required
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          className="input-navy w-full rounded-lg px-3 py-2.5 text-sm"
        />
        <input
          type="email"
          placeholder="Email Address"
          required
          value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          className="input-navy w-full rounded-lg px-3 py-2.5 text-sm"
        />
        <input
          type="tel"
          placeholder="Phone (optional)"
          value={form.phone}
          onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
          className="input-navy w-full rounded-lg px-3 py-2.5 text-sm"
        />
        <select
          value={form.buyerType}
          onChange={e => setForm(f => ({ ...f, buyerType: e.target.value }))}
          required
          className="input-navy w-full rounded-lg px-3 py-2.5 text-sm"
        >
          <option value="">I am a...</option>
          <option value="individual">Individual / Owner-Operator</option>
          <option value="pe">Private Equity / Fund</option>
          <option value="strategic">Strategic Acquirer</option>
          <option value="investor">Real Estate Investor</option>
          <option value="broker">Business Broker</option>
        </select>
        <textarea
          placeholder="Message (optional)"
          value={form.message}
          onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
          rows={3}
          className="input-navy w-full rounded-lg px-3 py-2.5 text-sm resize-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="btn-gold w-full py-3 rounded-lg text-sm font-bold"
        >
          {loading ? 'Sending...' : 'Request Information'}
        </button>
        <p className="text-slate-600 text-xs text-center">
          Your info is shared only with the listing broker
        </p>
      </form>
    </div>
  );
}
