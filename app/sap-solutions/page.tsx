"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

// ─── Animation ───────────────────────────────────────────────────────────────
const fadeUp  = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };
const fadeIn  = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
const stagger = { visible: { transition: { staggerChildren: 0.07 } } };

// ─── Data ────────────────────────────────────────────────────────────────────

const heroStats = [
  { value: "20+",  label: "Years SAP expertise" },
  { value: "120+", label: "Certified consultants" },
  { value: "45+",  label: "Countries supported" },
  { value: "100%", label: "Project success rate" },
];

const valueProps = [
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>,
    title: "Avoid migration surprises",
    body: "Every ITChamps S/4HANA program runs on a fixed playbook with milestone gates, risk registers, and a war-room team. We've never missed a go-live — and that record is our guarantee.",
    link: "#sap-services",
    cta: "Learn more",
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    title: "Maximise your SAP investment",
    body: "Extend your current SAP landscape with proactive AMS, security monitoring, and advisory — while planning your transition to S/4HANA on a timeline that works for your business.",
    link: "#sap-calculator",
    cta: "Calculate savings",
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    title: "Self-fund innovation",
    body: "Redirect savings from consolidated support and optimized licensing toward AI, analytics, and digital capability build-out — without waiting for your next budget cycle.",
    link: "#sap-calculator",
    cta: "Find out how",
  },
];

const serviceTabs = [
  {
    id: "migration",    label: "S/4HANA Migration",      tag: "Transformation",
    headline: "ECC ends December 2027. Your migration starts today.",
    body: "ITChamps leads structured SAP S/4HANA migration programs using greenfield, brownfield, and selective data transition approaches — delivered on a fixed playbook with go/no-go gates and a 100% success track record.",
    bullets: ["Greenfield, brownfield, or hybrid migration strategy","Data migration and master data governance","Business process redesign aligned to SAP best practices","Change management and end-user enablement","Accelerated 6–12 month delivery playbooks","SLA-backed go-live and 90-day stabilization"],
    link: "/services#s4hana-migration",
  },
  {
    id: "implementation", label: "Implementation",        tag: "New Deployment",
    headline: "Greenfield deployments built on industry best practices.",
    body: "For new business units, acquisitions, or clean-slate modernisation — ITChamps delivers full S/4HANA public and private cloud implementations with industry-specific templates and modular rollout options.",
    bullets: ["Industry templates for manufacturing, aerospace, retail, and services","Modular deployment by function or geography","Multi-company, multi-country, multi-currency setup","Integrated finance, supply chain, HR, and payroll","SAP Activate methodology with accelerated timelines","24/7 war room and extended hypercare support"],
    link: "/services#s4-implementation",
  },
  {
    id: "ams",           label: "Application Management", tag: "24/7 Support",
    headline: "Mission-critical SAP landscapes deserve proactive support.",
    body: "ITChamps AMS provides 24/7 monitoring, root-cause resolution, structured change control, and predictable fixed-cost service levels — with a dedicated SPOC and complete SLA transparency.",
    bullets: ["Severity-graded response and resolution governance","Proactive monitoring, tuning, and preventive maintenance","Incident, problem, and change management (ITIL-aligned)","Dedicated SPOC and structured release governance","Fixed-cost models with monthly transparent reporting","Seamless handover from project team to support team"],
    link: "/services#sap-ams",
  },
  {
    id: "btp",           label: "SAP BTP",                tag: "Cloud & Integration",
    headline: "Extend and integrate SAP without bloating the core.",
    body: "Design and deploy cloud-native SAP BTP solutions for integration, workflow automation, custom side-by-side extensions, and real-time analytics — all with clean API-led architecture.",
    bullets: ["API-first integration between SAP and third-party systems","Workflow orchestration and automation across enterprise systems","Low-code apps and side-by-side extensions on BTP","Real-time dashboards and analytics on SAP Analytics Cloud","CAP framework development and event mesh architecture","Governance, access control, and compliance guardrails"],
    link: "/services#sap-btp",
  },
  {
    id: "successfactors", label: "SuccessFactors",        tag: "People Systems",
    headline: "HXM transformation that integrates with your full SAP landscape.",
    body: "SuccessFactors only delivers value when it connects to payroll, ERP, and local HR realities. ITChamps delivers phased HXM rollouts with strong adoption rates and measurable talent outcomes.",
    bullets: ["Employee Central, talent, learning, and performance modules","API-led integration with ECC, S/4HANA, and third-party HR systems","Multi-country compliance and localisation support","Phased rollout with adoption measurement at each stage","Change management, training design, and super-user programs","Ongoing optimisation post go-live"],
    link: "/services#successfactors",
  },
  {
    id: "payroll",       label: "Global Payroll",         tag: "45+ Countries",
    headline: "Compliant, on-time payroll across 45+ jurisdictions.",
    body: "Managing payroll across multiple countries means managing risk, regulation, and operational complexity. ITChamps delivers statutory-compliant payroll programs with real-time regulatory updates.",
    bullets: ["Multi-country payroll across monthly, bi-weekly, and custom cycles","Real-time statutory and tax compliance handling","Localised language, currency, and reporting support","Integration with SuccessFactors, time, benefits, and finance","Audit-ready controls and regulatory reporting","End-to-end managed payroll outsourcing option"],
    link: "/services#global-payroll",
  },
  {
    id: "audit",         label: "SAP Audit & Advisory",   tag: "Advisory",
    headline: "Most enterprises leave significant SAP value untapped.",
    body: "ITChamps SAP Audit identifies underused capabilities, adoption gaps, redundant processes, and a prioritised roadmap for measurable ROI within 12 months — starting with a complimentary initial assessment.",
    bullets: ["System, process, and user-behaviour assessment","Licence and cost optimisation analysis","Performance, security, and adoption gap review","Opportunity sizing and ROI quantification","12-month prioritised roadmap with quick wins","Optional complimentary initial assessment"],
    link: "/services#sap-audit",
  },
  {
    id: "security",      label: "SAP Security & GRC",     tag: "Security",
    headline: "Protect your SAP landscape without sacrificing agility.",
    body: "Vulnerability assessment, penetration testing, role and authorisation reviews, GRC configuration, and ongoing security governance — keeping your SAP environment compliant and resilient.",
    bullets: ["SAP security landscape and vulnerability assessment","VAPT — vulnerability and penetration testing","GRC & SoD authorisation review and configuration","User access management and governance","Security monitoring and alerting dashboards","EHS compliance and audit-readiness support"],
    link: "/services#cyber-security",
  },
];

