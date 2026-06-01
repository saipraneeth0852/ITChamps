"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const fadeUp  = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };
const fadeIn  = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
const stagger = { visible: { transition: { staggerChildren: 0.07 } } };

const heroStats = [
  { value: "45+",   label: "Countries with active payroll" },
  { value: "99.9%", label: "Payroll accuracy rate" },
  { value: "98%",   label: "On-time payroll delivery" },
  { value: "0",     label: "Compliance gaps ever recorded" },
];

const valueProps = [
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
    title: "Global payroll without compliance risk",
    body: "Statutory-compliant payroll across 45+ countries with real-time regulatory updates, multi-currency support, and audit-ready controls built into every cycle.",
    link: "#services",
    cta: "Explore payroll services",
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    title: "HXM transformation that sticks",
    body: "SuccessFactors implementations designed for adoption, compliance, and measurable talent outcomes — integrated with your payroll, ERP, and local HR realities.",
    link: "#hr-systems",
    cta: "View HR services",
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
    title: "Self-service that reduces HR burden",
    body: "Mobile-ready ESS and MSS portals that put payslips, leave management, and approval workflows directly in the hands of employees and managers.",
    link: "#self-service",
    cta: "See ESS/MSS portals",
  },
];

const services = [
  {
    id: "successfactors",
    tag: "People Systems",
    title: "SAP SuccessFactors",
    headline: "HXM transformation that integrates with your full SAP landscape.",
    body: "SuccessFactors only delivers value when it connects to payroll, ERP, and local HR realities. ITChamps delivers phased HXM rollouts with strong adoption rates and measurable talent outcomes.",
    bullets: [
      "Employee Central, talent, learning, and performance modules",
      "API-led integration with ECC, S/4HANA, and third-party HR systems",
      "Multi-country compliance and localisation support",
      "Phased rollout with adoption measurement at each stage",
      "Change management, training design, and super-user programs",
      "Ongoing optimisation and post go-live support",
    ],
  },
  {
    id: "global-payroll",
    tag: "Payroll",
    title: "Global Payroll Operations",
    headline: "Compliant, on-time payroll across 45+ jurisdictions.",
    body: "Managing payroll across multiple countries means managing risk, regulation, and operational complexity. ITChamps delivers statutory-compliant payroll programs with real-time regulatory updates and a 99.9% accuracy record.",
    bullets: [
      "Multi-country payroll across monthly, bi-weekly, and custom cycles",
      "Real-time statutory and tax compliance handling",
      "Localised language, currency, and reporting support",
      "Integration with SuccessFactors, time, benefits, and finance",
      "Audit-ready controls and regulatory reporting",
      "End-to-end managed payroll outsourcing option",
    ],
  },
  {
    id: "ess-mss",
    tag: "Self-Service",
    title: "ESS & MSS Portals",
    headline: "Give employees and managers the control they expect.",
    body: "Reduce HR's operational burden with mobile-ready self-service portals for employees and managers — tightly integrated with payroll, HR core, and approval workflows across any device.",
    bullets: [
      "Leave and attendance self-service with manager approvals",
      "Payslip, tax document, and benefits portal",
      "Personal data update and document upload flows",
      "Manager dashboard: team approvals, headcount, reports",
      "Mobile-first responsive UI across iOS and Android",
      "Integration with SAP HCM, SuccessFactors, and third-party HRMS",
    ],
  },
  {
    id: "payroll-outsourcing",
    tag: "Managed Service",
    title: "Payroll Outsourcing",
    headline: "Full payroll ownership so your HR team can focus on people.",
    body: "End-to-end payroll managed service covering processing, compliance, regulatory filings, year-end reporting, and 24/7 query resolution — so internal HR teams can focus on higher-value strategic work.",
    bullets: [
      "End-to-end payroll processing and reconciliation",
      "Statutory compliance filings and tax processing",
      "Year-end reporting and Form 16 / W-2 generation",
      "Payroll analytics, cost center reporting, and dashboards",
      "24/7 employee payroll query resolution",
      "SLA-backed delivery with full audit trail",
    ],
  },
  {
    id: "hcm",
    tag: "Core HR",
    title: "SAP HCM Implementation",
    headline: "Robust on-premise HR and payroll for complex global organizations.",
    body: "Full SAP HCM implementations covering personnel administration, organizational management, time and attendance, and payroll — built for enterprises with complex HR structures and statutory requirements.",
    bullets: [
      "Personnel administration and organisational management",
      "Time management: shift patterns, leaves, and attendance",
      "SAP Payroll implementation across multiple country versions",
      "Benefits management and integration with finance",
      "ESS/MSS portal development and integration",
      "HCM to SuccessFactors hybrid architecture support",
    ],
  },
];

