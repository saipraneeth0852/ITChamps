import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { NarrativeBackdrop } from "../../../components/NarrativeBackdrop";
import { getCaseStudies, getCaseStudyBySlug } from "../../../lib/cms/store";

export const dynamic = "force-dynamic";

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);
  const related = (await getCaseStudies("public")).filter((item) => item.slug !== slug).slice(0, 3);

  if (!study) {
    notFound();
  }

  return (
    <main className="content-page">
      <NarrativeBackdrop variant="home" />
      <header className="topbar shell">
        <Link href="/" className="brand brand--logo" aria-label="ITChamps Software homepage">
          <Image src="/itchamps-logo.png" alt="ITChamps Software logo" width={176} height={56} priority />
        </Link>
        <nav className="topnav" aria-label="Primary">
          <Link href="/">Home</Link>
          <Link href="/services">Services</Link>
          <Link href="/case-studies">Case Studies</Link>
          <Link href="/blogs">Blogs</Link>
        </nav>
        <Link href="/#contact" className="button button--primary button--compact topbar-cta">
          Talk to an Expert
        </Link>
      </header>

      <article className="shell article-shell">
        <section className="story-hero" style={{ "--story-accent": study.accentHex } as CSSProperties}>
          <div className="story-hero__copy">
            <Link href="/case-studies" className="article-back">Back to case studies</Link>
            <div className="content-card__meta">
              <span>{study.client}</span>
              <span>{study.sector}</span>
            </div>
            <h1>{study.title}</h1>
            <p className="story-hero__lede">{study.subtitle}</p>
            <div className="story-hero__metric">
              <strong>{study.resultMetric}</strong>
              <span>{study.result}</span>
            </div>
            <div className="story-hero__facts">
              <span>Duration: {study.duration}</span>
              <span>Team: {study.teamSize}</span>
              {study.countries ? <span>Countries: {study.countries}+</span> : null}
            </div>
          </div>
          <div className="story-hero__media">
            <Image src={study.heroImage} alt={study.title} fill sizes="(max-width: 900px) 100vw, 48vw" style={{ objectFit: "cover" }} priority />
          </div>
        </section>

        <section className="story-overview-grid">
          <section className="story-summary">
            <p>{study.summary}</p>
          </section>

          <aside className="story-overview-card">
            <p className="cs-eyebrow">Engagement Overview</p>
            <div className="story-overview-card__rows">
              <div>
                <span>Client</span>
                <strong>{study.client}</strong>
              </div>
              <div>
                <span>Sector</span>
                <strong>{study.sector}</strong>
              </div>
              <div>
                <span>Duration</span>
                <strong>{study.duration}</strong>
              </div>
              <div>
                <span>Team</span>
                <strong>{study.teamSize}</strong>
              </div>
            </div>
            <div className="content-card__tags">
              {study.technologies.slice(0, 4).map((tech) => <span key={tech}>{tech}</span>)}
            </div>
          </aside>
        </section>

        <section className="story-panel-grid story-panel-grid--structured">
          <section className="story-panel story-panel--challenge">
            <p className="cs-eyebrow">The Challenge</p>
            <h2>{study.challenge.heading}</h2>
            <p>{study.challenge.context}</p>
            <ul className="story-list">
              {study.challenge.points.map((point) => <li key={point}>{point}</li>)}
            </ul>
          </section>

          <section className="story-panel story-panel--solution">
            <p className="cs-eyebrow">The Solution</p>
            <h2>{study.solution.heading}</h2>
            <p>{study.solution.description}</p>
            <div className="story-steps">
              {study.solution.steps.map((step) => (
                <div key={`${step.num}-${step.title}`} className="story-step-card">
                  <span>{step.num}</span>
                  <strong>{step.title}</strong>
                  <p>{step.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </section>

        <section className="story-panel">
          <p className="cs-eyebrow">Results</p>
          <h2>Measured business impact</h2>
          <div className="story-metrics">
            {study.results.metrics.map((metric) => (
              <div key={metric.label} className="story-metric-card">
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
                <p>{metric.description}</p>
              </div>
            ))}
          </div>
          <div className="story-columns">
            <div>
              <h3>Highlights</h3>
              <ul className="story-list">
                {study.results.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
              </ul>
            </div>
            <div>
              <h3>Services and technology</h3>
              <div className="content-card__tags">
                {study.services.map((service) => <span key={service}>{service}</span>)}
                {study.technologies.map((tech) => <span key={tech}>{tech}</span>)}
              </div>
            </div>
          </div>
        </section>

        {related.length ? (
          <section className="story-panel">
            <div className="section-line">
              <div>
                <p className="cs-eyebrow">More Stories</p>
                <h2>Related case studies</h2>
              </div>
              <Link href="/case-studies" className="button button--ghost">See all</Link>
            </div>
            <div className="content-grid content-grid--nested">
              {related.map((item) => (
                <article key={item.id} className="content-card">
                  <div className="content-card__visual">
                    <Image src={item.listImage || item.heroImage} alt={item.title} fill sizes="(max-width: 900px) 100vw, 30vw" style={{ objectFit: "cover" }} />
                  </div>
                  <div className="content-card__meta">
                    <span>{item.client}</span>
                    <span>{item.sector}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>
                  <Link href={`/case-studies/${item.slug}`} className="button button--ghost">Read case study</Link>
                </article>
              ))}
            </div>
          </section>
        ) : null}
      </article>
    </main>
  );
}
