"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/data/services";
import { cn, EASE } from "@/lib/utils";

/** One row of the editorial services accordion. */
export function ServiceRow({
  service,
  open,
  onToggle,
}: {
  service: Service;
  open: boolean;
  onToggle: () => void;
}) {
  const reduce = useReducedMotion();
  const panelId = `svc-${service.slug}`;

  return (
    <motion.li
      variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } }}
      className={cn("group relative border-b border-line transition-colors duration-300 hover:bg-ice/50", open && "bg-white hover:bg-white")}
    >
      <span
        aria-hidden
        className={cn("absolute top-0 left-0 h-full w-0.5 origin-top bg-blue transition-transform duration-500", open ? "scale-y-100" : "scale-y-0")}
      />
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-4 px-4 py-7 text-left md:gap-10 md:px-6 md:py-9"
        >
          <span className={cn("text-label transition-colors", open ? "text-blue-ink" : "text-grey-2")}>{service.number}</span>
          <span
            className={cn(
              "text-[clamp(1.45rem,3.4vw,3rem)] leading-[1.05] font-medium tracking-[-0.035em] transition-colors duration-300",
              open ? "text-blue-ink" : "group-hover:text-blue",
            )}
          >
            {service.title}
          </span>
          <span
            className={cn(
              "flex size-11 items-center justify-center rounded-sm border transition-all duration-300 md:size-14",
              open ? "border-blue bg-blue text-white" : "border-line-strong group-hover:border-blue group-hover:text-blue",
            )}
          >
            <ArrowUpRight aria-hidden className={cn("size-5 transition-transform duration-300", open ? "rotate-90" : "group-hover:translate-x-0.5 group-hover:-translate-y-0.5")} />
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.45, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="grid gap-8 px-4 pb-9 md:grid-cols-12 md:px-6 md:pb-12">
              <p className="text-lede text-grey-2 md:col-span-5 md:col-start-2 md:pl-4">{service.summary}</p>
              <ul className="grid content-start gap-x-6 sm:grid-cols-2 md:col-span-4">
                {service.capabilities.map((c, i) => (
                  <motion.li
                    key={c}
                    initial={reduce ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + i * 0.04, duration: 0.35, ease: EASE }}
                    className="flex items-center gap-2.5 border-t border-line py-2.5 text-[0.95rem]"
                  >
                    <span aria-hidden className="size-1 bg-blue" />
                    {c}
                  </motion.li>
                ))}
              </ul>
              <div className="md:col-span-2 md:text-right">
                <Link href={`/services#${service.slug}`} className="group/l inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-blue-ink">
                  <span className="link-u">Explore</span>
                  <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover/l:translate-x-0.5 group-hover/l:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}
