"use client";

import ContentPage, { ContentSection } from "@/components/ContentPage/ContentPage";

export default function PrivacyPolicyPage() {
  return (
    <ContentPage
      title="Privacy Policy"
      subtitle="How we collect, use, and protect your data."
      breadcrumb="Privacy Policy"
    >
      <ContentSection title="1. Information We Collect">
        <p>
          We collect information you provide directly to us, such as when you create or modify your account, place an order, contact customer support, or otherwise communicate with us. This may include your name, email, phone number, postal address, and payment information.
        </p>
      </ContentSection>

      <ContentSection title="2. How We Use Your Information">
        <p>
          We may use the information we collect to provide, maintain, and improve our services; process transactions; send order updates and support messages; and respond to your comments and requests.
        </p>
      </ContentSection>

      <ContentSection title="3. Data Security">
        <p>
          We take reasonable measures to help protect your information from loss, theft, misuse, and unauthorized access. However, no method of transmission over the internet can be guaranteed to be completely secure.
        </p>
      </ContentSection>

      <ContentSection title="4. Contact Us">
        <p>
          If you have any questions about this Privacy Policy, please contact us at hello@closetbymahbuba.com.
        </p>
      </ContentSection>
    </ContentPage>
  );
}
