"use client";

import Image from "next/image";
import Link from "next/link";
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
  "SAP Extended Business Member + VAR",
  "20+ Years of SAP Consulting",
  "30+ Countries in Payroll Delivery",
  "D-U-N-S Registered Organization"
];

const clientLogos = [
  { name: "ABB",          abbr: "ABB",   accent: "#FF0000", textColor: "#fff", sector: "Industrial Automation" },
  { name: "ONGC Videsh",  abbr: "OVL",   accent: "#1B6B3A", textColor: "#fff", sector: "Energy & Resources"    },
  { name: "Manipal Global", abbr: "MG",  accent: "#003DA5", textColor: "#fff", sector: "Education & HR"        },
  { name: "AT&S",         abbr: "AT&S",  accent: "#1A2B6B", textColor: "#fff", sector: "Technology"            },
];

const logoStripItems = [
  { name: "ABB",          src: "/client-logos/abb.svg",          w: 96,  h: 40 },
  { name: "ONGC Videsh",  src: "/client-logos/ongc-videsh.svg",  w: 148, h: 40 },
  { name: "Manipal Global", src: "/client-logos/manipal.svg",    w: 160, h: 40 },
  { name: "AT&S",         src: "/client-logos/at-s.svg",         w: 96,  h: 40 },
];
const heroTitle = ["Mastering Complexity.", "Driving Agility.", "Beyond ECC."];

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
      "Rigorous governance and precision architecture for complex enterprise footprints — eliminating execution risk at every phase.",
    image: "/system-orbit.svg",
    photo: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=240&fit=crop&q=80&auto=format",
    alt: "S/4HANA migration architecture",
    bullets: [
      "Discovery, fit-gap analysis, and migration roadmapping",
      "Brownfield, greenfield, and selective data transitions",
      "Cutover execution and post-go-live stabilization"
    ],
    highlight: "Controlled data transition and cutover"
  },
  {
    tag: "Support",
    title: "SLA-Driven AMS Support",
    description:
      "Stable operations, transparent SLAs, and continuous optimization — designed for enterprises that cannot afford disruption.",
    image: "/process-grid.svg",
    photo: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=240&fit=crop&q=80&auto=format",
    alt: "SAP AMS service framework",
    bullets: [
      "Functional and technical SAP landscape support",
      "Incident, release, and enhancement governance",
      "AMS transition and continuous system optimization"
    ],
    highlight: "Transparent SLAs and release governance"
  },
  {
    tag: "People Systems",
    title: "SuccessFactors Integration",
    description:
      "SAP SuccessFactors aligned to your HR transformation strategy — with structured integration and long-term operating model clarity.",
    image: "/insight-sheet.svg",
    photo: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=240&fit=crop&q=80&auto=format",
    alt: "SuccessFactors HR ecosystem",
    bullets: [
      "Core HR, talent acquisition, and employee lifecycle design",
      "Hybrid SAP HCM and SuccessFactors integrations",
      "Rollout planning and enterprise change management"
    ],
    highlight: "Unified HR architecture without integration drift"
  },
  {
    tag: "Payroll",
    title: "Global Payroll Operations",
    description:
      "Global payroll architecture for multi-country enterprises demanding compliance precision and operational reliability.",
    image: "/system-orbit.svg",
    photo: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&h=240&fit=crop&q=80&auto=format",
    alt: "Global payroll compliance model",
    bullets: [
      "Payroll design and execution across 30+ countries",
      "Integration with finance, reporting, and HR workflows",
      "Compliance controls and payroll readiness audits"
    ],
    highlight: "Cross-border compliance and execution"
  }
];

const caseStudies = [
  {
    client: "ABB",
    title: "Standardizing Global Operations for ABB",
    result: "40% increase in operational efficiency",
    description:
      "Deployed standardized process flows and rigorous deployment governance across distributed teams, dramatically improving rollout predictability.",
    image: "/case_abb.png"
  },
  {
    client: "ONGC Videsh",
    title: "Modernizing a Complex Energy Enterprise",
    result: "Unified reporting across global business units",
    description:
      "Engineered a structured enterprise model that eliminated workflow fragmentation across finance, operations, and support networks.",
    image: "/case_ongc.png"
  },
  {
    client: "Manipal Global",
    title: "Scaling HR & Payroll Transformation",
    result: "Flawless cross-system data coordination",
    description:
      "Architected a unified HR structure and robust payroll integration for a multi-entity organization managing highly sensitive employee operations.",
    image: "/case_manipal.png"
  }
];

