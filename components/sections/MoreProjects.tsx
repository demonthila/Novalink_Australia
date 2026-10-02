import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { projectNumber } from "@/data/projects";
import { ProjectMedia } from "@/components/visuals/ProjectMedia";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { DrawLine } from "@/components/ui/DrawLine";

/** Compact case-study cards for the projects that aren't featured. */
export function MoreProjects({ projects }: { projects: Project[] }) {
  if (!projects.length) return null;
  return (
    <div className="mt-28 md:mt-40">
      <DrawLine className="mb-8" />
      <div className="flex items-end justify-between gap-6">
        <EyebrowLabel>More projects</EyebrowLabel>
        <p className="text-label text-grey-2">{projects.length} case studies</p>
      </div>
      <Stagger as="ul" gap={0.08} className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <StaggerItem as="li" key={p.slug}>
            <Link href={`/projects/${p.slug}`} className="group block">
              <div className="overflow-hidden rounded-md">
                <div className="transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.04]">
                  <ProjectMedia project={p} className="aspect-[4/3]" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
                </div>
              </div>
              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <p className="text-label text-blue-ink">
                    {projectNumber(p.slug)} — {p.services.slice(0, 2).join(" · ")}
                  </p>
                  <h3 className="mt-2 text-xl font-medium tracking-tight transition-colors group-hover:text-blue-ink">{p.title}</h3>
                  <p className="mt-1.5 line-clamp-2 text-sm text-grey-2">{p.problem}</p>
                </div>
                <span className="flex size-10 shrink-0 items-center justify-center rounded-sm border border-line-strong transition-all duration-300 group-hover:border-blue group-hover:bg-blue group-hover:text-white">
                  <ArrowUpRight aria-hidden className="size-4" />
                </span>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
