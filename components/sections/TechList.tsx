import { technologies } from "@/data/site";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";

/** Plain, typographic stack list — grouped, no coloured logo cards. */
export function TechList() {
  return (
    <section aria-labelledby="tech-h" className="section-y border-t border-line bg-ice/60">
      <div className="container-x">
        <SectionHeader
          id="tech-h"
          index="05"
          label="Technology"
          size="headline"
          lines={["Modern technology.", { text: "Built for scale.", className: "text-blue" }]}
          intro="We choose the stack for the problem — proven frameworks, cloud platforms and databases our team ships with."
        />
        <Stagger as="dl" gap={0.08} className="mt-14 grid border-t border-line-strong sm:grid-cols-2 lg:grid-cols-3">
          {technologies.map((g) => (
            <StaggerItem key={g.group} className="group grid grid-cols-[7rem_1fr] gap-4 border-b border-line-strong py-6 sm:pr-8">
              <dt className="text-label pt-1 text-grey-2 transition-colors group-hover:text-blue-ink">{g.group}</dt>
              <dd className="flex flex-wrap gap-x-5 gap-y-1 text-xl font-medium tracking-tight">
                {g.items.map((t) => (
                  <span key={t} className="inline-block transition-[color,transform] duration-300 hover:-translate-y-0.5 hover:text-blue">
                    {t}
                  </span>
                ))}
              </dd>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
