import { mkdir, readFile, writeFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { createSeedData } from "./seed";
import type { BlogRecord, CaseStudyRecord, CMSData, PublishStatus } from "./types";
import { getFirebaseDb, isFirebaseConfigured } from "../firebase-admin";
import { isPgConfigured } from "../db";
import {
  pgGetCaseStudies, pgGetCaseStudyBySlug, pgGetCaseStudyById,
  pgCreateCaseStudy, pgUpdateCaseStudy, pgDeleteCaseStudy,
  pgGetBlogs, pgGetBlogBySlug, pgGetBlogById,
  pgCreateBlog, pgUpdateBlog, pgDeleteBlog,
} from "./pg-store";

const DATA_DIR = path.join(process.cwd(), "content");
const DATA_FILE = path.join(DATA_DIR, "cms-data.json");
const CASE_STUDIES_COLLECTION = "caseStudies";
const BLOGS_COLLECTION = "blogs";

async function ensureFileStore(): Promise<CMSData> {
  if (!existsSync(DATA_FILE)) {
    const seed = createSeedData();
    await mkdir(DATA_DIR, { recursive: true });
    await writeFile(DATA_FILE, JSON.stringify(seed, null, 2), "utf8");
    return seed;
  }

  const raw = await readFile(DATA_FILE, "utf8");
  return JSON.parse(raw) as CMSData;
}

async function saveFileStore(data: CMSData) {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf8");
}

function sortPublished<T extends { publishedAt?: string; updatedAt: string }>(items: T[]) {
  return [...items].sort((a, b) => {
    const aDate = a.publishedAt ?? a.updatedAt;
    const bDate = b.publishedAt ?? b.updatedAt;
    return bDate.localeCompare(aDate);
  });
}

function normalizeFeatured<T extends { featured?: boolean }>(items: T[]) {
  return items.map((item) => ({
    ...item,
    featured: Boolean(item.featured),
  }));
}

function setSingleFeatured<T extends { id: string; featured?: boolean }>(items: T[], targetId: string) {
  return items.map((item) => ({
    ...item,
    featured: item.id === targetId,
  }));
}

async function ensureFirebaseSeeded() {
  const db = getFirebaseDb();
  const caseSnapshot = await db.collection(CASE_STUDIES_COLLECTION).limit(1).get();
  const blogSnapshot = await db.collection(BLOGS_COLLECTION).limit(1).get();

  if (!caseSnapshot.empty || !blogSnapshot.empty) {
    return;
  }

  const seed = createSeedData();
  const batch = db.batch();

  for (const item of seed.caseStudies) {
    batch.set(db.collection(CASE_STUDIES_COLLECTION).doc(item.id), item);
  }

  for (const item of seed.blogs) {
    batch.set(db.collection(BLOGS_COLLECTION).doc(item.id), item);
  }

  await batch.commit();
}

async function getFirebaseCollection<T>(collectionName: string) {
  await ensureFirebaseSeeded();
  const snapshot = await getFirebaseDb().collection(collectionName).get();
  return snapshot.docs.map((doc) => doc.data() as T);
}

async function getCaseStudiesFromFirebase(scope: "public" | "admin") {
  const items = await getFirebaseCollection<CaseStudyRecord>(CASE_STUDIES_COLLECTION);
  return sortPublished(normalizeFeatured(scope === "admin" ? items : items.filter((study) => study.status === "published")));
}

async function getBlogsFromFirebase(scope: "public" | "admin") {
  const items = await getFirebaseCollection<BlogRecord>(BLOGS_COLLECTION);
  return sortPublished(normalizeFeatured(scope === "admin" ? items : items.filter((blog) => blog.status === "published")));
}

export async function getCaseStudies(scope: "public" | "admin" = "public") {
  if (isPgConfigured()) return pgGetCaseStudies(scope);
  if (isFirebaseConfigured()) {
    return getCaseStudiesFromFirebase(scope);
  }

  const data = await ensureFileStore();
  const items = scope === "admin"
    ? data.caseStudies
    : data.caseStudies.filter((study) => study.status === "published");
  return sortPublished(normalizeFeatured(items));
}

export async function getCaseStudyBySlug(slug: string) {
  if (isPgConfigured()) return pgGetCaseStudyBySlug(slug);
  if (isFirebaseConfigured()) {
    await ensureFirebaseSeeded();
    const snapshot = await getFirebaseDb()
      .collection(CASE_STUDIES_COLLECTION)
      .where("slug", "==", slug)
      .limit(1)
      .get();
    return snapshot.empty ? null : (snapshot.docs[0].data() as CaseStudyRecord);
  }

  const items = await getCaseStudies("public");
  return items.find((study) => study.slug === slug) ?? null;
}

export async function getCaseStudyById(id: string) {
  if (isPgConfigured()) return pgGetCaseStudyById(id);
  if (isFirebaseConfigured()) {
    await ensureFirebaseSeeded();
    const doc = await getFirebaseDb().collection(CASE_STUDIES_COLLECTION).doc(id).get();
    return doc.exists ? (doc.data() as CaseStudyRecord) : null;
  }

  const data = await ensureFileStore();
  return data.caseStudies.find((study) => study.id === id) ?? null;
}

export async function createCaseStudy(input: Omit<CaseStudyRecord, "id" | "createdAt" | "updatedAt">) {
  const now = new Date().toISOString();
  const record: CaseStudyRecord = {
    ...input,
    id: `case-${crypto.randomUUID()}`,
    createdAt: now,
    updatedAt: now,
  };

  if (isPgConfigured()) return pgCreateCaseStudy(record);
  if (isFirebaseConfigured()) {
    await ensureFirebaseSeeded();
    const db = getFirebaseDb();
    if (record.featured) {
      const items = await getCaseStudiesFromFirebase("admin");
      const batch = db.batch();
      for (const item of items.filter((item) => item.featured)) {
        batch.set(db.collection(CASE_STUDIES_COLLECTION).doc(item.id), { ...item, featured: false }, { merge: true });
      }
      batch.set(db.collection(CASE_STUDIES_COLLECTION).doc(record.id), record);
      await batch.commit();
    } else {
      await db.collection(CASE_STUDIES_COLLECTION).doc(record.id).set(record);
    }
    return record;
  }

  const data = await ensureFileStore();
  data.caseStudies = record.featured
    ? [record, ...setSingleFeatured(data.caseStudies, record.id)]
    : [record, ...data.caseStudies];
  await saveFileStore(data);
  return record;
}

export async function updateCaseStudy(id: string, updates: Partial<CaseStudyRecord>) {
  if (isPgConfigured()) return pgUpdateCaseStudy(id, updates);
  if (isFirebaseConfigured()) {
    await ensureFirebaseSeeded();
    const db = getFirebaseDb();
    const ref = db.collection(CASE_STUDIES_COLLECTION).doc(id);
    const current = await ref.get();
    if (!current.exists) return null;
    const currentData = current.data() as CaseStudyRecord;
    const next: CaseStudyRecord = {
      ...currentData,
      ...updates,
      id: currentData.id,
      createdAt: currentData.createdAt,
      updatedAt: new Date().toISOString(),
    };
    if (next.featured) {
      const items = await getCaseStudiesFromFirebase("admin");
      const batch = db.batch();
      for (const item of items.filter((item) => item.featured && item.id !== id)) {
        batch.set(db.collection(CASE_STUDIES_COLLECTION).doc(item.id), { ...item, featured: false }, { merge: true });
      }
      batch.set(ref, next);
      await batch.commit();
    } else {
      await ref.set(next);
    }
    return next;
  }

  const data = await ensureFileStore();
  const index = data.caseStudies.findIndex((study) => study.id === id);
  if (index === -1) return null;
  const current = data.caseStudies[index];
  const next: CaseStudyRecord = {
    ...current,
    ...updates,
    id: current.id,
    createdAt: current.createdAt,
    updatedAt: new Date().toISOString(),
  };
  data.caseStudies[index] = next;
  if (next.featured) {
    data.caseStudies = setSingleFeatured(data.caseStudies, next.id);
  }
  await saveFileStore(data);
  return next;
}

export async function deleteCaseStudy(id: string) {
  if (isPgConfigured()) return pgDeleteCaseStudy(id);
  if (isFirebaseConfigured()) {
    await ensureFirebaseSeeded();
    const ref = getFirebaseDb().collection(CASE_STUDIES_COLLECTION).doc(id);
    const current = await ref.get();
    if (!current.exists) return false;
    await ref.delete();
    return true;
  }

  const data = await ensureFileStore();
  const next = data.caseStudies.filter((study) => study.id !== id);
  if (next.length === data.caseStudies.length) return false;
  data.caseStudies = next;
  await saveFileStore(data);
  return true;
}

export async function getBlogs(scope: "public" | "admin" = "public") {
  if (isPgConfigured()) return pgGetBlogs(scope);
  if (isFirebaseConfigured()) {
    return getBlogsFromFirebase(scope);
  }

  const data = await ensureFileStore();
  const items = scope === "admin"
    ? data.blogs
    : data.blogs.filter((blog) => blog.status === "published");
  return sortPublished(normalizeFeatured(items));
}

export async function getBlogBySlug(slug: string) {
  if (isPgConfigured()) return pgGetBlogBySlug(slug);
  if (isFirebaseConfigured()) {
    await ensureFirebaseSeeded();
    const snapshot = await getFirebaseDb()
      .collection(BLOGS_COLLECTION)
      .where("slug", "==", slug)
      .limit(1)
      .get();
    return snapshot.empty ? null : (snapshot.docs[0].data() as BlogRecord);
  }

  const items = await getBlogs("public");
  return items.find((blog) => blog.slug === slug) ?? null;
}

export async function getBlogById(id: string) {
  if (isPgConfigured()) return pgGetBlogById(id);
  if (isFirebaseConfigured()) {
    await ensureFirebaseSeeded();
    const doc = await getFirebaseDb().collection(BLOGS_COLLECTION).doc(id).get();
    return doc.exists ? (doc.data() as BlogRecord) : null;
  }

  const data = await ensureFileStore();
  return data.blogs.find((blog) => blog.id === id) ?? null;
}

export async function createBlog(input: Omit<BlogRecord, "id" | "createdAt" | "updatedAt">) {
  const now = new Date().toISOString();
  const record: BlogRecord = {
    ...input,
    id: `blog-${crypto.randomUUID()}`,
    createdAt: now,
    updatedAt: now,
  };

  if (isPgConfigured()) return pgCreateBlog(record);
  if (isFirebaseConfigured()) {
    await ensureFirebaseSeeded();
    const db = getFirebaseDb();
    if (record.featured) {
      const items = await getBlogsFromFirebase("admin");
      const batch = db.batch();
      for (const item of items.filter((item) => item.featured)) {
        batch.set(db.collection(BLOGS_COLLECTION).doc(item.id), { ...item, featured: false }, { merge: true });
      }
      batch.set(db.collection(BLOGS_COLLECTION).doc(record.id), record);
      await batch.commit();
    } else {
      await db.collection(BLOGS_COLLECTION).doc(record.id).set(record);
    }
    return record;
  }

  const data = await ensureFileStore();
  data.blogs = record.featured
    ? [record, ...setSingleFeatured(data.blogs, record.id)]
    : [record, ...data.blogs];
  await saveFileStore(data);
  return record;
}

export async function updateBlog(id: string, updates: Partial<BlogRecord>) {
  if (isPgConfigured()) return pgUpdateBlog(id, updates);
  if (isFirebaseConfigured()) {
    await ensureFirebaseSeeded();
    const db = getFirebaseDb();
    const ref = db.collection(BLOGS_COLLECTION).doc(id);
    const current = await ref.get();
    if (!current.exists) return null;
    const currentData = current.data() as BlogRecord;
    const next: BlogRecord = {
      ...currentData,
      ...updates,
      id: currentData.id,
      createdAt: currentData.createdAt,
      updatedAt: new Date().toISOString(),
    };
    if (next.featured) {
      const items = await getBlogsFromFirebase("admin");
      const batch = db.batch();
      for (const item of items.filter((item) => item.featured && item.id !== id)) {
        batch.set(db.collection(BLOGS_COLLECTION).doc(item.id), { ...item, featured: false }, { merge: true });
      }
      batch.set(ref, next);
      await batch.commit();
    } else {
      await ref.set(next);
    }
    return next;
  }

  const data = await ensureFileStore();
  const index = data.blogs.findIndex((blog) => blog.id === id);
  if (index === -1) return null;
  const current = data.blogs[index];
  const next: BlogRecord = {
    ...current,
    ...updates,
    id: current.id,
    createdAt: current.createdAt,
    updatedAt: new Date().toISOString(),
  };
  data.blogs[index] = next;
  if (next.featured) {
    data.blogs = setSingleFeatured(data.blogs, next.id);
  }
  await saveFileStore(data);
  return next;
}

export async function deleteBlog(id: string) {
  if (isPgConfigured()) return pgDeleteBlog(id);
  if (isFirebaseConfigured()) {
    await ensureFirebaseSeeded();
    const ref = getFirebaseDb().collection(BLOGS_COLLECTION).doc(id);
    const current = await ref.get();
    if (!current.exists) return false;
    await ref.delete();
    return true;
  }

  const data = await ensureFileStore();
  const next = data.blogs.filter((blog) => blog.id !== id);
  if (next.length === data.blogs.length) return false;
  data.blogs = next;
  await saveFileStore(data);
  return true;
}

export function normalizeStatus(value: string | undefined): PublishStatus {
  return value === "draft" ? "draft" : "published";
}
