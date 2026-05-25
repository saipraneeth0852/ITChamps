"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ContactSection } from "../components/ContactSection";
import { NarrativeBackdrop } from "../components/NarrativeBackdrop";
import { academyHref } from "../lib/site";

function ScrollProgressBar({ scrollYProgress }: { scrollYProgress: any }) {
  const scaleX = useSpring(scrollYProgress, { stiffness: 400, damping: 50, restDelta: 0.001 });
  return (
    <motion.div
      className="scroll-progress-bar"
      style={{ scaleX, transformOrigin: "0%" }}
      aria-hidden="true"
    />
  );
}

function ScrollToTopButton({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <button
      className="scroll-to-top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  );
}

function FloatingParticles() {
  const particles = [
    { x: 8,  y: 15, size: 3, delay: 0,   dur: 9,  gold: false },
    { x: 23, y: 72, size: 2, delay: 1.4, dur: 11, gold: true  },
    { x: 61, y: 88, size: 2, delay: 2.2, dur: 10, gold: true  },
    { x: 76, y: 21, size: 3, delay: 0.8, dur: 12, gold: false },
    { x: 89, y: 55, size: 2, delay: 1.8, dur: 9,  gold: true  },
    { x: 32, y: 44, size: 2, delay: 0.4, dur: 11, gold: false },
    { x: 55, y: 62, size: 3, delay: 1.0, dur: 10, gold: false },
  ];
  return (
    <div className="floating-particles" aria-hidden="true">
      {particles.map((p, i) => (
        <motion.span
          key={i}
          className="particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.gold
              ? "radial-gradient(circle, rgba(217,154,0,0.9), rgba(240,171,0,0.4))"
              : "radial-gradient(circle, rgba(0,143,211,0.9), rgba(0,123,181,0.4))",
          }}
          animate={{ y: [0, -18, 0], opacity: [0.12, 0.55, 0.12] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}


function AnimatedStat({
  value,
  label,
  allowAnimation,
  delay = 0,
}: {
  value: string;
  label: string;
  allowAnimation: boolean;
  delay?: number;
}) {
  const numericValue = parseInt(value.replace(/\D/g, ""), 10);
  const suffix = value.replace(/[0-9]/g, "");
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let rafId: number;
    let startTime: number | null = null;
    const duration = 1600;
    const animate = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * numericValue));
      if (progress < 1) rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [started, numericValue]);

  return (
    <motion.div
      ref={ref}
      className="urgency-stat"
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay }}
      whileHover={allowAnimation ? { y: -6, scale: 1.02 } : undefined}
    >
      <strong>{count}{suffix}</strong>
      <span>{label}</span>
    </motion.div>
  );
}

const trustBadges = [
  "SAP Gold Partner",
  "SAP Education Partner",
  "AWS Partner",
  "PEGA & Camunda Partnership"
];

const clientLogos = [
  { name: "ABB",          abbr: "ABB",   accent: "#FF0000", textColor: "#fff", sector: "Industrial Automation"   },
  { name: "Dynamatic",    abbr: "DYN",   accent: "#1A3A6B", textColor: "#fff", sector: "Aerospace & Engineering" },
  { name: "Cycle Pure",   abbr: "CP",    accent: "#1B6B3A", textColor: "#fff", sector: "Consumer Goods"          },
  { name: "Subex",        abbr: "SUB",   accent: "#005B8E", textColor: "#fff", sector: "Telecom Analytics"       },
  { name: "AT&S",         abbr: "AT&S",  accent: "#1A2B6B", textColor: "#fff", sector: "Technology"              },
  { name: "ThoughtFocus", abbr: "TF",    accent: "#E07820", textColor: "#fff", sector: "Professional Services"   },
];

const logoStripItems = [
  { name: "ABB",          src: "/client-logos/abb.svg",          w: 96,  h: 40 },
  { name: "Dynamatic",    src: "/client-logos/dynamatic.svg",    w: 140, h: 40 },
  { name: "Cycle Pure",   src: "/client-logos/cycle-pure.svg",   w: 130, h: 40 },
  { name: "Subex",        src: "/client-logos/subex.svg",        w: 110, h: 40 },
  { name: "AT&S",         src: "/client-logos/at-s.svg",         w: 96,  h: 40 },
  { name: "ThoughtFocus", src: "/client-logos/thoughtfocus.svg", w: 160, h: 40 },
];
const heroTitle = ["Transform Enterprise Operations.", "Achieve Digital Excellence."];

