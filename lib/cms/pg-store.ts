import { getPool } from "../db";
import type { BlogRecord, CaseStudyRecord, PublishStatus, SitePage, SitePageStat, SitePageSection } from "./types";

// ── helpers ───────────────────────────────────────────────────────────────────

function rowToCase(row: Record<string, unknown>): CaseStudyRecord {
  return {
    id: row.id as string,
    slug: row.slug as string,
    client: row.client as string,
    abbr: row.abbr as string,
    featured: Boolean(row.featured),
    sector: row.sector as string,
    accentHex: row.accent_hex as string,
    title: row.title as string,
    subtitle: row.subtitle as string,
    heroImage: row.hero_image as string,
    listImage: row.list_image as string,
    result: row.result as string,
    resultMetric: row.result_metric as string,
    summary: row.summary as string,
    challenge: row.challenge as CaseStudyRecord["challenge"],
    solution: row.solution as CaseStudyRecord["solution"],
    results: row.results as CaseStudyRecord["results"],
    services: row.services as string[],
    technologies: row.technologies as string[],
    duration: row.duration as string,
    teamSize: row.team_size as string,
    countries: row.countries as number | undefined,
    status: row.status as PublishStatus,
    createdAt: (row.created_at as Date).toISOString(),
    updatedAt: (row.updated_at as Date).toISOString(),
  };
}

function rowToBlog(row: Record<string, unknown>): BlogRecord {
  return {
    id: row.id as string,
    slug: row.slug as string,
    featured: Boolean(row.featured),
    title: row.title as string,
    excerpt: row.excerpt as string,
    category: row.category as string,
    author: row.author as string,
    coverImage: row.cover_image as string,
    readTime: row.read_time as string,
    publishedAt: row.published_at as string,
    tags: row.tags as string[],
    content: row.content as string,
    status: row.status as PublishStatus,
    createdAt: (row.created_at as Date).toISOString(),
    updatedAt: (row.updated_at as Date).toISOString(),
  };
}

// ── case studies ──────────────────────────────────────────────────────────────

export async function pgGetCaseStudies(scope: "public" | "admin"): Promise<CaseStudyRecord[]> {
  const pool = getPool();
  const { rows } = scope === "admin"
    ? await pool.query("SELECT * FROM case_studies ORDER BY updated_at DESC")
    : await pool.query("SELECT * FROM case_studies WHERE status = 'published' ORDER BY updated_at DESC");
  return rows.map(rowToCase);
}

export async function pgGetCaseStudyBySlug(slug: string): Promise<CaseStudyRecord | null> {
  const { rows } = await getPool().query(
    "SELECT * FROM case_studies WHERE slug = $1 AND status = 'published' LIMIT 1",
    [slug],
  );
  return rows[0] ? rowToCase(rows[0]) : null;
}

export async function pgGetCaseStudyById(id: string): Promise<CaseStudyRecord | null> {
  const { rows } = await getPool().query(
    "SELECT * FROM case_studies WHERE id = $1 LIMIT 1",
    [id],
  );
  return rows[0] ? rowToCase(rows[0]) : null;
}

export async function pgCreateCaseStudy(record: CaseStudyRecord): Promise<CaseStudyRecord> {
  const pool = getPool();
  if (record.featured) {
    await pool.query("UPDATE case_studies SET featured = FALSE WHERE featured = TRUE");
  }
  await pool.query(
    `INSERT INTO case_studies
      (id,slug,client,abbr,featured,sector,accent_hex,title,subtitle,
       hero_image,list_image,result,result_metric,summary,challenge,
       solution,results,services,technologies,duration,team_size,
       countries,status,created_at,updated_at)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25)`,
    [
      record.id, record.slug, record.client, record.abbr, record.featured,
      record.sector, record.accentHex, record.title, record.subtitle,
      record.heroImage, record.listImage, record.result, record.resultMetric,
      record.summary, JSON.stringify(record.challenge), JSON.stringify(record.solution),
      JSON.stringify(record.results), record.services, record.technologies,
      record.duration, record.teamSize, record.countries ?? null, record.status,
      record.createdAt, record.updatedAt,
    ],
  );
  return record;
}

