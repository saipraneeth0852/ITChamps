import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { getFirebaseStorageBucket, isFirebaseConfigured } from "../../../../lib/firebase-admin";
import { isAdminAuthenticated, isSameOriginRequest } from "../../../../lib/cms/auth";

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
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: "Invalid request origin" }, { status: 403 });
  }

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
  const storagePath = `uploads/${folder}/${fileName}`;

  const buffer = Buffer.from(await file.arrayBuffer());

  if (isFirebaseConfigured()) {
    const bucket = getFirebaseStorageBucket();
    const storageFile = bucket.file(storagePath);

    await storageFile.save(buffer, {
      metadata: {
        contentType: file.type,
        cacheControl: "public, max-age=31536000, immutable",
      },
    });
    await storageFile.makePublic();

    return NextResponse.json({
      src: `https://storage.googleapis.com/${bucket.name}/${encodeURI(storagePath)}`,
      size: file.size,
    });
  }

  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Firebase Storage is required for production uploads." }, { status: 500 });
  }

  const outputDir = path.join(process.cwd(), "public", "uploads", folder);
  const outputPath = path.join(outputDir, fileName);
  await mkdir(outputDir, { recursive: true });
  await writeFile(outputPath, buffer);

  return NextResponse.json({
    src: `/${storagePath}`,
    size: file.size,
  });
}
