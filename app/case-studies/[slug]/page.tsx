"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { NarrativeBackdrop } from "../../../components/NarrativeBackdrop";
import { caseStudies } from "../data";

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };
const fadeIn  = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
const stagger = { visible: { transition: { staggerChildren: 0.09 } } };

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function CaseStudyPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const study = caseStudies.find((c) => c.slug === slug);

  const stepsRef = useRef<HTMLDivElement>(null);
  const stepsInView = useInView(stepsRef, { once: true, amount: 0.1 });

  const related = caseStudies.filter((c) => c.slug !== slug).slice(0, 2);

  if (!study) {
    return (
      <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "2rem", marginBottom: 16 }}>Case study not found</h1>
          <Link href="/case-studies" className="button button--primary">Back to Case Studies</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="study-page">
      <NarrativeBackdrop variant="home" />

      {/* ── Navbar ─────────────────────────────────────── */}
      <header className="topbar shell">
        <Link href="/" className="brand brand--logo" aria-label="ITChamps Software homepage">
          <Image src="/itchamps-logo.png" alt="ITChamps Software logo" width={176} height={56} priority />
        </Link>
        <nav className="topnav" aria-label="Primary">
          <Link href="/">Home</Link>
          <Link href="/services">Services</Link>
          <Link href="/case-studies">Case Studies</Link>
          <a href="#contact-study">Get in Touch</a>
        </nav>
        <Link href="/#contact" className="button button--primary button--compact topbar-cta">
          Talk to an Expert
        </Link>
      </header>

      {/* ── Hero ───────────────────────────────────────── */}
      <section className="study-hero shell">
        {/* Left: content */}
        <div className="study-hero__content">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="study-hero__breadcrumb" variants={fadeIn}>
              <Link href="/case-studies">Case Studies</Link>
              <span>/</span>
              <span>{study.client}</span>
            </motion.div>

            <motion.div className="study-hero__sector-badge" variants={fadeUp}
              style={{ "--accent": study.accentHex } as React.CSSProperties}
            >
              {study.sector}
            </motion.div>

            <motion.h1 className="study-hero__title" variants={fadeUp}>
              {study.title}
            </motion.h1>

            <motion.p className="study-hero__subtitle" variants={fadeUp}>
              {study.subtitle}
            </motion.p>

            {/* Key outcome */}
            <motion.div className="study-hero__outcome" variants={fadeUp}>
              <div className="study-hero__outcome-metric">{study.resultMetric}</div>
              <div className="study-hero__outcome-label">{study.result}</div>
            </motion.div>

            {/* Meta strip */}
            <motion.div className="study-hero__meta" variants={fadeUp}>
              <div className="study-meta-item">
                <span className="study-meta-item__label">Duration</span>
                <span className="study-meta-item__value">{study.duration}</span>
              </div>
              <div className="study-meta-item">
                <span className="study-meta-item__label">Team size</span>
                <span className="study-meta-item__value">{study.teamSize}</span>
              </div>
              {study.countries && (
                <div className="study-meta-item">
                  <span className="study-meta-item__label">Countries</span>
                  <span className="study-meta-item__value">{study.countries}+</span>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>

        {/* Right: image */}
        <motion.div
          className="study-hero__visual"
          initial={{ opacity: 0, x: 32, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="study-hero__img-wrap">
            <Image
              src={study.heroImage}
              alt={`${study.client} case study`}
              fill
              className="study-hero__img"
              sizes="(max-width: 900px) 100vw, 50vw"
              priority
            />
            <div className="study-hero__img-overlay" aria-hidden="true" />
          </div>
          <motion.div
            className="study-hero__floating-badge"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
            <span>{study.result}</span>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Summary ────────────────────────────────────── */}
      <section className="study-summary shell">
        <motion.div
          className="study-summary__inner"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <p className="study-summary__text">{study.summary}</p>
        </motion.div>
      </section>

      {/* ── Challenge ──────────────────────────────────── */}
      <section className="study-section study-challenge shell">
        <motion.div
          className="study-section__header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="study-label study-label--red">The Challenge</span>
          <h2>{study.challenge.heading}</h2>
          <p>{study.challenge.context}</p>
        </motion.div>

        <div className="study-challenge__grid">
          {study.challenge.points.map((point, i) => (
            <motion.div
              key={point}
              className="study-challenge__card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.42, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
            >
              <div className="study-challenge__num">
                {String(i + 1).padStart(2, "0")}
              </div>
              <p>{point}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Solution ───────────────────────────────────── */}
      <section className="study-section study-solution">
        <div className="shell">
          <motion.div
            className="study-section__header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="study-label study-label--blue">Our Solution</span>
            <h2>{study.solution.heading}</h2>
            <p>{study.solution.description}</p>
          </motion.div>

          {/* Step infographic */}
          <div className="study-steps" ref={stepsRef}>
            {study.solution.steps.map((step, i) => (
              <div key={step.num} className="study-step-wrap">
                <motion.div
                  className="study-step"
                  initial={{ opacity: 0, y: 24 }}
                  animate={stepsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="study-step__badge">{step.num}</div>
                  <strong className="study-step__title">{step.title}</strong>
                  <p className="study-step__desc">{step.desc}</p>
                </motion.div>
                {i < study.solution.steps.length - 1 && (
                  <motion.div
                    className="study-step__connector"
                    initial={{ scaleX: 0 }}
                    animate={stepsInView ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.4, delay: i * 0.1 + 0.3 }}
                    style={{ transformOrigin: "left" }}
                    aria-hidden="true"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Results ────────────────────────────────────── */}
      <section className="study-section study-results shell">
        <motion.div
          className="study-section__header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="study-label study-label--gold">Results</span>
          <h2>Measurable outcomes delivered.</h2>
        </motion.div>

        {/* Metrics grid */}
        <div className="study-metrics">
          {study.results.metrics.map((m, i) => (
            <motion.div
              key={m.label}
              className="study-metric"
              initial={{ opacity: 0, scale: 0.88 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, scale: 1.03 }}
            >
              <div className="study-metric__value">{m.value}</div>
              <div className="study-metric__label">{m.label}</div>
              <p className="study-metric__desc">{m.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Highlights list */}
        <motion.div
          className="study-highlights"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3>Key achievements</h3>
          <ul className="study-highlights__list">
            {study.results.highlights.map((h, i) => (
              <motion.li
                key={h}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.38 }}
              >
                <CheckIcon />
                {h}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </section>

      {/* ── Tech & Services ────────────────────────────── */}
      <section className="study-tech shell">
        <div className="study-tech__grid">
          <motion.div
            className="study-tech__block"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <h3>Services delivered</h3>
            <div className="study-tech__chips">
              {study.services.map((s) => (
                <span key={s} className="study-chip study-chip--blue">{s}</span>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="study-tech__block"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1 }}
          >
            <h3>Technology platforms</h3>
            <div className="study-tech__chips">
              {study.technologies.map((t) => (
                <span key={t} className="study-chip study-chip--gold">{t}</span>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="study-tech__block"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.2 }}
          >
            <h3>Engagement details</h3>
            <div className="study-engagement">
              {[
                { label: "Duration", value: study.duration },
                { label: "Team size", value: study.teamSize },
                ...(study.countries ? [{ label: "Countries", value: `${study.countries}+` }] : []),
              ].map((d) => (
                <div key={d.label} className="study-engagement__item">
                  <span>{d.label}</span>
                  <strong>{d.value}</strong>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Related case studies ───────────────────────── */}
      {related.length > 0 && (
        <section className="study-related shell">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="study-related__heading">More case studies</h2>
          </motion.div>

          <div className="study-related__grid">
            {related.map((r, i) => (
              <motion.div
                key={r.slug}
                className="study-related__card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
              >
                <div className="study-related__img-wrap">
                  <Image src={r.listImage} alt={r.client} fill className="study-related__img" sizes="(max-width: 768px) 100vw, 50vw" />
                  <div className="study-related__img-overlay" />
                </div>
                <div className="study-related__body">
                  <span className="study-related__sector" style={{ "--accent": r.accentHex } as React.CSSProperties}>{r.sector}</span>
                  <h3>{r.title}</h3>
                  <p className="study-related__result">{r.result}</p>
                  <Link href={`/case-studies/${r.slug}`} className="study-related__link">
                    Read case study →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ── CTA ────────────────────────────────────────── */}
      <section className="cs-cta shell" id="contact-study">
        <motion.div
          className="cs-cta__inner"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <p className="cs-eyebrow">Your transformation next</p>
          <h2>Let&rsquo;s build your success story.</h2>
          <p>
            Whether you&rsquo;re facing ECC migration pressure, payroll complexity, or HR fragmentation —
            we&rsquo;ve solved it before. Let&rsquo;s talk about your programme.
          </p>
          <div className="cs-cta__actions">
            <Link href="/#contact" className="button button--primary">Schedule a Consultation</Link>
            <Link href="/case-studies" className="button button--ghost">All Case Studies</Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
