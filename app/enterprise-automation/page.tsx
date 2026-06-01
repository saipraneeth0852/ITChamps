"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const fadeUp  = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };
const fadeIn  = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
const stagger = { visible: { transition: { staggerChildren: 0.07 } } };

const heroStats = [
  { value: "60%",  label: "Average manual effort reduction" },
  { value: "3x",   label: "Faster process cycle times" },
  { value: "99%",  label: "Process execution accuracy" },
  { value: "24/7", label: "Automated workflow availability" },
];

const valueProps = [
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    title: "Eliminate manual bottlenecks",
    body: "PEGA and Camunda-based automation replaces high-volume manual workflows with intelligent, rule-driven processes — reducing cycle times and freeing your teams for higher-value work.",
    link: "#services",
    cta: "Explore automation services",
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>,
    title: "Connect every system in your stack",
    body: "API-first integration and cross-system orchestration connecting SAP, legacy applications, cloud services, IoT devices, and document workflows into one coherent automation layer.",
    link: "#integration",
    cta: "View integration approach",
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
    title: "Real-time visibility and governance",
    body: "Process monitoring dashboards, SLA tracking, exception alerts, and audit-ready execution logs give operations teams complete visibility into every automated workflow.",
    link: "#monitoring",
    cta: "See monitoring capabilities",
  },
];

const services = [
  {
    id: "pega",
    tag: "BPM",
    title: "PEGA Automation",
    headline: "Automate complex, decision-driven enterprise workflows with PEGA.",
    body: "PEGA's BPM and case management capabilities combined with SAP integration enable high-volume, rule-based automation across customer journeys, approvals, and compliance workflows.",
    bullets: [
      "PEGA platform implementation and configuration",
      "BPM and case management design and build",
      "Customer journey and onboarding automation",
      "AI-powered decisioning rules and routing",
      "SAP and legacy system integration",
      "Robotic process automation (RPA) integration",
    ],
  },
  {
    id: "camunda",
    tag: "Orchestration",
    title: "Camunda Workflow",
    headline: "Orchestrate complex, cross-system processes with Camunda.",
    body: "Camunda-based workflow orchestration for processes spanning SAP, APIs, bots, manual tasks, and external services — with BPMN 2.0 modeling, real-time execution visibility, and microservices-ready architecture.",
    bullets: [
      "Camunda Platform 7 and 8 deployment and configuration",
      "BPMN 2.0 process modeling and governance",
      "Microservices and API orchestration design",
      "REST API and event-driven integration",
      "Process monitoring dashboards and SLA tracking",
      "Migration from legacy BPM platforms",
    ],
  },
  {
    id: "dcs",
    tag: "Document Management",
    title: "Document Content Services",
    headline: "Centralise and automate enterprise document workflows.",
    body: "End-to-end document content services integrating SAP Document Management with e-signature, OCR capture, automated routing, and compliance retention — eliminating manual handling of purchase orders, invoices, contracts, and compliance records.",
    bullets: [
      "Centralised document repository with version control",
      "Automated document workflows triggered from SAP transactions",
      "E-signature integration (DocuSign, Adobe Sign)",
      "OCR and AI invoice capture with 3-way match",
      "Compliance retention policies and audit trails",
      "Mobile document approval and review workflows",
    ],
  },
  {
    id: "iot",
    tag: "IoT",
    title: "IoT Integration",
    headline: "Connect your physical operations to your SAP digital core.",
    body: "Architecture, integration, and analytics for IoT-connected assets — linking sensors, SCADA, and smart devices to SAP for real-time operational visibility, predictive maintenance, and supply chain intelligence.",
    bullets: [
      "IoT platform architecture and device management",
      "SAP IoT and Asset Intelligence Network integration",
      "SCADA and OT network integration design",
      "Predictive maintenance and anomaly detection models",
      "Real-time analytics pipelines and dashboards",
      "Digital twin configuration and plant simulation",
    ],
  },
  {
    id: "rpa",
    tag: "RPA",
    title: "Robotic Process Automation",
    headline: "Software robots for high-volume, repetitive SAP tasks.",
    body: "Deploy attended and unattended bots across SAP GUI, web applications, and legacy systems to automate data entry, reconciliation, report generation, and inter-system data transfer with zero human error.",
    bullets: [
      "Process discovery and automation opportunity assessment",
      "Bot development and testing across SAP and non-SAP systems",
      "Attended, unattended, and hybrid RPA deployment",
      "Orchestrator configuration and bot lifecycle management",
      "Exception handling and escalation workflows",
      "ROI tracking and automation performance dashboards",
    ],
  },
];

