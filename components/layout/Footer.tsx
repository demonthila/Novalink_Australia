"use client";

import Link from "next/link";
import { useRef } from "react";
import { site } from "@/data/site";
import { services } from "@/data/services";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";

const explore = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

function Col({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-label mb-5 text-blue-light/80">{title}</h2>
      <ul className="space-y-1 text-[0.95rem]">{children}</ul>
    </div>
  );
}

const item = "inline-flex min-h-9 items-center text-ice/80 transition-colors hover:text-white";

/** Oversized navy footer. A soft blue light follows the pointer. */
export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--fx", `${e.clientX - r.left}px`);
    el.style.setProperty("--fy", `${e.clientY - r.top}px`);
  };

  return (
    <footer
      ref={ref}
      onPointerMove={onMove}
      className="on-navy relative isolate overflow-hidden bg-navy text-white [--fx:70%] [--fy:20%]"
    >
      <div aria-hidden className="bg-grid-inverse absolute inset-0 -z-10 opacity-50" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 transition-[background] duration-300"
        style={{ background: "radial-gradient(600px circle at var(--fx) var(--fy), rgb(37 140 255 / .16), transparent 60%)" }}
      />

      <div className="container-x pt-24 pb-16 md:pt-32">
        <div className="flex flex-col gap-10 border-b border-line-inverse pb-16 md:flex-row md:items-end md:justify-between md:pb-24">
          <AnimatedHeading
            as="p"
            className="text-display max-w-[12ch] font-medium"
            lines={["Let’s create", { text: "what’s next.", className: "text-blue-light" }]}
          />
          <Button href="/contact" size="lg" variant="inverse">
            Start a Project
          </Button>
        </div>

        <div className="grid gap-12 pt-16 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo tone="light" />
            <p className="mt-5 max-w-xs text-sm text-ice/70">{site.tagline} Software, digital products and design from Melbourne and Sri Lanka.</p>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:col-span-1 lg:col-span-5 lg:grid-cols-2">
            <Col title="Explore">
              {explore.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={item}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </Col>
            <Col title="Services">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services#${s.slug}`} className={item}>
                    {s.title}
                  </Link>
                </li>
              ))}
            </Col>
          </div>
          <div className="lg:col-span-3">
            <Col title="Contact">
              <li>
                <a href={`mailto:${site.email}`} className={`${item} break-all`}>
                  {site.email}
                </a>
              </li>
              <li>
                <a href={site.phoneHref} className={item}>
                  {site.phone}
                </a>
              </li>
              <li className="pt-1 text-ice/60">Melbourne, Australia · Sri Lanka</li>
              <li className="flex flex-wrap gap-x-5 pt-3">
                {site.socials.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className={item}>
                    {s.label}
                  </a>
                ))}
              </li>
            </Col>
          </div>
        </div>
      </div>

      <div className="container-x flex flex-col gap-3 border-t border-line-inverse py-6 text-sm text-ice/60 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {site.legalName}. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="/privacy" className={item}>
            Privacy Policy
          </Link>
          <Link href="/terms" className={item}>
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
