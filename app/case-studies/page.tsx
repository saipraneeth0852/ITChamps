"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { NarrativeBackdrop } from "../../components/NarrativeBackdrop";
import { caseStudies } from "./data";

const fadeUp = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const outcomeData = [
  {
    slug: "abb-global-standardization",
    client: "ABB", abbr: "ABB", sector: "Industrial Automation", accent: "#CC0000",
    metric: "40%", metricLabel: "Operational efficiency gain",
    image: "/case_abb.png",
    bars: [
      { label: "Countries unified", value: "50+", pct: 50 },
      { label: "Reporting time saved", value: "60%", pct: 60 },
      { label: "On-time go-lives", value: "100%", pct: 100 },
    ],
  },
  {
    slug: "ongc-enterprise-modernization",
    client: "ONGC Videsh", abbr: "OVL", sector: "Energy & Resources", accent: "#1B6B3A",
    metric: "3 days", metricLabel: "Month-end close (was 12)",
    image: "/case_ongc.png",
    bars: [
      { label: "Faster financial reporting", value: "70%", pct: 70 },
      { label: "Manual effort removed", value: "90%", pct: 90 },
      { label: "Data accuracy", value: "100%", pct: 100 },
    ],
  },
  {
    slug: "manipal-hr-payroll-transformation",
    client: "Manipal Global", abbr: "MG", sector: "Education & HR", accent: "#003DA5",
    metric: "99.9%", metricLabel: "Payroll accuracy",
    image: "/case_manipal.png",
    bars: [
      { label: "HR processing effort saved", value: "80%", pct: 80 },
      { label: "Self-service adoption (60 days)", value: "85%", pct: 85 },
      { label: "Payroll reprocessing runs", value: "0", pct: 0 },
    ],
  },
];

