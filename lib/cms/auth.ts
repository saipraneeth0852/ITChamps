import { createHash, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const SESSION_COOKIE = "itchmaps_admin_session";
const DEFAULT_USERNAME = "admin";
const DEFAULT_PASSWORD = "change-me";
const DEFAULT_SECRET = "itchmaps-local-secret";

function getUsername() {
  return process.env.ADMIN_USERNAME ?? DEFAULT_USERNAME;
}

function getPassword() {
  return process.env.ADMIN_PASSWORD ?? DEFAULT_PASSWORD;
}

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET ?? DEFAULT_SECRET;
}

function createSessionValue() {
  return createHash("sha256")
    .update(`${getUsername()}:${getPassword()}:${getSecret()}`)
    .digest("hex");
}

export async function isAdminAuthenticated() {
  const store = await cookies();
  const current = store.get(SESSION_COOKIE)?.value;
  if (!current) return false;
  const expected = createSessionValue();
  if (current.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(current), Buffer.from(expected));
}

export function getAdminCookieName() {
  return SESSION_COOKIE;
}

export function hasDefaultAdminCredentials() {
  return !process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD;
}

export function validateAdminCredentials(username: string, password: string) {
  return username === getUsername() && password === getPassword();
}

export function buildAdminSessionValue() {
  return createSessionValue();
}
