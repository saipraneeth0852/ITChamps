"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ContactSection } from "../../components/ContactSection";
import { NarrativeBackdrop } from "../../components/NarrativeBackdrop";

const academyStats = [
  { value: "4", label: "self-paced leadership tracks" },
  { value: "4", label: "learning tracks" },
  { value: "45+", label: "country operations context" }
];

const featuredLessons = [
  {
    title: "S/4HANA migration leadership",
    description:
      "Strategy-level guidance on migration approach, phasing, governance, and organizational change for CIOs and transformation leads.",
    image: "/insight-sheet.svg",
    alt: "Readiness checklist illustration"
  },
  {
    title: "AMS operating model design",
    description:
      "A practical operating model for SLA design, incident management, staffing, and continuous improvement in SAP support organizations.",
    image: "/process-grid.svg",
    alt: "Process grid illustration"
  },
  {
    title: "Global payroll governance",
    description:
      "Execution-focused guidance for payroll leaders managing compliance, phasing, data quality, and multi-country operations.",
    image: "/system-orbit.svg",
    alt: "Enterprise systems orbit illustration"
  }
];

const learningTracks = [
  {
    title: "Migration Leadership",
    text: "Guidance for CIOs, CFOs, and PMOs planning ECC-to-S/4HANA migration strategy, governance, phasing, and business case decisions."
  },
  {
    title: "AMS and Governance",
    text: "Operating model guidance for support leaders building mature, SLA-driven SAP AMS organizations."
  },
  {
    title: "SuccessFactors Transformation",
    text: "Reference material for HR leaders designing HXM transformation, employee data governance, and adoption programs."
  },
  {
    title: "Global Payroll Delivery",
    text: "Practical learning for payroll leaders managing compliance, process design, system selection, and execution across jurisdictions."
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
          <a href="#contact-form">Contact</a>
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
          <h1>SAP Leadership Academy</h1>
          <p className="lede">
            Strategic learning tracks for enterprise leaders managing SAP transformations. Self-paced, curated content for CIOs, CFOs, PMOs, and HR leaders.
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
          <h2>Leadership tracks built around real SAP transformation decisions.</h2>
          <p>
            Each featured lesson reflects the same delivery streams represented across the website: migration, support governance, HR transformation, and global payroll execution.
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
          <h2>Structured for the people who sponsor and run SAP programs.</h2>
          <p>
            The academy is organized around the same strategic workstreams as the consulting business, so leaders can move from insight to execution planning without context switching.
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
            <h2>Curated content designed for enterprise transformation leadership.</h2>
            <p>
              Use the academy as a self-paced learning layer for migration leadership, AMS design, SuccessFactors transformation, and global payroll governance.
            </p>
          </div>
          <div className="academy-gallery__panel">
            <Image src="/insight-sheet.svg" alt="Checklist preview panel" width={260} height={320} />
          </div>
        </div>
      </section>

      <ContactSection
        eyebrow="Next step"
        title="Plan academy access, cohorts, or a leadership enablement program."
        description="Tell us which learning tracks matter most to your organization. We can align the academy to migration, support governance, HXM transformation, or global payroll capability building."
        source="academy"
        accent="academy"
      />
    </main>
  );
}
