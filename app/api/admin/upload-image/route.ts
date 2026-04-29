import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "../../../../lib/cms/auth";

export const dynamic = "force-dynamic";

const MAX_FILE_BYTES = 4 * 1024 * 1024;
const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

function sanitizeFolder(input: string) {
  if (input === "blogs") return "blogs";
  return "case-studies";
}

export async function POST(request: Request) {
  if (!await isAdminAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const folder = sanitizeFolder(String(formData.get("folder") ?? ""));

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Image file is required." }, { status: 400 });
  }

  if (!(file.type in ALLOWED_TYPES)) {
    return NextResponse.json({ error: "Use JPG, PNG, or WEBP images only." }, { status: 400 });
  }

  if (file.size > MAX_FILE_BYTES) {
    return NextResponse.json({ error: "Image must be 4MB or smaller." }, { status: 400 });
  }

  const extension = ALLOWED_TYPES[file.type];
  const fileName = `${folder}-${randomUUID()}.${extension}`;
  const outputDir = path.join(process.cwd(), "public", "uploads", folder);
  const outputPath = path.join(outputDir, fileName);

  await mkdir(outputDir, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(outputPath, buffer);

  return NextResponse.json({
    src: `/uploads/${folder}/${fileName}`,
    size: file.size,
  });
}
