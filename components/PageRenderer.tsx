"use client";
import { motion } from "framer-motion";
import { SiteFooter } from "./SiteFooter";
import { SiteNav } from "./SiteNav";
import type { SitePage, SitePageSection } from "../lib/cms/types";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.07 } } };
const inView = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.45 } };

// ── Section renderers ─────────────────────────────────────────────────────────

function ValueGrid({ section }: { section: SitePageSection }) {
  return (
    <section className={`sap-section shell${section.tinted ? " sap-section--tinted" : ""}`} id={section.id}>
      <motion.div className="sap-section-header" {...inView}>
        {section.eyebrow && <p className="eyebrow">{section.eyebrow}</p>}
        {section.title && <h2>{section.title}</h2>}
        {section.subtitle && <p>{section.subtitle}</p>}
      </motion.div>
      <div className="sap-value-grid">
        {(section.items ?? []).map((item, i) => (
          <motion.div key={i} className="sap-value-card" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }}>
            <h3 className="sap-value-card__title">{String(item.title ?? "")}</h3>
            <p>{String(item.body ?? "")}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function ServiceList({ section }: { section: SitePageSection }) {
  return (
    <section className={`sap-section shell${section.tinted ? " sap-section--tinted" : ""}`} id={section.id}>
      <motion.div className="sap-section-header" {...inView}>
        {section.eyebrow && <p className="eyebrow">{section.eyebrow}</p>}
        {section.title && <h2>{section.title}</h2>}
        {section.subtitle && <p>{section.subtitle}</p>}
      </motion.div>
      <div className="sap-service-list">
        {(section.items ?? []).map((item, i) => {
          const tag = item.tag != null ? String(item.tag) : null;
          const headline = item.headline != null ? String(item.headline) : null;
          const body = item.body != null ? String(item.body) : null;
          const bullets = Array.isArray(item.bullets) ? (item.bullets as string[]) : [];
          return (
            <motion.article key={i} id={String(item.id ?? "")} className="sap-service-item" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.08 }}>
              <div className="sap-service-item__header">
                {tag ? <span className="sap-service-item__tag">{tag}</span> : null}
                <h3>{String(item.title ?? "")}</h3>
                {headline ? <p className="sap-service-item__headline">{headline}</p> : null}
              </div>
              <div className="sap-service-item__body">
                {body ? <p>{body}</p> : null}
                {bullets.length > 0 && (
                  <ul className="sap-bullets">
                    {bullets.map((b, j) => <li key={j}>{b}</li>)}
                  </ul>
                )}
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}

function ServiceGrid({ section }: { section: SitePageSection }) {
  return (
    <section className={`sap-section shell${section.tinted ? " sap-section--tinted" : ""}`} id={section.id}>
      <motion.div className="sap-section-header" {...inView}>
        {section.eyebrow && <p className="eyebrow">{section.eyebrow}</p>}
        {section.title && <h2>{section.title}</h2>}
        {section.subtitle && <p>{section.subtitle}</p>}
      </motion.div>
      <div className="sap-service-grid">
        {(section.items ?? []).map((item, i) => (
          <motion.article key={i} className="sap-service-card" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.04 }}>
            <h3>{String(item.title ?? "")}</h3>
            <p>{String(item.desc ?? "")}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function Steps({ section }: { section: SitePageSection }) {
  return (
    <section className={`sap-section shell${section.tinted ? " sap-section--tinted" : ""}`} id={section.id}>
      <motion.div className="sap-section-header" {...inView}>
        {section.eyebrow && <p className="eyebrow">{section.eyebrow}</p>}
        {section.title && <h2>{section.title}</h2>}
        {section.subtitle && <p>{section.subtitle}</p>}
      </motion.div>
      <div className="sap-steps">
        {(section.items ?? []).map((item, i) => (
          <motion.div key={i} className="sap-step" initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}>
            <span className="sap-step__num">{String(item.num ?? String(i + 1).padStart(2, "0"))}</span>
            <div><h3>{String(item.title ?? "")}</h3><p>{String(item.desc ?? "")}</p></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Placements({ section }: { section: SitePageSection }) {
  return (
    <section className={`sap-section shell${section.tinted ? " sap-section--tinted" : ""}`} id={section.id}>
      <motion.div className="sap-section-header" {...inView}>
        {section.eyebrow && <p className="eyebrow">{section.eyebrow}</p>}
        {section.title && <h2>{section.title}</h2>}
        {section.subtitle && <p>{section.subtitle}</p>}
      </motion.div>
      <div className="sap-value-grid">
        {(section.items ?? []).map((item, i) => {
          const label = typeof item === "string" ? item : String(item.title ?? item.name ?? "");
          return (
            <motion.div key={i} className="sap-value-card sap-value-card--center" initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.05 }}>
              <h3 className="sap-value-card__title">{label}</h3>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function Contact({ section }: { section: SitePageSection }) {
  return (
    <section className={`sap-section shell${section.tinted ? " sap-section--tinted" : ""}`} id={section.id ?? "contact"}>
      <div className="shell sap-cta-inner">
        <motion.div className="sap-cta-copy" {...inView}>
          {section.eyebrow && <p className="eyebrow">{section.eyebrow}</p>}
          {section.title && <h2>{section.title}</h2>}
          {section.body && <p>{section.body}</p>}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "1.5rem" }}>
            {section.email && (
              <a href={`mailto:${section.email}`} className="button button--primary">
                {section.cta_label ?? section.email}
              </a>
            )}
            {section.phone && (
              <a href={`tel:${section.phone.replace(/\s/g, "")}`} className="button button--ghost">
                {section.phone}
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SectionRenderer({ section }: { section: SitePageSection }) {
  switch (section.type) {
    case "value-grid":   return <ValueGrid section={section} />;
    case "service-list": return <ServiceList section={section} />;
    case "service-grid": return <ServiceGrid section={section} />;
    case "steps":        return <Steps section={section} />;
    case "placements":   return <Placements section={section} />;
    case "contact":      return <Contact section={section} />;
    default:             return null;
  }
}

// ── Main renderer ─────────────────────────────────────────────────────────────

export function PageRenderer({ page }: { page: SitePage }) {
  const contactHref = page.sections.find((s) => s.type === "contact")?.id
    ? `#${page.sections.find((s) => s.type === "contact")!.id}`
    : `#contact`;

  return (
    <main className="story-page">
      <SiteNav active={`/${page.slug}`} ctaHref={page.hero_cta_href || contactHref} ctaLabel={page.hero_cta_label || "Get in touch"} />

      {/* ── Hero ── */}
      <section className="sap-hero">
        <div className="shell sap-hero__inner">
          <motion.div className="sap-hero__copy" variants={stagger} initial="hidden" animate="visible">
            {page.eyebrow && <motion.p className="eyebrow" variants={fadeUp}>{page.eyebrow}</motion.p>}
            <motion.h1 variants={fadeUp}>{page.title}</motion.h1>
            {page.subtitle && <motion.p className="sap-hero__sub" variants={fadeUp}>{page.subtitle}</motion.p>}
            <motion.div className="sap-hero__actions" variants={fadeUp}>
              <a href={page.hero_cta_href || contactHref} className="button button--primary">{page.hero_cta_label || "Get in touch"}</a>
              <a href={contactHref} className="button button--ghost">Learn more</a>
            </motion.div>
          </motion.div>
          {page.stats.length > 0 && (
            <motion.div className="sap-hero__stats" variants={stagger} initial="hidden" animate="visible">
              {page.stats.map((s, i) => (
                <motion.div key={i} className="sap-stat" variants={fadeUp}>
                  <span className="sap-stat__value">{s.value}</span>
                  <span className="sap-stat__label">{s.label}</span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {page.sections.map((section, i) => (
        <SectionRenderer key={i} section={section} />
      ))}

      <SiteFooter blurb={page.footer_blurb || undefined} />
    </main>
  );
}
