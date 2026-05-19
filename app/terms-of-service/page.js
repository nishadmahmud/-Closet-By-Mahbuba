"use client";

import ContentPage, { ContentSection } from "@/components/ContentPage/ContentPage";

export default function TermsOfServicePage() {
  return (
    <ContentPage
      title="Terms of Service"
      subtitle="The rules and guidelines for using our services."
      breadcrumb="Terms of Service"
    >
      <ContentSection title="1. Acceptance of Terms">
        <p>
          By accessing or using our website, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
        </p>
      </ContentSection>

      <ContentSection title="2. Use License">
        <p>
          Permission is granted to temporarily view materials on our website for personal, non-commercial use only. This is the grant of a license, not a transfer of title.
        </p>
      </ContentSection>

      <ContentSection title="3. Disclaimer">
        <p>
          The materials on our website are provided on an &apos;as is&apos; basis. We make no warranties, expressed or implied, and hereby disclaim all other warranties including implied warranties of merchantability or fitness for a particular purpose.
        </p>
      </ContentSection>

      <ContentSection title="4. Limitations">
        <p>
          In no event shall Closet By Mahbuba or its suppliers be liable for any damages arising out of the use or inability to use the materials on our website.
        </p>
      </ContentSection>
    </ContentPage>
  );
}
