"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { EASE } from "@/lib/utils";

type Tag = "ul" | "ol" | "dl" | "div";

/** Container that staggers its <StaggerItem> children in when scrolled into view. */
export function Stagger({
  as = "div",
  gap = 0.07,
  delay = 0,
  className,
  children,
}: {
  as?: Tag;
  gap?: number;
  delay?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  const M = motion[as] as React.ComponentType<HTMLMotionProps<"div">>;
  return (
    <M
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={{ show: { transition: { staggerChildren: gap, delayChildren: delay } } }}
    >
      {children}
    </M>
  );
}

export function StaggerItem({
  as = "div",
  y = 22,
  className,
  children,
}: {
  as?: "li" | "div";
  y?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const M = motion[as] as React.ComponentType<HTMLMotionProps<"div">>;
  return (
    <M
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
      }}
    >
      {children}
    </M>
  );
}
