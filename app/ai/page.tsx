"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const fadeUp  = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };
const fadeIn  = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
const stagger = { visible: { transition: { staggerChildren: 0.07 } } };

// ─── Data drawn from Numentrix / INVENTRIX AI platform ───────────────────────

const heroStats = [
  { value: "60%",  label: "Average logistics cost reduction" },
  { value: "95%+", label: "Demand forecast accuracy" },
  { value: "40%",  label: "Inventory capital freed up" },
  { value: "Real-time", label: "Planning intelligence" },
];

const valueProps = [
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
    title: "Predict demand before it happens",
    body: "Deep learning, neuro-fuzzy logic, and time-series models working together to interpret volatile demand signals — capturing edge cases that flatten traditional forecasts.",
    link: "#forecasting",
    cta: "Explore demand forecasting",
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>,
    title: "Optimize inventory without capital waste",
    body: "Replenishment policies that balance service levels, lead times, and working capital — dynamically adjusted as demand patterns shift across your network.",
    link: "#inventory",
    cta: "See inventory optimization",
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
    title: "Surface risks before they become incidents",
    body: "Predictive alerts that flag stock-out and overstock conditions early enough for planners to intervene — before service levels or margins are damaged.",
    link: "#alerts",
    cta: "View predictive alerting",
  },
];

const aiCapabilities = [
  {
    id: "forecasting",
    tag: "Demand Intelligence",
    title: "AI Demand Forecasting",
    headline: "Forecast demand at the level your operators actually plan around.",
    body: "INVENTRIX delivers AI-native demand forecasting at the SKU, channel, plant, or region level. Deep learning and neuro-fuzzy logic models work together to capture seasonal patterns, demand volatility, and market signals that statistical methods miss entirely.",
    bullets: [
      "Multi-level forecasting: SKU, category, plant, region, channel",
      "Deep learning models tuned to your demand structure",
      "Neuro-fuzzy logic for volatile and irregular demand patterns",
      "Time-series decomposition and anomaly-adjusted baselines",
      "Forecast accuracy monitoring with continuous model retraining",
      "SAP IBP, APO, and S/4HANA integration for live planning",
    ],
  },
  {
    id: "inventory",
    tag: "Inventory Optimisation",
    title: "AI Inventory Optimisation",
    headline: "Stocking policies that free working capital without sacrificing service.",
    body: "The INVENTRIX engine generates replenishment policies that respect your service level commitments, lead time variability, working capital constraints, and the operational reality of your supply network — dynamically updated as conditions change.",
    bullets: [
      "Dynamic safety stock and reorder point calculation",
      "Service-level-driven replenishment policy generation",
      "Working capital constraint optimisation across SKUs",
      "Lead time variability modelling and buffer tuning",
      "ABC-XYZ and demand variability classification",
      "Integration with SAP MRP, IBP, and procurement workflows",
    ],
  },
  {
    id: "classification",
    tag: "Item Intelligence",
    title: "AI Item Classification",
    headline: "Dynamic item intelligence that replaces brittle static labels.",
    body: "Cross-ABC analysis, demand variability scoring, and movement pattern classification are combined into dynamic item classes — automatically updated as purchasing behaviour, market demand, and supply conditions evolve.",
    bullets: [
      "Cross-ABC classification (value × volume × variability)",
      "Demand volatility and intermittency segmentation",
      "Movement and lifecycle pattern detection",
      "Automated reclassification as patterns shift",
      "Policy assignment by item class with override controls",
      "Obsolescence and slow-mover early-warning detection",
    ],
  },
  {
    id: "alerts",
    tag: "Predictive Alerting",
    title: "Predictive Supply Chain Alerts",
    headline: "Know about supply risks before your customers do.",
    body: "INVENTRIX surfaces stock-out probabilities, overstock exposure, and supply disruption signals in real time — giving planners the lead time they need to intervene before service or margin is damaged.",
    bullets: [
      "Stock-out probability scoring by SKU and location",
      "Overstock exposure and working capital at-risk flagging",
      "Supplier lead time deviation and disruption alerts",
      "Demand spike detection with automated reorder triggers",
      "Planner workflow integration for exception management",
      "Executive supply chain risk dashboards",
    ],
  },
  {
    id: "integration",
    tag: "SAP Integration",
    title: "Plug-and-Play SAP Integration",
    headline: "AI planning that integrates directly with your SAP landscape.",
    body: "INVENTRIX connects directly to SAP S/4HANA, ECC, IBP, and APO without third-party middleware dependencies — feeding planning outputs into MRP, procurement, and warehouse processes in real time.",
    bullets: [
      "Native SAP S/4HANA and ECC integration",
      "SAP IBP data exchange for consensus planning",
      "Real-time stock, movement, and order data sync",
      "Automated planning output injection into SAP MRP",
      "No third-party middleware required",
      "Cloud and on-premise deployment options",
    ],
  },
  {
    id: "analytics",
    tag: "Analytics",
    title: "AI Supply Chain Analytics",
    headline: "From raw data to planning decisions without translation loss.",
    body: "Every planning layer gets the same advantage — cleaner demand signals, clearer supply risk, and decision support that moves from insight to execution without the operational drag of manual analysis and spreadsheet reconciliation.",
    bullets: [
      "Real-time supply chain KPI dashboards",
      "Demand vs. forecast variance analysis and root cause",
      "Inventory health scoring across all locations",
      "Service level performance tracking",
      "Cost-to-serve and margin impact analytics",
      "Executive planning briefings and trend reports",
    ],
  },
];

