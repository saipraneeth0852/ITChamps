import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { applicationDefault, cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, "..");
const dataFile = path.join(rootDir, "content", "cms-data.json");

function required(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function getPrivateKey() {
  return process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
}

function getDb() {
  const app = getApps()[0] ?? initializeApp({
    credential: process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY
      ? cert({
          projectId: required("FIREBASE_PROJECT_ID"),
          clientEmail: required("FIREBASE_CLIENT_EMAIL"),
          privateKey: required("FIREBASE_PRIVATE_KEY").replace(/\\n/g, "\n"),
        })
      : applicationDefault(),
    projectId: required("FIREBASE_PROJECT_ID"),
  });

  return getFirestore(app);
}

async function main() {
  if (!fs.existsSync(dataFile)) {
    throw new Error(`Missing content file: ${dataFile}`);
  }

  const raw = fs.readFileSync(dataFile, "utf8");
  const data = JSON.parse(raw);
  const db = getDb();
  const batch = db.batch();

  for (const item of data.caseStudies ?? []) {
    batch.set(db.collection("caseStudies").doc(item.id), item);
  }

  for (const item of data.blogs ?? []) {
    batch.set(db.collection("blogs").doc(item.id), item);
  }

  await batch.commit();

  console.log(`Seeded ${data.caseStudies?.length ?? 0} case studies and ${data.blogs?.length ?? 0} blogs to Firestore.`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
