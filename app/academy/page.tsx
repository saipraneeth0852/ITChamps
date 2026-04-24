"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { NarrativeBackdrop } from "../../components/NarrativeBackdrop";

const academyStats = [
  { value: "12", label: "playbooks for SAP teams" },
  { value: "4", label: "learning tracks" },
  { value: "30+", label: "country payroll context" }
];

const featuredLessons = [
  {
    title: "S/4HANA readiness sprints",
    description:
      "A practical structure for discovery, fit-gap review, sequencing, and stakeholder alignment before migration execution starts.",
    image: "/insight-sheet.svg",
    alt: "Readiness checklist illustration"
  },
  {
    title: "Process orchestration workshops",
    description:
      "Visual frameworks for mapping ERP, HR, finance, and payroll dependencies so transformation teams can reduce handoff risk.",
    image: "/process-grid.svg",
    alt: "Process grid illustration"
  },
  {
    title: "Enterprise architecture briefings",
    description:
      "System-level views that help program sponsors explain operating model changes, integration boundaries, and rollout priorities.",
    image: "/system-orbit.svg",
    alt: "Enterprise systems orbit illustration"
  }
];

const learningTracks = [
  {
    title: "Migration Leadership",
    text: "Decision support for CIOs, transformation leads, and PMOs planning ECC to S/4HANA programs."
  },
  {
    title: "AMS and Governance",
    text: "Operating model guidance for support teams responsible for release discipline, incident response, and continuous improvement."
  },
  {
    title: "SuccessFactors Transformation",
    text: "Reference material for HR leaders balancing employee experience goals with integration complexity and compliance requirements."
  },
  {
    title: "Global Payroll Delivery",
    text: "Cross-country payroll execution notes focused on governance, control design, and implementation readiness."
  }
];

export default function AcademyPage() {
  return (
    <main className="story-page academy-page">
      <NarrativeBackdrop variant="home" />

      <header className="topbar shell">
        <Link href="/" className="brand brand--logo" aria-label="ITChamps Software homepage">
          <Image src="/itchamps-logo.png" alt="ITChamps Software logo" width={176} height={56} priority />
        </Link>

        <nav className="topnav" aria-label="Primary">
          <Link href="/">Home</Link>
          <a href="#featured">Featured lessons</a>
          <a href="#tracks">Tracks</a>
          <a href="#contact">Contact</a>
        </nav>

        <Link href="/" className="button button--compact">
          Back to main site
        </Link>
      </header>

      <section className="academy-hero shell">
        <motion.div
          className="academy-hero__copy"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow">ITChamps Academy</p>
          <h1>Enterprise SAP learning, shaped like real delivery work.</h1>
          <p className="lede">
            The academy page now acts as a visual knowledge hub for migration planning, support governance,
            SuccessFactors transformation, and global payroll programs.
          </p>

          <div className="hero-actions">
            <a href="#featured" className="button button--primary">
              Explore featured lessons
            </a>
            <a href="#tracks" className="button button--ghost">
              Review tracks
            </a>
          </div>

          <div className="academy-stats" aria-label="Academy overview">
            {academyStats.map((stat) => (
              <div key={stat.label} className="academy-stat">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="academy-collage"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <article className="academy-collage__card academy-collage__card--tall">
            <div className="academy-collage__meta">
              <span>Migration view</span>
              <span>Flagship lesson</span>
            </div>
            <Image src="/system-orbit.svg" alt="Systems orbit illustration" width={420} height={420} />
          </article>
          <article className="academy-collage__card">
            <div className="academy-collage__meta">
              <span>Workshop asset</span>
              <span>Interactive map</span>
            </div>
            <Image src="/process-grid.svg" alt="Process grid illustration" width={300} height={220} />
          </article>
          <article className="academy-collage__card">
            <div className="academy-collage__meta">
              <span>Executive note</span>
              <span>Checklist brief</span>
            </div>
            <Image src="/insight-sheet.svg" alt="Insight sheet illustration" width={240} height={280} />
          </article>
        </motion.div>
      </section>

      <section id="featured" className="section shell">
        <div className="section-heading">
          <p className="eyebrow">Featured lessons</p>
          <h2>More images, stronger framing, and content blocks that read like a real academy.</h2>
          <p>
            Each card uses a dedicated visual anchor so the route feels designed, not like a plain text holding page.
          </p>
        </div>

        <div className="academy-featured">
          {featuredLessons.map((lesson) => (
            <article key={lesson.title} className="academy-lesson">
              <div className="academy-lesson__image">
                <Image src={lesson.image} alt={lesson.alt} width={320} height={220} />
              </div>
              <div className="academy-lesson__body">
                <p className="eyebrow">Lesson</p>
                <h3>{lesson.title}</h3>
                <p>{lesson.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="tracks" className="section shell section--split academy-split">
        <div className="section-heading">
          <p className="eyebrow">Learning tracks</p>
          <h2>Structured for the people who actually run SAP programs.</h2>
          <p>
            The academy is organized around the same delivery streams that appear on the rest of the site, so the page
            stays consistent with the product story.
          </p>
        </div>

        <div className="academy-track-list">
          {learningTracks.map((track, index) => (
            <article key={track.title} className="academy-track">
              <span className="timeline-index">0{index + 1}</span>
              <div>
                <h3>{track.title}</h3>
                <p>{track.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section shell">
        <div className="academy-gallery">
          <div className="academy-gallery__panel">
            <Image src="/system-orbit.svg" alt="Architecture illustration panel" width={360} height={360} />
          </div>
          <div className="academy-gallery__panel academy-gallery__panel--text">
            <p className="eyebrow">Visual library</p>
            <h2>Illustrated assets now carry the page instead of leaving large empty sections.</h2>
            <p>
              The updated layout uses the existing brand illustrations repeatedly and intentionally, which improves
              depth without needing external image dependencies.
            </p>
          </div>
          <div className="academy-gallery__panel">
            <Image src="/insight-sheet.svg" alt="Checklist preview panel" width={260} height={320} />
          </div>
        </div>
      </section>

      <section id="contact" className="section shell section--last">
        <div className="final-cta">
          <p className="eyebrow">Next step</p>
          <h2>Use the academy as the educational layer behind the main consulting site.</h2>
          <p>
            It now renders correctly, uses stronger typography, and includes enough visual material to feel like part
            of the same product family.
          </p>
          <div className="hero-actions">
            <a href="mailto:info@itchamps.com" className="button button--primary">
              Request academy content
            </a>
            <Link href="/" className="button button--ghost">
              Return home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
