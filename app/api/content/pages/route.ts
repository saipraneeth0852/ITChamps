import { NextResponse } from "next/server";
import { isAdminAuthenticated, isSameOriginRequest } from "../../../../lib/cms/auth";
import { createPage, getPages } from "../../../../lib/cms/store";
import { parsePagePayload } from "../../../../lib/cms/serializers";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const scope = searchParams.get("scope");
  const canUseAdmin = scope === "admin" && await isAdminAuthenticated();
  const items = await getPages(canUseAdmin ? "admin" : "public");
  return NextResponse.json({ items });
}

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: "Invalid request origin" }, { status: 403 });
  }
  if (!await isAdminAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const record = await createPage(parsePagePayload(body));
  return NextResponse.json({ item: record }, { status: 201 });
}
