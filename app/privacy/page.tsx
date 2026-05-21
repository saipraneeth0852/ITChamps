import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | ITChamps",
  description: "How ITChamps collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <main className="legal-page">
      <div className="legal-page__container">
        <h1>Privacy Policy</h1>
        <p className="legal-page__updated">Last updated: 1 January 2025</p>

        <section>
          <h2>1. Who We Are</h2>
          <p>
            ITChamps Software Private Limited ("ITChamps", "we", "us", or "our") is an SAP
            consulting and technology services company. Our registered office is in India.
            This policy explains how we handle personal data collected through{" "}
            <strong>itchamps.com</strong> and any related services.
          </p>
        </section>

        <section>
          <h2>2. Data We Collect</h2>
          <p>When you submit our contact or readiness-checklist form we collect:</p>
          <ul>
            <li>Full name</li>
            <li>Work email address</li>
            <li>Company name</li>
            <li>Phone number (optional)</li>
            <li>Service interest and company size</li>
            <li>Your message</li>
          </ul>
          <p>
            We also collect standard server logs (IP address, browser type, pages visited)
            for security and analytics purposes.
          </p>
        </section>

        <section>
          <h2>3. How We Use Your Data</h2>
          <ul>
            <li>To respond to your enquiry or request</li>
            <li>To send you the S/4HANA readiness checklist you requested</li>
            <li>To send occasional relevant updates if you opted in</li>
            <li>To improve our website and services</li>
          </ul>
          <p>
            We do not sell, rent, or share your personal data with third parties for their
            own marketing purposes.
          </p>
        </section>

        <section>
          <h2>4. Legal Basis for Processing</h2>
          <p>
            We process your data on the basis of your consent (when you submit our form)
            and our legitimate interest in responding to business enquiries.
          </p>
        </section>

        <section>
          <h2>5. Data Retention</h2>
          <p>
            Contact enquiries are retained for up to 3 years or until you request deletion,
            whichever comes first.
          </p>
        </section>

        <section>
          <h2>6. Your Rights</h2>
          <p>
            You have the right to access, correct, or delete personal data we hold about
            you. To exercise these rights, contact us at{" "}
            <a href="mailto:privacy@itchamps.com">privacy@itchamps.com</a>.
          </p>
        </section>

        <section>
          <h2>7. Cookies</h2>
          <p>
            This website uses only essential cookies required for site functionality. We do
            not use tracking or advertising cookies.
          </p>
        </section>

        <section>
          <h2>8. Changes to This Policy</h2>
          <p>
            We may update this policy from time to time. The date at the top of this page
            reflects the latest revision.
          </p>
        </section>

        <section>
          <h2>9. Contact</h2>
          <p>
            For privacy-related questions: <a href="mailto:privacy@itchamps.com">privacy@itchamps.com</a>
          </p>
        </section>

        <p className="legal-page__back">
          <Link href="/">← Back to home</Link>
        </p>
      </div>
    </main>
  );
}
