"use client";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "SAP Solutions", href: "/sap-solutions" },
  { label: "HR & Payroll", href: "/hr-payroll" },
  { label: "Automation", href: "/enterprise-automation" },
  { label: "Cyber Security", href: "/cyber-security" },
  { label: "AI", href: "/ai" },
  { label: "Products", href: "/iemp-power" },
  { label: "Training", href: "/training" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blog", href: "/blogs" },
];

export function SiteNav({ active, ctaHref, ctaLabel }: { active?: string; ctaHref?: string; ctaLabel?: string }) {
  return (
    <header className="topbar shell">
      <Link href="/" className="topbar__logo" aria-label="ITChamps home">
        <Image src="/itchamps-logo.png" alt="ITChamps" width={140} height={44} priority />
      </Link>
      <nav className="topnav" aria-label="Primary">
        {navLinks.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={active === l.href ? "topnav__active" : undefined}
            aria-current={active === l.href ? "page" : undefined}
          >
            {l.label}
          </Link>
        ))}
      </nav>
      <Link href={ctaHref ?? "#contact"} className="button button--primary button--compact topbar-cta">
        {ctaLabel ?? "Get in touch"}
      </Link>
    </header>
  );
}
