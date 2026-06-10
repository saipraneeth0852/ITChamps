import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  buildAdminSessionValue,
  getAdminCookieName,
  getAdminSessionMaxAge,
  isSameOriginRequest,
  validateAdminCredentials,
} from "../../../../lib/cms/auth";
import { getClientIp, isRateLimited } from "../../../../lib/rate-limit";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: "Invalid request origin" }, { status: 403 });
  }

  const ip = getClientIp(request);
  if (isRateLimited(`admin-login:${ip}`, 5, 15 * 60_000)) {
    return NextResponse.json({ error: "Too many login attempts" }, { status: 429 });
  }

  const body = await request.json();
  const username = String(body.username ?? "");
  const password = String(body.password ?? "");

  if (!validateAdminCredentials(username, password)) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const store = await cookies();
  store.set(getAdminCookieName(), buildAdminSessionValue(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: getAdminSessionMaxAge(),
  });

  return NextResponse.json({ ok: true });
}
