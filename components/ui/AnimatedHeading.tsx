"use client";

import { motion, useReducedMotion } from "framer-motion";
import { createElement, Fragment } from "react";
import { cn, EASE } from "@/lib/utils";

export type HeadingLine = string | { text: string; className?: string };

/**
 * Editorial heading revealed word-by-word from behind a mask.
 * `immediate` uses CSS so above-the-fold headings paint before hydration.
 */
export function AnimatedHeading({
  lines,
  as = "h2",
  id,
  className,
  delay = 0,
  immediate = false,
}: {
  lines: HeadingLine[];
  as?: "h1" | "h2" | "h3" | "p" | "span";
  id?: string;
  className?: string;
  delay?: number;
  immediate?: boolean;
}) {
  const reduce = useReducedMotion();
  const label = lines.map((l) => (typeof l === "string" ? l : l.text)).join(" ");
  let w = 0;

  const words = (render: (word: string, i: number, cls?: string) => React.ReactNode) =>
    lines.map((line, li) => {
      const text = typeof line === "string" ? line : line.text;
      const cls = typeof line === "string" ? undefined : line.className;
      return (
        <span key={li} className="block">
          {text.split(" ").map((word, wi, arr) => (
            <Fragment key={wi}>
              <span className="-mb-[0.1em] inline-block overflow-hidden pb-[0.1em] align-bottom">{render(word, w++, cls)}</span>
              {wi < arr.length - 1 && " "}
            </Fragment>
          ))}
        </span>
      );
    });

  const inner = immediate ? (
    <span aria-hidden className="block">
      {words((word, i, cls) => (
        <span className={cn("css-rise inline-block", cls)} style={{ animationDelay: `${delay + i * 0.035}s` }}>
          {word}
        </span>
      ))}
    </span>
  ) : (
    <motion.span
      aria-hidden
      className="block"
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
    >
      {words((word, i, cls) => (
        <motion.span
          className={cn("inline-block", cls)}
          variants={{
            hidden: { y: "105%" },
            show: { y: "0%", transition: { duration: 0.65, ease: EASE, delay: delay + i * 0.035 } },
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );

  // A span is a fragment of a larger heading: no label of its own, rendered as a block.
  if (as === "span") return createElement("span", { className: cn("block text-balance", className) }, inner);
  // Visually-hidden text carries the accessible name (valid on any tag, unlike aria-label on <p>).
  return createElement(as, { id, className: cn("text-balance", className) }, <span className="sr-only">{label}</span>, inner);
}
