"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { nav, site } from "@/data/site";
import { EASE, pad } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const first = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    const t = setTimeout(() => first.current?.focus(), 250);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="on-navy fixed inset-0 z-[calc(var(--z-nav)+1)] flex flex-col overflow-y-auto bg-navy text-white xl:hidden"
          initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <div aria-hidden className="bg-grid-inverse pointer-events-none absolute inset-0 opacity-50" />
          <div className="container-x relative flex h-16 shrink-0 items-center">
            <Logo tone="light" />
          </div>
          <nav aria-label="Mobile" className="container-x relative flex flex-1 flex-col justify-center py-10">
            <ul className="border-t border-line-inverse">
              {nav.map((item, i) => (
                <motion.li
                  key={item.href}
                  className="border-b border-line-inverse"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + i * 0.04, duration: 0.5, ease: EASE }}
                >
                  <Link
                    ref={i === 0 ? first : undefined}
                    href={item.href}
                    onClick={onClose}
                    className="group flex min-h-14 items-center justify-between gap-4 py-3"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="text-label text-blue-light">{pad(i + 1)}</span>
                      <span className="text-[clamp(1.9rem,8vw,3rem)] leading-none font-medium tracking-[-0.04em]">{item.label}</span>
                    </span>
                    <ArrowRight aria-hidden className="size-5 text-blue-light transition-transform group-hover:translate-x-1" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>
          <div className="container-x relative grid gap-1 border-t border-line-inverse py-6 text-sm text-ice/75">
            <a href={`mailto:${site.email}`} className="min-h-11 py-2 text-white">
              {site.email}
            </a>
            <a href={site.phoneHref} className="min-h-11 py-2">
              {site.phone}
            </a>
            <p>Melbourne · Sri Lanka</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