export default function CaseStudiesPage() {
  return (
    <main className="cs-page">
      <NarrativeBackdrop variant="home" />

      {/* ── Navbar ─────────────────────────────────────── */}
      <header className="topbar shell">
        <Link href="/" className="brand brand--logo" aria-label="ITChamps Software homepage">
          <Image src="/itchamps-logo.png" alt="ITChamps Software logo" width={176} height={56} priority />
        </Link>
        <nav className="topnav" aria-label="Primary">
          <Link href="/">Home</Link>
          <Link href="/services">Services</Link>
          <Link href="/case-studies" aria-current="page">Case Studies</Link>
          <a href="#contact-cs">Get in Touch</a>
        </nav>
        <Link href="/#contact" className="button button--primary button--compact topbar-cta">
          Talk to an Expert
        </Link>
      </header>

      {/* ══════════════════════════════════════════════════
          HERO — split layout with image collage
      ══════════════════════════════════════════════════ */}
      <section className="cs-hero shell">

        {/* ── Left: copy + stats ─────────────────────── */}
        <div className="cs-hero__left">
          <motion.div variants={stagger} initial="hidden" animate="visible">
            <motion.p className="cs-eyebrow" variants={fadeUp}>Client Success Stories</motion.p>
            <motion.h1 className="cs-hero__title" variants={fadeUp}>
              Real enterprises.
              <span className="cs-hero__gradient"> Real results.</span>
            </motion.h1>
            <motion.p className="cs-hero__lede" variants={fadeUp}>
              Three global enterprises trusted ITChamps with their most critical SAP
              transformations. Here&rsquo;s how we delivered — with the numbers to prove it.
            </motion.p>
            <motion.div className="cs-hero__actions" variants={fadeUp}>
              <a href="#cs-outcomes" className="button button--primary">See the Outcomes</a>
              <Link href="/services" className="button button--ghost">Our Services</Link>
            </motion.div>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            className="cs-stats-strip"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {[
              { val: "3", label: "Enterprise clients" },
              { val: "80+", label: "Countries impacted" },
              { val: "100%", label: "Go-live success" },
              { val: "20+", label: "Years expertise" },
            ].map((s) => (
              <div className="cs-stat" key={s.label}>
                <strong>{s.val}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Right: image collage ────────────────────── */}
        <div className="cs-hero__visual">

          {/* Main large card */}
          <motion.div
            className="cs-hero-card cs-hero-card--main"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image src="/case_abb.png" alt="ABB case study" fill className="cs-hero-card__img" sizes="50vw" priority />
            <div className="cs-hero-card__overlay" aria-hidden="true" />
            <div className="cs-hero-card__label">
              <span className="cs-hero-card__abbr" style={{ color: "#CC0000", background: "rgba(255,255,255,0.97)" }}>ABB</span>
              <div className="cs-hero-card__info">
                <strong>Standardizing Global Operations</strong>
                <span>Industrial Automation · 50+ countries</span>
              </div>
              <div className="cs-hero-card__result">40%</div>
            </div>
          </motion.div>

          {/* Two smaller cards */}
          <div className="cs-hero__sub-row">
            <motion.div
              className="cs-hero-card cs-hero-card--sub"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image src="/case_ongc.png" alt="ONGC Videsh case study" fill className="cs-hero-card__img" sizes="25vw" />
              <div className="cs-hero-card__overlay" aria-hidden="true" />
              <div className="cs-hero-card__label">
                <span className="cs-hero-card__abbr" style={{ color: "#1B6B3A", background: "rgba(255,255,255,0.97)" }}>OVL</span>
                <div className="cs-hero-card__info">
                  <strong>ONGC Videsh</strong>
                  <span>70% faster reporting</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="cs-hero-card cs-hero-card--sub"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image src="/case_manipal.png" alt="Manipal Global case study" fill className="cs-hero-card__img" sizes="25vw" />
              <div className="cs-hero-card__overlay" aria-hidden="true" />
              <div className="cs-hero-card__label">
                <span className="cs-hero-card__abbr" style={{ color: "#003DA5", background: "rgba(255,255,255,0.97)" }}>MG</span>
                <div className="cs-hero-card__info">
                  <strong>Manipal Global</strong>
                  <span>99.9% payroll accuracy</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Floating badges */}
          <motion.div
            className="cs-float-badge cs-float-badge--tl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            >
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
              <div>
                <strong>100%</strong>
                <span>Go-live success rate</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="cs-float-badge cs-float-badge--ml"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 4, delay: 0.5, repeat: Infinity, ease: "easeInOut" }} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              <div>
                <strong>80+</strong>
                <span>Countries impacted</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="cs-float-badge cs-float-badge--br"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.95 }}
          >
            <motion.div animate={{ y: [0, -7, 0] }} transition={{ duration: 3.8, delay: 1.2, repeat: Infinity, ease: "easeInOut" }} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              <div>
                <strong>30K+</strong>
                <span>Employees unified</span>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          OUTCOMES INFOGRAPHIC
      ══════════════════════════════════════════════════ */}
      <section className="cs-outcomes shell" id="cs-outcomes">
        <motion.div
          className="cs-outcomes__header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="cs-eyebrow">Results at a glance</p>
          <h2 className="cs-outcomes__title">What transformation looks like — in numbers.</h2>
          <p className="cs-outcomes__sub">Hover a card to explore, click to read the full case study.</p>
        </motion.div>

        <div className="cs-outcomes__grid">
          {outcomeData.map((item, i) => (
            <motion.div
              key={item.client}
              className="cs-outcome-card"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8 }}
            >
              {/* Thumbnail */}
              <div className="cs-outcome-card__thumb">
                <Image src={item.image} alt={item.client} fill className="cs-outcome-card__thumb-img" sizes="(max-width:768px) 100vw, 33vw" />
                <div className="cs-outcome-card__thumb-overlay" />
                <span className="cs-outcome-card__sector-tag" style={{ "--accent": item.accent } as React.CSSProperties}>
                  {item.sector}
                </span>
              </div>

              {/* Header */}
              <div className="cs-outcome-card__header">
                <div className="cs-outcome-card__abbr" style={{ "--accent": item.accent } as React.CSSProperties}>
                  {item.abbr}
                </div>
                <div>
                  <strong className="cs-outcome-card__client">{item.client}</strong>
                  <span className="cs-outcome-card__sector">{item.sector}</span>
                </div>
              </div>

              {/* Primary metric */}
              <div className="cs-outcome-card__metric-box">
                <div className="cs-outcome-card__metric-val">{item.metric}</div>
                <div className="cs-outcome-card__metric-lbl">{item.metricLabel}</div>
              </div>

              {/* Animated bars */}
              <div className="cs-outcome-card__bars">
                {item.bars.map((bar, j) => (
                  <div key={bar.label} className="cs-outcome-bar">
                    <div className="cs-outcome-bar__top">
                      <span>{bar.label}</span>
                      <span className="cs-outcome-bar__val">{bar.value}</span>
                    </div>
                    <div className="cs-outcome-bar__track">
                      <motion.div
                        className="cs-outcome-bar__fill"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: bar.pct / 100 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.85, delay: i * 0.12 + j * 0.13, ease: [0.22, 1, 0.36, 1] }}
                        style={{ transformOrigin: "left" }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <Link href={`/case-studies/${item.slug}`} className="cs-outcome-card__cta">
                Read full case study
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          CASE STUDY CARDS
      ══════════════════════════════════════════════════ */}
      <section className="cs-grid-section shell" id="cs-cases">
        <motion.div
          className="cs-grid-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="cs-eyebrow">In depth</p>
          <h2 className="cs-grid-title">Explore each transformation</h2>
        </motion.div>

        <div className="cs-grid">
          {caseStudies.map((study, i) => (
            <motion.article
              key={study.slug}
              className="cs-card"
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ duration: 0.52, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8 }}
            >
              <div className="cs-card__image-wrap">
                <Image
                  src={study.listImage}
                  alt={`${study.client} case study`}
                  fill
                  className="cs-card__image"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="cs-card__image-overlay" aria-hidden="true" />
                <span className="cs-card__sector-badge" style={{ "--accent": study.accentHex } as React.CSSProperties}>
                  {study.sector}
                </span>
                <div className="cs-card__metric-pill">
                  <strong>{study.resultMetric}</strong>
                </div>
              </div>

              <div className="cs-card__body">
                <div className="cs-card__client">
                  <span className="cs-card__abbr" style={{ "--accent": study.accentHex } as React.CSSProperties}>
                    {study.abbr}
                  </span>
                  <span className="cs-card__client-name">{study.client}</span>
                </div>
                <h2 className="cs-card__title">{study.title}</h2>
                <p className="cs-card__result">{study.result}</p>
                <p className="cs-card__summary">{study.summary.slice(0, 140)}…</p>

                <div className="cs-card__tags">
                  {study.services.slice(0, 3).map((svc) => (
                    <span key={svc} className="cs-tag">{svc}</span>
                  ))}
                </div>

                <div className="cs-card__footer">
                  <div className="cs-card__meta">
                    <span>{study.duration}</span>
                    {study.countries && <span>{study.countries}+ countries</span>}
                  </div>
                  <Link href={`/case-studies/${study.slug}`} className="cs-card__cta">
                    Read case study
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* ── Industry strip ─────────────────────────────── */}
      <section className="cs-industries shell">
        <motion.div
          className="cs-industries__inner"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="cs-eyebrow">Industries we&rsquo;ve transformed</p>
          <div className="cs-industries__chips">
            {["Industrial Automation", "Energy & Resources", "Education & HR", "Manufacturing", "Financial Services", "Retail & Consumer"].map((ind) => (
              <span key={ind} className="cs-industry-chip">{ind}</span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── CTA ────────────────────────────────────────── */}
      <section className="cs-cta shell" id="contact-cs">
        <motion.div
          className="cs-cta__inner"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <p className="cs-eyebrow">Start your story</p>
          <h2>Ready to be the next success story?</h2>
          <p>
            Tell us your challenge — migration pressure, payroll complexity, or HR fragmentation —
            and we&rsquo;ll show you exactly how we&rsquo;ve solved it before.
          </p>
          <div className="cs-cta__actions">
            <Link href="/#contact" className="button button--primary">Schedule a Consultation</Link>
            <Link href="/services" className="button button--ghost">Explore Our Services</Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