const ecosystem = [
  "SAP S/4HANA Public Cloud","SAP S/4HANA Private Cloud","SAP ECC 6.0 / Business Suite",
  "SAP BTP","SAP SuccessFactors","SAP Analytics Cloud","SAP GRC & SoD","SAP EHS",
  "SAP Ariba","SAP Fieldglass","SAP Concur","SAP IBP","SAP BW/4HANA",
  "SAP MDG","SAP PO / CPI","SAP Document Management",
];

const playbookSteps = [
  { num: "01", title: "Discovery",    desc: "Business process mapping, landscape analysis, readiness scoring" },
  { num: "02", title: "Fit-Gap",      desc: "Delta identification, custom object assessment, scope definition" },
  { num: "03", title: "Architecture", desc: "Solution blueprint, integration design, data migration strategy" },
  { num: "04", title: "Build",        desc: "System configuration, custom development, integration build" },
  { num: "05", title: "Testing",      desc: "Unit, integration, UAT, and performance validation cycles" },
  { num: "06", title: "Cutover",      desc: "Detailed cutover plan, run books, contingency strategy" },
  { num: "07", title: "Go-Live",      desc: "Controlled execution with hypercare team on standby" },
  { num: "08", title: "Stabilise",    desc: "90-day post go-live support, optimisation, knowledge transfer" },
];

const deadlines = [
  { product: "SAP ERP (ECC 6.0)",           version: "EHP 0–5",                    endDate: "December 2025", urgency: "critical" as const },
  { product: "SAP ERP (ECC 6.0)",           version: "EHP 6–8",                    endDate: "December 2027", urgency: "critical" as const },
  { product: "SAP CRM 7.0 (Business Suite)", version: "Business Suite 7",          endDate: "December 2027", urgency: "critical" as const },
  { product: "SAP SCM 7.0 (Business Suite)", version: "Business Suite 7",          endDate: "December 2027", urgency: "critical" as const },
  { product: "SAP SRM 7.0 (Business Suite)", version: "Business Suite 7",          endDate: "December 2027", urgency: "critical" as const },
  { product: "SAP NetWeaver Platform",       version: "7.5",                        endDate: "December 2027", urgency: "critical" as const },
  { product: "SAP S/4HANA",                 version: "1709 (on-premise)",           endDate: "September 2027", urgency: "critical" as const },
  { product: "SAP S/4HANA",                 version: "1809 (on-premise)",           endDate: "September 2028", urgency: "warning" as const },
  { product: "SAP S/4HANA",                 version: "1909 (on-premise)",           endDate: "September 2029", urgency: "ok" as const },
  { product: "SAP S/4HANA",                 version: "2020 (on-premise)",           endDate: "September 2030", urgency: "ok" as const },
  { product: "SAP S/4HANA",                 version: "2021–2022 (on-premise)",      endDate: "September 2031–32", urgency: "ok" as const },
];

