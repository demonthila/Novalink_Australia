import Image from "next/image";
import type { Project } from "@/data/projects";
import { projectNumber } from "@/data/projects";
import { cn } from "@/lib/utils";

/**
 * Project imagery. Real screenshots render through next/image (lazy, responsive,
 * AVIF/WebP). Until they're supplied, an intentional branded placeholder renders —
 * never a fabricated screenshot.
 */
export function ProjectMedia({
  project,
  className,
  priority,
  sizes = "(min-width: 1024px) 60vw, 100vw",
}: {
  project: Project;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  if (project.image) {
    return (
      <div className={cn("relative overflow-hidden bg-ice", className)}>
        <Image
          src={project.image.src}
          alt={project.image.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover object-center"
        />
      </div>
    );
  }

  const n = projectNumber(project.slug);
  const i = Number(n);
  const focus = ["20% 20%", "80% 30%", "70% 80%", "25% 75%", "50% 15%", "85% 60%"][(i - 1) % 6];

  return (
    <div
      role="img"
      aria-label={`${project.title} — project imagery coming soon`}
      className={cn("grain relative isolate overflow-hidden bg-navy text-white", className)}
    >
      <div className="bg-grid-inverse absolute inset-0 opacity-60" />
      <div
        className="halftone absolute inset-0 opacity-90"
        style={{ maskImage: `radial-gradient(circle at ${focus}, #000 0%, transparent 55%)` }}
      />
      <div
        className="absolute inset-0"
        style={{ background: `radial-gradient(circle at ${focus}, rgb(37 140 255 / .35), transparent 50%)` }}
      />
      <span className="absolute -right-[0.06em] -bottom-[0.2em] text-[clamp(8rem,22vw,20rem)] leading-none font-medium tracking-[-0.08em] text-white/[0.07]">
        {n}
      </span>
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 md:p-7">
        <p className="text-label text-ice/80">{project.title}</p>
        <p className="text-label shrink-0 rounded-sm border border-line-inverse px-2 py-1 text-[0.6rem] text-ice/70">
          Imagery coming soon
        </p>
      </div>
    </div>
  );
}