const servicesNavItems = [
  {
    category: "SAP Solutions",
    href: "/services#sap-solutions",
    items: [
      { label: "S/4HANA Migration", href: "/services#s4hana-migration" },
      { label: "S/4HANA Implementation", href: "/services#s4-implementation" },
      { label: "SAP Application Maintenance", href: "/services#sap-ams" },
      { label: "SAP BTP Implementation", href: "/services#sap-btp" },
      { label: "SAP Audit & Value Discovery", href: "/services#sap-audit" },
    ],
  },
  {
    category: "HR & Payroll",
    href: "/services#hr-payroll",
    items: [
      { label: "Global Payroll Operations", href: "/services#global-payroll" },
      { label: "SuccessFactors Integration", href: "/services#successfactors" },
      { label: "ESS & MSS Portals", href: "/services#ess-mss" },
      { label: "Payroll Outsourcing", href: "/services#payroll-outsourcing" },
    ],
  },
  {
    category: "Enterprise Automation",
    href: "/services#automation",
    items: [
      { label: "PEGA Automation", href: "/services#pega" },
      { label: "Camunda Workflow", href: "/services#camunda" },
      { label: "DCS Integration", href: "/services#dcs" },
      { label: "IOT Integration", href: "/services#iot" },
    ],
  },
  {
    category: "Security",
    href: "/services#security",
    items: [
      { label: "Cyber Security", href: "/services#cyber-security" },
      { label: "EHS Compliance", href: "/services#ehs" },
    ],
  },
];

const services = [
  {
    tag: "Transformation",
    title: "S/4HANA Migration",
    description:
      "ECC end-of-support is approaching. We lead structured S/4HANA migration programs that reduce disruption, accelerate timelines, and set up modern operations.",
    image: "/system-orbit.svg",
    photo: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=240&fit=crop&q=80&auto=format",
    alt: "S/4HANA migration architecture",
    bullets: [
      "Greenfield, brownfield, and hybrid migration approaches",
      "Data migration, master data management, and fit-gap analysis",
      "Change management, cutover, and post-go-live optimization"
    ],
    highlight: "6-12 month delivery playbooks with SLA-backed execution"
  },
  {
    tag: "Support",
    title: "SLA-Driven AMS Support",
    description:
      "24/7 SAP application maintenance with proactive monitoring, root-cause resolution, and transparent service levels for mission-critical landscapes.",
    image: "/process-grid.svg",
    photo: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=240&fit=crop&q=80&auto=format",
    alt: "SAP AMS service framework",
    bullets: [
      "Severity-based response and resolution governance",
      "Incident, change, and enhancement management",
      "Dedicated SPOC and continuous system optimization"
    ],
    highlight: "Predictable support models with measurable uptime commitments"
  },
  {
    tag: "People Systems",
    title: "SuccessFactors Integration",
    description:
      "Cloud HXM transformation with SuccessFactors, integrated with payroll and ERP, designed for adoption, compliance, and measurable talent outcomes.",
    image: "/insight-sheet.svg",
    photo: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=240&fit=crop&q=80&auto=format",
    alt: "SuccessFactors HR ecosystem",
    bullets: [
      "Employee Central, talent, learning, and performance modules",
      "Hybrid ECC/S/4HANA and SuccessFactors integrations",
      "Rollout planning, training, and change enablement"
    ],
    highlight: "HR transformation built for multi-country operating models"
  },
  {
    tag: "Payroll",
    title: "Global Payroll Operations",
    description:
      "Multi-country payroll execution and compliance management for enterprises operating across complex statutory environments.",
    image: "/system-orbit.svg",
    photo: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&h=240&fit=crop&q=80&auto=format",
    alt: "Global payroll compliance model",
    bullets: [
      "Payroll delivery across 45+ countries and regional hubs",
      "Integration with SuccessFactors, HR, finance, and reporting",
      "Audit-ready compliance controls and payroll readiness reviews"
    ],
    highlight: "High-accuracy payroll operations with zero compliance gaps"
  }
];

const caseStudies = [
  {
    client: "Process Manufacturing",
    title: "$15M Revenue Gain in Petrochemical Production",
    result: "$15M annual revenue recovery",
    description:
      "Deployed AI-driven yield optimization across 50+ production units, capturing waste recovery and process efficiency gains.",
    image: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=640&h=400&fit=crop&q=80&auto=format"
  },
  {
    client: "Aerospace",
    title: "Aerospace Supplier Achieves Boeing Tier-1 Status",
    result: "40% faster order cycle",
    description:
      "Implemented S/4HANA public cloud with complete barcode traceability and resource matching, helping the client earn certification as Boeing's preferred supplier.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=640&h=400&fit=crop&q=80&auto=format"
  },
  {
    client: "Global HR Operations",
    title: "Global Payroll for 45+ Countries, Zero Compliance Gaps",
    result: "98% on-time payroll delivery",
    description:
      "Consolidated multi-country payroll operations for a Fortune 500 company, achieving full statutory compliance at enterprise scale.",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=640&h=400&fit=crop&q=80&auto=format"
  }
];

const urgencyMetrics = [
  { value: "2027", label: "ECC mainstream support deadline" },
  { value: "120+", label: "certified consultants" },
  { value: "45+", label: "countries with active client operations" }
];

