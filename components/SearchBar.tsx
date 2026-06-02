"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { US_STATES, WASH_TYPES } from "@/lib/listings";

export default function SearchBar() {
  const router = useRouter();
  const [state, setState] = useState("");
  const [type, setType] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (state) params.set("state", state);
    if (type) params.set("type", type);
    if (maxPrice) params.set("maxPrice", maxPrice);
    router.push(`/listings${params.toString() ? '?' + params.toString() : ''}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 max-w-2xl">
      <select
        value={state}
        onChange={e => setState(e.target.value)}
        className="input-navy rounded-lg px-4 py-3 text-sm flex-1"
      >
        <option value="">All States</option>
        {US_STATES.map(s => (
          <option key={s.code} value={s.code}>{s.name}</option>
        ))}
      </select>

      <select
        value={type}
        onChange={e => setType(e.target.value)}
        className="input-navy rounded-lg px-4 py-3 text-sm flex-1"
      >
        <option value="">All Types</option>
        {WASH_TYPES.map(t => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>

      <select
        value={maxPrice}
        onChange={e => setMaxPrice(e.target.value)}
        className="input-navy rounded-lg px-4 py-3 text-sm flex-1"
      >
        <option value="">Any Price</option>
        <option value="500000">Under $500K</option>
        <option value="1000000">Under $1M</option>
        <option value="2500000">Under $2.5M</option>
        <option value="5000000">Under $5M</option>
        <option value="10000000">Under $10M</option>
      </select>

      <button type="submit" className="btn-gold px-6 py-3 rounded-lg text-sm font-bold whitespace-nowrap shrink-0">
        Search Listings
      </button>
    </form>
  );
}
