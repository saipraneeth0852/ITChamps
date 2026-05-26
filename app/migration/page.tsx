import Link from "next/link";
import { NarrativeBackdrop } from "../../components/NarrativeBackdrop";

const phases = [
  {
    label: "Readiness",
    title: "Validate scope, custom complexity, and deadline risk before committing the roadmap.",
    text:
      "Start with landscape diagnostics: ECC footprint, integration dependencies, data quality, and business-critical release windows. The objective is clarity before execution."
  },
  {
    label: "Execution",
    title: "Run migration as a controlled program with governance gates and cutover discipline.",
    text:
      "Sequence work by business value and risk. Operate with fit-gap control, testing rigor, release governance, and decision checkpoints visible to business and IT leadership."
  },
  {
    label: "Stabilization",
    title: "Transition into a resilient S/4HANA operating model with measurable adoption.",
    text:
      "Post go-live, focus on hypercare, performance tuning, user adoption, and control monitoring. The outcome is a stable platform ready for scale, automation, and innovation."
  }
];

export default function MigrationPage() {
  return (
    <main className="story-page story-page--migration">
      <NarrativeBackdrop variant="migration" />

      <section className="hero hero--migration">
        <div className="shell">
          <p className="eyebrow">Migration hub</p>
          <h1>S/4HANA migration planning, governance, and execution in one view.</h1>
          <p className="lede">
            Use this page as an executive snapshot: what to validate first, how to control delivery risk during
            migration, and what must be stabilized after go-live.
          </p>
          <div className="hero-actions">
            <Link href="/sap-solutions#sap-playbook" className="button button--primary">
              Open migration playbook
            </Link>
            <Link href="/sap-solutions#contact-sap" className="button button--ghost">
              Request readiness assessment
            </Link>
            <Link href="/" className="button button--ghost">
              Back to homepage
            </Link>
          </div>
        </div>
      </section>

      <div className="story-sections shell">
        {phases.map((phase, index) => (
          <section key={phase.label} className="story-card story-card--timeline">
            <div className="timeline-index">0{index + 1}</div>
            <div>
              <p className="eyebrow">{phase.label}</p>
              <h2>{phase.title}</h2>
              <p>{phase.text}</p>
            </div>
          </section>
        ))}

        <section className="cta-card">
          <p className="eyebrow">Program checkpoints</p>
          <h2>Migration programs succeed when decisions are governed and transition risk is visible.</h2>
          <p>
            Align business owners, IT leadership, and SI teams around phase-gates, testing readiness, and cutover
            controls. Treat migration as an operating model change, not only a technical conversion.
          </p>
        </section>
      </div>
    </main>
  );
}
