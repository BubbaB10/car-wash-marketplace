"use client";

import { useState } from "react";
import { WASH_TYPES, US_STATES } from "@/lib/listings";

export default function ListingForm() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    // Step 1 - Business info
    businessName: "",
    washType: "",
    city: "",
    state: "",
    zip: "",
    yearEstablished: "",
    employees: "",
    // Step 2 - Financials
    askingPrice: "",
    annualRevenue: "",
    cashFlow: "",
    ebitda: "",
    // Step 3 - Details
    description: "",
    highlights: "",
    equipment: "",
    realEstate: "",
    // Step 4 - Contact
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    brokerFirm: "",
    isBroker: false,
  });

  const update = (field: string, value: string | boolean) => {
    setForm(f => ({ ...f, [field]: value }));
  };

  const handlePayment = async () => {
    setLoading(true);
    try {
      // Save listing data BEFORE redirecting to checkout — data is lost on page nav
      const saveRes = await fetch('/api/listings/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!saveRes.ok) {
        const err = await saveRes.json();
        throw new Error(err.error || 'Failed to save listing');
      }

      // Now create checkout session and redirect
      const checkoutRes = await fetch('/api/checkout', { method: 'POST' });
      if (!checkoutRes.ok) throw new Error('Checkout failed');
      const { url } = await checkoutRes.json();
      window.location.href = url;
    } catch (err) {
      console.error(err);
      alert('Something went wrong. Your listing info has been saved — please try again or contact hello@micro-titan.com');
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="card-navy rounded-2xl p-10 text-center">
        <div className="text-5xl mb-4">🎉</div>
        <h3 className="text-white font-extrabold text-2xl mb-3">You&apos;re Almost Live!</h3>
        <p className="text-slate-300 leading-relaxed mb-6">
          Your listing has been submitted. Complete your payment to go live. Expect your listing to be published within 1 business day.
        </p>
        <button onClick={handlePayment} className="btn-gold px-8 py-4 rounded-xl text-base font-bold">
          Complete Payment — $99/mo →
        </button>
        <p className="text-slate-500 text-xs mt-3">Powered by Stripe · Secure checkout</p>
      </div>
    );
  }

  const inputClass = "input-navy w-full rounded-lg px-4 py-3 text-sm";
  const labelClass = "block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5";

  return (
    <div className="card-navy rounded-2xl overflow-hidden">
      {/* Progress */}
      <div className="flex border-b" style={{ borderColor: 'rgba(201,168,76,0.15)' }}>
        {['Business Info', 'Financials', 'Details', 'Contact'].map((label, i) => {
          const stepNum = i + 1;
          const isActive = step === stepNum;
          const isDone = step > stepNum;
          return (
            <button key={label} onClick={() => step > stepNum && setStep(stepNum)}
              className={`flex-1 py-3 text-xs font-semibold transition-colors ${isActive ? 'text-yellow-400 border-b-2 border-yellow-400' : isDone ? 'text-green-400' : 'text-slate-500'}`}>
              {isDone ? '✓ ' : ''}{label}
            </button>
          );
        })}
      </div>

      <div className="p-6 sm:p-8">
        {/* STEP 1 */}
        {step === 1 && (
          <div className="space-y-4 fade-in">
            <h3 className="text-white font-bold text-lg mb-2">Tell us about your business</h3>
            <div>
              <label className={labelClass}>Business Name (or leave blank for confidential)</label>
              <input type="text" placeholder="e.g. Sunshine Express Car Wash" value={form.businessName}
                onChange={e => update('businessName', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Wash Type *</label>
              <select required value={form.washType} onChange={e => update('washType', e.target.value)} className={inputClass}>
                <option value="">Select type</option>
                {WASH_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>City *</label>
                <input type="text" required placeholder="Nashville" value={form.city}
                  onChange={e => update('city', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>State *</label>
                <select required value={form.state} onChange={e => update('state', e.target.value)} className={inputClass}>
                  <option value="">Select</option>
                  {US_STATES.map(s => <option key={s.code} value={s.code}>{s.name}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Year Established</label>
                <input type="number" placeholder="2018" value={form.yearEstablished}
                  onChange={e => update('yearEstablished', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Employees</label>
                <input type="number" placeholder="8" value={form.employees}
                  onChange={e => update('employees', e.target.value)} className={inputClass} />
              </div>
            </div>
            <button onClick={() => setStep(2)}
              disabled={!form.washType || !form.city || !form.state}
              className="btn-gold w-full py-3 rounded-xl font-bold mt-2 disabled:opacity-40">
              Next: Financials →
            </button>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="space-y-4 fade-in">
            <h3 className="text-white font-bold text-lg mb-2">Financial Information</h3>
            <p className="text-slate-400 text-sm mb-2">Approximate figures are fine. Buyers will request detailed financials under NDA.</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Asking Price *</label>
                <input type="number" required placeholder="1500000" value={form.askingPrice}
                  onChange={e => update('askingPrice', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Annual Revenue</label>
                <input type="number" placeholder="650000" value={form.annualRevenue}
                  onChange={e => update('annualRevenue', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Annual Cash Flow</label>
                <input type="number" placeholder="280000" value={form.cashFlow}
                  onChange={e => update('cashFlow', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>EBITDA</label>
                <input type="number" placeholder="250000" value={form.ebitda}
                  onChange={e => update('ebitda', e.target.value)} className={inputClass} />
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="flex-1 py-3 rounded-xl font-bold border text-slate-400 hover:text-white transition-colors" style={{ borderColor: 'rgba(201,168,76,0.2)' }}>
                ← Back
              </button>
              <button onClick={() => setStep(3)} disabled={!form.askingPrice}
                className="flex-1 btn-gold py-3 rounded-xl font-bold disabled:opacity-40">
                Next: Details →
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="space-y-4 fade-in">
            <h3 className="text-white font-bold text-lg mb-2">Business Details</h3>
            <div>
              <label className={labelClass}>Business Description *</label>
              <textarea required rows={4} placeholder="Describe your business, what makes it stand out, and why you're selling..."
                value={form.description} onChange={e => update('description', e.target.value)}
                className={`${inputClass} resize-none`} />
            </div>
            <div>
              <label className={labelClass}>Key Highlights (one per line)</label>
              <textarea rows={4} placeholder="2,000+ monthly members&#10;High-traffic corner location&#10;Real estate included"
                value={form.highlights} onChange={e => update('highlights', e.target.value)}
                className={`${inputClass} resize-none`} />
            </div>
            <div>
              <label className={labelClass}>Equipment Details</label>
              <input type="text" placeholder="PDQ 2021, 160-ft tunnel, full LED" value={form.equipment}
                onChange={e => update('equipment', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Real Estate</label>
              <input type="text" placeholder="Owned / Leased - 10 years remaining" value={form.realEstate}
                onChange={e => update('realEstate', e.target.value)} className={inputClass} />
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="flex-1 py-3 rounded-xl font-bold border text-slate-400 hover:text-white transition-colors" style={{ borderColor: 'rgba(201,168,76,0.2)' }}>
                ← Back
              </button>
              <button onClick={() => setStep(4)} disabled={!form.description}
                className="flex-1 btn-gold py-3 rounded-xl font-bold disabled:opacity-40">
                Next: Contact →
              </button>
            </div>
          </div>
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <div className="space-y-4 fade-in">
            <h3 className="text-white font-bold text-lg mb-2">Your Contact Information</h3>
            <p className="text-slate-400 text-sm mb-2">Private — not shown publicly. Used to route buyer inquiries to you.</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Your Name *</label>
                <input type="text" required placeholder="John Smith" value={form.contactName}
                  onChange={e => update('contactName', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Email *</label>
                <input type="email" required placeholder="john@example.com" value={form.contactEmail}
                  onChange={e => update('contactEmail', e.target.value)} className={inputClass} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Phone</label>
                <input type="tel" placeholder="(615) 555-0100" value={form.contactPhone}
                  onChange={e => update('contactPhone', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Broker / Firm (if applicable)</label>
                <input type="text" placeholder="Southeast Car Wash Advisors" value={form.brokerFirm}
                  onChange={e => update('brokerFirm', e.target.value)} className={inputClass} />
              </div>
            </div>
            <div className="flex items-center gap-2 py-2">
              <input type="checkbox" id="isBroker" checked={form.isBroker}
                onChange={e => update('isBroker', e.target.checked)} className="w-4 h-4" />
              <label htmlFor="isBroker" className="text-slate-300 text-sm">I am a licensed business broker</label>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(3)} className="flex-1 py-3 rounded-xl font-bold border text-slate-400 hover:text-white transition-colors" style={{ borderColor: 'rgba(201,168,76,0.2)' }}>
                ← Back
              </button>
              <button
                onClick={() => { setSubmitted(true); handlePayment(); }}
                disabled={loading || !form.contactName || !form.contactEmail}
                className="flex-1 btn-gold py-3 rounded-xl font-bold disabled:opacity-40">
                Submit & Pay →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
