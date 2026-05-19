"use client";

import { useState } from "react";
import ContentPage from "@/components/ContentPage/ContentPage";

const faqs = [
  {
    question: "How long does shipping take?",
    answer:
      "For domestic orders, shipping usually takes 2–5 business days. International orders may take 7–14 business days depending on the destination.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We accept returns within 14 days of delivery. The item must be unworn, unwashed, and have all original tags attached.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order is shipped, you will receive an email with a tracking number. You can also track your order using the Track Order page in our footer.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes, we ship to most countries worldwide. Shipping costs will be calculated at checkout based on your location.",
  },
  {
    question: "How do I determine my size?",
    answer:
      "Each product page features a detailed size guide. We recommend measuring yourself and comparing it to our chart before placing an order.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <ContentPage
      title="Frequently Asked Questions"
      subtitle="Find answers to common questions about our products and services."
      breadcrumb="FAQs"
    >
      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-2xl border border-[#F0D9E5] bg-[#FDF6F8]/50"
          >
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-[#FDF6F8]"
              onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
            >
              <span className="text-xs font-bold uppercase tracking-wide text-[#1A0A10]">
                {faq.question}
              </span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={`shrink-0 text-[#C2185B] transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div
              className={`overflow-hidden px-5 transition-all duration-300 ease-in-out ${
                openIndex === index ? "max-h-48 pb-4" : "max-h-0"
              }`}
            >
              <p className="text-sm leading-relaxed text-[#8D6E7F]">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </ContentPage>
  );
}