const technologies = [
  "PEGA Platform","Camunda 7 / 8","SAP BTP Workflow","SAP Document Management",
  "SAP Integration Suite","SAP IoT","UiPath","Automation Anywhere",
  "DocuSign","Adobe Sign","Apache Kafka","Azure Logic Apps",
];

const methodology = [
  { num: "01", title: "Discovery",    desc: "Process mapping, bottleneck identification, automation opportunity scoring" },
  { num: "02", title: "Design",       desc: "Process redesign, automation architecture, integration pattern definition" },
  { num: "03", title: "Prototype",    desc: "Working prototype with key process flows and integration touchpoints" },
  { num: "04", title: "Build",        desc: "Full process development, integration build, and exception handling logic" },
  { num: "05", title: "Test",         desc: "Unit, integration, and UAT testing with business process owners" },
  { num: "06", title: "Deploy",       desc: "Controlled rollout with monitoring, alerting, and hypercare" },
  { num: "07", title: "Monitor",      desc: "Live process monitoring, SLA tracking, and continuous optimisation" },
  { num: "08", title: "Scale",        desc: "Expand automation to additional processes and integrate new systems" },
];

const faqs = [
  {
    q: "Which automation platform — PEGA or Camunda — is right for my use case?",
    a: "PEGA excels at complex, decision-intensive case management and customer journey automation, particularly in financial services, insurance, and telecom. Camunda is better suited for cross-system process orchestration, microservices environments, and developer-first architectures. ITChamps helps you choose based on your process complexity, technical landscape, and team capabilities — and we can implement either.",
  },
  {
    q: "How do you integrate automation platforms with our existing SAP system?",
    a: "We use SAP Integration Suite (CPI), REST/SOAP APIs, SAP BTP event mesh, and BAPI/RFC connectors depending on your SAP version. Our integrations are designed for real-time, event-driven data exchange and are tested for resilience, error handling, and performance under load.",
  },
  {
    q: "What processes are best suited for automation?",
    a: "The best candidates are high-volume, rule-based, repetitive processes with clear decision logic: invoice processing, purchase order approvals, employee onboarding, customer onboarding, compliance reporting, and inter-system data reconciliation. We run a structured process discovery workshop to identify and prioritize automation opportunities by ROI.",
  },
  {
    q: "Can you automate document processing end to end?",
    a: "Yes. Our document content services cover OCR extraction, AI classification, 3-way match validation, automated approval routing, e-signature integration, and compliance archiving — all triggered from SAP or standalone workflows. We handle purchase orders, invoices, contracts, and any custom document type your business uses.",
  },
  {
    q: "How do you handle exceptions in automated workflows?",
    a: "Every automation we build includes structured exception handling: clear escalation paths, human-in-the-loop intervention workflows, email/Teams/Slack notifications, and audit logs for every exception instance. Exceptions are never silently dropped — they surface to the right person with full context for resolution.",
  },
];

