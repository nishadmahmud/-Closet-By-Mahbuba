"use client";

import ContentPage, { ContentSection } from "@/components/ContentPage/ContentPage";
import { SITE_PHONE_TEL, SITE_PHONE_DISPLAY } from "@/lib/siteContact";

const inputClass =
  "w-full h-12 rounded-xl border border-[#F0D9E5] bg-[#FAFAFA] px-4 text-sm text-[#1A0A10] placeholder:text-[#8D6E7F]/60 focus:outline-none focus:ring-2 focus:ring-[#C2185B]/20 focus:border-[#C2185B] transition-colors";

export default function ContactPage() {
  return (
    <ContentPage
      title="Contact Us"
      subtitle="We'd love to hear from you. Get in touch with our team."
      breadcrumb="Contact"
      maxWidth="max-w-5xl"
    >
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12">
        <div>
          <h2
            className="text-sm font-semibold text-[#1A0A10] mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Send a Message
          </h2>
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-[#8D6E7F]">
                Full Name
              </label>
              <input type="text" className={inputClass} placeholder="Your name" />
            </div>
            <div>
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-[#8D6E7F]">
                Email Address
              </label>
              <input type="email" className={inputClass} placeholder="you@example.com" />
            </div>
            <div>
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-[#8D6E7F]">
                Message
              </label>
              <textarea
                className={`${inputClass} h-32 resize-none py-3`}
                placeholder="How can we help you?"
              />
            </div>
            <button
              type="submit"
              className="w-full h-12 rounded-full bg-[#C2185B] text-white text-xs font-bold tracking-widest uppercase hover:bg-[#9C0E47] transition-colors shadow-sm"
            >
              Submit Message
            </button>
          </form>
        </div>

        <div className="space-y-8 md:pt-2">
          <ContentSection title="Customer Service">
            <a
              href="mailto:hello@closetbymahbuba.com"
              className="block text-sm font-medium text-[#1A0A10] hover:text-[#C2185B] transition-colors"
            >
              hello@closetbymahbuba.com
            </a>
            <a
              href={`tel:${SITE_PHONE_TEL}`}
              className="mt-1 block text-sm font-medium text-[#1A0A10] hover:text-[#C2185B] transition-colors"
            >
              {SITE_PHONE_DISPLAY}
            </a>
            <p className="mt-2 text-xs text-[#8D6E7F]">Available Mon–Fri, 9am – 6pm (BST)</p>
          </ContentSection>

          <ContentSection title="Headquarters">
            <p>
              Closet By Mahbuba
              <br />
              House 21, Road 12, Sector 13, Uttara
              <br />
              Dhaka-1230, Bangladesh
            </p>
          </ContentSection>
        </div>
      </div>
    </ContentPage>
  );
}
