"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

// ─── Animation ───────────────────────────────────────────────────────────────
const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };
const fadeIn  = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
const stagger = { visible: { transition: { staggerChildren: 0.07 } } };

// ─── Data ────────────────────────────────────────────────────────────────────

const heroStats = [
  { value: "20+", label: "Years SAP expertise" },
  { value: "120+", label: "Certified consultants" },
  { value: "45+", label: "Countries supported" },
  { value: "100%", label: "Project success rate" },
];

const valueProps = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: "Migration with zero surprises",
    body: "Every ITChamps S/4HANA program runs from a fixed playbook with defined milestones, go/no-go gates, and hypercare. You always know where you are — and we've never missed a go-live.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: "24/7 support that actually responds",
    body: "Our AMS team operates round-the-clock with severity-graded SLAs, dedicated SPOCs, and predictive monitoring — so your SAP landscape stays stable long after go-live.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
    title: "World-class talent, local insight",
    body: "120+ SAP-certified consultants spanning manufacturing, energy, retail, and financial services, delivering across 45+ countries with deep knowledge of local compliance requirements.",
  },
];

const serviceTabs = [
  {
    id: "migration",
    label: "S/4HANA Migration",
    tag: "Transformation",
    headline: "ECC ends December 2027. Your migration starts today.",
    body: "ITChamps leads structured SAP S/4HANA migration programs using greenfield, brownfield, and selective data transition approaches. Every program is delivered on a fixed playbook with go/no-go gates, hypercare, and a 100% success track record.",
    bullets: [
      "Tailored greenfield, brownfield, or hybrid migration strategy",
      "Data migration and master data governance",
      "Business process redesign aligned to SAP best practices",
      "Change management and end-user enablement",
      "Accelerated 6–12 month delivery playbooks",
      "SLA-backed go-live and 90-day stabilization",
    ],
    link: "/services#s4hana-migration",
  },
  {
    id: "implementation",
    label: "S/4HANA Implementation",
    tag: "New Deployment",
    headline: "Greenfield deployments built on industry best practices.",
    body: "For new business units, acquisitions, or clean-slate modernization — ITChamps delivers full S/4HANA public and private cloud implementations with modular rollout options and industry-specific templates.",
    bullets: [
      "Industry templates for manufacturing, aerospace, retail, and services",
      "Modular deployment by function or geography",
      "Multi-company, multi-country, multi-currency setup",
      "Integrated finance, supply chain, HR, and payroll processes",
      "SAP Activate methodology with accelerated timelines",
      "24/7 war room and extended hypercare support",
    ],
    link: "/services#s4-implementation",
  },
  {
    id: "ams",
    label: "Application Management",
    tag: "24/7 Support",
    headline: "Mission-critical SAP landscapes deserve proactive support.",
    body: "ITChamps AMS provides 24/7 monitoring, root-cause resolution, structured change control, and predictable service levels — with a dedicated SPOC and fixed-cost transparency.",
    bullets: [
      "Severity-graded response and resolution governance",
      "Proactive monitoring, tuning, and preventive maintenance",
      "Incident, problem, and change management (ITIL-aligned)",
      "Dedicated SPOC and structured release governance",
      "Fixed-cost models with monthly transparent reporting",
      "Seamless transition from project team to support team",
    ],
    link: "/services#sap-ams",
  },
  {
    id: "btp",
    label: "SAP BTP",
    tag: "Cloud",
    headline: "Extend and integrate SAP without bloating the core.",
    body: "Design and deploy cloud-native SAP BTP solutions for integration, workflow automation, custom side-by-side extensions, and real-time analytics — with clean API-led architecture.",
    bullets: [
      "API-first integration between SAP and third-party systems",
      "Workflow orchestration and automation across enterprise systems",
      "Low-code apps and side-by-side extensions on BTP",
      "Real-time dashboards and analytics on SAP Analytics Cloud",
      "Governance, access control, and compliance guardrails",
      "CAP framework development and event mesh architecture",
    ],
    link: "/services#sap-btp",
  },
  {
    id: "successfactors",
    label: "SuccessFactors",
    tag: "People Systems",
    headline: "HXM transformation that integrates with your full SAP landscape.",
    body: "SuccessFactors only delivers value when it connects to payroll, ERP, and local HR realities. ITChamps delivers phased HXM rollouts with strong adoption rates and measurable talent outcomes.",
    bullets: [
      "Employee Central, talent, learning, and performance modules",
      "API-led integration with ECC, S/4HANA, and third-party HR systems",
      "Multi-country compliance and localization support",
      "Phased rollout with adoption measurement at each stage",
      "Change management, training design, and super-user programs",
      "Ongoing optimization post go-live",
    ],
    link: "/services#successfactors",
  },
  {
    id: "payroll",
    label: "Global Payroll",
    tag: "45+ Countries",
    headline: "Compliant, on-time payroll across 45+ jurisdictions.",
    body: "Managing payroll across multiple countries means managing risk, regulation, and operational complexity. ITChamps delivers statutory-compliant payroll programs with real-time regulatory updates across 45+ countries.",
    bullets: [
      "Multi-country payroll across monthly, bi-weekly, and custom cycles",
      "Real-time statutory and tax compliance handling",
      "Localized language, currency, and reporting support",
      "Integration with SuccessFactors, time, benefits, and finance",
      "Audit-ready controls and regulatory reporting",
      "End-to-end managed payroll outsourcing option",
    ],
    link: "/services#global-payroll",
  },
  {
    id: "audit",
    label: "SAP Audit & Advisory",
    tag: "Advisory",
    headline: "Most enterprises leave significant SAP value untapped.",
    body: "ITChamps SAP Audit identifies underused capabilities, adoption gaps, redundant processes, and missed integrations — then delivers a prioritized roadmap for measurable ROI within 12 months.",
    bullets: [
      "System, process, and user-behaviour assessment",
      "License and cost optimization analysis",
      "Performance, security, and adoption gap review",
      "Opportunity sizing and ROI quantification",
      "12-month prioritized roadmap with quick wins",
      "Optional complimentary initial assessment",
    ],
    link: "/services#sap-audit",
  },
];

