import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { projectNumber } from "@/data/projects";
import { ProjectMedia } from "@/components/visuals/ProjectMedia";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { Parallax } from "@/components/ui/Parallax";
import { cn } from "@/lib/utils";

/** Large editorial project block; `flip` alternates image/information sides. */
export function ProjectFeature({ project, flip }: { project: Project; flip?: boolean }) {
  const n = projectNumber(project.slug);
  return (
    <article className="group grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-10">
      <Link
        href={`/projects/${project.slug}`}
        tabIndex={-1}
        aria-hidden
        className={cn("block lg:col-span-7", flip && "lg:order-2 lg:col-start-6")}
      >
        <ImageReveal className="rounded-lg">
          <div className="overflow-hidden rounded-lg">
            <Parallax amount={6} className="aspect-[4/3] overflow-hidden md:aspect-[16/11]">
              <div className="h-full transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.03]">
                <ProjectMedia project={project} className="h-full" />
              </div>
            </Parallax>
          </div>
        </ImageReveal>
      </Link>

      <div className={cn("lg:col-span-5", flip ? "lg:order-1 lg:col-span-4 lg:col-start-1" : "lg:col-start-9 lg:col-span-4")}>
        <span aria-hidden data-n={n} className="block text-[clamp(3.5rem,6vw,5.5rem)] leading-none font-medium tracking-[-0.06em] text-blue/15 before:content-[attr(data-n)]" />
        <p className="text-label mt-4 text-blue-ink">{project.services.slice(0, 3).join(" · ")}</p>
        <h3 className="text-title mt-3 font-medium">
          <Link href={`/projects/${project.slug}`} className="link-u">
            {project.title}
          </Link>
        </h3>
        {(project.client || project.location) && (
          <p className="mt-2 text-sm text-grey-2">{[project.client, project.location].filter(Boolean).join(" · ")}</p>
        )}
        <dl className="mt-7 space-y-5 border-t border-line pt-6">
          <div>
            <dt className="text-label text-grey-2">Challenge</dt>
            <dd className="mt-1.5">{project.problem}</dd>
          </div>
          <div>
            <dt className="text-label text-grey-2">Solution</dt>
            <dd className="mt-1.5 text-grey-2">{project.solution}</dd>
          </div>
          {project.tech.length > 0 && (
            <div>
              <dt className="text-label text-grey-2">Technology</dt>
              <dd className="mt-1.5">{project.tech.join(", ")}</dd>
            </div>
          )}
        </dl>
        <Link
          href={`/projects/${project.slug}`}
          className="group/l mt-8 inline-flex min-h-11 items-center gap-2 font-medium text-blue-ink"
          aria-label={`View project: ${project.title}`}
        >
          <span className="link-u">View Project</span>
          <ArrowRight aria-hidden className="size-4 transition-transform group-hover/l:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
