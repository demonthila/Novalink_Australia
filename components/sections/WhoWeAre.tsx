"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Reveal } from "@/components/ui/Reveal";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import { InfrastructureArt } from "@/components/visuals/InfrastructureArt";

const principles = [
  { title: "Strategy first", body: "Every technology decision starts with the business outcome." },
  { title: "One team", body: "Designers and engineers work together from the first workshop to release." },
  { title: "Built to scale", body: "Architecture planned for growth, not just launch day." },
  { title: "Long-term partners", body: "We stay involved as your product and business evolve." },
];

export function WhoWeAre() {
  const art = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: art, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-8%", "8%"]);

  return (
    <section id="about" aria-labelledby="who-h" className="section-y border-t border-line">
      <div className="container-x">
        <SectionHeader
          id="who-h"
          index="01"
          label="Who we are"
          size="headline"
          lines={["Technology should make business", "simpler, faster and", { text: "more ambitious.", className: "text-blue" }]}
        />

        <div className="mt-16 grid gap-12 md:mt-24 lg:grid-cols-12 lg:gap-10">
          <div ref={art} className="relative aspect-[4/5] overflow-hidden rounded-lg lg:col-span-5">
            <motion.div style={{ y }} className="absolute -inset-y-[8%] inset-x-0">
              <InfrastructureArt className="size-full" />
            </motion.div>
            <p className="text-label absolute bottom-5 left-5 text-ice/70">Creativity × Engineering</p>
          </div>

          <div className="flex flex-col justify-between gap-12 lg:col-span-6 lg:col-start-7">
            <Reveal>
              <p className="text-title font-medium">
                NovaLink is a software and design team working from Melbourne and Sri Lanka. We combine user-centred
                design with solid engineering to build products that create real value for our clients.
              </p>
            </Reveal>
            <Stagger as="ul" className="grid gap-x-8 sm:grid-cols-2">
              {principles.map((p, i) => (
                <StaggerItem as="li" key={p.title} className="group border-t border-line py-6">
                  <p className="text-label text-blue-ink">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-2 font-medium transition-colors group-hover:text-blue-ink">{p.title}</h3>
                  <p className="mt-2 text-grey-2">{p.body}</p>
                </StaggerItem>
              ))}
            </Stagger>
            <ArrowLink href="/about" className="text-blue-ink">
              More about NovaLink
            </ArrowLink>
          </div>
        </div>
      </div>
    </section>
  );
}
