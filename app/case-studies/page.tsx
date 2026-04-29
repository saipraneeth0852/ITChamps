import Image from "next/image";
import Link from "next/link";
import { NarrativeBackdrop } from "../../components/NarrativeBackdrop";
import { getCaseStudies } from "../../lib/cms/store";

export const dynamic = "force-dynamic";

export default async function CaseStudiesPage() {
  const caseStudies = await getCaseStudies("public");
  const featured = caseStudies.find((study) => study.featured) ?? caseStudies[0];
  const sectors = new Set(caseStudies.map((study) => study.sector)).size;
  const zeroCapexStories = caseStudies.filter((study) =>
    study.results.metrics.some((metric) => metric.value.toLowerCase().includes("$0") || metric.description.toLowerCase().includes("existing"))
  ).length;

  return (
    <main className="content-page case-studies-page">
      <NarrativeBackdrop variant="home" />
      <header className="topbar shell">
        <Link href="/" className="brand brand--logo" aria-label="ITChamps Software homepage">
          <Image src="/itchamps-logo.png" alt="ITChamps Software logo" width={176} height={56} priority />
        </Link>
        <nav className="topnav" aria-label="Primary">
          <Link href="/">Home</Link>
          <Link href="/services">Services</Link>
          <Link href="/case-studies" aria-current="page">Case Studies</Link>
          <Link href="/blogs">Blogs</Link>
        </nav>
        <Link href="/#contact" className="button button--primary button--compact topbar-cta">
          Talk to an Expert
        </Link>
      </header>

      <section className="shell content-hero case-studies-hero-compact">
        <div className="content-hero__copy">
          <p className="cs-eyebrow">Case Studies</p>
          <h1>Structured transformation stories, not just project summaries.</h1>
          <p>Explore how ITChamps approaches industrial optimization, compliance, maintenance, and manufacturing intelligence through outcome-led case studies.</p>
          <div className="case-studies-hero-support">
            <div className="case-studies-intro__stats">
              <div>
                <strong>{caseStudies.length}</strong>
                <span>Published stories</span>
              </div>
              <div>
                <strong>{sectors}</strong>
                <span>Industry tracks</span>
              </div>
              <div>
                <strong>{zeroCapexStories}</strong>
                <span>Zero-CAPEX transformations</span>
              </div>
            </div>
            <div className="case-studies-hero-notes">
              <div>
                <strong>What you will find</strong>
                <ul>
                  <li>Challenge and baseline context</li>
                  <li>Solution blueprint and delivery path</li>
                  <li>Measured outcomes with reusable lessons</li>
                </ul>
              </div>
              <Link href="#all-case-studies" className="button button--ghost">Browse all case studies</Link>
            </div>
          </div>
        </div>
        {featured ? (
          <article className="case-studies-hero-card">
            <div className="case-studies-hero-card__image">
              <Image src={featured.heroImage} alt={featured.title} fill sizes="(max-width: 900px) 100vw, 36vw" style={{ objectFit: "cover" }} />
            </div>
            <div className="case-studies-hero-card__body">
              <p className="cs-eyebrow">Featured Case Study</p>
              <div className="content-card__meta">
                <span>{featured.client}</span>
                <span>{featured.sector}</span>
              </div>
              <h2 className="case-studies-hero-card__title">{featured.title}</h2>
              <p className="case-studies-hero-card__summary">{featured.summary}</p>
              <div className="content-card__result">
                <strong>{featured.resultMetric}</strong>
                <span>{featured.result}</span>
              </div>
              <Link href={`/case-studies/${featured.slug}`} className="button button--primary">Open featured case study</Link>
            </div>
          </article>
        ) : null}
      </section>

      <section id="all-case-studies" className="shell case-studies-catalog">
        <div className="section-line section-line--catalog">
          <div className="case-studies-catalog__heading">
            <p className="cs-eyebrow">All Case Studies</p>
            <h2>Browse by outcome, sector, and engagement type.</h2>
          </div>
          <p className="case-studies-catalog__note">Every card leads to a dedicated case-study page with challenge, solution, and measurable business impact.</p>
        </div>

        <div className="content-grid case-studies-grid">
          {caseStudies.filter((study) => study.id !== featured?.id).map((study) => (
            <article key={study.id} className="content-card content-card--case">
              <div className="content-card__visual">
                <Image src={study.listImage || study.heroImage} alt={study.title} fill sizes="(max-width: 900px) 100vw, 32vw" style={{ objectFit: "cover" }} />
              </div>
              <div className="content-card__meta">
                <span>{study.client}</span>
                <span>{study.sector}</span>
              </div>
              <h2 className="case-study-card__title">{study.title}</h2>
              <p className="case-study-card__summary">{study.summary}</p>
              <div className="content-card__result">
                <strong>{study.resultMetric}</strong>
                <span>{study.result}</span>
              </div>
              <div className="content-card__detail-row">
                <span>{study.duration}</span>
                <span>{study.teamSize}</span>
              </div>
              <div className="content-card__tags">
                {study.services.slice(0, 3).map((service) => <span key={service}>{service}</span>)}
              </div>
              <Link href={`/case-studies/${study.slug}`} className="button button--ghost">Read case study</Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
