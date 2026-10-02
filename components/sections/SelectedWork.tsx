import { featuredProjects, moreProjects } from "@/data/projects";
import { MoreProjects } from "./MoreProjects";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProjectFeature } from "./ProjectFeature";

export function SelectedWork() {
  return (
    <section id="work" aria-labelledby="work-h" className="section-y scroll-mt-16 border-t border-line bg-white">
      <div className="container-x">
        <SectionHeader
          id="work-h"
          index="03"
          label="Selected work"
          lines={["Built to solve", { text: "real problems.", className: "text-blue" }]}
          intro="HR platforms, inventory systems, mobile apps and brand-led websites — designed and built by NovaLink."
        />
        <div className="mt-16 space-y-24 md:mt-24 md:space-y-36">
          {featuredProjects.map((p, i) => (
            <ProjectFeature key={p.slug} project={p} flip={i % 2 === 1} />
          ))}
        </div>
        <MoreProjects projects={moreProjects} />
      </div>
    </section>
  );
}
