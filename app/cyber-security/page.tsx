"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const fadeUp  = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };
const fadeIn  = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
const stagger = { visible: { transition: { staggerChildren: 0.07 } } };

const heroStats = [
  { value: "500+", label: "Security assessments delivered" },
  { value: "99%",  label: "Threat detection coverage" },
  { value: "45+",  label: "Countries compliance coverage" },
  { value: "24/7", label: "Active security monitoring" },
];

const valueProps = [
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>,
    title: "Protect your SAP landscape",
    body: "Comprehensive security assessments, vulnerability testing, and GRC configuration to safeguard mission-critical SAP environments against evolving threats.",
    link: "#services",
    cta: "View security services",
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
    title: "Stay audit-ready always",
    body: "Segregation of duties reviews, user access governance, and automated compliance controls ensure your SAP environment meets regulatory and audit requirements continuously.",
    link: "#grc",
    cta: "Explore GRC services",
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
    title: "Rapid incident response",
    body: "Round-the-clock security monitoring with severity-graded response protocols, forensic analysis, and executive-ready incident reporting keeps disruption minimal.",
    link: "#monitoring",
    cta: "Learn about monitoring",
  },
];

const services = [
  {
    id: "security-assessment",
    tag: "Assessment",
    title: "SAP Security Landscape Assessment",
    headline: "Know exactly where your vulnerabilities lie before attackers do.",
    body: "A structured end-to-end review of your SAP environment covering configuration weaknesses, user access risks, transport layer exposure, and interface security gaps — producing a prioritized remediation roadmap.",
    bullets: [
      "Full SAP basis and application security review",
      "Configuration gap analysis against SAP hardening guides",
      "Transport and RFC landscape risk assessment",
      "Custom object and authorization audit",
      "Executive-level risk report with prioritized findings",
      "Remediation roadmap with effort and impact scoring",
    ],
  },
  {
    id: "vapt",
    tag: "VAPT",
    title: "Vulnerability Assessment & Penetration Testing",
    headline: "Test your defences before adversaries do.",
    body: "Manual and automated penetration testing across your SAP systems, interfaces, and connected enterprise applications — simulating real-world attack vectors to expose exploitable weaknesses.",
    bullets: [
      "Black-box, grey-box, and white-box testing approaches",
      "Network, application, and API penetration testing",
      "SAP-specific attack simulation (ABAP injection, RFC exploitation)",
      "Social engineering and phishing simulation assessments",
      "CVE-mapped findings with CVSS severity scoring",
      "Detailed remediation guidance and retesting validation",
    ],
  },
  {
    id: "grc",
    tag: "GRC",
    title: "GRC & Segregation of Duties",
    headline: "Governance, risk, and compliance built into your SAP core.",
    body: "SAP GRC Access Control and Process Control implementation covering role design, SoD conflict resolution, risk mitigation controls, and continuous compliance monitoring.",
    bullets: [
      "SAP GRC Access Control configuration and rollout",
      "Role and authorization redesign and simplification",
      "SoD conflict matrix definition and remediation",
      "Risk mitigation control design and implementation",
      "Automated access request workflows and approvals",
      "Periodic access review and recertification programs",
    ],
  },
  {
    id: "iam",
    tag: "Identity",
    title: "User Access Management & Governance",
    headline: "The right people with the right access — nothing more.",
    body: "End-to-end identity governance programs covering access provisioning, periodic reviews, privileged access management, and role lifecycle automation across your SAP landscape.",
    bullets: [
      "Role-based access control (RBAC) design and implementation",
      "Privileged access management (PAM) controls",
      "Joiner-mover-leaver workflow automation",
      "Firefighter and emergency access management",
      "User access review and recertification programs",
      "Integration with Active Directory and identity providers",
    ],
  },
  {
    id: "monitoring",
    tag: "Monitoring",
    title: "Security Monitoring & Alerting",
    headline: "Continuous visibility across your SAP security posture.",
    body: "Real-time security event monitoring, anomaly detection, and alerting dashboards that surface threat indicators before they become incidents — with SIEM integration support.",
    bullets: [
      "SAP Enterprise Threat Detection (ETD) implementation",
      "Custom alert rules for business-critical processes",
      "SIEM integration (Splunk, Azure Sentinel, IBM QRadar)",
      "Behavioral analytics and anomaly detection",
      "Executive security dashboards and reporting",
      "Monthly threat landscape briefings and trend analysis",
    ],
  },
  {
    id: "ehs",
    tag: "EHS",
    title: "EHS Compliance",
    headline: "Environment, health, and safety compliance embedded in SAP.",
    body: "Implement and operate SAP EHS capabilities for incident management, environmental reporting, regulatory tracking, and multi-region safety compliance across complex industrial environments.",
    bullets: [
      "SAP EHS module implementation and configuration",
      "Incident and near-miss management workflows",
      "Regulatory compliance tracking and audit readiness",
      "Waste, emissions, and environmental reporting",
      "Safety training record management",
      "Multi-region compliance localization support",
    ],
  },
];