const urgencyMetrics = [
  { value: "2027", label: "ECC mainstream support deadline" },
  { value: "67%", label: "of enterprises lag in migration readiness" },
  { value: "30+", label: "countries unified in our payroll programs" }
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

const heroNarrative = [
  {
    label: "Migration governance",
    text: "Program design, architecture sequencing, and cutover control for enterprise SAP landscapes."
  },
  {
    label: "Operational continuity",
    text: "AMS, payroll, and HR transformation support shaped for systems that cannot afford disruption."
  }
];

const capabilityNotes = [
  {
    num: "01",
    title: "Architecture first",
    metric: "Zero rework risk",
    text: "Dependency mapping, risk controls, and rollout sequencing — before execution pressure drives decisions."
  },
  {
    num: "02",
    title: "Cross-functional delivery",
    metric: "Single operating model",
    text: "ERP, HR, payroll, and support in one operating model — no fragmented workstreams."
  },
  {
    num: "03",
    title: "Executive visibility",
    metric: "Sponsor-ready dashboards",
    text: "Readiness, constraints, and stabilization priorities — visible to program sponsors at every stage."
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

  const closeNav = () => { setMobileNavOpen(false); setMobileServicesOpen(false); };

  const allowComplexMotion = !prefersReducedMotion && !isMobile;
  const { scrollYProgress } = useScroll();



  return (
    <main className="home-page">
      <ScrollProgressBar scrollYProgress={scrollYProgress} />
      <NarrativeBackdrop variant="home" />

      <header className={`topbar shell${mobileNavOpen ? " topbar--nav-open" : ""}`}>
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
          <Link href="/case-studies" onClick={closeNav}>Case Studies</Link>
          <Link href="/blogs" onClick={closeNav}>Blogs</Link>
          <Link href={academyHref} onClick={closeNav} className="topnav__academy">Academy</Link>
          <a href="#contact-form" onClick={closeNav}>Schedule a Consultation</a>
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
            Certified SAP Enterprise Partner
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
          <motion.p className="hero__subtext" variants={allowComplexMotion ? textItem : textItemSimple}>
            S/4HANA Migration • AMS Support • SuccessFactors • Global Payroll
          </motion.p>
          <motion.p className="lede" variants={allowComplexMotion ? textItem : textItemSimple}>
            We guide global enterprises through critical S/4HANA migrations, standardize complex payroll architectures,
            and deliver uncompromising SLA-driven support. Precision SAP engineering, designed for scale.
          </motion.p>

          <motion.div className="hero-narrative" variants={allowComplexMotion ? textItem : textItemSimple}>
            {heroNarrative.map((item) => (
              <div key={item.label} className="hero-narrative__item">
                <span>{item.label}</span>
                <p>{item.text}</p>
              </div>
            ))}
          </motion.div>

          <motion.div className="hero-actions" variants={allowComplexMotion ? textItem : textItemSimple}>
            <a href="#contact-form" className="button button--primary">
              Talk to an SAP Expert
            </a>
            <a href="#case-studies" className="button button--ghost">
              Review enterprise proof
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
              <strong>30+</strong>
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
            Trusted by enterprise teams across industries
          </motion.p>
          <motion.p variants={allowComplexMotion ? textItem : textItemSimple}>
            Fortune 500 references, repeat consulting engagements, certified SAP partnership status, and a strong
            delivery track record across manufacturing, energy, professional services, and global HR operations.
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
            <motion.h2 variants={allowComplexMotion ? textItem : textItemSimple}>SAP engineering built for enterprise scale.</motion.h2>
            <motion.p variants={allowComplexMotion ? textItem : textItemSimple}>
              From navigating legacy brownfield migrations to standardizing HR systems across 30+ borders,
              we deliver technical precision that mitigates risk.
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
                  <span>Payroll and HR operations built for multi-jurisdiction compliance across 30+ countries from day one.</span>
                </div>
              </div>
            </motion.div>

            <motion.p className="capability-proof" variants={allowComplexMotion ? textItem : textItemSimple}>
              Adopted by Fortune 500 manufacturers, global energy enterprises, and multi-country HR organizations demanding zero-disruption SAP delivery across 30+ countries.
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
              <p className="cap-hub__sub">Migration, support, HR, and payroll — end-to-end, with no handoff gaps.</p>
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
                  metric: "30+ countries · Multi-jurisdiction compliance",
                  desc: "SAP-based global payroll architecture with cross-border compliance controls, finance integration, and payroll readiness audits across 30+ countries.",
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
              <div className="cap-hub__stat"><strong>Zero</strong><span>Rollbacks</span></div>
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
          <motion.h2 variants={allowComplexMotion ? textItem : textItemSimple}>Delivering operational resilience for industry leaders.</motion.h2>
          <motion.p variants={allowComplexMotion ? textItem : textItemSimple}>
            Enterprise buyers demand visible proof. Explore how we've engineered solutions for
            manufacturing, energy, and global education leaders.
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
            The ECC deadline is closing in. Delay amplifies costs and operational risk.
          </motion.h2>
          <motion.p variants={allowComplexMotion ? textItem : textItemSimple}>
            Enterprises that postpone their S/4HANA transition are forced to compress critical architecture
            and cutover planning into shrinking windows. Execute with structured governance and zero disruption.
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

      <motion.section id="insights" className="section shell">
        <div className="lead-magnet holo-panel">
          <motion.div className="lead-magnet__copy" variants={textGroup} initial="hidden" whileInView="visible" viewport={{ once: true, amount: isMobile ? 0.05 : 0.3 }}>
            <motion.p className="eyebrow" variants={allowComplexMotion ? textItem : textItemSimple}>
              Executive resource
            </motion.p>
            <motion.h2 variants={allowComplexMotion ? textItem : textItemSimple}>SAP S/4HANA Migration Readiness Framework</motion.h2>
            <motion.p variants={allowComplexMotion ? textItem : textItemSimple}>
              A planning resource for IT leaders evaluating scope, governance, data dependencies,
              and risk mitigation in S/4HANA migration programs.
            </motion.p>
          </motion.div>

          <motion.div
            className="lead-magnet__visual"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: isMobile ? 0.05 : 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              className="floating-image floating-image--sheet"
              animate={allowComplexMotion ? { y: [0, -6, 0] } : undefined}
              transition={allowComplexMotion ? { duration: 12, repeat: Infinity, ease: "easeInOut" } : undefined}
            >
              <Image src="/insight-sheet.svg" alt="Readiness checklist preview" width={240} height={290} />
            </motion.div>
          </motion.div>

          <form className="lead-form">
            <label className="sr-only" htmlFor="work-email">
              Work email
            </label>
            <input id="work-email" name="work-email" type="email" placeholder="Work email" suppressHydrationWarning />
            <button type="submit" className="button button--primary" suppressHydrationWarning>
              Get the Checklist
            </button>
          </form>
        </div>
      </motion.section>

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
        eyebrow="Speak with delivery leadership"
        title="Ready to engineer your transformation?"
        description="Whether you are evaluating a greenfield S/4HANA rollout or seeking reliable global payroll governance, our delivery leadership is ready to align with your enterprise objectives."
        source="homepage"
      />

      <footer className="footer-section">
        <div className="shell">
          <div className="footer-section__top">
            <div className="footer-section__brand">
              <Image src="/itchamps-logo.png" alt="ITChamps Software logo" width={168} height={54} className="footer-logo" />
              <p>
                SAP consulting services, implementation, support, SuccessFactors consulting, and global payroll solutions
                for enterprise organizations.
              </p>
            </div>
            <div className="footer-section__links">
              <div>
                <h3>Consulting</h3>
                <a href="#services">S/4HANA Migration Services</a>
                <a href="#services">SAP AMS Services India</a>
                <a href="#services">SAP SuccessFactors Consulting</a>
                <a href="#services">SAP Global Payroll Solutions</a>
              </div>
              <div>
                <h3>Company</h3>
                <a href="#case-studies">Case Studies</a>
                <Link href={academyHref}>ITChamps Academy</Link>
                <a href="https://itchamps.com/company/" target="_blank" rel="noreferrer">
                  Company Details
                </a>
              </div>
              <div>
                <h3>Connect</h3>
                <a href="mailto:info@itchamps.com">info@itchamps.com</a>
                <a href="tel:+919342122665">+91 93421 22665</a>
                <span>Mysuru • Bengaluru • London</span>
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
    </main>
  );
}
