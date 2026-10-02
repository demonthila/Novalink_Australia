"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { budgets, projectTypes, validateEnquiry, type Enquiry, type Errors } from "@/lib/contact";
import { site } from "@/data/site";
import { cn, EASE } from "@/lib/utils";
import { describe, Field, FieldError, inputClass } from "@/components/ui/Field";

const empty: Enquiry = { name: "", email: "", company: "", projectType: "", budget: "", message: "" };

export function ContactForm({ initialType }: { initialType?: string }) {
  const [data, setData] = useState<Enquiry>({ ...empty, projectType: initialType ?? "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const set = <K extends keyof Enquiry>(k: K, v: Enquiry[K]) => {
    setData((d) => ({ ...d, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validateEnquiry(data);
    setErrors(e);
    const first = Object.keys(e)[0];
    if (first) {
      document.getElementById(`f-${first}`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
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
      <motion.div
        role="status"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="rounded-lg border border-line bg-white p-8 md:p-12"
      >
        <span className="flex size-12 items-center justify-center rounded-md bg-blue text-white">
          <Check aria-hidden className="size-6" />
        </span>
        <h2 className="text-headline mt-8 font-medium">Enquiry sent.</h2>
        <p className="text-lede mt-4 max-w-md text-grey-2">
          Thanks, {data.name.trim().split(" ")[0]}. We’ll reply to {data.email}.
        </p>
        <button
          type="button"
          onClick={() => {
            setData(empty);
            setStatus("idle");
          }}
          className="link-u mt-8 min-h-11 text-sm font-medium text-blue-ink"
        >
          Send another enquiry
        </button>
      </motion.div>
    );
  }

  return (
    <form noValidate onSubmit={submit} className="grid gap-7 rounded-lg border border-line bg-white p-6 md:p-10">
      <div className="grid gap-7 md:grid-cols-2">
        <Field id="f-name" label="Name" error={errors.name}>
          <input {...describe("f-name", errors.name)} className={inputClass} autoComplete="name" value={data.name} onChange={(e) => set("name", e.target.value)} />
        </Field>
        <Field id="f-email" label="Email" error={errors.email}>
          <input {...describe("f-email", errors.email)} type="email" className={inputClass} autoComplete="email" value={data.email} onChange={(e) => set("email", e.target.value)} />
        </Field>
      </div>
      <Field id="f-company" label="Company" optional>
        <input id="f-company" className={inputClass} autoComplete="organization" value={data.company} onChange={(e) => set("company", e.target.value)} />
      </Field>

      <fieldset aria-describedby={errors.projectType ? "f-projectType-error" : undefined}>
        <legend className="text-sm font-medium">Project type</legend>
        <div id="f-projectType" tabIndex={-1} className="mt-3 grid grid-cols-2 gap-2 outline-none sm:grid-cols-3">
          {projectTypes.map((t) => (
            <label
              key={t}
              className={cn(
                "flex min-h-12 cursor-pointer items-center rounded-sm border px-3.5 text-sm transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-blue",
                data.projectType === t ? "border-blue bg-ice text-blue-ink" : "border-line-strong hover:border-ink/40",
              )}
            >
              <input type="radio" name="projectType" className="sr-only" checked={data.projectType === t} onChange={() => set("projectType", t)} />
              {t}
            </label>
          ))}
        </div>
        <FieldError id="f-projectType" msg={errors.projectType} />
      </fieldset>

      <Field id="f-budget" label="Estimated budget (AUD)" optional>
        <select id="f-budget" className={cn(inputClass, "appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%228%22><path d=%22M1 1l5 5 5-5%22 fill=%22none%22 stroke=%22%2307101f%22 stroke-width=%221.5%22/></svg>')] bg-[right_1rem_center] bg-no-repeat pr-10")} value={data.budget} onChange={(e) => set("budget", e.target.value)}>
          <option value="">Select a range</option>
          {budgets.map((b) => (
            <option key={b}>{b}</option>
          ))}
        </select>
      </Field>

      <Field id="f-message" label="Project description" error={errors.message} hint="What are you building, who is it for, and what’s the timeline?">
        <textarea {...describe("f-message", errors.message, true)} rows={5} className={cn(inputClass, "resize-y")} value={data.message} onChange={(e) => set("message", e.target.value)} />
      </Field>

      {status === "error" && (
        <p role="alert" className="rounded-sm border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          Your enquiry didn’t send. Check your connection and try again, or email{" "}
          <a className="underline" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          .
        </p>
      )}

      <div className="flex flex-col gap-5 border-t border-line pt-7 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-grey-2">We only use your details to reply to this enquiry.</p>
        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex h-14 items-center justify-center gap-2.5 rounded-sm bg-blue px-8 font-medium text-white transition-[background-color,box-shadow] hover:bg-blue-electric hover:shadow-blue disabled:opacity-70"
        >
          {status === "sending" ? (
            <>
              Sending
              <LoaderCircle aria-hidden className="size-4 animate-spin" />
            </>
          ) : (
            <>
              Send Enquiry
              <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
