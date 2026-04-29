import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "../../../../lib/cms/auth";
import { createBlog, getBlogs } from "../../../../lib/cms/store";
import { parseBlogPayload } from "../../../../lib/cms/serializers";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const scope = searchParams.get("scope");
  const canUseAdmin = scope === "admin" && await isAdminAuthenticated();
  const items = await getBlogs(canUseAdmin ? "admin" : "public");
  return NextResponse.json({ items });
}

export async function POST(request: Request) {
  if (!await isAdminAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const record = await createBlog(parseBlogPayload(body));
  return NextResponse.json({ item: record }, { status: 201 });
}
