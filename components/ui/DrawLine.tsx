"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn, EASE } from "@/lib/utils";

/** A 1px rule that draws from left to right when it enters the viewport. */
export function DrawLine({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      aria-hidden
      className={cn("block h-px origin-left", tone === "light" ? "bg-line-strong" : "bg-line-inverse", className)}
      initial={reduce ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "0px 0px -5% 0px" }}
      transition={{ duration: 1.1, ease: EASE }}
    />
  );
}
