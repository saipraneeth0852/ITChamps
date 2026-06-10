export type PublishStatus = "draft" | "published";

export interface CaseStudyMetric {
  value: string;
  label: string;
  description: string;
}

export interface CaseStudyStep {
  num: string;
  title: string;
  desc: string;
}

export interface CaseStudyRecord {
  id: string;
  slug: string;
  client: string;
  abbr: string;
  featured?: boolean;
  sector: string;
  accentHex: string;
  title: string;
  subtitle: string;
  heroImage: string;
  listImage: string;
  result: string;
  resultMetric: string;
  summary: string;
  challenge: {
    heading: string;
    context: string;
    points: string[];
  };
  solution: {
    heading: string;
    description: string;
    steps: CaseStudyStep[];
  };
  results: {
    metrics: CaseStudyMetric[];
    highlights: string[];
  };
  services: string[];
  technologies: string[];
  duration: string;
  teamSize: string;
  countries?: number;
  status: PublishStatus;
  createdAt: string;
  updatedAt: string;
}

export interface BlogRecord {
  id: string;
  slug: string;
  featured?: boolean;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  coverImage: string;
  readTime: string;
  publishedAt: string;
  tags: string[];
  content: string;
  status: PublishStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CMSData {
  caseStudies: CaseStudyRecord[];
  blogs: BlogRecord[];
}

/* ── Site pages (services / products / training) ─────────────── */

export interface SitePageStat {
  value: string;
  label: string;
}

export type SitePageSectionType =
  | "value-grid"
  | "service-list"
  | "service-grid"
  | "steps"
  | "placements"
  | "contact";

export type SitePageType = "service" | "product" | "training";

export interface SitePageSection {
  type: SitePageSectionType;
  tinted?: boolean;
  id?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  items?: Record<string, unknown>[];
  body?: string;
  email?: string;
  phone?: string;
  cta_label?: string;
  cta_href?: string;
}

export interface SitePage {
  id: string;
  slug: string;
  type: SitePageType;
  nav_label: string;
  title: string;
  subtitle: string;
  eyebrow: string;
  hero_cta_href: string;
  hero_cta_label: string;
  footer_blurb: string;
  stats: SitePageStat[];
  sections: SitePageSection[];
  status: PublishStatus;
  created_at: string;
  updated_at: string;
}
