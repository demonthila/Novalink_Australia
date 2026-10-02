"use client";

import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { ArrowDownRight, ArrowRight, ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "inverse" | "ghost-inverse";
  size?: "md" | "lg" | "xl";
  arrow?: "right" | "up-right" | "down-right" | "none";
  /** Magnetic pull strength; 0 disables */
  magnetic?: number;
  className?: string;
};

const sizes = {
  md: "h-11 px-5 text-[0.93rem] gap-2",
  lg: "h-14 px-7 text-base gap-2.5",
  xl: "h-16 px-9 text-lg gap-3 md:h-20 md:px-12 md:text-xl",
};

const variants = {
  primary: "btn-sheen bg-blue text-white hover:bg-blue-electric hover:shadow-blue",
  secondary: "border border-line-strong text-ink hover:border-ink",
  inverse: "btn-sheen bg-white text-navy hover:bg-ice",
  "ghost-inverse": "border border-line-inverse text-white hover:border-blue-light",
};

const arrows = { right: ArrowRight, "up-right": ArrowUpRight, "down-right": ArrowDownRight } as const;
const nudge = {
  right: "group-hover:translate-x-1",
  "up-right": "group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
  "down-right": "group-hover:translate-x-0.5 group-hover:translate-y-0.5",
} as const;

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  arrow = "right",
  magnetic = 0.2,
  className,
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 260, damping: 20, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 260, damping: 20, mass: 0.4 });

  const onMove = (e: React.PointerEvent) => {
    if (reduce || !magnetic || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * magnetic);
    y.set((e.clientY - (r.top + r.height / 2)) * magnetic);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const Icon = arrow === "none" ? null : arrows[arrow];
  const external = /^https?:/.test(href);

  return (
    <motion.span style={{ x, y }} className="inline-flex" onPointerMove={onMove} onPointerLeave={reset}>
      <Link
        ref={ref}
        href={href}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
        className={cn(
          "group inline-flex items-center justify-center rounded-sm font-medium tracking-tight transition-[background-color,border-color,box-shadow,color] duration-300",
          sizes[size],
          variants[variant],
          className,
        )}
      >
        {children}
        {Icon && (
          <Icon
            aria-hidden
            className={cn("shrink-0 transition-transform duration-300 ease-out", nudge[arrow as keyof typeof nudge], size === "xl" ? "size-6" : "size-4")}
          />
        )}
      </Link>
    </motion.span>
  );
}
