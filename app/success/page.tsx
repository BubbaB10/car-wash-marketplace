import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Listing Submitted | WashDealers.com",
  description: "Your car wash listing has been received. You'll be live within 1 business day.",
};

export default function SuccessPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-20"
      style={{ background: "var(--navy)" }}
    >
      <div className="max-w-lg w-full text-center">
        {/* Gold checkmark icon */}
        <div
          className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #c9a84c, #e8c96a)" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="38"
            height="38"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#0a1628"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
          You&apos;re Listed!
        </h1>
        <p className="text-slate-300 text-lg leading-relaxed mb-8">
          Your listing has been received and your subscription is active. Our team will review and publish your
          listing within{" "}
          <strong className="text-white">1 business day</strong>.
        </p>

        {/* Next steps card */}
        <div
          className="rounded-2xl p-6 mb-8 text-left space-y-3"
          style={{ background: "#112240", border: "1px solid rgba(201,168,76,0.2)" }}
        >
          <h2 className="text-white font-bold mb-4">What happens next:</h2>
          {[
            "We review your listing for completeness (usually same-day)",
            "Your listing goes live with Featured placement",
            "Qualified buyers can find and contact you",
            "Buyer inquiries are routed directly to your email",
          ].map((step, i) => (
            <div key={i} className="flex items-start gap-3">
              <span
                className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5"
                style={{ background: "rgba(201,168,76,0.15)", color: "#e8c96a" }}
              >
                {i + 1}
              </span>
              <span className="text-slate-300 text-sm leading-relaxed">{step}</span>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-gold px-6 py-3 rounded-xl font-bold">
            Back to Homepage
          </Link>
          <Link
            href="/listings"
            className="px-6 py-3 rounded-xl font-semibold transition-all hover:border-yellow-400 hover:text-yellow-400"
            style={{ border: "1.5px solid rgba(201,168,76,0.3)", color: "#94a3b8" }}
          >
            Browse Other Listings
          </Link>
        </div>
      </div>
    </div>
  );
}
