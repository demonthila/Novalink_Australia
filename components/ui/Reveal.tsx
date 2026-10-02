"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/utils";

/** Fade + translate entrance. Use sparingly — for content groups, not every element. */
export function Reveal({
  children,
  delay = 0,
  y = 20,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.6, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
