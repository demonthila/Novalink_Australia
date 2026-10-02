"use client";

import { motion, useInView, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { cn, pad } from "@/lib/utils";
import { processSteps } from "@/data/process";


/** Sticky heading + progress rail; each step lights up in electric blue as it reaches mid-screen. */
export function ProcessTimeline() {
  const list = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: list, offset: ["start 60%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="process" aria-labelledby="process-h" className="section-y scroll-mt-16 border-t border-line">
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <EyebrowLabel index="04">How we work</EyebrowLabel>
            <AnimatedHeading
              id="process-h"
              className="text-display mt-8 font-medium"
              lines={["Clear thinking.", { text: "Better products.", className: "text-blue" }]}
            />
            <div className="mt-12 hidden items-center gap-4 lg:flex" aria-hidden>
              <span className="text-label text-blue-ink">{pad(active + 1)}</span>
              <span className="relative h-px flex-1 bg-line-strong">
                <motion.span style={{ scaleX: reduce ? 1 : progress }} className="absolute inset-0 origin-left bg-blue" />
              </span>
              <span className="text-label text-grey-2">{pad(processSteps.length)}</span>
            </div>
          </div>
        </div>

        <ol ref={list} className="relative lg:col-span-6 lg:col-start-7">
          <span aria-hidden className="absolute top-2 bottom-2 left-[5px] w-px bg-line-strong" />
          <motion.span
            aria-hidden
            style={{ scaleY: reduce ? 1 : progress }}
            className="absolute top-2 bottom-2 left-[5px] w-px origin-top bg-blue-electric"
          />
          {processSteps.map((s, i) => (
            <Step key={s.title} index={i} active={active === i} done={i < active} onActive={() => setActive(i)} {...s} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function Step({
  index,
  title,
  body,
  active,
  done,
  onActive,
}: {
  index: number;
  title: string;
  body: string;
  active: boolean;
  done: boolean;
  onActive: () => void;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (inView) onActive();
  }, [inView, onActive]);

  return (
    <li ref={ref} className="relative pb-16 pl-12 last:pb-0 md:pb-24">
      <span
        aria-hidden
        className={cn(
          "absolute top-1.5 left-0 size-[11px] rounded-[2px] border transition-all duration-500",
          active ? "scale-125 border-blue-electric bg-blue-electric shadow-[0_0_0_6px_rgb(37_140_255/0.15)]" : done ? "border-blue bg-blue" : "border-line-strong bg-paper",
        )}
      />
      <p className={cn("text-label transition-colors duration-500", active ? "text-blue-ink" : "text-grey-2")}>{pad(index + 1)}</p>
      <h3
        className={cn(
          "text-headline mt-3 font-medium transition-colors duration-500",
          active ? "text-ink" : "text-ink/55",
        )}
      >
        {title}
      </h3>
      <p className="text-lede mt-4 max-w-md text-grey-2">{body}</p>
    </li>
  );
}
