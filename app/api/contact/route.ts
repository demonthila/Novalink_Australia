import { NextResponse } from "next/server";
import { validateEnquiry, type Enquiry } from "@/lib/contact";

export async function POST(req: Request) {
  let body: Partial<Enquiry>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
  const data: Enquiry = {
    name: String(body.name ?? "").slice(0, 200),
    email: String(body.email ?? "").slice(0, 200),
    company: String(body.company ?? "").slice(0, 200),
    projectType: String(body.projectType ?? ""),
    budget: String(body.budget ?? ""),
    message: String(body.message ?? ""),
  };
  const errors = validateEnquiry(data);
  if (Object.keys(errors).length) return NextResponse.json({ ok: false, errors }, { status: 422 });

  // TODO(integration): deliver via a server-side provider (e.g. Resend) using env vars —
  // never expose keys client-side.
  console.info("[contact] enquiry", { email: data.email, projectType: data.projectType });
  return NextResponse.json({ ok: true });
}
