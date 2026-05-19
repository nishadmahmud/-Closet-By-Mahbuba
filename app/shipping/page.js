"use client";

import ContentPage, { ContentSection, brandLinkClass } from "@/components/ContentPage/ContentPage";
import Link from "next/link";

export default function ShippingInfoPage() {
  return (
    <ContentPage
      title="Shipping Information"
      subtitle="Everything you need to know about delivery times and costs."
      breadcrumb="Shipping"
    >
      <ContentSection title="Domestic Shipping">
        <p>
          We offer standard and express shipping options for all domestic orders. Orders are processed within 1–2 business days.
        </p>
        <ul>
          <li>
            <strong>Standard Shipping:</strong> Delivery in 2–5 business days. Free for orders over ৳5,000.
          </li>
          <li>
            <strong>Express Shipping:</strong> Delivery in 1–2 business days. Flat rate of ৳150.
          </li>
        </ul>
      </ContentSection>

      <ContentSection title="International Shipping">
        <p>
          We ship worldwide. International shipping rates and delivery times vary by destination. International orders may be subject to customs duties and taxes, which are the responsibility of the recipient.
        </p>
        <ul>
          <li>
            <strong>Standard International:</strong> 7–14 business days.
          </li>
          <li>
            <strong>Express International:</strong> 3–5 business days.
          </li>
        </ul>
      </ContentSection>

      <ContentSection title="Order Tracking">
        <p>
          Once your order has been dispatched, you will receive a tracking link via email. You can also monitor your shipment on our{" "}
          <Link href="/track-order" className={brandLinkClass}>
            Track Order
          </Link>{" "}
          page.
        </p>
      </ContentSection>
    </ContentPage>
  );
}
