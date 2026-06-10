import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getAdminCookieName, isSameOriginRequest } from "../../../../lib/cms/auth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: "Invalid request origin" }, { status: 403 });
  }

  const store = await cookies();
  store.delete(getAdminCookieName());
  return NextResponse.json({ ok: true });
}