const coverage = [
  "India","United Kingdom","Germany","United States","United Arab Emirates",
  "Singapore","Australia","Canada","France","Netherlands","Switzerland",
  "South Africa","Malaysia","Philippines","Japan","Saudi Arabia","+22 more",
];

const methodology = [
  { num: "01", title: "Discovery",       desc: "HR and payroll landscape assessment, regulatory mapping, integration review" },
  { num: "02", title: "Design",          desc: "Process blueprinting, configuration design, compliance framework definition" },
  { num: "03", title: "Build",           desc: "System configuration, integration development, statutory setup by country" },
  { num: "04", title: "Parallel Run",    desc: "Dual processing, variance analysis, and reconciliation validation" },
  { num: "05", title: "UAT",             desc: "User acceptance testing, compliance validation, and stakeholder sign-off" },
  { num: "06", title: "Go-Live",         desc: "Controlled cutover with dedicated hypercare team on standby" },
  { num: "07", title: "Stabilise",       desc: "90-day post go-live support, optimisation, and knowledge transfer" },
  { num: "08", title: "Operate",         desc: "Ongoing managed service, regulatory updates, and continuous improvement" },
];

const faqs = [
  {
    q: "How do you manage payroll compliance across multiple countries simultaneously?",
    a: "ITChamps uses a combination of in-country compliance specialists, real-time regulatory monitoring tools, and structured update protocols to ensure every payroll run reflects current statutory requirements. Our compliance library spans 45+ countries and is updated continuously as tax laws, contribution rates, and reporting requirements change.",
  },
  {
    q: "Can you integrate SuccessFactors with our existing SAP ECC or S/4HANA system?",
    a: "Yes. Hybrid integration between SuccessFactors and SAP ECC or S/4HANA is one of our core competencies. We use standard integration packages (SAP Integration Center, middleware) supplemented by custom API connectors where needed to ensure real-time data consistency between HR and payroll.",
  },
  {
    q: "What does the payroll parallel run process involve?",
    a: "A parallel run involves processing payroll simultaneously on both the existing and new systems for one or more pay cycles, then comparing outputs in detail. We analyse every variance, trace it to root cause, and resolve it before go-live. This is mandatory on all our payroll implementations to guarantee accuracy at cutover.",
  },
  {
    q: "How long does a global payroll implementation typically take?",
    a: "A single-country payroll implementation typically takes 3–6 months. Multi-country programs are phased by geography or payroll complexity and typically run 9–18 months. We provide a detailed country-by-country phasing plan after the initial discovery session.",
  },
  {
    q: "Do you offer ongoing payroll managed services after go-live?",
    a: "Yes. After implementation, we offer a fully managed payroll outsourcing service covering processing, statutory filings, year-end reporting, and 24/7 employee query handling under a fixed-cost SLA. Many of our clients transition to this model after go-live stabilization.",
  },
];

