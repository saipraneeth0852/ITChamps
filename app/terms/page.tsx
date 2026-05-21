import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | ITChamps",
  description: "Terms governing use of the ITChamps website and services.",
};

export default function TermsPage() {
  return (
    <main className="legal-page">
      <div className="legal-page__container">
        <h1>Terms of Service</h1>
        <p className="legal-page__updated">Last updated: 1 January 2025</p>

        <section>
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using <strong>itchamps.com</strong> you agree to be bound by
            these Terms of Service and our{" "}
            <Link href="/privacy">Privacy Policy</Link>. If you do not agree, please do
            not use this website.
          </p>
        </section>

        <section>
          <h2>2. Use of the Website</h2>
          <p>You agree to use this website only for lawful purposes. You must not:</p>
          <ul>
            <li>Attempt to gain unauthorised access to any part of the website</li>
            <li>Transmit any harmful, offensive, or disruptive content</li>
            <li>Use automated tools to scrape or harvest data without prior written consent</li>
            <li>Impersonate ITChamps or any of its employees</li>
          </ul>
        </section>

        <section>
          <h2>3. Intellectual Property</h2>
          <p>
            All content on this website — including text, graphics, logos, and case study
            materials — is the property of ITChamps Software Private Limited and is
            protected by applicable intellectual property laws. You may not reproduce or
            distribute any content without prior written permission.
          </p>
        </section>

        <section>
          <h2>4. Disclaimer of Warranties</h2>
          <p>
            This website is provided "as is" without warranties of any kind. ITChamps does
            not warrant that the website will be uninterrupted, error-free, or free of
            viruses or other harmful components.
          </p>
        </section>

        <section>
          <h2>5. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, ITChamps shall not be liable for any
            indirect, incidental, or consequential damages arising from your use of, or
            inability to use, this website or its content.
          </p>
        </section>

        <section>
          <h2>6. Third-Party Links</h2>
          <p>
            This website may contain links to third-party websites. ITChamps is not
            responsible for the content or privacy practices of those sites.
          </p>
        </section>

        <section>
          <h2>7. Governing Law</h2>
          <p>
            These terms are governed by the laws of India. Any disputes shall be subject
            to the exclusive jurisdiction of the courts in Bengaluru, Karnataka.
          </p>
        </section>

        <section>
          <h2>8. Changes to Terms</h2>
          <p>
            We reserve the right to update these terms at any time. Continued use of the
            website after changes constitutes acceptance of the revised terms.
          </p>
        </section>

        <section>
          <h2>9. Contact</h2>
          <p>
            Questions about these terms: <a href="mailto:legal@itchamps.com">legal@itchamps.com</a>
          </p>
        </section>

        <p className="legal-page__back">
          <Link href="/">← Back to home</Link>
        </p>
      </div>
    </main>
  );
}