const platforms = [
  "SAP S/4HANA","SAP IBP","SAP APO","SAP ECC","SAP Analytics Cloud",
  "INVENTRIX Engine","Deep Learning Models","Neuro-Fuzzy Logic","Time-Series AI",
  "Dynamic Classification","Predictive Alerting","Real-time MRP Integration",
];

const methodology = [
  { num: "01", title: "Data Assessment",  desc: "Review demand history, inventory data, SAP landscape, and data quality" },
  { num: "02", title: "Model Design",     desc: "Select and configure AI models matched to your demand patterns" },
  { num: "03", title: "Integration",      desc: "Connect INVENTRIX to your SAP system for live data exchange" },
  { num: "04", title: "Baseline",         desc: "Run historical validation to measure baseline forecast accuracy improvement" },
  { num: "05", title: "Go-Live",          desc: "Activate live AI planning with planner training and exception workflows" },
  { num: "06", title: "Monitoring",       desc: "Continuous model performance tracking and automatic retraining cycles" },
  { num: "07", title: "Optimise",         desc: "Policy refinement, service level tuning, and working capital optimisation" },
  { num: "08", title: "Expand",           desc: "Roll out across additional SKUs, locations, and planning processes" },
];

const faqs = [
  {
    q: "What is the INVENTRIX platform and how does it relate to SAP?",
    a: "INVENTRIX is ITChamps' AI-native supply chain planning engine that integrates directly with SAP S/4HANA, ECC, IBP, and APO. It provides AI-powered demand forecasting, inventory optimisation, and predictive alerting capabilities that extend and enhance SAP's native planning functions — without requiring third-party middleware or a full system replacement.",
  },
  {
    q: "How long does it take to see results from AI demand forecasting?",
    a: "Most clients see measurable improvement in forecast accuracy within the first planning cycle after go-live, typically 4–8 weeks from integration. The models continue improving through continuous retraining, typically reaching peak performance within 3–6 months as the system learns your specific demand patterns and seasonality.",
  },
  {
    q: "Will AI forecasting work for irregular or highly volatile demand?",
    a: "Yes. INVENTRIX specifically addresses volatile demand through neuro-fuzzy logic models designed for irregular, intermittent, and lumpy demand patterns that traditional statistical models fail to capture. This makes it particularly effective for spare parts, capital goods, and products with seasonal or event-driven demand spikes.",
  },
  {
    q: "How does the inventory optimisation handle multiple service level targets?",
    a: "INVENTRIX supports differentiated service level targets by item class, customer segment, or product line — allowing you to set higher service levels for A-class items and strategic customers while reducing safety stock on lower-priority SKUs. The engine continuously rebalances policies to hit your targets while minimizing total inventory investment.",
  },
  {
    q: "Does implementation require replacing our existing SAP planning processes?",
    a: "No. INVENTRIX is designed as an enhancement layer that works alongside your existing SAP planning processes. It feeds AI-generated forecasts and replenishment signals into SAP MRP and procurement workflows, giving planners AI-powered inputs without requiring them to abandon familiar SAP transactions or processes.",
  },
];

