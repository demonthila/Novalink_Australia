"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn, EASE } from "@/lib/utils";

/**
 * Cycles through words in place. All words are stacked in one grid cell so the
 * slot is always as wide as the longest word — no layout shift.
 */
export function RotatingWord({ words, interval = 2400, className }: { words: string[]; interval?: number; className?: string }) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setI((n) => (n + 1) % words.length), interval);
    return () => clearInterval(t);
  }, [reduce, interval, words.length]);

  return (
    <span className={cn("relative inline-grid overflow-hidden pb-[0.1em] -mb-[0.1em] align-bottom", className)}>
      {words.map((w) => (
        <span key={w} aria-hidden className="invisible col-start-1 row-start-1">
          {w}
        </span>
      ))}
      <AnimatePresence initial={false} mode="wait">
        <motion.span
          key={words[i]}
          aria-hidden
          className="col-start-1 row-start-1"
          initial={{ y: "70%", opacity: 0, filter: "blur(4px)" }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-70%", opacity: 0, filter: "blur(4px)" }}
          transition={{ duration: 0.35, ease: EASE }}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
