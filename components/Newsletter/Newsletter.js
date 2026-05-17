"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <section className="py-20 md:py-32 bg-[#FCFBF9]" id="newsletter-section">
      <div className="w-full max-w-[1600px] mx-auto px-4 md:px-12 text-center">
        <div className="max-w-xl mx-auto bg-white p-10 md:p-14 rounded-[2rem] shadow-sm border border-[#F7F5F2]">
          <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-medium text-[#1A0A10] mb-4 tracking-tight" style={{fontFamily: 'var(--font-playfair)'}}>
            Join the Mahbuba Circle
          </h2>
          <p className="text-sm text-[#8D6E7F] mb-8 leading-relaxed">
            Be the first to know — new arrivals, exclusive offers, and style inspiration curated just for you.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-stretch gap-2 max-w-md mx-auto relative mt-8"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="YOUR EMAIL ADDRESS"
              required
              className="flex-1 min-h-14 w-full px-6 py-4 text-xs tracking-widest bg-[#F7F5F2] text-[#1A0A10] placeholder-[#8D6E7F] focus:outline-none rounded-full focus:ring-2 focus:ring-[#C2185B]/20 transition-all"
              id="newsletter-email"
            />
            <button
              type="submit"
              className="flex sm:absolute sm:right-2 sm:top-2 sm:bottom-2 w-full min-h-14 items-center justify-center px-8 py-3 text-[10px] font-bold tracking-[0.15em] text-white uppercase transition-all duration-300 sm:w-auto sm:min-h-0 bg-[#1A0A10] hover:bg-[#C2185B] rounded-full hover:shadow-md"
              id="newsletter-submit"
            >
              {submitted ? "Subscribed" : "Subscribe"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
