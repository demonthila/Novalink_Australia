"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/** Moves its content slightly slower than the page while in view. */
export function Parallax({ children, amount = 8, className }: { children: React.ReactNode; amount?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : [`-${amount}%`, `${amount}%`]);
  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }} className="h-full w-full scale-[1.18]">
        {children}
      </motion.div>
    </div>
  );
}
