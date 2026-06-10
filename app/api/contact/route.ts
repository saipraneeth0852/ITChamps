import { NextResponse } from "next/server";
import { getFirebaseDb, isFirebaseConfigured } from "../../../lib/firebase-admin";
import { getClientIp, isRateLimited } from "../../../lib/rate-limit";

type ContactPayload = {
  fullName?: string;
  workEmail?: string;
  company?: string;
  phone?: string;
  serviceInterest?: string;
  companySize?: string;
  message?: string;
  subscribe?: boolean;
  source?: string;
};

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);

    if (isRateLimited(`contact:${ip}`, 5, 60_000)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a minute before trying again." },
        { status: 429 }
      );
    }

    const body = (await request.json()) as ContactPayload;
    const payload = {
      fullName: clean(body.fullName),
      workEmail: clean(body.workEmail),
      company: clean(body.company),
      phone: clean(body.phone),
      serviceInterest: clean(body.serviceInterest),
      companySize: clean(body.companySize),
      message: clean(body.message),
      subscribe: Boolean(body.subscribe),
      source: clean(body.source) || "website",
    };

    if (!payload.fullName || !payload.workEmail || !payload.company || !payload.message) {
      return NextResponse.json(
        { error: "Full name, work email, company, and message are required." },
        { status: 400 }
      );
    }

    if (!isEmail(payload.workEmail)) {
      return NextResponse.json({ error: "Enter a valid work email." }, { status: 400 });
    }

    const record = {
      ...payload,
      createdAt: new Date().toISOString(),
    };

    if (isFirebaseConfigured()) {
      const db = getFirebaseDb();
      await db.collection("contactLeads").add(record);
    } else {
      console.info("Contact lead captured without Firebase config", record);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to process contact form", error);
    return NextResponse.json(
      { error: "We could not submit the form right now. Please try again." },
      { status: 500 }
    );
  }
}