export async function pgUpdateCaseStudy(id: string, updates: Partial<CaseStudyRecord>): Promise<CaseStudyRecord | null> {
  const pool = getPool();
  const current = await pgGetCaseStudyById(id);
  if (!current) return null;
  const next: CaseStudyRecord = { ...current, ...updates, id, createdAt: current.createdAt, updatedAt: new Date().toISOString() };
  if (next.featured) {
    await pool.query("UPDATE case_studies SET featured = FALSE WHERE featured = TRUE AND id <> $1", [id]);
  }
  await pool.query(
    `UPDATE case_studies SET
      slug=$1,client=$2,abbr=$3,featured=$4,sector=$5,accent_hex=$6,title=$7,
      subtitle=$8,hero_image=$9,list_image=$10,result=$11,result_metric=$12,
      summary=$13,challenge=$14,solution=$15,results=$16,services=$17,
      technologies=$18,duration=$19,team_size=$20,countries=$21,status=$22,
      updated_at=$23
     WHERE id=$24`,
    [
      next.slug, next.client, next.abbr, next.featured, next.sector, next.accentHex,
      next.title, next.subtitle, next.heroImage, next.listImage, next.result,
      next.resultMetric, next.summary, JSON.stringify(next.challenge),
      JSON.stringify(next.solution), JSON.stringify(next.results),
      next.services, next.technologies, next.duration, next.teamSize,
      next.countries ?? null, next.status, next.updatedAt, id,
    ],
  );
  return next;
}

export async function pgDeleteCaseStudy(id: string): Promise<boolean> {
  const { rowCount } = await getPool().query("DELETE FROM case_studies WHERE id = $1", [id]);
  return (rowCount ?? 0) > 0;
}

// ── blogs ─────────────────────────────────────────────────────────────────────

export async function pgGetBlogs(scope: "public" | "admin"): Promise<BlogRecord[]> {
  const { rows } = scope === "admin"
    ? await getPool().query("SELECT * FROM blogs ORDER BY published_at DESC, updated_at DESC")
    : await getPool().query("SELECT * FROM blogs WHERE status = 'published' ORDER BY published_at DESC, updated_at DESC");
  return rows.map(rowToBlog);
}

export async function pgGetBlogBySlug(slug: string): Promise<BlogRecord | null> {
  const { rows } = await getPool().query(
    "SELECT * FROM blogs WHERE slug = $1 AND status = 'published' LIMIT 1",
    [slug],
  );
  return rows[0] ? rowToBlog(rows[0]) : null;
}

export async function pgGetBlogById(id: string): Promise<BlogRecord | null> {
  const { rows } = await getPool().query(
    "SELECT * FROM blogs WHERE id = $1 LIMIT 1",
    [id],
  );
  return rows[0] ? rowToBlog(rows[0]) : null;
}

export async function pgCreateBlog(record: BlogRecord): Promise<BlogRecord> {
  const pool = getPool();
  if (record.featured) {
    await pool.query("UPDATE blogs SET featured = FALSE WHERE featured = TRUE");
  }
  await pool.query(
    `INSERT INTO blogs
      (id,slug,featured,title,excerpt,category,author,cover_image,
       read_time,published_at,tags,content,status,created_at,updated_at)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)`,
    [
      record.id, record.slug, record.featured, record.title, record.excerpt,
      record.category, record.author, record.coverImage, record.readTime,
      record.publishedAt, record.tags, record.content, record.status,
      record.createdAt, record.updatedAt,
    ],
  );
  return record;
}

export async function pgUpdateBlog(id: string, updates: Partial<BlogRecord>): Promise<BlogRecord | null> {
  const pool = getPool();
  const current = await pgGetBlogById(id);
  if (!current) return null;
  const next: BlogRecord = { ...current, ...updates, id, createdAt: current.createdAt, updatedAt: new Date().toISOString() };
  if (next.featured) {
    await pool.query("UPDATE blogs SET featured = FALSE WHERE featured = TRUE AND id <> $1", [id]);
  }
  await pool.query(
    `UPDATE blogs SET
      slug=$1,featured=$2,title=$3,excerpt=$4,category=$5,author=$6,
      cover_image=$7,read_time=$8,published_at=$9,tags=$10,content=$11,
      status=$12,updated_at=$13
     WHERE id=$14`,
    [
      next.slug, next.featured, next.title, next.excerpt, next.category,
      next.author, next.coverImage, next.readTime, next.publishedAt,
      next.tags, next.content, next.status, next.updatedAt, id,
    ],
  );
  return next;
}

