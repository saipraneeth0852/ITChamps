"use client";

import { motion, MotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

type NarrativeBackdropProps = {
  variant: "home" | "migration";
};

const MODULES = [
  { label: "ERP", x: 14, y: 18 },
  { label: "HR", x: 58, y: 24 },
  { label: "Finance", x: 24, y: 62 },
  { label: "Payroll", x: 66, y: 66 }
];

const HOME_LINES = [
  "M90 120 C220 80, 270 210, 410 180",
  "M410 180 C560 150, 590 310, 760 260",
  "M200 340 C330 300, 430 420, 590 380",
  "M590 380 C720 350, 840 430, 980 360",
  "M250 490 C390 440, 520 570, 690 520"
];

const MIGRATION_LINES = [
  "M80 200 C260 140, 390 260, 560 220",
  "M560 220 C710 190, 870 280, 1060 210",
  "M120 420 C310 360, 500 480, 720 430",
  "M720 430 C860 400, 980 470, 1120 410"
];

function NetworkPath({
  path,
  index,
  progress,
  allowComplexMotion
}: {
  path: string;
  index: number;
  progress: MotionValue<number>;
  allowComplexMotion: boolean;
}) {
  const pathLength = useTransform(progress, [0, 1], [0.12 + index * 0.04, 0.84 + index * 0.02]);
  const opacity = useTransform(progress, [0, 1], [0.12, 0.64]);

  return (
    <g>
      <motion.path className="network-line" d={path} pathLength="1" style={{ pathLength, opacity }} />
      {allowComplexMotion ? (
        <circle className="network-packet" r="5">
          <animateMotion dur={`${14 + index * 2}s`} repeatCount="indefinite" path={path} />
        </circle>
      ) : null}
    </g>
  );
}

function ModuleCard({
  label,
  x,
  y,
  index,
  progress
}: {
  label: string;
  x: number;
  y: number;
  index: number;
  progress: MotionValue<number>;
}) {
  const translateX = useTransform(progress, [0, 1], [index % 2 === 0 ? -24 + index * 8 : 22 - index * 6, 0]);
  const translateY = useTransform(progress, [0, 1], [index < 2 ? 24 - index * 8 : -18 + index * 7, 0]);
  const opacity = useTransform(progress, [0, 1], [0.24, 0.54]);
  const scale = useTransform(progress, [0, 1], [0.96, 1]);

  return (
    <motion.div className="story-module" style={{ left: `${x}%`, top: `${y}%`, x: translateX, y: translateY, opacity, scale }}>
      <span>{label}</span>
    </motion.div>
  );
}

function StoryTrail({
  index,
  variant,
  progress,
  velocity
}: {
  index: number;
  variant: "home" | "migration";
  progress: MotionValue<number>;
  velocity: MotionValue<number>;
}) {
  const x = useTransform(progress, [0, 1], [0, variant === "home" ? 26 + index * 6 : 70 + index * 8]);
  const y = useTransform(progress, [0, 1], [18 - index * 2, variant === "home" ? -10 - index : 0]);
  const opacity = useTransform(progress, [0, 1], [0.04, 0.22]);
  const scaleX = useTransform(velocity, [0, 1], [1, 1.08]);

  return (
    <motion.span
      className="story-trail"
      style={{
        left: `${10 + index * 12}%`,
        top: `${12 + (index % 3) * 24}%`,
        x,
        y,
        opacity,
        scaleX
      }}
    />
  );
}

export function NarrativeBackdrop({ variant }: NarrativeBackdropProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const allowComplexMotion = !prefersReducedMotion && !isMobile;
  const { scrollYProgress, scrollY } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 24,
    mass: 0.5
  });
  const velocity = useSpring(scrollY, {
    stiffness: 90,
    damping: 30,
    mass: 0.5
  });
  const lines = variant === "home" ? HOME_LINES : MIGRATION_LINES;
  const meshY = useTransform(progress, [0, 1], ["0vh", allowComplexMotion ? "-3vh" : "-1vh"]);
  const networkY = useTransform(progress, [0, 1], ["0vh", allowComplexMotion ? "-3.5vh" : "-1vh"]);
  const leftOrbY = useTransform(progress, [0, 1], ["0vh", allowComplexMotion ? "-3vh" : "-1vh"]);
  const rightOrbY = useTransform(progress, [0, 1], ["0vh", allowComplexMotion ? "-2vh" : "-0.5vh"]);
  const timelineX = useTransform(progress, [0, 1], ["-1%", allowComplexMotion ? "2%" : "0.5%"]);
  const timelineOpacity = useTransform(progress, [0, 1], variant === "home" ? [0.03, 0.1] : [0.18, 0.07]);
  const networkOpacity = useTransform(progress, [0, 1], [0.16, allowComplexMotion ? 0.54 : 0.38]);
  const trailShift = useTransform(progress, [0, 1], [0, 1]);
  const trailSpeed = useTransform(velocity, (latest) => {
    const normalized = Math.min(Math.abs(latest) / 1800, 1);
    return 1 - normalized * 0.55;
  });

  return (
    <motion.div
      className={`narrative-backdrop narrative-backdrop--${variant}`}
      aria-hidden="true"
      style={
        {
          ["--story-progress" as string]: progress,
          ["--story-velocity" as string]: trailSpeed
        } as React.CSSProperties
      }
    >
      <motion.div className="story-layer story-layer--mesh" style={{ y: meshY }} />
      <motion.div className="story-layer story-layer--orb story-layer--orb-a" style={{ y: leftOrbY }} />
      <motion.div className="story-layer story-layer--orb story-layer--orb-b" style={{ y: rightOrbY }} />
      <motion.div className="story-layer story-layer--timeline" style={{ x: timelineX, opacity: timelineOpacity }} />

      <motion.svg className="story-network" viewBox="0 0 1200 700" preserveAspectRatio="none" style={{ y: networkY, opacity: networkOpacity }}>
        <defs>
          <linearGradient id={`flow-gradient-${variant}`} x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor={variant === "home" ? "#67a8ff" : "#ff8f5a"} />
            <stop offset="100%" stopColor="#f2c56b" />
          </linearGradient>
        </defs>
        {lines.map((path, index) => (
          <NetworkPath key={path} path={path} index={index} progress={progress} allowComplexMotion={allowComplexMotion} />
        ))}
        {(variant === "home"
          ? [
              [90, 120],
              [410, 180],
              [760, 260],
              [200, 340],
              [590, 380],
              [980, 360],
              [250, 490],
              [690, 520]
            ]
          : [
              [80, 200],
              [560, 220],
              [1060, 210],
              [120, 420],
              [720, 430],
              [1120, 410]
            ]
        ).map(([cx, cy], index) => (
          <circle key={`${cx}-${cy}`} className="network-node" cx={cx} cy={cy} r={index % 2 === 0 ? 6 : 4} />
        ))}
      </motion.svg>

      <div className="story-modules">
        {MODULES.map((module, index) => (
          <ModuleCard key={module.label} label={module.label} x={module.x} y={module.y} index={index} progress={progress} />
        ))}
      </div>

      <div className="story-trails">
        {allowComplexMotion
          ? Array.from({ length: variant === "home" ? 4 : 5 }).map((_, index) => (
          <StoryTrail key={index} index={index} variant={variant} progress={trailShift} velocity={trailSpeed} />
            ))
          : null}
      </div>

      {variant === "migration" ? (
        <div className="migration-alerts">
          <span className="migration-alert migration-alert--red" />
          <span className="migration-alert migration-alert--amber" />
        </div>
      ) : null}
    </motion.div>
  );
}
