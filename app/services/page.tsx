"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import { NarrativeBackdrop } from "../../components/NarrativeBackdrop";

// ─── Animation variants ──────────────────────────────────────────────────────
const fadeUp = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } };
const fadeIn  = { hidden: { opacity: 0 },        visible: { opacity: 1 } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

// ─── Data ────────────────────────────────────────────────────────────────────
const heroStats = [
  { value: "20+", label: "Years SAP expertise" },
  { value: "120+", label: "Certified consultants" },
  { value: "45+", label: "Countries supported" },
  { value: "15", label: "Specialized services" },
];

const migrationSteps = [
  { num: "01", title: "Discovery", desc: "Business process mapping, landscape analysis, readiness scoring" },
  { num: "02", title: "Fit-Gap", desc: "Delta identification, custom object assessment, scope definition" },
  { num: "03", title: "Architecture", desc: "Solution blueprint, integration design, data migration strategy" },
  { num: "04", title: "Build", desc: "System configuration, custom development, integration build" },
  { num: "05", title: "Testing", desc: "Unit, integration, UAT, and performance validation cycles" },
  { num: "06", title: "Cutover", desc: "Detailed cutover plan, run books, contingency strategy" },
  { num: "07", title: "Go-Live", desc: "Controlled execution with hypercare team on standby" },
  { num: "08", title: "Stabilize", desc: "90-day post go-live support, optimization, knowledge transfer" },
];

const sapServices = [
  {
    id: "s4hana-migration",
    title: "S/4HANA Migration",
    subtitle: "Greenfield · Brownfield · Hybrid",
    description:
      "ECC end-of-support is December 2027. ITChamps leads structured S/4HANA migration programs that accelerate timelines, minimize disruption, and modernize enterprise operations.",
    bullets: [
      "Tailored greenfield, brownfield, or hybrid strategy",
      "Data migration and master data management",
      "Change management and user enablement",
      "Accelerated 6-12 month delivery playbooks",
      "SLA-backed go-live and optimization support",
    ],
    color: "blue",
    tag: "Transformation",
  },
  {
    id: "s4-implementation",
    title: "S/4HANA Implementation",
    subtitle: "Greenfield deployment · Best-practice launch",
    description:
      "Greenfield S/4HANA deployments for new business units, acquisitions, and clean-slate modernization with rapid deployment methods and global best practices.",
    bullets: [
      "Industry-specific templates for manufacturing, aerospace, and services",
      "Modular deployment by function or geography",
      "Multi-company, multi-country, multi-currency setup",
      "Integrated finance, supply chain, HR, and payroll processes",
      "24/7 war room and extended hypercare",
    ],
    color: "gold",
    tag: "Implementation",
  },
  {
    id: "sap-ams",
    title: "SAP Application Maintenance",
    subtitle: "24/7 support · Transparent SLAs",
    description:
      "Mission-critical SAP landscapes need proactive support. We provide 24/7 AMS with monitoring, root-cause resolution, structured change control, and predictable service levels.",
    bullets: [
      "Severity-based response and resolution governance",
      "Proactive monitoring, tuning, and preventive maintenance",
      "Incident, problem, and change management",
      "Dedicated SPOC and structured release governance",
      "Fixed-cost models with transparent reporting",
    ],
    color: "blue",
    tag: "Support",
  },
  {
    id: "sap-btp",
    title: "SAP BTP Implementation",
    subtitle: "Integration · Extension · Analytics",
    description:
      "Design and deploy cloud-native SAP BTP solutions for integration, workflow, custom extensions, analytics, and modern API-led architecture without bloating the core.",
    bullets: [
      "API-first integration between SAP and third-party systems",
      "Workflow orchestration and automation design",
      "Low-code apps and side-by-side extensions",
      "Real-time dashboards and analytics enablement",
      "Governance, access control, and compliance guardrails",
    ],
    color: "gold",
    tag: "Cloud",
  },
  {
    id: "sap-audit",
    title: "SAP Audit & Value Discovery",
    subtitle: "Health check · License review · ROI unlock",
    description:
      "Most enterprises leave SAP value untapped. Our assessment identifies underused capabilities, adoption gaps, redundant processes, and a prioritized roadmap for measurable ROI.",
    bullets: [
      "System, process, and user-behavior assessment",
      "Opportunity sizing and ROI analysis",
      "Performance, security, and adoption review",
      "12-month roadmap with prioritized quick wins",
      "Optional free assessment to validate opportunity",
    ],
    color: "blue",
    tag: "Advisory",
  },
];

const hrServices = [
  {
    id: "successfactors",
    title: "SAP SuccessFactors",
    subtitle: "Employee Central · Talent · HXM",
    description:
      "SuccessFactors transformation only works when it integrates with payroll, ERP, and local HR realities. We deliver phased HXM rollouts with strong adoption and measurable outcomes.",
    bullets: [
      "Tailored, phased implementation using proven templates",
      "Employee Central, talent, learning, and performance",
      "API-led integration with ECC, S/4HANA, and third-party systems",
      "Global compliance and local policy support",
      "Change management, training, and optimization",
    ],
    tag: "People Systems",
  },
  {
    id: "global-payroll",
    title: "Global Payroll Operations",
    subtitle: "45+ countries · Compliance by design",
    description:
      "Managing payroll across multiple jurisdictions means managing risk, regulation, and operating complexity. ITChamps delivers compliant, on-time payroll programs across 45+ countries.",
    bullets: [
      "Multi-country payroll across monthly, bi-weekly, and custom cycles",
      "Real-time statutory and tax compliance handling",
      "Localized language, currency, and reporting support",
      "Integration with SuccessFactors, time, benefits, and finance",
      "Audit-ready controls and regulatory reporting",
    ],
    tag: "Payroll",
  },
  {
    id: "ess-mss",
    title: "ESS & MSS Portals",
    subtitle: "Employee · Manager self-service",
    description:
      "Reduce HR's operational burden with mobile-ready self-service portals for employees and managers, tightly integrated with payroll, HR, and approval workflows.",
    bullets: [
      "Leave & attendance self-service",
      "Pay slip & tax document portal",
      "Manager approvals & workflows",
      "Personal data update flows",
      "Mobile-first responsive UI",
    ],
    tag: "Self-Service",
  },
  {
    id: "payroll-outsourcing",
    title: "Payroll Outsourcing",
    subtitle: "Managed service · End-to-end delivery",
    description:
      "End-to-end payroll ownership covering processing, compliance, reporting, audit support, and query handling so internal HR teams can focus on higher-value work.",
    bullets: [
      "End-to-end payroll processing",
      "Statutory compliance & filings",
      "Year-end & tax processing",
      "Payroll analytics & reporting",
      "24/7 payroll query resolution",
    ],
    tag: "Managed Service",
  },
];

const automationServices = [
  {
    id: "pega",
    title: "PEGA Automation",
    subtitle: "BPM · Case management · AI decisioning",
    description:
      "Automate high-volume, rule-based enterprise workflows with PEGA and SAP integration to reduce manual effort, improve cycle times, and increase visibility.",
    bullets: ["PEGA platform implementation", "BPM & case management design", "Customer journey automation", "AI-powered decisioning rules", "Legacy system integration"],
  },
  {
    id: "camunda",
    title: "Camunda Workflow",
    subtitle: "BPMN · Process orchestration",
    description:
      "Camunda-based orchestration for complex, cross-system workflows spanning SAP, APIs, bots, and manual tasks with real-time execution visibility.",
    bullets: ["Camunda Platform deployment", "BPMN 2.0 process modeling", "Microservices orchestration", "REST API integration design", "Process monitoring dashboards"],
  },
  {
    id: "dcs",
    title: "Document Content Services Integration",
    subtitle: "Document management · Compliance · Workflow",
    description:
      "Centralise enterprise documents — purchase orders, invoices, contracts, compliance records — with SAP Document Content Services, automated workflows, and e-signature capabilities.",
    bullets: ["Centralised document repository with version control", "Automated document workflows triggered from SAP transactions", "E-signature integration (DocuSign, Adobe Sign)", "OCR & AI invoice capture with 3-way match", "Compliance retention policies and audit trails"],
  },
  {
    id: "iot",
    title: "IoT Integration",
    subtitle: "Connected assets · Real-time intelligence",
    description:
      "Connect sensors, SCADA, and smart devices to SAP for real-time visibility, predictive maintenance, process optimization, and advanced analytics.",
    bullets: ["IoT platform architecture", "SAP IoT integration layer", "Device management & connectivity", "Predictive maintenance setup", "Real-time analytics pipelines"],
  },
];

const securityServices = [
  {
    id: "cyber-security",
    title: "Cyber Security",
    subtitle: "SAP Security · GRC · VAPT",
    description:
      "Protect sensitive SAP environments with vulnerability assessment, penetration testing, role and authorization reviews, GRC, and ongoing security governance.",
    bullets: ["SAP security landscape assessment", "Vulnerability & penetration testing", "GRC & SoD configuration", "User access management", "Security monitoring & alerting"],
  },
  {
    id: "ehs",
    title: "EHS Compliance",
    subtitle: "Environment · Health · Safety",
    description:
      "Implement and operate SAP EHS capabilities for incident management, environmental reporting, audit readiness, and multi-region compliance support.",
    bullets: ["SAP EHS module implementation", "Incident & near-miss management", "Regulatory compliance tracking", "Waste & emissions management", "Safety training records"],
  },
];

const technologies = [
  { name: "SAP S/4HANA", color: "blue" },
  { name: "SAP BTP", color: "gold" },
  { name: "SAP SuccessFactors", color: "blue" },
  { name: "SAP GRC", color: "gold" },
  { name: "PEGA", color: "blue" },
  { name: "Camunda", color: "gold" },
  { name: "iEmpPower", color: "blue" },
  { name: "PayCompute", color: "gold" },
];

const industries = [
  { name: "Manufacturing", icon: "M" },
  { name: "Energy & Oil", icon: "E" },
  { name: "Retail", icon: "R" },
  { name: "Telecom", icon: "T" },
  { name: "Professional Services", icon: "P" },
  { name: "Financial Services", icon: "F" },
  { name: "Automotive", icon: "A" },
  { name: "Education", icon: "Ed" },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="svc-eyebrow">{children}</p>;
}

function ServiceCard({
  service,
  index,
  accent = "blue",
}: {
  service: { id?: string; title: string; subtitle: string; description: string; bullets: string[]; tag?: string; color?: string };
  index: number;
  accent?: "blue" | "gold";
}) {
  const prefersReduced = useReducedMotion();
  return (
    <motion.div
      id={service.id}
      className={`svc-card svc-card--${accent}`}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, delay: prefersReduced ? 0 : index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, scale: 1.01 }}
    >
      {service.tag && <span className="svc-card__tag">{service.tag}</span>}
      <h3 className="svc-card__title">{service.title}</h3>
      <p className="svc-card__subtitle">{service.subtitle}</p>
      <p className="svc-card__desc">{service.description}</p>
      <ul className="svc-card__list">
        {service.bullets.map((b) => (
          <li key={b}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {b}
          </li>
        ))}
      </ul>
      <a href="#contact" className="svc-card__cta">
        Learn more
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
        </svg>
      </a>
    </motion.div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ServicesPage() {
  const prefersReduced = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const journeyRef = useRef<HTMLDivElement>(null);
  const journeyInView = useInView(journeyRef, { once: true, amount: 0.1 });

  return (
    <main className="svc-page">
      <NarrativeBackdrop variant="home" />

      {/* ── Navbar ─────────────────────────────────────────── */}
      <header className="topbar shell">
        <Link href="/" className="brand brand--logo" aria-label="ITChamps Software homepage">
          <Image src="/itchamps-logo.png" alt="ITChamps Software logo" width={176} height={56} priority />
        </Link>
        <nav className="topnav" aria-label="Primary">
          <Link href="/">Home</Link>
          <a href="#sap-solutions">SAP Solutions</a>
          <a href="#hr-payroll">HR &amp; Payroll</a>
          <a href="#automation">Automation</a>
          <a href="#security">Security</a>
          <Link href="/sap-solutions" className="topnav__sap-link">SAP Solutions Page</Link>
          <a href="#contact-svc">Get in Touch</a>
        </nav>
        <Link href="/#contact" className="button button--primary button--compact topbar-cta">
          Talk to an Expert
        </Link>
      </header>

      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="svc-hero shell" ref={heroRef}>
        {/* Left column */}
        <div className="svc-hero__left">
          <motion.div
            className="svc-hero__copy"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            <motion.p className="svc-eyebrow" variants={prefersReduced ? fadeIn : fadeUp}>
              Enterprise SAP Solutions
            </motion.p>
            <motion.h1 className="svc-hero__title" variants={prefersReduced ? fadeIn : fadeUp}>
              Enterprise SAP
              <span className="svc-hero__gradient"> Solutions</span>
              <br />Built for Scale.
            </motion.h1>
            <motion.p className="svc-hero__lede" variants={prefersReduced ? fadeIn : fadeUp}>
              From implementation to ongoing optimization, ITChamps delivers across the full SAP lifecycle. Fifteen specialized services designed for manufacturing, aerospace, professional services, and global HR operations.
            </motion.p>
            <motion.div className="svc-hero__actions" variants={prefersReduced ? fadeIn : fadeUp}>
              <a href="#sap-solutions" className="button button--primary">Explore Services</a>
              <Link href="/#contact" className="button button--ghost">Talk to an Expert</Link>
            </motion.div>
          </motion.div>

          {/* Stats row */}
          <motion.div
            className="svc-hero__stats"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            {heroStats.map((s) => (
              <div className="svc-stat" key={s.label}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </motion.div>

          {/* Floating tech tags */}
          <motion.div
            className="svc-hero__tags"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            aria-hidden="true"
          >
            {["S/4HANA", "SuccessFactors", "BTP", "PEGA", "Camunda", "GRC", "Payroll", "IoT"].map((t, i) => (
              <motion.span
                key={t}
                className="svc-tag-chip"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3 + i * 0.4, delay: i * 0.2, repeat: Infinity, ease: "easeInOut" }}
              >
                {t}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Right column — Hero visual */}
        <motion.div
          className="svc-hero__visual"
          initial={{ opacity: 0, x: 36, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.75, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="/hero_analytics.png"
            alt="SAP enterprise analytics and transformation dashboard"
            width={680}
            height={520}
            priority
            className="svc-hero__img"
          />
          <div className="svc-hero__visual-overlay" aria-hidden="true" />
          <motion.div
            className="svc-hero__visual-badge"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
          >
            <div className="svc-hero__badge-stat">
              <strong>100%</strong>
              <span>Project success rate</span>
            </div>
            <div className="svc-hero__badge-stat">
              <strong>20+</strong>
              <span>Years SAP expertise</span>
            </div>
            <div className="svc-hero__badge-stat">
              <strong>45+</strong>
              <span>Countries supported</span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Category Overview ──────────────────────────────── */}
      <section className="svc-overview shell">
        <motion.div
          className="svc-overview__grid"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {[
            { label: "SAP Solutions", count: "5 services", desc: "Migration, implementation, maintenance, BTP, and value discovery", href: "#sap-solutions", color: "blue" },
            { label: "HR & Payroll", count: "4 services", desc: "SuccessFactors, global payroll, self-service, and outsourcing", href: "#hr-payroll", color: "gold" },
            { label: "Enterprise Automation", count: "4 services", desc: "PEGA, Camunda, document services, and IoT integration", href: "#automation", color: "blue" },
            { label: "Security & Compliance", count: "2 services", desc: "Cyber security, GRC, EHS, and landscape protection", href: "#security", color: "gold" },
          ].map((cat, i) => (
            <motion.a
              key={cat.label}
              href={cat.href}
              className={`svc-overview__card svc-overview__card--${cat.color}`}
              variants={prefersReduced ? fadeIn : fadeUp}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 340, damping: 28 }}
            >
              <span className="svc-overview__count">{cat.count}</span>
              <h3>{cat.label}</h3>
              <p>{cat.desc}</p>
              <span className="svc-overview__arrow">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </motion.a>
          ))}
        </motion.div>
      </section>

      {/* ── SAP Solutions ──────────────────────────────────── */}
      <section className="svc-section shell" id="sap-solutions">
        <motion.div
          className="svc-section__header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionLabel>SAP Solutions</SectionLabel>
          <h2>Core SAP services for enterprise transformation.</h2>
          <p>From modernization strategy through long-term optimization, ITChamps delivers end-to-end SAP ownership with structured governance and measurable outcomes.</p>
        </motion.div>

        {/* Migration Approach Comparison */}
        <div className="svc-migration-compare">
          {[
            {
              badge: "Keep & Enhance", badgeColor: "blue",
              icon: "🔄", iconColor: "blue",
              title: "Brownfield",
              sub: "System Conversion",
              desc: "Convert your existing SAP ECC to S/4HANA in-place, preserving customizations, data, and business processes with minimal disruption.",
              pros: ["Minimal data migration effort", "Preserves existing customizations", "Faster timeline to go-live", "Lower initial investment"],
              timeline: "6–12 months",
            },
            {
              badge: "Most Popular", badgeColor: "gold",
              icon: "🌱", iconColor: "gold",
              title: "Greenfield",
              sub: "New Implementation",
              desc: "Build a clean, optimized S/4HANA system from scratch — ideal for enterprises seeking true process transformation and zero legacy debt.",
              pros: ["Clean architecture, no legacy debt", "SAP best-practice processes", "Full digital transformation", "Future-ready design"],
              timeline: "12–18 months",
              featured: true,
            },
            {
              badge: "Best of Both", badgeColor: "green",
              icon: "⚡", iconColor: "green",
              title: "Selective Data",
              sub: "Shell Conversion + Migration",
              desc: "Shell conversion with selective data migration — combine system modernization with the flexibility to carry only relevant data forward.",
              pros: ["Selective data cleansing", "Modernized process design", "Flexible data transfer scope", "Reduced data volume"],
              timeline: "10–16 months",
            },
          ].map((approach, i) => (
            <motion.div
              key={approach.title}
              className={`svc-migration-card${approach.featured ? " svc-migration-card--featured" : ""}`}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ duration: 0.48, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className={`svc-migration-badge svc-migration-badge--${approach.badgeColor}`}>{approach.badge}</span>
              <div className={`svc-migration-icon svc-migration-icon--${approach.iconColor}`}>{approach.icon}</div>
              <div>
                <h3>{approach.title}</h3>
                <p className="svc-migration-sub">{approach.sub}</p>
              </div>
              <p>{approach.desc}</p>
              <ul className="svc-migration-pros">
                {approach.pros.map(pro => <li key={pro}>{pro}</li>)}
              </ul>
              <div className="svc-migration-timeline">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                Typical timeline: <strong>{approach.timeline}</strong>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="svc-grid svc-grid--5">
          {sapServices.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} accent={s.color as "blue" | "gold"} />
          ))}
        </div>
      </section>

      {/* ── Migration Journey Infographic ──────────────────── */}
      <section className="svc-journey" ref={journeyRef}>
        <div className="shell">
          <motion.div
            className="svc-section__header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <SectionLabel>S/4HANA Migration Methodology</SectionLabel>
            <h2>A structured 8-phase journey to S/4HANA.</h2>
            <p>Every engagement follows our proven delivery methodology — governance gates, risk controls, and cutover precision at each phase.</p>
          </motion.div>

          <div className="svc-journey__track">
            {migrationSteps.map((step, i) => (
              <motion.div
                key={step.num}
                className="svc-journey__step"
                initial={{ opacity: 0, y: 24 }}
                animate={journeyInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.42, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="svc-journey__badge">{step.num}</div>
                {i < migrationSteps.length - 1 && <div className="svc-journey__connector" aria-hidden="true" />}
                <strong className="svc-journey__label">{step.title}</strong>
                <p className="svc-journey__desc">{step.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Delivery guarantees bar */}
          <motion.div
            className="svc-journey__guarantees"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {[
              { icon: "✓", label: "Zero rollback guarantee", sub: "Every phase validated before progression" },
              { icon: "⟳", label: "Fixed-scope ownership", sub: "One team across ERP, HR, payroll & AMS" },
              { icon: "⊕", label: "45+ country compliance", sub: "Payroll & HR built for multi-jurisdiction operations" },
            ].map((g) => (
              <div className="svc-guarantee" key={g.label}>
                <span className="svc-guarantee__icon">{g.icon}</span>
                <div>
                  <strong>{g.label}</strong>
                  <span>{g.sub}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SAP Module Ecosystem ───────────────────────────── */}
      <section className="svc-ecosystem" id="sap-ecosystem">
        <div className="shell">
          <motion.div
            className="svc-section__header svc-section__header--light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <SectionLabel>SAP Ecosystem</SectionLabel>
            <h2>The complete SAP landscape we master.</h2>
            <p style={{ color: "rgba(255,255,255,0.6)" }}>
              Every module, every integration layer — from S/4HANA core to BTP, SuccessFactors to analytics.
            </p>
          </motion.div>

          <div className="svc-ecosystem__diagram">
            {[
              {
                label: "Finance & Controlling",
                side: "left",
                modules: [
                  { name: "FI – Financial Accounting", gold: false },
                  { name: "CO – Controlling", gold: false },
                  { name: "TRM – Treasury Mgmt", gold: true },
                  { name: "FSCM – Credit & Risk", gold: true },
                ],
              },
              {
                label: "Supply Chain",
                side: "left",
                modules: [
                  { name: "MM – Materials Mgmt", gold: false },
                  { name: "SD – Sales & Distribution", gold: false },
                  { name: "PP – Production Planning", gold: true },
                  { name: "QM – Quality Mgmt", gold: true },
                ],
              },
              { center: true },
              {
                label: "HR & People",
                side: "right",
                modules: [
                  { name: "SAP HCM Payroll", gold: false },
                  { name: "SuccessFactors", gold: true },
                  { name: "ESS / MSS Portals", gold: false },
                  { name: "Global Payroll", gold: true },
                ],
              },
              {
                label: "Technology & Analytics",
                side: "right",
                modules: [
                  { name: "SAP BTP", gold: false },
                  { name: "Analytics Cloud", gold: true },
                  { name: "BW/4HANA", gold: false },
                  { name: "Integration Suite", gold: true },
                ],
              },
            ].map((cluster, i) =>
              (cluster as any).center ? (
                <motion.div
                  key="center"
                  className="svc-eco-center"
                  initial={{ opacity: 0, scale: 0.75 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                  <motion.div
                    style={{ position: "absolute", inset: 0, borderRadius: 22, border: "1px solid rgba(0,123,181,0.3)" }}
                    animate={{ boxShadow: ["0 0 0 0 rgba(0,123,181,0.3)", "0 0 0 14px rgba(0,123,181,0)", "0 0 0 0 rgba(0,123,181,0.3)"] }}
                    transition={{ duration: 2.8, repeat: Infinity }}
                  />
                  <strong>S/4HANA</strong>
                  <span>Intelligent ERP Core</span>
                </motion.div>
              ) : (
                <motion.div
                  key={(cluster as any).label}
                  className="svc-eco-cluster"
                  initial={{ opacity: 0, x: (cluster as any).side === "left" ? -24 : 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.09 }}
                >
                  <div className="svc-eco-cluster__label">{(cluster as any).label}</div>
                  {(cluster as any).modules?.map((mod: any, j: number) => (
                    <motion.div
                      key={mod.name}
                      className={`svc-eco-module${mod.gold ? " svc-eco-module--gold" : ""}`}
                      initial={{ opacity: 0, x: (cluster as any).side === "left" ? -14 : 14 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.09 + j * 0.07, duration: 0.38 }}
                    >
                      <span className="svc-eco-dot" />
                      {mod.name}
                    </motion.div>
                  ))}
                </motion.div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ── ROI Impact Metrics ─────────────────────────────── */}
      <section className="svc-roi">
        <div className="shell">
          <motion.div
            className="svc-section__header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <SectionLabel>Client Outcomes</SectionLabel>
            <h2>Measurable results from every engagement.</h2>
            <p>Two decades of delivery produce numbers that speak — tracked, verified, and accountable.</p>
          </motion.div>

          <div className="svc-roi__grid">
            <div className="svc-roi__metrics">
              {[
                { label: "Operational efficiency improvement", value: "40%", pct: 40 },
                { label: "Go-live success rate", value: "100%", pct: 100 },
                { label: "Cost reduction post-migration", value: "25%", pct: 25 },
                { label: "Time-to-value acceleration", value: "30%", pct: 30 },
                { label: "Payroll accuracy rate", value: "99.9%", pct: 99 },
              ].map((m, i) => (
                <motion.div
                  key={m.label}
                  className="svc-roi__metric"
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.42 }}
                >
                  <div className="svc-roi__metric-header">
                    <span className="svc-roi__metric-label">{m.label}</span>
                    <span className="svc-roi__metric-value">{m.value}</span>
                  </div>
                  <div className="svc-roi__bar-track">
                    <motion.div
                      className="svc-roi__bar-fill"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: m.pct / 100 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, delay: i * 0.1 + 0.2, ease: [0.22, 1, 0.36, 1] }}
                      style={{ transformOrigin: "left" }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="svc-roi__callouts">
              {[
                { val: "20+", label: "Years of enterprise SAP delivery" },
                { val: "0", label: "Failed go-lives in our history" },
                { val: "45+", label: "Countries in global payroll programs" },
                { val: "∞", label: "Post-go-live accountability commitment" },
              ].map((c, i) => (
                <motion.div
                  key={c.val}
                  className="svc-roi__callout"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.42 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                >
                  <strong>{c.val}</strong>
                  <span>{c.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HR & Payroll ───────────────────────────────────── */}
      <section className="svc-section shell" id="hr-payroll">
        <motion.div
          className="svc-section__header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionLabel>HR & Payroll</SectionLabel>
          <h2>Global HR transformation and payroll precision.</h2>
          <p>Unified HR architecture and compliant payroll operations built for multi-country enterprises demanding accuracy and reliability.</p>
        </motion.div>

        {/* Payroll coverage visual */}
        <motion.div
          className="svc-payroll-banner"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="svc-payroll-banner__globe" aria-hidden="true">
            <svg viewBox="0 0 200 200" fill="none">
              <circle cx="100" cy="100" r="80" stroke="rgba(0,123,181,0.2)" strokeWidth="1.5" />
              <circle cx="100" cy="100" r="55" stroke="rgba(0,123,181,0.15)" strokeWidth="1" />
              <circle cx="100" cy="100" r="30" stroke="rgba(0,123,181,0.12)" strokeWidth="1" />
              <ellipse cx="100" cy="100" rx="80" ry="30" stroke="rgba(0,123,181,0.1)" strokeWidth="1" />
              <ellipse cx="100" cy="100" rx="80" ry="60" stroke="rgba(0,123,181,0.1)" strokeWidth="1" />
              {/* Dots representing countries */}
              {[
                [60,65],[140,72],[80,95],[130,88],[55,110],[150,115],
                [100,130],[70,140],[120,50],[95,58],[160,95],[40,85],
              ].map(([cx,cy],i) => (
                <motion.circle key={i} cx={cx} cy={cy} r="3.5"
                  fill={i % 2 === 0 ? "rgba(0,123,181,0.7)" : "rgba(217,154,0,0.7)"}
                  animate={{ opacity: [0.4, 1, 0.4], r: [3, 4.5, 3] }}
                  transition={{ duration: 2.5, delay: i * 0.2, repeat: Infinity, ease: "easeInOut" }}
                />
              ))}
            </svg>
          </div>
          <div className="svc-payroll-banner__copy">
            <strong>45+ Countries</strong>
            <p>Multi-country payroll designed for compliance precision — statutory filings, cross-border reporting, and payroll governance from a single delivery team.</p>
            <div className="svc-payroll-banner__chips">
              {["India","UK","Germany","USA","UAE","Singapore","Australia","Canada"].map(c => (
                <span key={c} className="svc-tag-chip svc-tag-chip--sm">{c}</span>
              ))}
              <span className="svc-tag-chip svc-tag-chip--sm">+22 more</span>
            </div>
          </div>
        </motion.div>

        <div className="svc-grid svc-grid--4">
          {hrServices.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} accent={i % 2 === 0 ? "blue" : "gold"} />
          ))}
        </div>
      </section>

      {/* ── Enterprise Automation ──────────────────────────── */}
      <section className="svc-section svc-section--dark" id="automation">
        <div className="shell">
          <motion.div
            className="svc-section__header svc-section__header--light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <SectionLabel>Enterprise Automation</SectionLabel>
            <h2>Intelligent automation at enterprise scale.</h2>
            <p>PEGA, Camunda, DCS and IoT integration services that connect your operational technology stack and drive process excellence.</p>
          </motion.div>

          {/* Automation flow infographic */}
          <motion.div
            className="svc-autoflow"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            aria-hidden="true"
          >
            {[
              { label: "Business Process", color: "blue" },
              { label: "PEGA / Camunda Engine", color: "gold" },
              { label: "SAP / ERP Core", color: "blue" },
              { label: "IoT / DCS Layer", color: "gold" },
              { label: "Analytics & Insights", color: "blue" },
            ].map((node, i) => (
              <div key={node.label} className="svc-autoflow__node-wrap">
                <motion.div
                  className={`svc-autoflow__node svc-autoflow__node--${node.color}`}
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.4 }}
                >
                  {node.label}
                </motion.div>
                {i < 4 && (
                  <motion.div
                    className="svc-autoflow__arrow"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 + 0.3, duration: 0.3 }}
                    style={{ transformOrigin: "left" }}
                  />
                )}
              </div>
            ))}
          </motion.div>

          <div className="svc-grid svc-grid--4">
            {automationServices.map((s, i) => (
              <ServiceCard key={s.id} service={s} index={i} accent={i % 2 === 0 ? "blue" : "gold"} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Security & Compliance ──────────────────────────── */}
      <section className="svc-section shell" id="security">
        <motion.div
          className="svc-section__header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionLabel>Security & Compliance</SectionLabel>
          <h2>Protecting your SAP landscape end to end.</h2>
          <p>Cyber security assessments, GRC implementation, and EHS compliance services designed for complex enterprise environments.</p>
        </motion.div>

        {/* Security shield infographic */}
        <motion.div
          className="svc-shield-wrap"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          aria-hidden="true"
        >
          <div className="svc-shield">
            <svg viewBox="0 0 240 260" fill="none">
              <motion.path
                d="M120 10 L220 50 L220 140 Q220 210 120 250 Q20 210 20 140 L20 50 Z"
                stroke="rgba(0,123,181,0.4)"
                strokeWidth="2"
                fill="rgba(0,123,181,0.04)"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
              <motion.path
                d="M120 30 L200 62 L200 140 Q200 198 120 232 Q40 198 40 140 L40 62 Z"
                stroke="rgba(0,123,181,0.2)"
                strokeWidth="1.5"
                fill="rgba(0,123,181,0.03)"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
              />
              <motion.polyline
                points="92,130 110,148 148,112"
                stroke="rgba(0,123,181,0.9)"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.9, ease: "easeOut" }}
              />
            </svg>
            <div className="svc-shield__rings" aria-hidden="true">
              {[1,2,3].map(n => (
                <motion.div
                  key={n}
                  className="svc-shield__ring"
                  animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3 + n, delay: n * 0.4, repeat: Infinity, ease: "easeInOut" }}
                />
              ))}
            </div>
          </div>
          <div className="svc-shield__stats">
            {[
              { val: "VAPT", desc: "Penetration testing" },
              { val: "GRC", desc: "Governance & compliance" },
              { val: "SoD", desc: "Segregation of duties" },
              { val: "EHS", desc: "Safety & environment" },
            ].map(s => (
              <div key={s.val} className="svc-shield__stat">
                <strong>{s.val}</strong>
                <span>{s.desc}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="svc-grid svc-grid--2">
          {securityServices.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} accent={i === 0 ? "blue" : "gold"} />
          ))}
        </div>
      </section>

      {/* ── Technology Platforms ───────────────────────────── */}
      <section className="svc-tech-section">
        <div className="shell">
          <motion.div
            className="svc-section__header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <SectionLabel>Technology Platforms</SectionLabel>
            <h2>The platforms powering our delivery.</h2>
          </motion.div>
          <div className="svc-tech-grid">
            {technologies.map((t, i) => (
              <motion.div
                key={t.name}
                className={`svc-tech-chip svc-tech-chip--${t.color}`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.35 }}
                whileHover={{ y: -4, scale: 1.05 }}
              >
                {t.name}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Industries ─────────────────────────────────────── */}
      <section className="svc-section shell">
        <motion.div
          className="svc-section__header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionLabel>Industries Served</SectionLabel>
          <h2>Sector expertise across enterprise verticals.</h2>
          <p>Our solutions are deployed across manufacturing, energy, retail, telecom, financial services, and more — with industry-specific configurations that accelerate delivery.</p>
        </motion.div>
        <div className="svc-industry-grid">
          {industries.map((ind, i) => (
            <motion.div
              key={ind.name}
              className="svc-industry-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.38 }}
              whileHover={{ y: -5 }}
            >
              <div className="svc-industry-card__icon" aria-hidden="true">{ind.icon}</div>
              <span>{ind.name}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Why ITChamps ───────────────────────────────────── */}
      <section className="svc-section shell">
        <motion.div
          className="svc-section__header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionLabel>Why ITChamps</SectionLabel>
          <h2>What separates our delivery from the rest.</h2>
          <p>Twenty years of enterprise SAP work taught us exactly where programs fail — and how to prevent it from day one.</p>
        </motion.div>

        <div className="svc-why__grid">
          {[
            { icon: "🏆", metric: "20+", title: "Years SAP expertise", desc: "Two decades of enterprise SAP delivery across global and regional programs — with deep module expertise on every engagement." },
            { icon: "🌍", metric: "45+", title: "Countries unified", desc: "Global payroll, HR transformation, and compliance delivery across 45+ countries in a single integrated operating model." },
            { icon: "✅", metric: "100%", title: "Go-live success rate", desc: "Every engagement has delivered a successful go-live. Zero failed implementations — a record we protect on every project." },
            { icon: "🔒", metric: "Zero", title: "Scope surprises", desc: "Fixed-scope delivery accountability. No hidden change requests, no budget creep, and no finger-pointing between workstreams." },
            { icon: "🤝", metric: "1 Team", title: "End-to-end ownership", desc: "ERP, HR, payroll, AMS, and automation under one roof — one accountable team, no handoffs, no coverage gaps." },
            { icon: "⭐", metric: "D-U-N-S", title: "Verified organisation", desc: "SAP Extended Business Member and VAR with D-U-N-S verified global standing and enterprise-grade governance standards." },
          ].map((card, i) => (
            <motion.div
              key={card.title}
              className="svc-why__card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ duration: 0.44, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
            >
              <div className="svc-why__icon">{card.icon}</div>
              <div className="svc-why__metric">{card.metric}</div>
              <div className="svc-why__title">{card.title}</div>
              <p className="svc-why__desc">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────── */}
      <section className="svc-cta shell" id="contact-svc">
        <motion.div
          className="svc-cta__inner"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <p className="svc-eyebrow">Ready to start?</p>
          <h2>Let&rsquo;s architect your SAP transformation.</h2>
          <p>
            Tell us where you are today — ECC support deadline pressure, payroll complexity,
            HR consolidation, or automation gaps — and we&rsquo;ll define the right path forward.
          </p>
          <div className="svc-cta__actions">
            <Link href="/#contact" className="button button--primary">Schedule a Consultation</Link>
            <Link href="/" className="button button--ghost">Back to Main Site</Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