export async function pgDeleteBlog(id: string): Promise<boolean> {
  const { rowCount } = await getPool().query("DELETE FROM blogs WHERE id = $1", [id]);
  return (rowCount ?? 0) > 0;
}

// ── Site pages ────────────────────────────────────────────────────────────────

function rowToPage(row: Record<string, unknown>): SitePage {
  return {
    id: row.id as string,
    slug: row.slug as string,
    type: row.type as SitePage["type"],
    nav_label: row.nav_label as string,
    title: row.title as string,
    subtitle: row.subtitle as string,
    eyebrow: row.eyebrow as string,
    hero_cta_href: row.hero_cta_href as string,
    hero_cta_label: row.hero_cta_label as string,
    footer_blurb: row.footer_blurb as string,
    stats: (row.stats as SitePageStat[]) ?? [],
    sections: (row.sections as SitePageSection[]) ?? [],
    status: row.status as PublishStatus,
    created_at: (row.created_at as Date).toISOString(),
    updated_at: (row.updated_at as Date).toISOString(),
  };
}

export async function pgGetPages(scope: "public" | "admin"): Promise<SitePage[]> {
  const pool = getPool();
  const filter = scope === "public" ? "WHERE status = 'published'" : "";
  const { rows } = await pool.query<Record<string, unknown>>(
    `SELECT * FROM site_pages ${filter} ORDER BY type, nav_label`,
  );
  return rows.map(rowToPage);
}

export async function pgGetPageBySlug(slug: string): Promise<SitePage | null> {
  const { rows } = await getPool().query<Record<string, unknown>>(
    "SELECT * FROM site_pages WHERE slug = $1 LIMIT 1",
    [slug],
  );
  return rows[0] ? rowToPage(rows[0]) : null;
}

export async function pgGetPageById(id: string): Promise<SitePage | null> {
  const { rows } = await getPool().query<Record<string, unknown>>(
    "SELECT * FROM site_pages WHERE id = $1 LIMIT 1",
    [id],
  );
  return rows[0] ? rowToPage(rows[0]) : null;
}

export async function pgCreatePage(record: SitePage): Promise<SitePage> {
  await getPool().query(
    `INSERT INTO site_pages
      (id,slug,type,nav_label,title,subtitle,eyebrow,hero_cta_href,hero_cta_label,footer_blurb,stats,sections,status)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)`,
    [
      record.id, record.slug, record.type, record.nav_label, record.title,
      record.subtitle, record.eyebrow, record.hero_cta_href, record.hero_cta_label,
      record.footer_blurb, JSON.stringify(record.stats), JSON.stringify(record.sections),
      record.status,
    ],
  );
  return (await pgGetPageById(record.id))!;
}

export async function pgUpdatePage(id: string, updates: Partial<Omit<SitePage, "id" | "created_at" | "updated_at">>): Promise<SitePage | null> {
  const current = await pgGetPageById(id);
  if (!current) return null;
  const next: SitePage = { ...current, ...updates, id: current.id, created_at: current.created_at, updated_at: new Date().toISOString() };
  await getPool().query(
    `UPDATE site_pages SET
      slug=$1,type=$2,nav_label=$3,title=$4,subtitle=$5,eyebrow=$6,
      hero_cta_href=$7,hero_cta_label=$8,footer_blurb=$9,
      stats=$10,sections=$11,status=$12,updated_at=$13
     WHERE id=$14`,
    [
      next.slug, next.type, next.nav_label, next.title, next.subtitle, next.eyebrow,
      next.hero_cta_href, next.hero_cta_label, next.footer_blurb,
      JSON.stringify(next.stats), JSON.stringify(next.sections),
      next.status, next.updated_at, id,
    ],
  );
  return next;
}

export async function pgDeletePage(id: string): Promise<boolean> {
  const { rowCount } = await getPool().query("DELETE FROM site_pages WHERE id = $1", [id]);
  return (rowCount ?? 0) > 0;
}
