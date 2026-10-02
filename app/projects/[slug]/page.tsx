import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getProject, projectNumber, projects } from "@/data/projects";
import { site } from "@/data/site";
import { processSteps } from "@/data/process";
import { pageMeta, breadcrumbJsonLd, JsonLd } from "@/lib/seo";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectMedia } from "@/components/visuals/ProjectMedia";
import { CTASection } from "@/components/sections/CTASection";
import { pad } from "@/lib/utils";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const p = getProject(slug);
  if (!p) return {};
  return pageMeta({
    title: `${p.title} — Case Study`,
    description: `${p.problem} ${p.services.join(", ")} by NovaLink Innovations.`,
    path: `/projects/${p.slug}`,
  });
}

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();

  const idx = projects.findIndex((p) => p.slug === slug);
  const next = projects[(idx + 1) % projects.length];
  const meta = [
    ["Client", project.client ?? project.location],
    ["Services", project.services.join(", ")],
    ["Year", project.year],
    ["Technology", project.tech.length ? project.tech.join(", ") : null],
  ].filter(([, v]) => v) as [string, string][];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: project.title, path: `/projects/${project.slug}` }]),
          {
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: project.title,
            description: project.problem,
            creator: { "@id": `${site.url}/#organization` },
            url: `${site.url}/projects/${project.slug}`,
          },
        ]}
      />
      <article>
        <header className="border-b border-line pt-32 pb-14 md:pt-44 md:pb-20">
          <div className="container-x">
            <Link href="/#work" className="group text-label inline-flex min-h-11 items-center gap-2 text-grey-2 hover:text-ink">
              <ArrowLeft aria-hidden className="size-3.5 transition-transform group-hover:-translate-x-1" />
              All work
            </Link>
            <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <EyebrowLabel index={projectNumber(project.slug)}>Case study</EyebrowLabel>
                <AnimatedHeading as="h1" immediate className="text-hero mt-6 font-medium" lines={[project.title]} />
              </div>
              <p className="text-lede text-grey-2 lg:col-span-4">{project.problem}</p>
            </div>
            <dl className="mt-14 grid gap-6 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-4">
              {meta.map(([k, v]) => (
                <div key={k}>
                  <dt className="text-label text-grey-2">{k}</dt>
                  <dd className="mt-2">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </header>

        <div className="container-x pt-10 md:pt-14">
          <ImageReveal className="rounded-lg">
            <ProjectMedia project={project} priority sizes="100vw" className="aspect-[4/3] rounded-lg md:aspect-[16/10]" />
          </ImageReveal>
        </div>

        {[
          ["Challenge", project.problem],
          ["Solution", project.solution],
        ].map(([k, v], i) => (
          <section key={k} aria-label={k} className="border-b border-line py-20 md:py-28">
            <div className="container-x grid gap-8 md:grid-cols-12">
              <div className="md:col-span-4">
                <EyebrowLabel as="h2" index={pad(i + 1)}>{k}</EyebrowLabel>
              </div>
              <Reveal className="md:col-span-8">
                <p className="text-headline font-medium">{v}</p>
              </Reveal>
            </div>
          </section>
        ))}

        <section aria-label="Design process" className="border-b border-line bg-white py-20 md:py-28">
          <div className="container-x grid gap-8 md:grid-cols-12">
            <div className="md:col-span-4">
              <EyebrowLabel as="h2" index="03">Design process</EyebrowLabel>
            </div>
            <ol className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 md:col-span-8">
              {processSteps.map((s, i) => (
                <li key={s.title} className="bg-white p-6 md:p-8">
                  <p className="text-label text-blue-ink">{pad(i + 1)}</p>
                  <h3 className="text-title mt-6 font-medium">{s.title}</h3>
                  <p className="mt-2 text-grey-2">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {project.gallery?.length ? (
          <section aria-label="Gallery" className="py-20 md:py-28">
            <div className="container-x grid gap-4 md:grid-cols-2">
              {project.gallery.map((g) => (
                <ImageReveal key={g.src} className="rounded-lg">
                  <Image src={g.src} alt={g.alt} width={g.width} height={g.height} sizes="(min-width: 768px) 50vw, 100vw" className="h-auto w-full" />
                </ImageReveal>
              ))}
            </div>
          </section>
        ) : null}

        <section aria-label="Outcome" className="py-20 md:py-28">
          <div className="container-x grid gap-8 md:grid-cols-12">
            <div className="md:col-span-4">
              <EyebrowLabel as="h2" index="04">Outcome</EyebrowLabel>
            </div>
            <p className="text-lede text-grey-2 md:col-span-8">
              Detailed results for this project will be published once confirmed with the client.
            </p>
          </div>
        </section>

        <nav aria-label="Next project" className="border-t border-line bg-white">
          <Link href={`/projects/${next.slug}`} className="group container-x flex items-center justify-between gap-6 py-16 md:py-24">
            <span>
              <span className="text-label text-grey-2">Next project</span>
              <span className="text-display mt-3 block font-medium transition-colors group-hover:text-blue">{next.title}</span>
            </span>
            <span className="flex size-14 shrink-0 items-center justify-center rounded-sm border border-line-strong transition-all duration-300 group-hover:border-blue group-hover:bg-blue group-hover:text-white md:size-20">
              <ArrowRight aria-hidden className="size-6 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        </nav>
      </article>
      <CTASection />
    </>
  );
}
