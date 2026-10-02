"use client";

import { ArrowRight, Check, LoaderCircle, Paperclip } from "lucide-react";
import { useRef, useState } from "react";
import { validateApplication, type AppErrors, type Application } from "@/lib/contact";
import { site } from "@/data/site";
import { positions } from "@/data/careers";
import { cn } from "@/lib/utils";
import { describe, Field, inputClass } from "@/components/ui/Field";

const empty: Application = { name: "", email: "", phone: "", position: "", coverLetter: "", portfolio: "" };

/** Job application — the fields from the original job-application-form.html. */
export function ApplicationForm() {
  const [data, setData] = useState<Application>(empty);
  const [cv, setCv] = useState<File | null>(null);
  const [errors, setErrors] = useState<AppErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const fileRef = useRef<HTMLInputElement>(null);

  const set = <K extends keyof Application>(k: K, v: Application[K]) => {
    setData((d) => ({ ...d, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validateApplication(data, cv);
    setErrors(e);
    const first = Object.keys(e)[0];
    if (first) {
      document.getElementById(`a-${first}`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const fd = new FormData();
      Object.entries(data).forEach(([k, v]) => fd.append(k, v));
      if (cv) fd.append("cv", cv);
      const res = await fetch("/api/apply", { method: "POST", body: fd });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) {
        if (json.errors) setErrors(json.errors);
        throw new Error();
      }
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div role="status" className="rounded-lg border border-line bg-white p-8 md:p-12">
        <span className="flex size-12 items-center justify-center rounded-md bg-blue text-white">
          <Check aria-hidden className="size-6" />
        </span>
        <h3 className="text-headline mt-8 font-medium">Application sent.</h3>
        <p className="text-lede mt-4 text-grey-2">Thanks, {data.name.trim().split(" ")[0]}. We’ll be in touch at {data.email}.</p>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={submit} className="grid gap-7 rounded-lg border border-line bg-white p-6 md:p-10">
      <div className="grid gap-7 md:grid-cols-2">
        <Field id="a-name" label="Full name" error={errors.name}>
          <input {...describe("a-name", errors.name)} className={inputClass} autoComplete="name" value={data.name} onChange={(e) => set("name", e.target.value)} />
        </Field>
        <Field id="a-email" label="Email address" error={errors.email}>
          <input {...describe("a-email", errors.email)} type="email" className={inputClass} autoComplete="email" value={data.email} onChange={(e) => set("email", e.target.value)} />
        </Field>
        <Field id="a-phone" label="Phone number" error={errors.phone}>
          <input {...describe("a-phone", errors.phone)} type="tel" className={inputClass} autoComplete="tel" value={data.phone} onChange={(e) => set("phone", e.target.value)} />
        </Field>
        <Field id="a-position" label="Position applying for" optional>
          <input id="a-position" list="roles" className={inputClass} value={data.position} onChange={(e) => set("position", e.target.value)} />
          <datalist id="roles">
            {positions.map((p) => (
              <option key={p.role} value={p.role} />
            ))}
          </datalist>
        </Field>
      </div>
      <Field id="a-coverLetter" label="Cover letter" error={errors.coverLetter}>
        <textarea {...describe("a-coverLetter", errors.coverLetter)} rows={5} className={cn(inputClass, "resize-y")} value={data.coverLetter} onChange={(e) => set("coverLetter", e.target.value)} />
      </Field>
      <div className="grid gap-7 md:grid-cols-2">
        <Field id="a-portfolio" label="Portfolio link" optional error={errors.portfolio}>
          <input {...describe("a-portfolio", errors.portfolio)} type="url" inputMode="url" placeholder="https://" className={inputClass} value={data.portfolio} onChange={(e) => set("portfolio", e.target.value)} />
        </Field>
        <Field id="a-cv" label="CV" error={errors.cv} hint="PDF or Word, up to 5 MB">
          <label
            className={cn(
              "mt-2 flex min-h-12 cursor-pointer items-center gap-3 rounded-sm border border-dashed px-4 py-3 text-sm transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-blue",
              errors.cv ? "border-red-600" : "border-line-strong hover:border-blue",
            )}
          >
            <Paperclip aria-hidden className="size-4 text-blue-ink" />
            <span className="truncate">{cv ? cv.name : "Choose a file"}</span>
            <input
              ref={fileRef}
              {...describe("a-cv", errors.cv, true)}
              type="file"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              className="sr-only"
              onChange={(e) => {
                setCv(e.target.files?.[0] ?? null);
                setErrors((x) => ({ ...x, cv: undefined }));
              }}
            />
          </label>
        </Field>
      </div>

      {status === "error" && (
        <p role="alert" className="rounded-sm border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          Your application didn’t send. Try again, or email your CV to{" "}
          <a className="underline" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          .
        </p>
      )}

      <div className="flex justify-end border-t border-line pt-7">
        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex h-14 items-center gap-2.5 rounded-sm bg-blue px-8 font-medium text-white transition-[background-color,box-shadow] hover:bg-blue-electric hover:shadow-blue disabled:opacity-70"
        >
          {status === "sending" ? (
            <>
              Sending <LoaderCircle aria-hidden className="size-4 animate-spin" />
            </>
          ) : (
            <>
              Submit Application <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
