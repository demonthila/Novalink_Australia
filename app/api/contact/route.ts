import { NextResponse } from "next/server";
import { validateEnquiry, type Enquiry } from "@/lib/contact";
import nodemailer from "nodemailer";

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

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "sanjulathilan12321@gmail.com",
      subject: `New Contact Enquiry from ${data.name}`,
      text: `
Name: ${data.name}
Email: ${data.email}
Company: ${data.company}
Project Type: ${data.projectType}
Budget: ${data.budget}

Message:
${data.message}
      `,
    };

    await transporter.sendMail(mailOptions);
    console.info("[contact] enquiry sent via email", { email: data.email, projectType: data.projectType });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact] email error:", error);
    return NextResponse.json({ ok: false, error: "Failed to send email." }, { status: 500 });
  }
}
