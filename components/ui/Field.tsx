"use client";

import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const inputClass =
  "mt-2 block w-full min-h-12 rounded-sm border border-line-strong bg-white px-4 py-3 text-base text-ink outline-none transition-[border-color,box-shadow] placeholder:text-grey/70 hover:border-ink/40 focus:border-blue focus:shadow-[0_0_0_3px_rgb(23_107_255/0.15)] aria-[invalid=true]:border-red-600";

export function Field({
  id,
  label,
  error,
  optional,
  hint,
  children,
  className,
}: {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="text-sm font-medium">
        {label} {optional && <span className="font-normal text-grey-2">(optional)</span>}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="mt-1 text-sm text-grey-2">
          {hint}
        </p>
      )}
      {children}
      <FieldError id={id} msg={error} />
    </div>
  );
}

export function FieldError({ id, msg }: { id: string; msg?: string }) {
  return (
    <AnimatePresence>
      {msg && (
        <motion.p
          id={`${id}-error`}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-2 text-sm text-red-700"
        >
          {msg}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

/** aria wiring for an input given its field id and current error. */
export const describe = (id: string, error?: string, hint?: boolean) => ({
  id,
  "aria-invalid": !!error,
  "aria-describedby": cn(error && `${id}-error`, hint && `${id}-hint`) || undefined,
});
