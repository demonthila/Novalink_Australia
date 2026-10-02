"use client";

import { useState } from "react";
import { services } from "@/data/services";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ServiceRow } from "./ServiceRow";
import { Stagger } from "@/components/ui/Stagger";

export function Services() {
  const [open, setOpen] = useState<string | null>(services[0].slug);
  return (
    <section id="services" aria-labelledby="services-h" className="section-y scroll-mt-16">
      <div className="container-x">
        <SectionHeader
          id="services-h"
          index="02"
          label="Capabilities"
          lines={["From idea", { text: "to impact.", className: "text-blue" }]}
          intro="Four disciplines, one team. Strategy, design and engineering stay connected from the first conversation to launch."
        />
        <Stagger as="ul" gap={0.08} className="mt-14 border-t border-line md:mt-20">
          {services.map((s) => (
            <ServiceRow
              key={s.slug}
              service={s}
              open={open === s.slug}
              onToggle={() => setOpen((o) => (o === s.slug ? null : s.slug))}
            />
          ))}
        </Stagger>
      </div>
    </section>
  );
}
