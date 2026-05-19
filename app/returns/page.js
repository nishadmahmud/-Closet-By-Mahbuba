"use client";

import ContentPage, { ContentSection, brandLinkClass } from "@/components/ContentPage/ContentPage";
import Link from "next/link";

export default function ReturnsPage() {
  return (
    <ContentPage
      title="Returns & Exchange"
      subtitle="How to return or exchange your recent purchase."
      breadcrumb="Returns"
    >
      <ContentSection title="Our Policy">
        <p>
          We gladly accept returns and exchanges within 14 days of the delivery date. Items must be in their original condition: unworn, unwashed, and with all original tags attached. We reserve the right to refuse returns that do not meet these criteria.
        </p>
      </ContentSection>

      <ContentSection title="How to Initiate a Return">
        <ol>
          <li>
            Log in to your{" "}
            <Link href="/profile" className={brandLinkClass}>
              Profile
            </Link>{" "}
            and navigate to the <strong>Orders</strong> section.
          </li>
          <li>Select the order containing the item you wish to return and click &quot;Request Return&quot;.</li>
          <li>Fill out the brief return form stating the reason.</li>
          <li>You will receive an email with return instructions and a shipping label.</li>
        </ol>
      </ContentSection>

      <ContentSection title="Refund Processing">
        <p>
          Once we receive your returned item, our quality assurance team will inspect it. If approved, refunds are processed within 5–7 business days to the original payment method. You can track your refund status via the <strong>Returns</strong> tab in your profile.
        </p>
      </ContentSection>
    </ContentPage>
  );
}