const ecosystem = [
  "SAP S/4HANA Public Cloud",
  "SAP S/4HANA Private Cloud",
  "SAP ECC 6.0",
  "SAP BTP",
  "SAP SuccessFactors",
  "SAP Analytics Cloud",
  "SAP GRC & SoD",
  "SAP EHS",
  "SAP Ariba",
  "SAP Fieldglass",
  "SAP Concur",
  "SAP IBP",
  "SAP BW/4HANA",
  "SAP MDG",
  "SAP PO / CPI",
  "SAP Document Management",
];

const deadlines = [
  { product: "SAP ECC 6.0", version: "EHP 0–8", endDate: "December 2027", urgency: "critical" },
  { product: "SAP ECC 6.0", version: "Extended Maintenance", endDate: "December 2030", urgency: "warning" },
  { product: "SAP Business Suite 7", version: "All versions", endDate: "December 2027", urgency: "critical" },
  { product: "SAP BW 7.x", version: "All versions", endDate: "December 2027", urgency: "critical" },
  { product: "SAP CRM 7.0", version: "All versions", endDate: "December 2027", urgency: "critical" },
  { product: "SAP SCM 7.0", version: "All versions", endDate: "December 2027", urgency: "critical" },
  { product: "SAP S/4HANA 1709", version: "On-premise", endDate: "September 2027", urgency: "critical" },
  { product: "SAP S/4HANA 1809", version: "On-premise", endDate: "September 2028", urgency: "warning" },
  { product: "SAP S/4HANA 1909", version: "On-premise", endDate: "September 2029", urgency: "ok" },
  { product: "SAP S/4HANA 2020", version: "On-premise", endDate: "September 2030", urgency: "ok" },
  { product: "SAP S/4HANA 2021", version: "On-premise", endDate: "September 2031", urgency: "ok" },
  { product: "SAP S/4HANA 2022", version: "On-premise", endDate: "September 2032", urgency: "ok" },
];

