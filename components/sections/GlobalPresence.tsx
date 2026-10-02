import { SectionHeader } from "@/components/ui/SectionHeader";
import { WorldMap } from "@/components/visuals/WorldMap";

export function GlobalPresence() {
  return (
    <section id="global" aria-labelledby="global-h" className="section-y relative overflow-hidden border-t border-line bg-white">
      <div aria-hidden className="halftone absolute -top-20 -left-20 size-[40rem] opacity-20 [mask-image:radial-gradient(circle,#000,transparent_65%)]" />
      <div className="container-x relative">
        <SectionHeader
          id="global-h"
          label="Global presence"
          size="headline"
          lines={["From Melbourne", { text: "to the world.", className: "text-blue" }]}
          intro="Our main hub is in Melbourne, with a team in Sri Lanka and client work across India, Denmark, the UK and Scotland."
        />
        <div className="mt-14 md:mt-20">
          <WorldMap />
        </div>
      </div>
    </section>
  );
}