const caseStudies = [
  {
    tag: "Process Manufacturing",
    title: "$15M Revenue Gain Through Yield Optimisation",
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
  { quote: "We have been in business with ITChamps for several years and they have become a true partner in our SAP journey. Their team understands our operational complexity and delivers every time.", name: "Anthony Balraj", title: "Head of IT Operations", company: "AT&S", initials: "AB" },
  { quote: "The migration was delivered on time and on budget. More importantly, the post go-live hypercare team gave us the confidence we needed during the critical stabilisation period.", name: "IT Director", title: "Head of Enterprise Applications", company: "Global Manufacturing Client", initials: "GM" },
  { quote: "ITChamps' AMS team has significantly reduced our incident resolution times. The transparent SLA reporting and dedicated SPOC model is exactly what enterprise support should look like.", name: "CIO", title: "Chief Information Officer", company: "Fortune 500 Retail Enterprise", initials: "CF" },
  { quote: "Their SuccessFactors implementation was the smoothest we've experienced. The integration with our existing payroll and ERP was seamless, and adoption across 3,000 employees exceeded targets.", name: "CHRO", title: "Chief Human Resources Officer", company: "Professional Services Group", initials: "PS" },
  { quote: "The BTP integration program connected eight previously siloed systems in just 14 weeks. ITChamps' API-first approach means we can extend further without touching the core.", name: "Head of Architecture", title: "Enterprise Architect", company: "Telecom Enterprise", initials: "TE" },
  { quote: "When we needed to consolidate payroll across 28 countries, ITChamps was the only partner with both the global compliance depth and SAP expertise to do it without disruption.", name: "VP Finance Operations", title: "VP Finance Operations", company: "Multinational Manufacturing", initials: "MF" },
];

const resources = [
  { type: "Blog", title: "S/4HANA Governance Playbook for Complex Rollouts",              author: "Rajesh Kutnikar",    readTime: "8 min",  slug: "sap-s4hana-governance" },
  { type: "Blog", title: "BTP Integration Quick Wins for SAP Landscapes Under Pressure",  author: "Ganesh Ganiga",      readTime: "6 min",  slug: "btp-integration-quick-wins" },
  { type: "Blog", title: "SAP AMS Metrics Executives Actually Need to See",               author: "ITChamps Editorial", readTime: "5 min",  slug: "sap-ams-executive-metrics" },
  { type: "Blog", title: "Global Payroll Readiness Before Multi-Country Expansion",       author: "Priya Sharma",       readTime: "7 min",  slug: "global-payroll-readiness" },
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function SapSolutionsPage() {
  const prefersReduced = useReducedMotion();
  const [activeTab, setActiveTab]       = useState(0);
  const [openFaq,   setOpenFaq]         = useState<number | null>(null);
  const [slide,     setSlide]           = useState(0);
  const [slideDir,  setSlideDir]        = useState(1);

  const goSlide = useCallback((dir: number) => {
    setSlideDir(dir);
    setSlide((s) => (s + dir + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (prefersReduced) return;
    const t = setInterval(() => goSlide(1), 6000);
    return () => clearInterval(t);
  }, [prefersReduced, goSlide]);

  const activeService = serviceTabs[activeTab];

  return (
    <main className="sap-page">

      {/* ── Navbar ────────────────────────────────────────── */}
      <header className="topbar shell">
        <Link href="/" className="brand brand--logo" aria-label="ITChamps Software homepage">
          <Image src="/itchamps-logo.png" alt="ITChamps Software" width={176} height={56} priority />
        </Link>
        <nav className="topnav" aria-label="Primary">
          <Link href="/">Home</Link>
          <Link href="/sap-solutions" className="topnav__active">SAP Solutions</Link>
          <Link href="/services">All Services</Link>
          <Link href="/case-studies">Case Studies</Link>
          <Link href="/blogs">Insights</Link>
          <Link href="/academy">Academy</Link>
        </nav>
        <Link href="#contact-sap" className="button button--primary button--compact topbar-cta">
          Talk to an SAP Expert
        </Link>
      </header>

      {/* ── Urgency Banner ────────────────────────────────── */}
      <div className="sap-deadline-banner">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        <span><strong>SAP ECC mainstream support ends December 2027.</strong> Most enterprises need 12–18 months to migrate safely. Start your free assessment now.</span>
        <Link href="#contact-sap">Get free readiness assessment →</Link>
      </div>

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="sap-hero">
        <div className="shell sap-hero__inner">
          <motion.div className="sap-hero__copy" variants={stagger} initial="hidden" animate="visible">
            <motion.p className="sap-eyebrow" variants={prefersReduced ? fadeIn : fadeUp}>Enterprise SAP Partner</motion.p>
            <motion.h1 className="sap-hero__title" variants={prefersReduced ? fadeIn : fadeUp}>
              SAP Innovation<br />and Support.<br />On Your Terms.
            </motion.h1>
            <motion.p className="sap-hero__sub" variants={prefersReduced ? fadeIn : fadeUp}>
              Act now to extend the life of your SAP systems — or migrate to S/4HANA with a partner
              that has never missed a go-live. ITChamps delivers every SAP program on time, on budget,
              with full hypercare and two decades of enterprise expertise.
            </motion.p>
            <motion.div className="sap-hero__ctas" variants={prefersReduced ? fadeIn : fadeUp}>
              <Link href="#sap-services" className="button button--primary">Explore our SAP services</Link>
              <Link href="#contact-sap" className="button button--ghost">Request a consultation</Link>
            </motion.div>
          </motion.div>
          <motion.div className="sap-hero__stats" variants={stagger} initial="hidden" animate="visible">
            {heroStats.map((s) => (
              <motion.div key={s.label} className="sap-stat-card" variants={prefersReduced ? fadeIn : fadeUp}>
                <span className="sap-stat-card__value">{s.value}</span>
                <span className="sap-stat-card__label">{s.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Value Props ───────────────────────────────────── */}
      <section className="sap-section shell">
        <motion.div className="sap-value-grid" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          {valueProps.map((v) => (
            <motion.div key={v.title} className="sap-value-card" variants={prefersReduced ? fadeIn : fadeUp}>
              <div className="sap-value-card__icon">{v.icon}</div>
              <h3 className="sap-value-card__title">{v.title}</h3>
              <p className="sap-value-card__body">{v.body}</p>
              <a href={v.link} className="sap-value-card__link">{v.cta} →</a>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Savings Calculator ────────────────────────────── */}
      <section className="sap-section sap-section--home-bg" id="sap-calculator">
        <div className="shell">
          <motion.div className="sap-section-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <p className="sap-eyebrow">Calculate your potential savings</p>
            <h2 className="sap-section-title">How much could you save with ITChamps?</h2>
            <p className="sap-section-sub">
              Compare your current SAP support spend against ITChamps AMS — and see what you could redirect
              toward your S/4HANA migration or digital innovation programs.
            </p>
          </motion.div>
          <SavingsCalculator />
        </div>
      </section>

      {/* ── SAP Ecosystem ─────────────────────────────────── */}
      <section className="sap-section shell">
        <motion.div className="sap-section-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <p className="sap-eyebrow">Full SAP portfolio coverage</p>
          <h2 className="sap-section-title">Extend, protect and transform your SAP ecosystem</h2>
          <p className="sap-section-sub">ITChamps consultants are certified across the full SAP product landscape — so you never need a second partner.</p>
        </motion.div>
        <motion.div className="sap-ecosystem-grid" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
          {ecosystem.map((product) => (
            <motion.div key={product} className="sap-ecosystem-chip" variants={prefersReduced ? fadeIn : fadeUp}>{product}</motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Thought Leadership ────────────────────────────── */}
      <section className="sap-section sap-section--tinted">
        <div className="shell sap-thought-inner">
          <motion.div className="sap-thought-copy" initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p className="sap-eyebrow">Your SAP, Your Future</p>
            <h2 className="sap-section-title" style={{ textAlign: "left" }}>Innovation is no longer ERP-bound</h2>
            <p style={{ fontSize: "1rem", color: "#475569", lineHeight: "1.75", marginBottom: "24px" }}>
              Enterprise transformation doesn&apos;t require ripping out your SAP system. ITChamps helps organisations
              unlock the full value of their existing SAP landscape — extending its life, optimising performance,
              and deploying targeted innovation in AI, analytics, and process automation without the cost and risk
              of full re-platforming.
            </p>
            <p style={{ fontSize: "1rem", color: "#475569", lineHeight: "1.75", marginBottom: "32px" }}>
              Our S/4HANA Readiness Checklist — used by 500+ enterprises — gives your leadership team a clear,
              structured view of your migration readiness across infrastructure, data quality, organisational
              change, and timeline planning.
            </p>
            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
              <Link href="/#readiness-checklist" className="button button--primary">Download the readiness checklist</Link>
              <Link href="/case-studies" className="button button--ghost">View case studies</Link>
            </div>
          </motion.div>
          <motion.div className="sap-thought-visual" initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.1 }}>
            <div className="sap-thought-card">
              <div className="sap-thought-card__label">Executive Resource</div>
              <h3 className="sap-thought-card__title">S/4HANA Migration Readiness Checklist</h3>
              <ul className="sap-thought-card__list">
                <li>Infrastructure &amp; system readiness</li>
                <li>Data quality &amp; master data evaluation</li>
                <li>Organisational change management</li>
                <li>Timeline &amp; resource planning</li>
                <li>Cost-benefit analysis template</li>
                <li>Custom solutions roadmap</li>
              </ul>
              <Link href="/#readiness-checklist" className="button button--primary button--compact" style={{ width: "100%", justifyContent: "center", marginTop: "8px" }}>
                Download free PDF
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Migration Playbook ────────────────────────────── */}
      <section className="sap-section shell" id="sap-playbook">
        <motion.div className="sap-section-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <p className="sap-eyebrow">The ITChamps migration methodology</p>
          <h2 className="sap-section-title">The path to S/4HANA starts here</h2>
          <p className="sap-section-sub">
            A proven 8-phase delivery framework — used on every ITChamps migration program —
            with fixed milestones, risk registers, and hypercare built in from day one.
          </p>
        </motion.div>
        <motion.div className="sap-playbook-grid" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
          {playbookSteps.map((step, i) => (
            <motion.div key={step.num} className="sap-playbook-step" variants={prefersReduced ? fadeIn : fadeUp} transition={{ delay: i * 0.05 }}>
              <span className="sap-playbook-step__num">{step.num}</span>
              <strong className="sap-playbook-step__title">{step.title}</strong>
              <p className="sap-playbook-step__desc">{step.desc}</p>
            </motion.div>
          ))}
        </motion.div>
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <Link href="#contact-sap" className="button button--primary">Explore the full playbook with an expert</Link>
        </div>
      </section>

      {/* ── Services Tabs ─────────────────────────────────── */}
      <section className="sap-section sap-section--dark" id="sap-services">
        <div className="shell">
          <motion.div className="sap-section-header sap-section-header--light" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <p className="sap-eyebrow sap-eyebrow--light">Full-spectrum SAP delivery</p>
            <h2 className="sap-section-title sap-section-title--light">Stretch the value of your SAP investment</h2>
            <p className="sap-section-sub sap-section-sub--light">
              One partner for your entire SAP lifecycle — from initial strategy to long-term managed support.
            </p>
          </motion.div>

          <div className="sap-tab-bar sap-tab-bar--dark" role="tablist" aria-label="SAP services">
            {serviceTabs.map((tab, i) => (
              <button key={tab.id} role="tab" aria-selected={activeTab === i} aria-controls={`tabpanel-${tab.id}`}
                className={`sap-tab sap-tab--dark${activeTab === i ? " sap-tab--active-dark" : ""}`}
                onClick={() => setActiveTab(i)}>
                {tab.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={activeTab} id={`tabpanel-${activeService.id}`} role="tabpanel" className="sap-tab-panel sap-tab-panel--dark"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: "easeOut" }}>
              <div className="sap-tab-panel__content">
                <div className="sap-tab-panel__text">
                  <span className="sap-tag sap-tag--light">{activeService.tag}</span>
                  <h3 className="sap-tab-panel__headline sap-tab-panel__headline--light">{activeService.headline}</h3>
                  <p className="sap-tab-panel__body sap-tab-panel__body--light">{activeService.body}</p>
                  <ul className="sap-tab-panel__bullets sap-tab-panel__bullets--light">
                    {activeService.bullets.map((b) => (
                      <li key={b}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className="sap-tab-panel__ctas">
                    <Link href={activeService.link} className="button button--primary button--compact">Full service details</Link>
                    <Link href="#contact-sap" className="button button--ghost button--compact sap-ghost-light">Speak to an expert</Link>
                  </div>
                </div>
                <div className="sap-tab-panel__visual sap-tab-panel__visual--dark">
                  <div className="sap-tab-panel__index">
                    <span className="sap-tab-panel__index-num">0{activeTab + 1}</span>
                    <span className="sap-tab-panel__index-total">/ 08</span>
                  </div>
                  <div className="sap-tab-panel__service-list">
                    {serviceTabs.map((t, i) => (
                      <button key={t.id} className={`sap-tab-panel__service-item sap-tab-panel__service-item--dark${activeTab === i ? " active" : ""}`}
                        onClick={() => setActiveTab(i)}>
                        <span className="sap-tab-panel__service-dot"/>
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

      {/* ── Webinar / Events ──────────────────────────────── */}
      <section className="sap-section shell">
        <div className="sap-webinar-banner">
          <div className="sap-webinar-banner__copy">
            <p className="sap-eyebrow">SAP expert sessions</p>
            <h2 className="sap-webinar-banner__title">Join upcoming SAP insights sessions</h2>
            <p className="sap-webinar-banner__body">
              Monthly deep-dives on S/4HANA migration strategy, AMS best practices, BTP integration patterns,
              and global payroll compliance — led by ITChamps senior consultants.
            </p>
            <Link href="/academy" className="button button--primary">View upcoming sessions</Link>
          </div>
          <div className="sap-webinar-banner__visual">
            <div className="sap-webinar-badge">
              <span className="sap-webinar-badge__label">Next session</span>
              <strong className="sap-webinar-badge__topic">S/4HANA Migration:<br/>Greenfield vs. Brownfield</strong>
              <span className="sap-webinar-badge__info">60 min · Free registration</span>
              <Link href="/academy" className="button button--primary button--compact">Register now</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials Carousel ─────────────────────────── */}
      <section className="sap-section sap-section--tinted">
        <div className="shell">
          <motion.div className="sap-section-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <p className="sap-eyebrow">Client voices</p>
            <h2 className="sap-section-title">Hear what our clients say</h2>
          </motion.div>

          <div className="sap-carousel">
            <button className="sap-carousel__arrow sap-carousel__arrow--prev" onClick={() => goSlide(-1)} aria-label="Previous testimonial">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>

            <div className="sap-carousel__track">
              <AnimatePresence mode="wait" custom={slideDir}>
                <motion.blockquote key={slide} className="sap-carousel__card"
                  custom={slideDir}
                  initial={{ opacity: 0, x: slideDir * 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: slideDir * -60 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}>
                  <svg className="sap-testimonial-card__quote-icon" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
                    <path d="M10 8C6.686 8 4 10.686 4 14v10h10V14H7c0-1.654 1.346-3 3-3V8zm18 0c-3.314 0-6 2.686-6 6v10h10V14h-7c0-1.654 1.346-3 3-3V8z"/>
                  </svg>
                  <p className="sap-testimonial-card__text">{testimonials[slide].quote}</p>
                  <footer className="sap-testimonial-card__footer">
                    <div className="sap-testimonial-card__avatar" aria-hidden="true">{testimonials[slide].initials}</div>
                    <div>
                      <strong>{testimonials[slide].name}</strong>
                      <span>{testimonials[slide].title}, {testimonials[slide].company}</span>
                    </div>
                  </footer>
                </motion.blockquote>
              </AnimatePresence>
            </div>

            <button className="sap-carousel__arrow sap-carousel__arrow--next" onClick={() => goSlide(1)} aria-label="Next testimonial">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>

            <div className="sap-carousel__dots">
              {testimonials.map((_, i) => (
                <button key={i} className={`sap-carousel__dot${slide === i ? " active" : ""}`}
                  onClick={() => { setSlideDir(i > slide ? 1 : -1); setSlide(i); }}
                  aria-label={`Go to testimonial ${i + 1}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Critical Deadlines ────────────────────────────── */}
      <section className="sap-section sap-section--dark">
        <div className="shell">
          <motion.div className="sap-section-header sap-section-header--light" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <p className="sap-eyebrow sap-eyebrow--light">Act before the deadline</p>
            <h2 className="sap-section-title sap-section-title--light">Don&apos;t miss these critical SAP deadlines</h2>
            <p className="sap-section-sub sap-section-sub--light">
              ITChamps is ready to support your current landscape and migrate you to S/4HANA before the deadline.
              Plan now — most enterprise programs take 12–18 months.
            </p>
          </motion.div>
          <div className="sap-deadline-table-wrapper">
            <table className="sap-deadline-table">
              <thead><tr><th>Product</th><th>Version / Release</th><th>End of Mainstream Maintenance</th><th>Status</th></tr></thead>
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
            <p>Not sure where your current SAP version stands? We&apos;ll assess your landscape for free.</p>
            <Link href="#contact-sap" className="button button--primary">Request free readiness assessment</Link>
          </div>
        </div>
      </section>

      {/* ── Case Studies ──────────────────────────────────── */}
      <section className="sap-section shell" id="sap-results">
        <motion.div className="sap-section-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <p className="sap-eyebrow">Proven results</p>
          <h2 className="sap-section-title">SAP programs that delivered</h2>
          <p className="sap-section-sub">Every engagement in our portfolio closed on time, within budget, and with measurable business outcomes.</p>
        </motion.div>
        <motion.div className="sap-case-grid" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
          {caseStudies.map((cs) => (
            <motion.article key={cs.slug} className="sap-case-card" variants={prefersReduced ? fadeIn : fadeUp}>
              <div className="sap-case-card__img">
                <Image src={cs.image} alt={cs.title} fill sizes="(max-width: 900px) 100vw, 33vw" style={{ objectFit: "cover" }}/>
                <span className="sap-case-card__tag">{cs.tag}</span>
              </div>
              <div className="sap-case-card__body">
                <p className="sap-case-card__result">{cs.result}</p>
                <h3 className="sap-case-card__title">{cs.title}</h3>
                <p className="sap-case-card__summary">{cs.summary}</p>
                <Link href={`/case-studies/${cs.slug}`} className="sap-case-card__link">
                  Read the full story
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>
        <div className="sap-case-grid-cta">
          <Link href="/case-studies" className="button button--ghost">Explore all 7 case studies →</Link>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────── */}
      <section className="sap-section sap-section--tinted shell" id="sap-faq">
        <motion.div className="sap-section-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <p className="sap-eyebrow">Common questions</p>
          <h2 className="sap-section-title">SAP migration &amp; support FAQ</h2>
        </motion.div>
        <div className="sap-faq">
          {[
            { q: "How long does an S/4HANA migration typically take?",
              a: "For mid-size enterprises, our accelerated playbooks deliver go-live in 6–12 months. Large, complex landscapes with global rollouts typically take 12–24 months. After an initial readiness assessment, we provide a fixed-scope, fixed-timeline proposal — no open-ended engagements." },
            { q: "What happens to my ECC system after December 2027?",
              a: "SAP's mainstream maintenance for ECC 6.0 ends December 2027. After that, you can purchase extended maintenance through 2030, but you will no longer receive new functionality, regulatory updates, or security patches under standard contracts. The safest path is migrating to S/4HANA before the deadline." },
            { q: "What is the difference between greenfield, brownfield, and hybrid migration?",
              a: "Greenfield means building a clean new S/4HANA system with optimised processes and migrating selected data. Brownfield (System Conversion) preserves your existing configuration and customisations. Hybrid (Selective Data Transition) combines both. ITChamps recommends the approach based on your process complexity, timeline, and budget." },
            { q: "What does your AMS service include?",
              a: "Our Application Management Service includes 24/7 incident monitoring and resolution, problem management with root-cause analysis, change and release governance, proactive system health checks, user support, and monthly executive reporting — all under transparent, fixed-cost contracts with severity-graded SLA commitments." },
            { q: "Can ITChamps support SAP in our specific industry?",
              a: "Yes. ITChamps has deep vertical expertise across process manufacturing, aerospace & defence, energy & utilities, retail, financial services, telecom, and professional services — with industry-specific best-practice templates to accelerate delivery and reduce configuration risk." },
            { q: "Do you handle post go-live support, or only implementations?",
              a: "We do both — and the transition is seamless. For every implementation we deliver, we offer a structured 90-day hypercare period followed by our long-term AMS program. The same team that built your system can support it, meaning no knowledge transfer gaps." },
          ].map((faq, i) => (
            <div key={i} className={`sap-faq__item${openFaq === i ? " open" : ""}`}>
              <button className="sap-faq__question" aria-expanded={openFaq === i} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <span>{faq.q}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points={openFaq === i ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}/>
                </svg>
              </button>
              <AnimatePresence initial={false}>
                {openFaq === i && (
                  <motion.div className="sap-faq__answer" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28, ease: "easeOut" }}>
                    <p>{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* ── Resources ─────────────────────────────────────── */}
      <section className="sap-section shell">
        <motion.div className="sap-section-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <p className="sap-eyebrow">Additional resources</p>
          <h2 className="sap-section-title">SAP insights from our consultants</h2>
        </motion.div>
        <motion.div className="sap-resource-grid" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
          {resources.map((r) => (
            <motion.article key={r.slug} className="sap-resource-card" variants={prefersReduced ? fadeIn : fadeUp}>
              <span className="sap-resource-card__type">{r.type}</span>
              <h3 className="sap-resource-card__title">{r.title}</h3>
              <div className="sap-resource-card__meta"><span>{r.author}</span><span>{r.readTime} read</span></div>
              <Link href={`/blogs/${r.slug}`} className="sap-resource-card__link">Read article →</Link>
            </motion.article>
          ))}
        </motion.div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────── */}
      <section className="sap-section sap-cta-section" id="contact-sap">
        <div className="shell sap-cta-inner">
          <motion.div className="sap-cta-copy" initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p className="sap-eyebrow sap-eyebrow--light">Start your SAP journey</p>
            <h2 className="sap-cta-title">Maximise your SAP investment</h2>
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
          <motion.div className="sap-cta-form-wrap" initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <SapContactForm />
          </motion.div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────── */}
      <footer className="sap-footer shell">
        <div className="sap-footer__brand">
          <Image src="/itchamps-logo.png" alt="ITChamps Software" width={140} height={44}/>
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
            <Link href="/services#cyber-security">Security &amp; GRC</Link>
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
          <Link href="#contact-sap" className="button button--primary button--compact">Talk to an SAP Expert</Link>
        </div>
      </footer>
    </main>
  );
}

// ─── Savings Calculator ──────────────────────────────────────────────────────

function SavingsCalculator() {
  const [spend, setSpend]     = useState(500000);
  const [model, setModel]     = useState("sap-standard");
  const [users, setUsers]     = useState("100-500");
  const [calculated, setCalc] = useState(false);

  const savingsRate     = model === "sap-standard" ? 0.40 : model === "sap-enterprise" ? 0.47 : 0.28;
  const annualSavings   = Math.round(spend * savingsRate);
  const threeYearSaving = annualSavings * 3;
  const migrationFund   = Math.round(threeYearSaving * 0.6);
  const tier = users === "<100" ? "AMS Essentials" : users === "100-500" ? "AMS Advanced" : "AMS Enterprise";
  const modelLabel = model === "sap-standard" ? "SAP Standard" : model === "sap-enterprise" ? "SAP Enterprise" : "in-house";

  return (
    <div className="sap-calc">
      {/* ── Left: inputs ── */}
      <div className="sap-calc__inputs">
        <div className="sap-calc__field">
          <label htmlFor="calc-spend">Current annual SAP support spend</label>
          <div className="sap-calc__input-wrap">
            <span className="sap-calc__currency">$</span>
            <input id="calc-spend" type="number" min={0} step={10000}
              value={spend} onChange={(e) => { setSpend(Number(e.target.value)); setCalc(false); }} />
          </div>
          <input type="range" min={50000} max={5000000} step={50000} value={spend}
            onChange={(e) => { setSpend(Number(e.target.value)); setCalc(false); }}
            className="sap-calc__slider" />
          <div className="sap-calc__range-labels"><span>$50K</span><span>$5M</span></div>
        </div>
        <div className="sap-calc__field">
          <label htmlFor="calc-model">Current support model</label>
          <select id="calc-model" value={model} onChange={(e) => { setModel(e.target.value); setCalc(false); }}>
            <option value="sap-standard">SAP Standard Maintenance (22%)</option>
            <option value="sap-enterprise">SAP Enterprise Support (33%)</option>
            <option value="inhouse">In-house / self-managed team</option>
          </select>
        </div>
        <div className="sap-calc__field">
          <label htmlFor="calc-users">Number of SAP users</label>
          <select id="calc-users" value={users} onChange={(e) => { setUsers(e.target.value); setCalc(false); }}>
            <option value="<100">Under 100 users</option>
            <option value="100-500">100–500 users</option>
            <option value="500-1000">500–1,000 users</option>
            <option value="1000+">1,000+ users</option>
          </select>
        </div>
        <button className="button button--primary sap-calc__btn" onClick={() => setCalc(true)}>
          Calculate my savings
        </button>
      </div>

      {/* ── Right: image → results ── */}
      <div className="sap-calc__right-col">
        <AnimatePresence mode="wait">
          {!calculated ? (
            <motion.div key="visual" className="sap-calc__visual-panel"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35 }}>
              <Image
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80&auto=format"
                alt="SAP analytics dashboard"
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
                priority
              />
              <div className="sap-calc__visual-overlay">
                <p className="sap-calc__visual-eyebrow">Typical ITChamps client outcomes</p>
                <div className="sap-calc__visual-stats">
                  <div className="sap-calc__visual-stat">
                    <strong>Up to 50%</strong>
                    <span>savings on annual SAP support fees</span>
                  </div>
                  <div className="sap-calc__visual-stat">
                    <strong>3× ROI</strong>
                    <span>on AMS investment within 24 months</span>
                  </div>
                  <div className="sap-calc__visual-stat">
                    <strong>45+ countries</strong>
                    <span>with active SAP support operations</span>
                  </div>
                </div>
                <p className="sap-calc__visual-cta">← Enter your spend to see your numbers</p>
              </div>
            </motion.div>
          ) : (
            <motion.div key="results" className="sap-calc__results"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}>
              <div className="sap-calc__result-card sap-calc__result-card--primary">
                <span className="sap-calc__result-label">Estimated annual savings</span>
                <span className="sap-calc__result-value">${annualSavings.toLocaleString()}</span>
                <span className="sap-calc__result-sub">vs. {modelLabel} support</span>
              </div>
              <div className="sap-calc__result-card">
                <span className="sap-calc__result-label">3-year total savings</span>
                <span className="sap-calc__result-value">${threeYearSaving.toLocaleString()}</span>
              </div>
              <div className="sap-calc__result-card">
                <span className="sap-calc__result-label">Available for S/4HANA migration</span>
                <span className="sap-calc__result-value">${migrationFund.toLocaleString()}</span>
              </div>
              <div className="sap-calc__result-card">
                <span className="sap-calc__result-label">Recommended service tier</span>
                <span className="sap-calc__result-value sap-calc__result-value--tier">{tier}</span>
              </div>
              <p className="sap-calc__disclaimer">
                * Based on typical ITChamps client outcomes. Actual savings vary.{" "}
                <Link href="#contact-sap">Speak to a consultant for a precise analysis.</Link>
              </p>
              <button className="sap-calc__reset" onClick={() => setCalc(false)}>
                ← Recalculate
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Contact Form ────────────────────────────────────────────────────────────

function SapContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [form, setForm]     = useState({ fullName: "", workEmail: "", company: "", serviceInterest: "", message: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, source: "sap-solutions-page" }) });
      setStatus(res.ok ? "success" : "error");
    } catch { setStatus("error"); }
  }

  if (status === "success") return (
    <div className="sap-form-success">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
      <h3>Thank you — we&apos;ll be in touch.</h3>
      <p>Expect a response from a senior SAP consultant within one business day.</p>
    </div>
  );

  return (
    <form className="sap-form" onSubmit={handleSubmit} noValidate>
      <div className="sap-form__row">
        <label className="sr-only" htmlFor="sap-name">Full name</label>
        <input id="sap-name" type="text" placeholder="Full name" required value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })}/>
        <label className="sr-only" htmlFor="sap-email">Work email</label>
        <input id="sap-email" type="email" placeholder="Work email" required value={form.workEmail} onChange={(e) => setForm({ ...form, workEmail: e.target.value })}/>
      </div>
      <label className="sr-only" htmlFor="sap-company">Company</label>
      <input id="sap-company" type="text" placeholder="Company name" required value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })}/>
      <label className="sr-only" htmlFor="sap-service">Service interest</label>
      <select id="sap-service" value={form.serviceInterest} onChange={(e) => setForm({ ...form, serviceInterest: e.target.value })}>
        <option value="">Service of interest (optional)</option>
        <option>S/4HANA Migration</option>
        <option>S/4HANA Implementation</option>
        <option>SAP Application Management (AMS)</option>
        <option>SAP BTP</option>
        <option>SAP SuccessFactors</option>
        <option>Global Payroll</option>
        <option>SAP Audit &amp; Advisory</option>
        <option>SAP Security &amp; GRC</option>
        <option>Other / Not sure yet</option>
      </select>
      <label className="sr-only" htmlFor="sap-message">Message</label>
      <textarea id="sap-message" placeholder="Tell us about your SAP landscape and goals…" required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}/>
      {status === "error" && <p className="sap-form__error">Something went wrong. Please try again.</p>}
      <button type="submit" className="button button--primary" disabled={status === "loading"}>
        {status === "loading" ? "Sending…" : "Request free assessment"}
      </button>
    </form>
  );
}