const caseStudies = [
  {
    tag: "Process Manufacturing",
    title: "$15M Revenue Gain Through Yield Optimization",
    result: "$15M annual revenue increase",
    summary: "Deployed IoT integration, SAP S/4HANA, and predictive analytics across 50+ production units to eliminate yield variability and reactive maintenance.",
    image: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=640&h=400&fit=crop&q=80&auto=format",
    slug: "yield-optimizer-petrochemical",
  },
  {
    tag: "Aerospace",
    title: "Aerospace Supplier Achieves Boeing Tier-1 Status",
    result: "40% faster order cycle",
    summary: "Implemented S/4HANA public cloud with barcode traceability and resource matching, earning the client Boeing preferred-supplier certification.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=640&h=400&fit=crop&q=80&auto=format",
    slug: "aerospace-traceability",
  },
  {
    tag: "Global HR Operations",
    title: "Global Payroll for 45+ Countries, Zero Compliance Gaps",
    result: "98% on-time payroll delivery",
    summary: "Consolidated multi-country payroll for a Fortune 500 enterprise, achieving full statutory compliance across 45+ jurisdictions at enterprise scale.",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=640&h=400&fit=crop&q=80&auto=format",
    slug: "global-payroll-45-countries",
  },
];

const testimonials = [
  {
    quote: "We have been in business with ITChamps for several years and they have become a true partner in our SAP journey. Their team understands our operational complexity and delivers every time.",
    name: "Anthony Balraj",
    title: "Head of IT Operations",
    company: "AT&S",
    initials: "AB",
  },
  {
    quote: "The migration was delivered on time and on budget. More importantly, the post go-live hypercare team gave us confidence during the critical stabilization period.",
    name: "IT Director",
    title: "Head of Enterprise Applications",
    company: "Global Manufacturing Client",
    initials: "GM",
  },
  {
    quote: "ITChamps' AMS team has significantly reduced our incident resolution times. The transparent SLA reporting and dedicated SPOC model is exactly what enterprise support should look like.",
    name: "CIO",
    title: "Chief Information Officer",
    company: "Fortune 500 Retail Enterprise",
    initials: "CF",
  },
];

const faqs = [
  {
    q: "How long does an S/4HANA migration typically take?",
    a: "For mid-size enterprises, our accelerated playbooks deliver S/4HANA go-live in 6–12 months. Large, complex landscapes with global rollouts typically take 12–24 months. After an initial readiness assessment, we provide a fixed-scope, fixed-timeline proposal — no open-ended engagements.",
  },
  {
    q: "What happens to my ECC system after December 2027?",
    a: "SAP's mainstream maintenance for ECC 6.0 ends December 2027. After that, you can purchase extended maintenance (at a premium) through 2030, but you will no longer receive new functionality, regulatory updates, or security patches under standard contracts. The safest path is migrating to S/4HANA before the deadline.",
  },
  {
    q: "What is the difference between greenfield, brownfield, and hybrid migration?",
    a: "Greenfield means building a clean new S/4HANA system with optimized processes and migrating selected data. Brownfield (System Conversion) preserves your existing configuration and customizations while moving to S/4HANA. Hybrid (Selective Data Transition) combines both — keeping some legacy and rebuilding others. ITChamps recommends the approach based on your process complexity, timeline, and budget.",
  },
  {
    q: "Can ITChamps support SAP in our industry specifically?",
    a: "Yes. ITChamps has deep vertical expertise across process manufacturing, aerospace & defence, energy & utilities, retail, financial services, telecom, and professional services. We use industry-specific best-practice templates to accelerate delivery and reduce configuration risk.",
  },
  {
    q: "What does your AMS service include?",
    a: "Our Application Management Service includes 24/7 incident monitoring and resolution, problem management with root-cause analysis, change and release governance, proactive system health checks, user support, and monthly executive reporting. All under transparent, fixed-cost contracts with severity-graded SLA commitments.",
  },
  {
    q: "Do you handle post go-live support, or only implementations?",
    a: "We do both — and the transition is seamless. For every implementation we deliver, we offer a structured 90-day hypercare period followed by our long-term AMS program. The same team that built your system can support it, meaning no knowledge transfer gaps.",
  },
];