const methodology = [
  { num: "01", title: "Scoping",       desc: "Define assessment scope, objectives, and critical asset inventory" },
  { num: "02", title: "Discovery",     desc: "Automated scanning and manual reconnaissance of the security landscape" },
  { num: "03", title: "Testing",       desc: "Vulnerability assessment and penetration testing across defined scope" },
  { num: "04", title: "Analysis",      desc: "Risk scoring, exploit validation, and business impact assessment" },
  { num: "05", title: "Reporting",     desc: "Executive summary and technical findings with CVSS severity mapping" },
  { num: "06", title: "Remediation",   desc: "Prioritized fix guidance and support through remediation cycles" },
  { num: "07", title: "Validation",    desc: "Retest to confirm remediation effectiveness and closure" },
  { num: "08", title: "Governance",    desc: "Ongoing security posture management and periodic review cadence" },
];

const capabilities = [
  "SAP Security Hardening","SAP GRC Access Control","SAP GRC Process Control",
  "SAP Enterprise Threat Detection","VAPT & Red Team Testing","Identity Governance",
  "SoD Conflict Resolution","Role & Authorization Design","Security Monitoring (SIEM)",
  "SAP EHS Compliance","Privileged Access Management","Audit Readiness Programs",
];

const faqs = [
  {
    q: "How long does a SAP security assessment typically take?",
    a: "A comprehensive SAP security landscape assessment typically takes 2–4 weeks depending on system complexity, number of landscapes, and scope. We provide a clear scoping document upfront with a fixed timeline and deliverable set.",
  },
  {
    q: "What is the difference between a vulnerability assessment and penetration testing?",
    a: "A vulnerability assessment identifies and classifies weaknesses in your environment using automated scanning and manual review. Penetration testing goes further — it actively attempts to exploit those weaknesses to demonstrate real-world impact. Both are valuable; we often recommend them in combination for a complete security picture.",
  },
  {
    q: "Do you support SAP GRC Access Control implementation from scratch?",
    a: "Yes. We deliver end-to-end GRC Access Control implementations including system configuration, SoD ruleset definition, role redesign, workflow setup, and user training. We also support upgrades, optimization, and managed GRC services for existing implementations.",
  },
  {
    q: "How do you handle compliance requirements across multiple countries?",
    a: "ITChamps has deep multi-jurisdiction experience across GDPR, SOX, HIPAA, PDPA, and regional regulatory frameworks. Our security and GRC programs are designed with multi-country compliance from day one, including localized controls, audit-ready documentation, and regulatory reporting support.",
  },
  {
    q: "Can you integrate SAP security monitoring with our existing SIEM?",
    a: "Absolutely. We integrate SAP Enterprise Threat Detection (ETD) and custom log feeds with leading SIEM platforms including Splunk, Microsoft Sentinel, IBM QRadar, and others. The integration is designed to give your SOC team meaningful, SAP-contextualized alerts without noise.",
  },
];

