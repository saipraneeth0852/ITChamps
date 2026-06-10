import { createHmac, randomBytes, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const SESSION_COOKIE = "itchmaps_admin_session";
const DEFAULT_USERNAME = "admin";
const DEFAULT_PASSWORD = "change-me";
const DEFAULT_SECRET = "itchmaps-local-secret";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8;
const SESSION_VERSION = "v1";

function isProduction() {
  return process.env.NODE_ENV === "production";
}

function requireProductionEnv(name: string, value: string | undefined) {
  if (isProduction() && !value) {
    throw new Error(`${name} is required in production.`);
  }
  return value;
}

function getUsername() {
  return requireProductionEnv("ADMIN_USERNAME", process.env.ADMIN_USERNAME) ?? DEFAULT_USERNAME;
}

function getPassword() {
  return requireProductionEnv("ADMIN_PASSWORD", process.env.ADMIN_PASSWORD) ?? DEFAULT_PASSWORD;
}

function getSecret() {
  return requireProductionEnv("ADMIN_SESSION_SECRET", process.env.ADMIN_SESSION_SECRET) ?? DEFAULT_SECRET;
}

function signSession(payload: string) {
  return createHmac("sha256", getSecret()).update(payload).digest("hex");
}

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  return timingSafeEqual(Buffer.from(a), Buffer.from(b));
}

function createSessionValue() {
  const expiresAt = Date.now() + SESSION_MAX_AGE_SECONDS * 1000;
  const nonce = randomBytes(16).toString("hex");
  const payload = `${SESSION_VERSION}.${expiresAt}.${nonce}`;
  return `${payload}.${signSession(payload)}`;
}

export async function isAdminAuthenticated() {
  const store = await cookies();
  const current = store.get(SESSION_COOKIE)?.value;
  if (!current) return false;

  const parts = current.split(".");
  if (parts.length !== 4 || parts[0] !== SESSION_VERSION) return false;

  const [version, expiresAt, nonce, signature] = parts;
  if (!/^\d+$/.test(expiresAt) || Date.now() > Number(expiresAt)) return false;
  if (!/^[a-f0-9]{32}$/.test(nonce)) return false;

  const payload = `${version}.${expiresAt}.${nonce}`;
  return safeEqual(signature, signSession(payload));
}

export function getAdminCookieName() {
  return SESSION_COOKIE;
}

export function hasDefaultAdminCredentials() {
  return !process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD || !process.env.ADMIN_SESSION_SECRET;
}

export function validateAdminCredentials(username: string, password: string) {
  return safeEqual(username, getUsername()) && safeEqual(password, getPassword());
}

export function buildAdminSessionValue() {
  return createSessionValue();
}

export function getAdminSessionMaxAge() {
  return SESSION_MAX_AGE_SECONDS;
}

export function isSameOriginRequest(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (!host) return !isProduction();

  const protocol = request.headers.get("x-forwarded-proto") ?? (isProduction() ? "https" : "http");
  return origin === `${protocol}://${host}`;
}
