import Link from "next/link";
import { NarrativeBackdrop } from "../../components/NarrativeBackdrop";

const phases = [
  {
    label: "Urgency",
    title: "Deadlines, fragmented systems, and risk signals dominate the opening frame.",
    text:
      "The backdrop starts with warmer alert tones and broken horizontal flow, giving the top of the page a countdown quality rather than a calm product-tour aesthetic."
  },
  {
    label: "Migration in progress",
    title: "The middle of the page shows controlled transfer, sequencing, and data movement.",
    text:
      "Network paths become more legible and directional. Trails move left to right so the page reads like a workload moving through a defined process."
  },
  {
    label: "Future state",
    title: "The lower sections resolve into a cleaner, optimized S/4HANA operating model.",
    text:
      "Alert colors recede, the grid stabilizes, and blue-gold harmony replaces fragmentation. The tone shifts from urgency to confidence."
  }
];

export default function MigrationPage() {
  return (
    <main className="story-page story-page--migration">
      <NarrativeBackdrop variant="migration" />

      <section className="hero hero--migration">
        <div className="shell">
          <p className="eyebrow">Migration narrative</p>
          <h1>Countdown, controlled movement, and a visible future state.</h1>
          <p className="lede">
            This page pushes the story harder: urgency at the top, structured migration in the middle, and an
            optimized enterprise system at the bottom.
          </p>
          <div className="hero-actions">
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
          <p className="eyebrow">Transformation complete</p>
          <h2>When the motion settles, the system should feel integrated, observable, and ready to scale.</h2>
          <p>
            The visual language stays grounded in enterprise architecture: structured grids, system modules, signal
            trails, and progression that maps to business readiness.
          </p>
        </section>
      </div>
    </main>
  );
}
