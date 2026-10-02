import { NextResponse } from "next/server";
import { validateApplication, type Application } from "@/lib/contact";

export async function POST(req: Request) {
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
  const get = (k: string) => String(form.get(k) ?? "").slice(0, 5000);
  const data: Application = {
    name: get("name"),
    email: get("email"),
    phone: get("phone"),
    position: get("position"),
    coverLetter: get("coverLetter"),
    portfolio: get("portfolio"),
  };
  const cv = form.get("cv");
  const file = cv instanceof File ? cv : null;
  const errors = validateApplication(data, file ? { type: file.type, size: file.size } : null);
  if (Object.keys(errors).length) return NextResponse.json({ ok: false, errors }, { status: 422 });

  // TODO(integration): forward the application + CV to the hiring inbox / ATS server-side.
  console.info("[apply] application", { email: data.email, position: data.position, cv: file?.name });
  return NextResponse.json({ ok: true });
}