export default function EnterpriseAutomationPage() {
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
          <Link href="/hr-payroll">HR &amp; Payroll</Link>
          <Link href="/enterprise-automation" className="topnav__active">Automation</Link>
          <Link href="/ai">AI Solutions</Link>
          <Link href="/case-studies">Case Studies</Link>
        </nav>
        <Link href="#contact-automation" className="button button--primary button--compact topbar-cta">
          Discuss Automation
        </Link>
      </header>

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="sap-hero">
        <div className="shell sap-hero__inner">
          <motion.div className="sap-hero__copy" variants={stagger} initial="hidden" animate="visible">
            <motion.p className="sap-eyebrow" variants={prefersReduced ? fadeIn : fadeUp}>Enterprise Automation</motion.p>
            <motion.h1 className="sap-hero__title" variants={prefersReduced ? fadeIn : fadeUp}>
              Intelligent Automation<br />at Enterprise<br />Scale.
            </motion.h1>
            <motion.p className="sap-hero__sub" variants={prefersReduced ? fadeIn : fadeUp}>
              PEGA, Camunda, IoT integration, document content services, and RPA — delivering
              cross-system process automation that reduces manual effort, accelerates cycle times,
              and gives operations teams full visibility into every workflow.
            </motion.p>
            <motion.div className="sap-hero__ctas" variants={prefersReduced ? fadeIn : fadeUp}>
              <Link href="#services" className="button button--primary">Explore automation services</Link>
              <Link href="#contact-automation" className="button button--ghost">Request a consultation</Link>
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

      {/* ── Automation Flow ───────────────────────────────── */}
      <section className="sap-section sap-section--tinted shell" id="integration">
        <motion.div className="sap-section-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <p className="sap-eyebrow">End-to-end automation architecture</p>
          <h2 className="sap-section-title">Connect, orchestrate, and automate across your entire stack</h2>
          <p className="sap-section-sub">From IoT sensors through to ERP, document management, and reporting — every layer of your enterprise connected through a unified automation layer.</p>
        </motion.div>
        <motion.div
          className="auto-flow-strip"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", justifyContent: "center", marginTop: "40px" }}
        >
          {[
            { label: "Business Process", color: "var(--blue)" },
            { label: "PEGA / Camunda", color: "var(--gold)" },
            { label: "SAP Core", color: "var(--blue)" },
            { label: "IoT / DCS", color: "var(--gold)" },
            { label: "Document Layer", color: "var(--blue)" },
            { label: "Analytics & Reporting", color: "var(--gold)" },
          ].map((node, i, arr) => (
            <motion.div key={node.label} style={{ display: "flex", alignItems: "center", gap: "8px" }} variants={prefersReduced ? fadeIn : fadeUp}>
              <div style={{
                padding: "10px 18px", borderRadius: "8px", fontSize: "0.8rem", fontWeight: 600,
                background: `${node.color}18`, border: `1px solid ${node.color}40`, color: node.color,
                whiteSpace: "nowrap",
              }}>{node.label}</div>
              {i < arr.length - 1 && (
                <svg width="20" height="12" viewBox="0 0 20 12" fill="none" aria-hidden="true">
                  <path d="M0 6h16M12 1l7 5-7 5" stroke="rgba(148,163,184,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Services Tabs ─────────────────────────────────── */}
      <section className="sap-section sap-section--dark" id="services">
        <div className="shell">
          <motion.div className="sap-section-header sap-section-header--light" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <p className="sap-eyebrow sap-eyebrow--light">Full-spectrum automation delivery</p>
            <h2 className="sap-section-title sap-section-title--light">Every automation capability your enterprise needs</h2>
            <p className="sap-section-sub sap-section-sub--light">
              PEGA, Camunda, document services, IoT, and RPA — integrated, governed, and delivered end to end.
            </p>
          </motion.div>

          <div className="sap-tab-bar sap-tab-bar--dark" role="tablist" aria-label="Automation services">
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
                    <Link href="#contact-automation" className="button button--primary button--compact">Request this service</Link>
                    <Link href="#contact-automation" className="button button--ghost button--compact sap-ghost-light">Speak to an expert</Link>
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

      {/* ── Technology Stack ──────────────────────────────── */}
      <section className="sap-section shell">
        <motion.div className="sap-section-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <p className="sap-eyebrow">Technology platforms</p>
          <h2 className="sap-section-title">The automation stack we master</h2>
          <p className="sap-section-sub">Certified across leading BPM, orchestration, RPA, and integration platforms to deliver automation that fits your existing environment.</p>
        </motion.div>
        <motion.div className="sap-ecosystem-grid" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
          {technologies.map((tech) => (
            <motion.div key={tech} className="sap-ecosystem-chip" variants={prefersReduced ? fadeIn : fadeUp}>{tech}</motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Delivery Methodology ──────────────────────────── */}
      <section className="sap-section shell" id="methodology">
        <motion.div className="sap-section-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <p className="sap-eyebrow">The ITChamps automation delivery framework</p>
          <h2 className="sap-section-title">From process discovery to scaled operations</h2>
          <p className="sap-section-sub">
            A structured 8-phase methodology from initial process discovery through live monitoring and continuous expansion — every automation engagement follows this proven framework.
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
          <Link href="#contact-automation" className="button button--primary">Start your automation journey</Link>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────── */}
      <section className="sap-section sap-section--tinted shell" id="faq">
        <motion.div className="sap-section-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <p className="sap-eyebrow">Common questions</p>
          <h2 className="sap-section-title">Enterprise automation FAQ</h2>
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
      <section className="sap-section sap-cta-section" id="contact-automation">
        <div className="shell sap-cta-inner">
          <motion.div className="sap-cta-copy" initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p className="sap-eyebrow sap-eyebrow--light">Start your automation program</p>
            <h2 className="sap-cta-title">Identify your highest-impact automation opportunities</h2>
            <p className="sap-cta-body">
              Tell us about the processes slowing your operations down. Our automation specialists
              will assess your landscape and propose a prioritized automation roadmap.
            </p>
            <ul className="sap-cta-checklist">
              <li>Free process discovery workshop</li>
              <li>Dedicated automation consultant — no sales handoffs</li>
              <li>Response within 1 business day</li>
              <li>No obligation, no pressure</li>
            </ul>
          </motion.div>
          <motion.div className="sap-cta-form-wrap" initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <AutomationContactForm />
          </motion.div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────── */}
      <footer className="footer-section">
        <div className="shell">
          <div className="footer-section__top">
            <div className="footer-section__brand">
              <Image src="/itchamps-logo.png" alt="ITChamps Software logo" width={168} height={54} className="footer-logo" />
              <p>PEGA, Camunda, IoT, and document automation services for enterprises seeking intelligent process orchestration at scale.</p>
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

function AutomationContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [form, setForm] = useState({ fullName: "", workEmail: "", company: "", serviceInterest: "", message: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, source: "enterprise-automation-page" }) });
      setStatus(res.ok ? "success" : "error");
    } catch { setStatus("error"); }
  }

  if (status === "success") return (
    <div className="sap-form-success">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
      <h3>Thank you — we&apos;ll be in touch.</h3>
      <p>Expect a response from an automation specialist within one business day.</p>
    </div>
  );

  return (
    <form className="sap-form" onSubmit={handleSubmit} noValidate>
      <div className="sap-form__row">
        <label className="sr-only" htmlFor="auto-name">Full name</label>
        <input id="auto-name" type="text" placeholder="Full name" required value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })}/>
        <label className="sr-only" htmlFor="auto-email">Work email</label>
        <input id="auto-email" type="email" placeholder="Work email" required value={form.workEmail} onChange={(e) => setForm({ ...form, workEmail: e.target.value })}/>
      </div>
      <label className="sr-only" htmlFor="auto-company">Company</label>
      <input id="auto-company" type="text" placeholder="Company name" required value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })}/>
      <label className="sr-only" htmlFor="auto-service">Service interest</label>
      <select id="auto-service" value={form.serviceInterest} onChange={(e) => setForm({ ...form, serviceInterest: e.target.value })}>
        <option value="">Service of interest (optional)</option>
        <option>PEGA Automation</option>
        <option>Camunda Workflow</option>
        <option>Document Content Services</option>
        <option>IoT Integration</option>
        <option>Robotic Process Automation (RPA)</option>
        <option>Other / Not sure yet</option>
      </select>
      <label className="sr-only" htmlFor="auto-message">Message</label>
      <textarea id="auto-message" placeholder="Tell us about the processes you want to automate…" required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}/>
      {status === "error" && <p className="sap-form__error">Something went wrong. Please try again.</p>}
      <button type="submit" className="button button--primary" disabled={status === "loading"}>
        {status === "loading" ? "Sending…" : "Request automation consultation"}
      </button>
    </form>
  );
}
