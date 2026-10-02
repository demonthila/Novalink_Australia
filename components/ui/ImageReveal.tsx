"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn, EASE } from "@/lib/utils";

/** Reveals media with an upward clip mask when it enters the viewport. */
export function ImageReveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={cn("overflow-hidden", className)}
      initial={reduce ? false : { clipPath: "inset(18% 0% 0% 0%)", opacity: 0.4 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
