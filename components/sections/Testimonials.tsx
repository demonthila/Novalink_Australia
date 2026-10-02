"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { useState } from "react";
import { testimonials } from "@/data/testimonials";
import Image from "next/image";
import { clientLogo, site } from "@/data/site";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import { cn, EASE, pad } from "@/lib/utils";

const initials = (name: string) =>
  name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");

/** One large featured testimonial; supporting quotes below act as the selector. */
export function Testimonials() {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const reduce = useReducedMotion();
  const t = testimonials[i];
  const go = (next: number) => {
    setDir(next > i || (i === testimonials.length - 1 && next === 0) ? 1 : -1);
    setI((next + testimonials.length) % testimonials.length);
  };

  return (
    <section aria-labelledby="t-h" className="section-y border-t border-line bg-white">
      <div className="container-x">
        <SectionHeader
          id="t-h"
          index="06"
          label="Client stories"
          size="headline"
          lines={["Built together.", { text: "Trusted globally.", className: "text-blue" }]}
          aside={
            <p className="text-sm text-grey-2 lg:text-right">
              <span className="text-4xl font-medium tracking-tight text-ink">{site.clutch.rating}</span>
              <span className="text-ink">/5</span> · {site.clutch.reviews} reviews on Clutch
            </p>
          }
        />

        <div className="mt-14 border-t border-line pt-12 md:mt-20 md:pt-16" role="region" aria-roledescription="carousel" aria-label="Client testimonials">
          <div className="flex items-center justify-between">
            <div className="flex gap-1 text-blue-ink" role="img" aria-label="Five stars">
              {Array.from({ length: 5 }).map((_, k) => (
                <Star key={k} aria-hidden className="size-4 fill-current" />
              ))}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-label text-grey-2" aria-hidden>
                {pad(i + 1)} / {pad(testimonials.length)}
              </span>
              {[
                { d: -1, I: ArrowLeft, l: "Previous testimonial" },
                { d: 1, I: ArrowRight, l: "Next testimonial" },
              ].map(({ d, I, l }) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => go(i + d)}
                  aria-label={l}
                  className="flex size-11 items-center justify-center rounded-sm border border-line-strong transition-colors hover:border-blue hover:bg-blue hover:text-white"
                >
                  <I aria-hidden className="size-4" />
                </button>
              ))}
            </div>
          </div>

          <div className="relative mt-10 min-h-[20rem] overflow-hidden sm:min-h-[16rem] md:min-h-[19rem]" aria-live="polite">
            <AnimatePresence mode="wait" custom={dir} initial={false}>
              <motion.figure
                key={i}
                custom={dir}
                initial={reduce ? false : { opacity: 0, x: dir * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? undefined : { opacity: 0, x: dir * -40 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <blockquote className="max-w-[28ch] text-[clamp(1.6rem,3.6vw,3.25rem)] leading-[1.12] font-medium tracking-[-0.03em] text-balance">
                  <span className="text-blue">“</span>
                  {t.quote}
                  <span className="text-blue">”</span>
                </blockquote>
                <figcaption className="mt-10 flex flex-wrap items-center gap-4">
                  <span aria-hidden className="flex size-12 items-center justify-center rounded-md bg-ice text-sm font-medium text-blue-ink">
                    {initials(t.name)}
                  </span>
                  <span>
                    <span className="block font-medium">{t.name}</span>
                    <span className="block text-sm text-grey-2">{[t.role, t.company].filter(Boolean).join(", ")}</span>
                  </span>
                  {(() => {
                    const logo = clientLogo(t.company);
                    return logo ? (
                      <span className="ml-auto flex h-12 items-center border-l border-line pl-6">
                        <Image src={logo.logo} alt={logo.name} width={logo.width} height={logo.height} sizes="160px" className="h-8 w-auto max-w-[140px] object-contain" />
                      </span>
                    ) : null;
                  })()}
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>
        </div>

        <Stagger as="ul" gap={0.06} className="hide-scrollbar -mx-[var(--gutter)] mt-14 flex snap-x gap-3 overflow-x-auto px-[var(--gutter)] lg:mx-0 lg:grid lg:grid-cols-6 lg:overflow-visible lg:px-0">
          {testimonials.map((q, k) => (
            <StaggerItem as="li" key={q.name} className="w-64 shrink-0 snap-start lg:w-auto">
              <button
                type="button"
                onClick={() => go(k)}
                aria-current={k === i}
                className={cn(
                  "flex h-full w-full flex-col justify-between gap-6 rounded-md border p-4 text-left transition-colors duration-300",
                  k === i ? "border-blue bg-ice/60" : "border-line hover:border-blue/50",
                )}
              >
                <span className="line-clamp-3 text-sm text-grey-2">“{q.quote}”</span>
                <span>
                  <span className="block text-sm font-medium">{q.name}</span>
                  <span className="block truncate text-xs text-grey-2">{q.company || q.role}</span>
                </span>
              </button>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