const resources = [
  {
    type: "Blog",
    title: "S/4HANA Governance Playbook for Complex Rollouts",
    author: "Rajesh Kutnikar",
    readTime: "8 min read",
    excerpt: "How to structure governance, decision-making, and escalation paths across multi-country S/4HANA programs.",
    slug: "sap-s4hana-governance",
  },
  {
    type: "Blog",
    title: "BTP Integration Quick Wins for SAP Landscapes Under Pressure",
    author: "Ganesh Ganiga",
    readTime: "6 min read",
    excerpt: "Five integration patterns that deliver fast, measurable results in the first 90 days of a BTP program.",
    slug: "btp-integration-quick-wins",
  },
  {
    type: "Blog",
    title: "SAP AMS Metrics Executives Actually Need to See",
    author: "ITChamps Editorial",
    readTime: "5 min read",
    excerpt: "Move beyond ticket counts and SLA percentages — the operational KPIs that show whether AMS is truly protecting your SAP investment.",
    slug: "sap-ams-executive-metrics",
  },
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function SapSolutionsPage() {
  const prefersReduced = useReducedMotion();
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const activeService = serviceTabs[activeTab];

  return (
    <main className="sap-page">
      {/* ── Navbar ───────────────────────────────────────── */}
      <header className="topbar shell">
        <Link href="/" className="brand brand--logo" aria-label="ITChamps Software homepage">
          <Image src="/itchamps-logo.png" alt="ITChamps Software" width={176} height={56} priority />
        </Link>
        <nav className="topnav" aria-label="Primary">
          <Link href="/">Home</Link>
          <Link href="/services">Services</Link>
          <Link href="/case-studies">Case Studies</Link>
          <Link href="/blogs">Insights</Link>
          <Link href="/academy">Academy</Link>
        </nav>
        <Link href="/#contact" className="button button--primary button--compact topbar-cta">
          Talk to an SAP Expert
        </Link>
      </header>

      {/* ── Urgency Banner ───────────────────────────────── */}
      <div className="sap-deadline-banner">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <span><strong>SAP ECC mainstream support ends December 2027.</strong> Most enterprises need 12–18 months to migrate. Start your assessment now.</span>
        <Link href="#contact-sap">Schedule free assessment →</Link>
      </div>

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="sap-hero">
        <div className="shell sap-hero__inner">
          <motion.div
            className="sap-hero__copy"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            <motion.p className="sap-eyebrow" variants={prefersReduced ? fadeIn : fadeUp}>
              Enterprise SAP Partner
            </motion.p>
            <motion.h1 className="sap-hero__title" variants={prefersReduced ? fadeIn : fadeUp}>
              Enterprise SAP.<br />Our Expertise.
            </motion.h1>
            <motion.p className="sap-hero__sub" variants={prefersReduced ? fadeIn : fadeUp}>
              From S/4HANA migration to 24/7 application support — ITChamps delivers every SAP program
              on time, on budget, and with a 100% project success rate across two decades of practice.
            </motion.p>
            <motion.div className="sap-hero__ctas" variants={prefersReduced ? fadeIn : fadeUp}>
              <Link href="#contact-sap" className="button button--primary">Schedule a Consultation</Link>
              <a href="#sap-services" className="button button--ghost">Explore our services ↓</a>
            </motion.div>
          </motion.div>

          <motion.div
            className="sap-hero__stats"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            {heroStats.map((s) => (
              <motion.div
                key={s.label}
                className="sap-stat-card"
                variants={prefersReduced ? fadeIn : fadeUp}
              >
                <span className="sap-stat-card__value">{s.value}</span>
                <span className="sap-stat-card__label">{s.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Value Props ──────────────────────────────────── */}
      <section className="sap-section shell">
        <motion.div
          className="sap-value-grid"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {valueProps.map((v) => (
            <motion.div
              key={v.title}
              className="sap-value-card"
              variants={prefersReduced ? fadeIn : fadeUp}
            >
              <div className="sap-value-card__icon">{v.icon}</div>
              <h3 className="sap-value-card__title">{v.title}</h3>
              <p className="sap-value-card__body">{v.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Services Tabs ─────────────────────────────────── */}
      <section className="sap-section sap-section--tinted" id="sap-services">
        <div className="shell">
          <motion.div
            className="sap-section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="sap-eyebrow">Full-spectrum SAP delivery</p>
            <h2 className="sap-section-title">Every SAP service your enterprise needs</h2>
            <p className="sap-section-sub">
              From initial strategy to long-term managed support — one partner for your entire SAP lifecycle.
            </p>
          </motion.div>

          {/* Tab bar */}
          <div className="sap-tab-bar" role="tablist" aria-label="SAP services">
            {serviceTabs.map((tab, i) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === i}
                aria-controls={`tabpanel-${tab.id}`}
                className={`sap-tab${activeTab === i ? " sap-tab--active" : ""}`}
                onClick={() => setActiveTab(i)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              id={`tabpanel-${activeService.id}`}
              role="tabpanel"
              className="sap-tab-panel"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="sap-tab-panel__content">
                <div className="sap-tab-panel__text">
                  <span className="sap-tag">{activeService.tag}</span>
                  <h3 className="sap-tab-panel__headline">{activeService.headline}</h3>
                  <p className="sap-tab-panel__body">{activeService.body}</p>
                  <ul className="sap-tab-panel__bullets">
                    {activeService.bullets.map((b) => (
                      <li key={b}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className="sap-tab-panel__ctas">
                    <Link href={activeService.link} className="button button--primary button--compact">
                      Full service details
                    </Link>
                    <Link href="#contact-sap" className="button button--ghost button--compact">
                      Speak to an expert
                    </Link>
                  </div>
                </div>
                <div className="sap-tab-panel__visual">
                  <div className="sap-tab-panel__index">
                    <span className="sap-tab-panel__index-num">0{activeTab + 1}</span>
                    <span className="sap-tab-panel__index-total">/ 07</span>
                  </div>
                  <div className="sap-tab-panel__service-list">
                    {serviceTabs.map((t, i) => (
                      <button
                        key={t.id}
                        className={`sap-tab-panel__service-item${activeTab === i ? " active" : ""}`}
                        onClick={() => setActiveTab(i)}
                      >
                        <span className="sap-tab-panel__service-dot" />
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── SAP Ecosystem ─────────────────────────────────── */}
      <section className="sap-section shell">
        <motion.div
          className="sap-section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="sap-eyebrow">Full SAP portfolio coverage</p>
          <h2 className="sap-section-title">Every product in the SAP ecosystem</h2>
          <p className="sap-section-sub">
            ITChamps consultants are certified and active across the full SAP product landscape —
            so you never need a second partner.
          </p>
        </motion.div>
        <motion.div
          className="sap-ecosystem-grid"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {ecosystem.map((product) => (
            <motion.div
              key={product}
              className="sap-ecosystem-chip"
              variants={prefersReduced ? fadeIn : fadeUp}
            >
              {product}
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Critical Deadlines ───────────────────────────── */}
      <section className="sap-section sap-section--dark">
        <div className="shell">
          <motion.div
            className="sap-section-header sap-section-header--light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="sap-eyebrow sap-eyebrow--light">Act before the deadline</p>
            <h2 className="sap-section-title sap-section-title--light">Critical SAP support end dates</h2>
            <p className="sap-section-sub sap-section-sub--light">
              SAP has announced firm end-of-maintenance dates for legacy products.
              Most enterprises need 12–18 months for a full migration. Plan now.
            </p>
          </motion.div>

          <div className="sap-deadline-table-wrapper">
            <table className="sap-deadline-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Version</th>
                  <th>End of Mainstream Maintenance</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {deadlines.map((row) => (
                  <tr key={`${row.product}-${row.version}`}>
                    <td>{row.product}</td>
                    <td>{row.version}</td>
                    <td className="sap-deadline-table__date">{row.endDate}</td>
                    <td>
                      <span className={`sap-urgency-badge sap-urgency-badge--${row.urgency}`}>
                        {row.urgency === "critical" ? "Act now" : row.urgency === "warning" ? "Plan ahead" : "Current"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="sap-deadline-cta">
            <p>Not sure where your current SAP version stands? We'll assess your landscape for free.</p>
            <Link href="#contact-sap" className="button button--primary">
              Request free readiness assessment
            </Link>
          </div>
        </div>
      </section>

      {/* ── Case Studies ─────────────────────────────────── */}
      <section className="sap-section shell" id="sap-results">
        <motion.div
          className="sap-section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="sap-eyebrow">Proven results</p>
          <h2 className="sap-section-title">SAP programs that delivered</h2>
          <p className="sap-section-sub">
            Every engagement in our portfolio closed on time, within budget, and with measurable business outcomes.
          </p>
        </motion.div>

        <motion.div
          className="sap-case-grid"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {caseStudies.map((cs) => (
            <motion.article
              key={cs.slug}
              className="sap-case-card"
              variants={prefersReduced ? fadeIn : fadeUp}
            >
              <div className="sap-case-card__img">
                <Image
                  src={cs.image}
                  alt={cs.title}
                  fill
                  sizes="(max-width: 900px) 100vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
                <span className="sap-case-card__tag">{cs.tag}</span>
              </div>
              <div className="sap-case-card__body">
                <p className="sap-case-card__result">{cs.result}</p>
                <h3 className="sap-case-card__title">{cs.title}</h3>
                <p className="sap-case-card__summary">{cs.summary}</p>
                <Link href={`/case-studies/${cs.slug}`} className="sap-case-card__link">
                  Read the full story
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <div className="sap-case-grid-cta">
          <Link href="/case-studies" className="button button--ghost">
            Explore all 7 case studies →
          </Link>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────── */}
      <section className="sap-section sap-section--tinted">
        <div className="shell">
          <motion.div
            className="sap-section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="sap-eyebrow">Client voices</p>
            <h2 className="sap-section-title">What our clients say</h2>
          </motion.div>

          <motion.div
            className="sap-testimonial-grid"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {testimonials.map((t) => (
              <motion.blockquote
                key={t.name}
                className="sap-testimonial-card"
                variants={prefersReduced ? fadeIn : fadeUp}
              >
                <svg className="sap-testimonial-card__quote-icon" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
                  <path d="M10 8C6.686 8 4 10.686 4 14v10h10V14H7c0-1.654 1.346-3 3-3V8zm18 0c-3.314 0-6 2.686-6 6v10h10V14h-7c0-1.654 1.346-3 3-3V8z" />
                </svg>
                <p className="sap-testimonial-card__text">{t.quote}</p>
                <footer className="sap-testimonial-card__footer">
                  <div className="sap-testimonial-card__avatar" aria-hidden="true">{t.initials}</div>
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.title}, {t.company}</span>
                  </div>
                </footer>
              </motion.blockquote>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section className="sap-section shell" id="sap-faq">
        <motion.div
          className="sap-section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="sap-eyebrow">Common questions</p>
          <h2 className="sap-section-title">SAP migration FAQ</h2>
        </motion.div>

        <div className="sap-faq">
          {faqs.map((faq, i) => (
            <div key={i} className={`sap-faq__item${openFaq === i ? " open" : ""}`}>
              <button
                className="sap-faq__question"
                aria-expanded={openFaq === i}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <span>{faq.q}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points={openFaq === i ? "18 15 12 9 6 15" : "6 9 12 15 18 9"} />
                </svg>
              </button>
              <AnimatePresence initial={false}>
                {openFaq === i && (
                  <motion.div
                    className="sap-faq__answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                  >
                    <p>{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* ── Resources ────────────────────────────────────── */}
      <section className="sap-section sap-section--tinted">
        <div className="shell">
          <motion.div
            className="sap-section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="sap-eyebrow">SAP insights</p>
            <h2 className="sap-section-title">From our consultants</h2>
          </motion.div>

          <motion.div
            className="sap-resource-grid"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {resources.map((r) => (
              <motion.article
                key={r.slug}
                className="sap-resource-card"
                variants={prefersReduced ? fadeIn : fadeUp}
              >
                <span className="sap-resource-card__type">{r.type}</span>
                <h3 className="sap-resource-card__title">{r.title}</h3>
                <p className="sap-resource-card__excerpt">{r.excerpt}</p>
                <div className="sap-resource-card__meta">
                  <span>{r.author}</span>
                  <span>{r.readTime}</span>
                </div>
                <Link href={`/blogs/${r.slug}`} className="sap-resource-card__link">
                  Read article →
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────── */}
      <section className="sap-section sap-cta-section" id="contact-sap">
        <div className="shell sap-cta-inner">
          <motion.div
            className="sap-cta-copy"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <p className="sap-eyebrow sap-eyebrow--light">Start your SAP journey</p>
            <h2 className="sap-cta-title">Ready to transform your SAP landscape?</h2>
            <p className="sap-cta-body">
              Tell us about your current SAP environment and goals. Our consultants will review your landscape
              and respond within one business day with a tailored assessment and a clear path forward.
            </p>
            <ul className="sap-cta-checklist">
              <li>Free initial SAP landscape assessment</li>
              <li>Dedicated consultant — no sales handoffs</li>
              <li>Response within 1 business day</li>
              <li>No obligation, no pressure</li>
            </ul>
          </motion.div>

          <motion.div
            className="sap-cta-form-wrap"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <SapContactForm />
          </motion.div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────── */}
      <footer className="sap-footer shell">
        <div className="sap-footer__brand">
          <Image src="/itchamps-logo.png" alt="ITChamps Software" width={140} height={44} />
          <p>The art of simplifying technology.</p>
        </div>
        <nav className="sap-footer__links">
          <div>
            <strong>SAP Services</strong>
            <Link href="/services#s4hana-migration">S/4HANA Migration</Link>
            <Link href="/services#s4-implementation">Implementation</Link>
            <Link href="/services#sap-ams">AMS Support</Link>
            <Link href="/services#sap-btp">SAP BTP</Link>
            <Link href="/services#sap-audit">SAP Audit</Link>
          </div>
          <div>
            <strong>People &amp; Payroll</strong>
            <Link href="/services#successfactors">SuccessFactors</Link>
            <Link href="/services#global-payroll">Global Payroll</Link>
            <Link href="/services#ess-mss">ESS &amp; MSS</Link>
            <Link href="/services#payroll-outsourcing">Payroll Outsourcing</Link>
          </div>
          <div>
            <strong>Company</strong>
            <Link href="/">Home</Link>
            <Link href="/case-studies">Case Studies</Link>
            <Link href="/blogs">Insights</Link>
            <Link href="/academy">Academy</Link>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </div>
        </nav>
        <div className="sap-footer__bottom">
          <p>© {new Date().getFullYear()} ITChamps Software Private Limited. All rights reserved.</p>
          <Link href="/#contact" className="button button--primary button--compact">
            Talk to an SAP Expert
          </Link>
        </div>
      </footer>
    </main>
  );
}

// ─── Contact Form Component ──────────────────────────────────────────────────

function SapContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [form, setForm] = useState({
    fullName: "", workEmail: "", company: "", serviceInterest: "", message: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "sap-solutions-page" }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="sap-form-success">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
        </svg>
        <h3>Thank you — we&apos;ll be in touch.</h3>
        <p>Expect a response from a senior SAP consultant within one business day.</p>
      </div>
    );
  }

  return (
    <form className="sap-form" onSubmit={handleSubmit} noValidate>
      <div className="sap-form__row">
        <label className="sr-only" htmlFor="sap-name">Full name</label>
        <input
          id="sap-name" type="text" placeholder="Full name" required
          value={form.fullName}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
        />
        <label className="sr-only" htmlFor="sap-email">Work email</label>
        <input
          id="sap-email" type="email" placeholder="Work email" required
          value={form.workEmail}
          onChange={(e) => setForm({ ...form, workEmail: e.target.value })}
        />
      </div>
      <label className="sr-only" htmlFor="sap-company">Company</label>
      <input
        id="sap-company" type="text" placeholder="Company name" required
        value={form.company}
        onChange={(e) => setForm({ ...form, company: e.target.value })}
      />
      <label className="sr-only" htmlFor="sap-service">Service interest</label>
      <select
        id="sap-service"
        value={form.serviceInterest}
        onChange={(e) => setForm({ ...form, serviceInterest: e.target.value })}
      >
        <option value="">Service of interest (optional)</option>
        <option>S/4HANA Migration</option>
        <option>S/4HANA Implementation</option>
        <option>SAP Application Management (AMS)</option>
        <option>SAP BTP</option>
        <option>SAP SuccessFactors</option>
        <option>Global Payroll</option>
        <option>SAP Audit &amp; Advisory</option>
        <option>Other / Not sure yet</option>
      </select>
      <label className="sr-only" htmlFor="sap-message">Message</label>
      <textarea
        id="sap-message" placeholder="Tell us about your SAP landscape and goals..." required rows={4}
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
      />
      {status === "error" && (
        <p className="sap-form__error">Something went wrong. Please try again or email us directly.</p>
      )}
      <button type="submit" className="button button--primary" disabled={status === "loading"}>
        {status === "loading" ? "Sending…" : "Request free assessment"}
      </button>
    </form>
  );
}
