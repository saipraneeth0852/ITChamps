import Image from "next/image";
import Link from "next/link";

const socials = [
  {
    href: "https://www.linkedin.com/company/itchamps-software-pvt-ltd/",
    label: "LinkedIn",
    svg: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>,
  },
  {
    href: "https://youtube.com/@itchampssap",
    label: "YouTube",
    svg: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg>,
  },
  {
    href: "https://x.com/ITChamps_SAP",
    label: "X",
    svg: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  },
  {
    href: "https://www.instagram.com/itchamps_software_pvt_ltd",
    label: "Instagram",
    svg: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="none" stroke="currentColor" strokeWidth="2"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>,
  },
  {
    href: "https://www.facebook.com/share/18ayvzxcU3/",
    label: "Facebook",
    svg: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>,
  },
];

export function SiteFooter({ blurb }: { blurb?: string }) {
  return (
    <footer className="footer-section">
      <div className="shell">
        <div className="footer-section__top">
          <div className="footer-section__brand">
            <Image src="/itchamps-logo.png" alt="ITChamps Software logo" width={168} height={54} className="footer-logo" />
            <p>{blurb ?? "SAP consulting, S/4HANA migration, enterprise products, training, and digital transformation for global organizations."}</p>
          </div>

          <div className="footer-section__links">
            {/* ── Column 1: Solutions ── */}
            <div>
              <h3>Solutions</h3>
              <Link href="/sap-solutions">SAP Solutions</Link>
              <Link href="/hr-payroll">HR &amp; Payroll</Link>
              <Link href="/enterprise-automation">Automation</Link>
              <Link href="/cyber-security">Cyber Security</Link>
              <Link href="/ai">AI Solutions</Link>
              <Link href="/migration">S/4HANA Migration</Link>
              <Link href="/cloud-erp">Cloud ERP (ByDesign)</Link>
              <Link href="/eppm">EPPM</Link>
              <Link href="/professional-services">Professional Services</Link>
            </div>

            {/* ── Column 2: Products ── */}
            <div>
              <h3>Products</h3>
              <Link href="/iemp-power">iEmpPower &amp; PayCompute</Link>
              <Link href="/plm-solutions">PLM Solutions</Link>
              <Link href="/campus-automation">Campus Automation</Link>
            </div>

            {/* ── Column 3: Training & Resources ── */}
            <div>
              <h3>Training &amp; Resources</h3>
              <Link href="/training">SAP Training &amp; Certification</Link>
              <Link href="/academy">Leadership Academy</Link>
              <Link href="/case-studies">Case Studies</Link>
              <Link href="/blogs">Blog</Link>
              <Link href="/services">All Services</Link>
            </div>

            {/* ── Column 4: Connect ── */}
            <div>
              <h3>Connect</h3>
              <a href="mailto:info@itchamps.com">info@itchamps.com</a>
              <a href="mailto:education@itchamps.com">education@itchamps.com</a>
              <a href="tel:+919342122665">+91 93421 22665</a>
              <span>Mysuru · Bengaluru · Mumbai · London</span>
              <div className="footer-social">
                {socials.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={`ITChamps on ${s.label}`} className="footer-social__link">
                    {s.svg}{s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="footer-section__bottom">
          <p>© {new Date().getFullYear()} ITChamps Software Private Limited. All rights reserved.</p>
          <div className="footer-section__legal">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
