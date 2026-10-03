import { NextResponse } from "next/server";
import { validateApplication, type Application } from "@/lib/contact";
import nodemailer from "nodemailer";

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

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions: any = {
      from: process.env.EMAIL_USER,
      to: "sanjulathilan12321@gmail.com",
      subject: `New Job Application from ${data.name} for ${data.position}`,
      text: `
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Position: ${data.position}
Portfolio/LinkedIn: ${data.portfolio}

Cover Letter:
${data.coverLetter}
      `,
    };

    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      mailOptions.attachments = [
        {
          filename: file.name,
          content: buffer,
          contentType: file.type,
        },
      ];
    }

    await transporter.sendMail(mailOptions);
    console.info("[apply] application sent via email", { email: data.email, position: data.position, cv: file?.name });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[apply] email error:", error);
    return NextResponse.json({ ok: false, error: "Failed to send email." }, { status: 500 });
  }
}
