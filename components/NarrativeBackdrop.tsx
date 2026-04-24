"use client";

import { useEffect, useRef } from "react";

type NarrativeBackdropProps = {
  variant: "home" | "migration";
};

const MODULES = [
  { label: "ERP",     x: 14, y: 18 },
  { label: "HR",      x: 58, y: 24 },
  { label: "Finance", x: 24, y: 62 },
  { label: "Payroll", x: 66, y: 66 },
];

const HOME_LINES = [
  "M90 120 C220 80, 270 210, 410 180",
  "M410 180 C560 150, 590 310, 760 260",
  "M200 340 C330 300, 430 420, 590 380",
  "M590 380 C720 350, 840 430, 980 360",
  "M250 490 C390 440, 520 570, 690 520",
];

const MIGRATION_LINES = [
  "M80 200 C260 140, 390 260, 560 220",
  "M560 220 C710 190, 870 280, 1060 210",
  "M120 420 C310 360, 500 480, 720 430",
  "M720 430 C860 400, 980 470, 1120 410",
];

export function NarrativeBackdrop({ variant }: NarrativeBackdropProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let rafId: number;

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
        el.style.setProperty("--story-progress", String(progress));
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const lines = variant === "home" ? HOME_LINES : MIGRATION_LINES;
  const nodes =
    variant === "home"
      ? [[90, 120], [410, 180], [760, 260], [200, 340], [590, 380], [980, 360], [250, 490], [690, 520]]
      : [[80, 200], [560, 220], [1060, 210], [120, 420], [720, 430], [1120, 410]];

  return (
    <div
      ref={ref}
      className={`narrative-backdrop narrative-backdrop--${variant}`}
      aria-hidden="true"
    >
      <div className="story-layer story-layer--mesh" />
      <div className="story-layer story-layer--orb story-layer--orb-a" />
      <div className="story-layer story-layer--orb story-layer--orb-b" />
      <div className="story-layer story-layer--timeline" />

      <svg className="story-network" viewBox="0 0 1200 700" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`flow-gradient-${variant}`} x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor={variant === "home" ? "#67a8ff" : "#ff8f5a"} />
            <stop offset="100%" stopColor="#f2c56b" />
          </linearGradient>
        </defs>
        {lines.map((path, index) => (
          <g key={path} style={{ ["--line-index" as string]: index } as React.CSSProperties}>
            <path className="network-line" d={path} pathLength="1" />
          </g>
        ))}
        {nodes.map(([cx, cy], index) => (
          <circle
            key={`${cx}-${cy}`}
            className="network-node"
            cx={cx}
            cy={cy}
            r={index % 2 === 0 ? 6 : 4}
          />
        ))}
      </svg>

      <div className="story-modules">
        {MODULES.map((module) => (
          <div
            key={module.label}
            className="story-module"
            style={{ left: `${module.x}%`, top: `${module.y}%` }}
          >
            <span>{module.label}</span>
          </div>
        ))}
      </div>

      {variant === "migration" && (
        <div className="migration-alerts">
          <span className="migration-alert migration-alert--red" />
          <span className="migration-alert migration-alert--amber" />
        </div>
      )}
    </div>
  );
}
