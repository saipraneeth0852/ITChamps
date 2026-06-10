#!/usr/bin/env node
// Seeds PostgreSQL with case studies and blogs from cms-data.json (or seed data).
// Run: node --env-file=.env.local scripts/seed-pg.mjs

import pg from "pg";
import { readFile, access } from "fs/promises";
import { fileURLToPath } from "url";
import path from "path";

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function loadData() {
  const jsonPath = path.join(__dirname, "../content/cms-data.json");
  try {
    await access(jsonPath);
    const raw = await readFile(jsonPath, "utf8");
    return JSON.parse(raw);
  } catch {
    // Fall back to seed data if no cms-data.json
    const seedModule = await import("../lib/cms/seed.js").catch(() => null);
    if (seedModule) return seedModule.createSeedData();
    throw new Error("No cms-data.json found and seed module unavailable. Build the project first.");
  }
}

async function seedCaseStudies(client, studies) {
  console.log(`Seeding ${studies.length} case studies...`);
  for (const s of studies) {
    await client.query(
      `INSERT INTO case_studies
        (id,slug,client,abbr,featured,sector,accent_hex,title,subtitle,
         hero_image,list_image,result,result_metric,summary,challenge,
         solution,results,services,technologies,duration,team_size,
         countries,status,created_at,updated_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25)
       ON CONFLICT (id) DO UPDATE SET
         slug=$2,client=$3,abbr=$4,featured=$5,sector=$6,accent_hex=$7,title=$8,
         subtitle=$9,hero_image=$10,list_image=$11,result=$12,result_metric=$13,
         summary=$14,challenge=$15,solution=$16,results=$17,services=$18,
         technologies=$19,duration=$20,team_size=$21,countries=$22,status=$23,
         updated_at=$25`,
      [
        s.id, s.slug, s.client, s.abbr, Boolean(s.featured),
        s.sector, s.accentHex, s.title, s.subtitle,
        s.heroImage, s.listImage, s.result, s.resultMetric,
        s.summary, JSON.stringify(s.challenge), JSON.stringify(s.solution),
        JSON.stringify(s.results), s.services, s.technologies,
        s.duration, s.teamSize, s.countries ?? null, s.status,
        s.createdAt, s.updatedAt,
      ],
    );
    console.log(`  ✓ case study: ${s.slug}`);
  }
}

async function seedBlogs(client, blogs) {
  console.log(`Seeding ${blogs.length} blogs...`);
  for (const b of blogs) {
    await client.query(
      `INSERT INTO blogs
        (id,slug,featured,title,excerpt,category,author,cover_image,
         read_time,published_at,tags,content,status,created_at,updated_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)
       ON CONFLICT (id) DO UPDATE SET
         slug=$2,featured=$3,title=$4,excerpt=$5,category=$6,author=$7,
         cover_image=$8,read_time=$9,published_at=$10,tags=$11,content=$12,
         status=$13,updated_at=$15`,
      [
        b.id, b.slug, Boolean(b.featured), b.title, b.excerpt,
        b.category, b.author, b.coverImage, b.readTime,
        b.publishedAt, b.tags, b.content, b.status,
        b.createdAt, b.updatedAt,
      ],
    );
    console.log(`  ✓ blog: ${b.slug}`);
  }
}

const client = await pool.connect();
try {
  const data = await loadData();
  await client.query("BEGIN");
  await seedCaseStudies(client, data.caseStudies);
  await seedBlogs(client, data.blogs);
  await client.query("COMMIT");
  console.log("\nSeed complete.");
} catch (err) {
  await client.query("ROLLBACK");
  console.error("Seed failed:", err.message);
  process.exit(1);
} finally {
  client.release();
  await pool.end();
}