const mediaPanels = [
  {
    title: "Transformation Telemetry",
    label: "Live Pipeline",
    text: "Visualize your S/4HANA migration pipeline with real-time operational telemetry and deployment status.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=640&h=400&fit=crop&q=80&auto=format",
    alt: "Transformation pipeline dashboard"
  },
  {
    title: "Program Control Matrix",
    label: "Workflow Mesh",
    text: "Track complex sequences, critical dependencies, and executive visibility metrics across your SAP ecosystem.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=640&h=400&fit=crop&q=80&auto=format",
    alt: "Program control metrics"
  },
  {
    title: "Executive Readiness Brief",
    label: "Data Audit",
    text: "Gain immediate oversight into cutover readiness, system health, and post-go-live stabilization metrics.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=640&h=400&fit=crop&q=80&auto=format",
    alt: "Executive data brief"
  }
];

const capabilityNotes = [
  {
    num: "01",
    title: "Outcome-first planning",
    metric: "Business-case clarity",
    text: "Every engagement starts with measurable outcomes, decision frameworks, and delivery scope aligned to enterprise priorities."
  },
  {
    num: "02",
    title: "Cross-functional delivery",
    metric: "Single accountable team",
    text: "ERP, HR, payroll, automation, and support delivered through one coordinated operating model."
  },
  {
    num: "03",
    title: "Executive visibility",
    metric: "Governance by design",
    text: "Readiness, risk, compliance, and stabilization priorities remain visible to sponsors throughout the program."
  }
];

const reveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const textGroup = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.02,
    }
  }
};

const textItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const textItemSimple = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 }
};

const revealLeft = {
  hidden: { opacity: 0, x: -28 },
  visible: { opacity: 1, x: 0 }
};

const revealLeftSimple = {
  hidden: { opacity: 0, x: -18 },
  visible: { opacity: 1, x: 0 }
};

const revealRight = {
  hidden: { opacity: 0, x: 28 },
  visible: { opacity: 1, x: 0 }
};

const revealRightSimple = {
  hidden: { opacity: 0, x: 18 },
  visible: { opacity: 1, x: 0 }
};

const popCard = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 }
};

const popCardSimple = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 }
};

