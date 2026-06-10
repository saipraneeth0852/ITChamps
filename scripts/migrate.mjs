#!/usr/bin/env node
// Run: node scripts/migrate.mjs
// Requires DATABASE_URL in environment (or .env.local via --env-file)

import pg from "pg";
const { Pool } = pg;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const schema = `
CREATE TABLE IF NOT EXISTS case_studies (
  id              TEXT PRIMARY KEY,
  slug            TEXT UNIQUE NOT NULL,
  client          TEXT NOT NULL,
  abbr            TEXT NOT NULL,
  featured        BOOLEAN NOT NULL DEFAULT FALSE,
  sector          TEXT NOT NULL,
  accent_hex      TEXT NOT NULL,
  title           TEXT NOT NULL,
  subtitle        TEXT NOT NULL,
  hero_image      TEXT NOT NULL,
  list_image      TEXT NOT NULL,
  result          TEXT NOT NULL,
  result_metric   TEXT NOT NULL,
  summary         TEXT NOT NULL,
  challenge       JSONB NOT NULL,
  solution        JSONB NOT NULL,
  results         JSONB NOT NULL,
  services        TEXT[] NOT NULL DEFAULT '{}',
  technologies    TEXT[] NOT NULL DEFAULT '{}',
  duration        TEXT NOT NULL,
  team_size       TEXT NOT NULL,
  countries       INTEGER,
  status          TEXT NOT NULL DEFAULT 'draft',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_case_studies_slug   ON case_studies (slug);
CREATE INDEX IF NOT EXISTS idx_case_studies_status ON case_studies (status);

CREATE TABLE IF NOT EXISTS blogs (
  id           TEXT PRIMARY KEY,
  slug         TEXT UNIQUE NOT NULL,
  featured     BOOLEAN NOT NULL DEFAULT FALSE,
  title        TEXT NOT NULL,
  excerpt      TEXT NOT NULL,
  category     TEXT NOT NULL,
  author       TEXT NOT NULL,
  cover_image  TEXT NOT NULL,
  read_time    TEXT NOT NULL,
  published_at TEXT NOT NULL,
  tags         TEXT[] NOT NULL DEFAULT '{}',
  content      TEXT NOT NULL,
  status       TEXT NOT NULL DEFAULT 'draft',
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_blogs_slug   ON blogs (slug);
CREATE INDEX IF NOT EXISTS idx_blogs_status ON blogs (status);
`;

try {
  console.log("Running migrations...");
  await pool.query(schema);
  console.log("Migrations complete.");
} finally {
  await pool.end();
}