export default function CyberSecurityPage() {
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
          <Link href="/cyber-security" className="topnav__active">Cyber Security</Link>
          <Link href="/hr-payroll">HR &amp; Payroll</Link>
          <Link href="/enterprise-automation">Automation</Link>
          <Link href="/ai">AI Solutions</Link>
          <Link href="/case-studies">Case Studies</Link>
        </nav>
        <Link href="#contact-cyber" className="button button--primary button--compact topbar-cta">
          Get a Security Assessment
        </Link>
      </header>

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="sap-hero">
        <div className="shell sap-hero__inner">
          <motion.div className="sap-hero__copy" variants={stagger} initial="hidden" animate="visible">
            <motion.p className="sap-eyebrow" variants={prefersReduced ? fadeIn : fadeUp}>Enterprise Cyber Security</motion.p>
            <motion.h1 className="sap-hero__title" variants={prefersReduced ? fadeIn : fadeUp}>
              Protect Your SAP<br />Landscape End<br />to End.
            </motion.h1>
            <motion.p className="sap-hero__sub" variants={prefersReduced ? fadeIn : fadeUp}>
              Vulnerability assessment, penetration testing, GRC, identity governance, and
              continuous security monitoring — purpose-built for complex SAP environments
              operating across multiple countries and regulatory frameworks.
            </motion.p>
            <motion.div className="sap-hero__ctas" variants={prefersReduced ? fadeIn : fadeUp}>
              <Link href="#services" className="button button--primary">Explore security services</Link>
              <Link href="#contact-cyber" className="button button--ghost">Request a free assessment</Link>
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

      {/* ── Services Tabs ─────────────────────────────────── */}
      <section className="sap-section sap-section--dark" id="services">
        <div className="shell">
          <motion.div className="sap-section-header sap-section-header--light" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <p className="sap-eyebrow sap-eyebrow--light">Full-spectrum security delivery</p>
            <h2 className="sap-section-title sap-section-title--light">Comprehensive SAP security across every layer</h2>
            <p className="sap-section-sub sap-section-sub--light">
              From initial vulnerability discovery through ongoing governance — one team protecting your entire SAP landscape.
            </p>
          </motion.div>

          <div className="sap-tab-bar sap-tab-bar--dark" role="tablist" aria-label="Security services">
            {services.map((svc, i) => (
              <button key={svc.id} role="tab" aria-selected={activeTab === i}
                className={`sap-tab sap-tab--dark${activeTab === i ? " sap-tab--active-dark" : ""}`}
                onClick={() => setActiveTab(i)}>
                {svc.title.split(" ")[0]} {svc.title.split(" ")[1]}
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
                    <Link href="#contact-cyber" className="button button--primary button--compact">Request this service</Link>
                    <Link href="#contact-cyber" className="button button--ghost button--compact sap-ghost-light">Speak to a specialist</Link>
                  </div>
                </div>
                <div className="sap-tab-panel__visual sap-tab-panel__visual--dark">
                  <div className="sap-tab-panel__index">
                    <span className="sap-tab-panel__index-num">0{activeTab + 1}</span>
                    <span className="sap-tab-panel__index-total">/ 06</span>
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

      {/* ── Methodology ───────────────────────────────────── */}
      <section className="sap-section shell" id="methodology">
        <motion.div className="sap-section-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <p className="sap-eyebrow">The ITChamps security methodology</p>
          <h2 className="sap-section-title">An 8-phase security engagement framework</h2>
          <p className="sap-section-sub">
            From initial scoping through governance handover — a structured delivery model that ensures no findings fall through the gaps.
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
          <Link href="#contact-cyber" className="button button--primary">Discuss your security requirements</Link>
        </div>
      </section>

      {/* ── Capabilities ──────────────────────────────────── */}
      <section className="sap-section shell">
        <motion.div className="sap-section-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <p className="sap-eyebrow">Full security capability coverage</p>
          <h2 className="sap-section-title">Every security layer of your SAP environment</h2>
          <p className="sap-section-sub">From GRC and access control through active threat detection and EHS compliance — complete coverage with no gaps.</p>
        </motion.div>
        <motion.div className="sap-ecosystem-grid" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
          {capabilities.map((cap) => (
            <motion.div key={cap} className="sap-ecosystem-chip" variants={prefersReduced ? fadeIn : fadeUp}>{cap}</motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Thought Leadership ────────────────────────────── */}
      <section className="sap-section sap-section--tinted">
        <div className="shell sap-thought-inner">
          <motion.div className="sap-thought-copy" initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p className="sap-eyebrow">Why SAP security demands a specialist</p>
            <h2 className="sap-section-title" style={{ textAlign: "left" }}>Generic security tools miss SAP-specific risks</h2>
            <p style={{ fontSize: "1rem", color: "#475569", lineHeight: "1.75", marginBottom: "24px" }}>
              SAP environments carry business logic, financial records, HR data, and supply chain controls that
              standard security scanners were never designed to understand. Authorization misconfigurations,
              RFC backdoors, and ABAP injection risks are invisible to generic vulnerability tools.
            </p>
            <p style={{ fontSize: "1rem", color: "#475569", lineHeight: "1.75", marginBottom: "32px" }}>
              ITChamps security consultants bring deep SAP basis, ABAP, and GRC expertise — combined with
              offensive security skills — to identify and close the risks that matter most to your business
              before they become incidents.
            </p>
            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
              <Link href="#contact-cyber" className="button button--primary">Request a security consultation</Link>
              <Link href="/case-studies" className="button button--ghost">View case studies</Link>
            </div>
          </motion.div>
          <motion.div className="sap-thought-visual" initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.1 }}>
            <div className="sap-thought-card">
              <div className="sap-thought-card__label">Security Coverage Checklist</div>
              <h3 className="sap-thought-card__title">Is Your SAP Environment Secure?</h3>
              <ul className="sap-thought-card__list">
                <li>Role and authorization review completed</li>
                <li>SoD conflicts identified and mitigated</li>
                <li>VAPT conducted in last 12 months</li>
                <li>GRC Access Control implemented</li>
                <li>Security monitoring active (SIEM/ETD)</li>
                <li>Privileged access under control</li>
              </ul>
              <Link href="#contact-cyber" className="button button--primary button--compact" style={{ width: "100%", justifyContent: "center", marginTop: "8px" }}>
                Get a free security gap review
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────── */}
      <section className="sap-section sap-section--tinted shell" id="faq">
        <motion.div className="sap-section-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <p className="sap-eyebrow">Common questions</p>
          <h2 className="sap-section-title">SAP security &amp; GRC FAQ</h2>
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
      <section className="sap-section sap-cta-section" id="contact-cyber">
        <div className="shell sap-cta-inner">
          <motion.div className="sap-cta-copy" initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p className="sap-eyebrow sap-eyebrow--light">Start your security assessment</p>
            <h2 className="sap-cta-title">Find and close your SAP security gaps</h2>
            <p className="sap-cta-body">
              Tell us about your SAP environment and compliance requirements. Our security specialists
              will review your landscape and respond with a tailored assessment scope and approach.
            </p>
            <ul className="sap-cta-checklist">
              <li>Free initial security gap review</li>
              <li>Dedicated security consultant — no sales handoffs</li>
              <li>Response within 1 business day</li>
              <li>No obligation, no pressure</li>
            </ul>
          </motion.div>
          <motion.div className="sap-cta-form-wrap" initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <CyberContactForm />
          </motion.div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────── */}
      <footer className="footer-section">
        <div className="shell">
          <div className="footer-section__top">
            <div className="footer-section__brand">
              <Image src="/itchamps-logo.png" alt="ITChamps Software logo" width={168} height={54} className="footer-logo" />
              <p>SAP security, GRC, VAPT, and enterprise protection services for global organizations operating complex SAP landscapes.</p>
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

function CyberContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [form, setForm] = useState({ fullName: "", workEmail: "", company: "", serviceInterest: "", message: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, source: "cyber-security-page" }) });
      setStatus(res.ok ? "success" : "error");
    } catch { setStatus("error"); }
  }

  if (status === "success") return (
    <div className="sap-form-success">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
      <h3>Thank you — we&apos;ll be in touch.</h3>
      <p>Expect a response from a security specialist within one business day.</p>
    </div>
  );

  return (
    <form className="sap-form" onSubmit={handleSubmit} noValidate>
      <div className="sap-form__row">
        <label className="sr-only" htmlFor="cyber-name">Full name</label>
        <input id="cyber-name" type="text" placeholder="Full name" required value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })}/>
        <label className="sr-only" htmlFor="cyber-email">Work email</label>
        <input id="cyber-email" type="email" placeholder="Work email" required value={form.workEmail} onChange={(e) => setForm({ ...form, workEmail: e.target.value })}/>
      </div>
      <label className="sr-only" htmlFor="cyber-company">Company</label>
      <input id="cyber-company" type="text" placeholder="Company name" required value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })}/>
      <label className="sr-only" htmlFor="cyber-service">Service interest</label>
      <select id="cyber-service" value={form.serviceInterest} onChange={(e) => setForm({ ...form, serviceInterest: e.target.value })}>
        <option value="">Service of interest (optional)</option>
        <option>SAP Security Assessment</option>
        <option>Vulnerability &amp; Penetration Testing</option>
        <option>GRC &amp; Segregation of Duties</option>
        <option>User Access Management</option>
        <option>Security Monitoring &amp; SIEM</option>
        <option>EHS Compliance</option>
        <option>Other / Not sure yet</option>
      </select>
      <label className="sr-only" htmlFor="cyber-message">Message</label>
      <textarea id="cyber-message" placeholder="Tell us about your SAP environment and security requirements…" required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}/>
      {status === "error" && <p className="sap-form__error">Something went wrong. Please try again.</p>}
      <button type="submit" className="button button--primary" disabled={status === "loading"}>
        {status === "loading" ? "Sending…" : "Request free security review"}
      </button>
    </form>
  );
}
