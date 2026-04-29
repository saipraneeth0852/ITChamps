"use client";

type NarrativeBackdropProps = {
  variant: "home" | "migration";
};

export function NarrativeBackdrop({ variant }: NarrativeBackdropProps) {
  return (
    <div className={`narrative-backdrop narrative-backdrop--${variant}`} aria-hidden="true">
      <svg className="story-globe" viewBox="0 0 1200 700" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`globe-gradient-${variant}`} x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor={variant === "home" ? "#4f8edc" : "#d67759"} />
            <stop offset="100%" stopColor="#d7a438" />
          </linearGradient>
        </defs>
        <ellipse className="globe-outline" cx="860" cy="350" rx="360" ry="360" />
        <ellipse className="globe-lat" cx="860" cy="350" rx="360" ry="110" />
        <ellipse className="globe-lat" cx="860" cy="350" rx="360" ry="200" />
        <ellipse className="globe-lat" cx="860" cy="350" rx="360" ry="285" />
        <ellipse className="globe-meridian" cx="860" cy="350" rx="120" ry="360" />
        <ellipse className="globe-meridian" cx="860" cy="350" rx="220" ry="360" />
        <ellipse className="globe-meridian" cx="860" cy="350" rx="305" ry="360" />
      </svg>
    </div>
  );
}