export default function HomePage() {
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileNavOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileNavOpen]);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const closeNav = () => { setMobileNavOpen(false); setMobileServicesOpen(false); };

  const allowComplexMotion = !prefersReducedMotion && !isMobile;
  const { scrollYProgress } = useScroll();
  const pathname = usePathname();



  return (
    <main className="home-page">
      <ScrollProgressBar scrollYProgress={scrollYProgress} />
      <NarrativeBackdrop variant="home" />

      <header className={`topbar shell${mobileNavOpen ? " topbar--nav-open" : ""}${scrolled ? " topbar--scrolled" : ""}`}>
        <Link href="/" className="brand brand--logo" aria-label="ITChamps Software homepage">
          <Image src="/itchamps-logo.png" alt="ITChamps Software logo" width={176} height={56} priority />
        </Link>

        <nav className={`topnav${mobileNavOpen ? " topnav--open" : ""}`} aria-label="Primary">
          <div className="nav-dropdown-wrap">
            <button
              className="nav-dropdown__trigger"
              onClick={() => setMobileServicesOpen(v => !v)}
              aria-expanded={mobileServicesOpen}
              aria-haspopup="true"
              suppressHydrationWarning
            >
              Services
              <svg
                className={`nav-dropdown__caret${mobileServicesOpen ? " nav-dropdown__caret--open" : ""}`}
                viewBox="0 0 12 8"
                fill="none"
                aria-hidden="true"
              >
                <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className={`nav-dropdown__panel${mobileServicesOpen ? " nav-dropdown__panel--open" : ""}`}>
              {servicesNavItems.map(group => (
                <div className="nav-dropdown__group" key={group.category}>
                  <Link href={group.href} className="nav-dropdown__group-title nav-dropdown__group-title--link" onClick={closeNav}>{group.category}</Link>
                  {group.items.map(item => (
                    <Link key={item.label} href={item.href} className="nav-dropdown__item" onClick={closeNav}>{item.label}</Link>
                  ))}
                </div>
              ))}
              <div className="nav-dropdown__footer">
                <Link href="/services" className="nav-dropdown__all" onClick={closeNav}>
                  View all services &rarr;
                </Link>
              </div>
            </div>
          </div>
          <Link href="/case-studies" onClick={closeNav} aria-current={pathname === "/case-studies" ? "page" : undefined}>Case Studies</Link>
          <Link href="/blogs" onClick={closeNav} aria-current={pathname === "/blogs" ? "page" : undefined}>Blogs</Link>
          <Link href={academyHref} onClick={closeNav} className="topnav__academy">Academy</Link>
          <Link href="/sap-solutions" onClick={closeNav} className="topnav__sap-link" aria-current={pathname === "/sap-solutions" ? "page" : undefined}>SAP Solutions</Link>
          <a href="#contact-form" className="button button--primary mobile-nav-cta" onClick={closeNav}>
            Talk to an SAP Expert
          </a>
        </nav>

        <a href="#contact-form" className="button button--primary button--compact topbar-cta">
          Talk to an SAP Expert
        </a>

        <button
          className={`mobile-menu-btn${mobileNavOpen ? " mobile-menu-btn--open" : ""}`}
          onClick={() => setMobileNavOpen(v => !v)}
          aria-label={mobileNavOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={mobileNavOpen}
        >
          <span />
        </button>
      </header>

      <section className="hero shell">
        <motion.div
          className="hero__copy"
          variants={textGroup}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.p className="eyebrow" variants={allowComplexMotion ? textItem : textItemSimple}>
            Trusted by Global Enterprises
          </motion.p>
          <motion.h1 className="hero-title" variants={allowComplexMotion ? textItem : textItemSimple}>
            {heroTitle.map((line, index) => (
              <motion.span
                key={line}
                className="hero-word"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                {line}
              </motion.span>
            ))}
          </motion.h1>
          <motion.div className="hero__stats-row" variants={allowComplexMotion ? textItem : textItemSimple}>
            <div className="hero__stat-pill"><strong>20+</strong><span>Years</span></div>
            <div className="hero__stat-pill"><strong>120+</strong><span>Consultants</span></div>
            <div className="hero__stat-pill"><strong>45+</strong><span>Countries</span></div>
            <div className="hero__stat-pill"><strong>100%</strong><span>Success Rate</span></div>
          </motion.div>

          <motion.div className="hero-actions" variants={allowComplexMotion ? textItem : textItemSimple}>
            <a href="#contact-form" className="button button--primary">
              Talk to an SAP Expert
            </a>
            <a href="#readiness-checklist" className="button button--ghost">
              S/4HANA Readiness Checklist
            </a>
          </motion.div>

          <motion.div className="trust-badges" aria-label="Trust badges" variants={allowComplexMotion ? textItem : textItemSimple}>
            {trustBadges.map((badge, i) => (
              <motion.span
                key={badge}
                className="trust-badge"
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + i * 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                whileHover={allowComplexMotion ? { y: -3, scale: 1.04 } : undefined}
              >
                {badge}
              </motion.span>
            ))}
          </motion.div>

          <motion.p className="lede" variants={allowComplexMotion ? textItem : textItemSimple}>
            ITChamps delivers S/4HANA migration, AMS, global payroll, and SuccessFactors for enterprises that need proven execution — not promises.
          </motion.p>
        </motion.div>

        <div className="hero__visual">
          <motion.div
            className="hero-visual-collage"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
          >
            <div className="hero-collage__main">
              <Image
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000&h=780&fit=crop&q=85&auto=format"
                alt="Global enterprise headquarters"
                fill
                priority
                sizes="(max-width: 900px) 100vw, 55vw"
                style={{ objectFit: "cover" }}
              />
              <div className="hero-collage__main-overlay" />
            </div>

            <div className="hero-collage__secondary">
              <Image
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=560&h=380&fit=crop&q=80&auto=format"
                alt="Strategic enterprise consulting team"
                fill
                sizes="(max-width: 900px) 50vw, 28vw"
                style={{ objectFit: "cover" }}
              />
            </div>

            <motion.div
              className="hero-collage__badge hero-collage__badge--a"
              animate={allowComplexMotion ? { y: [0, -6, 0] } : undefined}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <strong>100%</strong>
              <span>Go-live success</span>
            </motion.div>

            <motion.div
              className="hero-collage__badge hero-collage__badge--b"
              animate={allowComplexMotion ? { y: [0, -5, 0] } : undefined}
              transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
            >
              <strong>45+</strong>
              <span>Countries delivered</span>
            </motion.div>

            <motion.div
              className="hero-collage__badge hero-collage__badge--c"
              animate={allowComplexMotion ? { y: [0, -4, 0] } : undefined}
              transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            >
              <strong>20+</strong>
              <span>Years of expertise</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <motion.section className="trust-strip shell" aria-labelledby="trusted-by-title">
        <motion.div
          className="section-heading section-heading--compact"
          variants={textGroup}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: isMobile ? 0.1 : 0.4 }}
        >
          <motion.p className="eyebrow" id="trusted-by-title" variants={allowComplexMotion ? textItem : textItemSimple}>
            Trusted by Global Enterprises
          </motion.p>
          <motion.p variants={allowComplexMotion ? textItem : textItemSimple}>
            SAP partnership depth, global payroll operating experience, and a strong track record across manufacturing, aerospace, professional services, and global HR operations.
          </motion.p>
        </motion.div>
        <div className="logo-strip">
          <div className="logo-strip__track">
            {[...logoStripItems, ...logoStripItems].map((logo, i) => (
              <span key={`${logo.name}-${i}`} className="logo-chip">
                <img src={logo.src} alt={logo.name} width={logo.w} height={logo.h} loading="lazy" draggable={false} />
              </span>
            ))}
          </div>
        </div>
        <motion.blockquote
          className="trust-testimonial"
          variants={allowComplexMotion ? textItem : textItemSimple}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="trust-testimonial__stars" aria-label="5 out of 5 stars">★★★★★</div>
          <p>&ldquo;We have been in business with ITChamps and one thing I can say for sure is they genuinely care about our success. They have been amazing to work with every step of the way.&rdquo;</p>
          <footer>
            <strong>Anthony Balraj</strong>
            <span>Head of IT Operations, AT&S</span>
          </footer>
        </motion.blockquote>
      </motion.section>

      <motion.section
        id="services"
        className="section shell"
        variants={reveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: isMobile ? 0.05 : 0.15 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div className="section-heading section-heading--services" variants={textGroup}>
          <div className="section-heading__copy">
            <motion.p className="eyebrow" variants={allowComplexMotion ? textItem : textItemSimple}>
              Core Capabilities
            </motion.p>
            <motion.h2 variants={allowComplexMotion ? textItem : textItemSimple}>Enterprise SAP solutions built for scale.</motion.h2>
            <motion.p variants={allowComplexMotion ? textItem : textItemSimple}>
              From implementation to ongoing optimization, ITChamps delivers across the full SAP lifecycle for manufacturing, aerospace, professional services, and global HR operations.
            </motion.p>
            <motion.p className="capability-intro" variants={allowComplexMotion ? textItem : textItemSimple}>
              Three principles that govern every SAP program we deliver — from initial discovery to post-go-live stabilization:
            </motion.p>
            <motion.div className="capability-notes" variants={allowComplexMotion ? textItem : textItemSimple}>
              {capabilityNotes.map((item) => (
                <article key={item.title} className="capability-note">
                  <div className="capability-note__top">
                    <span className="capability-note__num">{item.num}</span>
                    <span className="capability-note__badge">{item.metric}</span>
                  </div>
                  <span>{item.title}</span>
                  <p>{item.text}</p>
                </article>
              ))}
            </motion.div>
            <motion.div className="delivery-guarantees" variants={allowComplexMotion ? textItem : textItemSimple}>
              <p className="delivery-guarantees__label">What every engagement guarantees</p>
              <div className="delivery-guarantee">
                <div className="delivery-guarantee__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
                <div>
                  <strong>No-disruption execution</strong>
                  <span>Every milestone validated before progression — rollback risk eliminated by design, not by chance.</span>
                </div>
              </div>
              <div className="delivery-guarantee">
                <div className="delivery-guarantee__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <div>
                  <strong>Fixed-scope delivery ownership</strong>
                  <span>One accountable team across ERP, HR, payroll, and AMS — no vendor handoff gaps or accountability gaps.</span>
                </div>
              </div>
              <div className="delivery-guarantee">
                <div className="delivery-guarantee__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
                  </svg>
                </div>
                <div>
                  <strong>Global compliance by design</strong>
                  <span>Payroll and HR operations built for multi-jurisdiction compliance across 45+ countries from day one.</span>
                </div>
              </div>
            </motion.div>

            <motion.p className="capability-proof" variants={allowComplexMotion ? textItem : textItemSimple}>
              Adopted by global enterprises seeking measurable outcomes, stronger governance, and delivery partners who can execute across business-critical SAP workstreams.
            </motion.p>
          </div>

          <motion.div
            className="cap-hub"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: isMobile ? 0.05 : 0.25 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <div className="cap-hub__bg">
              <Image
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=720&h=700&fit=crop&q=80&auto=format"
                alt=""
                fill
                sizes="(max-width: 1100px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
              <div className="cap-hub__bg-overlay" />
            </div>

            <div className="cap-hub__header">
              <p className="cap-hub__eyebrow">SAP Enterprise Capability Model</p>
              <p className="cap-hub__title">4 towers. One delivery team.</p>
              <p className="cap-hub__sub">Migration, support, HXM, and payroll delivered end-to-end without handoff gaps.</p>
            </div>

            <div className="cap-hub__tiles">
              {[
                {
                  name: "SAP S/4HANA Migration",
                  metric: "Brownfield · Greenfield · Selective",
                  desc: "Full-cycle ECC to S/4HANA migration — from fit-gap analysis and architecture design through cutover execution and post-go-live stabilization.",
                  accent: "blue",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" />
                      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                    </svg>
                  ),
                },
                {
                  name: "SAP AMS Support",
                  metric: "100% SLA adherence · Zero disruption",
                  desc: "SLA-driven Application Management Services covering incident handling, release governance, and continuous SAP landscape optimization.",
                  accent: "gold",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <polyline points="9 12 11 14 15 10" />
                    </svg>
                  ),
                },
                {
                  name: "SAP SuccessFactors",
                  metric: "Core HR · Talent · Employee Lifecycle",
                  desc: "End-to-end SuccessFactors consulting for HR transformation — including hybrid SAP HCM integration, rollout planning, and change management.",
                  accent: "blue",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  ),
                },
                {
                  name: "Global Payroll Solutions",
                  metric: "45+ countries · Multi-jurisdiction compliance",
                  desc: "SAP-based global payroll architecture with cross-border compliance controls, finance integration, and payroll readiness audits across 45+ countries.",
                  accent: "gold",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                  ),
                },
              ].map((tile) => (
                <div key={tile.name} className={`cap-hub__tile cap-hub__tile--${tile.accent}`}>
                  <div className="cap-hub__tile-icon">{tile.icon}</div>
                  <strong>{tile.name}</strong>
                  <span>{tile.metric}</span>
                  <p className="cap-hub__tile-desc">{tile.desc}</p>
                </div>
              ))}
            </div>

            <div className="cap-hub__stats">
              <div className="cap-hub__stat"><strong>20+</strong><span>Years expertise</span></div>
              <div className="cap-hub__stat-divider" />
              <div className="cap-hub__stat"><strong>100%</strong><span>Go-live success</span></div>
              <div className="cap-hub__stat-divider" />
              <div className="cap-hub__stat"><strong>45+</strong><span>Countries served</span></div>
            </div>
          </motion.div>
        </motion.div>

        <div className="service-grid">
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              className="service-card"
              variants={allowComplexMotion ? popCard : popCardSimple}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: isMobile ? 0.08 : 0.2 }}
              transition={{ duration: 0.42, delay: isMobile ? 0 : index * 0.07, ease: [0.22, 1, 0.36, 1] }}
              whileHover={allowComplexMotion ? { y: -10, scale: 1.015 } : undefined}
            >
              <div className="service-card__photo">
                <Image
                  src={service.photo}
                  alt={service.alt}
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                />
                <div className="service-card__photo-overlay" />
                <span className="service-chip service-chip--photo">{service.tag}</span>
              </div>

              <div className="service-card__body">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ul className="service-list">
                  {service.bullets.map((item) => (
                    <li key={item}>
                      <svg className="service-list-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="service-card__footer">
                  <span className="service-highlight">{service.highlight}</span>
                  <a href="#contact-form" className="card-link">
                    Discuss this service
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.section>

      <motion.section
        id="case-studies"
        className="section shell"
        variants={reveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: isMobile ? 0.05 : 0.15 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div className="section-heading" variants={textGroup}>
          <motion.p className="eyebrow" variants={allowComplexMotion ? textItem : textItemSimple}>
            Proven Outcomes
          </motion.p>
          <motion.h2 variants={allowComplexMotion ? textItem : textItemSimple}>Real Results Across Industries</motion.h2>
          <motion.p variants={allowComplexMotion ? textItem : textItemSimple}>
            See how we've helped enterprises achieve measurable outcomes, from $15M revenue gains to 30%+ operational efficiency improvements.
          </motion.p>
        </motion.div>

        <div className="case-grid">
          {caseStudies.map((study, index) => (
            <motion.article
              key={study.title}
              className="case-card"
              variants={
                allowComplexMotion
                  ? (index % 2 === 0 ? revealLeft : revealRight)
                  : (index % 2 === 0 ? revealLeftSimple : revealRightSimple)
              }
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: isMobile ? 0.08 : 0.3 }}
              transition={{ duration: 0.42, delay: isMobile ? 0 : index * 0.06, ease: [0.22, 1, 0.36, 1] }}
              whileHover={allowComplexMotion ? { y: -6, scale: 1.02 } : undefined}
            >
              <div className="case-card__visual">
                <Image src={study.image} alt={`${study.client} case study`} width={400} height={200} sizes="(max-width: 900px) 50vw, 33vw" style={{ objectFit: 'cover', width: '100%', height: '100%', borderRadius: '12px' }} />
              </div>
              <div className="case-card__meta">
                <span>{study.client}</span>
                <span className="case-card__result">{study.result}</span>
              </div>
              <h3>{study.title}</h3>
              <p>{study.description}</p>
            </motion.article>
          ))}
        </div>
        <motion.div
          className="section-bottom-cta"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <Link href="/case-studies" className="button button--ghost">
            Explore 7 Case Studies
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </motion.div>
      </motion.section>

      <motion.section
        className="section shell section--split"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: isMobile ? 0.05 : 0.2 }}
        variants={reveal}
      >
        <motion.div className="section-heading" variants={textGroup}>
          <motion.p className="eyebrow" variants={allowComplexMotion ? textItem : textItemSimple}>
            The 2027 Horizon
          </motion.p>
          <motion.h2 variants={allowComplexMotion ? textItem : textItemSimple}>
            The ECC deadline is closing in. Delay amplifies cost, complexity, and operational risk.
          </motion.h2>
          <motion.p variants={allowComplexMotion ? textItem : textItemSimple}>
            Enterprises that postpone S/4HANA transition planning compress critical architecture, data, and cutover work into shrinking windows. Structured governance is no longer optional.
          </motion.p>
        </motion.div>

        <motion.div className="urgency-panel" variants={allowComplexMotion ? textItem : textItemSimple}>
          {urgencyMetrics.map((metric, index) => (
            <AnimatedStat
              key={metric.label}
              value={metric.value}
              label={metric.label}
              allowAnimation={allowComplexMotion}
              delay={index * 0.08}
            />
          ))}
        </motion.div>
      </motion.section>

      {/* ── Executive Resource ──────────────────────────── */}
      <section id="readiness-checklist" className="exec-resource">
        <div className="exec-resource__inner shell">

          {/* LEFT: copy + preview card */}
          <motion.div
            className="exec-resource__left"
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
          >
            <span className="exec-resource__badge">Executive Resource</span>
            <h2 className="exec-resource__title">Is Your Enterprise<br/>Ready for S/4HANA?</h2>
            <p className="exec-resource__sub">
              A structured assessment guide used by 500+ enterprises. Identify gaps
              across infrastructure, data quality, change management, and timeline
              before you commit to migration.
            </p>

            <ul className="exec-resource__features">
              {[
                "Infrastructure & system readiness assessment",
                "Data quality & master data evaluation",
                "Organisational change management checklist",
                "Timeline & resource planning guide",
                "Cost-benefit analysis template",
                "Custom S/4HANA solutions roadmap",
              ].map((item) => (
                <li key={item}>
                  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="8" fill="rgba(0,143,211,0.18)"/><path d="M4.5 8l2.5 2.5 4.5-5" stroke="#008FD3" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  {item}
                </li>
              ))}
            </ul>

            {/* Mini checklist preview card */}
            <div className="exec-resource__preview">
              <div className="exec-resource__preview-header">
                <span className="exec-resource__preview-label">S/4HANA Readiness Score</span>
                <span className="exec-resource__preview-score">72 / 100</span>
              </div>
              {[
                { label: "Infrastructure",        pct: 80, color: "#22c55e" },
                { label: "Data Readiness",        pct: 60, color: "#f59e0b" },
                { label: "Change Management",     pct: 72, color: "#008FD3" },
                { label: "Timeline & Resources",  pct: 55, color: "#f59e0b" },
              ].map((bar) => (
                <div key={bar.label} className="exec-resource__bar-row">
                  <span>{bar.label}</span>
                  <div className="exec-resource__bar-track">
                    <div className="exec-resource__bar-fill" style={{ width: `${bar.pct}%`, background: bar.color }} />
                  </div>
                  <span className="exec-resource__bar-pct">{bar.pct}%</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: form card */}
          <motion.div
            className="exec-resource__right"
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            <div className="exec-resource__card">
              <p className="exec-resource__card-eyebrow">Free download</p>
              <h3 className="exec-resource__card-title">Get the Complete Checklist</h3>
              <p className="exec-resource__card-sub">PDF + interactive scorecard. No spam, unsubscribe any time.</p>

              <form className="exec-resource__form">
                <div className="exec-resource__form-row">
                  <input type="text" placeholder="Full name" aria-label="Full name" suppressHydrationWarning />
                  <input type="email" placeholder="Work email" aria-label="Work email" suppressHydrationWarning />
                </div>
                <input type="text" placeholder="Company name" aria-label="Company name" suppressHydrationWarning />
                <div className="exec-resource__form-row">
                  <select aria-label="Company size" suppressHydrationWarning defaultValue="">
                    <option value="" disabled>Company size</option>
                    <option>Under 200 employees</option>
                    <option>200–1,000 employees</option>
                    <option>1,000–5,000 employees</option>
                    <option>5,000+ employees</option>
                  </select>
                  <select aria-label="Migration timeline" suppressHydrationWarning defaultValue="">
                    <option value="" disabled>Migration timeline</option>
                    <option>Within 6 months</option>
                    <option>6–12 months</option>
                    <option>1–2 years</option>
                    <option>2+ years</option>
                    <option>Exploring options</option>
                  </select>
                </div>
                <label className="exec-resource__checkbox-row">
                  <input type="checkbox" suppressHydrationWarning />
                  <span>Send me monthly SAP migration insights</span>
                </label>
                <button type="submit" className="button button--primary exec-resource__submit" suppressHydrationWarning>
                  Download Free Checklist
                  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" width="18" height="18"><path d="M10 3v10m0 0l-3.5-3.5M10 13l3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M4 16h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
                </button>
              </form>

              <div className="exec-resource__social-proof">
                <div className="exec-resource__avatars">
                  {["#008FD3","#0055a4","#22c55e","#f59e0b"].map((c, i) => (
                    <span key={i} className="exec-resource__avatar" style={{ background: c, zIndex: 4 - i }} />
                  ))}
                </div>
                <p>Joined by <strong>500+ enterprise teams</strong> this year</p>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      <motion.section
        className="section shell media-lab"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: isMobile ? 0.05 : 0.15 }}
        variants={reveal}
      >
        <motion.div className="section-heading" variants={textGroup}>
          <motion.p className="eyebrow" variants={allowComplexMotion ? textItem : textItemSimple}>
            Operational Telemetry
          </motion.p>
          <motion.h2 variants={allowComplexMotion ? textItem : textItemSimple}>Real-time visibility into your SAP transformation ecosystem.</motion.h2>
          <motion.p variants={allowComplexMotion ? textItem : textItemSimple}>
            Visualize integration pipelines, track migration dependencies, and maintain executive oversight
            across complex, multi-layered SAP deployments.
          </motion.p>
        </motion.div>

        <div className="media-lab__grid">
          {mediaPanels.map((panel, index) => (
            <motion.article
              key={panel.title}
              className="media-panel"
              variants={allowComplexMotion ? popCard : popCardSimple}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: isMobile ? 0.08 : 0.25 }}
              transition={{ duration: 0.42, delay: isMobile ? 0 : index * 0.06, ease: [0.22, 1, 0.36, 1] }}
              whileHover={allowComplexMotion ? { y: -6, scale: 1.02 } : undefined}
            >
              <div className="media-panel__screen">
                <Image
                  src={panel.image}
                  alt={panel.alt}
                  fill
                  sizes="(max-width: 900px) 100vw, 33vw"
                  style={{ objectFit: "cover", borderRadius: "24px" }}
                />
                <span className="media-panel__label">{panel.label}</span>
                <div className="media-panel__hud">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
              <h3>{panel.title}</h3>
              <p>{panel.text}</p>
            </motion.article>
          ))}
        </div>
      </motion.section>

      <ContactSection
        eyebrow="Schedule Your Free SAP Consultation"
        title="Tell us about your SAP landscape."
        description="Our experts will assess your situation and recommend the right approach. No obligations, just honest expertise."
        source="homepage"
      />

      <footer className="footer-section">
        <div className="shell">
          <div className="footer-section__top">
            <div className="footer-section__brand">
              <Image src="/itchamps-logo.png" alt="ITChamps Software logo" width={168} height={54} className="footer-logo" />
              <p>
                SAP consulting, S/4HANA migration, AMS, SuccessFactors, payroll, automation, and enterprise transformation for global organizations.
              </p>
            </div>
            <div className="footer-section__links">
              <div>
                <h3>Quick Links</h3>
                <Link href="/">Home</Link>
                <Link href="/services">Services</Link>
                <Link href="/case-studies">Case Studies</Link>
                <Link href="/blogs">Blog</Link>
                <Link href={academyHref}>Academy</Link>
              </div>
              <div>
                <h3>Resources</h3>
                <Link href={academyHref}>ITChamps Academy</Link>
                <a href="https://itchamps.com/company/" target="_blank" rel="noreferrer">
                  Company Profile
                </a>
                <a href="#readiness-checklist">S/4HANA Checklist</a>
              </div>
              <div>
                <h3>Connect</h3>
                <a href="mailto:info@itchamps.com">info@itchamps.com</a>
                <a href="tel:+919342122665">+91 93421 22665</a>
                <span>Mysuru • Bengaluru • Mumbai • London</span>
                <div className="footer-social">
                  <a href="https://linkedin.com/company/itchamps" target="_blank" rel="noreferrer" aria-label="ITChamps on LinkedIn" className="footer-social__link">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                    </svg>
                    LinkedIn
                  </a>
                  <a href="https://youtube.com/@itchamps" target="_blank" rel="noreferrer" aria-label="ITChamps on YouTube" className="footer-social__link">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
                    </svg>
                    YouTube
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-section__bottom">
            <p>© {new Date().getFullYear()} ITChamps Software. All rights reserved.</p>
            <div className="footer-section__legal">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      <ScrollToTopButton visible={scrolled && !mobileNavOpen} />

      {isMobile && (
        <div className="mobile-sticky-cta" aria-label="Quick contact">
          <a href="#contact-form" className="button button--primary mobile-sticky-cta__btn">
            Talk to an SAP Expert
          </a>
          <a
            href="tel:+919342122665"
            className="mobile-sticky-cta__secondary"
            aria-label="Call ITChamps"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.56a16 16 0 0 0 6.13 6.13l.92-.93a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
          </a>
        </div>
      )}
    </main>
  );
}
