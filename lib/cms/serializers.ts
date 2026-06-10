import type { BlogRecord, CaseStudyMetric, CaseStudyRecord, CaseStudyStep, PublishStatus, SitePage, SitePageSection, SitePageStat, SitePageType } from "./types";

function toLines(value: unknown) {
  return typeof value === "string"
    ? value.split("\n").map((item) => item.trim()).filter(Boolean)
    : [];
}

function toCsv(value: unknown) {
  return typeof value === "string"
    ? value.split(",").map((item) => item.trim()).filter(Boolean)
    : [];
}

function toSteps(value: unknown): CaseStudyStep[] {
  return toLines(value).map((line, index) => {
    const [num, title, ...descParts] = line.split("|").map((part) => part.trim());
    return {
      num: num || String(index + 1).padStart(2, "0"),
      title: title || "Untitled step",
      desc: descParts.join(" | ") || "",
    };
  });
}

function toMetrics(value: unknown): CaseStudyMetric[] {
  return toLines(value).map((line) => {
    const [metricValue, label, ...descriptionParts] = line.split("|").map((part) => part.trim());
    return {
      value: metricValue || "",
      label: label || "",
      description: descriptionParts.join(" | ") || "",
    };
  });
}

function toStatus(value: unknown): PublishStatus {
  return value === "draft" ? "draft" : "published";
}

function toBoolean(value: unknown) {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    return normalized === "true" || normalized === "yes" || normalized === "featured";
  }
  return false;
}

type CMSPayload = Record<string, unknown>;

export function parseCaseStudyPayload(body: CMSPayload): Omit<CaseStudyRecord, "id" | "createdAt" | "updatedAt"> {
  return {
    slug: String(body.slug ?? "").trim(),
    client: String(body.client ?? "").trim(),
    abbr: String(body.abbr ?? "").trim(),
    featured: toBoolean(body.featured),
    sector: String(body.sector ?? "").trim(),
    accentHex: String(body.accentHex ?? "#007bb5").trim(),
    title: String(body.title ?? "").trim(),
    subtitle: String(body.subtitle ?? "").trim(),
    heroImage: String(body.heroImage ?? "").trim(),
    listImage: String(body.listImage ?? "").trim(),
    result: String(body.result ?? "").trim(),
    resultMetric: String(body.resultMetric ?? "").trim(),
    summary: String(body.summary ?? "").trim(),
    challenge: {
      heading: String(body.challengeHeading ?? "").trim(),
      context: String(body.challengeContext ?? "").trim(),
      points: toLines(body.challengePoints),
    },
    solution: {
      heading: String(body.solutionHeading ?? "").trim(),
      description: String(body.solutionDescription ?? "").trim(),
      steps: toSteps(body.solutionSteps),
    },
    results: {
      metrics: toMetrics(body.resultMetrics),
      highlights: toLines(body.resultHighlights),
    },
    services: toCsv(body.services),
    technologies: toCsv(body.technologies),
    duration: String(body.duration ?? "").trim(),
    teamSize: String(body.teamSize ?? "").trim(),
    countries: body.countries ? Number(body.countries) : undefined,
    status: toStatus(body.status),
  };
}

export function parsePagePayload(body: CMSPayload): Omit<SitePage, "id" | "created_at" | "updated_at"> {
  const rawStats = typeof body.stats === "string"
    ? body.stats.split("\n").map((l) => l.trim()).filter(Boolean).map((l) => {
        const [value, ...labelParts] = l.split("|").map((p) => p.trim());
        return { value: value ?? "", label: labelParts.join(" | ") ?? "" } as SitePageStat;
      })
    : Array.isArray(body.stats) ? (body.stats as SitePageStat[]) : [];

  let sections: SitePageSection[] = [];
  try {
    const raw = typeof body.sections === "string" ? body.sections : JSON.stringify(body.sections ?? []);
    sections = JSON.parse(raw) as SitePageSection[];
  } catch {
    sections = [];
  }

  const typeVal = String(body.type ?? "service").trim();
  const type: SitePageType = typeVal === "product" ? "product" : typeVal === "training" ? "training" : "service";

  return {
    slug: String(body.slug ?? "").trim(),
    type,
    nav_label: String(body.nav_label ?? "").trim(),
    title: String(body.title ?? "").trim(),
    subtitle: String(body.subtitle ?? "").trim(),
    eyebrow: String(body.eyebrow ?? "").trim(),
    hero_cta_href: String(body.hero_cta_href ?? "#contact").trim(),
    hero_cta_label: String(body.hero_cta_label ?? "Get in touch").trim(),
    footer_blurb: String(body.footer_blurb ?? "").trim(),
    stats: rawStats,
    sections,
    status: toStatus(body.status),
  };
}

export function parseBlogPayload(body: CMSPayload): Omit<BlogRecord, "id" | "createdAt" | "updatedAt"> {
  return {
    slug: String(body.slug ?? "").trim(),
    featured: toBoolean(body.featured),
    title: String(body.title ?? "").trim(),
    excerpt: String(body.excerpt ?? "").trim(),
    category: String(body.category ?? "").trim(),
    author: String(body.author ?? "").trim(),
    coverImage: String(body.coverImage ?? "").trim(),
    readTime: String(body.readTime ?? "").trim(),
    publishedAt: String(body.publishedAt ?? "").trim(),
    tags: toCsv(body.tags),
    content: String(body.content ?? "").trim(),
    status: toStatus(body.status),
  };
}
