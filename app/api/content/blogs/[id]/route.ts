import { NextResponse } from "next/server";
import { isAdminAuthenticated, isSameOriginRequest } from "../../../../../lib/cms/auth";
import { deleteBlog, getBlogById, getBlogBySlug, updateBlog } from "../../../../../lib/cms/store";
import { parseBlogPayload } from "../../../../../lib/cms/serializers";

export const dynamic = "force-dynamic";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { searchParams } = new URL(request.url);
  const scope = searchParams.get("scope");

  if (scope === "admin" && await isAdminAuthenticated()) {
    const item = await getBlogById(id);
    if (!item) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ item });
  }

  const item = await getBlogBySlug(id);
  if (!item) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ item });
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: "Invalid request origin" }, { status: 403 });
  }

  if (!await isAdminAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const item = await updateBlog(id, parseBlogPayload(body));
  if (!item) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ item });
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isSameOriginRequest(_)) {
    return NextResponse.json({ error: "Invalid request origin" }, { status: 403 });
  }

  if (!await isAdminAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const deleted = await deleteBlog(id);
  if (!deleted) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