export default function AIPage() {
  const prefersReduced = useReducedMotion();
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="sap-page ai-page">

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
          <Link href="/enterprise-automation">Automation</Link>
          <Link href="/ai" className="topnav__active">AI Solutions</Link>
          <Link href="/case-studies">Case Studies</Link>
        </nav>
        <Link href="#contact-ai" className="button button--primary button--compact topbar-cta">
          Explore AI Solutions
        </Link>
      </header>

      {/* ── Urgency Banner ────────────────────────────────── */}
      <div className="sap-deadline-banner" style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(0,123,181,0.15))", borderBottom: "1px solid rgba(99,102,241,0.2)" }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
        <span><strong>INVENTRIX: AI-native supply chain planning.</strong> Reduce logistics costs by up to 60% — integrated directly with your SAP landscape.</span>
        <Link href="#contact-ai">Explore INVENTRIX →</Link>
      </div>

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="sap-hero">
        <div className="shell sap-hero__inner">
          <motion.div className="sap-hero__copy" variants={stagger} initial="hidden" animate="visible">
            <motion.p className="sap-eyebrow" variants={prefersReduced ? fadeIn : fadeUp}>AI Solutions &amp; Supply Chain Intelligence</motion.p>
            <motion.h1 className="sap-hero__title" variants={prefersReduced ? fadeIn : fadeUp}>
              AI-Native Planning<br />for Demand, Inventory<br />and Supply Chain.
            </motion.h1>
            <motion.p className="sap-hero__sub" variants={prefersReduced ? fadeIn : fadeUp}>
              INVENTRIX delivers deep mathematical intelligence for the global supply chain — predicting
              demand, optimising inventory, and moving your enterprise from data to action without
              operational drag. Integrated directly with SAP. No third-party dependencies.
            </motion.p>
            <motion.div className="sap-hero__ctas" variants={prefersReduced ? fadeIn : fadeUp}>
              <Link href="#capabilities" className="button button--primary">Explore AI capabilities</Link>
              <Link href="#contact-ai" className="button button--ghost">Request a demo</Link>
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

      {/* ── INVENTRIX Platform ────────────────────────────── */}
      <section className="sap-section sap-section--tinted">
        <div className="shell sap-thought-inner">
          <motion.div className="sap-thought-copy" initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p className="sap-eyebrow">The INVENTRIX engine</p>
            <h2 className="sap-section-title" style={{ textAlign: "left" }}>AI-native planning built for the realities of global supply chains</h2>
            <p style={{ fontSize: "1rem", color: "#475569", lineHeight: "1.75", marginBottom: "24px" }}>
              INVENTRIX combines deep learning, neuro-fuzzy logic, and time-series intelligence to build
              planning models that reflect how your supply chain actually behaves — including volatility,
              seasonal complexity, and the operational constraints your planners navigate every day.
            </p>
            <p style={{ fontSize: "1rem", color: "#475569", lineHeight: "1.75", marginBottom: "32px" }}>
              Unlike generic AI platforms that require complex integration projects, INVENTRIX plugs
              directly into your SAP S/4HANA or ECC landscape — feeding AI-generated planning signals
              straight into MRP, procurement, and warehouse workflows without replacing your existing processes.
            </p>
            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
              <Link href="#contact-ai" className="button button--primary">Request an INVENTRIX demo</Link>
              <Link href="/case-studies" className="button button--ghost">View case studies</Link>
            </div>
          </motion.div>
          <motion.div className="sap-thought-visual" initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.1 }}>
            <div className="sap-thought-card">
              <div className="sap-thought-card__label">INVENTRIX Platform</div>
              <h3 className="sap-thought-card__title">AI Models Inside INVENTRIX</h3>
              <ul className="sap-thought-card__list">
                <li>Deep learning demand models</li>
                <li>Neuro-fuzzy logic for volatile demand</li>
                <li>Time-series decomposition engine</li>
                <li>Cross-ABC dynamic classification</li>
                <li>Replenishment policy optimiser</li>
                <li>Real-time predictive alert system</li>
              </ul>
              <Link href="#contact-ai" className="button button--primary button--compact" style={{ width: "100%", justifyContent: "center", marginTop: "8px" }}>
                Get a platform walkthrough
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── AI Capabilities Tabs ──────────────────────────── */}
      <section className="sap-section sap-section--dark" id="capabilities">
        <div className="shell">
          <motion.div className="sap-section-header sap-section-header--light" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <p className="sap-eyebrow sap-eyebrow--light">Full AI planning capability stack</p>
            <h2 className="sap-section-title sap-section-title--light">Every planning layer gets the same AI advantage</h2>
            <p className="sap-section-sub sap-section-sub--light">
              Demand forecasting, inventory optimisation, item classification, predictive alerts, and native SAP integration — one platform, one delivery team.
            </p>
          </motion.div>

          <div className="sap-tab-bar sap-tab-bar--dark" role="tablist" aria-label="AI capabilities">
            {aiCapabilities.map((cap, i) => (
              <button key={cap.id} role="tab" aria-selected={activeTab === i}
                className={`sap-tab sap-tab--dark${activeTab === i ? " sap-tab--active-dark" : ""}`}
                onClick={() => setActiveTab(i)}>
                {cap.title.replace("AI ", "").replace(" Optimisation", " Opt.").replace(" Classification", " Class.").replace(" Forecasting", " FC")}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={activeTab} role="tabpanel" className="sap-tab-panel sap-tab-panel--dark"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: "easeOut" }}>
              <div className="sap-tab-panel__content">
                <div className="sap-tab-panel__text">
                  <span className="sap-tag sap-tag--light">{aiCapabilities[activeTab].tag}</span>
                  <h3 className="sap-tab-panel__headline sap-tab-panel__headline--light">{aiCapabilities[activeTab].headline}</h3>
                  <p className="sap-tab-panel__body sap-tab-panel__body--light">{aiCapabilities[activeTab].body}</p>
                  <ul className="sap-tab-panel__bullets sap-tab-panel__bullets--light">
                    {aiCapabilities[activeTab].bullets.map((b) => (
                      <li key={b}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className="sap-tab-panel__ctas">
                    <Link href="#contact-ai" className="button button--primary button--compact">Request a demo</Link>
                    <Link href="#contact-ai" className="button button--ghost button--compact sap-ghost-light">Speak to an AI specialist</Link>
                  </div>
                </div>
                <div className="sap-tab-panel__visual sap-tab-panel__visual--dark">
                  <div className="sap-tab-panel__index">
                    <span className="sap-tab-panel__index-num">0{activeTab + 1}</span>
                    <span className="sap-tab-panel__index-total">/ 06</span>
                  </div>
                  <div className="sap-tab-panel__service-list">
                    {aiCapabilities.map((t, i) => (
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

      {/* ── Platform Coverage ─────────────────────────────── */}
      <section className="sap-section shell">
        <motion.div className="sap-section-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <p className="sap-eyebrow">Platform and technology coverage</p>
          <h2 className="sap-section-title">AI that works with your existing SAP ecosystem</h2>
          <p className="sap-section-sub">INVENTRIX is certified across the SAP planning and analytics portfolio — no rip-and-replace required.</p>
        </motion.div>
        <motion.div className="sap-ecosystem-grid" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
          {platforms.map((p) => (
            <motion.div key={p} className="sap-ecosystem-chip" variants={prefersReduced ? fadeIn : fadeUp}>{p}</motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Deployment Methodology ────────────────────────── */}
      <section className="sap-section shell" id="methodology">
        <motion.div className="sap-section-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <p className="sap-eyebrow">The INVENTRIX deployment methodology</p>
          <h2 className="sap-section-title">From data assessment to scaled AI planning operations</h2>
          <p className="sap-section-sub">
            A structured 8-phase approach ensuring your AI models are correctly tuned, integrated, and continuously improving from day one.
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
          <Link href="#contact-ai" className="button button--primary">Schedule an INVENTRIX assessment</Link>
        </div>
      </section>

      {/* ── Results Highlight ─────────────────────────────── */}
      <section className="sap-section sap-section--dark">
        <div className="shell">
          <motion.div className="sap-section-header sap-section-header--light" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <p className="sap-eyebrow sap-eyebrow--light">Measurable outcomes</p>
            <h2 className="sap-section-title sap-section-title--light">$15M revenue recovery through AI yield optimisation</h2>
            <p className="sap-section-sub sap-section-sub--light">
              A leading process manufacturer deployed INVENTRIX-powered AI across 50+ production units — capturing waste recovery and process efficiency gains that delivered $15M in annual revenue recovery.
            </p>
          </motion.div>
          <motion.div className="sap-value-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }} variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
            {[
              { value: "$15M", label: "Annual revenue recovered through yield optimisation" },
              { value: "50+",  label: "Production units with AI-driven planning" },
              { value: "60%",  label: "Reduction in supply chain inefficiency costs" },
              { value: "Real-time", label: "Demand-to-production signal integration" },
            ].map((stat) => (
              <motion.div key={stat.label} className="sap-stat-card" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }} variants={prefersReduced ? fadeIn : fadeUp}>
                <span className="sap-stat-card__value" style={{ color: "#93c5fd" }}>{stat.value}</span>
                <span className="sap-stat-card__label" style={{ color: "rgba(255,255,255,0.6)" }}>{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <Link href="/case-studies/yield-optimizer-petrochemical" className="button button--ghost" style={{ borderColor: "rgba(255,255,255,0.3)", color: "#fff" }}>
              Read the full case study →
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────── */}
      <section className="sap-section sap-section--tinted shell" id="faq">
        <motion.div className="sap-section-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <p className="sap-eyebrow">Common questions</p>
          <h2 className="sap-section-title">AI solutions &amp; INVENTRIX FAQ</h2>
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
      <section className="sap-section sap-cta-section" id="contact-ai">
        <div className="shell sap-cta-inner">
          <motion.div className="sap-cta-copy" initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p className="sap-eyebrow sap-eyebrow--light">Start your AI journey</p>
            <h2 className="sap-cta-title">Bring AI-native planning into your supply chain</h2>
            <p className="sap-cta-body">
              Tell us about your supply chain planning challenges, SAP landscape, and the outcomes you want to drive. Our AI specialists will assess the opportunity and show you INVENTRIX in action.
            </p>
            <ul className="sap-cta-checklist">
              <li>Free demand and inventory opportunity assessment</li>
              <li>Live INVENTRIX platform demonstration</li>
              <li>Response within 1 business day</li>
              <li>No obligation, no pressure</li>
            </ul>
          </motion.div>
          <motion.div className="sap-cta-form-wrap" initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <AIContactForm />
          </motion.div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────── */}
      <footer className="footer-section">
        <div className="shell">
          <div className="footer-section__top">
            <div className="footer-section__brand">
              <Image src="/itchamps-logo.png" alt="ITChamps Software logo" width={168} height={54} className="footer-logo" />
              <p>AI-native supply chain planning, demand forecasting, and inventory optimisation powered by INVENTRIX — integrated with SAP.</p>
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

function AIContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [form, setForm] = useState({ fullName: "", workEmail: "", company: "", serviceInterest: "", message: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, source: "ai-solutions-page" }) });
      setStatus(res.ok ? "success" : "error");
    } catch { setStatus("error"); }
  }

  if (status === "success") return (
    <div className="sap-form-success">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
      <h3>Thank you — we&apos;ll be in touch.</h3>
      <p>Expect a response from an AI specialist within one business day.</p>
    </div>
  );

  return (
    <form className="sap-form" onSubmit={handleSubmit} noValidate>
      <div className="sap-form__row">
        <label className="sr-only" htmlFor="ai-name">Full name</label>
        <input id="ai-name" type="text" placeholder="Full name" required value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })}/>
        <label className="sr-only" htmlFor="ai-email">Work email</label>
        <input id="ai-email" type="email" placeholder="Work email" required value={form.workEmail} onChange={(e) => setForm({ ...form, workEmail: e.target.value })}/>
      </div>
      <label className="sr-only" htmlFor="ai-company">Company</label>
      <input id="ai-company" type="text" placeholder="Company name" required value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })}/>
      <label className="sr-only" htmlFor="ai-service">Area of interest</label>
      <select id="ai-service" value={form.serviceInterest} onChange={(e) => setForm({ ...form, serviceInterest: e.target.value })}>
        <option value="">Area of interest (optional)</option>
        <option>AI Demand Forecasting</option>
        <option>Inventory Optimisation</option>
        <option>Predictive Supply Chain Alerts</option>
        <option>Item Classification Intelligence</option>
        <option>SAP AI Integration</option>
        <option>Full INVENTRIX Platform</option>
        <option>Other / Not sure yet</option>
      </select>
      <label className="sr-only" htmlFor="ai-message">Message</label>
      <textarea id="ai-message" placeholder="Tell us about your supply chain planning challenges and SAP landscape…" required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}/>
      {status === "error" && <p className="sap-form__error">Something went wrong. Please try again.</p>}
      <button type="submit" className="button button--primary" disabled={status === "loading"}>
        {status === "loading" ? "Sending…" : "Request INVENTRIX demo"}
      </button>
    </form>
  );
}
