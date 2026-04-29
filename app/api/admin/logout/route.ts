import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getAdminCookieName } from "../../../../lib/cms/auth";

export const dynamic = "force-dynamic";

export async function POST() {
  const store = await cookies();
  store.delete(getAdminCookieName());
  return NextResponse.json({ ok: true });
}
