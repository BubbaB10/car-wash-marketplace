import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Listing Submitted | WashDealers.com",
  description: "Your car wash listing has been received. You'll be live within 1 business day.",
};

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-lg w-full text-center">
        <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #c9a84c, #e8c96a)' }}>
          <span className="text-3xl">✅</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white mb-4">You&apos;re In!</h1>
        <p className="text-slate-300 text-lg leading-relaxed mb-8">
          Your listing has been received and your subscription is active. Our team will review and publish your listing within <strong className="text-white">1 business day</strong>.
        </p>
        <div className="card-navy rounded-xl p-6 mb-8 text-left space-y-3">
          <h2 className="text-white font-bold mb-3">What happens next:</h2>
          {[
            "We review your listing for completeness (usually same-day)",
            "Your listing goes live with Featured placement",
            "Qualified buyers can find and contact you",
            "Buyer inquiries are routed directly to your email",
          ].map((step, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-yellow-500 font-bold shrink-0">{i + 1}.</span>
              <span className="text-slate-300 text-sm">{step}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-gold px-6 py-3 rounded-xl font-bold">
            Back to Homepage
          </Link>
          <Link href="/listings" className="px-6 py-3 rounded-xl font-semibold border transition-colors text-slate-300" style={{ borderColor: 'rgba(201,168,76,0.3)' }}>
            Browse Other Listings
          </Link>
        </div>
      </div>
    </div>
  );
}
