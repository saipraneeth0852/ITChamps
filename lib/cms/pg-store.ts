import { getPool } from "../db";
import type { BlogRecord, CaseStudyRecord, PublishStatus } from "./types";

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
