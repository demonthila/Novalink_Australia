"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { nav } from "@/data/site";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";
import { MobileMenu } from "./MobileMenu";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  // The menu belongs to the route it was opened on, so navigating closes it.
  const [openAt, setOpenAt] = useState<string | null>(null);
  const open = openAt === pathname;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : !href.includes("#") && pathname.startsWith(href);

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[var(--z-skip)] rounded-sm bg-blue px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[var(--z-nav)] border-b transition-[background-color,border-color,backdrop-filter] duration-500",
          scrolled && !open ? "border-line bg-paper/80 backdrop-blur-xl" : "border-transparent bg-transparent",
        )}
      >
        <nav aria-label="Primary" className="container-x flex h-16 items-center justify-between md:h-20">
          <Link href="/" aria-label="NovaLink Innovations — home" className={cn("relative z-[var(--z-menu)] transition-opacity", open && "opacity-0")}>
            <Logo priority />
          </Link>

          <ul className="hidden items-center gap-0.5 xl:flex">
            {nav.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative flex h-11 items-center px-3.5 text-[0.92rem] transition-colors",
                      active ? "text-blue-ink" : "text-ink/75 hover:text-ink",
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute inset-x-3.5 bottom-2 h-px origin-left bg-blue transition-transform duration-300",
                        active ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              className="group hidden h-11 items-center gap-2 rounded-sm bg-blue px-5 text-[0.92rem] font-medium text-white transition-[background-color,box-shadow] duration-300 hover:bg-blue-electric hover:shadow-blue sm:inline-flex"
            >
              Start a Project
              <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <button
              type="button"
              onClick={() => setOpenAt(open ? null : pathname)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className={cn(
                "relative z-[var(--z-menu)] flex size-11 items-center justify-center rounded-sm border transition-colors xl:hidden",
                open ? "border-line-inverse text-white" : "border-line-strong text-ink",
              )}
            >
              <span className="relative block h-3 w-5">
                <span className={cn("absolute left-0 h-[1.5px] w-full bg-current transition-all duration-300", open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0")} />
                <span className={cn("absolute left-0 h-[1.5px] w-full bg-current transition-all duration-300", open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0")} />
              </span>
            </button>
          </div>
        </nav>
      </header>
      <MobileMenu open={open} onClose={() => setOpenAt(null)} />
    </>
  );
}