export default function HrPayrollPage() {
  const prefersReduced = useReducedMotion();
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="sap-page">

      {/* ── Navbar ────────────────────────────────────────── */}
      <header className="topbar shell">
        <Link href="/" className="brand brand--logo" aria-label="ITChamps Software homepage">
          <Image src="/itchamps-logo.png" alt="ITChamps Software" width={176} height={56} priority />
        </Link>
        <nav className="topnav" aria-label="Primary">
          <Link href="/">Home</Link>
          <Link href="/sap-solutions">SAP Solutions</Link>
          <Link href="/cyber-security">Cyber Security</Link>
          <Link href="/hr-payroll" className="topnav__active">HR &amp; Payroll</Link>
          <Link href="/enterprise-automation">Automation</Link>
          <Link href="/ai">AI Solutions</Link>
          <Link href="/case-studies">Case Studies</Link>
        </nav>
        <Link href="#contact-hr" className="button button--primary button--compact topbar-cta">
          Talk to an HR Expert
        </Link>
      </header>

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="sap-hero">
        <div className="shell sap-hero__inner">
          <motion.div className="sap-hero__copy" variants={stagger} initial="hidden" animate="visible">
            <motion.p className="sap-eyebrow" variants={prefersReduced ? fadeIn : fadeUp}>Global HR &amp; Payroll</motion.p>
            <motion.h1 className="sap-hero__title" variants={prefersReduced ? fadeIn : fadeUp}>
              HR Transformation<br />and Payroll Precision<br />at Global Scale.
            </motion.h1>
            <motion.p className="sap-hero__sub" variants={prefersReduced ? fadeIn : fadeUp}>
              SuccessFactors HXM, global payroll across 45+ countries, ESS/MSS portals,
              and managed payroll outsourcing — delivered with statutory compliance built
              in and 99.9% accuracy guaranteed across every pay cycle.
            </motion.p>
            <motion.div className="sap-hero__ctas" variants={prefersReduced ? fadeIn : fadeUp}>
              <Link href="#services" className="button button--primary">Explore HR &amp; payroll services</Link>
              <Link href="#contact-hr" className="button button--ghost">Request a consultation</Link>
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

      {/* ── Global Coverage ───────────────────────────────── */}
      <section className="sap-section sap-section--tinted shell" id="coverage">
        <motion.div className="sap-section-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <p className="sap-eyebrow">Global payroll coverage</p>
          <h2 className="sap-section-title">Compliant payroll in 45+ countries</h2>
          <p className="sap-section-sub">Real-time statutory compliance, localised reporting, and regulatory update management across every jurisdiction we operate in.</p>
        </motion.div>
        <motion.div className="sap-ecosystem-grid" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
          {coverage.map((country) => (
            <motion.div key={country} className="sap-ecosystem-chip" variants={prefersReduced ? fadeIn : fadeUp}>{country}</motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Services Tabs ─────────────────────────────────── */}
      <section className="sap-section sap-section--dark" id="services">
        <div className="shell">
          <motion.div className="sap-section-header sap-section-header--light" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <p className="sap-eyebrow sap-eyebrow--light">Full-spectrum HR &amp; payroll delivery</p>
            <h2 className="sap-section-title sap-section-title--light">Every HR and payroll need under one roof</h2>
            <p className="sap-section-sub sap-section-sub--light">
              From HXM transformation and compliance-first payroll through self-service portals and managed outsourcing — one accountable team.
            </p>
          </motion.div>

          <div className="sap-tab-bar sap-tab-bar--dark" role="tablist" aria-label="HR and payroll services">
            {services.map((svc, i) => (
              <button key={svc.id} role="tab" aria-selected={activeTab === i}
                className={`sap-tab sap-tab--dark${activeTab === i ? " sap-tab--active-dark" : ""}`}
                onClick={() => setActiveTab(i)}>
                {svc.title}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={activeTab} role="tabpanel" className="sap-tab-panel sap-tab-panel--dark"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: "easeOut" }}>
              <div className="sap-tab-panel__content">
                <div className="sap-tab-panel__text">
                  <span className="sap-tag sap-tag--light">{services[activeTab].tag}</span>
                  <h3 className="sap-tab-panel__headline sap-tab-panel__headline--light">{services[activeTab].headline}</h3>
                  <p className="sap-tab-panel__body sap-tab-panel__body--light">{services[activeTab].body}</p>
                  <ul className="sap-tab-panel__bullets sap-tab-panel__bullets--light">
                    {services[activeTab].bullets.map((b) => (
                      <li key={b}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className="sap-tab-panel__ctas">
                    <Link href="#contact-hr" className="button button--primary button--compact">Request this service</Link>
                    <Link href="#contact-hr" className="button button--ghost button--compact sap-ghost-light">Speak to an expert</Link>
                  </div>
                </div>
                <div className="sap-tab-panel__visual sap-tab-panel__visual--dark">
                  <div className="sap-tab-panel__index">
                    <span className="sap-tab-panel__index-num">0{activeTab + 1}</span>
                    <span className="sap-tab-panel__index-total">/ 05</span>
                  </div>
                  <div className="sap-tab-panel__service-list">
                    {services.map((t, i) => (
                      <button key={t.id} className={`sap-tab-panel__service-item sap-tab-panel__service-item--dark${activeTab === i ? " active" : ""}`}
                        onClick={() => setActiveTab(i)}>
                        <span className="sap-tab-panel__service-dot"/>
                        {t.title}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── Payroll Methodology ───────────────────────────── */}
      <section className="sap-section shell" id="methodology">
        <motion.div className="sap-section-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <p className="sap-eyebrow">The ITChamps HR &amp; payroll delivery model</p>
          <h2 className="sap-section-title">An 8-phase implementation framework</h2>
          <p className="sap-section-sub">
            From initial HR landscape assessment through go-live and ongoing managed service — structured delivery with compliance validation built into every phase.
          </p>
        </motion.div>
        <motion.div className="sap-playbook-grid" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
          {methodology.map((step, i) => (
            <motion.div key={step.num} className="sap-playbook-step" variants={prefersReduced ? fadeIn : fadeUp} transition={{ delay: i * 0.05 }}>
              <span className="sap-playbook-step__num">{step.num}</span>
              <strong className="sap-playbook-step__title">{step.title}</strong>
              <p className="sap-playbook-step__desc">{step.desc}</p>
            </motion.div>
          ))}
        </motion.div>
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <Link href="#contact-hr" className="button button--primary">Discuss your HR &amp; payroll requirements</Link>
        </div>
      </section>

      {/* ── Why Section ───────────────────────────────────── */}
      <section className="sap-section sap-section--tinted">
        <div className="shell sap-thought-inner">
          <motion.div className="sap-thought-copy" initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p className="sap-eyebrow">Why global HR needs a specialist partner</p>
            <h2 className="sap-section-title" style={{ textAlign: "left" }}>Payroll complexity compounds with every country you add</h2>
            <p style={{ fontSize: "1rem", color: "#475569", lineHeight: "1.75", marginBottom: "24px" }}>
              Every new country adds statutory requirements, tax cycles, contribution rules, and reporting mandates
              that shift constantly. Managing this with generic payroll tools or fragmented local providers creates
              compliance exposure, reconciliation delays, and audit risk at scale.
            </p>
            <p style={{ fontSize: "1rem", color: "#475569", lineHeight: "1.75", marginBottom: "32px" }}>
              ITChamps delivers a single integrated payroll operating model across all your countries — unified
              governance, standardized processes, and a single accountability chain from payroll operations
              through statutory filing and executive reporting.
            </p>
            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
              <Link href="#contact-hr" className="button button--primary">Speak to a payroll consultant</Link>
              <Link href="/case-studies" className="button button--ghost">View payroll case studies</Link>
            </div>
          </motion.div>
          <motion.div className="sap-thought-visual" initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.1 }}>
            <div className="sap-thought-card">
              <div className="sap-thought-card__label">Proven Results</div>
              <h3 className="sap-thought-card__title">Global Payroll for 45+ Countries, Zero Compliance Gaps</h3>
              <ul className="sap-thought-card__list">
                <li>99.9% payroll accuracy across all countries</li>
                <li>98% on-time payroll delivery rate</li>
                <li>Zero statutory compliance violations</li>
                <li>Single delivery team across all jurisdictions</li>
                <li>Real-time regulatory update integration</li>
                <li>Audit-ready documentation and controls</li>
              </ul>
              <Link href="/case-studies/global-payroll-45-countries" className="button button--primary button--compact" style={{ width: "100%", justifyContent: "center", marginTop: "8px" }}>
                Read the case study
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────── */}
      <section className="sap-section shell" id="faq">
        <motion.div className="sap-section-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <p className="sap-eyebrow">Common questions</p>
          <h2 className="sap-section-title">HR &amp; payroll FAQ</h2>
        </motion.div>
        <div className="sap-faq">
          {faqs.map((faq, i) => (
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

      {/* ── Final CTA ─────────────────────────────────────── */}
      <section className="sap-section sap-cta-section" id="contact-hr">
        <div className="shell sap-cta-inner">
          <motion.div className="sap-cta-copy" initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p className="sap-eyebrow sap-eyebrow--light">Start your HR &amp; payroll transformation</p>
            <h2 className="sap-cta-title">Define your global HR and payroll roadmap</h2>
            <p className="sap-cta-body">
              Tell us about your HR landscape, payroll countries, and compliance challenges.
              Our consultants will review your situation and respond with a tailored approach.
            </p>
            <ul className="sap-cta-checklist">
              <li>Free initial HR landscape assessment</li>
              <li>Dedicated HR/payroll consultant — no sales handoffs</li>
              <li>Response within 1 business day</li>
              <li>No obligation, no pressure</li>
            </ul>
          </motion.div>
          <motion.div className="sap-cta-form-wrap" initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <HrContactForm />
          </motion.div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────── */}
      <footer className="footer-section">
        <div className="shell">
          <div className="footer-section__top">
            <div className="footer-section__brand">
              <Image src="/itchamps-logo.png" alt="ITChamps Software logo" width={168} height={54} className="footer-logo" />
              <p>Global HR transformation, SuccessFactors, and payroll compliance services for enterprises operating across 45+ countries.</p>
            </div>
            <div className="footer-section__links">
              <div>
                <h3>Services</h3>
                <Link href="/sap-solutions">SAP Solutions</Link>
                <Link href="/cyber-security">Cyber Security</Link>
                <Link href="/hr-payroll">HR &amp; Payroll</Link>
                <Link href="/enterprise-automation">Automation</Link>
                <Link href="/ai">AI Solutions</Link>
              </div>
              <div>
                <h3>Resources</h3>
                <Link href="/case-studies">Case Studies</Link>
                <Link href="/blogs">Blog</Link>
                <Link href="/academy">Academy</Link>
              </div>
              <div>
                <h3>Connect</h3>
                <a href="mailto:info@itchamps.com">info@itchamps.com</a>
                <a href="tel:+919342122665">+91 93421 22665</a>
                <span>Mysuru • Bengaluru • Mumbai • London</span>
                <div className="footer-social">
                  <a href="https://www.linkedin.com/company/itchamps-software-pvt-ltd/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="footer-social__link">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-section__bottom">
            <p>© {new Date().getFullYear()} ITChamps Software. All rights reserved.</p>
            <div className="footer-section__legal">
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

function HrContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [form, setForm] = useState({ fullName: "", workEmail: "", company: "", serviceInterest: "", message: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, source: "hr-payroll-page" }) });
      setStatus(res.ok ? "success" : "error");
    } catch { setStatus("error"); }
  }

  if (status === "success") return (
    <div className="sap-form-success">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
      <h3>Thank you — we&apos;ll be in touch.</h3>
      <p>Expect a response from an HR &amp; payroll specialist within one business day.</p>
    </div>
  );

  return (
    <form className="sap-form" onSubmit={handleSubmit} noValidate>
      <div className="sap-form__row">
        <label className="sr-only" htmlFor="hr-name">Full name</label>
        <input id="hr-name" type="text" placeholder="Full name" required value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })}/>
        <label className="sr-only" htmlFor="hr-email">Work email</label>
        <input id="hr-email" type="email" placeholder="Work email" required value={form.workEmail} onChange={(e) => setForm({ ...form, workEmail: e.target.value })}/>
      </div>
      <label className="sr-only" htmlFor="hr-company">Company</label>
      <input id="hr-company" type="text" placeholder="Company name" required value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })}/>
      <label className="sr-only" htmlFor="hr-service">Service interest</label>
      <select id="hr-service" value={form.serviceInterest} onChange={(e) => setForm({ ...form, serviceInterest: e.target.value })}>
        <option value="">Service of interest (optional)</option>
        <option>SAP SuccessFactors</option>
        <option>Global Payroll Operations</option>
        <option>ESS &amp; MSS Portals</option>
        <option>Payroll Outsourcing</option>
        <option>SAP HCM Implementation</option>
        <option>Other / Not sure yet</option>
      </select>
      <label className="sr-only" htmlFor="hr-message">Message</label>
      <textarea id="hr-message" placeholder="Tell us about your HR landscape, countries, and payroll challenges…" required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}/>
      {status === "error" && <p className="sap-form__error">Something went wrong. Please try again.</p>}
      <button type="submit" className="button button--primary" disabled={status === "loading"}>
        {status === "loading" ? "Sending…" : "Request HR consultation"}
      </button>
    </form>
  );
}
